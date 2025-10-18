import { useCallback, useMemo } from "react";
import { Navigate } from "react-router-dom";
import { useAppActions, useAppData } from "../../context/WorkspaceProvider.jsx";
import Container from "../modules/Container.jsx";
import IntroductionSection from "../modules/IntroductionSection.jsx";

function OverviewObjectives() {
  const { chapters = [], arc42 = [] } = useAppData();
  const { updateChapter } = useAppActions();
  const chapterSource = chapters.length ? chapters : arc42;

  const section = useMemo(() => {
    return (
      chapterSource.find((item) => item.id === "SCN-001") ||
      chapterSource.find((item) => item.slug === "overview-and-objectives") ||
      chapterSource.find((item) => item.id === "arc42-01") ||
      null
    );
  }, [chapterSource]);

  const handleUpdate = useCallback(
    (updates) => {
      if (!section) {
        return;
      }
      updateChapter(section.id, updates);
    },
    [section, updateChapter]
  );

  if (!section) {
    return <Navigate to="/" replace />;
  }

  return (
    <Container>
      <IntroductionSection section={section} onUpdate={handleUpdate} />
    </Container>
  );
}

export default OverviewObjectives;
