import { BrowserRouter, Route, Routes } from "react-router-dom";
import PromptGenerator from "./dashboard/containers/PromptGeneratorHome.jsx";
import OverviewObjectives from "./overview-and-objectives/containers/OverviewObjectivesPage.jsx";
import RestrictionsAndGuidelines from "./restrictions-and-guidelines/index.jsx";
import SystemScopeAndContext from "./system-scope-and-context/index.jsx";
import ArchitecturalStrategy from "./architectural-strategy/index.jsx";
import StructuralViewComponents from "./structural-view-components/index.jsx";
import BehavioralViewScenarios from "./behavioral-view-scenarios/index.jsx";
import DeploymentView from "./deployment-view/index.jsx";
import CrosscuttingConcepts from "./crosscutting-concepts/index.jsx";
import DecisionLog from "./decision-log/index.jsx";
import QualityAndScenarios from "./quality-and-scenarios/index.jsx";
import RisksAndTechnicalDebt from "./risks-and-technical-debt/index.jsx";
import GlossaryOfTerms from "./glossary-of-terms/index.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PromptGenerator />} />
        <Route path="/scenarios/overview-and-objectives" element={<OverviewObjectives />} />
        <Route path="/scenarios/restrictions-and-guidelines" element={<RestrictionsAndGuidelines />} />
        <Route path="/scenarios/system-scope-and-context" element={<SystemScopeAndContext />} />
        <Route path="/scenarios/architectural-strategy" element={<ArchitecturalStrategy />} />
        <Route path="/scenarios/structural-view-components" element={<StructuralViewComponents />} />
        <Route path="/scenarios/behavioral-view-scenarios" element={<BehavioralViewScenarios />} />
        <Route path="/scenarios/deployment-view" element={<DeploymentView />} />
        <Route path="/scenarios/crosscutting-concepts" element={<CrosscuttingConcepts />} />
        <Route path="/scenarios/decision-log" element={<DecisionLog />} />
        <Route path="/scenarios/quality-and-scenarios" element={<QualityAndScenarios />} />
        <Route path="/scenarios/risks-and-technical-debt" element={<RisksAndTechnicalDebt />} />
        <Route path="/scenarios/glossary-of-terms" element={<GlossaryOfTerms />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
