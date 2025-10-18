import { Link } from "react-router-dom";

const CARD_BASE =
  "chapter-card rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-shadow";
const CARD_READY =
  "hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500";
const CARD_DISABLED = "chapter-card--disabled opacity-60 pointer-events-none";
const TOP_ROW_CLASS = "chapter-card__top flex items-center justify-between";
const ORDER_CLASS = "chapter-order text-sm font-semibold text-muted-foreground";
const STATUS_BADGE =
  "chapter-status inline-flex items-center rounded-full border border-border px-3 py-0.5 text-xs font-medium uppercase tracking-wide text-muted-foreground";
const TITLE_CLASS = "chapter-card__title text-lg font-semibold leading-tight";
const DESCRIPTION_CLASS =
  "chapter-card__description px-6 pb-6 text-sm text-muted-foreground";

function Chapter({ chapter }) {
  const cardClasses = [
    CARD_BASE,
    chapter.ready ? CARD_READY : CARD_DISABLED
  ].join(" ");

  const body = (
    <article className={cardClasses}>
      <header className="flex flex-col gap-1.5 px-6 pt-6">
        <div className={TOP_ROW_CLASS}>
          <span className={ORDER_CLASS}>{chapter.order}</span>
          <span className={STATUS_BADGE}>{chapter.status}</span>
        </div>
        <h2 className={TITLE_CLASS}>{chapter.title}</h2>
      </header>
      <p className={DESCRIPTION_CLASS}>{chapter.description}</p>
    </article>
  );

  if (!chapter.ready) {
    return (
      <div className="chapter-card-placeholder" aria-disabled="true">
        {body}
      </div>
    );
  }

  return (
    <Link to={chapter.target} className="chapter-card-link">
      {body}
    </Link>
  );
}

export default Chapter;
