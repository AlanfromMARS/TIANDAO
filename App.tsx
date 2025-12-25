
import React, { useState, useEffect, useRef } from 'react';
import { SimulationPhase, Message, AIModel } from './types';
import { getGeminiResponse } from './geminiService';
import { getDeepSeekResponse } from './deepseekService';
import HudHeader from './components/HudHeader';
import ChatMessage from './components/ChatMessage';
import TutorialModal from './components/TutorialModal';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: ` >_ [人生战略推演] | [Dialectical-Flow] | [v2.0] \n\n欢迎进入人生战略推演系统。我是您的道家战略架构师。我们将通过天道与人道的辩证演化，为您重构人生蓝图。\n\n**PHASE 1: STATUS INJECTION & DIAGNOSIS**\n\n请告知您当前的人生坐标：\n1. **年龄阶段** (e.g. 30岁)\n2. **职业身份** (e.g. 互联网中层/创业者)\n3. **资产状况** (e.g. 负债/小康/财务自由)\n4. **身体状况** (e.g. 长期加班/健康稳定)`
    }
  ]);
  const [phase, setPhase] = useState<SimulationPhase>(SimulationPhase.DIAGNOSIS);
  const [ratio, setRatio] = useState<string>('N/A');
  const [activeModel, setActiveModel] = useState<AIModel>(AIModel.GEMINI);
  const [isTutorialOpen, setIsTutorialOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      let response = '';
      
      if (activeModel === AIModel.GEMINI) {
        const history = [...messages, { role: 'user', content: userMsg }].map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        }));
        response = await getGeminiResponse(history);
      } else {
        const history = [...messages, { role: 'user', content: userMsg }].map(m => ({
          role: m.role === 'assistant' ? 'assistant' : 'user',
          content: m.content
        }));
        response = await getDeepSeekResponse(history);
      }

      if (response) {
        setMessages(prev => [...prev, { role: 'assistant', content: response }]);
        updateSimulationState(response);
      }
    } catch (error: any) {
      console.error('API Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: ` >_ [ERROR] | 引擎 [${activeModel}] 通讯中断: ${error.message || '未知异常'}。请点击右上角查看 [部署教程] 确认 API 配置。` 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const updateSimulationState = (content: string) => {
    if (content.includes('PHASE_2') || content.includes('人之道') || content.includes('Conflict')) {
      setPhase(SimulationPhase.ANALYSIS);
    } else if (content.includes('PHASE_3') || content.includes('Fusion') || content.includes('Optimal_Ratio')) {
      setPhase(SimulationPhase.FUSION);
      const ratioMatch = content.match(/(\d+%\s*Man|\d+%\s*人)/i);
      if (ratioMatch) setRatio(ratioMatch[0]);
    } else if (content.includes('PHASE_4') || content.includes('Tactical') || content.includes('OKRs')) {
      setPhase(SimulationPhase.DEPLOYMENT);
    } else if (content.includes('PHASE_5') || content.includes('Black Swan') || content.includes('黑天鹅')) {
      setPhase(SimulationPhase.RISK);
    }
  };

  const toggleModel = () => {
    setActiveModel(prev => prev === AIModel.GEMINI ? AIModel.DEEPSEEK : AIModel.GEMINI);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-[#0a0c10]">
      <div className="w-full max-w-4xl h-[90vh] flex flex-col">
        <HudHeader 
          phase={phase} 
          ratio={ratio} 
          activeModel={activeModel} 
          onToggleModel={toggleModel} 
          onOpenTutorial={() => setIsTutorialOpen(true)}
        />

        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto pr-2 tao-scroll space-y-4 mb-4"
        >
          {messages.map((m, i) => (
            <ChatMessage key={i} role={m.role} content={m.content} />
          ))}
          {loading && (
            <div className="flex justify-start items-center gap-3 text-teal-500/50 italic text-sm font-mono animate-pulse">
              <span>☯️</span>
              <span>推演中 ({activeModel} Reasoning...)</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative flex gap-2 p-2 bg-slate-900/90 border border-teal-900/50 rounded-lg shadow-2xl">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              placeholder={`使用 ${activeModel} 引擎推演您的下一步策略...`}
              className="flex-1 bg-transparent border-none outline-none text-teal-100 placeholder-teal-900/60 px-4 py-3 font-mono"
            />
            <button 
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-teal-600/20 hover:bg-teal-600/40 border border-teal-500/30 text-teal-400 font-bold px-6 py-2 rounded-md transition-all flex items-center gap-2 group"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-teal-400 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span className="group-hover:translate-x-0.5 transition-transform">EXE</span>
                  <span className="text-[10px] opacity-50 font-normal">⏎</span>
                </>
              )}
            </button>
          </div>
        </form>
        
        <div className="mt-4 text-[10px] text-center text-teal-900/60 font-mono tracking-widest uppercase">
          Grand Strategist Engine: {activeModel} | Neural Link Synchronized | v2.0
        </div>
      </div>

      <TutorialModal isOpen={isTutorialOpen} onClose={() => setIsTutorialOpen(false)} />
    </div>
  );
};

export default App;
