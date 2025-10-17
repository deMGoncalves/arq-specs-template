import { X } from "lucide-react";
import { cn } from "../../../lib/utils.js";

function Drawer({ open, onClose, title, description, children, footer }) {
  if (!open) {
    return null;
  }

  function handleBackdropClick(event) {
    event.stopPropagation();
    onClose?.();
  }

  function handleContentClick(event) {
    event.stopPropagation();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-[1px]"
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div
        className={cn(
          "relative flex h-full w-full max-w-lg flex-col bg-card shadow-2xl transition-transform duration-200 ease-out"
        )}
        onClick={handleContentClick}
        style={{ transform: "translateX(0)" }}
      >
        <div className="flex items-start justify-between border-b border-border px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-foreground">{title}</h2>
            {description ? (
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            ) : null}
          </div>
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition hover:bg-muted/60 hover:text-foreground"
            aria-label="Fechar painel"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {children}
        </div>

        {footer ? (
          <div className="border-t border-border bg-muted/40 px-6 py-4">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export { Drawer };
