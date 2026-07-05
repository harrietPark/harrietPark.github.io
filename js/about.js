function createLink({ label, url, download = false, className = "" }) {
    const link = document.createElement("a");
    link.href = url || "#";
    link.textContent = label;
    link.className = className;

    if (download) {
        link.setAttribute("download", "");
    }

    if (url && /^https?:\/\//.test(url)) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
    }

    return link;
}

function AboutIntro(data) {
    const section = document.createElement("section");
    section.className = "about-intro";

    const title = document.createElement("h1");
    title.textContent = data.title;
    section.appendChild(title);

    data.paragraphs.forEach((text) => {
        const paragraph = document.createElement("p");
        paragraph.textContent = text;
        section.appendChild(paragraph);
    });

    const ctaGroup = document.createElement("div");
    ctaGroup.className = "about-cta-group";

    data.ctas.forEach((cta) => {
        ctaGroup.appendChild(createLink({ ...cta, className: "about-cta" }));
    });

    section.appendChild(ctaGroup);
    return section;
}

function ProjectLinkCard(project) {
    const card = createLink({
        label: "",
        url: project.url,
        className: "project-link-card"
    });

    if (project.image) {
        card.classList.add("has-image");

        const image = document.createElement("img");
        image.className = "project-link-image";
        image.src = project.image;
        image.alt = project.imageAlt || project.title.replace(" ↗", "");
        card.appendChild(image);
    }

    const copy = document.createElement("span");
    copy.className = "project-link-copy";

    const title = document.createElement("span");
    title.className = "project-link-title";
    title.textContent = project.title;

    const meta = document.createElement("span");
    meta.className = "project-link-meta";
    meta.textContent = project.meta;

    copy.append(title, meta);
    card.appendChild(copy);
    return card;
}

function ExperienceItem(experience) {
    const article = document.createElement("article");
    article.className = "experience-item";

    const meta = document.createElement("div");
    meta.className = "experience-meta";

    if (experience.metaClass) {
        meta.classList.add(experience.metaClass);
    }

    const icon = document.createElement("div");
    icon.className = "experience-icon";

    if (experience.logo) {
        const logo = document.createElement("img");
        logo.src = experience.logo;
        logo.alt = `${experience.company} logo`;

        if (experience.logoUrl) {
            const logoLink = document.createElement("a");
            logoLink.href = experience.logoUrl;

            if (/^https?:\/\//.test(experience.logoUrl)) {
                logoLink.target = "_blank";
                logoLink.rel = "noopener noreferrer";
            }

            logoLink.appendChild(logo);
            icon.appendChild(logoLink);
        } else {
            icon.appendChild(logo);
        }
    } else {
        icon.textContent = experience.icon;
    }

    const company = document.createElement("h3");
    company.textContent = experience.company;

    const period = document.createElement("p");
    period.textContent = experience.period;

    const role = document.createElement("p");
    role.textContent = experience.role;

    const metaCopy = document.createElement("div");
    metaCopy.className = "experience-meta-copy";
    metaCopy.append(company, period, role);

    meta.append(icon, metaCopy);

    const content = document.createElement("div");
    content.className = "experience-content";

    experience.description.forEach((text) => {
        const paragraph = document.createElement("p");
        paragraph.textContent = text;
        content.appendChild(paragraph);
    });

    if (experience.projects.length > 0) {
        const projectList = document.createElement("div");
        projectList.className = "experience-projects";

        experience.projects.forEach((project) => {
            projectList.appendChild(ProjectLinkCard(project));
        });

        content.appendChild(projectList);
    }

    article.append(meta, content);
    return article;
}

function SkillsSection(skills) {
    const section = document.createElement("section");
    section.className = "about-section skills-section";

    const title = document.createElement("h2");
    title.textContent = "Skills";
    section.appendChild(title);

    const grid = document.createElement("div");
    grid.className = "skills-grid";

    skills.forEach((group) => {
        const column = document.createElement("div");
        column.className = "skills-column";

        const groupTitle = document.createElement("h3");
        groupTitle.textContent = group.title;
        column.appendChild(groupTitle);

        if (group.groups) {
            group.groups.forEach((subgroup) => {
                const wrap = document.createElement("div");
                wrap.className = "skills-subgroup";

                const label = document.createElement("p");
                label.className = "skills-subgroup-label";
                label.textContent = subgroup.label;

                const list = document.createElement("ul");
                subgroup.items.forEach((item) => {
                    const listItem = document.createElement("li");
                    listItem.textContent = item;
                    list.appendChild(listItem);
                });

                wrap.append(label, list);
                column.appendChild(wrap);
            });
        } else {
            const list = document.createElement("ul");
            group.items.forEach((item) => {
                const listItem = document.createElement("li");
                listItem.textContent = item;
                list.appendChild(listItem);
            });
            column.appendChild(list);
        }

        grid.appendChild(column);
    });

    section.appendChild(grid);
    return section;
}

function ListSection(titleText, items) {
    const section = document.createElement("section");
    section.className = "about-section list-section";

    const title = document.createElement("h2");
    title.textContent = titleText;
    section.appendChild(title);

    const list = document.createElement("div");
    list.className = "list-items";

    items.forEach((item) => {
        const row = document.createElement("article");
        row.className = "list-item";

        const text = document.createElement("div");

        if (item.links) {
            const linksWrap = document.createElement("div");
            linksWrap.className = "list-item-links";

            item.links.forEach((link) => {
                linksWrap.appendChild(createLink({
                    label: link.label,
                    url: link.url,
                    className: "list-item-link"
                }));
            });

            text.appendChild(linksWrap);
        } else {
            const itemTitle = document.createElement("h3");
            itemTitle.textContent = item.title;
            text.appendChild(itemTitle);
        }

        if (item.detail) {
            const detail = document.createElement("p");
            if (item.detailUrl) {
                detail.appendChild(createLink({
                    label: item.detail,
                    url: item.detailUrl,
                    className: "list-detail-link"
                }));
            } else {
                detail.textContent = item.detail;
            }
            text.appendChild(detail);
        }

        const year = document.createElement("span");
        year.textContent = item.year || "";

        row.append(text, year);
        list.appendChild(row);
    });

    section.appendChild(list);
    return section;
}

function renderAboutPage() {
    const root = document.querySelector(".about-wrapper");

    if (!root || typeof ABOUT_DATA === "undefined" || root.querySelector(".about-intro")) {
        return;
    }

    root.appendChild(AboutIntro(ABOUT_DATA.intro));

    const experienceSection = document.createElement("section");
    experienceSection.className = "about-section experience-section";

    const experienceTitle = document.createElement("h2");
    experienceTitle.textContent = "Experience";
    experienceSection.appendChild(experienceTitle);

    ABOUT_DATA.experiences.forEach((experience) => {
        experienceSection.appendChild(ExperienceItem(experience));
    });

    root.append(
        experienceSection,
        SkillsSection(ABOUT_DATA.skills),
        ListSection("Awards & Recognition", ABOUT_DATA.awards),
        ListSection("Publications", ABOUT_DATA.publications),
        ListSection("Education", ABOUT_DATA.education)
    );
}

document.addEventListener("DOMContentLoaded", renderAboutPage);
