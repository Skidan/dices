"use strict";
/* eslint-env browser */
/* eslint-disable no-console */
// DOM VAR
var domHtml, domBody, domWrapper, domLineout, domRulesBtn, domSettingsBtn, domPlay, domPlayTable, domDicesContainer, domThrowContainer, domDice0, domDice1, domCurrentScore, domThrow, domHold, domStop, domModal, domModalWindow, domModalHeading, domRules, domNamesInput, domSettingsInput, domAlert, domCloseBtn, domCancelBtn, domDefaultsBtn, domSaveBtn, domOkBtn, domEndGameBtn;
domHtml = document.getElementsByTagName("html")[0];
domBody = document.getElementsByTagName("body")[0];
domWrapper = document.getElementById("wrapper");
domLineout = document.getElementById("lineout");
domRulesBtn = document.getElementById("rules-btn");
domSettingsBtn = document.getElementById("settings-btn");
domPlay = document.getElementById("play");
domPlayTable = document.getElementById("playtable");
//
domDicesContainer = document.getElementById("dices");
domThrowContainer = document.getElementById("throw");
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
domDefaultsBtn = document.getElementById("defaults-btn");
domSaveBtn = document.getElementById("save-btn");
domOkBtn = document.getElementById("ok-btn");
domEndGameBtn = document.getElementById("end-game-btn");

// VAR
var dice, dicesAmount, maxScore, gamePlaying, playerNames, turn;

// ACTIONS
function show(x) {
  x.classList.remove("hidden");
}
function hide(x) {
  x.classList.add("hidden");
}
function applyClass(dom, className) {
  dom.classList.add(className);
}
function removeClass(dom, className) {
  dom.classList.remove(className);
}
function hideModal() {
  hide(domModal);
  removeClass(domWrapper, "blur");
  removeClass(domHtml, "noscroll");
  removeClass(domBody, "noscroll");
  removeClass(domModalWindow, "scroll");
  hide(domRules);
  hide(domNamesInput);
  hide(domSettingsInput);
  hide(domAlert);
  hide(domCloseBtn);
  hide(domDefaultsBtn);
  hide(domCancelBtn);
  hide(domSaveBtn);
  hide(domOkBtn);
  hide(domEndGameBtn);
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
  hideModal();
}
function btnOk() {
  hideModal();
}
function btnCancel() {
  hideModal();
}
function btnDefaults() {
  for (var i=0; i<2; i++) {
    document.getElementById("name-"+i).value = "";
  }
  document.getElementById("one-dice").checked = true;
  document.getElementById("totalscore").value = 100;
}
function btnSave() {
  readSettings();
  hideModal();
}
function btnEndGame() {
  gamePlaying = false;
  hideModal();
  initialSetup();
}

function showRules() {
  domModalHeading.textContent = "Rules of the game";
  showModal();
  show(domRules);
  show(domCloseBtn);
  domCloseBtn.addEventListener("click", btnClose);
}

function askWantEndGame() {
  showModal();
  show(domAlert);
  show(domCancelBtn);
  show(domEndGameBtn);
  domCancelBtn.addEventListener("click", btnCancel);
  domEndGameBtn.addEventListener("click", btnEndGame);
}

function showSettings() {
  if (gamePlaying == false) {
    domModalHeading.textContent = "Modify settings";
    showModal();
    show(domNamesInput);
    show(domSettingsInput);
    show(domDefaultsBtn);
    show(domOkBtn);
    domDefaultsBtn.addEventListener("click", btnDefaults);
    domOkBtn.addEventListener("click", btnOk);
  } else {
    askWantEndGame();
  }
  
}

// FUNCTIONS

function initialSetup() {
  hideModal();
  hide(domPlayTable);  
  show(domPlay);
  domLineout.textContent = "Modify initial settings or start play with default ones.";
  domRulesBtn.addEventListener("click", showRules);
  domSettingsBtn.addEventListener("click", showSettings);
  domPlay.addEventListener("click", startGame);
  playerNames = [];
  gamePlaying = false;
}

function readSettings() {
  for (var i = 0; i < 2; i++) {
    if (document.getElementById("name-" + i).value != "") {
      playerNames.push(document.getElementById("name-"+i).value);
      document.getElementById("player-"+i+"-name").textContent = playerNames[i];
    } else {
      playerNames.push(document.getElementById("name-"+i).placeholder);
      document.getElementById("player-"+i+"-name").textContent = playerNames[i];
    }
  } // output: playerNames[name1,name2]
  if (document.getElementById("one-dice").checked == true) {
    dice = [0];
    dicesAmount = dice.length;
    console.log("Only " + dicesAmount + " dice: "+dice);
  } else {
    dice = [0, 0];
    dicesAmount = dice.length;
    console.log(dicesAmount + " dices: "+dice);
  } // output: dice[0] or dice [0,0]
  maxScore = document.getElementById("totalscore").value; //output maxScore = number
}

function throwDices() {
  if (dice.length < 2) {
    for (var n=1; n<7; n++) {
      removeClass(domDice0, "dice-"+n);
    }    
    dice[0] = Math.floor(Math.random()*6+1);
    console.log(dice[0]);
    domDice0.classList.add("dice-"+dice[0]);
  }else{
    for (n=1; n<7; n++) {
      removeClass(domDice0, "dice-"+n);
    }
    for (n=1; n<7; n++) {
      removeClass(domDice1, "dice-"+n);
    }
    dice[0] = Math.floor(Math.random()*6+1);
    domDice0.classList.add("dice-"+dice[0]);
    dice[1] = Math.floor(Math.random()*6+1);
    domDice1.classList.add("dice-"+dice[1]);
    console.log(dice[0] + ", " + dice[1]);
  }
}

function throwTurn() {
  for (var n=1; n<7; n++) {
    removeClass(domDice0, "dice-"+n);
  }
  for (n=1; n<7; n++) {
    removeClass(domDice1, "dice-"+n);
  }
  do {
    var pl = [];
    pl[0] = Math.floor(Math.random()*6+1);
    domDice0.classList.add("dice-"+pl[0]);
    pl[1] = Math.floor(Math.random()*6+1);
    domDice1.classList.add("dice-"+pl[1]);
    if (pl[0] > pl[1]) {
      turn = 0;
      console.log("Turn = player 1");
    } else if (pl[0] < pl[1]) {
      turn = 1;
      console.log("Turn = player 1");
    }
    console.log("Iteration");
  } while (pl[0] == pl[1]);  
}

function startGame() {
  gamePlaying = true;
  turn = undefined;
  dice = undefined;
  for (var n=1; n<7; n++) {
    removeClass(domDice0, "dice-"+n);
  }
  for (n=1; n<7; n++) {
    removeClass(domDice1, "dice-"+n);
  }
  readSettings();
  hide(document.getElementById("current-score"));
  hide(document.getElementById("hold"));  
  applyClass(domDice0, "dicesturn");
  applyClass(domDice1, "dicesturn");
  applyClass(domDicesContainer, "fullsize");
  applyClass(domThrowContainer, "fullsize");
  domLineout.textContent = "Throw dices to play the first turn..."
  hide(domPlay);
  show(domPlayTable);
  // выстроить ДОМ для игры согласно настроек;
  // присвоить активную позицию согласно розыгрыша очереди хода

  domThrow.addEventListener("click", throwTurn);
  domStop.addEventListener("click", askWantEndGame);
}
// ALGORITHM

initialSetup();