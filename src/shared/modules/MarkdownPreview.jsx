import { renderMarkdown } from "../../lib/markdown.js";

function MarkdownPreview({ value, emptyMessage = "Ainda não há conteúdo." }) {
  const html = renderMarkdown(value);

  if (!html) {
    return (
      <p className="text-sm text-muted-foreground">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div
      className="markdown-preview text-sm text-muted-foreground [&_p]:mb-3 [&_p:last-child]:mb-0 [&_p]:leading-relaxed [&_strong]:text-foreground [&_em]:text-foreground/80 [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-xs [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_a]:text-brand-600 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-brand-700"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default MarkdownPreview;
