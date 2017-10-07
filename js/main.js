// DOM VAR
var domHtml, domBody, domLineout, domRulesBtn, domSettingsBtn, domPlay, domPlayTable, domDice1, domCurrentScore, domThrow, domHold, domStop, domModal, domModalHeading, domRules, domNamesInput, domSettingsInput, domAlert, domCloseBtn, domCancelBtn, domSaveBtn, domOkBtn, domEndGameBtn;
domHtml = document.getElementsByTagName("html")[0];
domBody = document.getElementsByTagName("body")[0];
domLineout = document.getElementById("lineout");
domRulesBtn = document.getElementById("settings");
domSettingsBtn = document.getElementById("rules-btn");
domPlay = document.getElementById("play");
domPlayTable = document.getElementById("playtable");
//
domDice1 = document.getElementById("dice-1");
domCurrentScore = document.getElementById("current-score");
domThrow = document.getElementById("throw-img");
domHold = document.getElementById("hold-img");
domStop = document.getElementById("stop-game");
//
domModal = document.getElementById("modal");
domModalHeading = document.getElementById("modal-heading");
domRules = document.getElementById("rules");
domNamesInput = document.getElementById("names-input");
domSettingsInput = document.getElementById("settings-input");
domAlert = document.getElementById("alert");
domCloseBtn = document.getElementById("close-btn");
domCancelBtn = document.getElementById("cancel-btn");
domSaveBtn = document.getElementById("save-btn");
domOkBtn = document.getElementById("ok-btn");
domEndGameBtn = document.getElementById("end-game-btn");

// VAR
var dice, dicesAmount, maxScore;

// ACTIONS
function show(x) {
  x.classList.remove("hidden");
}
function hide(x) {
  x.classList.add("hidden");
}
function applyClass(dom,className) {
  dom.classList.add(className);
}
function removeClass(dom,className) {
  dom.classList.remove(className);
}
// EVENT LISTENERS
function btnClose() {
  hide(domModal);
  document.getElementById("wrapper").classList.remove("blur");
}
function btnCancel() {}


// FUNCTIONS
function hideModal() {}
function showModal() {
  document.getElementById("wrapper").classList.add("blur");
}
function initialSetup() {// Инициализирует начальное окно игры
  // отображаем все элементы, скрываем модаль, кнопку "стоп", панели игроков, текущий счёт, кубики, кнопку "бросить", "забрать".
  // меняем лайнаут на "модифицируйте начальные настройки или начните игру с настройками по-умалчанию"
  removeClass(domHtml,"noscroll");
  removeClass(domHtml,"hidden");
  removeClass(domBody,"noscroll");
  removeClass(domBody,"hidden");
  removeClass(domPlay,"hidden");
  removeClass(domPlayTable,"hidden");
  removeClass(domModal,"hidden");
  applyClass(domPlayTable,"hidden");
  applyClass(domModal,"hidden");
  domLineout.textContent = "Modify initial settings or start play with default ones.";
  // добавляем ивент на кнопку "правила": показываем модальное окно, в нём всё скрываем, потом отображаем заголовок "правила", отображаем сами правила и отображаем кнопку "Close".  
  // добавляем ивент на кнопку "Закрыть":
  // добавляем ивент на модаль, аналогично кнопке "закрыть".
  // добавляем ивент на кнопку "настройки": 
  // добавляем ивент на кнопку "начать игру":
}

function readSettings() { // Читает настройки и сохраняет их в переменные
  // Чтение имён игроков и их отображение на игровом поле
  for (i = 0; i < 2; i++) {
    if (document.getElementById("name-" + i).textContent != "") {
      // вывести текстконтент
      document.getElementById("player-"+i+"-name").textContent = document.getElementById("name-"+i).textContent;
    } else {
      // вывести плейсхолдер
      document.getElementById("player-"+i+"-name").textContent = document.getElementById("name-"+i).placeholder;
    }
  }
  // определяем количество костей
  if (document.getElementById("one-dice").checked == true) {
    dice = [0];
    dicesAmount = dice.length;
    console.log("Only " + dicesAmount + " dice: "+dice);
  } else {
    dice = [0, 0];
    dicesAmount = dice.length;
    console.log(dicesAmount + "dices: "+dice);
  }
  // максимальный счёт
  maxScore = document.getElementById("totalscore").value;
  // закрытие окна с настройками
  modalDOM.style.display = "none";
}

// ALGORITHM

initialSetup();
domCloseBtn.addEventListener("click", btnClose);