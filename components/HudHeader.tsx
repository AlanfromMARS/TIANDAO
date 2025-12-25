
import React from 'react';
import { SimulationPhase, AIModel } from '../types';

interface HudHeaderProps {
  phase: SimulationPhase;
  ratio: string;
  activeModel: AIModel;
  onToggleModel: () => void;
  onOpenTutorial: () => void;
}

const HudHeader: React.FC<HudHeaderProps> = ({ phase, ratio, activeModel, onToggleModel, onOpenTutorial }) => {
  return (
    <div className="w-full mb-6 select-none">
      <div className="flex flex-col border border-teal-500/30 bg-teal-900/10 p-4 rounded-lg hud-glow overflow-hidden relative">
        <div className="absolute top-0 left-0 h-1 bg-teal-500/50 animate-pulse w-full"></div>
        <div className="flex justify-between items-center text-xs text-teal-400 font-bold tracking-widest mb-2">
          <div className="flex items-center gap-2">
            <span className="animate-pulse">●</span>
            <span>☯️ 人生战略推演 v2.0</span>
          </div>
          <div className="flex gap-4 items-center">
             <button 
               onClick={onOpenTutorial}
               className="hover:text-white transition-colors border border-teal-500/20 px-2 py-0.5 rounded bg-teal-500/5"
             >
               [部署教程/GUIDE]
             </button>
             <span>[Dialectical-Flow]</span>
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
          <div className="flex items-center ml-auto">
            <span className="text-teal-500/60 mr-2">⚙️ 引擎:</span>
            <button 
              onClick={onToggleModel}
              className={`px-3 py-0.5 rounded border transition-all font-bold ${
                activeModel === AIModel.GEMINI 
                ? 'border-teal-500 bg-teal-500/20 text-teal-200' 
                : 'border-blue-500 bg-blue-500/20 text-blue-200'
              }`}
            >
              {activeModel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HudHeader;
