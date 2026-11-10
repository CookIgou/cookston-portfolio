
const graphicImage = document.getElementById("graphic-preview-image");
const graphicModal = document.getElementById("graphic-modal");
const graphicClose = document.getElementById("graphic-modal-close");

function openGraphicModal() {
    graphicModal.hidden = false;
    graphicClose.focus();
}

function closeGraphicModal() {
    graphicModal.hidden = true;
    graphicImage.focus();
}

// Open when image is clicked
graphicImage.addEventListener("click", openGraphicModal);

// Keyboard accessibility
graphicImage.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openGraphicModal();
    }
});

// Close using X button
graphicClose.addEventListener("click", closeGraphicModal);

// Close by clicking outside image
graphicModal.addEventListener("click", (event) => {
    if (event.target === graphicModal) {
        closeGraphicModal();
    }
});

// Close using Escape key
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !graphicModal.hidden) {
        closeGraphicModal();
    }
});
