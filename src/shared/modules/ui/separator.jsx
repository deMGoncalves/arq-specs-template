import { cn } from "../../../lib/utils.js";

function Separator({ className }) {
  return (
    <div className={cn("my-6 h-px w-full bg-border", className)} />
  );
}

export { Separator };
