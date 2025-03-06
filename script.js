const beforeImageInput = document.getElementById('before-image');
const afterImageInput = document.getElementById('after-image');
const canvas = document.getElementById('combined-canvas');
const downloadBtn = document.getElementById('download-btn');
const ctx = canvas.getContext('2d');

let beforeImage, afterImage;

// Function to load an image
function loadImage(file, callback) {
    const reader = new FileReader();
    reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
            callback(img);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

// Function to generate the combined image
function generateCombinedImage() {
    if (!beforeImage || !afterImage) return;

    const width = Math.max(beforeImage.width, afterImage.width);
    const height = beforeImage.height + afterImage.height;

    canvas.width = width;
    canvas.height = height;

    // Draw Before Image
    ctx.drawImage(beforeImage, 0, 0);
    ctx.font = "20px Poppins";
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeText("Before Image", 10, 30);
    ctx.fillText("Before Image", 10, 30);

    // Draw After Image
    ctx.drawImage(afterImage, 0, beforeImage.height);
    ctx.strokeText("After Image", 10, beforeImage.height + 30);
    ctx.fillText("After Image", 10, beforeImage.height + 30);

    // Show canvas and enable download button
    canvas.style.display = "block";
    downloadBtn.disabled = false;
}

// Function to handle image upload
beforeImageInput.addEventListener('change', (e) => {
    loadImage(e.target.files[0], (img) => {
        beforeImage = img;
        if (afterImage) generateCombinedImage();
    });
});

afterImageInput.addEventListener('change', (e) => {
    loadImage(e.target.files[0], (img) => {
        afterImage = img;
        if (beforeImage) generateCombinedImage();
    });
});

// Function to download the combined image
downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'before-after-comparison.png';
    link.href = canvas.toDataURL();
    link.click();
});
