import { Outlet } from "react-router-dom";
import { useAppActions } from "../../workspace-state/containers/AppDataProvider.jsx";

function AppLayout() {
  const { resetWorkspace } = useAppActions();

  return (
    <div className="terminal-root">
      <div className="app-shell">
        <header className="app-bar" onDoubleClick={resetWorkspace}>
          <span className="app-logo">blueprint</span>
        </header>
        <main className="app-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
