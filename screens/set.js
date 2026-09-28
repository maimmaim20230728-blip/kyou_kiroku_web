'use strict';
/* 画面: せってい のアプリ固有の行(#set-app-rows に描く。共通シェルの他の行は app.js が持つ)
   ・つかう きろく: 3種類の ON/OFF(api.setExtra('kind_<id>'))。OFF はホームと下ナビから消える
   ・れんらくの あいて(学校/職場)・だれのことを 書く(本人/家族)=連絡文の既定値
   ・app.js は id='set' の登録を #set-app-rows に描く(README「シェルの変更点」参照) */
(function(){
  window.SCREENS.register('set', {
    render: function(c, api){
      var K = window.KIROKU_KINDS;   // 読み込み順に依らないよう描くときに参照
      var T = api.T;
      c.appendChild(api.el('h2', 'sec-h', T('screen.set.h')));
      var labels = T('screen.set.kinds');
      K.list.forEach(function(id, i){
        var row = api.el('div', 'set-row');
        row.appendChild(api.el('span', null, labels[i]));
        var b = api.el('button', 'set-btn', K.isOn(api, id) ? T('set.on') : T('set.off'));
        b.setAttribute('type', 'button');
        b.setAttribute('id', 'set-app-kind-' + id);
        api.Tap.bind(b, function(){
          var on = !K.isOn(api, id);
          K.setOn(api, id, on);
          b.textContent = on ? T('set.on') : T('set.off');
          K.applyNav(api);
        });
        row.appendChild(b);
        c.appendChild(row);
      });

      function cycleRow(label, values, key){
        var row = api.el('div', 'set-row');
        row.appendChild(api.el('span', null, label));
        var cur = api.getExtra(key, 0) === 1 ? 1 : 0;
        var b = api.el('button', 'set-btn', values[cur]);
        b.setAttribute('type', 'button');
        b.setAttribute('id', 'set-app-' + key);
        api.Tap.bind(b, function(){ cur = (cur + 1) % values.length; api.setExtra(key, cur); b.textContent = values[cur]; });
        row.appendChild(b);
        c.appendChild(row);
      }
      cycleRow(T('screen.set.target'), T('screen.set.targets'), 'target');
      cycleRow(T('screen.set.writer'), T('screen.set.writers'), 'writer');
    }
  });
})();
