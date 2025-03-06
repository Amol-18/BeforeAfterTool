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
