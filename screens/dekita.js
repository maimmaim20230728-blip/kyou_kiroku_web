'use strict';
/* 画面: できたこと
   ・1行入力(写真なし)・日付ごとの一覧・「ひとつ 見かえす」でランダムに1件を大きく表示(.ov)
   ・保存: api.save('dekita.v1', [ { id, d:'YYYY-MM-DD', t:'本文' } ])(新しい順に並べて見せる)
   ・比べる表示・グラフ・達成率・日数の集計は出さない */
(function(){
  var KEY = 'dekita.v1';

  /* 正しい形のものだけ残す(壊れたバックアップを読んでも画面が落ちないように)。d が日付の形で t が文字列のものだけ */
  function loadAll(api){
    var K = window.KIROKU_KINDS;
    var d = api.load(KEY, []);
    if(!Array.isArray(d)) return [];
    return d.filter(function(it){ return it && typeof it === 'object' && K.isDateKey(it.d) && typeof it.t === 'string'; });
  }

  window.SCREENS.register('dekita', {
    render: function(c, api){
      var K = window.KIROKU_KINDS;   // 読み込み順に依らないよう描くときに参照
      var T = api.T;
      var today = K.dateKey();
      var items = loadAll(api);
      function persist(){ if(!api.save(KEY, items)){ api.toast(T('common.storageFull')); return false; } return true; }

      c.appendChild(api.el('h1', 'scr-title', T('screen.dekita.title')));
      c.appendChild(api.el('p', 'hint', K.dateLabel(today, api.lang)));
      c.appendChild(api.el('p', 'note', T('screen.dekita.hint')));

      /* 1行入力 */
      var addRow = api.el('div', 'row add-row');
      var inp = api.el('input');
      inp.setAttribute('type', 'text');
      inp.setAttribute('id', 'dekita-input');
      inp.placeholder = T('screen.dekita.addPh');
      var addBtn = api.el('button', 'btn primary', T('screen.dekita.add'));
      addBtn.setAttribute('type', 'button');
      addBtn.setAttribute('id', 'dekita-add');
      function addItem(){
        var t = String(inp.value || '').trim();
        if(!t) return;
        var it = { id: Date.now(), d: today, t: t };
        items.push(it);
        if(!persist()){ items.pop(); return; }
        inp.value = '';
        if(api.markSaved) api.markSaved();   // のこせた=戻るボタンで「まだ保存していません」を出さない(2026-09-29)
        drawList();
        api.toast(T('common.saved'));
      }
      api.Tap.bind(addBtn, addItem);
      K.onEnter(inp, addItem);   // 完了キーでも のこせる(変換の確定では のこさない)
      /* 欄を空にしたら書きかけ無し(戻るボタンの確かめを出さない) */
      inp.addEventListener('input', function(){ if(!String(inp.value || '').trim() && api.markSaved) api.markSaved(); });
      addRow.appendChild(inp); addRow.appendChild(addBtn);
      c.appendChild(addRow);

      /* ひとつ 見かえす */
      var pick = api.el('button', 'big-btn');
      pick.setAttribute('type', 'button');
      pick.setAttribute('id', 'dekita-pick');
      pick.appendChild(api.el('span', 'ico', '🌱'));
      pick.appendChild(api.el('span', 'lbl', T('screen.dekita.pick')));
      api.Tap.bind(pick, function(){ if(items.length) showOne(); else api.toast(T('screen.dekita.empty')); });
      c.appendChild(pick);

      function showOne(){
        var ov = api.el('div', 'ov');
        ov.setAttribute('id', 'dekita-ov');
        var head = api.el('div', 'show-head', T('screen.dekita.pickTitle'));
        var d = api.el('div', 'show-label');
        var v = api.el('div', 'step-text');
        function roll(){
          var it = items[Math.floor(Math.random() * items.length)];
          d.textContent = K.dateLabel(it.d, api.lang);
          v.textContent = it.t;
        }
        roll();
        ov.appendChild(head);
        ov.appendChild(v);
        ov.appendChild(d);
        var again = api.el('button', 'btn wide', T('screen.dekita.pickAgain'));
        again.setAttribute('type', 'button');
        again.setAttribute('id', 'dekita-again');
        api.Tap.bind(again, roll);
        ov.appendChild(again);
        var close = api.el('button', 'ov-close', T('common.close'));
        close.setAttribute('type', 'button');
        close.setAttribute('id', 'dekita-ov-close');
        api.Tap.bind(close, function(){ ov.remove(); });
        ov.appendChild(close);
        document.body.appendChild(ov);
      }

      /* 日付ごとの一覧(新しい順・数えない) */
      var list = api.el('div');
      list.setAttribute('id', 'dekita-list');
      c.appendChild(list);
      function drawList(){
        list.textContent = '';
        if(!items.length){ list.appendChild(api.el('p', 'empty', T('screen.dekita.empty'))); return; }
        var byDay = {};
        items.forEach(function(it){ (byDay[it.d] = byDay[it.d] || []).push(it); });
        Object.keys(byDay).sort().reverse().forEach(function(day){
          list.appendChild(api.el('h2', 'sec-h', K.dateLabel(day, api.lang)));
          var ul = api.el('ul', 'list');
          byDay[day].slice().reverse().forEach(function(it){
            var li = api.el('li');
            li.appendChild(api.el('span', 'grow', it.t));
            var del = api.el('button', 'btn small', T('screen.dekita.del'));
            del.setAttribute('type', 'button');
            var armed = false;
            api.Tap.bind(del, function(){
              if(!armed){ armed = true; del.textContent = T('screen.dekita.delSure'); del.classList.add('danger'); return; }
              var i = items.indexOf(it);
              if(i >= 0) items.splice(i, 1);
              persist(); drawList();
              api.toast(T('common.deleted'));
            });
            li.appendChild(del);
            ul.appendChild(li);
          });
          list.appendChild(ul);
        });
      }
      drawList();
    }
  });
})();
