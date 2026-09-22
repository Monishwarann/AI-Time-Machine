import React, { useState } from 'react';
import { Bot, Send, Sparkles, User, ShieldCheck, ExternalLink, HelpCircle } from 'lucide-react';
import { TimeMachineProject, ChatMessage } from '../../types/timeMachine';
import { askHistoricalAssistant } from '../../engine/aiAssistantEngine';

interface HistoricalChatbotProps {
  project: TimeMachineProject;
}

export const HistoricalChatbot: React.FC<HistoricalChatbotProps> = ({ project }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-msg',
      sender: 'assistant',
      text: `Hello! I am the **AI Historical Assistant** for **${project.name}**.\n\nI can answer questions grounded directly in the physical evidence of your uploaded artifact across **${project.estimatedCoverage}**.\n\nTry clicking one of the preset research questions below or type your own question!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const presetQueries = [
    'What was probably the first major change?',
    'Which features were added later?',
    'Show evidence for the database change.',
    'Which parts are uncertain?',
    'What information is missing?'
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsLoading(true);

    try {
      const assistantMsg = await askHistoricalAssistant(project, query, messages);
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#0b0e17]/90 border border-cyan-500/20 rounded-2xl p-6 space-y-6 font-mono flex flex-col h-[650px] shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-slate-100 text-sm">AI HISTORICAL ASSISTANT (RAG GROUNDED)</h2>
            <p className="text-xs text-slate-400">Answers strictly using project evidence. No unsupported claims.</p>
          </div>
        </div>

        <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2.5 py-0.5 rounded-full font-bold">
          EVIDENCE GROUNDED
        </span>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap gap-2 text-xs">
        {presetQueries.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(q)}
            className="px-3 py-1 rounded-xl bg-slate-900 hover:bg-cyan-950/80 text-cyan-300 border border-slate-800 hover:border-cyan-500/40 transition-all text-[11px]"
          >
            "{q}"
          </button>
        ))}
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex items-start space-x-3 text-xs ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.sender === 'assistant' && (
              <div className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`p-4 rounded-2xl max-w-xl space-y-2 leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-cyan-500/20 border border-cyan-500/30 text-cyan-100 self-end'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-200'
              }`}
            >
              <div className="whitespace-pre-line">{msg.text}</div>

              {/* Citations Panel */}
              {msg.citations && msg.citations.length > 0 && (
                <div className="pt-2 border-t border-slate-800/80 space-y-1">
                  <span className="text-[10px] text-amber-400 font-bold block uppercase">Evidence Proof Citations:</span>
                  {msg.citations.map((c, i) => (
                    <div key={i} className="text-[10px] bg-slate-950 p-1.5 rounded border border-slate-900 text-cyan-300 flex items-center justify-between">
                      <span>{c.title} — {c.reference}</span>
                      <span className="uppercase text-emerald-400">{c.confidence}</span>
                    </div>
                  ))}
                </div>
              )}

              <span className="text-[9px] text-slate-400 block text-right">{msg.timestamp}</span>
            </div>

            {msg.sender === 'user' && (
              <div className="w-7 h-7 rounded-lg bg-amber-950 border border-amber-800 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center space-x-2 text-xs text-cyan-400 animate-pulse">
            <Bot className="w-4 h-4 animate-spin" />
            <span>Analyzing artifact evidence vectors...</span>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="flex items-center space-x-2 pt-2 border-t border-slate-800"
      >
        <input
          type="text"
          value={inputQuery}
          onChange={e => setInputQuery(e.target.value)}
          placeholder="Ask a historical question about this project's evolution..."
          className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 font-mono focus:outline-none focus:border-cyan-500"
        />
        <button
          type="submit"
          className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-amber-400 hover:from-cyan-400 hover:to-amber-300 text-slate-950 font-bold shadow-lg transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
