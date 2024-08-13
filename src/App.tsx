import { Suspense } from "react";
import Routes from "./app/pages/routes";

export default function App() {
  return (
    <>
      <Suspense fallback={<>loading...</>}>
        <Routes />
      </Suspense>
    </>
  );
}
