'use strict';
/* 画面: のこり元気
   ・きょうの予定を1行ずつ足し、それぞれの消耗を3段階×3(ひと/さわがしさ/「ふつう」を演じた)で選ぶ
   ・電池の目盛り(5段階の絵)が減る。数字・点数は一切出さない
   ・保存: api.save('genki.v1', { 'YYYY-MM-DD': [ { t:'予定', f:[0,0,0] } ] })
   ・「登録したサインが重なっています」の判定は作らない。「手順を開く」ボタンだけ置く(リンク先は後で) */
(function(){
  var KEY = 'genki.v1';
  var STEPS_URL = '';   // 🔴 後で「手順」のアプリのURLを入れる(空なら案内トーストだけ)
  var SEG = 5;

  function loadAll(api){ var d = api.load(KEY, {}); return (d && typeof d === 'object' && !Array.isArray(d)) ? d : {}; }

  /* 目盛り: 消耗の合計から残りの段数(数字は表示しない) */
  function remainSegments(plans){
    var total = 0;
    plans.forEach(function(p){ var f = p.f || [0,0,0]; total += (f[0] || 0) + (f[1] || 0) + (f[2] || 0); });
    return Math.max(0, SEG - Math.round(total / 3));
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
      function drawBatt(){
        batt.textContent = '';
        var r = remainSegments(plans);
        batt.setAttribute('data-remain', String(r));
        for(var i = 0; i < SEG; i++) batt.appendChild(api.el('span', 'seg' + (i < r ? ' on' : '')));
        batt.appendChild(api.el('span', 'cap'));
      }

      /* 予定を足す */
      var addRow = api.el('div', 'row add-row');
      var inp = api.el('input');
      inp.setAttribute('type', 'text');
      inp.setAttribute('id', 'genki-input');
      inp.placeholder = T('screen.genki.addPh');
      var addBtn = api.el('button', 'btn primary', T('screen.genki.add'));
      addBtn.setAttribute('type', 'button');
      addBtn.setAttribute('id', 'genki-add');
      api.Tap.bind(addBtn, function(){
        var t = String(inp.value || '').trim();
        if(!t) return;
        plans.push({ t:t, f:[0,0,0] });
        if(!persist()){ plans.pop(); return; }
        inp.value = '';
        drawList(); drawBatt();
      });
      addRow.appendChild(inp); addRow.appendChild(addBtn);
      c.appendChild(addRow);

      /* 予定の一覧(それぞれに3段階×3) */
      var list = api.el('div', 'plan-list');
      list.setAttribute('id', 'genki-list');
      c.appendChild(list);
      function drawList(){
        list.textContent = '';
        if(!plans.length){ list.appendChild(api.el('p', 'empty', T('screen.genki.empty'))); return; }
        plans.forEach(function(p, idx){
          var card = api.el('div', 'card plan');
          var head = api.el('div', 'row between');
          head.appendChild(api.el('div', 'plan-t grow', p.t));
          var del = api.el('button', 'btn small', T('screen.genki.del'));
          del.setAttribute('type', 'button');
          api.Tap.bind(del, function(){
            plans.splice(idx, 1);
            persist(); drawList(); drawBatt();
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

      /* 手順を開く(判定はしない・リンクだけ) */
      c.appendChild(api.el('p', 'hint', T('screen.genki.stepsHint')));
      var st = api.el('button', 'btn wide', T('screen.genki.steps'));
      st.setAttribute('type', 'button');
      st.setAttribute('id', 'genki-steps');
      api.Tap.bind(st, function(){
        if(!STEPS_URL){ api.toast(T('screen.genki.stepsNone')); return; }
        try{ window.open(STEPS_URL, '_blank', 'noopener'); }catch(_){}
      });
      c.appendChild(st);
    }
  });
})();
