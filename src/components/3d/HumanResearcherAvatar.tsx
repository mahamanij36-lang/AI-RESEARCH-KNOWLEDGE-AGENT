import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Sparkles, Laptop, ShieldCheck, BookOpen, Activity, Cpu } from 'lucide-react';

export interface CharacterProfile {
  id: string;
  name: string;
  role: string;
  title: string;
  department: string;
  avatarType: 'female_engineer' | 'professor' | 'male_student' | 'data_scientist' | 'ai_robot';
  status: string;
  quote: string;
  accentColor: string;
}

export const CHARACTERS: CharacterProfile[] = [
  {
    id: 'char-1',
    name: 'Dr. Elena Vance',
    role: 'Lead AI Engineer & Orchestrator Specialist',
    title: 'Ph.D. in Autonomous Multi-Agent Systems',
    department: 'Neural Robotics & Cognitive Computing',
    avatarType: 'female_engineer',
    status: 'Supervising RAG Agent Pipeline',
    quote: '"Autonomous agents require deterministic citation grounding to prevent extrapolation."',
    accentColor: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'char-2',
    name: 'Prof. Marcus Thorne',
    role: 'Senior Academic Supervisor',
    title: 'Chair of Machine Learning & NLP',
    department: 'Laboratory of Distributed Intelligence',
    avatarType: 'professor',
    status: 'Reviewing Cross-Paper Empirical Benchmarks',
    quote: '"Verify every premise. Empirical validity is non-negotiable in scientific research."',
    accentColor: 'from-purple-500 to-indigo-600'
  },
  {
    id: 'char-3',
    name: 'David Chen',
    role: 'Graduate Research Fellow',
    title: 'M.S. Candidate in Computer Vision & NLP',
    department: 'Multimodal Information Retrieval Group',
    avatarType: 'male_student',
    status: 'Analyzing ColPali Diagram Representations',
    quote: '"Synthesizing 40-page papers into structured methodology matrices in seconds."',
    accentColor: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'char-4',
    name: 'Dr. Priya Sharma',
    role: 'Data Scientist & Vector Architect',
    title: 'Principal Research Scientist',
    department: 'High-Dimensional Embeddings & Topology',
    avatarType: 'data_scientist',
    status: 'Optimizing Qdrant HNSW Graph Connectivity',
    quote: '"Hybrid dense-sparse search bridges lexical precision with conceptual intuition."',
    accentColor: 'from-amber-500 to-rose-600'
  },
  {
    id: 'char-5',
    name: 'AURA-7',
    role: 'Autonomous Research Companion',
    title: 'Sentient Neural Retrieval Sub-unit',
    department: 'Agentic Core Protocol v4.2',
    avatarType: 'ai_robot',
    status: 'Telemetry Active & Hallucination Sentinel Online',
    quote: '"Real-time evidence verification scan operating at 99.8% factual integrity."',
    accentColor: 'from-cyan-400 to-purple-500'
  }
];

interface HumanResearcherAvatarProps {
  selectedCharacterId?: string;
  onSelectCharacter?: (char: CharacterProfile) => void;
  className?: string;
  mode?: 'full' | 'compact' | 'hud';
}

export const HumanResearcherAvatar: React.FC<HumanResearcherAvatarProps> = ({
  selectedCharacterId = 'char-1',
  onSelectCharacter,
  className = '',
  mode = 'full'
}) => {
  const [currentId, setCurrentId] = useState(selectedCharacterId);
  const character = CHARACTERS.find(c => c.id === currentId) || CHARACTERS[0];

  const handleSelect = (char: CharacterProfile) => {
    setCurrentId(char.id);
    if (onSelectCharacter) onSelectCharacter(char);
  };

  return (
    <div className={`glass-panel rounded-2xl p-5 border border-cyan-500/20 relative overflow-hidden ${className}`}>
      {/* Background Holographic Glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header with Switcher Tabs */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <User className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-cyan-400 font-mono">RESEARCH TEAM PERSONNEL</div>
            <div className="text-sm font-semibold text-slate-200">Interactive 3D Researcher Profiles</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
          {CHARACTERS.map(c => (
            <button
              key={c.id}
              onClick={() => handleSelect(c)}
              title={`${c.name} (${c.role})`}
              className={`px-2.5 py-1 text-xs rounded-lg transition-all flex items-center gap-1.5 ${
                c.id === currentId
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-medium shadow-sm shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {c.avatarType === 'ai_robot' ? <Cpu className="w-3 h-3 text-cyan-400" /> : <User className="w-3 h-3" />}
              <span className="hidden sm:inline">{c.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Character Display Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={character.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center"
        >
          {/* Visual Avatar / Holographic Representation */}
          <div className="md:col-span-4 relative flex flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-900/90 to-slate-950/90 rounded-xl border border-slate-800">
            {/* Holographic Ring animation */}
            <div className="relative w-28 h-28 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/40"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-2 rounded-full border border-purple-500/40"
              />
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-slate-800 via-slate-900 to-cyan-950/80 p-0.5 shadow-inner flex items-center justify-center border border-cyan-400/30">
                {character.avatarType === 'ai_robot' ? (
                  <div className="text-4xl">🤖</div>
                ) : character.avatarType === 'female_engineer' ? (
                  <div className="text-4xl">👩‍💻</div>
                ) : character.avatarType === 'professor' ? (
                  <div className="text-4xl">👨‍🏫</div>
                ) : character.avatarType === 'data_scientist' ? (
                  <div className="text-4xl">👩‍🔬</div>
                ) : (
                  <div className="text-4xl">👨‍🎓</div>
                )}
              </div>

              {/* Status pulse */}
              <div className="absolute bottom-1 right-2 flex items-center gap-1 bg-slate-950 px-2 py-0.5 rounded-full border border-emerald-500/40 text-[10px] text-emerald-400 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                ONLINE
              </div>
            </div>

            <div className="mt-3 text-center">
              <h4 className="text-base font-bold text-slate-100 flex items-center justify-center gap-1.5">
                {character.name}
              </h4>
              <p className="text-xs text-cyan-400 font-mono mt-0.5">{character.role}</p>
            </div>
          </div>

          {/* Details and Telemetry */}
          <div className="md:col-span-8 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-md bg-slate-800/80 text-slate-300 text-xs font-mono border border-slate-700">
                  {character.title}
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-300 text-xs font-mono border border-cyan-500/20 flex items-center gap-1">
                  <Activity className="w-3 h-3 text-cyan-400" />
                  {character.department}
                </span>
              </div>

              <blockquote className="italic text-sm text-slate-300 bg-slate-900/60 p-3 rounded-lg border-l-2 border-cyan-400 my-2">
                {character.quote}
              </blockquote>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <div className="bg-slate-950/50 p-2.5 rounded-lg border border-slate-800">
                <div className="text-slate-400 flex items-center gap-1.5 font-mono text-[11px]">
                  <Laptop className="w-3 h-3 text-cyan-400" /> CURRENT WORKSPACE
                </div>
                <div className="text-slate-200 font-medium mt-1 truncate">{character.status}</div>
              </div>
              <div className="bg-slate-950/50 p-2.5 rounded-lg border border-slate-800">
                <div className="text-slate-400 flex items-center gap-1.5 font-mono text-[11px]">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" /> VERIFICATION ROLE
                </div>
                <div className="text-emerald-300 font-medium mt-1">Grounding & Citation Sentinel</div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
