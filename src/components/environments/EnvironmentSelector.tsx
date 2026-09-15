import React from 'react';
import { EnvironmentType } from '../../types';
import { 
  GraduationCap, 
  Terminal, 
  Library, 
  Database, 
  Globe, 
  Cpu, 
  ShieldCheck, 
  FileText 
} from 'lucide-react';

export interface EnvironmentMeta {
  id: EnvironmentType;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
  accent: string;
  description: string;
}

export const ENVIRONMENTS: EnvironmentMeta[] = [
  {
    id: 'university_room',
    title: 'University Research Room',
    subtitle: 'Academic Laboratory & Literature Workspace',
    icon: GraduationCap,
    tag: 'ENV-01',
    accent: 'border-cyan-500/40 text-cyan-400 bg-cyan-500/10',
    description: 'Human-like researcher workstation with warm ambient lighting, large multi-monitor displays, and reference library.'
  },
  {
    id: 'command_center',
    title: 'AI Command Center',
    subtitle: 'Multi-Agent Orchestration Telemetry',
    icon: Terminal,
    tag: 'ENV-02',
    accent: 'border-purple-500/40 text-purple-400 bg-purple-500/10',
    description: 'Futuristic command console with central AI hologram, active inter-agent IPC buses, and live dispatch logs.'
  },
  {
    id: 'digital_library',
    title: 'Digital Research Library',
    subtitle: '3D Knowledge Repository & Indexed Papers',
    icon: Library,
    tag: 'ENV-03',
    accent: 'border-blue-500/40 text-blue-400 bg-blue-500/10',
    description: 'Thousands of floating scientific documents, PDF page previews, and dynamic vector gravity retrieval.'
  },
  {
    id: 'rag_lab',
    title: 'Vector Database Laboratory',
    subtitle: 'Dense Embeddings & Qdrant Cluster',
    icon: Database,
    tag: 'ENV-04',
    accent: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10',
    description: 'Glowing vector server racks, chunking pipelines, and high-dimensional semantic search hyperplanes.'
  },
  {
    id: 'web_research',
    title: 'Web Research Center',
    subtitle: 'Live Academic Crawlers & ArXiv Engine',
    icon: Globe,
    tag: 'ENV-05',
    accent: 'border-sky-500/40 text-sky-400 bg-sky-500/10',
    description: 'Holographic browser terminals extracting papers from arXiv, CrossRef, PubMed, and global web sources.'
  },
  {
    id: 'ai_analysis',
    title: 'AI Analysis Laboratory',
    subtitle: 'Cross-Paper Matrix & Benchmark Dissection',
    icon: Cpu,
    tag: 'ENV-06',
    accent: 'border-amber-500/40 text-amber-400 bg-amber-500/10',
    description: 'Multi-document comparative analysis of algorithms, datasets, performance gains, and research gaps.'
  },
  {
    id: 'verification_center',
    title: 'Verification Center',
    subtitle: 'Hallucination Sentinel & Claim Radar',
    icon: ShieldCheck,
    tag: 'ENV-07',
    accent: 'border-rose-500/40 text-rose-400 bg-rose-500/10',
    description: 'Security-grade evidence inspection validating every premise against exact source page text.'
  },
  {
    id: 'report_studio',
    title: 'Research Report Studio',
    subtitle: 'IMRaD Whitepaper & PDF Export Suite',
    icon: FileText,
    tag: 'ENV-08',
    accent: 'border-indigo-500/40 text-indigo-400 bg-indigo-500/10',
    description: 'Academic presentation studio for reviewing, editing, compiling, and exporting publication-ready reports.'
  }
];

interface EnvironmentSelectorProps {
  currentEnv: EnvironmentType;
  onSelectEnv: (env: EnvironmentType) => void;
}

export const EnvironmentSelector: React.FC<EnvironmentSelectorProps> = ({
  currentEnv,
  onSelectEnv
}) => {
  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-thin">
      <div className="flex items-center gap-2 min-w-max">
        {ENVIRONMENTS.map((env) => {
          const Icon = env.icon;
          const isSelected = env.id === currentEnv;

          return (
            <button
              key={env.id}
              onClick={() => onSelectEnv(env.id)}
              className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs transition-all border ${
                isSelected
                  ? `${env.accent} font-semibold shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-400/40`
                  : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[10px] opacity-75">{env.tag}</span>
                  <span className="truncate">{env.title}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
