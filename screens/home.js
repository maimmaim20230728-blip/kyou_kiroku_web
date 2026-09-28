'use strict';
/* 画面: ホーム
   ・ON になっている記録の種類だけを大ボタンで並べる(api.go)。全部 OFF なら「せってい」への案内
   ・下部に免責と相談先を常時表示(医療の代わりではない・危ないときは119/110や窓口へ)
   ・文言は api.T('screen.home.*')。操作は api.Tap.bind(click禁止) */
(function(){
  var ICONS = { kyori:'🌤', genki:'🔋', dekita:'🌱' };

  window.SCREENS.register('home', {
    render: function(c, api){
      var K = window.KIROKU_KINDS;   // 読み込み順に依らないよう描くときに参照
      var T = api.T;
      K.applyNav(api);

      c.appendChild(api.el('h1', 'scr-title', T('screen.home.title')));
      c.appendChild(api.el('p', 'tagline', T('app.tagline')));
      c.appendChild(api.el('p', 'hint', K.dateLabel(K.dateKey(), api.lang)));
      c.appendChild(api.el('p', 'note', T('screen.home.intro')));

      var shown = 0;
      K.list.forEach(function(id){
        if(!K.isOn(api, id)) return;
        shown++;
        var b = api.el('button', 'big-btn');
        b.setAttribute('type', 'button');
        b.setAttribute('id', 'home-' + id);
        b.appendChild(api.el('span', 'ico', ICONS[id]));
        var box = api.el('span', 'lblbox');
        box.appendChild(api.el('span', 'lbl', T('screen.home.' + id)));
        box.appendChild(api.el('span', 'sub', T('screen.home.' + id + 'Sub')));
        b.appendChild(box);
        api.Tap.bind(b, function(){ api.go(id); });
        c.appendChild(b);
      });
      if(!shown){
        c.appendChild(api.el('p', 'empty', T('screen.home.noKinds')));
        var s = api.el('button', 'btn wide', T('screen.home.toSet'));
        s.setAttribute('type', 'button');
        api.Tap.bind(s, function(){ api.go('set'); });
        c.appendChild(s);
      }

      /* 免責と相談先(常時表示) */
      var care = api.el('div', 'card care');
      care.setAttribute('id', 'home-care');
      care.appendChild(api.el('div', 'care-h', T('screen.home.careTitle')));
      care.appendChild(api.el('p', 'care-p', T('screen.home.care')));
      var a = api.el('a', 'care-link', T('screen.home.careLink'));
      a.setAttribute('href', 'https://soudansoyogi.com/');
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener');
      care.appendChild(a);
      c.appendChild(care);
    }
  });
})();
