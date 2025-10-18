import { cn } from "@/utils";

const VARIANT_CLASSES = {
  default:
    "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
  secondary:
    "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
  destructive:
    "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
  outline: "border border-border text-foreground",
  neutral: "border-transparent bg-muted text-muted-foreground hover:bg-muted/80",
  danger:
    "border-transparent bg-destructive/90 text-destructive-foreground hover:bg-destructive"
};

function Badge({ className, variant = "default", children }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium uppercase tracking-[0.2em] transition-colors",
        VARIANT_CLASSES[variant] || VARIANT_CLASSES.default,
        className
      )}
    >
      {children}
    </span>
  );
}

export { Badge };
