import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAppActions, useAppData } from "../../workspace-state/containers/AppDataProvider.jsx";
import IntroductionSection from "../../SCN-001_visao-geral-e-objetivos/modules/IntroductionSection.jsx";
import GenericScenarioSection from "./GenericScenarioSection.jsx";

function ScenarioSectionView({ sectionId }) {
  const navigate = useNavigate();
  const {
    chapters = [],
    adrs = [],
    bdd = [],
    c4 = { containers: [], components: [] },
    arc42 = []
  } = useAppData();
  const chapterSource = chapters.length ? chapters : arc42;
  const { updateChapter } = useAppActions();

  const fallbackArcId = (() => {
    if (!sectionId || !sectionId.startsWith("SCN-")) {
      return sectionId;
    }
    const numeric = parseInt(sectionId.slice(4), 10);
    if (Number.isNaN(numeric)) {
      return sectionId;
    }
    return `arc42-${numeric.toString().padStart(2, "0")}`;
  })();

  let section = chapterSource.find((item) => item.id === sectionId);
  if (!section && fallbackArcId && fallbackArcId !== sectionId) {
    section = chapterSource.find((item) => item.id === fallbackArcId);
  }

  useEffect(() => {
    if (!section) {
      navigate("/scenarios/overview");
    }
  }, [section, navigate]);

  const relatedAdrs = useMemo(
    () =>
      adrs.filter((adr) => {
        const links = adr.links?.chapters || adr.links?.arc42 || [];
        return links.includes(section?.id || fallbackArcId);
      }),
    [adrs, section?.id, fallbackArcId]
  );

  const relatedFeatures = useMemo(
    () =>
      bdd.filter((feature) => {
        const linked = feature.linkedChapters || feature.linkedArc42 || [];
        return linked.includes(section?.id || fallbackArcId);
      }),
    [bdd, section?.id, fallbackArcId]
  );

  const relatedContainers = useMemo(() => {
    return (c4.containers || []).filter((container) => {
      const linked = container.linkedChapters || container.linkedArc42 || [];
      return linked.includes(section?.id || fallbackArcId);
    });
  }, [c4.containers, section?.id, fallbackArcId]);

  const relatedComponents = useMemo(() => {
    return (c4.components || []).filter((component) => {
      const linked = component.linkedChapters || component.linkedArc42 || [];
      return linked.includes(section?.id || fallbackArcId);
    });
  }, [c4.components, section?.id, fallbackArcId]);

  if (!section) {
    return null;
  }

  function handleUpdate(updates) {
    if (updateChapter) {
      updateChapter(section.id, updates);
    }
  }

  const sharedProps = {
    section,
    relatedAdrs,
    relatedFeatures,
    relatedContainers,
    relatedComponents,
    onUpdate: handleUpdate
  };

  if (section.id === "SCN-001" || section.id === "arc42-01") {
    return <IntroductionSection {...sharedProps} />;
  }

  return <GenericScenarioSection {...sharedProps} />;
}

export default ScenarioSectionView;
