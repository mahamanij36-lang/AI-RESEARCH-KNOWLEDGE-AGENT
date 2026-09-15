import React, { useState } from 'react';
import { 
  Sparkles, 
  Upload, 
  Database, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Activity, 
  FileText,
  Lock,
  User,
  LogOut,
  FolderSync,
  ChevronDown,
  CheckCircle2,
  Zap
} from 'lucide-react';
import { EnvironmentType, ResearchProject, UserAccount } from '../../types';

interface NavbarProps {
  currentEnv: EnvironmentType;
  paperCount: number;
  totalChunks: number;
  currentUser: UserAccount | null;
  connectedProject: ResearchProject | null;
  onOpenUpload: () => void;
  onNavigateToEnv: (env: EnvironmentType) => void;
  onOpenLoginPortal: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentEnv,
  paperCount,
  totalChunks,
  currentUser,
  connectedProject,
  onOpenUpload,
  onNavigateToEnv,
  onOpenLoginPortal,
  onLogout
}) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-cyan-500/20 bg-[#050714]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo & Title */}
        <div 
          onClick={() => onNavigateToEnv('university_room')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-all">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Cpu className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                AI Research & Knowledge Agent
              </span>
              <span className="hidden sm:inline-block font-mono text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                v2.6 Multi-Agent RAG
              </span>
            </div>
            <p className="hidden md:block text-[11px] text-slate-400 font-mono line-clamp-1">
              Autonomous Multimodal Research Assistant with Vector DB & Claude
            </p>
          </div>
        </div>

        {/* Project Connect Status Pill */}
        <div className="hidden md:flex items-center">
          {connectedProject ? (
            <button
              onClick={onOpenLoginPortal}
              title="Click to Switch Project or Return to Login Gateway"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800/90 border border-emerald-500/30 hover:border-emerald-500/50 text-xs font-mono transition-all group"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-slate-400 group-hover:text-slate-200">PROJECT:</span>
              <span className="text-emerald-300 font-bold max-w-[170px] truncate">
                {connectedProject.code}
              </span>
              <span className="text-[10px] text-slate-500 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                {connectedProject.pingLatencyMs || 18}ms
              </span>
            </button>
          ) : (
            <button
              onClick={onOpenLoginPortal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 text-xs font-mono transition-all"
            >
              <Zap className="w-3.5 h-3.5 animate-pulse text-amber-400" />
              <span>No Project Connected (Click to Link)</span>
            </button>
          )}
        </div>

        {/* Right Section Actions & User Profile */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onNavigateToEnv('report_studio')}
            className="hidden sm:flex px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white text-xs font-mono border border-slate-700/80 items-center gap-1.5 transition-all"
          >
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            <span>Research Report</span>
          </button>

          <button
            onClick={onOpenUpload}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold shadow-md shadow-cyan-500/20 flex items-center gap-1.5 transition-all"
          >
            <Upload className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Upload Paper</span>
          </button>

          {/* User Profile / Login Button */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 p-1 pl-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 transition-all text-left"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-lg object-cover border border-cyan-500/40"
                />
                <div className="hidden lg:block text-left">
                  <div className="text-xs font-bold text-slate-200 truncate max-w-[110px]">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono truncate max-w-[110px]">
                    {currentUser.role}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 mr-1" />
              </button>

              {/* Dropdown Menu */}
              {isProfileMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-64 glass-panel-glow rounded-2xl p-3 border border-slate-700 bg-slate-950/95 shadow-2xl z-50 text-xs font-mono space-y-2"
                  onMouseLeave={() => setIsProfileMenuOpen(false)}
                >
                  <div className="p-2 border-b border-slate-800">
                    <div className="font-bold text-white text-xs font-sans">{currentUser.name}</div>
                    <div className="text-[11px] text-slate-400">{currentUser.email}</div>
                    <div className="text-[10px] text-cyan-400 mt-1 font-mono">{currentUser.institution}</div>
                  </div>

                  {connectedProject && (
                    <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800/80 text-[11px]">
                      <div className="text-slate-500 text-[10px]">CONNECTED WORKSPACE:</div>
                      <div className="text-emerald-300 font-bold truncate">{connectedProject.name}</div>
                      <div className="text-slate-400 text-[10px] truncate">{connectedProject.vectorCollection}</div>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      onOpenLoginPortal();
                    }}
                    className="w-full p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white flex items-center gap-2 transition-all text-left"
                  >
                    <FolderSync className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Switch Project / Gateway</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      onLogout();
                    }}
                    className="w-full p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 flex items-center gap-2 transition-all text-left"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenLoginPortal}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 flex items-center gap-1.5 transition-all font-mono"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Login & Connect</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
