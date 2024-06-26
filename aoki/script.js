// 保存用のファイル名を生成
function yyyymmddhhmise() {
  // 日付時間秒を文字列で返す	
    const dt = new Date();
    var yyyy = dt.getFullYear();
    var mm = ('00' + (dt.getMonth()+1)).slice(-2);
    var dd = ('00' + dt.getDate()).slice(-2);
    var hh = ('00' + dt.getHours()).slice(-2);
    var mi = ('00' + dt.getMinutes()).slice(-2);
    var se = ('00' + dt.getSeconds()).slice(-2);
  
    var answer = yyyy + mm + dd + "-" + hh + mm + se ;
    return (answer);
  }
var filename = "aoki2024-" + yyyymmddhhmise() + ".csv" ;

var jsPsych = initJsPsych({
  on_finish: function() {
    jsPsych.data.get().localSave('csv', filename);
//    jsPsych.data.displayData();
  }
});

// ------------------------------------------------------------------------
// 説明文やお約束のパーツ
// ------------------------------------------------------------------------

// フルスクリーン開始
var enter_fullscreen = {
  type: jsPsychFullscreen,
  message: '<p>実験名: aoki2024-0604-04</p><p>開始ボタンを押すと全画面表示で実験が始まります。</p>',
  button_label: "開始",
  fullscreen_mode: true
}

// 実験の説明
var Page1 = {
  type: jsPsychHtmlButtonResponse,
  margin_vertical: '100px',
  margin_horizontal: '100px',
  stimulus: '<div align=left> \
  【研究の目的】<br><br>\
  　本研究はひらがなを基にした架空の文字の類似度と不気味さの関係性について\
  検討することを目的としています。この実験は文字の類似度を明らかにして、\
  本実験の尺度を作成するために行います。\
  <br>\
  　この実験は参加を強制するものではございません。途中で答えたくないと\
  感じたり、気分が悪くなったりした場合はお申し出ください。\
  　また、 得られた回答は全て数値化して厳重に保管し、個人が特定されないように\
  処理いたします。\
  <br><br><br>\
  【手順】<br><br>\
  　実験開始前に年齢と性別を入力してください。\
  　次に、注視点(+)が1.5秒間モニターに表示された後、ひらがな２種類を合体させた\
  架空の文字が5秒間表示されます。\
  　その後、表示された文字がどちらのひらがなにどれくらいの割合で似ていると\
  感じたか、該当する直線の目盛をクリックしてください。\
 <br><br></div>',
 choices: ['次へ'],
};

// 被検者情報の入力 完成時には入力必須にしておく
var Page2 = {
  type: jsPsychSurveyText,
  questions: [
    {prompt: '年齢と性別を入力してください。<br><br><br>あなたの年齢を入力してください。', columns: 5, required: false, name: 'age'},
    {prompt: 'あなたの性別を男性であれば 1、女性であれば 2、その他は 0 を入力してください。', columns: 5, required: false, name: 'sex'},
  ],
  button_label: '次へ',
};

// この後開始
var Page3 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: '<div align=center> \
  次のページから練習が始まります。<br>\
  準備が出来ましたら、「次へ」ボタンを押して開始してください。\
  <br><br></div>',
 choices: ['次へ'],
};

// この後実験開始
var Page4 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: '<div align=center> \
  次のページから実験が始まります。<br>\
  準備が出来ましたら、「次へ」ボタンを押して開始してください。\
  <br><br></div>',
 choices: ['次へ'],
};

var Breaktime = {
  type: jsPsychHtmlButtonResponse,
  stimulus: '<div align=center> \
  休憩<br><br>\
  1分間目を閉じて休んでください。<br>\
  準備が出来ましたら、「次へ」ボタンを押して開始してください。\
  <br><br></div>',
 choices: ['次へ'],
};


// 最初の説明と被検者情報の入力
var par_id = {
  type: jsPsychSurveyText,
  questions: [
    {prompt: '<strong>これから大学生における魚の認知度についての実験を始めます。</strong><br><br><br>学籍番号を入力してください', columns: 10, required: true, name: 'id'},
    {prompt: 'あなたの性別を男性であれば 1、女性であれば 2、答えたくない場合は 3 を入力してください。', columns: 5, required: true, name: 'sex'},
    {prompt: 'あなたの年齢を入力してください。', columns: 5, required: true, name: 'age'},
  ],
  button_label: '次へ',
};

// 実験の説明
var hello = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '実験を始めます。 写真の前には1秒凝視点が出ます。<br><br>何かキーを押すと始まります。',
};

// 凝視点
var eyepoint = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<p style="font-size: 48px;">+</p>',
  choices: "NO_KEYS",
  trial_duration: 1000,
};

// 凝視点Lサイズ
var eyepointL = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<p style="font-size: 384px;">+</p>',
  choices: "NO_KEYS",
  trial_duration: 1000,
};


// 空白画面
var blankscreen = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '',
  choices: "NO_KEYS",
  trial_duration: 1000,
};

// 実験の終了
var bye = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: 'これで実験は終了です。 PCには触れずに実験者の指示に従ってください。',
};

// フルスクリーン終了
var exit_fullscreen = {
  type: jsPsychFullscreen,
  fullscreen_mode: false,
  delay_after: 0
}

// プリロード
var preload = {
  type: jsPsychPreload,
  auto_preload: true
}

// ------------------------------------------------------------------------
// 実験のメインまわり
// ------------------------------------------------------------------------

// 質問ページ1の選択肢(練習/本番共通)
var likert_scale = [
  "0%", 
  "10%", 
  "20%", 
  "30%", 
  "40%", 
  "50%", 
  "60%", 
  "70%", 
  "80%", 
  "90%", 
  "100%", 
];

// 質問ページ2の選択肢と、質問ページ2の本体(練習/本番共通)
var Page2Questions = 
  [
  {prompt: "どれくらい文字らしく見えましたか", labels: likert_scale},
  {prompt: "どれくらい不気味だと思いましたか", labels: likert_scale},
  {prompt: "どれくらいゾワゾワと感じましたか", labels: likert_scale},
 ] ;

var responsePage2 = {
  type: jsPsychSurveyLikert,
  preamble: 'これらの文字から受けた印象を、該当する割合(%)を選んでください',
  scale_width: 1200 ,
  questions: Page2Questions,
  randomize_question_order: false
};

// 画像ファイルの用意
var baseURL = './' ;
var fontPrePra = "<div align=left><font size=128 face='ＭＳ ゴシック'>" ;
var fontPreAct = "<div align=left><font size=128 face='ＭＳ 明朝'>" ;
var fontPos = "</font></div>" ;

// ---------------------------------------------------------------------
// 練習試行
// ---------------------------------------------------------------------
var PracticeExamPictures = [
  { filename: 'practice/ま-み.jpg',   questions: [    {prompt: fontPrePra + "ま" + fontPos, labels: likert_scale},    {prompt: fontPrePra + "み" + fontPos, labels: likert_scale},  ],},
  { filename: 'practice/を-あ.jpg',   questions: [    {prompt: fontPrePra + "を" + fontPos, labels: likert_scale},    {prompt: fontPrePra + "あ" + fontPos, labels: likert_scale},  ],},
];

var PracticeTrials = {
  timeline: [],
//  timeline_variables: examPictures,
//  randomize_order: true,
};

for (let i = 0; i< PracticeExamPictures.length; i++) {
//for (let i = 0; i< 1; i++) {

  var showimage0 = {
    type: jsPsychImageKeyboardResponse,
    stimulus: PracticeExamPictures[i].filename,
    stimulus_height: 1200 ,
    stimulus_width: 1200 ,
    choices: "NO_KEYS",
    trial_duration: 3000,
  };

  var responsePage1 = {
    type: jsPsychSurveyLikert,
    preamble: 'これらの文字にどれくらいの割合で似ていると感じたか、該当する割合(%)を選んでください',
    scale_width: 1200 ,
    questions: PracticeExamPictures[i].questions,
    randomize_question_order: false
};

  // 作成した問題1セットをキューイング
  PracticeTrials.timeline.push(blankscreen) ;
  PracticeTrials.timeline.push(eyepointL) ;
  PracticeTrials.timeline.push(showimage0) ;
  PracticeTrials.timeline.push(responsePage1) ;
  PracticeTrials.timeline.push(responsePage2) ;

}

// ---------------------------------------------------------------------
// 本番試行

// ------------------------------------------------------------------------------
var examPictures = [
  { filename: 'actual/い-ま.jpg',  questions: [    {prompt: fontPreAct + "い" + fontPos, labels: likert_scale},    {prompt: fontPreAct + "ま" + fontPos, labels: likert_scale},  ],},
  { filename: 'actual/う-こ.jpg',  questions: [    {prompt: fontPreAct + "う" + fontPos, labels: likert_scale},    {prompt: fontPreAct + "こ" + fontPos, labels: likert_scale},  ],},
  { filename: 'actual/か-え.jpg',  questions: [    {prompt: fontPreAct + "か" + fontPos, labels: likert_scale},    {prompt: fontPreAct + "え" + fontPos, labels: likert_scale},  ],},
  { filename: 'actual/く-へ.jpg',  questions: [    {prompt: fontPreAct + "く" + fontPos, labels: likert_scale},    {prompt: fontPreAct + "へ" + fontPos, labels: likert_scale},  ],},
  { filename: 'actual/け-て.jpg',  questions: [    {prompt: fontPreAct + "け" + fontPos, labels: likert_scale},    {prompt: fontPreAct + "て" + fontPos, labels: likert_scale},  ],},

  { filename: 'actual/さ-わ.jpg',  questions: [    {prompt: fontPreAct + "さ" + fontPos, labels: likert_scale},    {prompt: fontPreAct + "わ" + fontPos, labels: likert_scale},  ],},
  { filename: 'actual/せ-ん.jpg',  questions: [    {prompt: fontPreAct + "せ" + fontPos, labels: likert_scale},    {prompt: fontPreAct + "ん" + fontPos, labels: likert_scale},  ],},
  { filename: 'actual/た-み.jpg',  questions: [    {prompt: fontPreAct + "た" + fontPos, labels: likert_scale},    {prompt: fontPreAct + "み" + fontPos, labels: likert_scale},  ],},
  { filename: 'actual/つ-し.jpg',  questions: [    {prompt: fontPreAct + "つ" + fontPos, labels: likert_scale},    {prompt: fontPreAct + "し" + fontPos, labels: likert_scale},  ],},
  { filename: 'actual/に-な.jpg',  questions: [    {prompt: fontPreAct + "に" + fontPos, labels: likert_scale},    {prompt: fontPreAct + "な" + fontPos, labels: likert_scale},  ],},

  { filename: 'actual/ぬ-す.jpg',  questions: [    {prompt: fontPreAct + "ぬ" + fontPos, labels: likert_scale},    {prompt: fontPreAct + "す" + fontPos, labels: likert_scale},  ],},
  { filename: 'actual/は-ら.jpg',  questions: [    {prompt: fontPreAct + "は" + fontPos, labels: likert_scale},    {prompt: fontPreAct + "ら" + fontPos, labels: likert_scale},  ],},
  { filename: 'actual/ふ-ね.jpg',  questions: [    {prompt: fontPreAct + "ふ" + fontPos, labels: likert_scale},    {prompt: fontPreAct + "や" + fontPos, labels: likert_scale},  ],},
  { filename: 'actual/ほ-や.jpg',  questions: [    {prompt: fontPreAct + "ほ" + fontPos, labels: likert_scale},    {prompt: fontPreAct + "ね" + fontPos, labels: likert_scale},  ],},
  { filename: 'actual/む-ろ.jpg',  questions: [    {prompt: fontPreAct + "む" + fontPos, labels: likert_scale},    {prompt: fontPreAct + "ろ" + fontPos, labels: likert_scale},  ],},

  { filename: 'actual/め-れ.jpg',  questions: [    {prompt: fontPreAct + "め" + fontPos, labels: likert_scale},    {prompt: fontPreAct + "れ" + fontPos, labels: likert_scale},  ],},
  { filename: 'actual/も-そ.jpg',  questions: [    {prompt: fontPreAct + "も" + fontPos, labels: likert_scale},    {prompt: fontPreAct + "そ" + fontPos, labels: likert_scale},  ],},
  { filename: 'actual/ゆ-ち.jpg',  questions: [    {prompt: fontPreAct + "ゆ" + fontPos, labels: likert_scale},    {prompt: fontPreAct + "ち" + fontPos, labels: likert_scale},  ],},
  { filename: 'actual/よ-を.jpg',  questions: [    {prompt: fontPreAct + "よ" + fontPos, labels: likert_scale},    {prompt: fontPreAct + "を" + fontPos, labels: likert_scale},  ],},
  { filename: 'actual/る-と.jpg',  questions: [    {prompt: fontPreAct + "る" + fontPos, labels: likert_scale},    {prompt: fontPreAct + "と" + fontPos, labels: likert_scale},  ],}
];


// 順番をランダマイズしたいので指定しておく
var trials = {
  timeline: [],
//  timeline_variables: examPictures,
//  randomize_order: true,
};

// ランダマイズ
var sequence = [] ;
for (let i = 0; i< examPictures.length; i++) {
  sequence[i] = i ;
}
for (let i = 0; i< examPictures.length; i++) {
  target           =  Math.floor(Math.random() * examPictures.length) ;
  tmpseq           = sequence[i] ;
  sequence[i]      = sequence[target] ;
  sequence[target] = tmpseq
}


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//問題の個数分ループ ここから
for (let i = 0; i< examPictures.length; i++) {
  // 問題一式の作成 (画像表示 + 選択肢)
  // 画像表示

  var showimage = {
    type: jsPsychImageKeyboardResponse,
    stimulus: examPictures[sequence[i]].filename,
    stimulus_height: 1200 ,
    stimulus_width: 1200 ,
    choices: "NO_KEYS",
    trial_duration: 3000,
  };

  // 選択肢
  var response = {
    type: jsPsychSurveyLikert,
    preamble: 'これらの文字にどれくらいの割合で似ていると感じたか、該当する割合(%)を選んでください',
    scale_width: 1200 ,
    questions: examPictures[sequence[i]].questions,
    randomize_question_order: false
  };

  // TLにpush
  trials.timeline.push(blankscreen) ;
  trials.timeline.push(eyepointL) ;
  trials.timeline.push(showimage) ;
  trials.timeline.push(response) ;
  trials.timeline.push(responsePage2) ;

  if ( i == 10) // 11問終わったところで休憩表示
    trials.timeline.push(Breaktime) ;
 

}//問題の個数分ループ ここまで
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// ------------------------------------------------------------------------
// 実験の開始
// ------------------------------------------------------------------------

//jsPsych.run([preload,enter_fullscreen,Page1,par_id,hello,trials,bye,exit_fullscreen]);
//jsPsych.run([trials]);
jsPsych.run([enter_fullscreen,Page1,Page2,Page3,PracticeTrials,Page4,trials,bye,exit_fullscreen]);
//jsPsych.run([trials,bye,exit_fullscreen]);
