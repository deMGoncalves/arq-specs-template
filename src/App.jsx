import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./app-shell/containers/AppLayout.jsx";
import PromptGeneratorHome from "./prompt-generator/containers/PromptGeneratorHome.jsx";
import ChaptersOverviewPage from "./prompt-generator/containers/ChaptersOverviewPage.jsx";
import WorkspaceDashboard from "./prompt-generator/containers/WorkspaceDashboard.jsx";
import PromptBuilder from "./prompt-generator/containers/PromptBuilder.jsx";
import ScenarioSectionRoute from "./scenario-shared/containers/ScenarioSectionRoute.jsx";
import OverviewObjectivesPage from "./overview-and-objectives/containers/OverviewObjectivesPage.jsx";
import RestrictionsGuidelinesPage from "./restrictions-and-guidelines/containers/RestrictionsGuidelinesPage.jsx";
import SystemScopeContextPage from "./system-scope-and-context/containers/SystemScopeContextPage.jsx";
import ArchitecturalStrategyPage from "./architectural-strategy/containers/ArchitecturalStrategyPage.jsx";
import StructuralViewComponentsPage from "./structural-view-components/containers/StructuralViewComponentsPage.jsx";
import C4Workspace from "./structural-view-components/containers/C4Workspace.jsx";
import ExportCenter from "./structural-view-components/containers/ExportCenter.jsx";
import SpecsStructure from "./structural-view-components/containers/SpecsStructure.jsx";
import BehavioralViewScenariosPage from "./behavioral-view-scenarios/containers/BehavioralViewScenariosPage.jsx";
import BddWorkspace from "./behavioral-view-scenarios/containers/BddWorkspace.jsx";
import FeatureCreatePage from "./behavioral-view-scenarios/containers/FeatureCreatePage.jsx";
import FeatureEditPage from "./behavioral-view-scenarios/containers/FeatureEditPage.jsx";
import DeploymentViewPage from "./deployment-view/containers/DeploymentViewPage.jsx";
import CrosscuttingConceptsPage from "./crosscutting-concepts/containers/CrosscuttingConceptsPage.jsx";
import DecisionLogPage from "./decision-log/containers/DecisionLogPage.jsx";
import AdrBoardPage from "./decision-log/containers/AdrBoardPage.jsx";
import AdrCreatePage from "./decision-log/containers/AdrCreatePage.jsx";
import AdrEditPage from "./decision-log/containers/AdrEditPage.jsx";
import QualityAndScenariosPage from "./quality-and-scenarios/containers/QualityAndScenariosPage.jsx";
import RisksAndTechnicalDebtPage from "./risks-and-technical-debt/containers/RisksAndTechnicalDebtPage.jsx";
import GlossaryOfTermsPage from "./glossary-of-terms/containers/GlossaryOfTermsPage.jsx";
import { AppDataProvider } from "./workspace-state/containers/AppDataProvider.jsx";

function App() {
  return (
    <BrowserRouter>
      <AppDataProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<PromptGeneratorHome />} />
            <Route path="scenarios" element={<Navigate to="/scenarios/overview" replace />} />
            <Route path="scenarios/overview" element={<ChaptersOverviewPage />} />
            <Route path="scenarios/overview/dashboard" element={<WorkspaceDashboard />} />
            <Route path="scenarios/overview-and-objectives" element={<OverviewObjectivesPage />} />
            <Route path="scenarios/overview-and-objectives/prompt" element={<PromptBuilder />} />
            <Route path="scenarios/restrictions-and-guidelines" element={<RestrictionsGuidelinesPage />} />
            <Route path="scenarios/system-scope-and-context" element={<SystemScopeContextPage />} />
            <Route path="scenarios/architectural-strategy" element={<ArchitecturalStrategyPage />} />
            <Route path="scenarios/structural-view-components" element={<StructuralViewComponentsPage />} />
            <Route path="scenarios/structural-view-components/c4" element={<C4Workspace />} />
            <Route path="scenarios/structural-view-components/export" element={<ExportCenter />} />
            <Route path="scenarios/structural-view-components/specs" element={<SpecsStructure />} />
            <Route path="scenarios/behavioral-view-scenarios" element={<BehavioralViewScenariosPage />} />
            <Route path="scenarios/behavioral-view-scenarios/bdd" element={<BddWorkspace />} />
            <Route path="scenarios/behavioral-view-scenarios/bdd/new" element={<FeatureCreatePage />} />
            <Route path="scenarios/behavioral-view-scenarios/bdd/:featureId" element={<FeatureEditPage />} />
            <Route path="scenarios/deployment-view" element={<DeploymentViewPage />} />
            <Route path="scenarios/crosscutting-concepts" element={<CrosscuttingConceptsPage />} />
            <Route path="scenarios/decision-log" element={<DecisionLogPage />} />
            <Route path="scenarios/decision-log/adrs" element={<AdrBoardPage />} />
            <Route path="scenarios/decision-log/adrs/new" element={<AdrCreatePage />} />
            <Route path="scenarios/decision-log/adrs/:adrId" element={<AdrEditPage />} />
            <Route path="scenarios/quality-and-scenarios" element={<QualityAndScenariosPage />} />
            <Route path="scenarios/risks-and-technical-debt" element={<RisksAndTechnicalDebtPage />} />
            <Route path="scenarios/glossary-of-terms" element={<GlossaryOfTermsPage />} />
            <Route path="scenarios/:chapterSlug" element={<ScenarioSectionRoute />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </AppDataProvider>
    </BrowserRouter>
  );
}

export default App;
