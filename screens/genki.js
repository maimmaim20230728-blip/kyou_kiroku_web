'use strict';
/* 画面: のこり元気
   ・きょうの予定を1行ずつ足し、それぞれの消耗を3段階×3(ひと/さわがしさ/「ふつう」を演じた)で選ぶ
   ・電池の目盛り(5段階の絵)が減る。数字・点数は一切出さない
   ・保存: api.save('genki.v1', { 'YYYY-MM-DD': [ { t:'予定', f:[0,0,0] } ] })(日付ごとに残る。きょうの分だけを書き換える)
   ・「登録したサインが重なっています」の判定は作らない。「手順を開く」のリンクだけ置く(新1「ひとつずつ・そよぎ」の公開Web版へ)
   ・画面の下に「きのうの よてい」を読むだけで小さく出す(0時を過ぎても前の日の予定と電池が見える・書き換えない・無ければ出さない。
     点検 kiroku-13 案a・2026-09-29。日付の切り替えは今までどおり0時) */
(function(){
  var KEY = 'genki.v1';
  var STEPS_URL = 'https://maimmaim20230728-blip.github.io/soyogi_anshin_web/';   // 新1「ひとつずつ・そよぎ」の公開Web版(2026-09-28 HTTP 200 確認)
  var SEG = 5;

  /* 正しい形のものだけ残す(壊れたバックアップを読んでも画面が落ちないように)。
     日付キーの配列で、t が文字列の予定だけ。f は 0〜2 の整数3つにそろえる */
  function loadAll(api){
    var K = window.KIROKU_KINDS;
    var d = api.load(KEY, {}), out = {};
    if(!d || typeof d !== 'object' || Array.isArray(d)) return out;
    Object.keys(d).forEach(function(k){
      if(!K.isDateKey(k) || !Array.isArray(d[k])) return;
      out[k] = d[k].filter(function(p){ return p && typeof p === 'object' && typeof p.t === 'string'; }).map(function(p){
        var f = Array.isArray(p.f) ? p.f : [];
        return { t:p.t, f:[0, 1, 2].map(function(i){ var v = f[i]; return (v === 0 || v === 1 || v === 2) ? v : 0; }) };
      });
    });
    return out;
  }

  /* 目盛り: 消耗の合計から残りの段数(数字は表示しない) */
  function remainSegments(plans){
    var total = 0;
    plans.forEach(function(p){ var f = p.f || [0,0,0]; total += (f[0] || 0) + (f[1] || 0) + (f[2] || 0); });
    return Math.max(0, SEG - Math.round(total / 3));
  }

  /* 電池の目盛りを描く(数字は出さない) */
  function fillBatt(api, batt, plans){
    batt.textContent = '';
    var r = remainSegments(plans);
    batt.setAttribute('data-remain', String(r));
    for(var i = 0; i < SEG; i++) batt.appendChild(api.el('span', 'seg' + (i < r ? ' on' : '')));
    batt.appendChild(api.el('span', 'cap'));
  }

  /* きのうの よてい(読むだけ): 予定の1行と小さな電池。ボタンも入力欄も置かない */
  function drawPrev(c, api, K, all){
    var d = new Date(); d.setDate(d.getDate() - 1);
    var key = K.dateKey(d);
    var plans = Array.isArray(all[key]) ? all[key] : [];
    if(!plans.length) return;
    var T = api.T;
    var box = api.el('div', 'card genki-prev');
    box.setAttribute('id', 'genki-prev');
    box.appendChild(api.el('h2', 'prev-h', T('screen.genki.prevTitle')));
    box.appendChild(api.el('p', 'hint prev-date', K.dateLabel(key, api.lang)));
    box.appendChild(api.el('div', 'batt-label', T('screen.genki.prevBatt')));
    var batt = api.el('div', 'batt small');
    batt.setAttribute('id', 'genki-prev-batt');
    fillBatt(api, batt, plans);
    box.appendChild(batt);
    var ul = api.el('ul', 'prev-list');
    plans.forEach(function(p){ ul.appendChild(api.el('li', 'prev-item', p.t)); });
    box.appendChild(ul);
    c.appendChild(box);
  }

  window.SCREENS.register('genki', {
    render: function(c, api){
      var K = window.KIROKU_KINDS;   // 読み込み順に依らないよう描くときに参照
      var T = api.T;
      var today = K.dateKey();
      var all = loadAll(api);
      var plans = Array.isArray(all[today]) ? all[today] : [];

      function persist(){
        all[today] = plans;
        if(!api.save(KEY, all)){ api.toast(T('common.storageFull')); return false; }
        return true;
      }

      c.appendChild(api.el('h1', 'scr-title', T('screen.genki.title')));
      c.appendChild(api.el('p', 'hint', K.dateLabel(today, api.lang)));
      c.appendChild(api.el('p', 'note', T('screen.genki.hint')));

      /* 電池の絵 */
      var battWrap = api.el('div', 'batt-wrap');
      battWrap.appendChild(api.el('div', 'batt-label', T('screen.genki.battLabel')));
      var batt = api.el('div', 'batt');
      batt.setAttribute('id', 'genki-batt');
      battWrap.appendChild(batt);
      c.appendChild(battWrap);
      function drawBatt(){ fillBatt(api, batt, plans); }

      /* 予定を足す */
      var addRow = api.el('div', 'row add-row');
      var inp = api.el('input');
      inp.setAttribute('type', 'text');
      inp.setAttribute('id', 'genki-input');
      inp.placeholder = T('screen.genki.addPh');
      var addBtn = api.el('button', 'btn primary', T('screen.genki.add'));
      addBtn.setAttribute('type', 'button');
      addBtn.setAttribute('id', 'genki-add');
      function addPlan(){
        var t = String(inp.value || '').trim();
        if(!t) return;
        plans.push({ t:t, f:[0,0,0] });
        if(!persist()){ plans.pop(); return; }
        inp.value = '';
        drawList(); drawBatt();
      }
      api.Tap.bind(addBtn, addPlan);
      K.onEnter(inp, addPlan);   // 完了キーでも足せる(変換の確定では足さない)
      addRow.appendChild(inp); addRow.appendChild(addBtn);
      c.appendChild(addRow);

      /* 予定の一覧(それぞれに3段階×3) */
      var list = api.el('div', 'plan-list');
      list.setAttribute('id', 'genki-list');
      c.appendChild(list);
      function drawList(){
        list.textContent = '';
        if(!plans.length){ list.appendChild(api.el('p', 'empty', T('screen.genki.empty'))); return; }
        plans.forEach(function(p){
          var card = api.el('div', 'card plan');
          var head = api.el('div', 'row between');
          head.appendChild(api.el('div', 'plan-t grow', p.t));
          /* けすは2回タップ(できたことと同じ。1回目は「ほんとうに けす」を出すだけ) */
          var del = api.el('button', 'btn small', T('screen.genki.del'));
          del.setAttribute('type', 'button');
          var armed = false;
          api.Tap.bind(del, function(){
            if(!armed){ armed = true; del.textContent = T('screen.dekita.delSure'); del.classList.add('danger'); return; }
            var i = plans.indexOf(p);
            if(i >= 0) plans.splice(i, 1);
            persist(); drawList(); drawBatt();
            api.toast(T('common.deleted'));
          });
          head.appendChild(del);
          card.appendChild(head);
          [1, 2, 3].forEach(function(n, fi){
            var f = api.el('div', 'field');
            f.appendChild(api.el('label', null, T('screen.genki.f' + n)));
            var row;
            function draw(){
              if(row) f.removeChild(row);
              row = K.chipRow(api, T('screen.genki.f' + n + 'v'), p.f[fi], function(i){ p.f[fi] = i; persist(); draw(); drawBatt(); });
              f.appendChild(row);
            }
            draw();
            card.appendChild(f);
          });
          list.appendChild(card);
        });
      }
      drawList();
      drawBatt();

      /* 手順を開く(判定はしない・リンクだけ。ホームの相談先リンクと同じ <a target=_blank rel=noopener>) */
      c.appendChild(api.el('p', 'hint', T('screen.genki.stepsHint')));
      var st = api.el('a', 'btn wide', T('screen.genki.steps'));
      st.setAttribute('id', 'genki-steps');
      st.setAttribute('href', STEPS_URL);
      st.setAttribute('target', '_blank');
      st.setAttribute('rel', 'noopener');
      c.appendChild(st);

      drawPrev(c, api, K, all);
    }
  });
})();
