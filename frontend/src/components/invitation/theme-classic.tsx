import type { ReactNode } from 'react';

export default function ClassicTheme({ children }: { children: ReactNode }) {
  return (
    <div className="theme-classic min-h-screen" style={cssVars('--theme-')}>
      {children}
    </div>
  );
}

function cssVars(prefix: string) {
  return {} as React.CSSProperties;
}
