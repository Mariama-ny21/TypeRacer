// Sample texts for each difficulty level
const sampleTexts = {
    easy: [
        "The quick brown fox jumps over the lazy dog.",
        "Typing is a useful skill for everyone.",
        "Cats and dogs are common household pets."
    ],
    medium: [
        "Learning to type quickly can improve your productivity at work.",
        "Practice makes perfect, especially when it comes to typing speed.",
        "Accurate typing is just as important as fast typing."
    ],
    hard: [
        "Sphinx of black quartz, judge my vow, as the wizard quickly mixed the bubbling potion.",
        "The five boxing wizards jump quickly, amazed by the dazzling spectacle before them.",
        "Jackdaws love my big sphinx of quartz, but vexing questions perplexed the judge."
    ]
};

// DOM elements
const difficulty = document.getElementById('difficultySelect');
const sampleTextDiv = document.getElementById('sampleText');
const startBtn = document.getElementById('startBtn');
const retryBtn = document.getElementById('retryBtn');
const resultTimeSpan = document.getElementById('resultTime');
const resultWpmSpan = document.getElementById('resultWpm');
const resultLevelSpan = document.getElementById('resultLevel');
const userInput = document.getElementById('userInput');

let startTime = null;
let endTime = null;
let timerRunning = false;
let currentSampleText = "";

// Get a random text based on difficulty
function getRandomText(difficultyLevel) {
    const texts = sampleTexts[difficultyLevel];
    const randomIndex = Math.floor(Math.random() * texts.length);
    return texts[randomIndex];
}

// Update the sample text and reset highlighting
function updateSampleText() {
    const selectedDifficulty = difficulty.value;
    const randomText = getRandomText(selectedDifficulty);
    currentSampleText = randomText;
    sampleTextDiv.textContent = randomText;
    highlightSampleText();
}

// Highlight sample text based on user input
function highlightSampleText() {
    const sampleText = currentSampleText;
    const userText = userInput.value;
    const sampleWords = sampleText.trim().split(/\s+/);
    const userWords = userText.trim().split(/\s+/);

    let highlighted = sampleWords.map((word, idx) => {
        if (userWords[idx] === undefined || userWords[idx] === "") {
            return `<span>${word}</span>`;
        } else if (userWords[idx] === word) {
            return `<span style="color: blue;">${word}</span>`;
        } else {
            return `<span style="color: red;">${word}</span>`;
        }
    });

    sampleTextDiv.innerHTML = highlighted.join(' ');
}

// Count correct words
function countCorrectWords(userInputText, sampleText) {
    const userWords = userInputText.trim().split(/\s+/);
    const sampleWords = sampleText.trim().split(/\s+/);
    let correctCount = 0;
    for (let i = 0; i < Math.min(userWords.length, sampleWords.length); i++) {
        if (userWords[i] === sampleWords[i]) {
            correctCount++;
        }
    }
    return correctCount;
}

// Initialize the test buttons and their states
function initializeTestButtons() {
    startBtn.disabled = true; // Start is not used
    retryBtn.disabled = true;
    userInput.disabled = false;

    retryBtn.addEventListener('click', handleRetryTest);
    userInput.addEventListener('input', handleUserInputStartTest);
    userInput.addEventListener('input', highlightSampleText);
    userInput.addEventListener('keydown', handleEnterKeyStopTest);
}

// Start the test when user starts typing
function handleUserInputStartTest() {
    if (!timerRunning && userInput.value.trim() !== "") {
        startTestOnTyping();
    }
}

function startTestOnTyping() {
    startBtn.disabled = true;
    retryBtn.disabled = true;
    userInput.disabled = false;
    startTime = performance.now();
    endTime = null;
    timerRunning = true;
    resultTimeSpan.textContent = '0s';
    resultWpmSpan.textContent = '0';
}

// Stop the test when Enter is pressed
function handleEnterKeyStopTest(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevents new line
        stopTestOnEnter();
    }
}

function stopTestOnEnter() {
    if (!timerRunning) return;
    endTime = performance.now();
    timerRunning = false;
    retryBtn.disabled = false; // Enable retry after test
    userInput.disabled = true;
    const elapsedSeconds = ((endTime - startTime) / 1000);
    resultTimeSpan.textContent = `${elapsedSeconds.toFixed(2)}s`;

    // Calculate WPM
    const userText = userInput.value;
    const correctWords = countCorrectWords(userText, currentSampleText);
    const wpm = elapsedSeconds > 0 ? Math.round((correctWords / elapsedSeconds) * 60) : 0;
    resultWpmSpan.textContent = wpm;

    // Display difficulty level
    resultLevelSpan.textContent = difficulty.options[difficulty.selectedIndex].text;
}

// Reset everything for a new test and get a new sample sentence of the same difficulty
function handleRetryTest() {
    const selectedDifficulty = difficulty.value;
    const newSampleText = getRandomText(selectedDifficulty);
    currentSampleText = newSampleText;
    sampleTextDiv.textContent = newSampleText;
    userInput.value = '';
    userInput.disabled = false;
    startBtn.disabled = true;
    retryBtn.disabled = true;
    timerRunning = false;
    resultTimeSpan.textContent = '0s';
    resultWpmSpan.textContent = '0';
    highlightSampleText();
}

// Only one DOMContentLoaded event!
document.addEventListener('DOMContentLoaded', () => {
    initializeTestButtons();
    updateSampleText();
    // Update sample text and reset test when difficulty changes
    difficulty.addEventListener('change', () => {
        updateSampleText();
        handleRetryTest();
    });
});