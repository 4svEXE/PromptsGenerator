import React from "react";
// import Sidebar from "../components/layouts/sidebar";

interface WithLayoutProps {
  children: React.ReactNode;
}


export default function WithLayout({ children }: WithLayoutProps) {
  return (
    <div className="bg-white dark:bg-black h-[100vh] overflow-hidden">
      {/* <Sidebar toggleTheme={toggleTheme} /> */}

      <div className="flex flex-col">{children}</div>
    </div>
  );
}
