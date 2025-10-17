import { cn } from "../../../lib/utils.js";

const variantClasses = {
  default: "bg-brand-100 text-brand-700",
  outline: "border border-border text-muted-foreground",
  success: "bg-emerald-100 text-emerald-700",
  warning: "bg-amber-100 text-amber-700",
  danger: "bg-red-100 text-red-700",
  neutral: "bg-slate-200 text-slate-700"
};

function Badge({ className, variant = "default", children }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium uppercase tracking-wide",
        variantClasses[variant] || variantClasses.default,
        className
      )}
    >
      {children}
    </span>
  );
}

export { Badge };
