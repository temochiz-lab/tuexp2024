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
  message: '<p>実験名: aoki2024-01</p><p>開始ボタンを押すと全画面表示で実験が始まります。</p>',
  button_label: "開始",
  fullscreen_mode: true
}

// 実験の説明
var Page1 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: '<div align=left> \
  【研究の目的】<br>\
  　本研究はひらがなを基にした架空の文字の類似度と不気味さの関係性について\
  検討することを目的としています。この実験は文字の類似度を明らかにして、\
  本実験の尺度を作成するために行います。\
  <br>\
  　この実験は参加を強制するものではございません。途中で答えたくないと\
  感じたり、気分が悪くなったりした場合はお申し出ください。\
  　また、 得られた回答は全て数値化して厳重に保管し、個人が特定されないように\
  処理いたします。\
  <br><br>\
  【手順】<br>\
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

// この後実験開始
var Page3 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: '<div align=center> \
  次のページから実験が始まります。<br>\
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
  stimulus: '<p style="font-size: 96px;">+</p>',
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

// 画像ファイルの用意
var baseURL = './' ;
var examPictures = [
  { filename: '1.png', 
  labels: ['100%<br><font size=60>を</font>','90%','80%','70%','60%','50%','40%','30%','20%','10%','0%', '10%','20%','30%','40%','50%','60%','70%','80%','90%','100%<br><font size=60>あ</font>' ]
},
  { filename: '2.png',
  labels: ['100%<br><font size=60>す</font>','90%','80%','70%','60%','50%','40%','30%','20%','10%','0%', '10%','20%','30%','40%','50%','60%','70%','80%','90%','100%<br><font size=60>せ</font>' ]
},
  { filename: '3.png',
  labels: ['100%<br><font size=60>え</font>','90%','80%','70%','60%','50%','40%','30%','20%','10%','0%', '10%','20%','30%','40%','50%','60%','70%','80%','90%','100%<br><font size=60>て</font>' ]
},
  { filename: '4.png',
labels: ['100%<br><font size=60>を</font>','90%','80%','70%','60%','50%','40%','30%','20%','10%','0%', '10%','20%','30%','40%','50%','60%','70%','80%','90%','100%<br><font size=60>あ</font>' ]
},
  { filename: '5.png',
labels: ['100%<br><font size=60>き</font>','90%','80%','70%','60%','50%','40%','30%','20%','10%','0%', '10%','20%','30%','40%','50%','60%','70%','80%','90%','100%<br><font size=60>み</font>' ]
},
  { filename: '6.png',
labels: ['100%<br><font size=60>と</font>','90%','80%','70%','60%','50%','40%','30%','20%','10%','0%', '10%','20%','30%','40%','50%','60%','70%','80%','90%','100%<br><font size=60>ろ</font>' ]
},
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

var showimage0 = {
  type: jsPsychImageKeyboardResponse,
  stimulus: examPictures[0].filename,
  stimulus_height: 600 ,
  stimulus_width: 600 ,
  choices: "NO_KEYS",
  trial_duration: 3000,
};

var showimage5 = {
  type: jsPsychImageKeyboardResponse,
  stimulus: examPictures[5].filename,
  stimulus_height: 600 ,
  stimulus_width: 600 ,
  choices: "NO_KEYS",
  trial_duration: 3000,
};

var response0 = {
  type: jsPsychHtmlSliderResponse,
    stimulus: 'どちらの文字にどれくらいの割合で似ていると感じたか、該当する目盛をクリックしてください。<br><br>',
    min: -100,
    max: 100,
    slider_start: 0,
    step: 10,
    slider_width: 1000,
    button_label: '次へ',
    labels: examPictures[0].labels,
};


//問題の個数分ループ ここから
//for (let i = 0; i< examPictures.length; i++) {

// 問題一式の作成 (画像表示 + 選択肢)
// ---------------------------------------------------------------
// 画像表示
/*
var showimage = {
  type: jsPsychImageKeyboardResponse,
  stimulus: examPictures[sequence[i]].filename,
  stimulus_height: 600 ,
  stimulus_width: 600 ,
  choices: "NO_KEYS",
  trial_duration: 3000,
};

// 選択肢
var response = {
  type: jsPsychHtmlSliderResponse,
    stimulus: 'どちらの文字にどれくらいの割合で似ていると感じたか、該当する目盛をクリックしてください。<br><br>',
    min: -100,
    max: 100,
    slider_start: 0,
    step: 10,
    slider_width: 1000,
    button_label: '次へ',
    labels: examPictures[sequence[i]].labels,
};
*/

// 選択肢パターンB
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

var responseB = {
  type: jsPsychSurveyLikert,
  preamble: 'これらの文字にどれくらいの割合で似ていると感じたか、該当する割合(%)を選んでください',
  scale_width: 600 ,
  questions: [
    {prompt: "<div align=left><font size=96>と</font></div>", name: 'a1', labels: likert_scale},
    {prompt: "<div align=left><font size=96>ろ</font></div>", name: 'a1', labels: likert_scale},
    {prompt: "<div align=left><font size=96>し</font></div>", name: 'a1', labels: likert_scale},
  ],
  randomize_question_order: false
};

// 当初パターン
trials.timeline.push(blankscreen) ;
trials.timeline.push(eyepointL) ;
trials.timeline.push(showimage0) ;
trials.timeline.push(response0) ;

// パターン2
trials.timeline.push(blankscreen) ;
trials.timeline.push(eyepointL) ;
trials.timeline.push(showimage5) ;
trials.timeline.push(responseB) ;
// ---------------------------------------------------------------


//}
//問題の個数分ループ ここまで



// ------------------------------------------------------------------------
// 実験の開始
// ------------------------------------------------------------------------

//jsPsych.run([preload,enter_fullscreen,Page1,par_id,hello,trials,bye,exit_fullscreen]);
//jsPsych.run([trials]);
jsPsych.run([enter_fullscreen,Page1,Page2,Page3,trials,bye,exit_fullscreen]);
