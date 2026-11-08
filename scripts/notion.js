fetch("data/content.json")
  .then((r) => r.json())
  .then((items) => {
    const byId = Object.fromEntries(items.map((i) => [i.id, i]));

    document.querySelectorAll("[data-notion]").forEach((el) => {
      const item = byId[el.dataset.notion];
      if (!item) return; // Not found or unpublished, so keep the fallback text

      const field = el.dataset.field || "content"; // content, name, or type
      if (field === "content") el.innerHTML = item.content; // formatted HTML
      else el.textContent = item[field]; 
    });

    // Fill images from the Media column
    document.querySelectorAll("img[data-notion]").forEach((img) => {
      const item = byId[img.dataset.notion];
      if (item && item.media[0]) img.src = item.media[0];
    });

    // Fill in Projects
    const esc = (s = "") =>
      String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    
    const container = document.querySelector("[data-notion-projects]");
    const projects = items
      .filter((i) => (i.type || "").toLowerCase() === "project")
      .sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999));

    if (container && projects.length) {
      container.innerHTML = projects
        .map((p) => {
          // Lists can't sit inside <p>, so only wrap plain text
          const body = /<(ul|ol)>/.test(p.content) ? p.content : `<p>${p.content}</p>`;
          return `
            <div class="project-tile project-tile--proj1">
            <div class="project-tile__content-box">
              ${p.category ? `<span class="project-tile__category">${esc(p.category)}</span>` : ""}
              <span class="project-tile__title">${esc(p.name)}</span>
              <div class="project-tile__text">${body}</div>
              ${p.live ? `<a class="button-link" href="${esc(p.live)}">View live</a>` : ""}
              ${p.code ? `<a class="button-link" href="${esc(p.code)}">View code</a>` : ""}
              ${p.media[0] ? `<img class="project-tile__image" src="${esc(p.media[0])}" alt="${esc(p.name)}">` : ""}
            </div>
          </div>`;
        })
        .join("");
    }
  });
