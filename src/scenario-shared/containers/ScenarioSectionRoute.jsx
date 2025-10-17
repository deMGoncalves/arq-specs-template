import { useParams } from "react-router-dom";
import ScenarioSectionView from "../modules/ScenarioSectionView.jsx";

function ScenarioSectionRoute() {
  const { chapterSlug } = useParams();

  return <ScenarioSectionView sectionId={chapterSlug} slug={chapterSlug} />;
}

export default ScenarioSectionRoute;
