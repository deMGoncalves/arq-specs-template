import { forwardRef } from "react";
import { cn } from "../../../lib/utils.js";

const ScrollArea = forwardRef(function ScrollArea(
  { className, children, orientation = "vertical" },
  ref
) {
  const overflowClass =
    orientation === "horizontal" ? "overflow-x-auto" : "overflow-y-auto";

  return (
    <div
      ref={ref}
      className={cn("relative", overflowClass, className)}
    >
      {children}
    </div>
  );
});

export { ScrollArea };
