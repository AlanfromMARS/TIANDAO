
import React from 'react';
import { SimulationPhase } from '../types';

interface HudHeaderProps {
  phase: SimulationPhase;
  ratio: string;
}

const HudHeader: React.FC<HudHeaderProps> = ({ phase, ratio }) => {
  return (
    <div className="w-full mb-6 select-none">
      <div className="flex flex-col border border-teal-500/30 bg-teal-900/10 p-4 rounded-lg hud-glow overflow-hidden relative">
        <div className="absolute top-0 left-0 h-1 bg-teal-500/50 animate-pulse w-full"></div>
        <div className="flex justify-between items-center text-xs text-teal-400 font-bold tracking-widest mb-2">
          <div className="flex items-center gap-2">
            <span className="animate-pulse">●</span>
            <span>☯️ 人生战略推演 v2.0</span>
          </div>
          <div className="flex gap-4">
             <span>[Dialectical-Flow]</span>
             <span className="text-white/50">{new Date().toLocaleTimeString()}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 text-sm font-mono mt-1">
          <div className="flex items-center">
            <span className="text-teal-500/60 mr-2">👤 阶段:</span>
            <span className="text-teal-300">[{phase}]</span>
          </div>
          <div className="flex items-center">
            <span className="text-teal-500/60 mr-2">⚖️ 模式:</span>
            <span className="text-teal-300">[{ratio || 'WAITING'}]</span>
          </div>
          <div className="flex-1 text-right text-teal-500/40 text-xs">
            SYS_STATUS: OPTIMAL_SYNC_ACTIVE
          </div>
        </div>
      </div>
    </div>
  );
};

export default HudHeader;
