import React, { useState } from 'react';
import { X, User, Mail, Lock, LogIn, ArrowRight, ShieldCheck } from 'lucide-react';
import { authStore } from '../../store/authStore';

export const AuthModal: React.FC = () => {
  const isOpen = authStore.getIsModalOpen();
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    authStore.login(name || email.split('@')[0] || 'Research Analyst', email || 'analyst@aitimemachine.io');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-[#0c101a] border border-cyan-500/30 rounded-2xl p-6 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-mono font-bold text-slate-100 text-sm">
                {mode === 'login' ? 'TIME MACHINE LOGIN' : mode === 'signup' ? 'CREATE ARCHAEOLOGIST ACCOUNT' : 'RESET CREDS'}
              </h2>
              <p className="text-[11px] text-slate-400 font-mono">Secure Session Authentication</p>
            </div>
          </div>
          <button
            onClick={() => authStore.closeAuthModal()}
            className="text-slate-400 hover:text-slate-200 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-slate-300">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Dr. Monish Warann"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[11px] font-mono text-slate-300">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="analyst@aitimemachine.io"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-mono text-slate-300">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-amber-500 hover:from-cyan-400 hover:to-amber-400 text-slate-950 font-bold text-xs shadow-lg transition-all"
          >
            <span>{mode === 'login' ? 'Authenticate Session' : 'Create Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800/80">
          {mode === 'login' ? (
            <>
              <span>Need an account?</span>
              <button onClick={() => setMode('signup')} className="text-cyan-400 hover:underline">
                Sign Up
              </button>
            </>
          ) : (
            <>
              <span>Already have an account?</span>
              <button onClick={() => setMode('login')} className="text-cyan-400 hover:underline">
                Log In
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
