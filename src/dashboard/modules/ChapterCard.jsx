import { Link } from "react-router-dom";
import { Card, CardDescription, CardHeader, CardTitle } from "../../shared/modules/ui/card.jsx";
import { Badge } from "../../shared/modules/ui/badge.jsx";

function ChapterCard({ chapter }) {
  const card = (
    <Card className={`chapter-card ${chapter.ready ? "" : "chapter-card--disabled"}`}>
      <CardHeader>
        <div className="chapter-card__top">
          <span className="chapter-order">{chapter.order}</span>
          <Badge variant="outline" className="chapter-status">
            {chapter.status}
          </Badge>
        </div>
        <CardTitle className="chapter-card__title">{chapter.title}</CardTitle>
        <CardDescription className="chapter-card__description">
          {chapter.description}
        </CardDescription>
      </CardHeader>
    </Card>
  );

  if (!chapter.ready) {
    return (
      <div className="chapter-card-placeholder">
        {card}
      </div>
    );
  }

  return (
    <Link to={chapter.target} className="chapter-card-link">
      {card}
    </Link>
  );
}

export default ChapterCard;
