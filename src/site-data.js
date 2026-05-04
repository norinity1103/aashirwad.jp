export const restaurant = {
  name: "インド料理レストラン アシルワード",
  romanName: "AASHIRWAD",
  address: "〒920-0865 石川県金沢市長町1-4-59",
  phone: "076-262-2170",
  email: "aashirwad.kanazawa@gmail.com",
  lunchHours: "ランチ 11:30-14:30（LO 14:00）",
  dinnerHours: "ディナー 18:00-22:00（LO 21:00）",
  closed: "月曜日（祝日の際は、翌火曜日）",
  seats: "30席（1階・2階あわせて）",
};

export const dishes = [
  {
    category: "Lunch",
    title: "アシルワードセット",
    image: "/menu/lunch02.jpg",
    alt: "アシルワードセット",
    description: "日替わりカレーから2種類を選べる、昼の定番セット。",
  },
  {
    category: "Dinner",
    title: "30種類以上のカレー",
    image: "/menu/dinner01.jpg",
    alt: "カレー",
    description: "北インドの伝統的なメニューを中心に、幅広く用意しています。",
  },
  {
    category: "Nepalese",
    title: "モモ",
    image: "/menu/dinner03.jpg",
    alt: "モモ",
    description: "鶏挽肉を使ったネパール式の蒸し餃子。開店以来の人気メニューです。",
  },
  {
    category: "Tandoor",
    title: "タンドーリ・チキン",
    image: "/menu/dinner04.jpg",
    alt: "タンドーリ・チキン",
    description: "タンドール窯で香ばしく焼き上げる、インド料理らしい一品。",
  },
  {
    category: "Side Dish",
    title: "アルサ・デコ",
    image: "/menu/dinner05.jpg",
    alt: "アルサ・デコ",
    description: "スパイス、黒胡麻、コリアンダーの風味を重ねたじゃが芋の惣菜。",
  },
];

export const menuPdfs = [
  { label: "ランチメニュー", lang: "日本語", href: "/lunch-japanese.pdf" },
  { label: "ディナーメニュー", lang: "日本語", href: "/dinner-japanese.pdf" },
  { label: "Lunch Menu", lang: "English", href: "/lunch-english.pdf" },
  { label: "Dinner Menu", lang: "English", href: "/dinner-english.pdf" },
];

export const menuDigest = {
  title: "代表的なメニュー例",
  sourceNote: "一例として掲載しています。価格や内容の最新情報はPDFメニューをご確認ください。",
  lunch: [
    "カレー&ナン / ライスセット",
    "日替わりカレーを1-3種類選択",
    "1種 1,350円 / 2種 1,450円 / 3種 1,550円",
    "チキンビリヤニセット",
    "チキンビリヤニと小さなカレー",
    "1,450円 / 大盛り 1,600円",
    "主食の選択",
    "ターメリックライス、ナン、ナン&少量ライスなど",
    "サイド追加",
    "Tandoori Chicken、Chicken Tikka、Samosa、Papad、Raita など",
  ],
  dinnerCategories: [
    {
      title: "サラダ・軽食",
      items: ["パパド", "マサラパパド", "チャナサラダ", "グリーンサラダ", "チキンティッカサラダ", "サモサ", "バジ", "アルサデコ"],
    },
    {
      title: "タンドール・一品料理",
      items: ["チキンティッカ", "チキンマライティッカ", "タンドーリチキン", "シークカバブ", "フィッシュティッカ", "パニール&ベジタブルティッカ"],
    },
    {
      title: "ネパール料理・炒め物",
      items: ["モモ", "スープモモ", "ココナッツ・ベイガンフライ", "じゃが芋とほうれん草のサブジ", "チェッティナード・チキンフライ", "マトンペッパーフライ"],
    },
    {
      title: "カレー",
      items: ["野菜&豆", "パニール", "鶏肉&玉子", "マトン", "キーマ", "魚&海老"],
    },
  ],
  dinnerHighlights: [
    "カレー単品はライスやナン別。辛さは 0=甘口 から 5=激辛 まで調整可能。",
    "代表的なカレー: ダールフライ、ダールマカニ、サーグパニール、バターチキン、マトンカレー、フィッシュマサラ、ココナッツプラウンなど。",
    "主食: バスマティライス、ターメリックライス、ナン、ガーリックナン、チーズナン、バトゥーラ、チャパティ、タンドールロティ、プーリー。",
    "ターリー: ノンベジターリー 2,800円、ベジターリー 2,550円。",
    "ビリヤニ: ベジタブル 1,650円、チキン 1,700円、マトン 1,850円。",
    "自家製デザート: クルフィ、ガジャル・ハルワ、キール。",
  ],
};

export const externalLinks = [
  { label: "Current Site", href: "http://aashirwad.jp/" },
  { label: "Facebook", href: "https://www.facebook.com/aashirwad.kanazawa/" },
  { label: "Instagram", href: "https://www.instagram.com/aashirwad.kanazawa/" },
  { label: "Tabelog", href: "https://tabelog.com/ishikawa/A1701/A170101/17007601/" },
];

export const englishGuide = {
  title: "English guide for visitors",
  lead: "AASHIRWAD is an Indian restaurant on Seseragi Street in Nagamachi, Kanazawa. English lunch and dinner menus are available as PDFs.",
  lunch: "Lunch 11:30-14:30 (last order 14:00)",
  dinner: "Dinner 18:00-22:00 (last order 21:00)",
  closed: "Closed on Mondays. If Monday is a public holiday, closed on the following Tuesday.",
};

export const story = {
  title: "店名に込めた「恵み」という想い。料理を支える人。",
  meaning: "「アシルワード」は、恵みを意味する言葉です。",
  points: ["自然の恵み", "夫婦で営む店", "タンドールの仕事"],
};
