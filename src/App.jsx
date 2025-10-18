import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppDataProvider } from "./dashboard/containers/WorkspaceProvider.jsx";
import PromptGeneratorHome from "./dashboard/containers/PromptGeneratorHome.jsx";
import OverviewObjectivesPage from "./overview-and-objectives/containers/OverviewObjectivesPage.jsx";
import RestrictionsGuidelinesIndex from "./restrictions-and-guidelines/index.jsx";
import SystemScopeAndContextIndex from "./system-scope-and-context/index.jsx";
import ArchitecturalStrategyIndex from "./architectural-strategy/index.jsx";
import StructuralViewComponentsIndex from "./structural-view-components/index.jsx";
import BehavioralViewScenariosIndex from "./behavioral-view-scenarios/index.jsx";
import DeploymentViewIndex from "./deployment-view/index.jsx";
import CrosscuttingConceptsIndex from "./crosscutting-concepts/index.jsx";
import DecisionLogIndex from "./decision-log/index.jsx";
import QualityAndScenariosIndex from "./quality-and-scenarios/index.jsx";
import RisksAndTechnicalDebtIndex from "./risks-and-technical-debt/index.jsx";
import GlossaryOfTermsIndex from "./glossary-of-terms/index.jsx";

function App() {
  return (
    <BrowserRouter>
      <AppDataProvider>
        <Routes>
          <Route path="/" element={<PromptGeneratorHome />} />
          <Route path="/scenarios/overview-and-objectives" element={<OverviewObjectivesPage />} />
          <Route path="/scenarios/restrictions-and-guidelines" element={<RestrictionsGuidelinesIndex />} />
          <Route path="/scenarios/system-scope-and-context" element={<SystemScopeAndContextIndex />} />
          <Route path="/scenarios/architectural-strategy" element={<ArchitecturalStrategyIndex />} />
          <Route path="/scenarios/structural-view-components" element={<StructuralViewComponentsIndex />} />
          <Route path="/scenarios/behavioral-view-scenarios" element={<BehavioralViewScenariosIndex />} />
          <Route path="/scenarios/deployment-view" element={<DeploymentViewIndex />} />
          <Route path="/scenarios/crosscutting-concepts" element={<CrosscuttingConceptsIndex />} />
          <Route path="/scenarios/decision-log" element={<DecisionLogIndex />} />
          <Route path="/scenarios/quality-and-scenarios" element={<QualityAndScenariosIndex />} />
          <Route path="/scenarios/risks-and-technical-debt" element={<RisksAndTechnicalDebtIndex />} />
          <Route path="/scenarios/glossary-of-terms" element={<GlossaryOfTermsIndex />} />
        </Routes>
      </AppDataProvider>
    </BrowserRouter>
  );
}

export default App;
