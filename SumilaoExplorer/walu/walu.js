// Get Walu and the speech bubble elements
const walu = document.getElementById('walu');
const waluBubble = document.getElementById('walu-bubble');

// Array of messages for Walu to say
const waluMessages = [
    "Hi, I'm Walu! Let's explore Sumilao together!",
    "Discover the hidden gems of Sumilao right here!",
    "Looking for adventure? Let's explore the breathtaking landscapes of Sumilao!",
    "From majestic mountains to peaceful rivers, Sumilao has it all! Explore now!",
    "Don't miss out on exclusive guides to Sumilao’s best spots. Click 'Explore'!",
    "I'm here to guide you through Sumilao’s wonders! Let’s start our journey now!"
];

// Variable to track the current message index
let messageIndex = 0;

// Function to update the speech bubble content and make it visible
function updateWaluMessage() {
    // Update the speech bubble content with the current message
    waluBubble.textContent = waluMessages[messageIndex];

    // Increment the message index and reset if it reaches the end of the array
    messageIndex = (messageIndex + 1) % waluMessages.length;

    // Show the speech bubble
    waluBubble.style.display = 'block';

    // Hide the bubble after a few seconds
    setTimeout(() => {
        waluBubble.style.display = 'none';
    }, 3000); // Hide after 3 seconds
}

// Add event listener to Walu image to change message on click
walu.addEventListener('click', updateWaluMessage);

// Move Walu around randomly on the screen every few seconds
setInterval(() => {
    const waluWidth = 250;  // Walu's new width
    const waluHeight = 250; // Walu's new height

    const x = Math.random() * (window.innerWidth - waluWidth);
    const y = Math.random() * (window.innerHeight - waluHeight - 50); // 50px buffer for bottom padding

    walu.style.transform = `translate(${x}px, ${y}px)`;
}, 5000); // Move every 5 seconds

