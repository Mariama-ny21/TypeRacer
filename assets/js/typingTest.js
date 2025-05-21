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
const stopBtn = document.getElementById('stopBtn');
const retryBtn = document.getElementById('retryBtn');
const resultTimeSpan = document.getElementById('resultTime');
const resultWpmSpan = document.getElementById('resultWpm');
const resultLevelSpan = document.getElementById('resultLevel');
const userInput = document.getElementById('userInput');

let startTime = null;
let endTime = null;
let timerRunning = false;

// Get a random text based on difficulty
function getRandomText(difficultyLevel) {
    const texts = sampleTexts[difficultyLevel];
    const randomIndex = Math.floor(Math.random() * texts.length);
    return texts[randomIndex];
}

// Update the sample text
function updateSampleText() {
    const selectedDifficulty = difficulty.value;
    const randomText = getRandomText(selectedDifficulty);
    sampleTextDiv.textContent = randomText;
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

// Button initialization and handlers
function initializeTestButtons() {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    retryBtn.disabled = true;
    userInput.disabled = true;

    startBtn.addEventListener('click', handleStartTest);
    stopBtn.addEventListener('click', handleStopTest);
    retryBtn.addEventListener('click', handleRetryTest);
}

function handleStartTest() {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    retryBtn.disabled = true;
    userInput.value = '';
    userInput.disabled = false;
    userInput.focus();
    startTime = performance.now();
    endTime = null;
    timerRunning = true;
    resultTimeSpan.textContent = '0s';
    resultWpmSpan.textContent = '0';
}

function handleStopTest() {
    if (!timerRunning) return;
    endTime = performance.now();
    timerRunning = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;
    retryBtn.disabled = false;
    userInput.disabled = true;
    const elapsedSeconds = ((endTime - startTime) / 1000);
    resultTimeSpan.textContent = `${elapsedSeconds.toFixed(2)}s`;

    // Calculate WPM
    const sampleText = sampleTextDiv.textContent;
    const userText = userInput.value;
    const correctWords = countCorrectWords(userText, sampleText);
    const wpm = elapsedSeconds > 0 ? Math.round((correctWords / elapsedSeconds) * 60) : 0;
    resultWpmSpan.textContent = wpm;

    // Display difficulty level
    resultLevelSpan.textContent = difficulty.options[difficulty.selectedIndex].text;
}

function handleRetryTest() {
    handleStartTest();
}

// Only one DOMContentLoaded event!
document.addEventListener('DOMContentLoaded', () => {
    initializeTestButtons();
    updateSampleText();
    // Update sample text when difficulty changes
    difficulty.addEventListener('change', updateSampleText);
});