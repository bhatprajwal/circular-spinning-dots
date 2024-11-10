let timerInterval;
let startTime;

// Define colors and rotation angles for each dot
const colors = ["violet", "indigo", "blue", "green", "yellow", "orange", "red"];
const numDots = colors.length; // Total number of dots
const radius = 60;  // Radius of the circle the dots are arranged in
const dotSize = 15; // Diameter of each dot

// Function to create dots and spinner dynamically
function createSpinner() {
    const spinner = document.getElementById('spinner');

    // Loop over the colors array to create the dots dynamically
    for (let i = 0; i < numDots; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.style.position = 'absolute';
        dot.style.width = `${dotSize}px`;
        dot.style.height = `${dotSize}px`;
        dot.style.borderRadius = '50%';
        dot.style.backgroundColor = colors[i];
        
        // Calculate the angle for each dot
        const angle = (i * 360) / numDots;  // Evenly space the dots around the circle
        
        // Position each dot around the circle using trigonometry
        const x = radius * Math.cos(angle * Math.PI / 180); // X position
        const y = radius * Math.sin(angle * Math.PI / 180); // Y position
        
        dot.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
        
        // Append the dot to the spinner container
        spinner.appendChild(dot);
    }
}

// Function to start the spinner and timer
function startSpinner(duration) {
    const overlay = document.getElementById("overlay");
    const timer = document.getElementById("timer");

    overlay.style.visibility = "visible"; // Show overlay
    startTime = new Date(); // Set start time

    // Clear previous timer if any
    clearInterval(timerInterval);

    // Update timer every second
    timerInterval = setInterval(() => {
        const elapsedTime = new Date() - startTime;
        const hours = String(Math.floor(elapsedTime / (1000 * 60 * 60))).padStart(2, '0');
        const minutes = String(Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
        const seconds = String(Math.floor((elapsedTime % (1000 * 60)) / 1000)).padStart(2, '0');
        timer.textContent = `${hours}:${minutes}:${seconds}`;
    }, 1000);

    // Automatically stop spinner after specified duration
    setTimeout(stopSpinner, duration);
}

// Function to stop the spinner and timer
function stopSpinner() {
    const overlay = document.getElementById("overlay");

    overlay.style.visibility = "hidden"; // Hide overlay
    clearInterval(timerInterval); // Clear timer
}
  
// Add the code where you feels to call the spinner
function spinner() {
    createSpinner();  // Create the spinner and its contents dynamically
    startSpinner(10000); // Set spinner duration in milliseconds (e.g., 10000ms for 10 seconds)
}

// Automatically start the spinner when the page loads
window.onload = () => {
    spinner();
};
