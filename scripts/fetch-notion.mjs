import fs from "node:fs/promises";
import path from "node:path";

const { NOTION_TOKEN, NOTION_DATABASE_ID } = process.env;
const headers = {
  Authorization: `Bearer ${NOTION_TOKEN}`,
  "Notion-Version": "2022-06-28",
  "Content-Type": "application/json",
};

async function queryAll() {
  const results = [];
  let cursor;
  do {
    const res = await fetch(
      `https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          page_size: 100,
          start_cursor: cursor,
          filter: { property: "Published", checkbox: { equals: true } },
        }),
      }
    );
    if (!res.ok) throw new Error(await res.text());
    const data = await res.json();
    results.push(...data.results);
    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor);
  return results;
}

const text = (arr = []) => arr.map((t) => t.plain_text).join("");

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function richToHtml(arr = []) {
  return arr
    .map((t) => {
      let s = esc(t.plain_text).replace(/\n/g, "<br>");
      const a = t.annotations || {};
      if (a.code) s = `<code>${s}</code>`;
      if (a.bold) s = `<strong>${s}</strong>`;
      if (a.italic) s = `<em>${s}</em>`;
      if (a.strikethrough) s = `<s>${s}</s>`;
      if (a.underline) s = `<u>${s}</u>`;
      if (t.href) s = `<a href="${esc(t.href)}" target="_blank">${s}</a>`;
      return s;
    })
    .join("");
}

function value(prop) {
  switch (prop?.type) {
    case "title": return text(prop.title);
    case "rich_text": return text(prop.rich_text);
    case "number": return prop.number;
    case "select": return prop.select?.name ?? null;
    case "checkbox": return prop.checkbox;
    case "unique_id": return `${prop.unique_id.prefix ?? ""}${prop.unique_id.number}`;
    default: return null;
  }
}

// Notion's file URLs expire after ~1 hour, so download media into the repo.
async function saveMedia(page) {
  const files = page.properties.Media?.files ?? [];
  await fs.mkdir("media", { recursive: true });
  const out = [];
  for (const [i, f] of files.entries()) {
    const url = f.file?.url ?? f.external?.url;
    if (!url) continue;
    const ext = path.extname(new URL(url).pathname) || "";
    const name = `${page.id}-${i}${ext}`;
    const res = await fetch(url);
    await fs.writeFile(path.join("media", name), Buffer.from(await res.arrayBuffer()));
    out.push(`media/${name}`);
  }
  return out;
}

const pages = await queryAll();
const items = [];
for (const p of pages) {
  items.push({
    name: value(p.properties.Name),
    id: value(p.properties.ID),
    type: value(p.properties.Type),
    content: richToHtml(p.properties.Content?.rich_text), //value(p.properties.Content),
    media: await saveMedia(p),
  });
}

await fs.mkdir("data", { recursive: true });
await fs.writeFile("data/content.json", JSON.stringify(items, null, 2));
console.log(`Wrote ${items.length} items`);