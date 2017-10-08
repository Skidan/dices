// DOM VAR
var domHtml, domBody, domWrapper, domLineout, domRulesBtn, domSettingsBtn, domPlay, domPlayTable, domDice0, domDice1, domCurrentScore, domThrow, domHold, domStop, domModal, domModalWindow, domModalHeading, domRules, domNamesInput, domSettingsInput, domAlert, domCloseBtn, domCancelBtn, domSaveBtn, domOkBtn, domEndGameBtn;
domHtml = document.getElementsByTagName("html")[0];
domBody = document.getElementsByTagName("body")[0];
domWrapper = document.getElementById("wrapper");
domLineout = document.getElementById("lineout");
domRulesBtn = document.getElementById("rules-btn");
domSettingsBtn = document.getElementById("settings-btn");
domPlay = document.getElementById("play");
domPlayTable = document.getElementById("playtable");
//
domDice0 = document.getElementById("dice-0");
domDice1 = document.getElementById("dice-1");
domCurrentScore = document.getElementById("current-score");
domThrow = document.getElementById("throw-img");
domHold = document.getElementById("hold-img");
domStop = document.getElementById("stop-game");
//
domModal = document.getElementById("modal");
domModalWindow = document.getElementById("modal-window");
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
var dice, dicesAmount, maxScore, gamePlaying, playerNames;

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
function hideModal() {
  hide(domModal);
  removeClass(domWrapper, "blur");
  removeClass(domHtml, "noscroll");
  removeClass(domBody, "noscroll");
  removeClass(domModalWindow, "scroll");
}
function showModal() {
  applyClass(domWrapper, "blur");
  applyClass(domHtml, "noscroll");
  applyClass(domBody, "noscroll");
  show(domModal);
  applyClass(domModalWindow, "scroll");  
}
// EVENT LISTENERS
function btnClose() {
  hide(domCloseBtn);
  hideModal();
}
function btnCancel() {
  hide(domCancelBtn);
  hideModal();
}
function btnSave() {
  readSettings();
  hideModal();
  hide(domNamesInput);
  hide(domSettingsInput);
  hide(domCancelBtn);
  hide(domSaveBtn);
}

function startGame() {
  gamePlaying = true;
}
function showRules() {
  showModal();
  show(domRules);
  show(domCloseBtn);
  domCloseBtn.addEventListener("click", btnClose);
}
function showSettings() {
  // DOM manipulations
  playerNames = []
  showModal();
  show(domNamesInput);
  show(domSettingsInput);
  show(domCancelBtn);
  show(domSaveBtn);
  // event listeners
  domCancelBtn.addEventListener("click", btnCancel);
  domSaveBtn.addEventListener("click", btnSave);
}

// FUNCTIONS

function initialSetup() {// Инициализирует начальное окно приложения
  // correcting visibility of DOM objects
  hideModal();
  hide(domPlayTable);  
  show(domPlay);
  hide(domRules);
  hide(domNamesInput);
  hide(domSettingsInput);
  hide(domAlert);
  hide(domCloseBtn);
  hide(domCancelBtn);
  hide(domSaveBtn);
  hide(domOkBtn);
  hide(domEndGameBtn);
  // changing information in help string
  domLineout.textContent = "Modify initial settings or start play with default ones.";
  // adding event listeners
  domRulesBtn.addEventListener("click", showRules);
  domSettingsBtn.addEventListener("click", showSettings);
  domPlay.addEventListener("click", startGame);
  // variable initial coersion
  gamePlaying = false;
}

function readSettings() { // Читает настройки и сохраняет их в переменные
  // Чтение имён игроков и их отображение на игровом поле
  for (i = 0; i < 2; i++) {
    if (document.getElementById("name-" + i).value != "") {
      // вывести текстконтент
      playerNames.push(document.getElementById("name-"+i).value);
      document.getElementById("player-"+i+"-name").textContent = playerNames[i];
      console.log(playerNames[i]); // debugger
    } else {
      // вывести плейсхолдер
      playerNames.push(document.getElementById("name-"+i).placeholder);
      document.getElementById("player-"+i+"-name").textContent = playerNames[i];
      console.log(playerNames[i]); // debugger
    }
  }
  console.log(playerNames);
  // определяем количество костей
  if (document.getElementById("one-dice").checked == true) {
    dice = [0];
    dicesAmount = dice.length;
    console.log("Only " + dicesAmount + " dice: "+dice);
  } else {
    dice = [0, 0];
    dicesAmount = dice.length;
    console.log(dicesAmount + " dices: "+dice);
  }
  // максимальный счёт
  maxScore = document.getElementById("totalscore").value;
}

// ALGORITHM

initialSetup();