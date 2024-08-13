import { ReactNode } from "react";

import WithRouter from "./withRouter";
import WithTheme from "./withTheme";
import WithLayout from "./withLayout";

export function ConnectProwiders({ children }: { children: ReactNode }) {
  return (
    <WithRouter>
      <WithTheme>
        {({ toggleTheme }) => (
          <WithLayout children={children} toggleTheme={toggleTheme} />
        )}
      </WithTheme>
    </WithRouter>
  );
}
