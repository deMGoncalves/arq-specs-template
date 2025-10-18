import { forwardRef } from "react";
import { cn } from "../../../lib/utils.js";

const BASE_CLASSES =
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50";

const VARIANT_CLASSES = {
  default: "bg-brand-500 text-white hover:bg-brand-600 shadow-soft",
  subtle: "bg-muted text-foreground hover:bg-muted/80",
  outline: "border border-border bg-transparent hover:bg-muted/60",
  ghost: "hover:bg-muted/50 hover:text-foreground",
  secondary: "bg-slate-900 text-white hover:bg-slate-800",
  destructive: "bg-red-500 text-white hover:bg-red-600"
};

const SIZE_CLASSES = {
  default: "h-9 px-4 py-2",
  sm: "h-8 rounded-md px-3",
  lg: "h-10 rounded-md px-6",
  icon: "h-9 w-9"
};

function buttonVariants({ variant = "default", size = "default" } = {}) {
  const variantClass = VARIANT_CLASSES[variant] || VARIANT_CLASSES.default;
  const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.default;

  return cn(BASE_CLASSES, variantClass, sizeClass);
}

const Button = forwardRef(function Button(
  { className, variant, size, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
});

export { Button, buttonVariants };
