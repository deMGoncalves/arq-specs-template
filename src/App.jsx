import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./app-shell/containers/AppLayout.jsx";
import Arc42OverviewPage from "./arc42-overview/containers/Arc42OverviewPage.jsx";
import Arc42SectionRoute from "./arc42-shared/containers/Arc42SectionRoute.jsx";
import IntroducaoPage from "./arc42-01-introducao/containers/IntroducaoPage.jsx";
import RestricoesPage from "./arc42-02-restricoes/containers/RestricoesPage.jsx";
import ContextoPage from "./arc42-03-contexto/containers/ContextoPage.jsx";
import EstrategiaPage from "./arc42-04-estrategia/containers/EstrategiaPage.jsx";
import BlocosPage from "./arc42-05-blocos/containers/BlocosPage.jsx";
import C4Workspace from "./arc42-05-blocos/containers/C4Workspace.jsx";
import ExportCenter from "./arc42-05-blocos/containers/ExportCenter.jsx";
import SpecsStructure from "./arc42-05-blocos/containers/SpecsStructure.jsx";
import ComportamentoPage from "./arc42-06-comportamento/containers/ComportamentoPage.jsx";
import BddWorkspace from "./arc42-06-comportamento/containers/BddWorkspace.jsx";
import FeatureCreatePage from "./arc42-06-comportamento/containers/FeatureCreatePage.jsx";
import FeatureEditPage from "./arc42-06-comportamento/containers/FeatureEditPage.jsx";
import ImplantacaoPage from "./arc42-07-implantacao/containers/ImplantacaoPage.jsx";
import ConceitosPage from "./arc42-08-conceitos/containers/ConceitosPage.jsx";
import DecisoesPage from "./arc42-09-decisoes/containers/DecisoesPage.jsx";
import AdrBoardPage from "./arc42-09-decisoes/containers/AdrBoardPage.jsx";
import AdrCreatePage from "./arc42-09-decisoes/containers/AdrCreatePage.jsx";
import AdrEditPage from "./arc42-09-decisoes/containers/AdrEditPage.jsx";
import QualidadePage from "./arc42-10-qualidade/containers/QualidadePage.jsx";
import RiscosPage from "./arc42-11-riscos/containers/RiscosPage.jsx";
import GlossarioPage from "./arc42-12-glossario/containers/GlossarioPage.jsx";
import Arc42Dashboard from "./arc42-overview/containers/Arc42Dashboard.jsx";
import PromptBuilder from "./arc42-overview/containers/PromptBuilder.jsx";
import { AppDataProvider } from "./workspace-state/containers/AppDataProvider.jsx";

function App() {
  return (
    <BrowserRouter>
      <AppDataProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate to="/arc42/overview" replace />} />
            <Route path="arc42" element={<Navigate to="/arc42/overview" replace />} />
            <Route path="arc42/overview" element={<Arc42OverviewPage />} />
            <Route path="arc42/overview/dashboard" element={<Arc42Dashboard />} />
            <Route path="arc42/arc42-01" element={<IntroducaoPage />} />
            <Route path="arc42/arc42-01/prompt" element={<PromptBuilder />} />
            <Route path="arc42/arc42-02" element={<RestricoesPage />} />
            <Route path="arc42/arc42-03" element={<ContextoPage />} />
            <Route path="arc42/arc42-04" element={<EstrategiaPage />} />
            <Route path="arc42/arc42-05" element={<BlocosPage />} />
            <Route path="arc42/arc42-05/c4" element={<C4Workspace />} />
            <Route path="arc42/arc42-05/export" element={<ExportCenter />} />
            <Route path="arc42/arc42-05/specs" element={<SpecsStructure />} />
            <Route path="arc42/arc42-06" element={<ComportamentoPage />} />
            <Route path="arc42/arc42-06/bdd" element={<BddWorkspace />} />
            <Route path="arc42/arc42-06/bdd/new" element={<FeatureCreatePage />} />
            <Route path="arc42/arc42-06/bdd/:featureId" element={<FeatureEditPage />} />
            <Route path="arc42/arc42-07" element={<ImplantacaoPage />} />
            <Route path="arc42/arc42-08" element={<ConceitosPage />} />
            <Route path="arc42/arc42-09" element={<DecisoesPage />} />
            <Route path="arc42/arc42-09/adrs" element={<AdrBoardPage />} />
            <Route path="arc42/arc42-09/adrs/new" element={<AdrCreatePage />} />
            <Route path="arc42/arc42-09/adrs/:adrId" element={<AdrEditPage />} />
            <Route path="arc42/arc42-10" element={<QualidadePage />} />
            <Route path="arc42/arc42-11" element={<RiscosPage />} />
            <Route path="arc42/arc42-12" element={<GlossarioPage />} />
            <Route path="arc42/:sectionId" element={<Arc42SectionRoute />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </AppDataProvider>
    </BrowserRouter>
  );
}

export default App;
