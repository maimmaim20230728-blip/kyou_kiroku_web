/* 今日の記録帳・そよぎ 多言語テーブル(そよぎアプリ・キット v1・12言語)
   ・window.KIROKU_I18N = { ja, en, de, fr, es, it, pt, nl, sv, ko, zh, ar }
   ・キー構造は全言語で完全一致(_check.js が ja を正として構造・配列要素数を機械照合)
   ・🔴 BUILDER: 文言は ja と en の両方に同じキーで足す。画面固有は screen.<画面id>.* に置く。
     de〜ar の10言語は、翻訳Workflowで差し替えるまで en を自動で流用する(末尾の仮置き)
   ・{n} などのプレースホルダは app.js/screens が実値に差し替える(訳文でも記号のまま残す)
   ・set.lang は言語切替ラベルなので全言語 'ことば / Language' 固定
   ・ar は RTL。app.js が document.dir='rtl' にする
   ・ひらがな: 本人が読む操作文言はひらがな主体。相手に見せる文(みせる画面等)は漢字で曖昧さを消す */
(function(){
'use strict';

/* ============ ja(正) ============ */
var ja = {
  app: { name:'今日の記録帳・そよぎ', short:'今日の記録帳', tagline:'比べない、判定しない、きょうの記録。' },
  nav: { home:'ホーム', kyori:'あさの きょり', genki:'のこり元気', dekita:'できたこと', set:'せってい' },
  common: {
    ok:'OK', cancel:'やめる', save:'ほぞんする', del:'けす', back:'もどる', close:'とじる',
    yes:'はい', no:'いいえ', add:'ついか', edit:'なおす', next:'つぎ', prev:'まえ', done:'できた',
    saved:'ほぞんしました ✓', saveFail:'ほぞんできませんでした', storageFull:'いっぱいで ほぞんできません',
    deleted:'けしました', delConfirm:'ほんとうに けしますか?', empty:'まだ なにも ありません',
    optional:'ぜんぶ 書かなくても だいじょうぶです。', today:'きょう',
    backConfirm:'書いたことは まだ ほぞんしていません。すてて もどりますか?',
    photo: {
      camera:'カメラで とる', roll:'しゃしんから えらぶ',
      cropTitle:'しゃしんを 切りとる', cropHint:'ゆびで うごかすか、やじるしで あわせて、スライダーで 大きさを かえます。',
      zoom:'大きさ', panUp:'うえへ', panDown:'したへ', panLeft:'ひだりへ', panRight:'みぎへ',
      make:'これで きめる', fail:'しゃしんを よみこめませんでした'
    }
  },
  set: {
    hNormal:'ふだんの せってい',
    hBackup:'きしゅへんこう(バックアップ)',
    fs:'もじの大きさ', fsSizes:['ふつう','大きい','とても大きい'],
    lang:'ことば / Language',
    theme:'いろ', themes:['みどり','みずいろ','しろ','くろ'],
    bgm:'BGM', bgms:['なし','みどりの音','あおの音'],
    sound:'タップ音', on:'ON', off:'OFF',
    bkHint:'あたらしい スマホに うつるときは、「かきだす」で ファイルを ほぞんして、あたらしい スマホで「よみこむ」を おしてください。',
    bkExport:'かきだす', bkImport:'よみこむ',
    exported:'かきだしました ✓', imported:'よみこみました ✓', importFail:'よみこめませんでした',
    importConfirm:'いまの ないようは、ファイルの ないように おきかわります。よみこみますか?',
    note:'書いたことは すべて この端末の中だけに ほぞんされます。どこにも 送られません。',
    privacy:'プライバシーポリシー',
    credit:'アプリ開発：介護と支援の相談どころ そよぎ'
  },
  /* はじめての つかいかた(app.js openGuide・初回に必ず出す・2026-09-30)。heads と bodies は同じ数。
     ボタンの名前は画面の文字と同じにする(画面の文言を変えたら ここも直す) */
  guide: {
    title:'つかいかた', step:'{n} / {m}', start:'はじめる', again:'もういちど 見る',
    heads:[
      '今日の記録帳へ ようこそ',
      'さいしょに すること',
      'あさの きょり',
      'れんらくぶんを つくる',
      'のこり元気',
      'できたこと',
      '書いたことは この端末の中だけ',
      '見やすさと、こまったとき'
    ],
    bodies:[
      'あさの きょり・のこり元気・できたこと を、すこしだけ 書きとめる 帳面です。\n学校や 仕事に 行きにくい 時期や、つかれやすい 日の ための 道具です。\n点数や グラフは 出しません。くらべたり、よい わるいを 決めたりも しません。\n書かない 日が あっても だいじょうぶです。',
      'とくに ありません。ホームの 大きな ボタンか、下の ならびを おすと、すぐ 書けます。\nつかわない きろくは、「せってい」の「つかう きろく」で OFF に できます。ホームと 下の ならびから きえます。\nれんらくぶんを つかう ときは、「せってい」で「れんらくの あいて」と「だれのことを 書く」を えらんで おくと、毎回 えらばずに すみます。',
      'きょう 行ける ところを、「行ける」「途中まで」「別室」「家で過ごす」から ひとつ えらびます。\nどれを えらんでも、おなじ 大きさで きろくします。かえる ときは「えらびなおす」を おします。\n下の「これまでの きろく」に、日づけ ごとに ならびます。数えたり くらべたりは しません。',
      '「家で過ごす」を えらぶか、「れんらくぶんを つくる」を おすと、学校や 職場への 文が できます。\n「あいて」「書く人」「ようけん」を えらぶだけで 文が かわります。なまえは 空でも だいじょうぶです。\nできた 文は なおして つかえます。「コピー」を おして、メールや メッセージに はりつけて ください。\n「きょうゆう(共有)」が 出る 端末では、そこから 送る アプリも えらべます。',
      'きょうの よていを 1行 書いて「ついか」を おします。\nよてい ごとに、ひと・さわがしさ・「ふつう」を えんじた の 3つを それぞれ えらぶと、「いまの 電池」の 目もりが へります。数字は 出しません。\nけす ときは「けす」、つぎに「ほんとうに けす」を おします。\n「手順を開く」を おすと、つかれが かさなった ときの 手じゅんを、べつの アプリ「ひとつずつ・そよぎ」で ひらきます。',
      '小さな「できた」を 1行 書いて「のこす」を おします。日づけ ごとに ならびます。\n「ひとつ 見かえす」を おすと、のこした 中から ひとつが 大きく 出ます。「べつの ひとつ」で かわり、「とじる」で もどります。\nけす ときは「けす」、つぎに「ほんとうに けす」を おします。',
      '書いたことは すべて この端末の中だけに ほぞんされます。どこにも 送られません。登録も いりません。\nあたらしい スマホに うつるときは、「せってい」の「かきだす」で ファイルを ほぞんして、あたらしい スマホで「よみこむ」を おしてください。',
      '「せってい」の「もじの大きさ」で 文字を 大きく、「いろ」で 画面の 色を かえられます。ことばは 画面の いちばん上の「Language」で えらべます。\nこのアプリは 医療の代わりではありません。危ないときは 119(救急)や 110(警察)、相談窓口へ 連絡してください。相談窓口は、ホームの いちばん下の「たいせつな おしらせ」から さがせます。\nこの 案内は、「せってい」の「つかいかた」の「もういちど 見る」で また 見られます。'
    ]
  },
  screen: {
    home: {
      title:'今日の記録帳',
      intro:'きょうのことを、すこしだけ 書きとめる 帳面です。書かない日が あっても だいじょうぶ。',
      kyori:'あさの きょり', kyoriSub:'きょう 行ける ところを えらぶ',
      genki:'のこり元気', genkiSub:'よていと、つかれの 目もり',
      dekita:'できたこと', dekitaSub:'1行だけ、のこしておく',
      noKinds:'つかう きろくが えらばれていません。「せってい」で ON にしてください。',
      toSet:'せっていを ひらく',
      careTitle:'たいせつな おしらせ',
      care:'このアプリは 医療の代わりではありません。危ないときは 119(救急)や 110(警察)、相談窓口へ 連絡してください。',
      careTeen:'相談窓口を さがす(10代の情報室)',
      careSeido:'つかえる 制度を しらべる(困りごと制度ガイド)',
      careLink:'そよぎの ページを ひらく'
    },
    kyori: {
      title:'あさの きょり',
      hint:'きょう、行ける ところを ひとつ えらんでください。どれを えらんでも、おなじ 大きさで きろくします。',
      opts:['行ける','途中まで','別室','家で過ごす'],
      chosen:'きょうは「{v}」と きろくしました。',
      clear:'えらびなおす',
      letterBtn:'れんらくぶんを つくる',
      letterTitle:'れんらくぶん',
      letterHint:'あいてと ようけんを えらぶと、文が できます。なおして 使っても だいじょうぶです。',
      target:'あいて', targets:['学校','職場'],
      writer:'書く人', writers:['本人','家族'],
      kind:'ようけん', kinds:['きょう おくれて 行く','きょう やすむ','数日 やすむ','しばらく やすむ'],
      name:'なまえ(空でも よい)', namePh:'例: 山田',
      result:'できた 文',
      copy:'コピー', share:'きょうゆう(共有)',
      copied:'コピーしました ✓', copyFail:'コピーできませんでした', shareNone:'この端末では 共有が つかえません', shareFail:'共有できませんでした',
      copyHelp:'文を えらんで おきました。ながおしで コピーできます。',
      histTitle:'これまでの きろく',
      histEmpty:'まだ きろくは ありません。',
      /* 相手に見せる文(漢字) */
      tpl: {
        openSchool:'おはようございます。', openWork:'お世話になっております。',
        self:'{name}です。', family:'{name}の家族です。', familyNoName:'家族から連絡いたします。',
        lateSchool:'本日は体調の都合で、遅れて登校します。', lateWork:'本日は体調の都合で、出社が遅れます。',
        todaySchool:'本日は体調の都合で、お休みします。', todayWork:'本日は体調の都合で、お休みをいただきます。',
        daysSchool:'体調の都合で、数日お休みします。様子を見て、改めてご連絡します。', daysWork:'体調の都合で、数日お休みをいただきます。様子を見て、改めてご連絡します。',
        longSchool:'体調の都合で、しばらくの間お休みします。様子を見て、改めてご連絡します。', longWork:'体調の都合で、しばらくの間お休みをいただきたく、ご相談したいです。改めてご連絡します。',
        close:'ご迷惑をおかけしますが、よろしくお願いいたします。',
        /* 家族が書くとき: 休む/遅れる人({name}=名前、空なら noName)を主語に。{nameWa} は韓国語の 은/는 つき */
        fam: {
          lateSchool:'本日、{name}は体調の都合で、遅れて登校します。', lateWork:'本日、{name}は体調の都合で、出社が遅れます。',
          todaySchool:'本日、{name}は体調の都合で、お休みします。', todayWork:'本日、{name}は体調の都合で、お休みをいただきます。',
          daysSchool:'{name}は体調の都合で、数日お休みします。様子を見て、改めてご連絡します。', daysWork:'{name}は体調の都合で、数日お休みをいただきます。様子を見て、改めてご連絡します。',
          longSchool:'{name}は体調の都合で、しばらくの間お休みします。様子を見て、改めてご連絡します。', longWork:'{name}は体調の都合で、しばらくの間お休みをいただきたく、ご相談したいです。改めてご連絡します。',
          noName:'本人'
        }
      }
    },
    genki: {
      title:'のこり元気',
      hint:'きょうの よていを 1行ずつ 足して、それぞれの つかれを えらぶと、電池の 目もりが へります。数字は 出しません。',
      battLabel:'いまの 電池',
      addPh:'よてい(例: 会議、買い物)',
      add:'ついか',
      empty:'まだ よていは ありません。',
      f1:'ひと', f1v:['すくない','ふつう','おおい'],
      f2:'さわがしさ', f2v:['しずか','ふつう','うるさい'],
      f3:'「ふつう」を えんじた', f3v:['あまり','すこし','ずっと'],
      del:'けす',
      stepsHint:'つかれが かさなった ときの 手じゅんは、べつの アプリ「ひとつずつ・そよぎ」で ひらきます。',
      steps:'手順を開く',
      /* 画面の下に読むだけで出す、前の日の分 */
      prevTitle:'きのうの よてい',
      prevBatt:'きのうの 電池'
    },
    dekita: {
      title:'できたこと',
      hint:'小さな「できた」を 1行で。あとで ひとつずつ 見かえせます。',
      addPh:'きょう できたこと',
      add:'のこす',
      pick:'ひとつ 見かえす',
      empty:'まだ ありません。ちいさな ことで だいじょうぶです。',
      del:'けす', delSure:'ほんとうに けす',
      pickTitle:'できたこと',
      pickAgain:'べつの ひとつ'
    },
    set: {
      h:'つかう きろく',
      kinds:['あさの きょり','のこり元気','できたこと'],
      target:'れんらくの あいて', targets:['学校','職場'],
      writer:'だれのことを 書く', writers:['本人','家族']
    }
  }
};

/* ============ en ============ */
var en = {
  app: { name:'Today Log - SOYOGI', short:'Today Log', tagline:'A daily log that never compares or judges.' },
  nav: { home:'Home', kyori:'Morning', genki:'Energy', dekita:'Done', set:'Settings' },
  common: {
    ok:'OK', cancel:'Cancel', save:'Save', del:'Delete', back:'Back', close:'Close',
    yes:'Yes', no:'No', add:'Add', edit:'Edit', next:'Next', prev:'Previous', done:'Done',
    saved:'Saved ✓', saveFail:'Could not save', storageFull:'Storage is full, could not save',
    deleted:'Deleted', delConfirm:'Really delete this?', empty:'Nothing here yet',
    optional:'You do not have to fill in everything.', today:'Today',
    backConfirm:'What you wrote is not saved yet. Discard it and go back?',
    photo: {
      camera:'Take a photo', roll:'Choose from photos',
      cropTitle:'Crop the photo', cropHint:'Drag with a finger or use the arrows, then change the size with the slider.',
      zoom:'Size', panUp:'Up', panDown:'Down', panLeft:'Left', panRight:'Right',
      make:'Use this', fail:'Could not load the photo'
    }
  },
  set: {
    hNormal:'Everyday settings',
    hBackup:'Changing phones (backup)',
    fs:'Text size', fsSizes:['Normal','Large','Very large'],
    lang:'ことば / Language',
    theme:'Color', themes:['Green','Light blue','White','Black'],
    bgm:'Music', bgms:['None','Green tone','Blue tone'],
    sound:'Tap sound', on:'ON', off:'OFF',
    bkHint:'When you move to a new phone, tap "Export" to save a file, then tap "Import" on the new phone.',
    bkExport:'Export', bkImport:'Import',
    exported:'Exported ✓', imported:'Imported ✓', importFail:'Could not import',
    importConfirm:'Your current entries will be replaced with the file\'s contents. Import it?',
    note:'Everything you write is stored only on this device. Nothing is sent anywhere.',
    privacy:'Privacy policy',
    credit:'Developed by SOYOGI, a care and support consultation service'
  },
  guide: {
    title:'How to use', step:'{n} / {m}', start:'Start', again:'Show again',
    heads:[
      'Welcome to Today Log',
      'What to do first',
      'Morning distance',
      'Write a message',
      'Energy left',
      'Things done',
      'Stored only on this device',
      'Easier to see, and when you need help'
    ],
    bodies:[
      'A small notebook for writing down a little about today: your morning distance, the energy you have left, and things you did.\nIt is a tool for times when going to school or work is hard, and for days when you tire easily.\nThere are no scores or graphs. Nothing is compared or judged.\nDays with no entry are fine too.',
      'Nothing special. Tap a big button on Home, or a tab at the bottom, and you can start writing.\nLogs you do not use can be turned OFF under "Logs to use" in "Settings". They disappear from Home and from the tabs at the bottom.\nIf you will use the message, choose "Message goes to" and "Writing about" in "Settings" first, so you do not have to choose them every time.',
      'Choose one place you can go today: "I can go", "Part way", "Separate room" or "Stay home".\nEvery choice is recorded with the same weight. To change it, tap "Choose again".\nYour days are listed by date under "Past days". Nothing is counted or compared.',
      'Choose "Stay home", or tap "Write a message", and a message for your school or workplace is made.\nJust choose "To", "Written by" and "What to say", and the message changes. The name can be left empty.\nYou can edit the message. Tap "Copy" and paste it into an email or a chat.\nOn devices that show "Share", you can also pick an app to send it with.',
      'Write one of today\'s plans and tap "Add".\nFor each plan, choose a level for People, Noise and Acting "normal", and the "Battery now" gauge goes down. No numbers are shown.\nTo delete a plan, tap "Delete" and then "Really delete".\n"Open the steps" opens the steps for when tiredness piles up, in a separate app, "One by One - SOYOGI".',
      'Write one small thing you did and tap "Keep". Entries are listed by date.\nTap "Look back at one" to show one of them in large text. "Another one" shows a different one, and "Close" takes you back.\nTo delete, tap "Delete" and then "Really delete".',
      'Everything you write is stored only on this device. Nothing is sent anywhere, and no account is needed.\nWhen you move to a new phone, tap "Export" in "Settings" to save a file, then tap "Import" on the new phone.',
      'In "Settings", "Text size" makes the text larger and "Color" changes the colors of the screen. Choose a language with "Language" at the top of the screen.\nThis app is not a substitute for medical care. In an emergency, call 119 (ambulance), 110 (police) or a helpline. You can find helplines under "Important note" at the bottom of Home.\nYou can see this guide again with "Show again" next to "How to use" in "Settings".'
    ]
  },
  screen: {
    home: {
      title:'Today Log',
      intro:'A small notebook for today. Days with no entry are fine too.',
      kyori:'Morning distance', kyoriSub:'Choose how far you can go today',
      genki:'Energy left', genkiSub:'Plans and a battery gauge',
      dekita:'Things done', dekitaSub:'Keep one line',
      noKinds:'No log type is selected. Turn one on in "Settings".',
      toSet:'Open settings',
      careTitle:'Important note',
      care:'This app is not a substitute for medical care. In an emergency, call 119 (ambulance), 110 (police) or a helpline.',
      careTeen:'Find a helpline in Japan (Teen Info Room)',
      careSeido:'Look up support programs in Japan (Japan Support Guide)',
      careLink:'Open the SOYOGI page'
    },
    kyori: {
      title:'Morning distance',
      hint:'Choose one place you can go today. Every choice is recorded with the same weight.',
      opts:['I can go','Part way','Separate room','Stay home'],
      chosen:'Recorded "{v}" for today.',
      clear:'Choose again',
      letterBtn:'Write a message',
      letterTitle:'Message',
      letterHint:'Choose who it is for and what to say, and a message is made. You can edit it.',
      target:'To', targets:['School','Workplace'],
      writer:'Written by', writers:['Myself','Family'],
      kind:'What to say', kinds:['Late today','Absent today','Absent a few days','Absent for a while'],
      name:'Name (may be empty)', namePh:'e.g. Yamada',
      result:'Message',
      copy:'Copy', share:'Share',
      copied:'Copied ✓', copyFail:'Could not copy', shareNone:'Sharing is not available on this device', shareFail:'Could not share',
      copyHelp:'The message is selected. You can copy it with a long press.',
      histTitle:'Past days',
      histEmpty:'No records yet.',
      tpl: {
        openSchool:'Good morning.', openWork:'Hello.',
        self:'This is {name}.', family:'This is the family of {name}.', familyNoName:'This is a message from the family.',
        lateSchool:'Due to health reasons, I will arrive late at school today.', lateWork:'Due to health reasons, I will arrive late at work today.',
        todaySchool:'Due to health reasons, I will be absent from school today.', todayWork:'Due to health reasons, I will take the day off today.',
        daysSchool:'Due to health reasons, I will be absent for a few days. I will contact you again later.', daysWork:'Due to health reasons, I will take a few days off. I will contact you again later.',
        longSchool:'Due to health reasons, I will be absent for a while. I will contact you again later.', longWork:'Due to health reasons, I would like to discuss taking some time off. I will contact you again later.',
        close:'I am sorry for the inconvenience. Thank you for your understanding.',
        fam: {
          lateSchool:'{name} will arrive late at school today due to health reasons.', lateWork:'{name} will arrive late at work today due to health reasons.',
          todaySchool:'{name} will be absent from school today due to health reasons.', todayWork:'{name} will take the day off today due to health reasons.',
          daysSchool:'{name} will be absent for a few days due to health reasons. I will contact you again later.', daysWork:'{name} will take a few days off due to health reasons. I will contact you again later.',
          longSchool:'{name} will be absent for a while due to health reasons. I will contact you again later.', longWork:'{name} needs to take some time off due to health reasons, and I would like to discuss this with you. I will contact you again later.',
          noName:'Our family member'
        }
      }
    },
    genki: {
      title:'Energy left',
      hint:'Add today\'s plans one line at a time and choose how tiring each one is. The battery gauge goes down. No numbers are shown.',
      battLabel:'Battery now',
      addPh:'Plan (e.g. meeting, shopping)',
      add:'Add',
      empty:'No plans yet.',
      f1:'People', f1v:['Few','Some','Many'],
      f2:'Noise', f2v:['Quiet','Normal','Loud'],
      f3:'Acting "normal"', f3v:['Little','Some','All the time'],
      del:'Delete',
      stepsHint:'The steps for when tiredness piles up open in a separate app, "One by One - SOYOGI".',
      steps:'Open the steps',
      prevTitle:'Yesterday\'s plans',
      prevBatt:'Yesterday\'s battery'
    },
    dekita: {
      title:'Things done',
      hint:'One line for a small "done". You can look back at one at a time later.',
      addPh:'Something I did today',
      add:'Keep',
      pick:'Look back at one',
      empty:'Nothing yet. Small things are fine.',
      del:'Delete', delSure:'Really delete',
      pickTitle:'Done',
      pickAgain:'Another one'
    },
    set: {
      h:'Logs to use',
      kinds:['Morning distance','Energy left','Things done'],
      target:'Message goes to', targets:['School','Workplace'],
      writer:'Writing about', writers:['Myself','Family']
    }
  }
};

var TBL = { ja: ja, en: en };
/* 翻訳の差し込み用: en の複製に訳を重ねる(足りないキーは en のまま) */
function mergeDeep(t, s){ for(var k in s){ if(s[k] && typeof s[k] === 'object' && !Array.isArray(s[k])){ if(!t[k] || typeof t[k] !== 'object') t[k] = {}; mergeDeep(t[k], s[k]); } else t[k] = s[k]; } return t; }
/* ---- de: 翻訳 ---- */
TBL.de = mergeDeep(JSON.parse(JSON.stringify(en)), {
  "app": {
    "name": "Tagesnotizen - SOYOGI",
    "short": "Tagesnotizen",
    "tagline": "Aufzeichnung von heute. Ohne Vergleich, ohne Urteil."
  },
  "nav": {
    "home": "Start",
    "kyori": "Morgen",
    "genki": "Energie",
    "dekita": "Geschafft",
    "set": "Optionen"
  },
  "common": {
    "ok": "OK",
    "cancel": "Abbrechen",
    "save": "Speichern",
    "del": "Löschen",
    "back": "Zurück",
    "close": "Schließen",
    "yes": "Ja",
    "no": "Nein",
    "add": "Hinzufügen",
    "edit": "Bearbeiten",
    "next": "Weiter",
    "prev": "Vorherige",
    "done": "Fertig",
    "saved": "Gespeichert ✓",
    "saveFail": "Konnte nicht gespeichert werden",
    "storageFull": "Der Speicher ist voll, es konnte nicht gespeichert werden",
    "deleted": "Gelöscht",
    "delConfirm": "Wirklich löschen?",
    "empty": "Noch nichts vorhanden",
    "optional": "Sie müssen nicht alles ausfüllen.",
    "today": "Heute",
    "backConfirm": "Was Sie geschrieben haben, ist noch nicht gespeichert. Verwerfen und zurückgehen?",
    "photo": {
      "camera": "Mit der Kamera aufnehmen",
      "roll": "Aus den Fotos wählen",
      "cropTitle": "Foto zuschneiden",
      "cropHint": "Mit dem Finger verschieben oder die Pfeile nutzen, dann die Größe mit dem Schieberegler ändern.",
      "zoom": "Größe",
      "panUp": "Nach oben",
      "panDown": "Nach unten",
      "panLeft": "Nach links",
      "panRight": "Nach rechts",
      "make": "So übernehmen",
      "fail": "Das Foto konnte nicht geladen werden"
    }
  },
  "set": {
    "hNormal": "Allgemeine Einstellungen",
    "hBackup": "Gerätewechsel (Sicherung)",
    "fs": "Schriftgröße",
    "fsSizes": [
      "Normal",
      "Groß",
      "Sehr groß"
    ],
    "lang": "ことば / Language",
    "theme": "Farbe",
    "themes": [
      "Grün",
      "Hellblau",
      "Weiß",
      "Schwarz"
    ],
    "bgm": "Hintergrundmusik",
    "bgms": [
      "Keine",
      "Grüner Klang",
      "Blauer Klang"
    ],
    "sound": "Tippton",
    "on": "Ein",
    "off": "Aus",
    "bkHint": "Wenn Sie auf ein neues Smartphone wechseln, tippen Sie auf „Exportieren“, um eine Datei zu speichern, und dann auf dem neuen Smartphone auf „Importieren“.",
    "bkExport": "Exportieren",
    "bkImport": "Importieren",
    "exported": "Exportiert ✓",
    "imported": "Importiert ✓",
    "importFail": "Konnte nicht importiert werden",
    "importConfirm": "Ihre aktuellen Einträge werden durch den Inhalt der Datei ersetzt. Datei importieren?",
    "note": "Alles, was Sie schreiben, wird nur auf diesem Gerät gespeichert. Nichts wird irgendwohin gesendet.",
    "privacy": "Datenschutzerklärung",
    "credit": "Entwickelt von SOYOGI, Beratungsstelle für Pflege und Unterstützung"
  },
  "guide": {
    "title": "Anleitung",
    "step": "{n} / {m}",
    "start": "Starten",
    "again": "Noch einmal ansehen",
    "heads": [
      "Willkommen bei Tagesnotizen",
      "Was Sie zuerst tun",
      "Weg am Morgen",
      "Nachricht erstellen",
      "Restenergie",
      "Geschafftes",
      "Nur auf diesem Gerät",
      "Gut lesbar, und wenn es schwer wird"
    ],
    "bodies": [
      "Ein kleines Heft, um ein wenig von heute festzuhalten: den Weg am Morgen, die Restenergie und das, was Sie geschafft haben.\nEs ist ein Werkzeug für Zeiten, in denen Schule oder Arbeit schwerfallen, und für Tage, an denen Sie schnell müde werden.\nEs gibt keine Punkte und keine Diagramme. Nichts wird verglichen oder beurteilt.\nTage, an denen Sie nichts schreiben, sind auch in Ordnung.",
      "Nichts Besonderes. Tippen Sie bei „Start“ auf einen großen Knopf oder unten auf einen Reiter, dann können Sie gleich schreiben.\nAufzeichnungen, die Sie nicht nutzen, stellen Sie in „Optionen“ unter „Genutzte Aufzeichnungen“ auf „Aus“. Sie verschwinden dann von „Start“ und aus der unteren Leiste.\nWenn Sie die Nachricht nutzen möchten, wählen Sie vorher in „Optionen“ den „Empfänger der Nachricht“ und „Schreiben als“. Dann müssen Sie das nicht jedes Mal wählen.",
      "Wählen Sie einen Ort, zu dem Sie heute gehen können: „Hingehen möglich“, „Ein Stück weit“, „Separater Raum“ oder „Zu Hause bleiben“.\nJede Wahl wird mit dem gleichen Gewicht festgehalten. Zum Ändern tippen Sie auf „Neu wählen“.\nUnter „Bisherige Einträge“ stehen Ihre Tage nach Datum. Nichts wird gezählt oder verglichen.",
      "Wenn Sie „Zu Hause bleiben“ wählen oder auf „Nachricht erstellen“ tippen, entsteht ein Text für die Schule oder den Arbeitsplatz.\nWählen Sie einfach „Empfänger“, „Verfasst von“ und „Anliegen“, dann ändert sich der Text. Der Name darf leer bleiben.\nSie können den Text anpassen. Tippen Sie auf „Kopieren“ und fügen Sie ihn in eine E-Mail oder einen Chat ein.\nAuf Geräten, die „Teilen“ zeigen, können Sie dort auch eine App zum Senden wählen.",
      "Schreiben Sie einen Plan für heute und tippen Sie auf „Hinzufügen“.\nWählen Sie für jeden Plan eine Stufe bei Menschen, Lautstärke und „Normal“ gespielt. Dann sinkt die Anzeige „Batterie jetzt“. Zahlen werden nicht angezeigt.\nZum Löschen tippen Sie auf „Löschen“ und dann auf „Wirklich löschen“.\n„Schritte öffnen“ öffnet die Schritte für den Fall, dass sich Müdigkeit anhäuft, in einer eigenen App: „Eins nach dem anderen - SOYOGI“.",
      "Schreiben Sie eine kleine Sache, die Sie geschafft haben, in eine Zeile und tippen Sie auf „Festhalten“. Die Einträge stehen nach Datum.\nMit „Eines ansehen“ erscheint einer davon groß. „Ein anderes“ zeigt einen anderen, „Schließen“ bringt Sie zurück.\nZum Löschen tippen Sie auf „Löschen“ und dann auf „Wirklich löschen“.",
      "Alles, was Sie schreiben, wird nur auf diesem Gerät gespeichert. Nichts wird irgendwohin gesendet, und Sie brauchen kein Konto.\nWenn Sie auf ein neues Smartphone wechseln, tippen Sie in „Optionen“ auf „Exportieren“, um eine Datei zu speichern, und dann auf dem neuen Smartphone auf „Importieren“.",
      "In „Optionen“ macht „Schriftgröße“ die Schrift größer, und „Farbe“ ändert die Farben. Die Sprache wählen Sie ganz oben bei „Language“.\nDiese App ersetzt keine medizinische Versorgung. Im Notfall wenden Sie sich an 119 (Rettungsdienst) oder 110 (Polizei) in Japan oder an eine Beratungsstelle. Beratungsstellen finden Sie ganz unten auf „Start“ unter „Wichtiger Hinweis“.\nDiese Anleitung öffnen Sie in „Optionen“ bei „Anleitung“ mit „Noch einmal ansehen“ wieder."
    ]
  },
  "screen": {
    "home": {
      "title": "Tagesnotizen",
      "intro": "Ein Heft, um ein wenig von heute festzuhalten. Tage, an denen Sie nichts schreiben, sind auch in Ordnung.",
      "kyori": "Weg am Morgen",
      "kyoriSub": "Wählen, wohin Sie heute gehen können",
      "genki": "Restenergie",
      "genkiSub": "Pläne und die Anzeige der Müdigkeit",
      "dekita": "Geschafftes",
      "dekitaSub": "Nur eine Zeile festhalten",
      "noKinds": "Es ist keine Aufzeichnung ausgewählt. Bitte schalten Sie in den „Einstellungen“ eine ein.",
      "toSet": "Einstellungen öffnen",
      "careTitle": "Wichtiger Hinweis",
      "care": "Diese App ersetzt keine medizinische Versorgung. In einer gefährlichen Situation wenden Sie sich bitte an 119 (Rettungsdienst, Japan), 110 (Polizei, Japan) oder an eine Beratungsstelle.",
      "careTeen": "Beratungsstellen in Japan finden (Teen Info Room)",
      "careSeido": "Unterstützungsangebote in Japan nachschlagen (Japan Support Guide)",
      "careLink": "SOYOGI-Seite öffnen"
    },
    "kyori": {
      "title": "Weg am Morgen",
      "hint": "Wählen Sie einen Ort, zu dem Sie heute gehen können. Jede Wahl wird mit dem gleichen Gewicht festgehalten.",
      "opts": [
        "Hingehen möglich",
        "Ein Stück weit",
        "Separater Raum",
        "Zu Hause bleiben"
      ],
      "chosen": "Für heute wurde „{v}“ festgehalten.",
      "clear": "Neu wählen",
      "letterBtn": "Nachricht erstellen",
      "letterTitle": "Nachricht",
      "letterHint": "Wählen Sie den Empfänger und das Anliegen, dann entsteht ein Text. Sie können ihn vor dem Verwenden anpassen.",
      "target": "Empfänger",
      "targets": [
        "Schule",
        "Arbeitsplatz"
      ],
      "writer": "Verfasst von",
      "writers": [
        "Ich selbst",
        "Familie"
      ],
      "kind": "Anliegen",
      "kinds": [
        "Heute verspätet",
        "Heute abwesend",
        "Einige Tage abwesend",
        "Längere Zeit abwesend"
      ],
      "name": "Name (darf leer bleiben)",
      "namePh": "z. B. Yamada",
      "result": "Fertiger Text",
      "copy": "Kopieren",
      "share": "Teilen",
      "copied": "Kopiert ✓",
      "copyFail": "Konnte nicht kopiert werden",
      "shareNone": "Teilen ist auf diesem Gerät nicht verfügbar",
      "shareFail": "Konnte nicht geteilt werden",
      "copyHelp": "Der Text ist markiert. Er lässt sich durch langes Drücken kopieren.",
      "histTitle": "Bisherige Einträge",
      "histEmpty": "Noch keine Einträge.",
      "tpl": {
        "openSchool": "Guten Morgen.",
        "openWork": "Guten Tag.",
        "self": "Hier schreibt {name}.",
        "family": "Hier schreibt die Familie von {name}.",
        "familyNoName": "Diese Nachricht kommt von der Familie.",
        "lateSchool": "Aus gesundheitlichen Gründen erfolgt der Schulbesuch heute mit Verspätung.",
        "lateWork": "Aus gesundheitlichen Gründen verzögert sich heute der Arbeitsbeginn.",
        "todaySchool": "Aus gesundheitlichen Gründen ist heute leider kein Schulbesuch möglich.",
        "todayWork": "Aus gesundheitlichen Gründen wird heute um einen freien Tag gebeten.",
        "daysSchool": "Aus gesundheitlichen Gründen ist für einige Tage kein Schulbesuch möglich. Je nach Verlauf folgt eine weitere Nachricht.",
        "daysWork": "Aus gesundheitlichen Gründen wird um einige freie Tage gebeten. Je nach Verlauf folgt eine weitere Nachricht.",
        "longSchool": "Aus gesundheitlichen Gründen ist vorerst kein Schulbesuch möglich. Je nach Verlauf folgt eine weitere Nachricht.",
        "longWork": "Aus gesundheitlichen Gründen wird um ein Gespräch über eine Auszeit für einige Zeit gebeten. Eine weitere Nachricht folgt.",
        "close": "Bitte entschuldigen Sie die Umstände. Vielen Dank für Ihr Verständnis.",
        "fam": {
          "lateSchool": "{name} kommt heute aus gesundheitlichen Gründen später zur Schule.",
          "lateWork": "{name} kommt heute aus gesundheitlichen Gründen später zur Arbeit.",
          "todaySchool": "{name} kann heute aus gesundheitlichen Gründen leider nicht zur Schule kommen.",
          "todayWork": "{name} kann heute aus gesundheitlichen Gründen leider nicht zur Arbeit kommen.",
          "daysSchool": "{name} kann aus gesundheitlichen Gründen einige Tage nicht zur Schule kommen. Je nach Verlauf folgt eine weitere Nachricht.",
          "daysWork": "{name} kann aus gesundheitlichen Gründen einige Tage nicht zur Arbeit kommen. Je nach Verlauf folgt eine weitere Nachricht.",
          "longSchool": "{name} kann aus gesundheitlichen Gründen vorerst nicht zur Schule kommen. Je nach Verlauf folgt eine weitere Nachricht.",
          "longWork": "{name} möchte aus gesundheitlichen Gründen vorerst eine Auszeit nehmen, und wir würden gern mit Ihnen darüber sprechen. Eine weitere Nachricht folgt.",
          "noName": "Unser Familienmitglied"
        }
      }
    },
    "genki": {
      "title": "Restenergie",
      "hint": "Fügen Sie die heutigen Pläne Zeile für Zeile hinzu und wählen Sie jeweils, wie anstrengend es ist. Die Batterieanzeige sinkt dann. Zahlen werden nicht angezeigt.",
      "battLabel": "Batterie jetzt",
      "addPh": "Plan (z. B. Besprechung, Einkauf)",
      "add": "Hinzufügen",
      "empty": "Noch keine Pläne.",
      "f1": "Menschen",
      "f1v": [
        "Wenige",
        "Normal",
        "Viele"
      ],
      "f2": "Lautstärke",
      "f2v": [
        "Leise",
        "Normal",
        "Laut"
      ],
      "f3": "„Normal“ gespielt",
      "f3v": [
        "Kaum",
        "Ein wenig",
        "Die ganze Zeit"
      ],
      "del": "Löschen",
      "stepsHint": "Die Schritte für den Fall, dass sich Müdigkeit anhäuft, öffnen sich in einer eigenen App: „Eins nach dem anderen - SOYOGI“.",
      "steps": "Schritte öffnen",
      "prevTitle": "Pläne von gestern",
      "prevBatt": "Batterie gestern"
    },
    "dekita": {
      "title": "Geschafftes",
      "hint": "Ein kleines „Geschafft“ in einer Zeile. Später können Sie eines nach dem anderen ansehen.",
      "addPh": "Was heute geschafft wurde",
      "add": "Festhalten",
      "pick": "Eines ansehen",
      "empty": "Noch nichts da. Kleine Dinge sind völlig in Ordnung.",
      "del": "Löschen",
      "delSure": "Wirklich löschen",
      "pickTitle": "Geschafft",
      "pickAgain": "Ein anderes"
    },
    "set": {
      "h": "Genutzte Aufzeichnungen",
      "kinds": [
        "Weg am Morgen",
        "Restenergie",
        "Geschafftes"
      ],
      "target": "Empfänger der Nachricht",
      "targets": [
        "Schule",
        "Arbeitsplatz"
      ],
      "writer": "Schreiben als",
      "writers": [
        "Ich selbst",
        "Familie"
      ]
    }
  }
});
/* ---- /de ---- */
/* ---- fr: 翻訳 ---- */
TBL.fr = mergeDeep(JSON.parse(JSON.stringify(en)), {
  "app": {
    "name": "Carnet du jour - SOYOGI",
    "short": "Carnet du jour",
    "tagline": "Le carnet du jour, sans comparer ni juger."
  },
  "nav": {
    "home": "Accueil",
    "kyori": "Matin",
    "genki": "Énergie",
    "dekita": "Réussites",
    "set": "Réglages"
  },
  "common": {
    "ok": "OK",
    "cancel": "Annuler",
    "save": "Enregistrer",
    "del": "Supprimer",
    "back": "Retour",
    "close": "Fermer",
    "yes": "Oui",
    "no": "Non",
    "add": "Ajouter",
    "edit": "Modifier",
    "next": "Suivant",
    "prev": "Précédent",
    "done": "Terminé",
    "saved": "Enregistré ✓",
    "saveFail": "Enregistrement impossible",
    "storageFull": "Mémoire pleine, enregistrement impossible",
    "deleted": "Supprimé",
    "delConfirm": "Voulez-vous vraiment supprimer ?",
    "empty": "Rien pour le moment",
    "optional": "Il n'est pas nécessaire de tout remplir.",
    "today": "Aujourd'hui",
    "backConfirm": "Ce que vous avez écrit n'est pas encore enregistré. L'abandonner et revenir en arrière ?",
    "photo": {
      "camera": "Prendre une photo",
      "roll": "Choisir dans les photos",
      "cropTitle": "Recadrer la photo",
      "cropHint": "Déplacez avec le doigt ou avec les flèches, puis réglez la taille avec le curseur.",
      "zoom": "Taille",
      "panUp": "Haut",
      "panDown": "Bas",
      "panLeft": "Gauche",
      "panRight": "Droite",
      "make": "Valider",
      "fail": "Impossible de charger la photo"
    }
  },
  "set": {
    "hNormal": "Réglages habituels",
    "hBackup": "Changement de téléphone (sauvegarde)",
    "fs": "Taille du texte",
    "fsSizes": [
      "Normale",
      "Grande",
      "Très grande"
    ],
    "lang": "ことば / Language",
    "theme": "Couleur",
    "themes": [
      "Vert",
      "Bleu clair",
      "Blanc",
      "Noir"
    ],
    "bgm": "Musique",
    "bgms": [
      "Aucune",
      "Son vert",
      "Son bleu"
    ],
    "sound": "Son au toucher",
    "on": "ON",
    "off": "OFF",
    "bkHint": "Pour passer à un nouveau téléphone, touchez \"Exporter\" pour enregistrer un fichier, puis touchez \"Importer\" sur le nouveau téléphone.",
    "bkExport": "Exporter",
    "bkImport": "Importer",
    "exported": "Exporté ✓",
    "imported": "Importé ✓",
    "importFail": "Importation impossible",
    "importConfirm": "Le contenu actuel sera remplacé par celui du fichier. Importer le fichier ?",
    "note": "Tout ce que vous écrivez reste uniquement sur cet appareil. Rien n'est envoyé nulle part.",
    "privacy": "Politique de confidentialité",
    "credit": "Développé par SOYOGI, service de conseil en soins et accompagnement"
  },
  "guide": {
    "title": "Mode d'emploi",
    "step": "{n} / {m}",
    "start": "Commencer",
    "again": "Revoir",
    "heads": [
      "Bienvenue dans Carnet du jour",
      "Pour commencer",
      "Distance du matin",
      "Rédiger un message",
      "Énergie restante",
      "Réussites du jour",
      "Uniquement sur cet appareil",
      "Lire plus facilement, et en cas de difficulté"
    ],
    "bodies": [
      "Un petit carnet pour noter un peu de votre journée : la distance du matin, l'énergie qui vous reste et vos réussites.\nC'est un outil pour les périodes où aller à l'école ou au travail est difficile, et pour les jours où vous vous fatiguez vite.\nIl n'y a ni score ni graphique. Rien n'est comparé ni jugé.\nLes jours sans rien écrire, c'est très bien aussi.",
      "Rien de particulier. Touchez un grand bouton sur \"Accueil\" ou un onglet en bas, et vous pouvez écrire tout de suite.\nLes carnets que vous n'utilisez pas peuvent être mis sur OFF dans \"Réglages\", sous \"Carnets à utiliser\". Ils disparaissent alors de l'accueil et des onglets du bas.\nSi vous utilisez le message, choisissez d'abord \"Destinataire du message\" et \"À propos de qui ?\" dans \"Réglages\". Vous n'aurez pas à les choisir à chaque fois.",
      "Choisissez un seul endroit où vous pouvez aller aujourd'hui : \"Je peux y aller\", \"Jusqu'à mi-chemin\", \"Salle à part\" ou \"Rester à la maison\".\nChaque choix est noté avec la même valeur. Pour changer, touchez \"Choisir à nouveau\".\nVos jours sont listés par date sous \"Notes précédentes\". Rien n'est compté ni comparé.",
      "Choisissez \"Rester à la maison\" ou touchez \"Rédiger un message\" : un message pour l'école ou le travail est rédigé.\nIl suffit de choisir \"Destinataire\", \"Rédigé par\" et \"Motif\" pour que le message change. Le nom peut rester vide.\nVous pouvez modifier le message. Touchez \"Copier\", puis collez-le dans un e-mail ou une messagerie.\nSur les appareils qui affichent \"Partager\", vous pouvez aussi choisir une application pour l'envoyer.",
      "Écrivez une activité prévue aujourd'hui et touchez \"Ajouter\".\nPour chaque activité, choisissez un niveau pour Personnes, Bruit et Faire comme si de rien n'était : la jauge \"Batterie actuelle\" descend. Aucun chiffre n'est affiché.\nPour supprimer, touchez \"Supprimer\", puis \"Supprimer vraiment\".\n\"Ouvrir les étapes\" ouvre les étapes à suivre quand la fatigue s'accumule, dans une autre application : « Un par un - SOYOGI ».",
      "Écrivez une petite réussite en une ligne et touchez \"Garder\". Les notes sont listées par date.\nTouchez \"En relire une\" pour en afficher une en grand. \"Une autre\" en montre une différente, et \"Fermer\" vous ramène en arrière.\nPour supprimer, touchez \"Supprimer\", puis \"Supprimer vraiment\".",
      "Tout ce que vous écrivez reste uniquement sur cet appareil. Rien n'est envoyé nulle part, et aucun compte n'est nécessaire.\nPour passer à un nouveau téléphone, touchez \"Exporter\" dans \"Réglages\" pour enregistrer un fichier, puis touchez \"Importer\" sur le nouveau téléphone.",
      "Dans \"Réglages\", \"Taille du texte\" agrandit le texte et \"Couleur\" change les couleurs. La langue se choisit tout en haut, avec \"Language\".\nCette application ne remplace pas les soins médicaux. En cas de danger, appelez le 119 (urgences) ou le 110 (police) au Japon, ou une ligne d'écoute. Vous trouverez des lignes d'écoute tout en bas de l'accueil, sous \"Information importante\".\nVous pouvez revoir ce guide dans \"Réglages\", avec \"Revoir\" à la ligne \"Mode d'emploi\"."
    ]
  },
  "screen": {
    "home": {
      "title": "Carnet du jour",
      "intro": "Un petit carnet pour noter un peu de votre journée. Les jours sans rien écrire, c'est très bien aussi.",
      "kyori": "Distance du matin",
      "kyoriSub": "Choisir jusqu'où vous pouvez aller aujourd'hui",
      "genki": "Énergie restante",
      "genkiSub": "Activités prévues et jauge de fatigue",
      "dekita": "Réussites du jour",
      "dekitaSub": "Garder une seule ligne",
      "noKinds": "Aucun carnet n'est activé. Activez-en un dans \"Réglages\".",
      "toSet": "Ouvrir les réglages",
      "careTitle": "Information importante",
      "care": "Cette application ne remplace pas les soins médicaux. En cas de danger, appelez le 119 (urgences, Japon), le 110 (police, Japon) ou une ligne d'écoute.",
      "careTeen": "Trouver une ligne d'écoute au Japon (Teen Info Room)",
      "careSeido": "Consulter les aides disponibles au Japon (Japan Support Guide)",
      "careLink": "Ouvrir la page de SOYOGI"
    },
    "kyori": {
      "title": "Distance du matin",
      "hint": "Choisissez un seul endroit où vous pouvez aller aujourd'hui. Quel que soit votre choix, il est noté avec la même valeur.",
      "opts": [
        "Je peux y aller",
        "Jusqu'à mi-chemin",
        "Salle à part",
        "Rester à la maison"
      ],
      "chosen": "Aujourd'hui, \"{v}\" a été noté.",
      "clear": "Choisir à nouveau",
      "letterBtn": "Rédiger un message",
      "letterTitle": "Message",
      "letterHint": "Choisissez le destinataire et le motif : un message est rédigé. Vous pouvez le modifier avant de l'utiliser.",
      "target": "Destinataire",
      "targets": [
        "École",
        "Travail"
      ],
      "writer": "Rédigé par",
      "writers": [
        "Moi-même",
        "La famille"
      ],
      "kind": "Motif",
      "kinds": [
        "Retard aujourd'hui",
        "Absence aujourd'hui",
        "Absence de quelques jours",
        "Absence prolongée"
      ],
      "name": "Nom (peut rester vide)",
      "namePh": "ex. : Yamada",
      "result": "Message rédigé",
      "copy": "Copier",
      "share": "Partager",
      "copied": "Copié ✓",
      "copyFail": "Copie impossible",
      "shareNone": "Le partage n'est pas disponible sur cet appareil",
      "shareFail": "Partage impossible",
      "copyHelp": "Le texte est sélectionné. Un appui long permet de le copier.",
      "histTitle": "Notes précédentes",
      "histEmpty": "Aucune note pour le moment.",
      "tpl": {
        "openSchool": "Bonjour.",
        "openWork": "Bonjour Madame, Monsieur.",
        "self": "Je suis {name}.",
        "family": "Je suis de la famille de {name}.",
        "familyNoName": "Je vous écris de la part de la famille.",
        "lateSchool": "Pour des raisons de santé, je vous informe d'un retard à l'école aujourd'hui.",
        "lateWork": "Pour des raisons de santé, je vous informe d'un retard au travail aujourd'hui.",
        "todaySchool": "Pour des raisons de santé, je vous informe d'une absence à l'école aujourd'hui.",
        "todayWork": "Pour des raisons de santé, je vous informe d'une absence au travail aujourd'hui.",
        "daysSchool": "Pour des raisons de santé, je vous informe d'une absence de quelques jours. Je vous recontacterai selon l'évolution de la situation.",
        "daysWork": "Pour des raisons de santé, je vous informe d'une absence de quelques jours. Je vous recontacterai selon l'évolution de la situation.",
        "longSchool": "Pour des raisons de santé, je vous informe d'une absence pour un certain temps. Je vous recontacterai selon l'évolution de la situation.",
        "longWork": "Pour des raisons de santé, je souhaiterais échanger avec vous au sujet d'un congé d'une certaine durée. Je vous recontacterai.",
        "close": "Je vous prie de m'excuser pour la gêne occasionnée et vous remercie de votre compréhension.",
        "fam": {
          "lateSchool": "{name} arrivera en retard à l'école aujourd'hui pour des raisons de santé.",
          "lateWork": "{name} arrivera en retard au travail aujourd'hui pour des raisons de santé.",
          "todaySchool": "{name} ne pourra pas aller à l'école aujourd'hui pour des raisons de santé.",
          "todayWork": "{name} ne pourra pas venir travailler aujourd'hui pour des raisons de santé.",
          "daysSchool": "{name} ne pourra pas aller à l'école pendant quelques jours pour des raisons de santé. Je vous recontacterai selon l'évolution de la situation.",
          "daysWork": "{name} ne pourra pas venir travailler pendant quelques jours pour des raisons de santé. Je vous recontacterai selon l'évolution de la situation.",
          "longSchool": "{name} ne pourra pas aller à l'école pendant un certain temps pour des raisons de santé. Je vous recontacterai selon l'évolution de la situation.",
          "longWork": "{name} a besoin d'un congé d'une certaine durée pour des raisons de santé, et je souhaiterais en parler avec vous. Je vous recontacterai.",
          "noName": "Notre proche"
        }
      }
    },
    "genki": {
      "title": "Énergie restante",
      "hint": "Ajoutez les activités prévues aujourd'hui, une par ligne, et choisissez la fatigue de chacune : la jauge de la batterie descend. Aucun chiffre n'est affiché.",
      "battLabel": "Batterie actuelle",
      "addPh": "Activité prévue (ex. : réunion, courses)",
      "add": "Ajouter",
      "empty": "Aucune activité prévue pour le moment.",
      "f1": "Personnes",
      "f1v": [
        "Peu",
        "Moyen",
        "Beaucoup"
      ],
      "f2": "Bruit",
      "f2v": [
        "Calme",
        "Moyen",
        "Bruyant"
      ],
      "f3": "Faire comme si de rien n'était",
      "f3v": [
        "Presque pas",
        "Un peu",
        "Tout le temps"
      ],
      "del": "Supprimer",
      "stepsHint": "Les étapes à suivre quand la fatigue s'accumule s'ouvrent dans une autre application : « Un par un - SOYOGI ».",
      "steps": "Ouvrir les étapes",
      "prevTitle": "Activités d'hier",
      "prevBatt": "Batterie d'hier"
    },
    "dekita": {
      "title": "Réussites du jour",
      "hint": "Une petite \"réussite\" en une ligne. Vous pourrez les relire plus tard, une par une.",
      "addPh": "Ce que j'ai réussi aujourd'hui",
      "add": "Garder",
      "pick": "En relire une",
      "empty": "Rien pour le moment. Une petite chose, c'est très bien aussi.",
      "del": "Supprimer",
      "delSure": "Supprimer vraiment",
      "pickTitle": "Réussite",
      "pickAgain": "Une autre"
    },
    "set": {
      "h": "Carnets à utiliser",
      "kinds": [
        "Distance du matin",
        "Énergie restante",
        "Réussites du jour"
      ],
      "target": "Destinataire du message",
      "targets": [
        "École",
        "Travail"
      ],
      "writer": "À propos de qui ?",
      "writers": [
        "Moi-même",
        "La famille"
      ]
    }
  }
});
/* ---- /fr ---- */
/* ---- es: 翻訳 ---- */
TBL.es = mergeDeep(JSON.parse(JSON.stringify(en)), {
  "app": {
    "name": "Registro de hoy - SOYOGI",
    "short": "Registro de hoy",
    "tagline": "Un registro del día, sin comparar ni juzgar."
  },
  "nav": {
    "home": "Inicio",
    "kyori": "La mañana",
    "genki": "Energía",
    "dekita": "Lo hecho",
    "set": "Ajustes"
  },
  "common": {
    "ok": "OK",
    "cancel": "Cancelar",
    "save": "Guardar",
    "del": "Borrar",
    "back": "Volver",
    "close": "Cerrar",
    "yes": "Sí",
    "no": "No",
    "add": "Añadir",
    "edit": "Editar",
    "next": "Siguiente",
    "prev": "Anterior",
    "done": "Listo",
    "saved": "Guardado ✓",
    "saveFail": "No se pudo guardar",
    "storageFull": "No queda espacio; no se pudo guardar",
    "deleted": "Borrado",
    "delConfirm": "¿Borrar de verdad?",
    "empty": "Todavía no hay nada",
    "optional": "No hace falta rellenarlo todo.",
    "today": "Hoy",
    "backConfirm": "Lo escrito aún no se ha guardado. ¿Descartarlo y volver?",
    "photo": {
      "camera": "Hacer una foto",
      "roll": "Elegir de las fotos",
      "cropTitle": "Recortar la foto",
      "cropHint": "Mover con el dedo o con las flechas, y cambiar el tamaño con el control deslizante.",
      "zoom": "Tamaño",
      "panUp": "Arriba",
      "panDown": "Abajo",
      "panLeft": "Izquierda",
      "panRight": "Derecha",
      "make": "Usar esta",
      "fail": "No se pudo cargar la foto"
    }
  },
  "set": {
    "hNormal": "Ajustes habituales",
    "hBackup": "Cambio de teléfono (copia de seguridad)",
    "fs": "Tamaño del texto",
    "fsSizes": [
      "Normal",
      "Grande",
      "Muy grande"
    ],
    "lang": "ことば / Language",
    "theme": "Color",
    "themes": [
      "Verde",
      "Azul claro",
      "Blanco",
      "Negro"
    ],
    "bgm": "Música",
    "bgms": [
      "Ninguna",
      "Sonido verde",
      "Sonido azul"
    ],
    "sound": "Sonido al tocar",
    "on": "ON",
    "off": "OFF",
    "bkHint": "Para pasar a un teléfono nuevo: guardar un archivo con «Exportar» y, en el teléfono nuevo, pulsar «Importar».",
    "bkExport": "Exportar",
    "bkImport": "Importar",
    "exported": "Exportado ✓",
    "imported": "Importado ✓",
    "importFail": "No se pudo importar",
    "importConfirm": "El contenido actual se sustituirá por el del archivo. ¿Importar el archivo?",
    "note": "Todo lo escrito se guarda solo en este dispositivo. No se envía a ningún sitio.",
    "privacy": "Política de privacidad",
    "credit": "Desarrollo de la app: SOYOGI, espacio de consulta sobre cuidados y apoyo"
  },
  "guide": {
    "title": "Cómo usar",
    "step": "{n} / {m}",
    "start": "Empezar",
    "again": "Ver de nuevo",
    "heads": [
      "Qué es Registro de hoy",
      "Lo primero",
      "Distancia de la mañana",
      "Crear un mensaje",
      "Energía restante",
      "Cosas hechas",
      "Solo en este dispositivo",
      "Para ver mejor, y en caso de apuro"
    ],
    "bodies": [
      "Un cuaderno para anotar un poco sobre el día de hoy: la distancia de la mañana, la energía que queda y las cosas hechas.\nEs una herramienta para épocas en que cuesta ir a estudiar o a trabajar, y para días de mucho cansancio.\nNo hay puntuaciones ni gráficos. Nada se compara ni se juzga.\nNo pasa nada si hay días sin escribir.",
      "Nada en especial. Al pulsar un botón grande en «Inicio» o una pestaña de abajo, ya se puede escribir.\nLos registros que no se usen se pueden poner en OFF en «Ajustes», en «Registros que se usan». Así desaparecen del inicio y de las pestañas de abajo.\nPara usar el mensaje, conviene elegir antes «Destinatario del mensaje» y «Sobre quién se escribe» en «Ajustes». Así no hace falta elegirlos cada vez.",
      "Elegir un lugar al que se pueda ir hoy: «Ir», «A medio camino», «Sala aparte» o «Pasar el día en casa».\nTodas las opciones se registran por igual. Para cambiarla, pulsar «Elegir de nuevo».\nLos días aparecen por fecha en «Registros anteriores». No se cuenta ni se compara nada.",
      "Al elegir «Pasar el día en casa» o pulsar «Crear un mensaje», se crea un texto para el centro de estudios o el trabajo.\nBasta con elegir «Destinatario», «Quién escribe» y «Asunto» para que el texto cambie. El nombre puede quedar vacío.\nEl texto se puede cambiar. Pulsar «Copiar» y pegarlo en un correo o un chat.\nEn los dispositivos que muestran «Compartir», también se puede elegir desde ahí la app para enviarlo.",
      "Escribir un plan de hoy y pulsar «Añadir».\nEn cada plan, elegir un nivel en Gente, Ruido y Aparentar «normalidad»: baja la «Batería actual». No se muestran números.\nPara borrar, pulsar «Borrar» y después «Borrar de verdad».\n«Abrir los pasos» abre, en otra aplicación («Uno a uno - SOYOGI»), los pasos para cuando el cansancio se acumula.",
      "Escribir en una línea una cosa pequeña que se haya hecho y pulsar «Anotar». Se ordenan por fecha.\nCon «Repasar una» aparece una de ellas en grande. «Otra» muestra una distinta y «Cerrar» vuelve atrás.\nPara borrar, pulsar «Borrar» y después «Borrar de verdad».",
      "Todo lo escrito se guarda solo en este dispositivo. No se envía a ningún sitio y no hace falta crear una cuenta.\nPara pasar a un teléfono nuevo: en «Ajustes», guardar un archivo con «Exportar» y, en el teléfono nuevo, pulsar «Importar».",
      "En «Ajustes», «Tamaño del texto» agranda las letras y «Color» cambia los colores. El idioma se elige arriba del todo, en «Language».\nEsta app no sustituye la atención médica. En caso de peligro, contactar con el 119 (ambulancia) o el 110 (policía) de Japón, o con un servicio de consulta. Los servicios de consulta se pueden buscar al final de «Inicio», en «Aviso importante».\nEsta guía se puede volver a ver en «Ajustes», con «Ver de nuevo» en la fila «Cómo usar»."
    ]
  },
  "screen": {
    "home": {
      "title": "Registro de hoy",
      "intro": "Un cuaderno para anotar un poco sobre el día de hoy. No pasa nada si hay días sin escribir.",
      "kyori": "Distancia de la mañana",
      "kyoriSub": "Elegir hasta dónde se puede ir hoy",
      "genki": "Energía restante",
      "genkiSub": "Planes y medidor de cansancio",
      "dekita": "Cosas hechas",
      "dekitaSub": "Dejar solo una línea",
      "noKinds": "No hay ningún registro elegido. Activar alguno en «Ajustes».",
      "toSet": "Abrir ajustes",
      "careTitle": "Aviso importante",
      "care": "Esta app no sustituye la atención médica. En caso de peligro, contactar con el 119 (ambulancia) o el 110 (policía) de Japón, o con un servicio de consulta.",
      "careTeen": "Buscar un servicio de consulta en Japón (Teen Info Room)",
      "careSeido": "Consultar las ayudas disponibles en Japón (Japan Support Guide)",
      "careLink": "Abrir la página de SOYOGI"
    },
    "kyori": {
      "title": "Distancia de la mañana",
      "hint": "Elegir un lugar al que se pueda ir hoy. Todas las opciones se registran por igual.",
      "opts": [
        "Ir",
        "A medio camino",
        "Sala aparte",
        "Pasar el día en casa"
      ],
      "chosen": "Registro de hoy: «{v}».",
      "clear": "Elegir de nuevo",
      "letterBtn": "Crear un mensaje",
      "letterTitle": "Mensaje",
      "letterHint": "Al elegir el destinatario y el asunto, se crea un texto. Se puede cambiar antes de usarlo.",
      "target": "Destinatario",
      "targets": [
        "Centro educativo",
        "Trabajo"
      ],
      "writer": "Quién escribe",
      "writers": [
        "La propia persona",
        "La familia"
      ],
      "kind": "Asunto",
      "kinds": [
        "Llegar tarde hoy",
        "Faltar hoy",
        "Faltar unos días",
        "Faltar por un tiempo"
      ],
      "name": "Nombre (puede quedar vacío)",
      "namePh": "Ej.: Yamada",
      "result": "Texto creado",
      "copy": "Copiar",
      "share": "Compartir",
      "copied": "Copiado ✓",
      "copyFail": "No se pudo copiar",
      "shareNone": "No se puede compartir en este dispositivo",
      "shareFail": "No se pudo compartir",
      "copyHelp": "El texto está seleccionado. Se puede copiar con una pulsación larga.",
      "histTitle": "Registros anteriores",
      "histEmpty": "Todavía no hay registros.",
      "tpl": {
        "openSchool": "Buenos días.",
        "openWork": "Saludos cordiales.",
        "self": "Soy {name}.",
        "family": "Escribe la familia de {name}.",
        "familyNoName": "Mensaje de parte de la familia.",
        "lateSchool": "Por motivos de salud, hoy habrá retraso en la llegada a clase.",
        "lateWork": "Por motivos de salud, hoy habrá retraso en la llegada al trabajo.",
        "todaySchool": "Por motivos de salud, hoy no será posible asistir a clase.",
        "todayWork": "Por motivos de salud, hoy no será posible acudir al trabajo.",
        "daysSchool": "Por motivos de salud, no será posible asistir a clase durante unos días. Según cómo siga la situación, se enviará un nuevo aviso.",
        "daysWork": "Por motivos de salud, no será posible acudir al trabajo durante unos días. Según cómo siga la situación, se enviará un nuevo aviso.",
        "longSchool": "Por motivos de salud, no será posible asistir a clase durante un tiempo. Según cómo siga la situación, se enviará un nuevo aviso.",
        "longWork": "Por motivos de salud, se solicita poder hablar sobre la posibilidad de ausentarse del trabajo durante un tiempo. Se enviará un nuevo aviso más adelante.",
        "close": "Disculpas por las molestias y gracias por la comprensión.",
        "fam": {
          "lateSchool": "{name} llegará tarde a clase hoy por motivos de salud.",
          "lateWork": "{name} llegará tarde al trabajo hoy por motivos de salud.",
          "todaySchool": "{name} no podrá asistir a clase hoy por motivos de salud.",
          "todayWork": "{name} no podrá acudir al trabajo hoy por motivos de salud.",
          "daysSchool": "{name} no podrá asistir a clase durante unos días por motivos de salud. Según cómo siga la situación, se enviará un nuevo aviso.",
          "daysWork": "{name} no podrá acudir al trabajo durante unos días por motivos de salud. Según cómo siga la situación, se enviará un nuevo aviso.",
          "longSchool": "{name} no podrá asistir a clase durante un tiempo por motivos de salud. Según cómo siga la situación, se enviará un nuevo aviso.",
          "longWork": "{name} necesita ausentarse del trabajo durante un tiempo por motivos de salud, y nos gustaría poder hablar de ello. Se enviará un nuevo aviso más adelante.",
          "noName": "Nuestro familiar"
        }
      }
    },
    "genki": {
      "title": "Energía restante",
      "hint": "Al añadir los planes de hoy, uno por línea, y elegir el cansancio de cada uno, baja el nivel de la batería. No se muestran números.",
      "battLabel": "Batería actual",
      "addPh": "Plan (ej.: reunión, compras)",
      "add": "Añadir",
      "empty": "Todavía no hay planes.",
      "f1": "Gente",
      "f1v": [
        "Poca",
        "Normal",
        "Mucha"
      ],
      "f2": "Ruido",
      "f2v": [
        "Tranquilo",
        "Normal",
        "Ruidoso"
      ],
      "f3": "Aparentar «normalidad»",
      "f3v": [
        "Apenas",
        "Un poco",
        "Todo el tiempo"
      ],
      "del": "Borrar",
      "stepsHint": "Los pasos para cuando el cansancio se acumula se abren en otra aplicación: «Uno a uno - SOYOGI».",
      "steps": "Abrir los pasos",
      "prevTitle": "Planes de ayer",
      "prevBatt": "Batería de ayer"
    },
    "dekita": {
      "title": "Cosas hechas",
      "hint": "Una línea para cada pequeño «¡hecho!». Más adelante se pueden repasar de una en una.",
      "addPh": "Algo hecho hoy",
      "add": "Anotar",
      "pick": "Repasar una",
      "empty": "Todavía no hay nada. Algo pequeño es suficiente.",
      "del": "Borrar",
      "delSure": "Borrar de verdad",
      "pickTitle": "Cosas hechas",
      "pickAgain": "Otra"
    },
    "set": {
      "h": "Registros que se usan",
      "kinds": [
        "Distancia de la mañana",
        "Energía restante",
        "Cosas hechas"
      ],
      "target": "Destinatario del mensaje",
      "targets": [
        "Centro educativo",
        "Trabajo"
      ],
      "writer": "Sobre quién se escribe",
      "writers": [
        "La propia persona",
        "La familia"
      ]
    }
  }
});
/* ---- /es ---- */
/* ---- it: 翻訳 ---- */
TBL.it = mergeDeep(JSON.parse(JSON.stringify(en)), {
  "app": {
    "name": "Diario di oggi - SOYOGI",
    "short": "Diario di oggi",
    "tagline": "Un diario di oggi che non confronta e non giudica."
  },
  "nav": {
    "home": "Home",
    "kyori": "Mattina",
    "genki": "Energia",
    "dekita": "Fatto",
    "set": "Opzioni"
  },
  "common": {
    "ok": "OK",
    "cancel": "Annulla",
    "save": "Salva",
    "del": "Elimina",
    "back": "Indietro",
    "close": "Chiudi",
    "yes": "Sì",
    "no": "No",
    "add": "Aggiungi",
    "edit": "Modifica",
    "next": "Avanti",
    "prev": "Precedente",
    "done": "Fatto",
    "saved": "Salvato ✓",
    "saveFail": "Non è stato possibile salvare",
    "storageFull": "Spazio pieno: non è stato possibile salvare",
    "deleted": "Eliminato",
    "delConfirm": "Eliminare davvero?",
    "empty": "Ancora niente qui",
    "optional": "Non serve compilare tutto.",
    "today": "Oggi",
    "backConfirm": "Il testo scritto non è ancora salvato. Scartarlo e tornare indietro?",
    "photo": {
      "camera": "Scatta una foto",
      "roll": "Scegli dalle foto",
      "cropTitle": "Ritaglia la foto",
      "cropHint": "Sposti con il dito o con le frecce, poi regoli la dimensione con il cursore.",
      "zoom": "Dimensione",
      "panUp": "Su",
      "panDown": "Giù",
      "panLeft": "Sinistra",
      "panRight": "Destra",
      "make": "Usa questa",
      "fail": "Non è stato possibile caricare la foto"
    }
  },
  "set": {
    "hNormal": "Impostazioni di ogni giorno",
    "hBackup": "Cambio telefono (backup)",
    "fs": "Dimensione del testo",
    "fsSizes": [
      "Normale",
      "Grande",
      "Molto grande"
    ],
    "lang": "ことば / Language",
    "theme": "Colore",
    "themes": [
      "Verde",
      "Azzurro",
      "Bianco",
      "Nero"
    ],
    "bgm": "Musica",
    "bgms": [
      "Nessuna",
      "Suono verde",
      "Suono blu"
    ],
    "sound": "Suono al tocco",
    "on": "ON",
    "off": "OFF",
    "bkHint": "Quando passa a un nuovo telefono, tocchi \"Esporta\" per salvare un file, poi tocchi \"Importa\" sul nuovo telefono.",
    "bkExport": "Esporta",
    "bkImport": "Importa",
    "exported": "Esportato ✓",
    "imported": "Importato ✓",
    "importFail": "Non è stato possibile importare",
    "importConfirm": "Il contenuto attuale verrà sostituito da quello del file. Importare il file?",
    "note": "Tutto ciò che scrive resta soltanto in questo dispositivo. Non viene inviato da nessuna parte.",
    "privacy": "Informativa sulla privacy",
    "credit": "Sviluppo dell'app: SOYOGI, sportello di consulenza per assistenza e sostegno"
  },
  "guide": {
    "title": "Come si usa",
    "step": "{n} / {m}",
    "start": "Inizia",
    "again": "Rivedi",
    "heads": [
      "Che cos'è Diario di oggi",
      "Per cominciare",
      "Distanza del mattino",
      "Crea un messaggio",
      "Energia rimasta",
      "Cose fatte",
      "Solo su questo dispositivo",
      "Leggere meglio, e nei momenti difficili"
    ],
    "bodies": [
      "Un piccolo quaderno per annotare qualcosa di oggi: la distanza del mattino, l'energia rimasta e le cose fatte.\nÈ uno strumento per i periodi in cui andare a scuola o al lavoro è difficile, e per i giorni in cui ci si stanca facilmente.\nNon ci sono punteggi né grafici. Niente viene confrontato o giudicato.\nVa bene anche se ci sono giorni in cui non scrive.",
      "Niente di particolare. Tocchi un pulsante grande in \"Home\" o una scheda in basso e può scrivere subito.\nI registri che non usa si possono mettere su OFF in \"Opzioni\", alla voce \"Registri da usare\". Spariscono dalla Home e dalle schede in basso.\nSe userà il messaggio, scelga prima \"Destinatario dei messaggi\" e \"Di chi si scrive\" in \"Opzioni\". Così non dovrà sceglierli ogni volta.",
      "Scelga un solo posto in cui può andare oggi: \"Posso andare\", \"Fino a metà strada\", \"In una stanza a parte\" o \"A casa\".\nQualunque scelta viene annotata con lo stesso peso. Per cambiarla, tocchi \"Scegli di nuovo\".\nI giorni compaiono per data in \"Annotazioni precedenti\". Niente viene contato o confrontato.",
      "Se sceglie \"A casa\" o tocca \"Crea un messaggio\", viene composto un testo per la scuola o il lavoro.\nBasta scegliere \"Destinatario\", \"Chi scrive\" e \"Motivo\" e il testo cambia. Il nome può restare vuoto.\nPuò modificare il testo. Tocchi \"Copia\" e lo incolli in un'e-mail o in una chat.\nSui dispositivi che mostrano \"Condividi\", può anche scegliere da lì un'app per inviarlo.",
      "Scriva un programma di oggi e tocchi \"Aggiungi\".\nPer ogni programma scelga un livello per Persone, Rumore e Fingere che sia \"tutto normale\": l'indicatore \"Batteria adesso\" scende. Non compaiono numeri.\nPer eliminare, tocchi \"Elimina\" e poi \"Elimina davvero\".\n\"Apri i passi\" apre i passi da seguire quando la stanchezza si accumula, in un'altra app: «Uno alla volta - SOYOGI».",
      "Scriva in una riga una piccola cosa fatta e tocchi \"Conserva\". Le annotazioni sono ordinate per data.\nCon \"Rileggine una\" ne compare una in grande. \"Un'altra\" ne mostra una diversa e \"Chiudi\" la riporta indietro.\nPer eliminare, tocchi \"Elimina\" e poi \"Elimina davvero\".",
      "Tutto ciò che scrive resta soltanto in questo dispositivo. Non viene inviato da nessuna parte e non serve un account.\nQuando passa a un nuovo telefono, in \"Opzioni\" tocchi \"Esporta\" per salvare un file, poi tocchi \"Importa\" sul nuovo telefono.",
      "In \"Opzioni\", \"Dimensione del testo\" ingrandisce le lettere e \"Colore\" cambia i colori. La lingua si sceglie in alto, con \"Language\".\nQuesta app non sostituisce le cure mediche. In caso di pericolo, chiami il 119 (ambulanza) o il 110 (polizia) in Giappone, o uno sportello di ascolto. Può cercare uno sportello di ascolto in fondo alla \"Home\", in \"Avviso importante\".\nPuò rivedere questa guida in \"Opzioni\", con \"Rivedi\" alla voce \"Come si usa\"."
    ]
  },
  "screen": {
    "home": {
      "title": "Diario di oggi",
      "intro": "Un piccolo quaderno per annotare qualcosa di oggi. Va bene anche se ci sono giorni in cui non scrive.",
      "kyori": "Distanza del mattino",
      "kyoriSub": "Scelga dove può andare oggi",
      "genki": "Energia rimasta",
      "genkiSub": "Programmi e indicatore della stanchezza",
      "dekita": "Cose fatte",
      "dekitaSub": "Una riga soltanto, da conservare",
      "noKinds": "Nessun tipo di registro è selezionato. Lo attivi in \"Impostazioni\".",
      "toSet": "Apri le impostazioni",
      "careTitle": "Avviso importante",
      "care": "Questa app non sostituisce le cure mediche. In caso di pericolo, chiami il 119 (ambulanza, Giappone), il 110 (polizia, Giappone) o uno sportello di ascolto.",
      "careTeen": "Trova uno sportello di ascolto in Giappone (Teen Info Room)",
      "careSeido": "Consulta gli aiuti disponibili in Giappone (Japan Support Guide)",
      "careLink": "Apri la pagina di SOYOGI"
    },
    "kyori": {
      "title": "Distanza del mattino",
      "hint": "Scelga un solo posto in cui può andare oggi. Qualunque scelta viene annotata con lo stesso peso.",
      "opts": [
        "Posso andare",
        "Fino a metà strada",
        "In una stanza a parte",
        "A casa"
      ],
      "chosen": "Per oggi è stato annotato: \"{v}\".",
      "clear": "Scegli di nuovo",
      "letterBtn": "Crea un messaggio",
      "letterTitle": "Messaggio",
      "letterHint": "Scelga il destinatario e il motivo: il testo viene composto da solo. Può modificarlo prima di usarlo.",
      "target": "Destinatario",
      "targets": [
        "Scuola",
        "Lavoro"
      ],
      "writer": "Chi scrive",
      "writers": [
        "Io",
        "La famiglia"
      ],
      "kind": "Motivo",
      "kinds": [
        "Oggi in ritardo",
        "Oggi assente",
        "Assente alcuni giorni",
        "Assente per un po'"
      ],
      "name": "Nome (può restare vuoto)",
      "namePh": "es. Rossi",
      "result": "Testo pronto",
      "copy": "Copia",
      "share": "Condividi",
      "copied": "Copiato ✓",
      "copyFail": "Non è stato possibile copiare",
      "shareNone": "La condivisione non è disponibile su questo dispositivo",
      "shareFail": "Non è stato possibile condividere",
      "copyHelp": "Il testo è selezionato. Si può copiare con una pressione prolungata.",
      "histTitle": "Annotazioni precedenti",
      "histEmpty": "Ancora nessuna annotazione.",
      "tpl": {
        "openSchool": "Buongiorno.",
        "openWork": "Buongiorno.",
        "self": "Sono {name}.",
        "family": "Scrivo da parte della famiglia di {name}.",
        "familyNoName": "Scrivo da parte della famiglia.",
        "lateSchool": "Oggi, per motivi di salute, l'arrivo a scuola avverrà in ritardo.",
        "lateWork": "Oggi, per motivi di salute, l'arrivo al lavoro avverrà in ritardo.",
        "todaySchool": "Oggi, per motivi di salute, non sarà possibile venire a scuola.",
        "todayWork": "Oggi, per motivi di salute, non sarà possibile venire al lavoro.",
        "daysSchool": "Per motivi di salute, l'assenza da scuola durerà alcuni giorni. Seguirà una nuova comunicazione in base a come andranno le cose.",
        "daysWork": "Per motivi di salute, sarà necessaria un'assenza dal lavoro di alcuni giorni. Seguirà una nuova comunicazione in base a come andranno le cose.",
        "longSchool": "Per motivi di salute, l'assenza da scuola durerà per un certo periodo. Seguirà una nuova comunicazione in base a come andranno le cose.",
        "longWork": "Per motivi di salute, sarebbe necessario un periodo di assenza dal lavoro e vorrei parlarne insieme. Seguirà una nuova comunicazione.",
        "close": "Mi scuso per il disagio e ringrazio per la comprensione.",
        "fam": {
          "lateSchool": "{name} oggi arriverà a scuola in ritardo per motivi di salute.",
          "lateWork": "{name} oggi arriverà al lavoro in ritardo per motivi di salute.",
          "todaySchool": "{name} oggi non potrà venire a scuola per motivi di salute.",
          "todayWork": "{name} oggi non potrà venire al lavoro per motivi di salute.",
          "daysSchool": "{name} non potrà venire a scuola per alcuni giorni per motivi di salute. Seguirà una nuova comunicazione in base a come andranno le cose.",
          "daysWork": "{name} non potrà venire al lavoro per alcuni giorni per motivi di salute. Seguirà una nuova comunicazione in base a come andranno le cose.",
          "longSchool": "{name} non potrà venire a scuola per un certo periodo per motivi di salute. Seguirà una nuova comunicazione in base a come andranno le cose.",
          "longWork": "{name} avrebbe bisogno di un periodo di assenza dal lavoro per motivi di salute e vorrei parlarne insieme. Seguirà una nuova comunicazione.",
          "noName": "La persona interessata"
        }
      }
    },
    "genki": {
      "title": "Energia rimasta",
      "hint": "Aggiunga i programmi di oggi una riga alla volta e scelga quanto stanca ciascuno: l'indicatore della batteria scende. Non compaiono numeri.",
      "battLabel": "Batteria adesso",
      "addPh": "Programma (es. riunione, spesa)",
      "add": "Aggiungi",
      "empty": "Ancora nessun programma.",
      "f1": "Persone",
      "f1v": [
        "Poche",
        "Nella media",
        "Molte"
      ],
      "f2": "Rumore",
      "f2v": [
        "Tranquillo",
        "Normale",
        "Rumoroso"
      ],
      "f3": "Fingere che sia \"tutto normale\"",
      "f3v": [
        "Quasi mai",
        "Un po'",
        "Tutto il tempo"
      ],
      "del": "Elimina",
      "stepsHint": "I passi da seguire quando la stanchezza si accumula si aprono in un'altra app: «Uno alla volta - SOYOGI».",
      "steps": "Apri i passi",
      "prevTitle": "Programmi di ieri",
      "prevBatt": "Batteria di ieri"
    },
    "dekita": {
      "title": "Cose fatte",
      "hint": "Un piccolo \"fatto\" in una riga. Più tardi potrà rileggerli uno alla volta.",
      "addPh": "Una cosa fatta oggi",
      "add": "Conserva",
      "pick": "Rileggine una",
      "empty": "Ancora niente. Vanno bene anche le piccole cose.",
      "del": "Elimina",
      "delSure": "Elimina davvero",
      "pickTitle": "Cose fatte",
      "pickAgain": "Un'altra"
    },
    "set": {
      "h": "Registri da usare",
      "kinds": [
        "Distanza del mattino",
        "Energia rimasta",
        "Cose fatte"
      ],
      "target": "Destinatario dei messaggi",
      "targets": [
        "Scuola",
        "Lavoro"
      ],
      "writer": "Di chi si scrive",
      "writers": [
        "Di me",
        "Di un familiare"
      ]
    }
  }
});
/* ---- /it ---- */
/* ---- pt: 翻訳 ---- */
TBL.pt = mergeDeep(JSON.parse(JSON.stringify(en)), {
  "app": {
    "name": "Caderno de hoje - SOYOGI",
    "short": "Caderno de hoje",
    "tagline": "Sem comparar, sem julgar. As anotações de hoje."
  },
  "nav": {
    "home": "Início",
    "kyori": "Manhã",
    "genki": "Energia",
    "dekita": "Feito",
    "set": "Ajustes"
  },
  "common": {
    "ok": "OK",
    "cancel": "Cancelar",
    "save": "Guardar",
    "del": "Apagar",
    "back": "Voltar",
    "close": "Fechar",
    "yes": "Sim",
    "no": "Não",
    "add": "Adicionar",
    "edit": "Editar",
    "next": "Seguinte",
    "prev": "Anterior",
    "done": "Feito",
    "saved": "Guardado ✓",
    "saveFail": "Não foi possível guardar",
    "storageFull": "Sem espaço: não foi possível guardar",
    "deleted": "Apagado",
    "delConfirm": "Apagar mesmo?",
    "empty": "Ainda não há nada",
    "optional": "Não é preciso preencher tudo.",
    "today": "Hoje",
    "backConfirm": "O texto escrito ainda não foi guardado. Descartar e voltar?",
    "photo": {
      "camera": "Tirar uma foto",
      "roll": "Escolher entre as fotos",
      "cropTitle": "Recortar a foto",
      "cropHint": "Mover com o dedo ou com as setas para ajustar, e mudar o tamanho com a barra deslizante.",
      "zoom": "Tamanho",
      "panUp": "Para cima",
      "panDown": "Para baixo",
      "panLeft": "Para a esquerda",
      "panRight": "Para a direita",
      "make": "Usar esta",
      "fail": "Não foi possível carregar a foto"
    }
  },
  "set": {
    "hNormal": "Ajustes do dia a dia",
    "hBackup": "Mudar de smartphone (cópia de segurança)",
    "fs": "Tamanho da letra",
    "fsSizes": [
      "Normal",
      "Grande",
      "Muito grande"
    ],
    "lang": "ことば / Language",
    "theme": "Cor",
    "themes": [
      "Verde",
      "Azul-claro",
      "Branco",
      "Preto"
    ],
    "bgm": "Música de fundo",
    "bgms": [
      "Nenhuma",
      "Som verde",
      "Som azul"
    ],
    "sound": "Som ao tocar",
    "on": "ON",
    "off": "OFF",
    "bkHint": "Ao mudar para um smartphone novo, tocar em \"Exportar\" para guardar uma cópia dos dados e, no smartphone novo, tocar em \"Importar\".",
    "bkExport": "Exportar",
    "bkImport": "Importar",
    "exported": "Exportado ✓",
    "imported": "Importado ✓",
    "importFail": "Não foi possível importar",
    "importConfirm": "Os dados atuais serão substituídos pelos dados da cópia. Importar?",
    "note": "Tudo o que se escreve fica guardado apenas neste dispositivo. Nada é enviado para fora dele.",
    "privacy": "Política de privacidade",
    "credit": "Desenvolvido por SOYOGI, espaço de aconselhamento sobre cuidados e apoio"
  },
  "guide": {
    "title": "Como usar",
    "step": "{n} / {m}",
    "start": "Começar",
    "again": "Ver de novo",
    "heads": [
      "O que é o Caderno de hoje",
      "Para começar",
      "Distância da manhã",
      "Criar mensagem",
      "Energia restante",
      "Coisas feitas",
      "Só neste dispositivo",
      "Leitura mais fácil, e em caso de perigo"
    ],
    "bodies": [
      "Um caderno para anotar um pouco do dia de hoje: a distância da manhã, a energia restante e as coisas feitas.\nÉ uma ferramenta para fases em que é difícil ir à escola ou ao trabalho, e para dias de muito cansaço.\nNão há pontuações nem gráficos. Nada é comparado nem julgado.\nNão faz mal haver dias sem nada escrito.",
      "Nada de especial. Ao tocar em um botão grande em \"Início\" ou em uma aba na parte de baixo, já é possível escrever.\nAs anotações que não forem usadas podem ficar em OFF em \"Ajustes\", em \"Anotações a usar\". Assim, somem do início e das abas de baixo.\nPara usar a mensagem, convém escolher antes \"Destinatário da mensagem\" e \"Sobre quem se escreve\" em \"Ajustes\". Assim não é preciso escolher sempre.",
      "Escolher um lugar até onde é possível ir hoje: \"Consigo ir\", \"Parte do caminho\", \"Sala separada\" ou \"Ficar em casa\".\nTodas as escolhas são anotadas com o mesmo tamanho. Para mudar, tocar em \"Escolher de novo\".\nOs dias aparecem por data em \"Anotações anteriores\". Nada é contado nem comparado.",
      "Ao escolher \"Ficar em casa\" ou tocar em \"Criar mensagem\", fica pronta uma mensagem para a escola ou o trabalho.\nBasta escolher \"Destinatário\", \"Quem escreve\" e \"Assunto\" para a mensagem mudar. O nome pode ficar vazio.\nA mensagem pode ser editada. Tocar em \"Copiar\" e colar em um e-mail ou em um chat.\nNos dispositivos que mostram \"Compartilhar\", também é possível escolher ali por onde enviar.",
      "Escrever um plano de hoje e tocar em \"Adicionar\".\nEm cada plano, escolher um nível em Pessoas, Barulho e Fazer o papel de \"normal\": as marcas de \"Bateria agora\" vão descendo. Não são mostrados números.\nPara apagar, tocar em \"Apagar\" e depois em \"Apagar mesmo\".\n\"Abrir os passos\" abre, em outra ferramenta («Um de cada vez - SOYOGI»), os passos para quando o cansaço se acumula.",
      "Escrever em uma linha uma pequena coisa feita e tocar em \"Anotar\". As anotações ficam por data.\nCom \"Rever uma\", uma delas aparece em tamanho grande. \"Outra\" mostra uma diferente e \"Fechar\" volta atrás.\nPara apagar, tocar em \"Apagar\" e depois em \"Apagar mesmo\".",
      "Tudo o que se escreve fica guardado apenas neste dispositivo. Nada é enviado para fora dele e não é preciso criar conta.\nAo mudar para um smartphone novo, tocar em \"Exportar\" em \"Ajustes\" para guardar uma cópia dos dados e, no smartphone novo, tocar em \"Importar\".",
      "Em \"Ajustes\", \"Tamanho da letra\" aumenta o texto e \"Cor\" muda as cores. O idioma é escolhido bem no alto, em \"Language\".\nEsta ferramenta não substitui cuidados médicos. Em caso de perigo, ligar para o 119 (ambulância) ou o 110 (polícia) no Japão, ou para um serviço de apoio. É possível procurar um serviço de apoio no fim de \"Início\", em \"Aviso importante\".\nEste guia pode ser visto de novo em \"Ajustes\", com \"Ver de novo\" na linha \"Como usar\"."
    ]
  },
  "screen": {
    "home": {
      "title": "Caderno de hoje",
      "intro": "Um caderno para anotar um pouco do dia de hoje. Não faz mal haver dias sem nada escrito.",
      "kyori": "Distância da manhã",
      "kyoriSub": "Escolher até onde é possível ir hoje",
      "genki": "Energia restante",
      "genkiSub": "Planos e medidor de cansaço",
      "dekita": "Coisas feitas",
      "dekitaSub": "Anotar só uma linha",
      "noKinds": "Não há anotações escolhidas para usar. É possível ativá-las em \"Ajustes\" (ON).",
      "toSet": "Abrir ajustes",
      "careTitle": "Aviso importante",
      "care": "Esta ferramenta não substitui cuidados médicos. Em caso de perigo, ligar para o 119 (ambulância) ou o 110 (polícia) no Japão, ou para um serviço de apoio.",
      "careTeen": "Encontrar um serviço de apoio no Japão (Teen Info Room)",
      "careSeido": "Consultar os apoios disponíveis no Japão (Japan Support Guide)",
      "careLink": "Abrir a página de SOYOGI"
    },
    "kyori": {
      "title": "Distância da manhã",
      "hint": "Escolher um lugar até onde é possível ir hoje. Todas as escolhas são anotadas com o mesmo tamanho.",
      "opts": [
        "Consigo ir",
        "Parte do caminho",
        "Sala separada",
        "Ficar em casa"
      ],
      "chosen": "Hoje ficou anotado: \"{v}\".",
      "clear": "Escolher de novo",
      "letterBtn": "Criar mensagem",
      "letterTitle": "Mensagem",
      "letterHint": "Ao escolher o destinatário e o assunto, a mensagem fica pronta. Pode ser editada antes de usar.",
      "target": "Destinatário",
      "targets": [
        "Escola",
        "Trabalho"
      ],
      "writer": "Quem escreve",
      "writers": [
        "A própria pessoa",
        "Família"
      ],
      "kind": "Assunto",
      "kinds": [
        "Chegar mais tarde hoje",
        "Faltar hoje",
        "Faltar alguns dias",
        "Faltar por algum tempo"
      ],
      "name": "Nome (pode ficar vazio)",
      "namePh": "Ex.: Silva",
      "result": "Mensagem pronta",
      "copy": "Copiar",
      "share": "Compartilhar",
      "copied": "Copiado ✓",
      "copyFail": "Não foi possível copiar",
      "shareNone": "Não é possível compartilhar neste dispositivo",
      "shareFail": "Não foi possível compartilhar",
      "copyHelp": "O texto está selecionado. Pode copiá-lo com um toque longo.",
      "histTitle": "Anotações anteriores",
      "histEmpty": "Ainda não há anotações.",
      "tpl": {
        "openSchool": "Bom dia.",
        "openWork": "Bom dia.",
        "self": "Sou {name}.",
        "family": "Sou da família de {name}.",
        "familyNoName": "Esta mensagem é da família.",
        "lateSchool": "Hoje, por motivos de saúde, a chegada à escola será mais tarde.",
        "lateWork": "Hoje, por motivos de saúde, a chegada ao trabalho será mais tarde.",
        "todaySchool": "Hoje, por motivos de saúde, não será possível ir à escola.",
        "todayWork": "Hoje, por motivos de saúde, não será possível ir trabalhar.",
        "daysSchool": "Por motivos de saúde, não será possível ir à escola durante alguns dias. Conforme a situação, mais tarde será enviado um novo aviso.",
        "daysWork": "Por motivos de saúde, não será possível ir trabalhar durante alguns dias. Conforme a situação, mais tarde será enviado um novo aviso.",
        "longSchool": "Por motivos de saúde, não será possível ir à escola durante algum tempo. Conforme a situação, mais tarde será enviado um novo aviso.",
        "longWork": "Por motivos de saúde, há necessidade de faltar ao trabalho durante algum tempo. Seria possível conversar sobre isso? Mais tarde será enviado um novo aviso.",
        "close": "Com desculpas pelo transtorno e agradecimentos pela compreensão.",
        "fam": {
          "lateSchool": "{name} vai chegar mais tarde à escola hoje, por motivos de saúde.",
          "lateWork": "{name} vai chegar mais tarde ao trabalho hoje, por motivos de saúde.",
          "todaySchool": "{name} não poderá ir à escola hoje, por motivos de saúde.",
          "todayWork": "{name} não poderá ir trabalhar hoje, por motivos de saúde.",
          "daysSchool": "{name} não poderá ir à escola durante alguns dias, por motivos de saúde. Conforme a situação, mais tarde será enviado um novo aviso.",
          "daysWork": "{name} não poderá ir trabalhar durante alguns dias, por motivos de saúde. Conforme a situação, mais tarde será enviado um novo aviso.",
          "longSchool": "{name} não poderá ir à escola durante algum tempo, por motivos de saúde. Conforme a situação, mais tarde será enviado um novo aviso.",
          "longWork": "{name} precisa de faltar ao trabalho durante algum tempo, por motivos de saúde. Seria possível conversar sobre isso? Mais tarde será enviado um novo aviso.",
          "noName": "O nosso familiar"
        }
      }
    },
    "genki": {
      "title": "Energia restante",
      "hint": "Ao adicionar os planos de hoje, um por linha, e escolher o cansaço de cada um, as marcas da bateria vão descendo. Não são mostrados números.",
      "battLabel": "Bateria agora",
      "addPh": "Plano (ex.: reunião, compras)",
      "add": "Adicionar",
      "empty": "Ainda não há planos.",
      "f1": "Pessoas",
      "f1v": [
        "Poucas",
        "Normal",
        "Muitas"
      ],
      "f2": "Barulho",
      "f2v": [
        "Tranquilo",
        "Normal",
        "Barulhento"
      ],
      "f3": "Fazer o papel de \"normal\"",
      "f3v": [
        "Pouco",
        "Um pouco",
        "O tempo todo"
      ],
      "del": "Apagar",
      "stepsHint": "Os passos para quando o cansaço se acumula abrem-se em outra ferramenta: «Um de cada vez - SOYOGI».",
      "steps": "Abrir os passos",
      "prevTitle": "Planos de ontem",
      "prevBatt": "Bateria de ontem"
    },
    "dekita": {
      "title": "Coisas feitas",
      "hint": "Uma linha para cada pequena coisa feita. Depois, é possível rever uma de cada vez.",
      "addPh": "Algo que fiz hoje",
      "add": "Anotar",
      "pick": "Rever uma",
      "empty": "Ainda não há nada. Coisas pequenas também servem.",
      "del": "Apagar",
      "delSure": "Apagar mesmo",
      "pickTitle": "Uma coisa feita",
      "pickAgain": "Outra"
    },
    "set": {
      "h": "Anotações a usar",
      "kinds": [
        "Distância da manhã",
        "Energia restante",
        "Coisas feitas"
      ],
      "target": "Destinatário da mensagem",
      "targets": [
        "Escola",
        "Trabalho"
      ],
      "writer": "Sobre quem se escreve",
      "writers": [
        "A própria pessoa",
        "Família"
      ]
    }
  }
});
/* ---- /pt ---- */
/* ---- nl: 翻訳 ---- */
TBL.nl = mergeDeep(JSON.parse(JSON.stringify(en)), {
  "app": {
    "name": "Logboek van vandaag - SOYOGI",
    "short": "Logboek van vandaag",
    "tagline": "Niet vergelijken, niet beoordelen. Gewoon vandaag vastleggen."
  },
  "nav": {
    "home": "Start",
    "kyori": "Ochtend",
    "genki": "Energie",
    "dekita": "Gelukt",
    "set": "Opties"
  },
  "common": {
    "ok": "OK",
    "cancel": "Annuleren",
    "save": "Opslaan",
    "del": "Wissen",
    "back": "Terug",
    "close": "Sluiten",
    "yes": "Ja",
    "no": "Nee",
    "add": "Toevoegen",
    "edit": "Aanpassen",
    "next": "Volgende",
    "prev": "Vorige",
    "done": "Klaar",
    "saved": "Opgeslagen ✓",
    "saveFail": "Opslaan is niet gelukt",
    "storageFull": "De opslag is vol, opslaan is niet gelukt",
    "deleted": "Gewist",
    "delConfirm": "Wilt u dit echt wissen?",
    "empty": "Nog niets",
    "optional": "U hoeft niet alles in te vullen.",
    "today": "Vandaag",
    "backConfirm": "Wat u hebt geschreven, is nog niet opgeslagen. Weggooien en teruggaan?",
    "photo": {
      "camera": "Foto maken",
      "roll": "Kiezen uit foto's",
      "cropTitle": "Foto bijsnijden",
      "cropHint": "Verschuif met uw vinger of met de pijltjes, en verander de grootte met de schuifknop.",
      "zoom": "Grootte",
      "panUp": "Omhoog",
      "panDown": "Omlaag",
      "panLeft": "Naar links",
      "panRight": "Naar rechts",
      "make": "Deze gebruiken",
      "fail": "De foto kon niet worden geladen"
    }
  },
  "set": {
    "hNormal": "Gewone instellingen",
    "hBackup": "Nieuwe telefoon (back-up)",
    "fs": "Tekstgrootte",
    "fsSizes": [
      "Normaal",
      "Groot",
      "Heel groot"
    ],
    "lang": "ことば / Language",
    "theme": "Kleur",
    "themes": [
      "Groen",
      "Lichtblauw",
      "Wit",
      "Zwart"
    ],
    "bgm": "Muziek",
    "bgms": [
      "Geen",
      "Groene klank",
      "Blauwe klank"
    ],
    "sound": "Tikgeluid",
    "on": "AAN",
    "off": "UIT",
    "bkHint": "Gaat u over op een nieuwe telefoon? Tik dan op \"Exporteren\" om een bestand op te slaan, en tik op de nieuwe telefoon op \"Importeren\".",
    "bkExport": "Exporteren",
    "bkImport": "Importeren",
    "exported": "Geëxporteerd ✓",
    "imported": "Geïmporteerd ✓",
    "importFail": "Importeren is niet gelukt",
    "importConfirm": "De huidige inhoud wordt vervangen door de inhoud van het bestand. Wilt u importeren?",
    "note": "Alles wat u schrijft, blijft alleen op dit apparaat. Er wordt niets verstuurd.",
    "privacy": "Privacybeleid",
    "credit": "App-ontwikkeling: SOYOGI, adviespunt voor zorg en ondersteuning"
  },
  "guide": {
    "title": "Uitleg",
    "step": "{n} / {m}",
    "start": "Beginnen",
    "again": "Opnieuw bekijken",
    "heads": [
      "Welkom bij Logboek van vandaag",
      "Eerst doen",
      "Afstand vanochtend",
      "Bericht maken",
      "Energie over",
      "Wat is gelukt",
      "Alleen op dit apparaat",
      "Goed leesbaar, en als het moeilijk is"
    ],
    "bodies": [
      "Een klein boekje om iets over vandaag op te schrijven: de afstand vanochtend, de energie die u over hebt en wat is gelukt.\nHet is een hulpmiddel voor periodes waarin naar school of werk gaan moeilijk is, en voor dagen waarop u snel moe bent.\nEr zijn geen scores en geen grafieken. Niets wordt vergeleken of beoordeeld.\nDagen waarop u niets schrijft, zijn ook prima.",
      "Niets bijzonders. Tik op een grote knop bij \"Start\" of op een tab onderaan, en u kunt meteen schrijven.\nLogboeken die u niet gebruikt, zet u op \"UIT\" bij \"Opties\", onder \"Welke logboeken u gebruikt\". Ze verdwijnen dan van \"Start\" en uit de tabs onderaan.\nWilt u het bericht gebruiken? Kies dan eerst \"Ontvanger van het bericht\" en \"Over wie u schrijft\" bij \"Opties\". Dan hoeft u dat niet elke keer te kiezen.",
      "Kies één plek waar u vandaag naartoe kunt: \"Ik kan gaan\", \"Tot halverwege\", \"Aparte ruimte\" of \"Thuis blijven\".\nWelke u ook kiest, alles wordt even groot vastgelegd. Om te wijzigen tikt u op \"Opnieuw kiezen\".\nOnder \"Eerdere aantekeningen\" staan uw dagen op datum. Er wordt niets geteld of vergeleken.",
      "Kies \"Thuis blijven\" of tik op \"Bericht maken\", dan ontstaat er een tekst voor school of werk.\nKies alleen \"Aan\", \"Geschreven door\" en \"Onderwerp\", en de tekst past zich aan. De naam mag leeg blijven.\nU mag de tekst aanpassen. Tik op \"Kopiëren\" en plak hem in een e-mail of chat.\nOp apparaten die \"Delen\" tonen, kunt u daar ook een app kiezen om hem te versturen.",
      "Schrijf een plan voor vandaag en tik op \"Toevoegen\".\nKies bij elk plan een niveau voor Mensen, Geluid en Zich \"normaal\" voordoen: de meter \"Batterij nu\" loopt dan terug. Er worden geen cijfers getoond.\nOm te wissen tikt u op \"Wissen\" en daarna op \"Echt wissen\".\n\"Stappen openen\" opent de stappen voor als vermoeidheid zich opstapelt, in een aparte app: “Eén voor één - SOYOGI”.",
      "Schrijf in één regel iets kleins dat is gelukt en tik op \"Bewaren\". De aantekeningen staan op datum.\nMet \"Eén terugkijken\" verschijnt er één in grote letters. \"Een andere\" toont een andere, en met \"Sluiten\" gaat u terug.\nOm te wissen tikt u op \"Wissen\" en daarna op \"Echt wissen\".",
      "Alles wat u schrijft, blijft alleen op dit apparaat. Er wordt niets verstuurd en u hebt geen account nodig.\nGaat u over op een nieuwe telefoon? Tik dan bij \"Opties\" op \"Exporteren\" om een bestand op te slaan, en tik op de nieuwe telefoon op \"Importeren\".",
      "Bij \"Opties\" maakt \"Tekstgrootte\" de letters groter en verandert \"Kleur\" de kleuren van het scherm. De taal kiest u helemaal bovenaan bij \"Language\".\nDeze app vervangt geen medische zorg. Bel bij gevaar 119 (ambulance, Japan), 110 (politie, Japan) of een hulplijn. Een hulplijn zoekt u onderaan \"Start\", bij \"Belangrijke mededeling\".\nU kunt deze uitleg opnieuw bekijken bij \"Opties\", met \"Opnieuw bekijken\" naast \"Uitleg\"."
    ]
  },
  "screen": {
    "home": {
      "title": "Logboek van vandaag",
      "intro": "Een klein boekje om iets over vandaag op te schrijven. Dagen waarop u niets schrijft, zijn ook prima.",
      "kyori": "Afstand vanochtend",
      "kyoriSub": "Kies waar u vandaag naartoe kunt",
      "genki": "Energie over",
      "genkiSub": "Plannen en een meter voor vermoeidheid",
      "dekita": "Wat is gelukt",
      "dekitaSub": "Eén regel bewaren",
      "noKinds": "Er is nog geen soort logboek gekozen. Zet er een AAN bij \"Instellingen\".",
      "toSet": "Instellingen openen",
      "careTitle": "Belangrijke mededeling",
      "care": "Deze app vervangt geen medische zorg. Bel bij gevaar 119 (ambulance, Japan), 110 (politie, Japan) of een hulplijn.",
      "careTeen": "Een hulplijn in Japan zoeken (Teen Info Room)",
      "careSeido": "Ondersteuning in Japan opzoeken (Japan Support Guide)",
      "careLink": "De pagina van SOYOGI openen"
    },
    "kyori": {
      "title": "Afstand vanochtend",
      "hint": "Kies één plek waar u vandaag naartoe kunt. Welke u ook kiest, alles wordt even groot vastgelegd.",
      "opts": [
        "Ik kan gaan",
        "Tot halverwege",
        "Aparte ruimte",
        "Thuis blijven"
      ],
      "chosen": "Voor vandaag is \"{v}\" vastgelegd.",
      "clear": "Opnieuw kiezen",
      "letterBtn": "Bericht maken",
      "letterTitle": "Bericht",
      "letterHint": "Kies voor wie het is en wat u wilt zeggen, dan ontstaat er een tekst. U mag die aanpassen voordat u hem gebruikt.",
      "target": "Aan",
      "targets": [
        "School",
        "Werk"
      ],
      "writer": "Geschreven door",
      "writers": [
        "Uzelf",
        "Familie"
      ],
      "kind": "Onderwerp",
      "kinds": [
        "Vandaag later komen",
        "Vandaag afwezig",
        "Een paar dagen afwezig",
        "Een tijdje afwezig"
      ],
      "name": "Naam (mag leeg blijven)",
      "namePh": "bijv. Yamada",
      "result": "Uw bericht",
      "copy": "Kopiëren",
      "share": "Delen",
      "copied": "Gekopieerd ✓",
      "copyFail": "Kopiëren is niet gelukt",
      "shareNone": "Delen is op dit apparaat niet mogelijk",
      "shareFail": "Delen is niet gelukt",
      "copyHelp": "De tekst is geselecteerd. Houd hem lang ingedrukt om te kopiëren.",
      "histTitle": "Eerdere aantekeningen",
      "histEmpty": "Nog geen aantekeningen.",
      "tpl": {
        "openSchool": "Goedemorgen.",
        "openWork": "Goedendag.",
        "self": "Hierbij een bericht van {name}.",
        "family": "Hierbij een bericht van de familie van {name}.",
        "familyNoName": "Hierbij een bericht van de familie.",
        "lateSchool": "Om gezondheidsredenen is het vandaag niet mogelijk om op tijd op school te zijn.",
        "lateWork": "Om gezondheidsredenen is het vandaag niet mogelijk om op tijd op het werk te zijn.",
        "todaySchool": "Om gezondheidsredenen is het vandaag helaas niet mogelijk om naar school te komen.",
        "todayWork": "Om gezondheidsredenen is het vandaag helaas niet mogelijk om te komen werken.",
        "daysSchool": "Om gezondheidsredenen is het de komende dagen niet mogelijk om naar school te komen. Zodra er meer bekend is, volgt er opnieuw bericht.",
        "daysWork": "Om gezondheidsredenen is het de komende dagen niet mogelijk om te komen werken. Zodra er meer bekend is, volgt er opnieuw bericht.",
        "longSchool": "Om gezondheidsredenen is het voorlopig niet mogelijk om naar school te komen. Zodra er meer bekend is, volgt er opnieuw bericht.",
        "longWork": "Om gezondheidsredenen zou ik voorlopig graag vrij nemen, en ik wil dit graag met u overleggen. Er volgt later opnieuw bericht.",
        "close": "Excuses voor het ongemak. Alvast bedankt voor uw begrip.",
        "fam": {
          "lateSchool": "{name} komt vandaag om gezondheidsredenen later op school.",
          "lateWork": "{name} komt vandaag om gezondheidsredenen later op het werk.",
          "todaySchool": "{name} kan vandaag om gezondheidsredenen helaas niet naar school komen.",
          "todayWork": "{name} kan vandaag om gezondheidsredenen helaas niet komen werken.",
          "daysSchool": "{name} kan de komende dagen om gezondheidsredenen niet naar school komen. Zodra er meer bekend is, volgt er opnieuw bericht.",
          "daysWork": "{name} kan de komende dagen om gezondheidsredenen niet komen werken. Zodra er meer bekend is, volgt er opnieuw bericht.",
          "longSchool": "{name} kan voorlopig om gezondheidsredenen niet naar school komen. Zodra er meer bekend is, volgt er opnieuw bericht.",
          "longWork": "{name} zou om gezondheidsredenen voorlopig graag vrij nemen, en we overleggen dit graag met u. Er volgt later opnieuw bericht.",
          "noName": "Ons familielid"
        }
      }
    },
    "genki": {
      "title": "Energie over",
      "hint": "Voeg de plannen van vandaag regel voor regel toe en kies hoe vermoeiend elk plan is. De batterijmeter loopt dan terug. Er worden geen cijfers getoond.",
      "battLabel": "Batterij nu",
      "addPh": "Plan (bijv. vergadering, boodschappen)",
      "add": "Toevoegen",
      "empty": "Nog geen plannen.",
      "f1": "Mensen",
      "f1v": [
        "Weinig",
        "Gewoon",
        "Veel"
      ],
      "f2": "Geluid",
      "f2v": [
        "Rustig",
        "Gewoon",
        "Luid"
      ],
      "f3": "Zich \"normaal\" voordoen",
      "f3v": [
        "Nauwelijks",
        "Een beetje",
        "De hele tijd"
      ],
      "del": "Wissen",
      "stepsHint": "De stappen voor als vermoeidheid zich opstapelt, openen in een aparte app: “Eén voor één - SOYOGI”.",
      "steps": "Stappen openen",
      "prevTitle": "Plannen van gisteren",
      "prevBatt": "Batterij gisteren"
    },
    "dekita": {
      "title": "Wat is gelukt",
      "hint": "Eén regel voor iets kleins dat is gelukt. Later kunt u ze één voor één terugkijken.",
      "addPh": "Wat vandaag is gelukt",
      "add": "Bewaren",
      "pick": "Eén terugkijken",
      "empty": "Nog niets. Iets kleins is ook prima.",
      "del": "Wissen",
      "delSure": "Echt wissen",
      "pickTitle": "Gelukt",
      "pickAgain": "Een andere"
    },
    "set": {
      "h": "Welke logboeken u gebruikt",
      "kinds": [
        "Afstand vanochtend",
        "Energie over",
        "Wat is gelukt"
      ],
      "target": "Ontvanger van het bericht",
      "targets": [
        "School",
        "Werk"
      ],
      "writer": "Over wie u schrijft",
      "writers": [
        "Uzelf",
        "Familie"
      ]
    }
  }
});
/* ---- /nl ---- */
/* ---- sv: 翻訳 ---- */
TBL.sv = mergeDeep(JSON.parse(JSON.stringify(en)), {
  "app": {
    "name": "Dagens logg - SOYOGI",
    "short": "Dagens logg",
    "tagline": "En logg för i dag som inte jämför och inte bedömer."
  },
  "nav": {
    "home": "Hem",
    "kyori": "Morgon",
    "genki": "Energi",
    "dekita": "Klarat",
    "set": "Anpassa"
  },
  "common": {
    "ok": "OK",
    "cancel": "Avbryt",
    "save": "Spara",
    "del": "Ta bort",
    "back": "Tillbaka",
    "close": "Stäng",
    "yes": "Ja",
    "no": "Nej",
    "add": "Lägg till",
    "edit": "Ändra",
    "next": "Nästa",
    "prev": "Föregående",
    "done": "Klar",
    "saved": "Sparat ✓",
    "saveFail": "Det gick inte att spara",
    "storageFull": "Lagringen är full, det gick inte att spara",
    "deleted": "Borttaget",
    "delConfirm": "Vill du verkligen ta bort det här?",
    "empty": "Här finns inget ännu",
    "optional": "Du behöver inte fylla i allt.",
    "today": "I dag",
    "backConfirm": "Det du har skrivit är inte sparat än. Vill du slänga det och gå tillbaka?",
    "photo": {
      "camera": "Ta ett foto",
      "roll": "Välj bland foton",
      "cropTitle": "Beskär fotot",
      "cropHint": "Flytta med fingret eller med pilarna, och ändra storleken med reglaget.",
      "zoom": "Storlek",
      "panUp": "Upp",
      "panDown": "Ner",
      "panLeft": "Vänster",
      "panRight": "Höger",
      "make": "Använd den här",
      "fail": "Det gick inte att läsa in fotot"
    }
  },
  "set": {
    "hNormal": "Vanliga inställningar",
    "hBackup": "Byta telefon (säkerhetskopia)",
    "fs": "Textstorlek",
    "fsSizes": [
      "Normal",
      "Stor",
      "Mycket stor"
    ],
    "lang": "ことば / Language",
    "theme": "Färg",
    "themes": [
      "Grön",
      "Ljusblå",
      "Vit",
      "Svart"
    ],
    "bgm": "Bakgrundsmusik",
    "bgms": [
      "Ingen",
      "Grön ton",
      "Blå ton"
    ],
    "sound": "Ljud vid tryck",
    "on": "PÅ",
    "off": "AV",
    "bkHint": "När du byter till en ny telefon: tryck på ”Exportera” för att spara en fil, och tryck sedan på ”Importera” på den nya telefonen.",
    "bkExport": "Exportera",
    "bkImport": "Importera",
    "exported": "Exporterat ✓",
    "imported": "Importerat ✓",
    "importFail": "Det gick inte att importera",
    "importConfirm": "Det du har nu ersätts med innehållet i filen. Vill du importera?",
    "note": "Allt du skriver sparas bara på den här enheten. Inget skickas någonstans.",
    "privacy": "Integritetspolicy",
    "credit": "Utvecklad av SOYOGI, en rådgivningstjänst för omsorg och stöd"
  },
  "guide": {
    "title": "Så fungerar appen",
    "step": "{n} / {m}",
    "start": "Börja",
    "again": "Visa igen",
    "heads": [
      "Välkommen till Dagens logg",
      "Det första du gör",
      "Morgonens avstånd",
      "Skriv ett meddelande",
      "Energi kvar",
      "Det jag klarat",
      "Bara på den här enheten",
      "Lättare att läsa, och när det är svårt"
    ],
    "bodies": [
      "En liten anteckningsbok där du skriver ner lite om dagen: morgonens avstånd, energin du har kvar och det du klarat.\nDen är ett verktyg för perioder när det är svårt att gå till skolan eller jobbet, och för dagar när du lätt blir trött.\nDet finns inga poäng och inga diagram. Inget jämförs eller bedöms.\nDet är okej att inte skriva vissa dagar.",
      "Inget särskilt. Tryck på en stor knapp på ”Hem” eller på en flik längst ner, så kan du börja skriva.\nLoggar som du inte använder kan du ställa på ”AV” under ”Loggar att använda” i ”Anpassa”. De försvinner då från Hem och från flikarna längst ner.\nOm du ska använda meddelandet, välj först ”Meddelandet går till” och ”Du skriver om” i ”Anpassa”. Då behöver du inte välja varje gång.",
      "Välj ett ställe som du kan ta dig till i dag: ”Kan ta mig dit”, ”En bit på vägen”, ”Separat rum” eller ”Stanna hemma”.\nVad du än väljer sparas det med samma vikt. Tryck på ”Välj igen” för att ändra.\nUnder ”Tidigare anteckningar” visas dina dagar efter datum. Inget räknas eller jämförs.",
      "Välj ”Stanna hemma” eller tryck på ”Skriv ett meddelande”, så skapas en text till skolan eller jobbet.\nVälj bara ”Till”, ”Vem skriver” och ”Ärende”, så ändras texten. Namnet får vara tomt.\nDu kan ändra i texten. Tryck på ”Kopiera” och klistra in den i ett mejl eller en chatt.\nPå enheter som visar ”Dela” kan du också välja en app att skicka med där.",
      "Skriv en av dagens planer och tryck på ”Lägg till”.\nVälj för varje plan en nivå för Människor, Ljudnivå och Spelade ”normal”, så går ”Batteriet nu” ner. Inga siffror visas.\nFör att ta bort trycker du på ”Ta bort” och sedan på ”Ja, ta bort”.\n”Öppna stegen” öppnar stegen för när tröttheten har hopat sig, i en egen app: ”En i taget - SOYOGI”.",
      "Skriv en liten sak som du klarat på en rad och tryck på ”Spara”. Anteckningarna visas efter datum.\nMed ”Titta tillbaka på en” visas en av dem i stor text. ”En annan” visar en annan, och ”Stäng” tar dig tillbaka.\nFör att ta bort trycker du på ”Ta bort” och sedan på ”Ja, ta bort”.",
      "Allt du skriver sparas bara på den här enheten. Inget skickas någonstans, och du behöver inget konto.\nNär du byter till en ny telefon: tryck på ”Exportera” i ”Anpassa” för att spara en fil, och tryck sedan på ”Importera” på den nya telefonen.",
      "I ”Anpassa” gör ”Textstorlek” texten större och ”Färg” ändrar skärmens färger. Språket väljer du längst upp vid ”Language”.\nDen här appen ersätter inte sjukvård. Om det är farligt, kontakta 119 (ambulans) eller 110 (polis) i Japan, eller en stödlinje. En stödlinje hittar du längst ner på ”Hem”, under ”Viktigt att veta”.\nDu kan se den här guiden igen i ”Anpassa”, med ”Visa igen” vid ”Så fungerar appen”."
    ]
  },
  "screen": {
    "home": {
      "title": "Dagens logg",
      "intro": "En liten anteckningsbok där du skriver ner lite om dagen. Det är okej att inte skriva vissa dagar.",
      "kyori": "Morgonens avstånd",
      "kyoriSub": "Välj vart du kan ta dig i dag",
      "genki": "Energi kvar",
      "genkiSub": "Planer och en batterimätare",
      "dekita": "Det jag klarat",
      "dekitaSub": "Skriv ner en enda rad",
      "noKinds": "Ingen logg är vald. Slå på den du vill använda i ”Inställningar”.",
      "toSet": "Öppna inställningar",
      "careTitle": "Viktigt att veta",
      "care": "Den här appen ersätter inte sjukvård. Om det är farligt, kontakta 119 (ambulans) eller 110 (polis) i Japan, eller en stödlinje.",
      "careTeen": "Hitta en stödlinje i Japan (Teen Info Room)",
      "careSeido": "Se vilket stöd som finns i Japan (Japan Support Guide)",
      "careLink": "Öppna SOYOGI-sidan"
    },
    "kyori": {
      "title": "Morgonens avstånd",
      "hint": "Välj ett ställe som du kan ta dig till i dag. Vad du än väljer sparas det med samma vikt.",
      "opts": [
        "Kan ta mig dit",
        "En bit på vägen",
        "Separat rum",
        "Stanna hemma"
      ],
      "chosen": "Sparat för i dag: ”{v}”.",
      "clear": "Välj igen",
      "letterBtn": "Skriv ett meddelande",
      "letterTitle": "Meddelande",
      "letterHint": "Välj mottagare och ärende, så skapas en text. Det går bra att ändra i den.",
      "target": "Till",
      "targets": [
        "Skolan",
        "Arbetsplatsen"
      ],
      "writer": "Vem skriver",
      "writers": [
        "Jag själv",
        "Någon i familjen"
      ],
      "kind": "Ärende",
      "kinds": [
        "Sen ankomst i dag",
        "Frånvaro i dag",
        "Frånvaro några dagar",
        "Frånvaro en tid"
      ],
      "name": "Namn (får vara tomt)",
      "namePh": "t.ex. Andersson",
      "result": "Färdig text",
      "copy": "Kopiera",
      "share": "Dela",
      "copied": "Kopierat ✓",
      "copyFail": "Det gick inte att kopiera",
      "shareNone": "Delning fungerar inte på den här enheten",
      "shareFail": "Det gick inte att dela",
      "copyHelp": "Texten är markerad. Håll fingret på den för att kopiera.",
      "histTitle": "Tidigare anteckningar",
      "histEmpty": "Inga anteckningar ännu.",
      "tpl": {
        "openSchool": "God morgon.",
        "openWork": "Hej.",
        "self": "Det här är {name}.",
        "family": "Jag skriver som familjemedlem till {name}.",
        "familyNoName": "Det här är ett meddelande från familjen.",
        "lateSchool": "Av hälsoskäl blir det sen ankomst till skolan i dag.",
        "lateWork": "Av hälsoskäl blir det sen ankomst till arbetet i dag.",
        "todaySchool": "Av hälsoskäl blir det frånvaro från skolan i dag.",
        "todayWork": "Av hälsoskäl blir det frånvaro från arbetet i dag.",
        "daysSchool": "Av hälsoskäl blir det frånvaro från skolan i några dagar. Återkommer när läget är klarare.",
        "daysWork": "Av hälsoskäl blir det frånvaro från arbetet i några dagar. Återkommer när läget är klarare.",
        "longSchool": "Av hälsoskäl blir det frånvaro från skolan under en tid. Återkommer när läget är klarare.",
        "longWork": "Av hälsoskäl skulle det behövas frånvaro från arbetet under en tid, och det vore bra att få prata om det. Återkommer senare.",
        "close": "Ber om ursäkt för besväret. Tack för förståelsen.",
        "fam": {
          "lateSchool": "{name} kommer för sent till skolan i dag av hälsoskäl.",
          "lateWork": "{name} kommer för sent till arbetet i dag av hälsoskäl.",
          "todaySchool": "{name} är frånvarande från skolan i dag av hälsoskäl.",
          "todayWork": "{name} är frånvarande från arbetet i dag av hälsoskäl.",
          "daysSchool": "{name} är frånvarande från skolan i några dagar av hälsoskäl. Jag återkommer när läget är klarare.",
          "daysWork": "{name} är frånvarande från arbetet i några dagar av hälsoskäl. Jag återkommer när läget är klarare.",
          "longSchool": "{name} är frånvarande från skolan under en tid av hälsoskäl. Jag återkommer när läget är klarare.",
          "longWork": "{name} behöver vara frånvarande från arbetet under en tid av hälsoskäl, och det vore bra att få prata om det. Jag återkommer senare.",
          "noName": "Vår familjemedlem"
        }
      }
    },
    "genki": {
      "title": "Energi kvar",
      "hint": "Lägg till dagens planer en rad i taget och välj hur tröttande var och en är, så går batterimätaren ner. Inga siffror visas.",
      "battLabel": "Batteriet nu",
      "addPh": "Plan (t.ex. möte, inköp)",
      "add": "Lägg till",
      "empty": "Inga planer ännu.",
      "f1": "Människor",
      "f1v": [
        "Få",
        "Lagom",
        "Många"
      ],
      "f2": "Ljudnivå",
      "f2v": [
        "Tyst",
        "Lagom",
        "Högljutt"
      ],
      "f3": "Spelade ”normal”",
      "f3v": [
        "Knappt",
        "Lite",
        "Hela tiden"
      ],
      "del": "Ta bort",
      "stepsHint": "Stegen för när tröttheten har hopat sig öppnas i en egen app: ”En i taget - SOYOGI”.",
      "steps": "Öppna stegen",
      "prevTitle": "Gårdagens planer",
      "prevBatt": "Batteriet i går"
    },
    "dekita": {
      "title": "Det jag klarat",
      "hint": "Ett litet ”det klarade jag” på en rad. Senare kan du titta tillbaka på dem en i taget.",
      "addPh": "Något jag klarade i dag",
      "add": "Spara",
      "pick": "Titta tillbaka på en",
      "empty": "Inget ännu. Små saker går bra.",
      "del": "Ta bort",
      "delSure": "Ja, ta bort",
      "pickTitle": "Det jag klarat",
      "pickAgain": "En annan"
    },
    "set": {
      "h": "Loggar att använda",
      "kinds": [
        "Morgonens avstånd",
        "Energi kvar",
        "Det jag klarat"
      ],
      "target": "Meddelandet går till",
      "targets": [
        "Skolan",
        "Arbetsplatsen"
      ],
      "writer": "Du skriver om",
      "writers": [
        "Mig själv",
        "Någon i familjen"
      ]
    }
  }
});
/* ---- /sv ---- */
/* ---- ko: 翻訳 ---- */
TBL.ko = mergeDeep(JSON.parse(JSON.stringify(en)), {
  "app": {
    "name": "오늘의 기록장 - SOYOGI",
    "short": "오늘의 기록장",
    "tagline": "비교하지 않고, 판정하지 않는, 오늘의 기록."
  },
  "nav": {
    "home": "홈",
    "kyori": "아침의 거리",
    "genki": "남은 기운",
    "dekita": "해낸 일",
    "set": "설정"
  },
  "common": {
    "ok": "OK",
    "cancel": "취소",
    "save": "저장하기",
    "del": "지우기",
    "back": "뒤로",
    "close": "닫기",
    "yes": "예",
    "no": "아니요",
    "add": "추가",
    "edit": "고치기",
    "next": "다음",
    "prev": "이전",
    "done": "완료",
    "saved": "저장했어요 ✓",
    "saveFail": "저장하지 못했어요",
    "storageFull": "저장 공간이 가득 차서 저장할 수 없어요",
    "deleted": "지웠어요",
    "delConfirm": "정말 지울까요?",
    "empty": "아직 아무것도 없어요",
    "optional": "전부 쓰지 않아도 괜찮아요.",
    "today": "오늘",
    "backConfirm": "쓴 내용이 아직 저장되지 않았어요. 버리고 돌아갈까요?",
    "photo": {
      "camera": "카메라로 찍기",
      "roll": "사진에서 고르기",
      "cropTitle": "사진 잘라내기",
      "cropHint": "손가락으로 움직이거나 화살표로 맞추고, 슬라이더로 크기를 바꿔요.",
      "zoom": "크기",
      "panUp": "위로",
      "panDown": "아래로",
      "panLeft": "왼쪽으로",
      "panRight": "오른쪽으로",
      "make": "이걸로 정하기",
      "fail": "사진을 불러오지 못했어요"
    }
  },
  "set": {
    "hNormal": "평소 설정",
    "hBackup": "기기 변경(백업)",
    "fs": "글자 크기",
    "fsSizes": [
      "보통",
      "크게",
      "아주 크게"
    ],
    "lang": "ことば / Language",
    "theme": "색",
    "themes": [
      "초록",
      "하늘색",
      "흰색",
      "검정"
    ],
    "bgm": "BGM",
    "bgms": [
      "없음",
      "초록의 소리",
      "파랑의 소리"
    ],
    "sound": "탭 소리",
    "on": "ON",
    "off": "OFF",
    "bkHint": "새 스마트폰으로 옮길 때는 '내보내기'로 파일을 저장하고, 새 스마트폰에서 '가져오기'를 눌러 주세요.",
    "bkExport": "내보내기",
    "bkImport": "가져오기",
    "exported": "내보냈어요 ✓",
    "imported": "가져왔어요 ✓",
    "importFail": "가져오지 못했어요",
    "importConfirm": "지금 내용이 파일의 내용으로 바뀌어요. 가져올까요?",
    "note": "쓴 내용은 모두 이 기기 안에만 저장돼요. 어디에도 보내지 않아요.",
    "privacy": "개인정보 처리방침",
    "credit": "앱 개발: 돌봄과 지원 상담소 SOYOGI"
  },
  "guide": {
    "title": "사용법",
    "step": "{n} / {m}",
    "start": "시작하기",
    "again": "다시 보기",
    "heads": [
      "오늘의 기록장에 어서 오세요",
      "처음에 할 일",
      "아침의 거리",
      "연락문 만들기",
      "남은 기운",
      "해낸 일",
      "이 기기 안에만 남아요",
      "보기 편하게, 그리고 힘들 때"
    ],
    "bodies": [
      "오늘 있었던 일을 조금만 적어 두는 공책이에요. 아침의 거리, 남은 기운, 해낸 일을 적을 수 있어요.\n학교나 일터에 가기 힘든 시기, 쉽게 지치는 날을 위한 도구예요.\n점수나 그래프는 없어요. 비교하거나 좋고 나쁨을 판정하지도 않아요.\n쓰지 않는 날이 있어도 괜찮아요.",
      "특별히 할 일은 없어요. '홈'의 큰 버튼이나 아래쪽 탭을 누르면 바로 쓸 수 있어요.\n쓰지 않는 기록은 '설정'의 '사용할 기록'에서 OFF로 할 수 있어요. 홈과 아래쪽 탭에서 사라져요.\n연락문을 쓸 때는 '설정'에서 '연락할 상대'와 '누구에 대해 쓰나요'를 미리 골라 두면 매번 고르지 않아도 돼요.",
      "오늘 갈 수 있는 곳을 '갈 수 있어요', '중간까지', '별실', '집에서 지내요' 중에서 하나 골라요.\n어느 것을 골라도 같은 크기로 기록해요. 바꾸려면 '다시 고르기'를 눌러요.\n'지금까지의 기록'에 날짜별로 나와요. 세거나 비교하지 않아요.",
      "'집에서 지내요'를 고르거나 '연락문 만들기'를 누르면 학교나 직장에 보낼 문장이 만들어져요.\n'상대', '쓰는 사람', '용건'만 고르면 문장이 바뀌어요. 이름은 비워도 돼요.\n문장은 고쳐서 쓸 수 있어요. '복사'를 누르고 메일이나 메시지에 붙여 넣어 주세요.\n'공유'가 보이는 기기에서는 거기서 보낼 앱을 고를 수도 있어요.",
      "오늘의 일정을 한 줄 쓰고 '추가'를 눌러요.\n일정마다 세 가지(사람 / 소음 / '보통'인 척했어요)를 고르면 '지금 배터리' 눈금이 줄어들어요. 숫자는 보여 주지 않아요.\n지울 때는 '지우기'를 누르고, 이어서 '정말 지우기'를 눌러요.\n'순서 열기'를 누르면 피로가 쌓였을 때의 순서가 다른 앱 “하나씩 - SOYOGI”에서 열려요.",
      "작은 '해냈어요'를 한 줄 쓰고 '남기기'를 눌러요. 날짜별로 나와요.\n'하나 되돌아보기'를 누르면 남긴 것 중 하나가 크게 나와요. '다른 하나'로 바뀌고, '닫기'로 돌아가요.\n지울 때는 '지우기'를 누르고, 이어서 '정말 지우기'를 눌러요.",
      "쓴 내용은 모두 이 기기 안에만 저장돼요. 어디에도 보내지 않고, 가입도 필요 없어요.\n새 스마트폰으로 옮길 때는 '설정'의 '내보내기'로 파일을 저장하고, 새 스마트폰에서 '가져오기'를 눌러 주세요.",
      "'설정'의 '글자 크기'로 글자를 크게, '색'으로 화면 색을 바꿀 수 있어요. 언어는 화면 맨 위의 'Language'에서 골라요.\n이 앱은 의료를 대신하지 않아요. 위급할 때는 일본의 119(구급)나 110(경찰), 또는 상담 창구로 연락해 주세요. 상담 창구는 '홈' 맨 아래의 '중요한 안내'에서 찾을 수 있어요.\n이 안내는 '설정'의 '사용법'에서 '다시 보기'를 누르면 다시 볼 수 있어요."
    ]
  },
  "screen": {
    "home": {
      "title": "오늘의 기록장",
      "intro": "오늘 있었던 일을 조금만 적어 두는 공책이에요. 쓰지 않는 날이 있어도 괜찮아요.",
      "kyori": "아침의 거리",
      "kyoriSub": "오늘 갈 수 있는 곳을 고르기",
      "genki": "남은 기운",
      "genkiSub": "일정과 피로의 눈금",
      "dekita": "해낸 일",
      "dekitaSub": "한 줄만 남겨 두기",
      "noKinds": "사용할 기록이 선택되지 않았어요. '설정'에서 ON으로 해 주세요.",
      "toSet": "설정 열기",
      "careTitle": "중요한 안내",
      "care": "이 앱은 의료를 대신하지 않아요. 위급할 때는 일본의 119(구급)나 110(경찰), 또는 상담 창구로 연락해 주세요.",
      "careTeen": "일본의 상담 창구 찾기 (Teen Info Room)",
      "careSeido": "일본에서 쓸 수 있는 제도 알아보기 (Japan Support Guide)",
      "careLink": "SOYOGI 페이지 열기"
    },
    "kyori": {
      "title": "아침의 거리",
      "hint": "오늘 갈 수 있는 곳을 하나 골라 주세요. 어느 것을 골라도 같은 크기로 기록해요.",
      "opts": [
        "갈 수 있어요",
        "중간까지",
        "별실",
        "집에서 지내요"
      ],
      "chosen": "오늘은 '{v}'로 기록했어요.",
      "clear": "다시 고르기",
      "letterBtn": "연락문 만들기",
      "letterTitle": "연락문",
      "letterHint": "상대와 용건을 고르면 문장이 만들어져요. 고쳐서 써도 괜찮아요.",
      "target": "상대",
      "targets": [
        "학교",
        "직장"
      ],
      "writer": "쓰는 사람",
      "writers": [
        "본인",
        "가족"
      ],
      "kind": "용건",
      "kinds": [
        "오늘 늦게 가요",
        "오늘 쉬어요",
        "며칠 쉬어요",
        "한동안 쉬어요"
      ],
      "name": "이름(비워도 돼요)",
      "namePh": "예: 김민수",
      "result": "만들어진 문장",
      "copy": "복사",
      "share": "공유",
      "copied": "복사했어요 ✓",
      "copyFail": "복사하지 못했어요",
      "shareNone": "이 기기에서는 공유를 쓸 수 없어요",
      "shareFail": "공유하지 못했어요",
      "copyHelp": "글을 선택해 두었어요. 길게 눌러서 복사할 수 있어요.",
      "histTitle": "지금까지의 기록",
      "histEmpty": "아직 기록이 없어요.",
      "tpl": {
        "openSchool": "안녕하세요.",
        "openWork": "안녕하십니까.",
        "self": "{name}입니다.",
        "family": "{name}의 가족입니다.",
        "familyNoName": "가족이 대신 연락드립니다.",
        "lateSchool": "오늘은 건강상의 이유로 늦게 등교합니다.",
        "lateWork": "오늘은 건강상의 이유로 출근이 늦어집니다.",
        "todaySchool": "오늘은 건강상의 이유로 결석합니다.",
        "todayWork": "오늘은 건강상의 이유로 하루 쉬고자 합니다.",
        "daysSchool": "건강상의 이유로 며칠 결석합니다. 상태를 보고 다시 연락드리겠습니다.",
        "daysWork": "건강상의 이유로 며칠 쉬고자 합니다. 상태를 보고 다시 연락드리겠습니다.",
        "longSchool": "건강상의 이유로 당분간 결석합니다. 상태를 보고 다시 연락드리겠습니다.",
        "longWork": "건강상의 이유로 당분간 쉬고자 하여 상의드리고 싶습니다. 다시 연락드리겠습니다.",
        "close": "불편을 드려 죄송합니다. 잘 부탁드립니다.",
        "fam": {
          "lateSchool": "{nameWa} 오늘 건강상의 이유로 늦게 등교합니다.",
          "lateWork": "{nameWa} 오늘 건강상의 이유로 출근이 늦어집니다.",
          "todaySchool": "{nameWa} 오늘 건강상의 이유로 결석합니다.",
          "todayWork": "{nameWa} 오늘 건강상의 이유로 하루 쉬게 되었습니다.",
          "daysSchool": "{nameWa} 건강상의 이유로 며칠 결석합니다. 상태를 보고 다시 연락드리겠습니다.",
          "daysWork": "{nameWa} 건강상의 이유로 며칠 쉬게 되었습니다. 상태를 보고 다시 연락드리겠습니다.",
          "longSchool": "{nameWa} 건강상의 이유로 당분간 결석합니다. 상태를 보고 다시 연락드리겠습니다.",
          "longWork": "{nameWa} 건강상의 이유로 당분간 쉬어야 할 것 같아 상의드리고 싶습니다. 다시 연락드리겠습니다.",
          "noName": "당사자"
        }
      }
    },
    "genki": {
      "title": "남은 기운",
      "hint": "오늘의 일정을 한 줄씩 더하고 각각의 피로를 고르면, 배터리 눈금이 줄어들어요. 숫자는 보여 주지 않아요.",
      "battLabel": "지금 배터리",
      "addPh": "일정(예: 회의, 장보기)",
      "add": "추가",
      "empty": "아직 일정이 없어요.",
      "f1": "사람",
      "f1v": [
        "적음",
        "보통",
        "많음"
      ],
      "f2": "소음",
      "f2v": [
        "조용함",
        "보통",
        "시끄러움"
      ],
      "f3": "'보통'인 척했어요",
      "f3v": [
        "별로",
        "조금",
        "계속"
      ],
      "del": "지우기",
      "stepsHint": "피로가 쌓였을 때의 순서는 다른 앱 “하나씩 - SOYOGI”에서 열려요.",
      "steps": "순서 열기",
      "prevTitle": "어제 일정",
      "prevBatt": "어제 배터리"
    },
    "dekita": {
      "title": "해낸 일",
      "hint": "작은 '해냈어요'를 한 줄로. 나중에 하나씩 되돌아볼 수 있어요.",
      "addPh": "오늘 해낸 일",
      "add": "남기기",
      "pick": "하나 되돌아보기",
      "empty": "아직 없어요. 작은 일이어도 괜찮아요.",
      "del": "지우기",
      "delSure": "정말 지우기",
      "pickTitle": "해낸 일",
      "pickAgain": "다른 하나"
    },
    "set": {
      "h": "사용할 기록",
      "kinds": [
        "아침의 거리",
        "남은 기운",
        "해낸 일"
      ],
      "target": "연락할 상대",
      "targets": [
        "학교",
        "직장"
      ],
      "writer": "누구에 대해 쓰나요",
      "writers": [
        "본인",
        "가족"
      ]
    }
  }
});
/* ---- /ko ---- */
/* ---- zh: 翻訳 ---- */
TBL.zh = mergeDeep(JSON.parse(JSON.stringify(en)), {
  "app": {
    "name": "今日记录本 - SOYOGI",
    "short": "今日记录本",
    "tagline": "不比较、不评判，只记下今天。"
  },
  "nav": {
    "home": "首页",
    "kyori": "早上距离",
    "genki": "剩余精力",
    "dekita": "做到的事",
    "set": "设置"
  },
  "common": {
    "ok": "确定",
    "cancel": "取消",
    "save": "保存",
    "del": "删除",
    "back": "返回",
    "close": "关闭",
    "yes": "是",
    "no": "否",
    "add": "添加",
    "edit": "修改",
    "next": "下一个",
    "prev": "上一个",
    "done": "完成",
    "saved": "已保存 ✓",
    "saveFail": "无法保存",
    "storageFull": "空间已满，无法保存",
    "deleted": "已删除",
    "delConfirm": "真的要删除吗？",
    "empty": "还没有任何内容",
    "optional": "不用全部都写，也没关系。",
    "today": "今天",
    "backConfirm": "写的内容还没有保存。要放弃并返回吗？",
    "photo": {
      "camera": "用相机拍摄",
      "roll": "从照片中选择",
      "cropTitle": "裁剪照片",
      "cropHint": "用手指移动，或用箭头对准，再用滑块调整大小。",
      "zoom": "大小",
      "panUp": "向上",
      "panDown": "向下",
      "panLeft": "向左",
      "panRight": "向右",
      "make": "就用这个",
      "fail": "无法读取照片"
    }
  },
  "set": {
    "hNormal": "日常设置",
    "hBackup": "换手机(备份)",
    "fs": "文字大小",
    "fsSizes": [
      "标准",
      "大",
      "特大"
    ],
    "lang": "ことば / Language",
    "theme": "颜色",
    "themes": [
      "绿色",
      "浅蓝色",
      "白色",
      "黑色"
    ],
    "bgm": "背景音乐",
    "bgms": [
      "无",
      "绿之音",
      "蓝之音"
    ],
    "sound": "点按音效",
    "on": "开",
    "off": "关",
    "bkHint": "换新手机时，请先点“导出”保存文件，再在新手机上点“导入”。",
    "bkExport": "导出",
    "bkImport": "导入",
    "exported": "已导出 ✓",
    "imported": "已导入 ✓",
    "importFail": "无法导入",
    "importConfirm": "现在的内容会被替换为文件里的内容。要导入吗？",
    "note": "写下的内容全部只保存在这台设备里，不会发送到任何地方。",
    "privacy": "隐私政策",
    "credit": "应用开发：照护与支援咨询处 SOYOGI"
  },
  "guide": {
    "title": "使用方法",
    "step": "{n} / {m}",
    "start": "开始",
    "again": "再看一次",
    "heads": [
      "欢迎使用今日记录本",
      "首先要做的事",
      "早上的距离",
      "写一条联络信息",
      "剩余精力",
      "做到的事",
      "只保存在这台设备里",
      "看得更清楚，以及困难的时候"
    ],
    "bodies": [
      "这是一本把今天的事稍微记一下的小本子，可以记下早上的距离、剩余精力和做到的事。\n它是为上学或上班很难的时期、容易疲劳的日子准备的工具。\n没有分数，也没有图表。不比较，也不评判好坏。\n有不写的日子，也没关系。",
      "没有特别要做的。点“首页”的大按钮或下方的标签，就能马上开始写。\n不用的记录，可以在“设置”的“使用的记录”里设为“关”。它会从首页和下方的标签中消失。\n要用联络信息的话，先在“设置”里选好“联络的对象”和“写谁的事”，就不用每次都选了。",
      "从“能去”“到中途”“别的房间”“在家度过”中，选一个今天能去的地方。\n无论选哪一个，都以同样的分量记录。要改的话，点“重新选择”。\n“以往的记录”里按日期排列。不计数，也不比较。",
      "选择“在家度过”，或点“写一条联络信息”，就会生成给学校或单位的文字。\n只要选“对象”“写的人”“事由”，文字就会跟着变。姓名可以留空。\n文字可以修改后再用。点“复制”，然后粘贴到邮件或聊天里。\n在显示“分享”的设备上，也可以从那里选择用来发送的应用。",
      "写一行今天的安排，然后点“添加”。\n为每个安排选择人数、吵闹程度和装作“正常”的程度，“现在的电量”的刻度就会减少。不显示数字。\n删除时，先点“删除”，再点“真的删除”。\n点“打开步骤”，会在另一个应用“一个一个来 - SOYOGI”中打开疲劳累积时的步骤。",
      "用一行写下一件小小的做到的事，然后点“留下”。会按日期排列。\n点“回看一条”，会从留下的内容中大大地显示一条。点“换一条”换成别的，点“关闭”返回。\n删除时，先点“删除”，再点“真的删除”。",
      "写下的内容全部只保存在这台设备里，不会发送到任何地方，也不需要注册。\n换新手机时，请先在“设置”里点“导出”保存文件，再在新手机上点“导入”。",
      "在“设置”里，用“文字大小”把字放大，用“颜色”改变画面的颜色。语言可以在画面最上方的“Language”中选择。\n这个应用不能代替医疗。遇到危险时，请联系119(日本急救)、110(日本警察)或咨询窗口。咨询窗口可以在“首页”最下方的“重要提示”里查找。\n这份说明可以在“设置”的“使用方法”里点“再看一次”重新查看。"
    ]
  },
  "screen": {
    "home": {
      "title": "今日记录本",
      "intro": "这是一本把今天的事稍微记一下的小本子。有不写的日子，也没关系。",
      "kyori": "早上的距离",
      "kyoriSub": "选一个今天能去的地方",
      "genki": "剩余精力",
      "genkiSub": "今天的安排，和疲劳的刻度",
      "dekita": "做到的事",
      "dekitaSub": "只留下一行",
      "noKinds": "还没有选择要使用的记录。请在“设置”里打开。",
      "toSet": "打开设置",
      "careTitle": "重要提示",
      "care": "这个应用不能代替医疗。遇到危险时，请联系119(日本急救)、110(日本警察)或咨询窗口。",
      "careTeen": "查找日本的咨询窗口(Teen Info Room)",
      "careSeido": "查询在日本可以使用的制度(Japan Support Guide)",
      "careLink": "打开 SOYOGI 的页面"
    },
    "kyori": {
      "title": "早上的距离",
      "hint": "请选一个今天能去的地方。无论选哪一个，都以同样的分量记录。",
      "opts": [
        "能去",
        "到中途",
        "别的房间",
        "在家度过"
      ],
      "chosen": "今天记录为“{v}”。",
      "clear": "重新选择",
      "letterBtn": "写一条联络信息",
      "letterTitle": "联络信息",
      "letterHint": "选好对象和事由，就会生成一段话。改一改再用，也没关系。",
      "target": "对象",
      "targets": [
        "学校",
        "单位"
      ],
      "writer": "写的人",
      "writers": [
        "本人",
        "家人"
      ],
      "kind": "事由",
      "kinds": [
        "今天晚到",
        "今天请假",
        "请假几天",
        "请假一段时间"
      ],
      "name": "姓名(可以留空)",
      "namePh": "例：山田",
      "result": "生成的内容",
      "copy": "复制",
      "share": "分享",
      "copied": "已复制 ✓",
      "copyFail": "无法复制",
      "shareNone": "这台设备不能使用分享功能",
      "shareFail": "无法分享",
      "copyHelp": "已选中这段文字。长按即可复制。",
      "histTitle": "以往的记录",
      "histEmpty": "还没有记录。",
      "tpl": {
        "openSchool": "早上好。",
        "openWork": "您好。",
        "self": "我是{name}。",
        "family": "我是{name}的家人。",
        "familyNoName": "由家人代为联系。",
        "lateSchool": "今天因身体原因，会晚一些到校。",
        "lateWork": "今天因身体原因，会晚一些到岗。",
        "todaySchool": "今天因身体原因，需要请假一天。",
        "todayWork": "今天因身体原因，想请假一天。",
        "daysSchool": "因身体原因，需要请假几天。之后会视情况再联系。",
        "daysWork": "因身体原因，想请几天假。之后会视情况再联系。",
        "longSchool": "因身体原因，需要请假一段时间。之后会视情况再联系。",
        "longWork": "因身体原因，想请假一段时间，希望能商量一下。之后会再联系。",
        "close": "抱歉添了麻烦，还请多多关照。",
        "fam": {
          "lateSchool": "今天{name}因身体原因，会晚一些到校。",
          "lateWork": "今天{name}因身体原因，会晚一些到岗。",
          "todaySchool": "今天{name}因身体原因，需要请假一天。",
          "todayWork": "今天{name}因身体原因，需要请假一天。",
          "daysSchool": "{name}因身体原因，需要请假几天。之后会视情况再联系。",
          "daysWork": "{name}因身体原因，需要请几天假。之后会视情况再联系。",
          "longSchool": "{name}因身体原因，需要请假一段时间。之后会视情况再联系。",
          "longWork": "{name}因身体原因，需要请假一段时间，希望能商量一下。之后会再联系。",
          "noName": "我的家人"
        }
      }
    },
    "genki": {
      "title": "剩余精力",
      "hint": "把今天的安排一行一行加上，再选出各自的疲劳程度，电池的刻度就会减少。不显示数字。",
      "battLabel": "现在的电量",
      "addPh": "安排(例：开会、买东西)",
      "add": "添加",
      "empty": "还没有安排。",
      "f1": "人数",
      "f1v": [
        "少",
        "一般",
        "多"
      ],
      "f2": "吵闹程度",
      "f2v": [
        "安静",
        "一般",
        "吵闹"
      ],
      "f3": "装作“正常”",
      "f3v": [
        "很少",
        "一点",
        "一直"
      ],
      "del": "删除",
      "stepsHint": "疲劳累积时的步骤，会在另一个应用“一个一个来 - SOYOGI”中打开。",
      "steps": "打开步骤",
      "prevTitle": "昨天的安排",
      "prevBatt": "昨天的电量"
    },
    "dekita": {
      "title": "做到的事",
      "hint": "用一行记下小小的“做到了”。之后可以一条一条回看。",
      "addPh": "今天做到的事",
      "add": "留下",
      "pick": "回看一条",
      "empty": "还没有。小事也没关系。",
      "del": "删除",
      "delSure": "真的删除",
      "pickTitle": "做到的事",
      "pickAgain": "换一条"
    },
    "set": {
      "h": "使用的记录",
      "kinds": [
        "早上的距离",
        "剩余精力",
        "做到的事"
      ],
      "target": "联络的对象",
      "targets": [
        "学校",
        "单位"
      ],
      "writer": "写谁的事",
      "writers": [
        "本人",
        "家人"
      ]
    }
  }
});
/* ---- /zh ---- */
/* ---- ar: 翻訳 ---- */
TBL.ar = mergeDeep(JSON.parse(JSON.stringify(en)), {
  "app": {
    "name": "سجل اليوم - SOYOGI",
    "short": "سجل اليوم",
    "tagline": "سجلّ اليوم، بلا مقارنة ولا حكم."
  },
  "nav": {
    "home": "الرئيسية",
    "kyori": "الصباح",
    "genki": "الطاقة",
    "dekita": "ما أنجزته",
    "set": "الإعدادات"
  },
  "common": {
    "ok": "حسنًا",
    "cancel": "إلغاء",
    "save": "حفظ",
    "del": "حذف",
    "back": "رجوع",
    "close": "إغلاق",
    "yes": "نعم",
    "no": "لا",
    "add": "إضافة",
    "edit": "تعديل",
    "next": "التالي",
    "prev": "السابق",
    "done": "تمّ",
    "saved": "تمّ الحفظ ✓",
    "saveFail": "تعذّر الحفظ",
    "storageFull": "المساحة ممتلئة، تعذّر الحفظ",
    "deleted": "تمّ الحذف",
    "delConfirm": "هل تريد الحذف فعلًا؟",
    "empty": "لا يوجد شيء بعد",
    "optional": "لا بأس إن لم تكتب كل شيء.",
    "today": "اليوم",
    "backConfirm": "ما كتبته لم يُحفظ بعد. هل تريد تجاهله والرجوع؟",
    "photo": {
      "camera": "التقاط صورة بالكاميرا",
      "roll": "اختيار من الصور",
      "cropTitle": "قصّ الصورة",
      "cropHint": "حرّك الصورة بإصبعك أو بالأسهم، ثم غيّر الحجم بشريط التمرير.",
      "zoom": "الحجم",
      "panUp": "إلى الأعلى",
      "panDown": "إلى الأسفل",
      "panLeft": "إلى اليسار",
      "panRight": "إلى اليمين",
      "make": "اختيار هذه",
      "fail": "تعذّر تحميل الصورة"
    }
  },
  "set": {
    "hNormal": "الإعدادات المعتادة",
    "hBackup": "تغيير الهاتف (نسخة احتياطية)",
    "fs": "حجم الخط",
    "fsSizes": [
      "عادي",
      "كبير",
      "كبير جدًا"
    ],
    "lang": "ことば / Language",
    "theme": "اللون",
    "themes": [
      "أخضر",
      "أزرق فاتح",
      "أبيض",
      "أسود"
    ],
    "bgm": "موسيقى الخلفية",
    "bgms": [
      "بدون",
      "نغمة خضراء",
      "نغمة زرقاء"
    ],
    "sound": "صوت النقر",
    "on": "تشغيل",
    "off": "إيقاف",
    "bkHint": "عند الانتقال إلى هاتف جديد، اضغط «تصدير» لحفظ ملف، ثم اضغط «استيراد» على الهاتف الجديد.",
    "bkExport": "تصدير",
    "bkImport": "استيراد",
    "exported": "تمّ التصدير ✓",
    "imported": "تمّ الاستيراد ✓",
    "importFail": "تعذّر الاستيراد",
    "importConfirm": "سيُستبدل المحتوى الحالي بمحتوى الملف. هل تريد الاستيراد؟",
    "note": "كل ما تكتبه يُحفظ في هذا الجهاز فقط، ولا يُرسل إلى أي مكان.",
    "privacy": "سياسة الخصوصية",
    "credit": "تطوير التطبيق: SOYOGI، مركز استشارات الرعاية والدعم"
  },
  "guide": {
    "title": "طريقة الاستخدام",
    "step": "{n} / {m}",
    "start": "ابدأ",
    "again": "عرض مرة أخرى",
    "heads": [
      "مرحبًا بك في سجل اليوم",
      "أول ما تفعله",
      "مسافة الصباح",
      "إنشاء رسالة",
      "الطاقة المتبقية",
      "ما أنجزته",
      "في هذا الجهاز فقط",
      "لقراءة أسهل، وعند الحاجة إلى المساعدة"
    ],
    "bodies": [
      "دفتر صغير لتدوين شيء بسيط عن يومك: مسافة الصباح، والطاقة المتبقية، وما أنجزته.\nهو أداة للفترات التي يصعب فيها الذهاب إلى المدرسة أو العمل، وللأيام التي تتعب فيها بسرعة.\nلا توجد نقاط ولا رسوم بيانية. لا شيء يُقارَن ولا يُحكَم عليه.\nولا بأس إن مرّت أيام دون كتابة.",
      "لا شيء خاص. اضغط زرًّا كبيرًا في «الرئيسية» أو تبويبًا في الأسفل، وابدأ الكتابة مباشرة.\nيمكنك جعل السجلات التي لا تستخدمها على «إيقاف» من «الإعدادات» في «السجلات المستخدمة»، فتختفي من الرئيسية ومن التبويبات في الأسفل.\nإن كنت ستستخدم الرسالة، فاختر مسبقًا «جهة الرسالة» و«عمّن تكتب» في «الإعدادات»، فلا تحتاج إلى اختيارهما كل مرة.",
      "اختر مكانًا واحدًا يمكنك الذهاب إليه اليوم: «أستطيع الذهاب» أو «حتى منتصف الطريق» أو «غرفة منفصلة» أو «أبقى في البيت».\nكل الخيارات تُسجَّل بالقدر نفسه. للتغيير، اضغط «إعادة الاختيار».\nتظهر أيامك حسب التاريخ في «السجلات السابقة». لا شيء يُعَدّ ولا يُقارَن.",
      "عند اختيار «أبقى في البيت» أو الضغط على «إنشاء رسالة»، تُنشأ رسالة إلى المدرسة أو مكان العمل.\nيكفي أن تختار «إلى» و«من يكتب» و«الموضوع» لتتغير الرسالة. يمكن ترك الاسم فارغًا.\nيمكنك تعديل الرسالة. اضغط «نسخ» ثم الصقها في بريد إلكتروني أو محادثة.\nفي الأجهزة التي يظهر فيها «مشاركة»، يمكنك أيضًا اختيار تطبيق للإرسال من هناك.",
      "اكتب خطة من خطط اليوم ثم اضغط «إضافة».\nاختر لكل خطة مستوى الناس والضجيج وأداء دور «العادي»، فينخفض مؤشّر «البطارية الآن». لا تُعرض أي أرقام.\nللحذف، اضغط «حذف» ثم «حذف فعلًا».\nيفتح «فتح الخطوات» خطوات ما يمكن فعله عندما يتراكم التعب، في تطبيق آخر: «واحدة تلو الأخرى - SOYOGI».",
      "اكتب في سطر واحد شيئًا صغيرًا أنجزته، ثم اضغط «تدوين». تظهر المدوَّنات حسب التاريخ.\nاضغط «مراجعة واحد» ليظهر واحد منها بخط كبير. «واحد آخر» يعرض غيره، و«إغلاق» يعيدك.\nللحذف، اضغط «حذف» ثم «حذف فعلًا».",
      "كل ما تكتبه يُحفظ في هذا الجهاز فقط، ولا يُرسل إلى أي مكان، ولا تحتاج إلى حساب.\nعند الانتقال إلى هاتف جديد، اضغط «تصدير» في «الإعدادات» لحفظ ملف، ثم اضغط «استيراد» على الهاتف الجديد.",
      "في «الإعدادات»، يكبّر «حجم الخط» الكتابة، ويغيّر «اللون» ألوان الشاشة. تُختار اللغة من «Language» في أعلى الشاشة.\nهذا التطبيق ليس بديلًا عن الرعاية الطبية. في حالات الخطر، اتصل بالرقم 119 (الإسعاف) أو 110 (الشرطة) في اليابان، أو بأحد مراكز الاستشارة. يمكنك البحث عن جهة استشارة من «تنبيه مهم» في أسفل «الرئيسية».\nيمكنك عرض هذا الدليل مرة أخرى من «الإعدادات»، بالضغط على «عرض مرة أخرى» بجانب «طريقة الاستخدام»."
    ]
  },
  "screen": {
    "home": {
      "title": "سجل اليوم",
      "intro": "دفتر صغير لتدوين شيء بسيط عن يومك. ولا بأس إن مرّت أيام دون كتابة.",
      "kyori": "مسافة الصباح",
      "kyoriSub": "اختر إلى أين يمكنك الذهاب اليوم",
      "genki": "الطاقة المتبقية",
      "genkiSub": "الخطط ومؤشّر التعب",
      "dekita": "ما أنجزته",
      "dekitaSub": "سطر واحد فقط تحتفظ به",
      "noKinds": "لم يتم اختيار أي سجل للاستخدام. فعّله من «الإعدادات».",
      "toSet": "فتح الإعدادات",
      "careTitle": "تنبيه مهم",
      "care": "هذا التطبيق ليس بديلًا عن الرعاية الطبية. في حالات الخطر، اتصل بالرقم 119 (الإسعاف) أو 110 (الشرطة) في اليابان، أو بأحد مراكز الاستشارة.",
      "careTeen": "البحث عن جهة استشارة في اليابان (Teen Info Room)",
      "careSeido": "معرفة أنظمة الدعم المتاحة في اليابان (Japan Support Guide)",
      "careLink": "فتح صفحة SOYOGI"
    },
    "kyori": {
      "title": "مسافة الصباح",
      "hint": "اختر مكانًا واحدًا يمكنك الذهاب إليه اليوم. كل الخيارات تُسجَّل بالقدر نفسه، أيًّا كان اختيارك.",
      "opts": [
        "أستطيع الذهاب",
        "حتى منتصف الطريق",
        "غرفة منفصلة",
        "أبقى في البيت"
      ],
      "chosen": "سُجّل «{v}» لهذا اليوم.",
      "clear": "إعادة الاختيار",
      "letterBtn": "إنشاء رسالة",
      "letterTitle": "رسالة",
      "letterHint": "اختر الجهة والموضوع، وستُنشأ رسالة. يمكنك تعديلها قبل استخدامها.",
      "target": "إلى",
      "targets": [
        "المدرسة",
        "مكان العمل"
      ],
      "writer": "من يكتب",
      "writers": [
        "أنا",
        "العائلة"
      ],
      "kind": "الموضوع",
      "kinds": [
        "سأتأخر اليوم",
        "سأتغيّب اليوم",
        "سأتغيّب بضعة أيام",
        "سأتغيّب لفترة"
      ],
      "name": "الاسم (يمكن تركه فارغًا)",
      "namePh": "مثال: يامادا",
      "result": "الرسالة الجاهزة",
      "copy": "نسخ",
      "share": "مشاركة",
      "copied": "تمّ النسخ ✓",
      "copyFail": "تعذّر النسخ",
      "shareNone": "المشاركة غير متاحة على هذا الجهاز",
      "shareFail": "تعذّرت المشاركة",
      "copyHelp": "تم تحديد النص. يمكنك نسخه بالضغط المطوّل عليه.",
      "histTitle": "السجلات السابقة",
      "histEmpty": "لا توجد سجلات بعد.",
      "tpl": {
        "openSchool": "صباح الخير.",
        "openWork": "تحية طيبة وبعد،",
        "self": "أنا {name}.",
        "family": "هذه رسالة من عائلة {name}.",
        "familyNoName": "هذه رسالة من العائلة.",
        "lateSchool": "بسبب ظرف صحي، سيكون الوصول إلى المدرسة متأخرًا اليوم.",
        "lateWork": "بسبب ظرف صحي، سيكون الوصول إلى العمل متأخرًا اليوم.",
        "todaySchool": "بسبب ظرف صحي، لن يتسنّى الحضور إلى المدرسة اليوم.",
        "todayWork": "بسبب ظرف صحي، سيتم أخذ إجازة لهذا اليوم.",
        "daysSchool": "بسبب ظرف صحي، لن يتسنّى الحضور إلى المدرسة لبضعة أيام. وسيتم التواصل معكم مجددًا بعد متابعة الحالة.",
        "daysWork": "بسبب ظرف صحي، سيتم أخذ إجازة لبضعة أيام. وسيتم التواصل معكم مجددًا بعد متابعة الحالة.",
        "longSchool": "بسبب ظرف صحي، لن يتسنّى الحضور إلى المدرسة لفترة من الوقت. وسيتم التواصل معكم مجددًا بعد متابعة الحالة.",
        "longWork": "بسبب ظرف صحي، يُرجى إتاحة فرصة للتشاور بشأن أخذ إجازة لفترة من الوقت. وسيتم التواصل معكم مجددًا.",
        "close": "مع الاعتذار عن الإزعاج، وشكرًا لتفهّمكم.",
        "fam": {
          "lateSchool": "بسبب ظرف صحي، سيكون وصول {name} إلى المدرسة متأخرًا اليوم.",
          "lateWork": "بسبب ظرف صحي، سيكون وصول {name} إلى العمل متأخرًا اليوم.",
          "todaySchool": "بسبب ظرف صحي، لن يكون بإمكان {name} الحضور إلى المدرسة اليوم.",
          "todayWork": "بسبب ظرف صحي، لن يكون بإمكان {name} الحضور إلى العمل اليوم.",
          "daysSchool": "بسبب ظرف صحي، لن يكون بإمكان {name} الحضور إلى المدرسة لبضعة أيام. وسيتم التواصل معكم مجددًا بعد متابعة الحالة.",
          "daysWork": "بسبب ظرف صحي، لن يكون بإمكان {name} الحضور إلى العمل لبضعة أيام. وسيتم التواصل معكم مجددًا بعد متابعة الحالة.",
          "longSchool": "بسبب ظرف صحي، لن يكون بإمكان {name} الحضور إلى المدرسة لفترة من الوقت. وسيتم التواصل معكم مجددًا بعد متابعة الحالة.",
          "longWork": "بسبب ظرف صحي، يُرجى إتاحة فرصة للتشاور بشأن إجازة {name} لفترة من الوقت. وسيتم التواصل معكم مجددًا.",
          "noName": "أحد أفراد عائلتنا"
        }
      }
    },
    "genki": {
      "title": "الطاقة المتبقية",
      "hint": "أضف خطط اليوم سطرًا سطرًا، واختر مقدار التعب لكل منها، فينخفض مؤشّر البطارية. لا تُعرض أي أرقام.",
      "battLabel": "البطارية الآن",
      "addPh": "خطة (مثال: اجتماع، تسوّق)",
      "add": "إضافة",
      "empty": "لا توجد خطط بعد.",
      "f1": "الناس",
      "f1v": [
        "قليل",
        "متوسط",
        "كثير"
      ],
      "f2": "الضجيج",
      "f2v": [
        "هادئ",
        "متوسط",
        "صاخب"
      ],
      "f3": "أداء دور «العادي»",
      "f3v": [
        "نادرًا",
        "قليلًا",
        "طوال الوقت"
      ],
      "del": "حذف",
      "stepsHint": "خطوات ما يمكن فعله عندما يتراكم التعب تُفتح في تطبيق آخر: «واحدة تلو الأخرى - SOYOGI».",
      "steps": "فتح الخطوات",
      "prevTitle": "خطط الأمس",
      "prevBatt": "بطارية الأمس"
    },
    "dekita": {
      "title": "ما أنجزته",
      "hint": "سطر واحد لإنجاز صغير. يمكنك لاحقًا مراجعتها واحدًا تلو الآخر.",
      "addPh": "شيء أنجزته اليوم",
      "add": "تدوين",
      "pick": "مراجعة واحد",
      "empty": "لا يوجد شيء بعد. ولا بأس بالأشياء الصغيرة.",
      "del": "حذف",
      "delSure": "حذف فعلًا",
      "pickTitle": "ما أنجزته",
      "pickAgain": "واحد آخر"
    },
    "set": {
      "h": "السجلات المستخدمة",
      "kinds": [
        "مسافة الصباح",
        "الطاقة المتبقية",
        "ما أنجزته"
      ],
      "target": "جهة الرسالة",
      "targets": [
        "المدرسة",
        "مكان العمل"
      ],
      "writer": "عمّن تكتب",
      "writers": [
        "عن نفسي",
        "عن فرد من العائلة"
      ]
    }
  }
});
/* ---- /ar ---- */
/* 翻訳前の仮置き: de〜ar は en を流用する(翻訳Workflowで各言語を書いたらこの行より上に追加し、ここは残してよい) */
['de','fr','es','it','pt','nl','sv','ko','zh','ar'].forEach(function(l){
  if(!TBL[l]) TBL[l] = JSON.parse(JSON.stringify(en));
});
window.KIROKU_I18N = TBL;
})();
