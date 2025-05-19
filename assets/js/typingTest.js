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

// Function to get a random text based on difficulty
function getRandomText(difficulty) {
    const texts = sampleTexts[difficulty];
    const randomIndex = Math.floor(Math.random() * texts.length);
    return texts[randomIndex];
}

// DOM elements
const difficultySelect = document.getElementById('difficultySelect');
const sampleTextDiv = document.getElementById('sampleText');

// Function to update the sample text
function updateSampleText() {
    const selectedDifficulty = difficultySelect.value;
    const randomText = getRandomText(selectedDifficulty);
    sampleTextDiv.textContent = randomText;
}

// Set initial sample text on page load
document.addEventListener('DOMContentLoaded', () => {
    updateSampleText();
});

// Update sample text when difficulty changes
difficultySelect.addEventListener('change', updateSampleText);