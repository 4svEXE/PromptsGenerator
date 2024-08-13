import { ReactNode } from "react";

import WithRouter from "./withRouter";

import WithLayout from "./withLayout";

export function ConnectProwiders({ children }: { children: ReactNode }) {
  return (
    <WithRouter>
      <WithLayout children={children} />
    </WithRouter>
  );
}
