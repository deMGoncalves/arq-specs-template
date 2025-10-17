import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./app-shell/containers/AppLayout.jsx";
import PromptGeneratorHome from "./prompt-generator/containers/PromptGeneratorHome.jsx";
import ChaptersOverviewPage from "./prompt-generator/containers/ChaptersOverviewPage.jsx";
import WorkspaceDashboard from "./prompt-generator/containers/WorkspaceDashboard.jsx";
import PromptBuilder from "./prompt-generator/containers/PromptBuilder.jsx";
import ScenarioSectionRoute from "./scenario-shared/containers/ScenarioSectionRoute.jsx";
import VisaoGeralObjetivosPage from "./SCN-001_visao-geral-e-objetivos/containers/VisaoGeralObjetivosPage.jsx";
import RestricoesDiretrizesPage from "./SCN-002_restricoes-e-diretrizes/containers/RestricoesDiretrizesPage.jsx";
import EscopoContextoPage from "./SCN-003_escopo-e-contexto/containers/EscopoContextoPage.jsx";
import EstrategiaArquiteturalPage from "./SCN-004_estrategia-arquitetural/containers/EstrategiaArquiteturalPage.jsx";
import VisaoEstruturalPage from "./SCN-005_visao-estrutural/containers/VisaoEstruturalPage.jsx";
import C4Workspace from "./SCN-005_visao-estrutural/containers/C4Workspace.jsx";
import ExportCenter from "./SCN-005_visao-estrutural/containers/ExportCenter.jsx";
import SpecsStructure from "./SCN-005_visao-estrutural/containers/SpecsStructure.jsx";
import VisaoComportamentoPage from "./SCN-006_visao-de-comportamento/containers/VisaoComportamentoPage.jsx";
import BddWorkspace from "./SCN-006_visao-de-comportamento/containers/BddWorkspace.jsx";
import FeatureCreatePage from "./SCN-006_visao-de-comportamento/containers/FeatureCreatePage.jsx";
import FeatureEditPage from "./SCN-006_visao-de-comportamento/containers/FeatureEditPage.jsx";
import VisaoImplantacaoPage from "./SCN-007_visao-de-implantacao/containers/VisaoImplantacaoPage.jsx";
import ConceitosTransversaisPage from "./SCN-008_conceitos-transversais/containers/ConceitosTransversaisPage.jsx";
import RegistroDecisoesPage from "./SCN-009_registro-de-decisoes/containers/RegistroDecisoesPage.jsx";
import AdrBoardPage from "./SCN-009_registro-de-decisoes/containers/AdrBoardPage.jsx";
import AdrCreatePage from "./SCN-009_registro-de-decisoes/containers/AdrCreatePage.jsx";
import AdrEditPage from "./SCN-009_registro-de-decisoes/containers/AdrEditPage.jsx";
import QualidadeCenariosPage from "./SCN-010_qualidade-e-cenarios/containers/QualidadeCenariosPage.jsx";
import RiscosDividaPage from "./SCN-011_riscos-e-divida-tecnica/containers/RiscosDividaPage.jsx";
import GlossarioTermosPage from "./SCN-012_glossario-de-termos/containers/GlossarioTermosPage.jsx";
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
            <Route path="scenarios/SCN-001" element={<VisaoGeralObjetivosPage />} />
            <Route path="scenarios/SCN-001/prompt" element={<PromptBuilder />} />
            <Route path="scenarios/SCN-002" element={<RestricoesDiretrizesPage />} />
            <Route path="scenarios/SCN-003" element={<EscopoContextoPage />} />
            <Route path="scenarios/SCN-004" element={<EstrategiaArquiteturalPage />} />
            <Route path="scenarios/SCN-005" element={<VisaoEstruturalPage />} />
            <Route path="scenarios/SCN-005/c4" element={<C4Workspace />} />
            <Route path="scenarios/SCN-005/export" element={<ExportCenter />} />
            <Route path="scenarios/SCN-005/specs" element={<SpecsStructure />} />
            <Route path="scenarios/SCN-006" element={<VisaoComportamentoPage />} />
            <Route path="scenarios/SCN-006/bdd" element={<BddWorkspace />} />
            <Route path="scenarios/SCN-006/bdd/new" element={<FeatureCreatePage />} />
            <Route path="scenarios/SCN-006/bdd/:featureId" element={<FeatureEditPage />} />
            <Route path="scenarios/SCN-007" element={<VisaoImplantacaoPage />} />
            <Route path="scenarios/SCN-008" element={<ConceitosTransversaisPage />} />
            <Route path="scenarios/SCN-009" element={<RegistroDecisoesPage />} />
            <Route path="scenarios/SCN-009/adrs" element={<AdrBoardPage />} />
            <Route path="scenarios/SCN-009/adrs/new" element={<AdrCreatePage />} />
            <Route path="scenarios/SCN-009/adrs/:adrId" element={<AdrEditPage />} />
            <Route path="scenarios/SCN-010" element={<QualidadeCenariosPage />} />
            <Route path="scenarios/SCN-011" element={<RiscosDividaPage />} />
            <Route path="scenarios/SCN-012" element={<GlossarioTermosPage />} />
            <Route path="scenarios/:chapterId" element={<ScenarioSectionRoute />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </AppDataProvider>
    </BrowserRouter>
  );
}

export default App;
