let numberContainerEl = document.getElementById("numberContainer");
let displyNumberEl = document.getElementById("displyNumber");
let genrateButtonEl = document.getElementById("genrateButton");
let clearGameEl = document.getElementById("clearGame");
let historyButtonEl = document.getElementById("historyButton");
let mainContainerEl = document.getElementById("mainContainer");
let historyMainContainerEl = document.getElementById("historyMainContainer");

let numbersList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
    31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65,
    66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 77, 76, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90
];
let generatedNumbers = [];
let storedGeneratedNumbers = localStorage.getItem("generatedNumbers");
if (storedGeneratedNumbers) {
    generatedNumbers = JSON.parse(storedGeneratedNumbers);
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
    for (let num of numbersList) {
        let buttonId = "button" + num;
        let buttonEl = document.getElementById(buttonId);
        if (!buttonEl.classList.contains("checked")) {
            return false
        }
    }
    return true

}

function compareNumbers() {
    let randomNumber = generateUniqueRandomNumber();
    console.log(randomNumber);
    displyNumberEl.textContent = randomNumber;

    for (let num of numbersList) {
        let buttonId = "button" + num;
        let buttonEl = document.getElementById(buttonId);

        if (randomNumber === num && !buttonEl.classList.contains("checked")) {
            buttonEl.classList.add("checked");
            if (checkAllNumbersMarked()) {
                alert("Game is Completed");
                location.reload();

            }
        }
    }
}

genrateButtonEl.onclick = function() {
    compareNumbers();
};

// function goToHistory() {
//     mainContainerEl.classList.add("d-none");
//     historyMainContainerEl.classList.remove("d-none");
//     let generatedNumbers = JSON.parse(localStorage.getItem("generatedNumbers")) || [];
//     let unOrderListEl = document.createElement("ul");
//     for (let num of generatedNumbers) {
//         let historylistEl = document.createElement("li");
//         historylistEl.classList.add("list-s");
//         historylistEl.textContent = num;
//         unOrderListEl.appendChild(historylistEl);
//     }
//     historyMainContainerEl.appendChild(unOrderListEl);
// }

// Define the unordered list and list items outside the function
let unOrderListEl = document.createElement("ul");

function goToHistory() {
    mainContainerEl.classList.add("d-none");
    historyMainContainerEl.classList.remove("d-none");

    let generatedNumbers = JSON.parse(localStorage.getItem("generatedNumbers")) || [];

    // Clear the existing list items
    unOrderListEl.innerHTML = '';

    // Create a single list item to display generated numbers horizontally
    let listItemEl = document.createElement("li");
    listItemEl.classList.add("list-s");
    listItemEl.textContent = generatedNumbers.join(", ");

    // Append the list item to the unordered list
    unOrderListEl.appendChild(listItemEl);

    // Append the unordered list to the historyMainContainer if not already present
    if (!historyMainContainerEl.contains(unOrderListEl)) {
        historyMainContainerEl.appendChild(unOrderListEl);
    }
}


clearGameEl.onclick = function() {
    for (let num of generatedNumbers) {
        let buttonId = "button" + num;
        let buttonEl = document.getElementById(buttonId);
        if (buttonEl) {
            buttonEl.classList.remove("checked");
        }
    }

    // Clear the generatedNumbers array and remove it from local storage
    generatedNumbers = [];
    localStorage.removeItem("generatedNumbers");

    // Reload the page
    displyNumberEl.textContent = "";
    genrateButtonEl.disabled = false;

    gameCompleted = false;
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

for (let num of numbersList) {
    createPlayGame(num);
}

window.addEventListener('load', function() {
    for (let num of generatedNumbers) {
        let buttonId = "button" + num;
        let buttonEl = document.getElementById(buttonId);
        if (buttonEl) {
            buttonEl.classList.add("checked");
        }
    }
});

function backToGame() {
    mainContainerEl.classList.remove("d-none");
    historyMainContainerEl.classList.add("d-none");
}
