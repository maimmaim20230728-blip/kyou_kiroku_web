'use strict';
/* 画面: あさの きょり
   ・行ける/途中まで/別室/家で過ごす の4択を、同じ大きさ・同じ色のボタンで(順位・色分けをしない)
   ・保存: api.save('kyori.v1', { 'YYYY-MM-DD': 0..3 })
   ・「家で過ごす」を選んだら連絡文づくりを開く(それ以外でもボタンで開ける)
     あいて(学校/職場)・書く人(本人/家族)・ようけん(遅れる/きょう休む/数日/しばらく)を選ぶだけで文ができ、
     コピー(navigator.clipboard → だめなら execCommand → それでもだめなら欄を全部選んで長押しを案内)と
     共有(navigator.share がある端末だけボタンを出す。Play版の WebView には無いので出さない)
   ・これまでの記録は日付ごとの一覧だけ(数える・比べる表示はしない) */
(function(){
  var KEY = 'kyori.v1';
  var HOME = 3;   // 「家で過ごす」の添字
  var KIND_ID = ['late', 'today', 'days', 'long'];

  /* 正しい形のものだけ残す(壊れたバックアップを読んでも画面が落ちないように)。日付キーで値が 0〜3 のものだけ */
  function loadAll(api){
    var K = window.KIROKU_KINDS;
    var d = api.load(KEY, {}), out = {};
    if(!d || typeof d !== 'object' || Array.isArray(d)) return out;
    Object.keys(d).forEach(function(k){ var v = d[k]; if(K.isDateKey(k) && (v === 0 || v === 1 || v === 2 || v === 3)) out[k] = v; });
    return out;
  }

  /* 韓国語の主題の助詞(은/는)。ハングルで終わる名前は最後の字のパッチムで決め、それ以外は 은(는) と両方書く */
  function koTopic(n){
    var c = n.charCodeAt(n.length - 1);
    if(c >= 0xAC00 && c <= 0xD7A3) return n + (((c - 0xAC00) % 28) ? '은' : '는');
    return n + '은(는)';
  }

  /* 連絡文を組み立てる(相手に見せる文なので漢字)
     ・家族が書くときは、休む/遅れる人を主語にした文(tpl.fam)を使う。書いている家族のことだと読まれないように
       (ヒロさん判断 2026-09-28「誤解が無いように表現するしかない」)。名前が空なら tpl.fam.noName(ja=本人) */
  function buildLetter(api, o){
    var K = window.KIROKU_KINDS;
    var tpl = api.T('screen.kyori.tpl');
    var side = o.target === 1 ? 'Work' : 'School';
    var id = KIND_ID[o.kind] + side;
    var lines = [];
    lines.push(tpl['open' + side]);
    var name = String(o.name || '').trim();
    if(o.writer === 1){
      lines.push(name ? K.fill(tpl.family, { name:name }) : tpl.familyNoName);
      var who = name || tpl.fam.noName;
      lines.push(K.fill(tpl.fam[id], { name:who, nameWa:koTopic(who) }));
    } else {
      if(name) lines.push(K.fill(tpl.self, { name:name }));
      lines.push(tpl[id]);
    }
    lines.push(tpl.close);
    return lines.join('\n');
  }

  /* navigator.clipboard が使えない/断られた端末は、見えない textarea + execCommand('copy') で試す(10代の情報室と同じ) */
  function legacyCopy(text){
    try{
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed'; ta.style.top = '0'; ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      var ok = document.execCommand('copy');
      ta.remove();
      return !!ok;
    }catch(_){ return false; }
  }
  /* それでもだめなら、連絡文の欄を全部選んでおき、長押しでコピーできることを欄の下に出す(トーストは消えるので残る文で) */
  function copyText(api, out, help){
    var T = api.T, text = out.value;
    function done(ok){
      help.classList.toggle('hidden', ok);
      if(ok){ api.toast(T('screen.kyori.copied')); return; }
      try{ out.focus(); out.select(); }catch(_){}
      api.toast(T('screen.kyori.copyFail'));
    }
    try{
      if(navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(text).then(function(){ done(true); }, function(){ done(legacyCopy(text)); });
        return;
      }
    }catch(_){}
    done(legacyCopy(text));
  }
  function shareText(api, text){
    var T = api.T;
    try{
      if(navigator.share){ navigator.share({ text:text }).catch(function(){}); return; }
    }catch(_){}
    api.toast(T('screen.kyori.shareNone'));
  }

  window.SCREENS.register('kyori', {
    render: function(c, api){
      var K = window.KIROKU_KINDS;   // 読み込み順に依らないよう描くときに参照
      var T = api.T;
      var today = K.dateKey();
      var all = loadAll(api);
      var opts = T('screen.kyori.opts');
      var letterOpen = false;

      c.appendChild(api.el('h1', 'scr-title', T('screen.kyori.title')));
      c.appendChild(api.el('p', 'hint', K.dateLabel(today, api.lang)));
      c.appendChild(api.el('p', 'note', T('screen.kyori.hint')));

      /* 4択(同じ見た目) */
      var grid = api.el('div', 'grid2 kyori-grid');
      var state = api.el('div', 'kyori-state');
      var letterBox = api.el('div', 'card');
      letterBox.setAttribute('id', 'kyori-letter');
      letterBox.classList.add('hidden');

      function drawState(){
        state.textContent = '';
        var v = all[today];
        if(v === undefined || v === null) return;
        state.appendChild(api.el('p', 'chosen', K.fill(T('screen.kyori.chosen'), { v: opts[v] })));
        var clr = api.el('button', 'btn', T('screen.kyori.clear'));
        clr.setAttribute('type', 'button');
        api.Tap.bind(clr, function(){
          delete all[today];
          if(!api.save(KEY, all)) api.toast(T('common.saveFail'));
          api.go('kyori');
        });
        state.appendChild(clr);
      }
      opts.forEach(function(lb, i){
        var b = api.el('button', 'big-btn kyori-opt' + (all[today] === i ? ' on' : ''));
        b.setAttribute('type', 'button');
        b.setAttribute('id', 'kyori-opt-' + i);
        b.setAttribute('aria-pressed', all[today] === i ? 'true' : 'false');
        b.appendChild(api.el('span', 'lbl', lb));
        api.Tap.bind(b, function(){
          all[today] = i;
          if(!api.save(KEY, all)){ api.toast(T('common.storageFull')); delete all[today]; return; }
          var btns = grid.querySelectorAll('.kyori-opt');
          for(var k = 0; k < btns.length; k++){ btns[k].classList.toggle('on', k === i); btns[k].setAttribute('aria-pressed', k === i ? 'true' : 'false'); }
          drawState();
          if(i === HOME) openLetter();
          api.toast(T('common.saved'));
        });
        grid.appendChild(b);
      });
      c.appendChild(grid);
      c.appendChild(state);
      drawState();

      /* 連絡文 */
      var lb = api.el('button', 'btn wide', T('screen.kyori.letterBtn'));
      lb.setAttribute('type', 'button');
      lb.setAttribute('id', 'kyori-letter-btn');
      api.Tap.bind(lb, function(){ openLetter(); });
      c.appendChild(lb);
      c.appendChild(letterBox);

      function openLetter(){
        if(letterOpen){ letterBox.classList.remove('hidden'); return; }
        letterOpen = true;
        letterBox.classList.remove('hidden');
        var o = {
          target: api.getExtra('target', 0) === 1 ? 1 : 0,
          writer: api.getExtra('writer', 0) === 1 ? 1 : 0,
          kind: 1,
          name: String(api.getExtra('name', '') || '')
        };
        letterBox.appendChild(api.el('h2', 'sec-h', T('screen.kyori.letterTitle')));
        letterBox.appendChild(api.el('p', 'hint', T('screen.kyori.letterHint')));

        var out = api.el('textarea', 'letter-out');
        out.setAttribute('id', 'kyori-letter-out');
        out.rows = 7;
        function refresh(){ out.value = buildLetter(api, o); }

        function chipField(label, labels, key){
          var f = api.el('div', 'field');
          f.appendChild(api.el('label', null, label));
          var row;
          function draw(){
            if(row) f.removeChild(row);
            row = K.chipRow(api, labels, o[key], function(i){ o[key] = i; draw(); refresh(); });
            f.appendChild(row);
          }
          draw();
          return f;
        }
        letterBox.appendChild(chipField(T('screen.kyori.target'), T('screen.kyori.targets'), 'target'));
        letterBox.appendChild(chipField(T('screen.kyori.writer'), T('screen.kyori.writers'), 'writer'));
        letterBox.appendChild(chipField(T('screen.kyori.kind'), T('screen.kyori.kinds'), 'kind'));

        var nf = api.el('div', 'field');
        var nl = api.el('label', null, T('screen.kyori.name'));
        nl.setAttribute('for', 'kyori-name');
        nf.appendChild(nl);
        var ni = api.el('input');
        ni.setAttribute('type', 'text');
        ni.setAttribute('id', 'kyori-name');
        ni.placeholder = T('screen.kyori.namePh');
        ni.value = o.name;
        ni.addEventListener('input', function(){ o.name = ni.value; api.setExtra('name', ni.value); refresh(); });
        nf.appendChild(ni);
        letterBox.appendChild(nf);

        var rf = api.el('div', 'field');
        var rl = api.el('label', null, T('screen.kyori.result'));
        rl.setAttribute('for', 'kyori-letter-out');
        rf.appendChild(rl);
        rf.appendChild(out);
        letterBox.appendChild(rf);
        refresh();

        var row = api.el('div', 'btn-row');
        var help = api.el('p', 'hint hidden', T('screen.kyori.copyHelp'));   // コピーできなかったときだけ出す
        help.setAttribute('id', 'kyori-copy-help');
        var cp = api.el('button', 'btn primary', T('screen.kyori.copy'));
        cp.setAttribute('type', 'button'); cp.setAttribute('id', 'kyori-copy');
        api.Tap.bind(cp, function(){ copyText(api, out, help); });
        row.appendChild(cp);
        /* 共有は navigator.share がある端末だけ(無い端末ではコピーが横いっぱいになる) */
        if(typeof navigator !== 'undefined' && typeof navigator.share === 'function'){
          var sh = api.el('button', 'btn', T('screen.kyori.share'));
          sh.setAttribute('type', 'button'); sh.setAttribute('id', 'kyori-share');
          api.Tap.bind(sh, function(){ shareText(api, out.value); });
          row.appendChild(sh);
        }
        letterBox.appendChild(row);
        letterBox.appendChild(help);
      }
      if(all[today] === HOME) openLetter();

      /* これまでの記録(日付ごと・数えない) */
      c.appendChild(api.el('h2', 'sec-h', T('screen.kyori.histTitle')));
      var keys = Object.keys(all).sort().reverse();
      if(!keys.length){ c.appendChild(api.el('p', 'empty', T('screen.kyori.histEmpty'))); return; }
      var ul = api.el('ul', 'list');
      keys.slice(0, 30).forEach(function(k){
        var li = api.el('li');
        li.appendChild(api.el('span', 'grow', K.dateLabel(k, api.lang)));
        li.appendChild(api.el('span', 'tag', opts[all[k]] || ''));
        ul.appendChild(li);
      });
      c.appendChild(ul);
    }
  });
})();
