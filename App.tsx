import React from 'react';
import { VisualNovelEngine } from './components/VisualNovelEngine';

const App: React.FC = () => {
  return (
    <div className="antialiased text-slate-200 bg-slate-950 min-h-screen">
      <VisualNovelEngine />
    </div>
  );
};

export default App;
