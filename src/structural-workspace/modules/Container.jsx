import { cn } from "@/utils";

const BASE_CLASSES =
  "mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-10 md:px-10 lg:px-12";

function Container({ children, className }) {
  const classes = cn(BASE_CLASSES, className);

  return <div className={classes}>{children}</div>;
}

export default Container;
