const HTML_ESCAPE_MAP = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};

function escapeHtml(value = "") {
  return value.replace(/[&<>"']/g, (char) => HTML_ESCAPE_MAP[char] || char);
}

function escapeAttribute(value = "") {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function applyInlineFormatting(text) {
  let result = escapeHtml(text);

  // Links: [label](url), only allow http(s) or root-relative paths
  result = result.replace(/\[([^\]]+)]\(([^)]+)\)/g, (_, rawLabel, rawHref) => {
    const href = rawHref.trim();
    if (!/^https?:\/\//i.test(href) && !href.startsWith("/")) {
      return escapeHtml(rawLabel);
    }
    const safeHref = escapeAttribute(href);
    return `<a href="${safeHref}" target="_blank" rel="noreferrer noopener" class="text-brand-600 hover:text-brand-700 underline decoration-dotted underline-offset-4">${escapeHtml(rawLabel)}</a>`;
  });

  // Bold **text** or __text__
  result = result.replace(/(\*\*|__)(.+?)\1/g, (_, __, content) => `<strong>${content}</strong>`);

  // Italic *text* or _text_
  result = result.replace(/(^|[^\*])\*(?!\*)([^*]+)\*(?!\*)/g, (match, prefix, content) => {
    return `${prefix}<em>${content}</em>`;
  });
  result = result.replace(/(^|[^_])_(?!_)([^_]+)_(?!_)/g, (match, prefix, content) => {
    return `${prefix}<em>${content}</em>`;
  });

  // Inline code `code`
  result = result.replace(/`([^`]+)`/g, (_, content) => `<code class="rounded bg-muted px-1 py-0.5 font-mono text-xs text-foreground/80">${content}</code>`);

  return result;
}

export function renderMarkdown(value) {
  if (!value) {
    return "";
  }

  const lines = value.split(/\r?\n/);
  let html = "";
  let listBuffer = [];

  const flushList = () => {
    if (listBuffer.length === 0) {
      return;
    }

    html += `<ul class="list-disc space-y-2 pl-5">`;
    for (const item of listBuffer) {
      html += `<li>${item}</li>`;
    }
    html += "</ul>";
    listBuffer = [];
  };

  for (const line of lines) {
    if (/^\s*[-*+]\s+/.test(line)) {
      const content = line.replace(/^\s*[-*+]\s+/, "");
      listBuffer.push(applyInlineFormatting(content));
      continue;
    }

    flushList();

    if (!line.trim()) {
      html += "<br />";
      continue;
    }

    html += `<p>${applyInlineFormatting(line)}</p>`;
  }

  flushList();

  return html;
}
