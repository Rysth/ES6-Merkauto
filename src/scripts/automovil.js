import html2canvas from 'html2canvas';
import Automovil from '../assets/images/auto.png';

const autoImage = document.querySelector('#auto-image');
autoImage.src = Automovil;

// Array to store created circles
const createdCircles = [];

// Get the "Undo" button element by its ID
const undoButton = document.getElementById('undoButton');

// Add a click event listener to the "Undo" button
undoButton.addEventListener('click', undoLastCircle);

// Function to undo the last created circle
function undoLastCircle() {
  if (createdCircles.length > 0) {
    const lastCircle = createdCircles.pop(); // Remove the last circle from the array
    const auto = document.querySelector('.auto');
    auto.removeChild(lastCircle); // Remove the circle from the container
  }
}

// Function to prevent the default behavior for dragover
function allowDrop(event) {
  event.preventDefault();
}

// Function to handle the drag start event
function dragStart(event) {
  const circle = event.target;
  initialX = event.clientX - circle.getBoundingClientRect().left;
  initialY = event.clientY - circle.getBoundingClientRect().top;
  event.dataTransfer.setData('text', circle.dataset.status);
}

// Function to handle the drag over event
function dragOver(event) {
  event.preventDefault();
}

// Function to handle the drop event
function drop(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData('text');
  const originalCircle = document.querySelector(
    `.status-circle[data-status="${data}"]`,
  );
  if (originalCircle) {
    const auto = document.querySelector('.auto');
    const rect = auto.getBoundingClientRect();
    const x = event.clientX - rect.left - initialX;
    const y = event.clientY - rect.top - initialY;

    // Clone the original circle
    const newCircle = originalCircle.cloneNode(true);

    // Calculate the new position within the boundaries of .auto
    const maxX = rect.width - newCircle.offsetWidth;
    const maxY = rect.height - newCircle.offsetHeight;

    // Ensure the new position stays within the boundaries
    const newX = Math.min(Math.max(0, x), maxX);
    const newY = Math.min(Math.max(0, y), maxY);

    // Set the position for the new circle
    newCircle.classList.add('placed');
    newCircle.style.left = `${newX}px`;
    newCircle.style.top = `${newY}px`;

    // Make the new circle draggable
    newCircle.addEventListener('mousedown', startDrag);
    newCircle.addEventListener('touchstart', startDragTouch, { passive: true });

    // Append the new circle to the container
    newCircle.ondragstart = moveActualCircle;
    auto.appendChild(newCircle);

    // Add the newly created circle to the array
    createdCircles.push(newCircle);
  }
}

// Function to move the actual circle
function moveActualCircle(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData('text');
  const originalCircle = document.querySelector(
    `.status-circle.placed[data-status="${data}"]`,
  );
  if (originalCircle) {
    const auto = document.querySelector('.auto');
    const rect = auto.getBoundingClientRect();
    const x = event.clientX - rect.left - initialX;
    const y = event.clientY - rect.top - initialY;

    // Clone the original circle
    const newCircle = originalCircle.cloneNode(true);

    // Calculate the new position within the boundaries of .auto
    const maxX = rect.width - newCircle.offsetWidth;
    const maxY = rect.height - newCircle.offsetHeight;

    // Ensure the new position stays within the boundaries
    const newX = Math.min(Math.max(0, x), maxX);
    const newY = Math.min(Math.max(0, y), maxY);

    // Set the position for the new circle
    newCircle.classList.add('placed');
    newCircle.style.left = `${newX}px`;
    newCircle.style.top = `${newY}px`;

    // Make the new circle draggable
    newCircle.addEventListener('mousedown', startDrag);
    newCircle.addEventListener('touchstart', startDragTouch, { passive: true });

    // Append the new circle to the container
    auto.removeChild(originalCircle); // Remove the existing circle
    auto.appendChild(newCircle);
  }
}

// Variables to store initial values
let initialX;
let initialY;
let activeCircle = null;
let offsetX;
let offsetY;

// Function to start dragging
function startDrag(event) {
  activeCircle = event.target;
  offsetX = event.clientX - activeCircle.getBoundingClientRect().left;
  offsetY = event.clientY - activeCircle.getBoundingClientRect().top;

  document.addEventListener('mousemove', dragCircle);
  document.addEventListener('mouseup', stopDrag);

  // Add class to the active circle to prevent scrolling
  activeCircle.classList.add('prevent-scroll');
}

// Function to start dragging on touch devices
function startDragTouch(event) {
  activeCircle = event.target;
  const touch = event.touches[0];
  offsetX = touch.clientX - activeCircle.getBoundingClientRect().left;
  offsetY = touch.clientY - activeCircle.getBoundingClientRect().top;

  document.addEventListener('touchmove', dragCircleTouch);
  document.addEventListener('touchend', stopDragTouch);

  // Add class to the active circle to prevent scrolling
  activeCircle.classList.add('prevent-scroll');
}

// Function to drag the circle
function dragCircle(event) {
  if (!activeCircle) return;

  const auto = document.querySelector('.auto');
  const rect = auto.getBoundingClientRect();
  const x = event.clientX - rect.left - offsetX;
  const y = event.clientY - rect.top - offsetY;

  const maxX = rect.width - activeCircle.offsetWidth;
  const maxY = rect.height - activeCircle.offsetHeight;

  const newX = Math.min(Math.max(0, x), maxX);
  const newY = Math.min(Math.max(0, y), maxY);

  activeCircle.style.left = `${newX}px`;
  activeCircle.style.top = `${newY}px`;
}

// Function to drag the circle on touch devices
function dragCircleTouch(event) {
  if (!activeCircle) return;

  const auto = document.querySelector('.auto');
  const rect = auto.getBoundingClientRect();
  const touch = event.touches[0];
  const x = touch.clientX - rect.left - offsetX;
  const y = touch.clientY - rect.top - offsetY;

  const maxX = rect.width - activeCircle.offsetWidth;
  const maxY = rect.height - activeCircle.offsetHeight;

  const newX = Math.min(Math.max(0, x), maxX);
  const newY = Math.min(Math.max(0, y), maxY);

  activeCircle.style.left = `${newX}px`;
  activeCircle.style.top = `${newY}px`;
}

// Function to stop dragging
function stopDrag() {
  activeCircle = null;
  document.removeEventListener('mousemove', dragCircle);
  document.removeEventListener('mouseup', stopDrag);

  // Remove the prevent-scroll class from the active circle
  if (activeCircle) {
    activeCircle.classList.remove('prevent-scroll');
  }
}

// Function to stop dragging on touch devices
function stopDragTouch() {
  activeCircle = null;
  document.removeEventListener('touchmove', dragCircleTouch);
  document.removeEventListener('touchend', stopDragTouch);

  // Remove the prevent-scroll class from the active circle
  if (activeCircle) {
    activeCircle.classList.remove('prevent-scroll');
  }
}

// Check if the device is mobile
const isMobileDevice = window.innerWidth < 768;

// Add event listeners to make the circles draggable on both desktop and mobile
document.querySelectorAll('.status-circle[data-status]').forEach((circle) => {
  circle.addEventListener('mousedown', startDrag);
  circle.addEventListener('touchstart', startDragTouch, { passive: true });

  if (isMobileDevice) {
    circle.addEventListener('click', createNewCircleInside);
  }
});

// Function to create a new circle inside another circle
function createNewCircleInside(event) {
  if (isMobileDevice) {
    const originalCircle = event.target;
    const auto = document.querySelector('.auto');

    // Create a new circle element
    const newCircle = originalCircle.cloneNode(true);

    // Set a default size and position inside the original circle
    newCircle.classList.add('placed');
    newCircle.style.left = '20px'; // Adjust the initial position as needed
    newCircle.style.top = '20px';

    // Make the new circle draggable
    newCircle.addEventListener('mousedown', startDrag);
    newCircle.addEventListener('touchstart', startDragTouch, { passive: true });

    // Append the new circle inside the original circle
    newCircle.ondragstart = moveActualCircle;
    auto.appendChild(newCircle);

    // Add the newly created circle to the array
    createdCircles.push(newCircle);
  }
}

autoImage.addEventListener('dragover', (event) => dragOver(event));
autoImage.addEventListener('drop', (event) => drop(event));

const statusCircles = document.querySelectorAll('.status-circle');
statusCircles.forEach((element) => {
  element.addEventListener('dragstart', (event) => dragStart(event));
});

/* Download Functionality */

const downloadButton = document.querySelector('#downloadButton');
downloadButton.addEventListener('click', downloadImage);

function downloadImage() {
  const container = document.getElementById('auto-picture');
  // Scroll the container to the bottom
  container.scrollTop = container.scrollHeight;

  // Use html2canvas to capture the HTML element
  html2canvas(container, { scale: 2 }).then((canvas) => {
    const imageDataURL = canvas.toDataURL('image/png');

    // Create a link for downloading the image
    const a = document.createElement('a');
    a.href = imageDataURL;
    a.download = 'image.png'; // Set a default filename
    a.click();
  });
}
