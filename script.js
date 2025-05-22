// Game state
let heartVitality = 0;
let currentScene = 0;
let selectedChoiceElement = null; // To keep track of the currently selected choice button

// Audio elements
const backgroundMusic = document.getElementById('background-music');
const clickSound = document.getElementById('click-sound');

// Adjust initial volume for background music
backgroundMusic.volume = 0.3; // Example: Set to 30% volume
clickSound.volume = 0.7; // Example: Set click sound to 70% volume

// Heart images mapping (your existing mapping)
const heartImages = {
    '-100': { src: './images/completelyBrokenHeart_-100.png', alt: 'Completely Broken Heart' },
    '-90': { src: './images/severelyBrokenHeart_-90.png', alt: 'Severely Broken Heart' },
    '-80': { src: './images/heavilyCrackedHeart_-80.png', alt: 'Heavily Cracked Heart' },
    '-70': { src: './images/crackedHeartwithHoles_-70.png', alt: 'Cracked Heart with Holes' },
    '-60': { src: './images/crackedHeartwithLargeHole_-60.png', alt: 'Cracked Heart with Large Hole' },
    '-50': { src: './images/halfBrokenHeart_-50.png', alt: 'Half Broken Heart' },
    '-40': { src: './images/crackedHeartwithGaps_-40.png', alt: 'Cracked Heart with Gaps' },
    '-30': { src: './images/crackedHeartwithHole_-30.png', alt: 'Cracked Heart with Hole' },
    '-20': { src: './images/slightlyCrackedHeartwithHole_-20.png', alt: 'Slightly Cracked with Hole' },
    '-10': { src: './images/slightlyCrackedHeart_-10.png', alt: 'Slightly Cracked Heart' },
    '0': { src: './images/neutralHeart_0.png', alt: 'Neutral Heart' },
    '10': { src: './images/slightlyHealedHeart_10.png', alt: 'Slightly Healed Heart' },
    '20': { src: './images/partiallyHealedHeart_20.png', alt: 'Partially Healed Heart' },
    '30': { src: './images/healingHeart_30.png', alt: 'Healing Heart' },
    '40': { src: './images/moderatelyHealedHeart_40.png', alt: 'Moderately Healed Heart' },
    '50': { src: './images/halfHealedHeart_50.png', alt: 'Half Healed Heart' },
    '60': { src: './images/mostlyHealedHeart_60.png', alt: 'Mostly Healed Heart' },
    '70': { src: "./images/nearlyHealedHeart_70.png", alt: 'Nearly Healed Heart' },
    '80': { src: "./images/almostHealedHeart_80.png", alt: 'Almost Healthy Heart' },
    '90': { src: './images/fullyHealedHeart_100.png', alt: 'Very Healthy Heart' },
    '100': { src: './images/fullyHealedHeart_100.png', alt: 'Fully Healthy Heart' }
};

// Scenes data (your existing scenes array)
const scenes = [
    { //1 : Home
        text: "You had a decent sleep last night but you still feel tired. Your parents are talking about moving to another house because the landlord raised the rent. Your father asked you about your academics. They are also considering moving you to you to a public school because of “how mediocre” your grades are. You can’t be bothered, the only thing that worries you is leaving behind your only friend. You reply-",
        choices: {
            a: { text: "You agree to move to public school next year. It’s not like you have a choice. You understand the financial situation of your family so it’s a logical decision.", vitalityChange: -10 },
            b: { text: "You refuse for the meantime. You tell them that you need to talk to your friend first and inform them. As much as possible, you want to go to the same college your friend will go to. You understand that it is selfish but you prioritize your mental state. There’s no point going into college when you’re even barely keeping it together", vitalityChange: 10 }
        }
    },
    { //2 : Classroom
        text: "It is this class again. Any subject involving social science has always been your least favorite for some reason. Your teacher is asking the class why most of the Gen Z students are more prone to self harm. One student answers- it is because they don’t have enough faith in Jesus Christ and they need to go to church. You’re considering adding your thoughts about it.",
        choices: {
            a: { text: "Don’t speak. You don’t want to spark an argument. People are allowed to have their opinion even if you disagree with it.", vitalityChange: -10 },
            b: { text: "Speak up. Explain that people’s circumstances are unique and what might work for you might not work for others. It is important to have an open mind and consider the background of the person first before implying your judgement.", vitalityChange: 10 }
        }
    },
    { //3 : Canteen
        text: "You are eating lunch with your friend. They expressed their thoughts about the previous class and commended you for speaking up. Your friend told you that even though their family is deeply religious- they barely talked with each other and wished that they had bonded more as a family rather than keeping a “perfect” image based on the society’s superficial standard.",
        choices: {
            a: { text: "You agree. You won’t ask for more information about your friend’s current situation. They seem to be uncomfortable sharing these types of information about their family so you won’t press on it too much.", vitalityChange: -10 },
            b: { text: "You agree. You try to ask more questions about your friend’s situation. You offer them a lending ear in case that they want to vent- you will listen without judgement.", vitalityChange: 10 }
        }
    },
    {// 4 : Terminal
        text: "It is very crowded on the bus but you are used to it. You wish you have a private car so you and your friend didn't have to deal with the hassle of commuting. You think about-",
        choices: {
            a: { text: "Let it be. It is what it is and it’s not like your family can afford a car overnight. Deal with it and move on.", vitalityChange: -10 },
            b: { text: "Be frustrated. The government should be doing something to address the issue. You understand that you can’t do anything about it but you also think that your sentiment is valid and there is nothing wrong with expressing what you feel.", vitalityChange: 10 }
        }
    },
    {// 5 : Dinner Table
        text: "You are eating dinner with your parents. The dinner table is very silent and it's not like there’s anything to talk about. Your parents only ever talk to you if they have a problem otherwise your family is just coexisting. You understand that no family is perfect and growing up, basic needs are never a problem. Everything was provided to you but you know deep inside that something important is missing.",
        choices: {
            a: { text: "Dismiss your feelings. Just be grateful that you don’t ever have to worry about shelter, food and education. Some kids have it worse than you do.", vitalityChange: -10 },
            b: { text: "Assure yourself. Acknowledge that your parents are a good provider but you are also deprived of emotional support growing up. You understand that there are a lot of factors affecting your family dynamics and the first step into healing is being aware of your own wounds.", vitalityChange: 10 }
        }
    },
    { // 6 : Bedroom
        text: "You are dreaming. It is 3:30 pm in the afternoon and you are having a picnic with your family. Your mother is talking about her day and your father is attentively listening. You noticed that your father is wearing the bracelet beads that you and your mother made. Then you woke up.",
        choices: {
            a: { text: "Prepare for school. You will not eat breakfast and will leave earlier than usual to avoid your parents.", vitalityChange: -10 },
            b: { text: "Prepare for school. You are back to reality and it’s fine, you had a glimpse of what your family would look like if you were happy. You say goodbye to your mother and thank her for the breakfast.", vitalityChange: 10 }
        }
    },
    { // 7 : Corridor
        text: "You are walking along the corridor to your classroom. You saw your friend sitting next to an acquaintance. You-",
        choices: {
            a: { text: "Ignore them. They were busy talking to each other and didn’t want to bother them.", vitalityChange: -10 },
            b: { text: "Say hi. Catch their attention and say hi. You see both of them smile and wave back at you.", vitalityChange: 10 }
        }
    },
    { // 8 : Mall
        text: "You went to the mall with your friend to buy some school supplies needed for a project. Your friend notices that you are extra silent today. They ask about your day and if there is a problem. You-",
        choices: {
            a: { text: "Lie. Tell them you are fine and it’s okay. You just feel a bit tired because you were not able to get a good night's sleep.", vitalityChange: -10 },
            b: { text: "Be honest. Tell them that you feel sad about your dream. You wish things were different. Your friend comforts you and is grateful to you for being vulnerable with them.", vitalityChange: 10 }
        }
    },
    { //9 : Your Room
        text: "You went home and the house was surprisingly quiet. You went straight to your room and laid back on your bed. You think-",
        choices: {
            a: { text: "You remember the dream and wish you could experience it again.", vitalityChange: -10 },
            b: { text: "You remember the dream and understand that the first step to healing is acceptance.", vitalityChange: 10 }
        }
    },
    { //10 : The Salas
        text: "You went home from the grocery store. You notice that your child has arrived from school because you saw their shoes neatly inserted into the shoe rack. You have always loved how tidy your kid is but always fails to express it. Today you decided-",
        choices: {
            a: { text: "Stick with the usual routine. This is the way your parents taught you discipline - never show affection as it is a sign of weakness or can be a tool for others to manipulate. You feel that your child should learn it early on.", vitalityChange: -10 },
            b: { text: "Be open. Tell your child that you are proud of them regardless of what they achieve in life and that you have always admired how tidy they are with their things and how independent they are. You tell your child you love them.", vitalityChange: 10 }
        }
    }
];

// Update heart image based on vitality
function updateHeartImage() {
    const heartImage = document.getElementById('heart-image');
    const clampedVitality = Math.max(-100, Math.min(100, heartVitality));
    const roundedVitality = Math.round(clampedVitality / 10) * 10;
    const image = heartImages[roundedVitality.toString()];

    if (image) {
        heartImage.src = image.src;
        heartImage.alt = image.alt;
    } else {
        console.warn(`No image found for vitality: ${heartVitality}, rounded: ${roundedVitality}`);
        heartImage.src = './images/neutralHeart_0.png';
        heartImage.alt = 'Default Heart';
    }
}

// Update UI for the current scene
function updateScene() {
    const sceneText = document.getElementById('scene-text');
    const choiceA = document.getElementById('choice-a');
    const choiceB = document.getElementById('choice-b');
    const choicesContainer = document.getElementById('choices');
    const gameContent = document.getElementById('game-content');
    const mentalHealthResources = document.getElementById('mental-health-resources');
    const endingMessage = document.getElementById('ending-message');

    // Remove highlight from previously selected choice
    if (selectedChoiceElement) {
        selectedChoiceElement.classList.remove('selected-choice');
        selectedChoiceElement = null; // Reset the tracker
    }

    if (currentScene >= scenes.length) {
        // Game over, show ending and resources
        gameContent.style.display = 'none'; // Hide game content
        mentalHealthResources.style.display = 'block'; // Show resources section

        if (heartVitality >= 0) {
            endingMessage.textContent = 'Your heart ended up healthy. Good job! You have learned to accept your feelings and be open about it.';
        } else {
            endingMessage.textContent = 'Your heart needs more time to heal.';
        }
        return;
    }



    const scene = scenes[currentScene];
    sceneText.textContent = scene.text;
    choiceA.textContent = scene.choices.a.text;
    choiceB.textContent = scene.choices.b.text;
    updateHeartImage();
}

// Function to play click sound
function playClickSound() {
    clickSound.currentTime = 0; // Rewind to start in case it's still playing
    clickSound.play().catch(e => console.error("Error playing click sound:", e));
}

// Handle choice selection
function makeChoice(chosenElement, vitalityChange) {
    playClickSound(); // Play sound on choice

    // Apply highlight to the chosen element
    chosenElement.classList.add('selected-choice');
    selectedChoiceElement = chosenElement; // Store the current selected element

    heartVitality += vitalityChange;
    heartVitality = Math.max(-100, Math.min(100, heartVitality)); // Clamp between -100 and 100

    // Set a delay before loading the next scene to allow highlight to be seen
    setTimeout(() => {
        currentScene++;
        updateScene();
    }, 1500); // Adjust delay (in milliseconds) as needed
}

// NEW: Function to restart the game
function restartGame() {
    // Reset game state
    heartVitality = 0;
    currentScene = 0;
    selectedChoiceElement = null;

    // Hide resources section, show landing page
    document.getElementById('mental-health-resources').style.display = 'none';
    document.getElementById('landing-page').style.display = 'flex'; // Or 'block' depending on its default styling

    // Ensure game content is hidden
    document.getElementById('game-content').style.display = 'none';

    // Reset initial heart image
    updateHeartImage();

    // Optionally stop and restart music if desired, or just let it loop
    // backgroundMusic.currentTime = 0;
    // backgroundMusic.play().catch(e => console.warn("Music restart prevented.", e));
}


// Initialize game
document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.getElementById('play-button');
    const landingPage = document.getElementById('landing-page');
    const gameContent = document.getElementById('game-content');
    const choiceA = document.getElementById('choice-a');
    const choiceB = document.getElementById('choice-b');
    const restartButton = document.getElementById('restart-button'); // Get restart button

    // Try to play background music immediately on page load
    backgroundMusic.play().catch(e => console.warn("Background music autoplay prevented. It will start on user interaction (Play Button).", e));

    // Event listener for the Play button
    playButton.addEventListener('click', () => {
        backgroundMusic.play().catch(e => console.error("Error playing background music on Play button click:", e));
        playClickSound(); // Play click sound for the "Start Journey" button

        landingPage.style.display = 'none'; // Hide the landing page
        gameContent.style.display = 'block'; // Show the game content
        updateScene(); // Initialize the first game scene
    });

    // Pass the clicked element to makeChoice
    choiceA.addEventListener('click', (event) => makeChoice(event.currentTarget, scenes[currentScene].choices.a.vitalityChange));
    choiceB.addEventListener('click', (event) => makeChoice(event.currentTarget, scenes[currentScene].choices.b.vitalityChange));

    // NEW: Add event listener for the restart button
    restartButton.addEventListener('click', () => {
        playClickSound(); // Play click sound on restart
        restartGame();
    });


    // Initially, update the heart image based on starting vitality (0)
    updateHeartImage();
});