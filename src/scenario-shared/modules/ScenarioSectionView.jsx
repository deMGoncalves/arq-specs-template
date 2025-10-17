import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAppActions, useAppData } from "../../workspace-state/containers/AppDataProvider.jsx";
import IntroductionSection from "../../overview-and-objectives/modules/IntroductionSection.jsx";
import GenericScenarioSection from "./GenericScenarioSection.jsx";

function ScenarioSectionView({ sectionId, slug }) {
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

  const normalizedId = sectionId;
  const fallbackArcId = (() => {
    if (!normalizedId || !normalizedId.startsWith("SCN-")) {
      return normalizedId;
    }
    const numeric = parseInt(normalizedId.slice(4), 10);
    if (Number.isNaN(numeric)) {
      return normalizedId;
    }
    return `arc42-${numeric.toString().padStart(2, "0")}`;
  })();

  let section = chapterSource.find((item) => item.id === normalizedId);
  if (!section && slug) {
    section = chapterSource.find((item) => item.slug === slug);
  }
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
        const targetId = section?.id || fallbackArcId;
        return targetId ? links.includes(targetId) : false;
      }),
    [adrs, section?.id, fallbackArcId]
  );

  const relatedFeatures = useMemo(
    () =>
      bdd.filter((feature) => {
        const linked = feature.linkedChapters || feature.linkedArc42 || [];
        const targetId = section?.id || fallbackArcId;
        return targetId ? linked.includes(targetId) : false;
      }),
    [bdd, section?.id, fallbackArcId]
  );

  const relatedContainers = useMemo(() => {
    return (c4.containers || []).filter((container) => {
      const linked = container.linkedChapters || container.linkedArc42 || [];
      const targetId = section?.id || fallbackArcId;
      return targetId ? linked.includes(targetId) : false;
    });
  }, [c4.containers, section?.id, fallbackArcId]);

  const relatedComponents = useMemo(() => {
    return (c4.components || []).filter((component) => {
      const linked = component.linkedChapters || component.linkedArc42 || [];
      const targetId = section?.id || fallbackArcId;
      return targetId ? linked.includes(targetId) : false;
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
