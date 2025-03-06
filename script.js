// Function to handle image preview
function handleImagePreview(event, previewId) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const preview = document.getElementById(previewId);
            preview.src = e.target.result;
            preview.style.display = "block";
        };
        reader.readAsDataURL(file);
    }
}

// Event listeners for file inputs
document.getElementById('before-image').addEventListener('change', function (event) {
    handleImagePreview(event, 'before-preview');
});

document.getElementById('after-image').addEventListener('change', function (event) {
    handleImagePreview(event, 'after-preview');
});

// Slider functionality
const slider = document.querySelector('.slider');
const afterImage = document.getElementById('after-preview');
let isDragging = false;

slider.addEventListener('mousedown', () => {
    isDragging = true;
});

window.addEventListener('mouseup', () => {
    isDragging = false;
});

window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const containerRect = document.querySelector('.comparison-container').getBoundingClientRect();
    const offsetX = e.clientX - containerRect.left;
    const percentage = (offsetX / containerRect.width) * 100;

    if (percentage >= 0 && percentage <= 100) {
        afterImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
        slider.style.left = `${percentage}%`;
    }
});
