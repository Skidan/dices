// DOM variables
var modalDOM, btnCloseDOM, btnSettingsDOM;
modalDOM = document.getElementById("modal");
btnCloseDOM = document.getElementById("close-btn");
btnSettingsDOM = document.getElementById("settings");

// Other variables
var dice, dicesAmount, maxScore;

// COMMON FUNCTIONS
function show(x) {
  x.classList.remove("hidden");
}
function hide(x) {
  x.classList.add("hidden");
}

// EVENT LISTENERS
function btnClose() {
  hide(modalDOM);
  document.getElementById("wrapper").classList.remove("blur");
}
function btnCancel() {}


// FUNCTIONS
function initialSetup() {// Инициализирует начальное окно игры
  // отображаем все элементы, скрываем модаль, кнопку "стоп", панели игроков, текущий счёт, кубики, кнопку "бросить", "забрать".
  // меняем лайнаут на "модифицируйте начальные настройки или начните игру с настройками по-умалчанию"
  // добавляем ивент на кнопку "правила": показываем модальное окно, в нём всё скрываем, потом отображаем заголовок "правила", отображаем сами правила и отображаем кнопку "Close".  
  // добавляем ивент на кнопку "Закрыть":
  // добавляем ивент на модаль, аналогично кнопке "закрыть".
  // добавляем ивент на кнопку "настройки": 
  // добавляем ивент на кнопку "начать игру": 
  document.getElementById("wrapper").classList.add("blur");
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

initialSetup();
btnCloseDOM.addEventListener("click", btnClose);