import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./dashboard";
import OverviewObjectives from "./overview-and-objectives";
import RestrictionsAndGuidelines from "./restrictions-and-guidelines";
import SystemScopeAndContext from "./system-scope-and-context";
import ArchitecturalStrategy from "./architectural-strategy";
import StructuralViewComponents from "./structural-view-components";
import BehavioralViewScenarios from "./behavioral-view-scenarios";
import DeploymentView from "./deployment-view";
import CrosscuttingConcepts from "./crosscutting-concepts";
import DecisionLog from "./decision-log";
import QualityAndScenarios from "./quality-and-scenarios";
import RisksAndTechnicalDebt from "./risks-and-technical-debt";
import GlossaryOfTerms from "./glossary-of-terms";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
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
