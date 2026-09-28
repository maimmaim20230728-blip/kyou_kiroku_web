'use strict';
/* 共通の小道具(画面をまたいで使う・登録はしない)
   ・記録の種類3つ(kyori / genki / dekita)の ON/OFF は api.getExtra('kind_<id>')(既定=ON)
   ・OFF の種類はホームに出さず、下ナビからも隠す(.nav-btn.hidden)
   ・日付キーは端末の現地時刻で 'YYYY-MM-DD' */
(function(){
  var KINDS = ['kyori', 'genki', 'dekita'];

  function isOn(api, id){ return api.getExtra('kind_' + id, true) !== false; }
  function setOn(api, id, on){ api.setExtra('kind_' + id, !!on); }

  /* 下ナビの表示/非表示を、いまの ON/OFF に合わせる */
  function applyNav(api){
    for(var i = 0; i < KINDS.length; i++){
      var b = document.getElementById('nav-' + KINDS[i]);
      if(b) b.classList.toggle('hidden', !isOn(api, KINDS[i]));
    }
  }

  function pad(n){ return (n < 10 ? '0' : '') + n; }
  function dateKey(d){
    d = d || new Date();
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }
  /* 'YYYY-MM-DD' → 見せる形(言語ごと) */
  function dateLabel(key, lang){
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(key || '');
    if(!m) return key || '';
    if(lang === 'ja') return m[1] + '年' + Number(m[2]) + '月' + Number(m[3]) + '日';
    return m[1] + '-' + m[2] + '-' + m[3];
  }

  /* 「{v}」などの差し込み */
  function fill(str, map){
    return String(str).replace(/\{(\w+)\}/g, function(_, k){ return (map && map[k] !== undefined) ? map[k] : ''; });
  }

  /* 同じ大きさ・同じ色のチップ列(順位や色分けをしない)。onPick(index) */
  function chipRow(api, labels, selected, onPick){
    var wrap = api.el('div', 'chips');
    labels.forEach(function(lb, i){
      var c = api.el('button', 'chip' + (i === selected ? ' on' : ''), lb);
      c.setAttribute('type', 'button');
      api.Tap.bind(c, function(){ onPick(i); });
      wrap.appendChild(c);
    });
    return wrap;
  }

  window.KIROKU_KINDS = { list: KINDS, isOn: isOn, setOn: setOn, applyNav: applyNav, dateKey: dateKey, dateLabel: dateLabel, fill: fill, chipRow: chipRow };
})();
