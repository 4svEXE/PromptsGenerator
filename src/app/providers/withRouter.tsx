import React from 'react';
import { BrowserRouter } from 'react-router-dom';

interface WithRouterProps {
  children: React.ReactNode;
}

export default function WithRouter({ children }: WithRouterProps) {
  return (
    <BrowserRouter basename="/PromptsGenerator/">
        {children}
    </BrowserRouter>
  );
}
