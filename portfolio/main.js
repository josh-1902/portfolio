/* =========================================================
   main.js
   Builds the project list from projects.js.
   You normally don't need to edit this.
   ========================================================= */

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function escapeHTML(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function mediaHTML(media) {
  const alt = escapeHTML(media.alt || "");
  if (media.type === "video") {
    const playback = reduceMotion ? "controls" : "autoplay muted loop playsinline";
    return `<video src="${media.src}" ${playback} preload="metadata" aria-label="${alt}"></video>`;
  }
  return `<img src="${media.src}" alt="${alt}" loading="lazy">`;
}

function visualHTML(project) {
  if (!project.media) return "";
  const caption = project.caption ? `<figcaption>${escapeHTML(project.caption)}</figcaption>` : "";
  return `<figure class="project-visual"><div class="visual-frame">${mediaHTML(project.media)}</div>${caption}</figure>`;
}

function breakdownHTML(project) {
  if (!project.breakdown) return "";
  const parts = project.breakdown
    .map((part) => `<div><h4>${escapeHTML(part.heading)}</h4><p>${escapeHTML(part.text)}</p></div>`)
    .join("");
  const shots = (project.shots || [])
    .map((shot) => `<figure><img src="${shot.src}" alt="${escapeHTML(shot.caption)}" loading="lazy">
                     <figcaption>${escapeHTML(shot.caption)}</figcaption></figure>`)
    .join("");
  // <details> is the browser's built-in show/hide: no JavaScript needed to open it
  return `
    <details class="breakdown">
      <summary>Read the breakdown</summary>
      <div class="breakdown-body">${parts}${shots ? `<div class="breakdown-shots">${shots}</div>` : ""}</div>
    </details>`;
}

function projectHTML(project) {
  const points = project.points.map((p) => `<li>${escapeHTML(p)}</li>`).join("");
  const tags = project.tags.map((t) => `<li>${escapeHTML(t)}</li>`).join("");
  const links = project.links
    .filter((link) => link.url)
    .map((link) => `<a href="${link.url}" target="_blank" rel="noopener">${escapeHTML(link.label)}</a>`)
    .join("");
  const meta = [project.role, project.team, project.year].filter(Boolean).map(escapeHTML).join(", ");

  return `
    <article class="project${project.featured ? " is-featured" : ""}${project.media ? "" : " no-media"}">
      ${visualHTML(project)}
      <div class="project-info">
        <h3 class="project-title">${escapeHTML(project.title)}</h3>
        <p class="project-meta">${meta}</p>
        <p class="project-summary">${escapeHTML(project.summary)}</p>
        <ul class="project-points">${points}</ul>
        <ul class="tags">${tags}</ul>
        ${links ? `<div class="project-links">${links}</div>` : ""}
      </div>
      ${breakdownHTML(project)}
    </article>`;
}

document.getElementById("project-list").innerHTML = projects.map(projectHTML).join("");
document.getElementById("year").textContent = new Date().getFullYear();
