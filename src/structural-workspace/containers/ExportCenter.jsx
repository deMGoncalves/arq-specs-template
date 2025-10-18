import { useState } from "react";
import { Download, UploadCloud } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import { useAppActions, useAppData } from "../../context/WorkspaceProvider.jsx";
import ContextContainer from "../modules/Container.jsx";

function ExportCenter() {
  const data = useAppData();
  const { importWorkspace, resetWorkspace } = useAppActions();
  const [importValue, setImportValue] = useState("");
  const [feedback, setFeedback] = useState("");

  function handleCopy() {
    const payload = JSON.stringify(data, null, 2);
    navigator.clipboard
      .writeText(payload)
      .then(() => setFeedback("Workspace copiado para a área de transferência."))
      .catch(() => setFeedback("Não foi possível copiar automaticamente."));
  }

  function handleDownload() {
    const payload = JSON.stringify(data, null, 2);
    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "cdd-specs-workspace.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  function handleImport() {
    try {
      const parsed = JSON.parse(importValue);
      importWorkspace(parsed);
      setImportValue("");
      setFeedback("Workspace importado com sucesso.");
    } catch (error) {
      console.error(error);
      setFeedback("JSON inválido. Verifique o conteúdo e tente novamente.");
    }
  }

  return (
    <ContextContainer className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">
          Exportar e importar workspace
        </h1>
        <p className="text-sm text-muted-foreground">
          Gere cópias de segurança e compartilhe o estado atual da documentação.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Exportar</CardTitle>
          <CardDescription>
            Copie ou baixe o estado atual (arc42, C4, ADRs e BDD) em formato JSON.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-3">
            <Button size="sm" onClick={handleCopy}>
              <UploadCloud className="mr-2 h-4 w-4" />
              Copiar para área de transferência
            </Button>
            <Button size="sm" variant="outline" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Baixar arquivo
            </Button>
            <Button size="sm" variant="ghost" onClick={resetWorkspace}>
              Restaurar template
            </Button>
          </div>
          <Textarea
            readOnly
            value={JSON.stringify(data, null, 2)}
            className="font-mono text-xs"
          />
          {feedback ? (
            <p className="text-xs text-brand-600">{feedback}</p>
          ) : null}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Importar</CardTitle>
          <CardDescription>
            Cole um JSON exportado anteriormente para carregar um workspace.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Textarea
            value={importValue}
            onChange={(event) => setImportValue(event.target.value)}
            placeholder="Cole aqui o JSON exportado"
            className="font-mono text-xs"
            minLength={2}
          />
          <div className="flex gap-3">
            <Button size="sm" onClick={handleImport}>
              Importar
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setImportValue("")}
            >
              Limpar
            </Button>
          </div>
        </CardContent>
      </Card>
    </ContextContainer>
  );
}

export default ExportCenter;
