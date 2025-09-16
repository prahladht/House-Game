let numberContainerEl = document.getElementById("numberContainer");
let displyNumberEl = document.getElementById("displyNumber");
let genrateButtonEl = document.getElementById("genrateButton");
let clearGameEl = document.getElementById("clearGame");
let historyButtonEl = document.getElementById("historyButton");
let mainContainerEl = document.getElementById("mainContainer");
let historyMainContainerEl = document.getElementById("historyMainContainer");

let numbersList = Array.from({ length: 90 }, (_, i) => i + 1);
let generatedNumbers = [];
let storedGeneratedNumbers = localStorage.getItem("generatedNumbers");
if (storedGeneratedNumbers) {
    generatedNumbers = JSON.parse(storedGeneratedNumbers);
}

// ✅ Speak number aloud
function speakNumber(num) {
    let msg = new SpeechSynthesisUtterance(num.toString());
    msg.lang = "en-US"; // you can change this to "hi-IN" or other language
    window.speechSynthesis.speak(msg);
}

function generateUniqueRandomNumber() {
    let randomNumber;
    do {
        randomNumber = Math.ceil(Math.random() * 90);
    } while (generatedNumbers.includes(randomNumber));

    generatedNumbers.push(randomNumber);
    localStorage.setItem("generatedNumbers", JSON.stringify(generatedNumbers));
    return randomNumber;
}

function checkAllNumbersMarked() {
    return numbersList.every(num => {
        let buttonEl = document.getElementById("button" + num);
        return buttonEl.classList.contains("checked");
    });
}

function compareNumbers() {
    let randomNumber = generateUniqueRandomNumber();
    displyNumberEl.textContent = randomNumber;

    let buttonEl = document.getElementById("button" + randomNumber);
    if (buttonEl && !buttonEl.classList.contains("checked")) {
        buttonEl.classList.add("checked");
    }

    // ✅ Speak the number
    speakNumber(randomNumber);

    if (checkAllNumbersMarked()) {
        alert("Game is Completed");
        location.reload();
    }
}

genrateButtonEl.onclick = compareNumbers;

let unOrderListEl = document.createElement("ul");

function goToHistory() {
    mainContainerEl.classList.add("d-none");
    historyMainContainerEl.classList.remove("d-none");

    let generatedNumbers = JSON.parse(localStorage.getItem("generatedNumbers")) || [];
    unOrderListEl.innerHTML = '';
    let listItemEl = document.createElement("li");
    listItemEl.textContent = generatedNumbers.join(", ");
    unOrderListEl.appendChild(listItemEl);

    if (!historyMainContainerEl.contains(unOrderListEl)) {
        historyMainContainerEl.appendChild(unOrderListEl);
    }
}

clearGameEl.onclick = function() {
    generatedNumbers.forEach(num => {
        let buttonEl = document.getElementById("button" + num);
        if (buttonEl) {
            buttonEl.classList.remove("checked");
        }
    });

    generatedNumbers = [];
    localStorage.removeItem("generatedNumbers");
    displyNumberEl.textContent = "";
    genrateButtonEl.disabled = false;
};

function createPlayGame(num) {
    let buttonId = "button" + num;
    if (num % 10 === 1) {
        let listEl = document.createElement("li");
        listEl.classList.add("list-s");
        numberContainerEl.appendChild(listEl);
    }

    let buttonEl = document.createElement("button");
    buttonEl.id = buttonId;
    buttonEl.textContent = num;
    buttonEl.classList.add("btn-style");

    let listEls = document.querySelectorAll("li");
    listEls[listEls.length - 1].appendChild(buttonEl);

    if (num % 10 === 0) {
        let lineBreakEl = document.createElement("br");
        listEls[listEls.length - 1].appendChild(lineBreakEl);
    }
}

numbersList.forEach(num => createPlayGame(num));

window.addEventListener('load', function() {
    generatedNumbers.forEach(num => {
        let buttonEl = document.getElementById("button" + num);
        if (buttonEl) {
            buttonEl.classList.add("checked");
        }
    });
});

function backToGame() {
    mainContainerEl.classList.remove("d-none");
    historyMainContainerEl.classList.add("d-none");
}
