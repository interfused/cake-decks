let score = 0;

function startGame() {
  document.getElementById("intro").classList.add("hidden");
  document.getElementById("gameScreen").classList.remove("hidden");
}

/**
 *
 * @param {string} helpID the css ID to be selected
 */
function showHelp(helpID) {
  const helpScreen = document.getElementById("helpScreen");
  helpScreen.classList.add("animate");
  const screens = helpScreen.querySelectorAll(".content");
  screens.forEach((screen) => {
    screen.classList.remove("active");
  });
  const activeScreen = document.getElementById(helpID);
  activeScreen.classList.add("active");
}

function hideHelp() {
  document.getElementById("helpScreen").classList.remove("animate");
}

function evalTowers() {
  score++;
  document.getElementById("scoreText").textContent = score;
  document.getElementById("scoreTextFinal").textContent = score;
  //loop through each tower allow only first to be draggable
  for (let i = 1; i <= 3; i++) {
    const tower = document.getElementById("t" + i);
    tower.setAttribute("data-smallest", 0);
    let dragBool = true;
    let elCnt = 0;

    for (let j = 1; j <= 3; j++) {
      const dragEl = document.getElementById("d" + j);

      if (tower.querySelector("#d" + j) != null) {
        elCnt++;

        if (dragBool == true) {
          tower.setAttribute("data-smallest", dragEl.getAttribute("dataval"));
        }
        dragEl.setAttribute("draggable", dragBool);
        dragBool = false;
      }
      tower.setAttribute("data-total-elements", elCnt);
    }
    ///game over chekc
    if (
      elCnt == 3 &&
      document.getElementById("t3").getAttribute("data-smallest") == "1"
    ) {
      //small timeout used bc Chrome showing window before visual representation of finalized state
      setTimeout(function () {
        document.getElementById("gameScreen").classList.add("hidden");
        document.getElementById("outro").classList.remove("hidden");
      }, 50);
    }
  }
}
function checkdraggable(ev) {
  ev.preventDefault();
  if (ev.target.getAttribute("draggable")) {
    showHelp("drag_error");
  }
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  let a = document.getElementById(ev.target.id);

  //get droptarget smallest number
  const smallest = a.getAttribute("data-smallest");
  const data = ev.dataTransfer.getData("text");

  //check if
  const dropTarget = ev.target;
  a = document.getElementById(data);
  const calcVal = a.getAttribute("dataval");

  if (smallest > calcVal || smallest == 0) {
    dropTarget.insertBefore(
      document.getElementById(data),
      dropTarget.firstChild
    );
    evalTowers();
  } else {
    showHelp("drop_error");
  }
}
