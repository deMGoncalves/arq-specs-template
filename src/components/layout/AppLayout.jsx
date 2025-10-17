import { Outlet } from "react-router-dom";
import { Button } from "../ui/button.jsx";
import { useAppActions, useAppData } from "../../context/AppDataContext.jsx";

function AppLayout() {
  const { meta } = useAppData();
  const { resetWorkspace } = useAppActions();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.16em] text-brand-600">
              v0
            </p>
            <h1 className="text-xl font-semibold text-foreground">
              Blueprint
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={resetWorkspace}
              className="justify-start"
            >
              Restaurar template
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
