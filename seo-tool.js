// Get the input fields
const titleInput = document.getElementById("page-title");
const descriptionInput = document.getElementById("page-description");
const urlInput = document.getElementById("page-url");

//Get the error message elements
const urlError = document.getElementById("url-error");

// Get the preview elements
const urlPreview = document.getElementById("preview-url");
const titlePreview = document.getElementById("preview-title");
const descriptionPreview = document.getElementById("preview-description");

// Get the mobile preview elements
const mobileUrl = document.getElementById("mobile-url");
const mobileTitle = document.getElementById("mobile-title");
const mobileDescription = document.getElementById("mobile-description");

// Get the copy buttons
const copyTitleButton = document.getElementById("copy-title");
const copyDescriptionButton = document.getElementById("copy-description");
const copyUrlButton = document.getElementById("copy-url");
// Get the character counters
const titleCount = document.getElementById("title-count");
const descriptionCount = document.getElementById("description-count");

// Get the SEO score elements
const seoScore = document.getElementById("seo-score");
const scoreMessage = document.getElementById("score-message");
const seoSuggestions = document.getElementById("seo-suggestions");

// Update the title preview and counter
titleInput.addEventListener("input", function () {
    const length = titleInput.value.length;

    titlePreview.textContent = titleInput.value || "Your Page Title Will Appear Here";
    mobileTitle.textContent = titleInput.value || "Your Page Title Will Appear Here";
    titleCount.textContent = length;

    if (length > 60) {
        titleCount.style.color = "#ff5c5c";
    } else if (length > 50) {
        titleCount.style.color = "#f0c34e";
    } else {
        titleCount.style.color = "#4ade80";
    }
});

// Update the description preview and counter
descriptionInput.addEventListener("input", function () {
    const length = descriptionInput.value.length;

    descriptionPreview.textContent = descriptionInput.value || "Your meta description will appear here when you enter it above.";
    mobileDescription.textContent = descriptionInput.value || "Your meta description will appear here when you enter it above.";
    descriptionCount.textContent = length;

    if (length > 160) {
        descriptionCount.style.color = "#ff5c5c";
    } else if (length > 150) {
        descriptionCount.style.color = "#f0c34e";
    } else {
        descriptionCount.style.color = "#4ade80";
    }
});

// Clear all fields and reset the preview
const clearButton = document.getElementById("clear-button");

clearButton.addEventListener("click", function () {
    titleInput.value = "";
    descriptionInput.value = "";
    urlInput.value = "";
    urlPreview.textContent = "www.example.com";
    titlePreview.textContent = "Your Page Title Will Appear Here";
    descriptionPreview.textContent = "Your meta description will appear here when you enter it above.";

    mobileUrl.textContent = "www.example.com";
    mobileTitle.textContent = "Your Page Title Will Appear Here";
    mobileDescription.textContent = "Your meta description will appear here when you enter it above.";

    titleCount.textContent = "0";
    descriptionCount.textContent = "0";

    titleCount.style.color = "";
    descriptionCount.style.color = "";
});
// Update and validate the website URL
urlInput.addEventListener("input", function () {
    let url = urlInput.value.trim();

    if (url === "") {
        urlPreview.textContent = "www.example.com";
        mobileUrl.textContent = "www.example.com";
        urlError.textContent = "";
        return;
    }

    let testUrl = url;

    if (!/^https?:\/\//i.test(testUrl)) {
        testUrl = "https://" + testUrl;
    }

    try {
        const parsedUrl = new URL(testUrl);

        if (!parsedUrl.hostname.includes(".")) {
            throw new Error("Invalid website address");
        }

        url = parsedUrl.hostname + parsedUrl.pathname;

        urlPreview.textContent = url;
        mobileUrl.textContent = url;
        urlError.textContent = "";

    } catch (error) {
        urlError.textContent = "Please enter a valid website URL.";

        urlPreview.textContent = "Invalid URL";
        mobileUrl.textContent = "Invalid URL";
    }
});
// Calculate the SEO score
function calculateSEOScore() {

    let score = 0;
    let suggestions = [];

    // Check page title
    let titleLength = titleInput.value.trim().length;

    if (titleLength >= 20 && titleLength <= 60) {
        score += 40;
    } else if (titleLength < 20) {
        suggestions.push("Your page title is too short. Aim for at least 20 characters.");
    } else {
        suggestions.push("Your page title is too long. Aim for 60 characters or fewer.");
    }

    // Check meta description
    let descriptionLength = descriptionInput.value.trim().length;

    if (descriptionLength >= 120 && descriptionLength <= 160) {
        score += 40;
    } else if (descriptionLength < 120) {
        suggestions.push("Your meta description is too short. Aim for at least 120 characters.");
    } else {
        suggestions.push("Your meta description is too long. Aim for 160 characters or fewer.");
    }

    // Check website URL
    if (urlInput.value.trim() !== "") {
        score += 20;
    } else {
        suggestions.push("Enter your website URL.");
    }

    // Display the score
    seoScore.textContent = score;

    // Change score color
    seoScore.classList.remove("score-low", "score-medium", "score-high");

    if (score < 60) {
        seoScore.classList.add("score-low");
    } else if (score < 80) {
        seoScore.classList.add("score-medium");
    } else {
        seoScore.classList.add("score-high");
    }

    // Display improvement suggestions
    seoSuggestions.innerHTML = "";

    suggestions.forEach(function (suggestion) {
        let item = document.createElement("li");
        item.textContent = suggestion;
        seoSuggestions.appendChild(item);
    });

    // Display a message
    if (score === 100) {
        scoreMessage.textContent = "Great! Your basic SEO information looks good.";
    } else if (score >= 60) {
        scoreMessage.textContent = "Good start! There are a few things you can improve.";
    } else {
        scoreMessage.textContent = "Add your page information to improve your SEO score.";
    }
}
// Update SEO score when inputs change
titleInput.addEventListener("input", calculateSEOScore);
descriptionInput.addEventListener("input", calculateSEOScore);
urlInput.addEventListener("input", calculateSEOScore);

// Calculate initial score
calculateSEOScore();

// Copy page title
copyTitleButton.addEventListener("click", function () {
    navigator.clipboard.writeText(titleInput.value);
});

// Copy meta description
copyDescriptionButton.addEventListener("click", function () {
    navigator.clipboard.writeText(descriptionInput.value);
});

// Check website URL
if (urlInput.value.trim() === "") {
    suggestions.push("Enter your website URL.");
} else if (urlPreview.textContent !== "Invalid URL") {
    score += 20;
} else {
    suggestions.push("Enter a valid website URL.");
}