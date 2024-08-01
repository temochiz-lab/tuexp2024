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

// ------------------------------------------------------------------------
// 説明文やお約束のパーツ
// ------------------------------------------------------------------------
var expname  = "shimizu2024-0801-002-"
var filename = expname + yyyymmddhhmise() + ".csv" ;

// alert(expsubject) ;
// alert(voicefile) ;

// ここから開始
  var jsPsych = initJsPsych({
    on_finish: function() {
      jsPsych.data.get().localSave('csv', filename);
  //    jsPsych.data.displayData();
    }
  });
  
// フルスクリーン開始
var enter_fullscreen = {
  type: jsPsychFullscreen,
  message: '<p>実験名: ' + expname + expsubject + '</p><p>開始ボタンを押すと全画面表示で実験が始まります。</p>',
  button_label: "開始",
  fullscreen_mode: true
}

// 実験の説明
var Page1 = {
  type: jsPsychHtmlButtonResponse,
  margin_vertical: '100px',
  margin_horizontal: '100px',
  stimulus: '<div align=center> \
  【研究の目的と流れ】<br><br>\
  <br>\
  <br>\
 (同意の取り方を確認)<br>\
  <br>\
  <br>\
 <br><br></div>',
 choices: ['次へ'],
};

// 被検者情報の入力 完成時には入力必須にしておく
var Page2 = {
  type: jsPsychSurveyText,
  questions: [
    {prompt: '学籍番号と年齢を入力してください。<br><br><br>あなたの学籍番号を入力してください。', columns: 5, required: true, name: 'age'},
    {prompt: 'あなたの年齢を入力してください。',　 columns: 5, required: true, name: 'sex'},
    {prompt: 'あなたの利き手を入力してください。(右効き=1,左効き=2)', columns: 5, required: true, name: 'hand'},
  ],
  button_label: '次へ',
};

// この後開始
var Page3 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: '<div align=center> \
  次のページで音声チェックを行います。<br>\
  準備が出来ましたら、「次へ」ボタンを押して開始してください。\
  <br><br></div>',
 choices: ['次へ'],
};

// この後実験開始
var Page4 = {
  type: jsPsychAudioButtonResponse,
  stimulus: 'voice/volumecheck.mp3',
  choices: ['次へ'],
  prompt: "<br><br>\
  音量を下げる、Fn キーとSCRLK キーの同時押し<br><br>\
  音量を上げる、Fn キーとPAUSE キーの同時押し<br><br>\
  <br><br>再生が終わったら「次へ」を押してください。",
//  button_html: '<img src="%choice%" />'
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


// ---------------------------------------------------------------------
// 練習試行
// ---------------------------------------------------------------------
var PracticeTrials = {
  timeline: [],
//  timeline_variables: examPictures,
//  randomize_order: true,
};

var PracticePage1 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: '(練習) 　これから物語が流れます。　音声に集中して物語を追唱してください。追唱は完璧でなくても問題ありません。<br><br>',
  choices: ['次へ'],
};

var Practice = {
  type: jsPsychAudioButtonResponse,
  stimulus: 'voice/practice.mp3',
  choices: ['次へ'],
  prompt: "<br><br>\
　音量を下げる、Fn キーとSCRLK キーの同時押し<br><br>\
  音量を上げる、Fn キーとPAUSE キーの同時押し<br><br>\
  <br><br>再生が終わったら「次へ」を押してください。",
}

var PracticePage2 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: '(練習)紙で確認テストを行います。　終わったらボタンを押してください。<br><br>',
  choices: ['次へ'],
};

  // 作成した問題1セットをキューイング
//  PracticeTrials.timeline.push(PracticePage1,Practice, PracticePage2) ;
  PracticeTrials.timeline.push(PracticePage1,Practice) ;

// ---------------------------------------------------------------------
// 本番試行
// ------------------------------------------------------------------------------
// 順番をランダマイズしたいので指定しておく
var trials = {
  timeline: [],
//  timeline_variables: examPictures,
//  randomize_order: true,
};

var ExamPage1 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: '(本番)これから物語が流れます。右耳から流れる音声に集中して，物語を追唱してください。追唱は完璧でなくても問題ありません。<br><br>',
  choices: ['次へ'],
};

var Exam = {
  type: jsPsychAudioButtonResponse,
  response_allowed_while_playing: false ,
  stimulus: voicefile,
  choices: ['次へ'],
  prompt: "<br><br>\
  <br><br>再生が終わったら「次へ」を押してください。",
}

var ExamPage2 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: '(本番)これで実験を終了です。　次に紙面で物語の確認テストを行います。　実験者からの支持をお待ちください。<br><br>',
  choices: ['次へ'],
};


// 作成した問題1セットをキューイング
  trials.timeline.push(ExamPage1,Exam, ExamPage2) ;
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// ------------------------------------------------------------------------
// 実験の開始
// ------------------------------------------------------------------------

//jsPsych.run([enter_fullscreen,Page1,Page2,Page3,Page4,PracticeTrials,trials,bye,exit_fullscreen]);
jsPsych.run([enter_fullscreen,Page3,Page4,Page2,PracticeTrials,trials,bye,exit_fullscreen]);
