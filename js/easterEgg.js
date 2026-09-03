(() => {
    const page = document.getElementById("dotsPage");

    if (!page || page.dataset.ready === "true") {
        return;
    }

    page.dataset.ready = "true";

    const stories = {
        stories: {
            meta: "01 · Stories",
            title: "It started with wanting to write worlds.",
            body: "I grew up obsessed with Harry Potter and wanted to become a children’s writer. Long before I knew anything about design or technology, I was already interested in how an imagined world could feel real to someone else.",
            why: "Story came first. The medium came later.",
            color: "#f2df69"
        },
        film: {
            meta: "02 · Film / video",
            title: "Then I realised stories could move.",
            body: "Making films and videos showed me that words were only one way to tell a story. Framing, pacing, sound and movement could carry meaning too — sometimes more directly than text.",
            why: "The same idea could become a completely different experience in a different medium.",
            color: "#91b8df"
        },
        illustration: {
            meta: "03 · Illustration / comics",
            title: "Then the story became visual in another way.",
            body: "Drawing and making comics gave me a faster, more personal way to turn ideas into something visible. It made me more aware of composition, visual language and how much a single image can communicate.",
            why: "I kept changing mediums, but I was still trying to make ideas tangible.",
            color: "#dba6bd"
        },
        next: {
            meta: "04 · The next medium",
            title: "What comes after the screen?",
            body: "After moving between writing, film and illustration, I started wondering what the next storytelling medium might be. VR felt like a natural answer: not another format to watch, but a space the audience could actually enter.",
            why: "That question is what pulled me toward immersive technology.",
            color: "#df9f68"
        },
        xr: {
            meta: "05 · XR engineering",
            title: "Story became space, behaviour and code.",
            body: "XR was where storytelling, interaction and engineering finally met for me. That curiosity became professional work at NoGhost, building immersive experiences across Unity, Unreal and emerging spatial platforms.",
            why: "The audience was no longer just watching the experience. They were part of it.",
            color: "#91b58d"
        },
        reality: {
            meta: "06 · Real-world context",
            title: "Immersion does not have to mean disconnection.",
            body: "Over time I became equally interested in experiences that stay connected to reality — systems that can understand the person, the objects and the context around them instead of replacing the world with a separate digital one.",
            why: "I want digital experiences to meet people where they already are.",
            color: "#afa0d4"
        },
        now: {
            meta: "07 · Now",
            title: "Technology, woven into everyday life.",
            body: "That is what draws me to AI, spatial computing, rapid prototyping and physical interfaces today: tools for making digital systems more contextual, responsive and naturally embedded in the world around us.",
            why: "Less like another screen to enter. More like part of the environment.",
            color: "#8fc7b6"
        }
    };

    const order = Object.keys(stories);
    const triggers = [...page.querySelectorAll("[data-story]")];
    const edges = [...page.querySelectorAll("[data-edge]")];
    const note = document.getElementById("storyNote");
    const noteMeta = document.getElementById("noteMeta");
    const noteTitle = document.getElementById("noteTitle");
    const noteBody = document.getElementById("noteBody");
    const noteWhy = document.getElementById("noteWhy");
    const noteClose = document.getElementById("noteClose");
    const resetButton = document.getElementById("resetMap");
    const counter = document.getElementById("mapCounter");
    let activeStory = null;

    function updatePath(id) {
        const activeIndex = id ? order.indexOf(id) : -1;

        edges.forEach((edge, index) => {
            edge.classList.toggle("is-traced", index < activeIndex);
            edge.classList.toggle("is-active", activeIndex > 0 && (index === activeIndex - 1 || index === activeIndex));
        });

        counter.textContent = `${Math.max(activeIndex + 1, 0)} / ${order.length} dots connected`;
    }

    function updateTriggers(id) {
        triggers.forEach((trigger) => {
            const isActive = trigger.dataset.story === id;
            trigger.classList.toggle("is-active", isActive);
            trigger.setAttribute("aria-pressed", String(isActive));
        });
    }

    function closeStory() {
        activeStory = null;
        updateTriggers(null);
        updatePath(null);
        note.hidden = true;
    }

    function openStory(id) {
        if (!stories[id]) {
            return;
        }

        if (activeStory === id) {
            closeStory();
            return;
        }

        activeStory = id;
        const story = stories[id];

        updateTriggers(id);
        updatePath(id);
        noteMeta.textContent = story.meta;
        noteTitle.textContent = story.title;
        noteBody.textContent = story.body;
        noteWhy.textContent = story.why;
        note.style.setProperty("--note-color", story.color);
        note.hidden = false;
    }

    triggers.forEach((trigger) => {
        trigger.addEventListener("click", () => openStory(trigger.dataset.story));
    });

    noteClose.addEventListener("click", closeStory);
    resetButton.addEventListener("click", closeStory);

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && activeStory) {
            closeStory();
        }
    });
})();
