import { useParams } from "react-router-dom";
import ScenarioSectionView from "../modules/ScenarioSectionView.jsx";

function ScenarioSectionRoute() {
  const { chapterId } = useParams();

  return <ScenarioSectionView sectionId={chapterId} />;
}

export default ScenarioSectionRoute;
