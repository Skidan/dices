"use strict";
/* eslint-env browser */
/* eslint-disable no-console */
// DOM VAR
var domHtml, domBody, domWrapper, domLineout, domRulesBtn, domSettingsBtn, domPlay, domPlayTable, domPlayer1Score, domPlayer2Score, domPlayer1Name, domPlayer2Name, domDicesContainer, domThrowContainer, domDice0, domDice1, domCurrentScore, domThrow, domHold, domStop, domPlayer0, domPlayer1, domModal, domModalWindow, domModalHeading, domRules, domNamesInput, domSettingsInput, domAlert, domInform, domCloseBtn, domCancelBtn, domDefaultsBtn, domOkBtn, domEndGameBtn, domStartGameBtn;
domHtml = document.getElementsByTagName("html")[0];
domBody = document.getElementsByTagName("body")[0];
domWrapper = document.getElementById("wrapper");
domLineout = document.getElementById("lineout");
domRulesBtn = document.getElementById("rules-btn");
domSettingsBtn = document.getElementById("settings-btn");
domPlay = document.getElementById("play");
domPlayTable = document.getElementById("playtable");
//
domPlayer1Score = document.getElementById("player-0-score");
domPlayer2Score = document.getElementById("player-1-score");
domPlayer1Name = document.getElementById("player-0-name");
domPlayer2Name = document.getElementById("player-1-name");
domDicesContainer = document.getElementById("dices");
domThrowContainer = document.getElementById("throw");
domDice0 = document.getElementById("dice-0");
domDice1 = document.getElementById("dice-1");
domCurrentScore = document.getElementById("current-score");
domThrow = document.getElementById("throw-img");
domHold = document.getElementById("hold-img");
domStop = document.getElementById("stop-game");
domPlayer0 = document.getElementById("player-0");
domPlayer1 = document.getElementById("player-1");
//
domModal = document.getElementById("modal");
domModalWindow = document.getElementById("modal-window");
domModalHeading = document.getElementById("modal-heading");
domRules = document.getElementById("rules");
domNamesInput = document.getElementById("names-input");
domSettingsInput = document.getElementById("settings-input");
domAlert = document.getElementById("alert");
domInform = document.getElementById("inform");
domCloseBtn = document.getElementById("close-btn");
domCancelBtn = document.getElementById("cancel-btn");
domDefaultsBtn = document.getElementById("defaults-btn");
domOkBtn = document.getElementById("ok-btn");
domEndGameBtn = document.getElementById("end-game-btn");
domStartGameBtn = document.getElementById("start-game-btn");

// VAR
var dice, diceLast, dicesAmount, maxScore, gamePlaying, playerNames, active, wholeScore, currentScore;

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
  hide(domInform);
  hide(domCloseBtn);
  hide(domDefaultsBtn);
  hide(domCancelBtn);
  hide(domOkBtn);
  hide(domEndGameBtn);
  hide(domStartGameBtn);
}

function showModal() {
  applyClass(domWrapper, "blur");
  applyClass(domHtml, "noscroll");
  applyClass(domBody, "noscroll");
  show(domModal);
  applyClass(domModalWindow, "scroll");
}

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

function btnStartGame() {
  wholeScore = [0, 0];
  currentScore = 0;
  diceLast = [0, 0];
  domInform.textContent = "Info";
  hideModal();
  show(document.getElementById("current-score"));
  show(document.getElementById("hold"));  
  removeClass(domDice0, "dicesturn");
  removeClass(domDice1, "dicesturn");
  removeClass(domDicesContainer, "fullsize");
  removeClass(domThrowContainer, "fullsize");
  for (var n=1; n<7; n++) {
    removeClass(domDice0, "dice-"+n);
  }
  for (n=1; n<7; n++) {
    removeClass(domDice1, "dice-"+n);
  }
  if (dicesAmount == 1) {
    show(domDice0);
    hide(domDice1);
    dice = [0];
  }else{
    show(domDice0);
    show(domDice1);
    dice = [0, 0];
  }
  domPlayer1Score.textContent = wholeScore[0];
  domPlayer2Score.textContent = wholeScore[1];
  domCurrentScore.textContent = currentScore;
  gamePlay();
}

function btnEndGame() {
  removeClass(domCurrentScore, "lightred");
  removeClass(domCurrentScore, "darkred");
  gamePlaying = false;
  wholeScore = [0, 0]
  domPlayer1Score.textContent = wholeScore[0];
  domPlayer2Score.textContent = wholeScore[1];
  hideModal();
  initialSetup();
}

function clearDices() {
  for (var n=1; n<7; n++) {
    removeClass(domDice0, "dice-"+n);
  }
  for (n=1; n<7; n++) {
    removeClass(domDice1, "dice-"+n);
  }
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

function inform(string) {
  showModal();
  show(domInform);
  show(domStartGameBtn);
  show(domEndGameBtn);
  domInform.textContent = string;
  domStartGameBtn.addEventListener("click", btnStartGame);
  domEndGameBtn.addEventListener("click", btnEndGame);
}

function toggleActive() {
  removeClass(domCurrentScore, "lightred");
  removeClass(domCurrentScore, "darkred");
  if (active == 0) {
    active = 1;
    applyClass(domPlayer1, "active");
    removeClass(domPlayer0, "active");
  } else {
    active = 0;
    applyClass(domPlayer0, "active");
    removeClass(domPlayer1, "active");
  }
  diceLast = [0, 0];
  currentScore = 0;
  domCurrentScore.textContent = currentScore;
}

function hold() {
  clearDices();
  if (gamePlaying) {
    wholeScore[active] += currentScore;
    if (active == 0) {
      domPlayer1Score.textContent = wholeScore[0];
    } else {
      domPlayer2Score.textContent = wholeScore[1];
    }

    if (wholeScore[active] >= maxScore) {
      if (active == 0) {
        applyClass(domPlayer1Score, "winner");
        applyClass(domPlayer1Name, "winner");
      } else {
        applyClass(domPlayer2Score, "winner");
        applyClass(domPlayer2Name, "winner");
      }
      gamePlaying = false;
    } else {
      if (dicesAmount == 2) {
        dice = [0, 0];
      } else {
        dice = [0];
      }
      toggleActive();
    }
  }
}

function initialSetup() {
  //coersing
  playerNames = [];
  gamePlaying = false;
  //DOM manipulations
  hideModal();
  hide(domPlayTable);  
  show(domPlay);
  domLineout.textContent = "Modify initial settings or start play with default ones.";
  //events
  domRulesBtn.addEventListener("click", showRules);
  domSettingsBtn.addEventListener("click", showSettings);
  domPlay.addEventListener("click", startGame);
  
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
  }
  if (document.getElementById("one-dice").checked == true) {
    dice = [0];
    dicesAmount = dice.length;
  } else {
    dice = [0, 0];
    dicesAmount = dice.length;
  }
  maxScore = document.getElementById("totalscore").value;
}

function throwDices() {
  if (gamePlaying) {
    if (dice.length < 2) { // ONE DICE
      clearDices();
      diceLast[0] = dice[0];
      dice[0] = Math.floor(Math.random()*6+1);
      domDice0.classList.add("dice-"+dice[0]);
      if (dice[0] == 1) {
        toggleActive();
        dice = [0];
      } else if (dice[0] == 6 && diceLast[0] == 6) {
        wholeScore[active] = 0;
        if (active == 0) {
          domPlayer1Score.textContent = 0;
        } else {
          domPlayer2Score.textContent = 0;
        }
        toggleActive();
        dice = [0];
      } else {
        currentScore += dice[0];
        domCurrentScore.textContent = currentScore;
      }
    }else{ // TWO DICES
      clearDices();
      diceLast[0] = dice[0];
      dice[0] = Math.floor(Math.random()*6+1);
      domDice0.classList.add("dice-"+dice[0]);
      diceLast[1] = dice[1];
      dice[1] = Math.floor(Math.random()*6+1);
      domDice1.classList.add("dice-"+dice[1]);
      
      if (dice[0] == dice[1]) {
        switch (dice[0]) {
          case 1: currentScore += 25; domCurrentScore.textContent = currentScore; break;
          case 6: wholeScore[active] = 0; dice = [0, 0]; toggleActive(); break;
          default: currentScore += (dice[0] + dice[1]) * 2; domCurrentScore.textContent = currentScore; break;
        }
      } else if (dice[0] == 1 || dice[1] == 1) {
        toggleActive();
        dice = [0, 0];
      } else {
        currentScore += dice[0] + dice[1];
        domCurrentScore.textContent = currentScore;
      }
      
      /*
      if (dice[0] + dice[1] == 2) {
        toggleActive();
        dice = [0, 0];
      } else if (dice[0] + dice[1] == 12 && diceLast[0]+diceLast[1] == 12) {
        wholeScore[active] = 0;
        if (active == 0) {
          domPlayer1Score.textContent = 0;
        } else {
          domPlayer2Score.textContent = 0;
        }
        toggleActive();
        dice = [0, 0];
      } else {
        currentScore += dice[0] + dice[1];
        domCurrentScore.textContent = currentScore;
      }
      */
    }
    if (wholeScore[active] + currentScore >= maxScore - 10 && wholeScore[active] + currentScore < maxScore) {
      applyClass(domCurrentScore, "lightred");
    } else if (wholeScore[active] + currentScore >= maxScore) {
      applyClass(domCurrentScore, "darkred");
    }
  }
}

function throwTurn() {
  do {
    clearDices();
    var pl = [];
    pl[0] = Math.floor(Math.random()*6+1);
    domDice0.classList.add("dice-"+pl[0]);
    pl[1] = Math.floor(Math.random()*6+1);
    domDice1.classList.add("dice-"+pl[1]);
    if (pl[0] > pl[1]) {
      active = 0;
      applyClass(domPlayer0, "active");
      removeClass(domPlayer1, "active");
    } else if (pl[0] < pl[1]) {
      active = 1;
      applyClass(domPlayer1, "active");
      removeClass(domPlayer0, "active");
    }
  } while (pl[0] == pl[1]);
  inform("It's " + playerNames[active] + "'s turn. \nStill want to play?");
}

function startGame() {
  //coersing
  gamePlaying = true;
  active = undefined;
  dice = undefined;
  //DOM manipulations
  clearDices();
  readSettings();
  hide(document.getElementById("current-score"));
  hide(document.getElementById("hold"));  
  applyClass(domDice0, "dicesturn");
  applyClass(domDice1, "dicesturn");
  applyClass(domDicesContainer, "fullsize");
  applyClass(domThrowContainer, "fullsize");
  removeClass(domPlayer1Score, "winner");
  removeClass(domPlayer1Name, "winner");
  removeClass(domPlayer2Score, "winner");
  removeClass(domPlayer2Name, "winner");
  removeClass(domPlayer0, "active");
  removeClass(domPlayer1, "active");
  show(domDice0);
  show(domDice1);
  domLineout.textContent = "Throw dices to play the first turn..."
  hide(domPlay);
  show(domPlayTable);
  //events
  domThrow.addEventListener("click", throwTurn);
  domStop.addEventListener("click", askWantEndGame);
}

function gamePlay() {
  //events
  domThrow.removeEventListener("click", throwTurn);
  domThrow.addEventListener("click", throwDices);
  domHold.addEventListener("click", hold);
}

initialSetup();