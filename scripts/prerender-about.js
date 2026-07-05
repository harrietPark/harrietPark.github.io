#!/usr/bin/env node
/**
 * Regenerate static about.html content from data/about.js.
 * Run after editing data/about.js: node scripts/prerender-about.js
 */
const fs = require("fs");
const vm = require("vm");

const src = fs.readFileSync("data/about.js", "utf8").replace("const ABOUT_DATA", "var ABOUT_DATA");
const sandbox = {};
vm.runInNewContext(src, sandbox);
const ABOUT_DATA = sandbox.ABOUT_DATA;

function esc(s) {
    return String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function link({ label, url, download, className }) {
    const ext = /^https?:\/\//.test(url || "");
    const dl = download ? " download" : "";
    const target = ext ? ' target="_blank" rel="noopener noreferrer"' : "";
    return `<a class="${className}" href="${esc(url || "#")}"${dl}${target}>${esc(label)}</a>`;
}

function projectCard(p) {
    const img = p.image
        ? `<img class="project-link-image" src="${esc(p.image)}" alt="${esc(p.imageAlt || p.title.replace(" ↗", ""))}">`
        : "";
    const ext = /^https?:\/\//.test(p.url || "");
    const target = ext ? ' target="_blank" rel="noopener noreferrer"' : "";
    return `<a class="project-link-card${p.image ? " has-image" : ""}" href="${esc(p.url)}"${target}>${img}<span class="project-link-copy"><span class="project-link-title">${esc(p.title)}</span><span class="project-link-meta">${esc(p.meta)}</span></span></a>`;
}

function expItem(e) {
    let icon;
    if (e.logo) {
        const ext = e.logoUrl && /^https?:\/\//.test(e.logoUrl);
        const wrap = e.logoUrl
            ? `<a href="${esc(e.logoUrl)}"${ext ? ' target="_blank" rel="noopener noreferrer"' : ""}><img src="${esc(e.logo)}" alt="${esc(e.company)} logo"></a>`
            : `<img src="${esc(e.logo)}" alt="${esc(e.company)} logo">`;
        icon = `<div class="experience-icon">${wrap}</div>`;
    } else {
        icon = `<div class="experience-icon">${esc(e.icon)}</div>`;
    }
    const projects = e.projects.length
        ? `<div class="experience-projects">${e.projects.map(projectCard).join("")}</div>`
        : "";
    const desc = e.description.map((t) => `<p>${esc(t)}</p>`).join("");
    return `<article class="experience-item"><div class="experience-meta${e.metaClass ? " " + e.metaClass : ""}">${icon}<div class="experience-meta-copy"><h3>${esc(e.company)}</h3><p>${esc(e.period)}</p><p>${esc(e.role)}</p></div></div><div class="experience-content">${desc}${projects}</div></article>`;
}

function listSection(title, items) {
    const rows = items
        .map((item) => {
            let text = "";
            if (item.links) {
                text = `<div class="list-item-links">${item.links.map((l) => link({ label: l.label, url: l.url, className: "list-item-link" })).join("")}</div>`;
            } else if (item.title) {
                text = `<h3>${esc(item.title)}</h3>`;
            }
            if (item.detail) {
                text += item.detailUrl
                    ? `<p>${link({ label: item.detail, url: item.detailUrl, className: "list-detail-link" })}</p>`
                    : `<p>${esc(item.detail)}</p>`;
            }
            return `<article class="list-item"><div>${text}</div><span>${esc(item.year || "")}</span></article>`;
        })
        .join("");
    return `<section class="about-section list-section"><h2>${esc(title)}</h2><div class="list-items">${rows}</div></section>`;
}

const intro = ABOUT_DATA.intro;
let html = `<section class="about-intro"><h1>${esc(intro.title)}</h1>`;
html += intro.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("");
html += `<div class="about-cta-group">${intro.ctas.map((c) => link({ ...c, className: "about-cta" })).join("")}</div></section>`;
html += `<section class="about-section experience-section"><h2>Experience</h2>${ABOUT_DATA.experiences.map(expItem).join("")}</section>`;
function renderSkillItems(items) {
    return `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;
}

function renderSkillsColumn(group) {
    const body = group.groups
        ? group.groups
              .map(
                  (sub) =>
                      `<div class="skills-subgroup"><p class="skills-subgroup-label">${esc(sub.label)}</p>${renderSkillItems(sub.items)}</div>`
              )
              .join("")
        : renderSkillItems(group.items);
    return `<div class="skills-column"><h3>${esc(group.title)}</h3>${body}</div>`;
}

html += `<section class="about-section skills-section"><h2>Skills</h2><div class="skills-grid">${ABOUT_DATA.skills.map(renderSkillsColumn).join("")}</div></section>`;
html += listSection("Awards & Recognition", ABOUT_DATA.awards);
html += listSection("Publications", ABOUT_DATA.publications);
html += listSection("Education", ABOUT_DATA.education);

let about = fs.readFileSync("about.html", "utf8");
about = about.replace(
    /(<div class="about-wrapper">)[\s\S]*?(<\/div>\s*<\/main>)/,
    `$1\n${html}\n        $2`
);

const desc = intro.title;
about = about.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(desc)}">`);
about = about.replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${esc(desc)}">`);
about = about.replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${esc(desc)}">`);

fs.writeFileSync("about.html", about);
console.log("Updated about.html from data/about.js");
