fetch("data/content.json")
  .then((r) => r.json())
  .then((items) => {
    const byId = Object.fromEntries(items.map((i) => [i.id, i]));

    document.querySelectorAll("[data-notion]").forEach((el) => {
      const item = byId[el.dataset.notion];
      if (!item) return; // Not found or unpublished, so keep the fallback text

      const field = el.dataset.field || "content"; // content, name, or type
      el.textContent = item[field];
    });

    // Fill images from the Media column
    document.querySelectorAll("img[data-notion]").forEach((img) => {
      const item = byId[img.dataset.notion];
      if (item && item.media[0]) img.src = item.media[0];
    });
  });
