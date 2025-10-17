import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PromptGeneratorHome from "./dashboard/containers/PromptGeneratorHome.jsx";
import ChaptersOverviewPage from "./dashboard/containers/ChaptersOverviewPage.jsx";
import WorkspaceDashboard from "./dashboard/containers/WorkspaceDashboard.jsx";
import PromptBuilder from "./dashboard/containers/PromptBuilder.jsx";
import OverviewObjectivesPage from "./overview-and-objectives/containers/OverviewObjectivesPage.jsx";
import RestrictionsGuidelinesIndex from "./restrictions-and-guidelines/index.jsx";
import SystemScopeAndContextIndex from "./system-scope-and-context/index.jsx";
import ArchitecturalStrategyIndex from "./architectural-strategy/index.jsx";
import StructuralViewComponentsIndex from "./structural-view-components/index.jsx";
import C4Workspace from "./structural-workspace/containers/C4Workspace.jsx";
import ExportCenter from "./structural-workspace/containers/ExportCenter.jsx";
import SpecsStructure from "./structural-workspace/containers/SpecsStructure.jsx";
import BehavioralViewScenariosIndex from "./behavioral-view-scenarios/index.jsx";
import BddWorkspace from "./bdd-workspace/containers/BddWorkspace.jsx";
import FeatureCreatePage from "./bdd-workspace/containers/FeatureCreatePage.jsx";
import FeatureEditPage from "./bdd-workspace/containers/FeatureEditPage.jsx";
import DeploymentViewIndex from "./deployment-view/index.jsx";
import CrosscuttingConceptsIndex from "./crosscutting-concepts/index.jsx";
import DecisionLogIndex from "./decision-log/index.jsx";
import AdrBoardPage from "./adr-workspace/containers/AdrBoardPage.jsx";
import AdrCreatePage from "./adr-workspace/containers/AdrCreatePage.jsx";
import AdrEditPage from "./adr-workspace/containers/AdrEditPage.jsx";
import QualityAndScenariosIndex from "./quality-and-scenarios/index.jsx";
import RisksAndTechnicalDebtIndex from "./risks-and-technical-debt/index.jsx";
import GlossaryOfTermsIndex from "./glossary-of-terms/index.jsx";
import { AppDataProvider } from "./dashboard/containers/WorkspaceProvider.jsx";

function App() {
  return (
    <BrowserRouter>
      <AppDataProvider>
        <Routes>
          <Route path="/" element={<PromptGeneratorHome />} />
          <Route path="/scenarios" element={<Navigate to="/scenarios/overview" replace />} />
          <Route path="/scenarios/overview" element={<ChaptersOverviewPage />} />
          <Route path="/scenarios/overview/dashboard" element={<WorkspaceDashboard />} />
          <Route path="/scenarios/overview-and-objectives" element={<OverviewObjectivesPage />} />
          <Route path="/scenarios/overview-and-objectives/prompt" element={<PromptBuilder />} />
          <Route path="/scenarios/restrictions-and-guidelines" element={<RestrictionsGuidelinesIndex />} />
          <Route path="/scenarios/system-scope-and-context" element={<SystemScopeAndContextIndex />} />
          <Route path="/scenarios/architectural-strategy" element={<ArchitecturalStrategyIndex />} />
          <Route path="/scenarios/structural-view-components" element={<StructuralViewComponentsIndex />} />
          <Route path="/scenarios/structural-view-components/c4" element={<C4Workspace />} />
          <Route path="/scenarios/structural-view-components/export" element={<ExportCenter />} />
          <Route path="/scenarios/structural-view-components/specs" element={<SpecsStructure />} />
          <Route path="/scenarios/behavioral-view-scenarios" element={<BehavioralViewScenariosIndex />} />
          <Route path="/scenarios/behavioral-view-scenarios/bdd" element={<BddWorkspace />} />
          <Route path="/scenarios/behavioral-view-scenarios/bdd/new" element={<FeatureCreatePage />} />
          <Route path="/scenarios/behavioral-view-scenarios/bdd/:featureId" element={<FeatureEditPage />} />
          <Route path="/scenarios/deployment-view" element={<DeploymentViewIndex />} />
          <Route path="/scenarios/crosscutting-concepts" element={<CrosscuttingConceptsIndex />} />
          <Route path="/scenarios/decision-log" element={<DecisionLogIndex />} />
          <Route path="/scenarios/decision-log/adrs" element={<AdrBoardPage />} />
          <Route path="/scenarios/decision-log/adrs/new" element={<AdrCreatePage />} />
          <Route path="/scenarios/decision-log/adrs/:adrId" element={<AdrEditPage />} />
          <Route path="/scenarios/quality-and-scenarios" element={<QualityAndScenariosIndex />} />
          <Route path="/scenarios/risks-and-technical-debt" element={<RisksAndTechnicalDebtIndex />} />
          <Route path="/scenarios/glossary-of-terms" element={<GlossaryOfTermsIndex />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppDataProvider>
    </BrowserRouter>
  );
}

export default App;
