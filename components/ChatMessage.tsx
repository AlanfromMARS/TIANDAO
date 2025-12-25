
import React from 'react';
import ReactMarkdown from 'https://esm.sh/react-markdown@9';
import remarkGfm from 'https://esm.sh/remark-gfm@4';

interface ChatMessageProps {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ role, content }) => {
  const isAssistant = role === 'assistant';
  
  return (
    <div className={`mb-6 flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[85%] rounded-lg p-4 font-mono leading-relaxed transition-all duration-300 ${
        role === 'user' 
          ? 'bg-teal-900/20 border border-teal-500/30 text-teal-100' 
          : 'bg-slate-900/40 border border-slate-700/50 text-slate-200'
      }`}>
        <div className="text-[10px] uppercase opacity-40 mb-2 tracking-tighter flex justify-between">
          <span>{role}</span>
          {isAssistant && <span>Tao Strategist Engine</span>}
        </div>
        <div className="markdown-content prose prose-invert prose-sm max-w-none prose-teal prose-pre:bg-black/50 prose-pre:border prose-pre:border-teal-900/50 prose-table:border prose-table:border-teal-900/30 prose-th:text-teal-400 prose-td:text-slate-300">
           <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
