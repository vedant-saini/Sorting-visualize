// Global variable to check if sorting is in progress
let isSorting = false;

// Swap function to switch the heights of two DOM elements
function swap(el1, el2) {
    let temp = el1.style.height;
    el1.style.height = el2.style.height;
    el2.style.height = temp;
}

// Disable sorting buttons during sorting to prevent interruption
function disableSortingBtn() {
    document.querySelector(".bubbleSort").disabled = true;
    document.querySelector(".insertionSort").disabled = true;
    document.querySelector(".mergeSort").disabled = true;
    document.querySelector(".quickSort").disabled = true;
    document.querySelector(".selectionSort").disabled = true;
}

// Enable sorting buttons after sorting completes
function enableSortingBtn() {
    document.querySelector(".bubbleSort").disabled = false;
    document.querySelector(".insertionSort").disabled = false;
    document.querySelector(".mergeSort").disabled = false;
    document.querySelector(".quickSort").disabled = false;
    document.querySelector(".selectionSort").disabled = false;
}

// Disable size slider during sorting
function disableSizeSlider() {
    document.querySelector("#arr_sz").disabled = true;
}

// Enable size slider after sorting completes
function enableSizeSlider() {
    document.querySelector("#arr_sz").disabled = false;
}

// Disable newArray button during sorting
function disableNewArrayBtn() {
    document.querySelector(".newArray").disabled = true;
}

// Enable newArray button after sorting completes
function enableNewArrayBtn() {
    document.querySelector(".newArray").disabled = false;
}

// Wait function for async sorting animations, respects `isSorting` to allow immediate stop
function waitforme(milisec) { 
    return new Promise(resolve => { 
        setTimeout(() => { 
            if (!isSorting) resolve('stopped'); // stop waiting if sorting is false
            else resolve('');
        }, milisec); 
    }) 
}

// Selecting size slider and setting event listener for changing array size
let arraySize = document.querySelector('#arr_sz');
arraySize.addEventListener('input', function() {
    createNewArray(parseInt(arraySize.value));
});

// Default delay for sorting animation
let delay = 260;

// Selecting speed slider and setting event listener for adjusting delay
let delayElement = document.querySelector('#speed_input');
delayElement.addEventListener('input', function() {
    delay = 320 - parseInt(delayElement.value);
});

// Array to store generated numbers
let array = [];

// Function to create a new array of random numbers
function createNewArray(noOfBars = 60) {
    deleteChild(); // Clear existing bars
    array = [];
    for (let i = 0; i < noOfBars; i++) {
        array.push(Math.floor(Math.random() * 250) + 1);
    }

    const bars = document.querySelector("#bars");
    for (let i = 0; i < noOfBars; i++) {
        const bar = document.createElement("div");
        bar.style.height = `${array[i] * 2}px`;
        bar.classList.add("bar");
        bar.classList.add("flex-item");
        bar.classList.add(`barNo${i}`);
        bars.appendChild(bar);
    }
}

// Function to delete all bars (used when creating a new array)
function deleteChild() {
    const bars = document.querySelector("#bars");
    bars.innerHTML = '';
}

// New array button event listener to generate a fresh array
const newArrayButton = document.querySelector(".newArray");
newArrayButton.addEventListener("click", function() {
    enableSortingBtn();
    enableSizeSlider();
    createNewArray(arraySize.value);
});

// Reset function to clear current sorting and regenerate the array
function resetArray() {
    isSorting = false;         // Stop any ongoing sorting
    enableSortingBtn();        // Enable all sorting buttons
    enableSizeSlider();        // Enable size slider
    enableNewArrayBtn();       // Enable New Array button
    createNewArray(arraySize.value);  // Regenerate the array based on the current size slider
}

// Reset button event listener
const resetButton = document.querySelector(".resetArray");
resetButton.addEventListener("click", function() {
    resetArray();
});

// Initial call to generate bars on page load
createNewArray();
