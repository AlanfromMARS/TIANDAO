
import React, { useState, useEffect } from 'react';

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TutorialModal: React.FC<TutorialModalProps> = ({ isOpen, onClose }) => {
  const [tempKey, setTempKey] = useState('');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved'>('idle');

  useEffect(() => {
    const savedKey = localStorage.getItem('TAO_STRATEGY_API_KEY');
    if (savedKey) {
      setTempKey(savedKey);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveKey = () => {
    if (tempKey.trim()) {
      localStorage.setItem('TAO_STRATEGY_API_KEY', tempKey.trim());
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } else {
      localStorage.removeItem('TAO_STRATEGY_API_KEY');
      setSaveStatus('idle');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-2xl bg-[#0a0c10] border border-teal-500/30 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
        <div className="p-4 border-b border-teal-500/20 flex justify-between items-center bg-teal-900/10">
          <div className="flex items-center gap-2">
            <span className="text-teal-500 animate-pulse">◈</span>
            <h2 className="text-teal-400 font-bold font-mono uppercase tracking-widest text-sm">系统部署与安全配置中心</h2>
          </div>
          <button onClick={onClose} className="text-teal-500 hover:text-white transition-colors text-2xl px-2">×</button>
        </div>
        
        <div className="p-6 overflow-y-auto font-mono text-sm space-y-8 text-slate-300 tao-scroll">
          {/* API Key Override Section */}
          <section className="space-y-4 p-4 bg-teal-500/5 border border-teal-500/20 rounded-lg shadow-inner">
            <h3 className="text-teal-300 font-bold flex items-center gap-2">
              <span className="bg-teal-500/20 text-teal-400 px-1.5 py-0.5 rounded text-[10px]">LOCAL OVERRIDE</span>
              快速测试密钥注入 (API Key)
            </h3>
            <div className="space-y-2">
              <label className="text-[10px] text-teal-500/60 uppercase">填入您的密钥 (Gemini 或 DeepSeek)</label>
              <div className="flex gap-2">
                <input 
                  type="password"
                  value={tempKey}
                  onChange={(e) => setTempKey(e.target.value)}
                  placeholder="sk-..."
                  className="flex-1 bg-black/40 border border-teal-900/50 rounded px-3 py-2 text-teal-100 outline-none focus:border-teal-500/50 transition-colors"
                />
                <button 
                  onClick={handleSaveKey}
                  className={`px-4 py-2 rounded font-bold text-xs transition-all border ${
                    saveStatus === 'saved' 
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' 
                    : 'bg-teal-600/20 border-teal-500/30 text-teal-400 hover:bg-teal-500/30'
                  }`}
                >
                  {saveStatus === 'saved' ? '已保存' : '保存'}
                </button>
              </div>
              <p className="text-[10px] text-amber-500/70 italic leading-snug">
                ⚠️ 安全警告：此方法使用 localStorage 存储，仅供临时测试或预览。生产环境请务必使用环境变量 (Environment Variables) 以确保密钥不被泄露。
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-teal-300 font-bold flex items-center gap-2">
              <span className="bg-teal-500/20 text-teal-400 px-1.5 py-0.5 rounded text-[10px]">STEP 01</span>
              获取核心引擎密钥 (API Keys)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 bg-white/5 border border-white/10 rounded-lg group">
                <p className="text-teal-400 font-bold mb-1">Gemini (Google)</p>
                <a href="https://ai.google.dev/" target="_blank" className="text-[10px] bg-teal-500/20 px-2 py-1 rounded text-teal-300 hover:bg-teal-500/40 transition-colors inline-block">AI Studio →</a>
              </div>
              <div className="p-3 bg-white/5 border border-white/10 rounded-lg group">
                <p className="text-blue-400 font-bold mb-1">DeepSeek</p>
                <a href="https://platform.deepseek.com/" target="_blank" className="text-[10px] bg-blue-500/20 px-2 py-1 rounded text-blue-300 hover:bg-blue-500/40 transition-colors inline-block">DeepSeek Platform →</a>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-teal-300 font-bold flex items-center gap-2">
              <span className="bg-teal-500/20 text-teal-400 px-1.5 py-0.5 rounded text-[10px]">STEP 02</span>
              部署至 Vercel (Production Setup)
            </h3>
            <div className="bg-slate-900/80 p-4 rounded-lg border border-teal-900/50 space-y-3 text-xs leading-relaxed">
              <p>1. 在 Vercel 项目控制面板选择 <strong>Settings -> Environment Variables</strong>。</p>
              <p>2. 添加变量名 <code className="text-teal-400 font-bold">API_KEY</code>，并将您的密钥作为值填入。</p>
              <p>3. 重新部署 (Redeploy) 项目以使变量生效。</p>
            </div>
          </section>
        </div>

        <div className="p-4 bg-slate-900/50 text-center border-t border-teal-500/10">
          <button 
            onClick={onClose}
            className="w-full py-3 bg-teal-600/20 border border-teal-500/30 text-teal-400 hover:bg-teal-500/40 hover:text-white transition-all rounded-lg font-bold uppercase tracking-widest text-xs shadow-lg shadow-teal-500/5"
          >
            返回推演
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutorialModal;
