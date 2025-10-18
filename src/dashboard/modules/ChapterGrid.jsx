import ChapterCard from "./ChapterCard.jsx";

function ChapterGrid({ chapters }) {
  return (
    <div className="chapter-grid">
      {chapters.map((chapter) => (
        <ChapterCard key={chapter.id} chapter={chapter} />
      ))}
    </div>
  );
}

export default ChapterGrid;
