const AVATAR_ASSETS = {
    default: "img/SJDefault.png",
    idea: "img/SJClicked.png",
    audio: "audio/SJPronounciation.mp3"
};

function initAvatarHomeButton() {
    const wrappers = document.querySelectorAll(".avatar-home-button");

    wrappers.forEach((wrapper) => {
        const defaultImage = wrapper.querySelector(".avatar-image-default");
        const hoverImage = wrapper.querySelector(".avatar-image-hover");
        const pronounceButton = wrapper.querySelector(".pronounce-button");

        if (defaultImage) {
            defaultImage.src = AVATAR_ASSETS.default;
        }

        if (hoverImage) {
            hoverImage.src = AVATAR_ASSETS.idea;
        }

        if (pronounceButton) {
            pronounceButton.addEventListener("click", async (event) => {
                event.preventDefault();
                event.stopPropagation();

                try {
                    const audio = new Audio(AVATAR_ASSETS.audio);
                    await audio.play();
                } catch (error) {
                    console.warn("Name pronunciation audio could not be played.", error);
                }
            });
        }
    });
}

function initLanguageToggle() {
    const toggle = document.querySelector(".language-toggle");

    if (!toggle) {
        return;
    }

    toggle.addEventListener("click", () => {
        const nextLanguage = toggle.dataset.language === "en" ? "ko" : "en";
        toggle.dataset.language = nextLanguage;
        toggle.textContent = nextLanguage === "en" ? "EN" : "한글";

        const englishContent = document.getElementById("content-en");
        const koreanContent = document.getElementById("content-ko");

        if (englishContent && koreanContent) {
            englishContent.style.display = nextLanguage === "en" ? "block" : "none";
            koreanContent.style.display = nextLanguage === "ko" ? "block" : "none";
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initAvatarHomeButton();
    initLanguageToggle();
});
