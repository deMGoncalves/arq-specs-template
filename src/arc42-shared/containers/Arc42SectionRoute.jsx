import { useParams } from "react-router-dom";
import Arc42SectionView from "../modules/Arc42SectionView.jsx";

function Arc42SectionRoute() {
  const { sectionId } = useParams();

  return <Arc42SectionView sectionId={sectionId} />;
}

export default Arc42SectionRoute;
