
import React from 'react';

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TutorialModal: React.FC<TutorialModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-2xl bg-[#0a0c10] border border-teal-500/30 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
        <div className="p-4 border-b border-teal-500/20 flex justify-between items-center bg-teal-900/10">
          <h2 className="text-teal-400 font-bold font-mono uppercase tracking-widest">部署与 API 配置指南</h2>
          <button onClick={onClose} className="text-teal-500 hover:text-white transition-colors text-2xl px-2">×</button>
        </div>
        
        <div className="p-6 overflow-y-auto font-mono text-sm space-y-6 text-slate-300">
          <section>
            <h3 className="text-teal-300 mb-2 border-b border-teal-500/10 pb-1">1. 获取 API Key</h3>
            <p className="mb-2">- **Gemini**: 访问 <a href="https://ai.google.dev/" target="_blank" className="text-teal-400 underline decoration-teal-500/30 hover:decoration-teal-500">Google AI Studio</a> 获取密钥。</p>
            <p>- **DeepSeek**: 访问 <a href="https://platform.deepseek.com/" target="_blank" className="text-teal-400 underline decoration-teal-500/30 hover:decoration-teal-500">DeepSeek 平台</a> 获取密钥。</p>
          </section>

          <section>
            <h3 className="text-teal-300 mb-2 border-b border-teal-500/10 pb-1">2. 配置环境变量</h3>
            <p className="mb-2">在部署环境（如 Vercel, Zeabur, Netlify）的 **Environment Variables** 面板中，添加以下键值对：</p>
            <div className="bg-black/40 p-3 rounded border border-slate-700/50 mb-2 font-bold">
              <code className="text-emerald-400">API_KEY = "您的实际密钥内容"</code>
            </div>
            <p className="text-xs text-slate-500 italic">注意：主界面切换引擎时，系统会统一调用 `API_KEY` 变量。请确保填写的 Key 与当前选中的引擎匹配。</p>
          </section>

          <section>
            <h3 className="text-teal-300 mb-2 border-b border-teal-500/10 pb-1">3. 部署方式</h3>
            <p className="mb-1">点击主界面右上角的 **[GEMINI/DEEPSEEK]** 按钮，系统将自动切换底层的请求协议与提示词架构。</p>
          </section>

          <div className="bg-teal-900/10 p-4 border border-teal-500/20 rounded-lg">
            <h3 className="text-teal-300 mb-2 flex items-center gap-2">
              <span className="text-xs">💡</span> 推演建议
            </h3>
            <p className="text-xs leading-relaxed">
              如果您需要极速的推演反馈，建议切换至 **DEEPSEEK**。如果您需要更深层的战略逻辑与哲学推导，**GEMINI (3-Pro)** 表现更佳。
            </p>
          </div>
        </div>

        <div className="p-4 bg-slate-900/50 text-center border-t border-teal-500/10">
          <button 
            onClick={onClose}
            className="px-8 py-2 bg-teal-600/20 border border-teal-500/30 text-teal-400 hover:bg-teal-500/40 transition-all rounded font-bold uppercase tracking-widest text-xs"
          >
            我已了解，返回系统
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutorialModal;
