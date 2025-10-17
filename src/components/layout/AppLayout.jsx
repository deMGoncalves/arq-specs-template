import { Outlet } from "react-router-dom";
import { Card, CardContent } from "../ui/card.jsx";
import { Button } from "../ui/button.jsx";
import { Badge } from "../ui/badge.jsx";
import { Separator } from "../ui/separator.jsx";
import { useAppActions } from "../../context/AppDataContext.jsx";

function AppLayout() {
  const { resetWorkspace } = useAppActions();

  return (
    <div className="terminal-root">
      <Card className="terminal-shell">
        <div className="terminal-header">
          <div className="terminal-header__window">
            <span className="terminal-dot terminal-dot--red" />
            <span className="terminal-dot terminal-dot--yellow" />
            <span className="terminal-dot terminal-dot--green" />
            <span className="terminal-title">blueprint@local:~</span>
            <Badge variant="outline" className="terminal-badge">
              v0
            </Badge>
          </div>
          <div className="terminal-header__actions">
            <Button variant="ghost" size="sm" onClick={resetWorkspace}>
              Restaurar template
            </Button>
          </div>
        </div>
        <Separator className="terminal-separator" />
        <CardContent className="terminal-body">
          <div className="terminal-session">
            <div className="terminal-line">
              <span className="terminal-prompt">blueprint@local:~$</span>
              <span className="terminal-command">open arc42-01</span>
            </div>
            <div className="terminal-content">
              <Outlet />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AppLayout;
