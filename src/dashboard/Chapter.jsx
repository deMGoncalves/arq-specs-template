import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { cn } from "@/utils";

function Chapter({ chapter }) {
  const isDisabled = !chapter.ready;
  const Wrapper = isDisabled ? "div" : Link;

  return (
    <Wrapper
      to={isDisabled ? undefined : chapter.target}
      aria-disabled={isDisabled ? "true" : undefined}
      className={cn(
        "group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isDisabled && "cursor-default"
      )}
    >
      <Card
        className={cn(
          "flex h-full flex-col justify-between border-border/60 bg-card/80 backdrop-blur transition-all duration-200 hover:border-primary/40 hover:shadow-2xl",
          isDisabled && "border-border/40 opacity-60 hover:border-border/40 hover:shadow-none"
        )}
      >
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 font-mono text-sm font-semibold uppercase tracking-[0.2em] text-primary ring-1 ring-inset ring-primary/20 transition-shadow group-hover:ring-primary/40">
              {chapter.order}
            </span>
            <Badge
              variant="outline"
              className="border-border/60 bg-transparent text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground"
            >
              {chapter.status}
            </Badge>
          </div>
          <CardTitle className="text-xl font-semibold text-card-foreground">
            {chapter.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-6 pt-0">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {chapter.description}
          </p>
        </CardContent>
      </Card>
    </Wrapper>
  );
}

export default Chapter;
