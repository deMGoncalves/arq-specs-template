import { cn } from "../../../lib/utils.js";

function Label({ className, children, htmlFor }) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "text-sm font-medium text-foreground",
        className
      )}
    >
      {children}
    </label>
  );
}

export { Label };
