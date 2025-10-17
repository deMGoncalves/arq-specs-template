import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAppActions, useAppData } from "../../workspace-state/containers/AppDataProvider.jsx";
import IntroductionSection from "../../arc42-01-introducao/modules/IntroductionSection.jsx";
import GenericArc42Section from "./GenericArc42Section.jsx";

function Arc42SectionView({ sectionId }) {
  const navigate = useNavigate();
  const { arc42, adrs, bdd, c4 } = useAppData();
  const { updateArc42Section } = useAppActions();

  const section = arc42.find((item) => item.id === sectionId);

  useEffect(() => {
    if (!section) {
      navigate("/arc42/overview");
    }
  }, [section, navigate]);

  const relatedAdrs = useMemo(
    () => adrs.filter((adr) => adr.links.arc42.includes(sectionId)),
    [adrs, sectionId]
  );

  const relatedFeatures = useMemo(
    () => bdd.filter((feature) => feature.linkedArc42.includes(sectionId)),
    [bdd, sectionId]
  );

  const relatedContainers = useMemo(() => {
    return c4.containers.filter((container) =>
      container.linkedArc42.includes(sectionId)
    );
  }, [c4.containers, sectionId]);

  const relatedComponents = useMemo(() => {
    return c4.components.filter((component) =>
      component.linkedArc42.includes(sectionId)
    );
  }, [c4.components, sectionId]);

  if (!section) {
    return null;
  }

  function handleUpdate(updates) {
    updateArc42Section(section.id, updates);
  }

  const sharedProps = {
    section,
    relatedAdrs,
    relatedFeatures,
    relatedContainers,
    relatedComponents,
    onUpdate: handleUpdate
  };

  if (section.id === "arc42-01") {
    return <IntroductionSection {...sharedProps} />;
  }

  return <GenericArc42Section {...sharedProps} />;
}

export default Arc42SectionView;
