import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  Lock, 
  Mail, 
  Cpu, 
  Database, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  FolderPlus, 
  RefreshCw, 
  ExternalLink, 
  Key, 
  Globe, 
  Layers, 
  Users, 
  Server, 
  FileText, 
  Activity, 
  Zap, 
  User, 
  ChevronRight,
  GraduationCap
} from 'lucide-react';
import { ResearchProject, UserAccount } from '../../types';
import { MOCK_PROJECTS, MOCK_USERS } from '../../data/mockProjects';

interface LoginPageProps {
  currentUser: UserAccount | null;
  connectedProject: ResearchProject | null;
  projects: ResearchProject[];
  onLogin: (user: UserAccount) => void;
  onConnectProject: (project: ResearchProject) => void;
  onCreateProject: (newProject: ResearchProject) => void;
  onEnterWorkspace: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  currentUser,
  connectedProject,
  projects,
  onLogin,
  onConnectProject,
  onCreateProject,
  onEnterWorkspace
}) => {
  const [activeStep, setActiveStep] = useState<'auth' | 'project_connect'>(
    currentUser ? 'project_connect' : 'auth'
  );

  // Auth form states
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState(currentUser?.email || 'e.rostova@csail.mit.edu');
  const [password, setPassword] = useState('••••••••••••');
  const [institution, setInstitution] = useState('MIT CSAIL');
  const [fullName, setFullName] = useState('Dr. Elena Rostova');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Project connect states
  const [isConnecting, setIsConnecting] = useState<string | null>(null);
  const [connectionStage, setConnectionStage] = useState<string>('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // New project form
  const [newProjName, setNewProjName] = useState('');
  const [newProjCode, setNewProjCode] = useState('');
  const [newProjDesc, setNewProjDesc] = useState('');
  const [newProjDiscipline, setNewProjDiscipline] = useState('Computer Science & AI');
  const [newProjCollection, setNewProjCollection] = useState('qdrant_custom_col_1536');
  const [newProjModel, setNewProjModel] = useState('Claude 3.7 Sonnet & Gemini 2.5 Pro');

  // Handle standard login
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);

    setTimeout(() => {
      // Find matching or create session user
      const existing = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
      const user: UserAccount = existing || {
        id: `user-${Date.now()}`,
        name: fullName || 'Research Scholar',
        email: email,
        institution: institution || 'Academic Research Institute',
        role: 'Principal Investigator',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        orcidId: '0000-0002-8419-7721',
        connectedProjectId: projects[0]?.id || 'proj-rag-2026',
        apiKeyConfigured: true,
        researchInterests: ['Multi-Agent RAG', 'Vector Database', 'Literature Synthesis']
      };

      onLogin(user);
      setIsAuthenticating(false);
      setActiveStep('project_connect');
    }, 750);
  };

  // Quick 1-click login with pre-set researcher profile
  const handleQuickProfileSelect = (user: UserAccount) => {
    setIsAuthenticating(true);
    setTimeout(() => {
      onLogin(user);
      setIsAuthenticating(false);
      setActiveStep('project_connect');
    }, 450);
  };

  // Instant 1-click Demo Entry directly into workspace
  const handleInstantDemoEntry = () => {
    const demoUser = MOCK_USERS[0];
    const demoProject = projects[0] || MOCK_PROJECTS[0];
    onLogin(demoUser);
    onConnectProject(demoProject);
    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#06b6d4', '#3b82f6', '#8b5cf6', '#10b981']
      });
    } catch (e) {
      // safe fallback
    }
    setTimeout(() => {
      onEnterWorkspace();
    }, 350);
  };

  // Connect to a project with live simulated telemetry handshake
  const handleConnect = (project: ResearchProject) => {
    setIsConnecting(project.id);
    setConnectionStage('Pinging Qdrant HNSW Vector Cluster at ' + project.qdrantClusterEndpoint + '...');

    setTimeout(() => {
      setConnectionStage('Binding collection namespace: ' + project.vectorCollection + ' (1536-D)...');
    }, 600);

    setTimeout(() => {
      setConnectionStage('Synchronizing 8 Multi-Agent IPC channels with ' + project.primaryModel + '...');
    }, 1200);

    setTimeout(() => {
      setConnectionStage('Establishing zero-tolerance NLI verification sentinel...');
    }, 1800);

    setTimeout(() => {
      setIsConnecting(null);
      setConnectionStage('');
      onConnectProject(project);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 75,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#06b6d4', '#3b82f6', '#8b5cf6', '#10b981']
        });
      } catch (err) {
        // Safe fallback
      }
    }, 2200);
  };

  // Handle new project creation
  const handleCreateProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjName.trim()) return;

    const generatedCode = newProjCode.trim() 
      ? newProjCode.toUpperCase() 
      : `PROJ-${newProjName.slice(0, 3).toUpperCase()}-${Date.now().toString().slice(-4)}`;

    const newProject: ResearchProject = {
      id: `proj-${Date.now()}`,
      name: newProjName,
      code: generatedCode,
      description: newProjDesc || 'Custom scientific research workspace initialized with agentic vector indexing.',
      discipline: newProjDiscipline,
      vectorCollection: newProjCollection || `qdrant_${generatedCode.toLowerCase()}`,
      qdrantClusterEndpoint: 'https://qdrant.cluster.research.internal:6333',
      primaryModel: newProjModel,
      indexedPapersCount: 0,
      totalChunksCount: 0,
      collaboratorsCount: 1,
      syncStatus: 'connected',
      lastSyncTime: 'Just now',
      tags: ['Custom Workspace', 'Agentic RAG'],
      leadInvestigator: currentUser?.name || 'Lead Scientist',
      securityLevel: 'Confidential Laboratory',
      pingLatencyMs: 19
    };

    onCreateProject(newProject);
    onConnectProject(newProject);
    setIsCreateModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Banner Header */}
      <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 border border-cyan-500/30 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-2.5">
              <Lock className="w-3.5 h-3.5" />
              AUTHENTICATION & WORKSPACE GATEWAY
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Researcher Portal & Project Connect
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1.5 max-w-2xl leading-relaxed">
              Authenticate via verified institutional credentials, select or provision your scientific 
              research project, and establish live vector database namespace connections.
            </p>
          </div>

          {/* Stepper Status Indicators & Fast Demo Button */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleInstantDemoEntry}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-mono font-bold bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 shadow-lg shadow-orange-500/20 transition-all hover:scale-105"
            >
              <Zap className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
              <span>1-Click Demo Entry</span>
            </button>

            <button
              onClick={() => setActiveStep('auth')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-mono border transition-all ${
                activeStep === 'auth'
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-lg shadow-cyan-500/10 font-bold'
                  : currentUser
                  ? 'bg-slate-900/90 text-emerald-300 border-emerald-500/30'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800'
              }`}
            >
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                currentUser ? 'bg-emerald-500/20 text-emerald-300' : 'bg-cyan-500/20 text-cyan-300'
              }`}>
                {currentUser ? <CheckCircle2 className="w-3.5 h-3.5" /> : '1'}
              </div>
              <span>1. Researcher Auth</span>
            </button>

            <ChevronRight className="w-4 h-4 text-slate-600 hidden sm:block" />

            <button
              onClick={() => currentUser && setActiveStep('project_connect')}
              disabled={!currentUser}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-mono border transition-all ${
                activeStep === 'project_connect'
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-lg shadow-cyan-500/10 font-bold'
                  : connectedProject
                  ? 'bg-slate-900/90 text-emerald-300 border-emerald-500/30'
                  : 'bg-slate-900/60 text-slate-500 border-slate-800 cursor-not-allowed'
              }`}
            >
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                connectedProject ? 'bg-emerald-500/20 text-emerald-300' : 'bg-cyan-500/20 text-cyan-300'
              }`}>
                {connectedProject ? <CheckCircle2 className="w-3.5 h-3.5" /> : '2'}
              </div>
              <span>2. Project Connect</span>
            </button>
          </div>
        </div>

        {/* Background glow orb */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Main Flow Content */}
      <AnimatePresence mode="wait">
        {activeStep === 'auth' ? (
          <motion.div
            key="auth-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            {/* Left Column: Login / Register Form */}
            <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-cyan-400" />
                    {authMode === 'signin' ? 'Researcher Sign In' : 'Register Scholar Account'}
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Connect your institutional profile or lab credentials
                  </p>
                </div>

                <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-mono">
                  <button
                    onClick={() => setAuthMode('signin')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      authMode === 'signin'
                        ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setAuthMode('signup')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      authMode === 'signup'
                        ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Sign Up
                  </button>
                </div>
              </div>

              {/* Form Inputs */}
              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {authMode === 'signup' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-slate-400 block mb-1.5">
                        Full Name & Title:
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Dr. Jane Goodall"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none focus:border-cyan-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-400 block mb-1.5">
                        Institution / University Lab:
                      </label>
                      <div className="relative">
                        <GraduationCap className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                        <input
                          type="text"
                          required
                          value={institution}
                          onChange={(e) => setInstitution(e.target.value)}
                          placeholder="e.g. MIT CSAIL, Stanford AI Lab"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none focus:border-cyan-400"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1.5">
                    Institutional Academic Email:
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="scholar@university.edu"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none focus:border-cyan-400 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1.5">
                    Password / Lab Access Passkey:
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-slate-700 accent-cyan-400" />
                    <span>Remember research session</span>
                  </label>
                  <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-cyan-400 hover:text-cyan-300">
                    Forgot key?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={isAuthenticating}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {isAuthenticating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Authenticating Credentials...</span>
                    </>
                  ) : (
                    <>
                      <span>{authMode === 'signin' ? 'Sign In & Select Project' : 'Create Scholar Profile'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Institutional SSO Options */}
              <div className="pt-4 border-t border-slate-800">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-3 text-center">
                  Or Connect via Academic Single Sign-On (SSO)
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleQuickProfileSelect(MOCK_USERS[0])}
                    className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500/30 text-xs flex items-center justify-center gap-2 text-slate-300 hover:text-white transition-all font-mono"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>ORCID iD</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickProfileSelect(MOCK_USERS[1])}
                    className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 hover:border-blue-500/30 text-xs flex items-center justify-center gap-2 text-slate-300 hover:text-white transition-all font-mono"
                  >
                    <Globe className="w-3.5 h-3.5 text-blue-400" />
                    <span>Edu SAML</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickProfileSelect(MOCK_USERS[2])}
                    className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 hover:border-purple-500/30 text-xs flex items-center justify-center gap-2 text-slate-300 hover:text-white transition-all font-mono"
                  >
                    <Key className="w-3.5 h-3.5 text-purple-400" />
                    <span>GitHub Schol</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: 1-Click Fast Profile Switcher & Gateways */}
            <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
              {/* Quick Select Personas */}
              <div className="glass-panel rounded-3xl p-6 border border-slate-800">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                  <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-2 font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    Instant Demo Researcher Profiles
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                    1-CLICK LOGIN
                  </span>
                </div>

                <div className="space-y-3">
                  {MOCK_USERS.map((user) => (
                    <div
                      key={user.id}
                      onClick={() => handleQuickProfileSelect(user)}
                      className="p-3.5 rounded-2xl bg-slate-900/70 hover:bg-slate-800/90 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-xl object-cover border border-slate-700 group-hover:border-cyan-400 transition-colors"
                        />
                        <div>
                          <div className="text-xs font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                            {user.name}
                          </div>
                          <div className="text-[11px] text-slate-400 truncate max-w-[180px]">
                            {user.institution}
                          </div>
                          <div className="text-[10px] font-mono text-cyan-400 mt-0.5">
                            {user.role}
                          </div>
                        </div>
                      </div>

                      <div className="p-2 rounded-xl bg-slate-800/80 text-slate-400 group-hover:bg-cyan-500/20 group-hover:text-cyan-300 transition-all">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified System Security Status */}
              <div className="glass-panel rounded-3xl p-5 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>SECURE RESEARCH PROTOCOLS ACTIVE</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80">
                    <span className="text-slate-500 block">QDRANT CLUSTER:</span>
                    <span className="text-slate-300 font-semibold">1536-D HNSW GRAPH</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80">
                    <span className="text-slate-500 block">MULTI-AGENT BUS:</span>
                    <span className="text-slate-300 font-semibold">8 SUB-AGENTS OK</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Step 2: Project Connect & Workspace Selection */
          <motion.div
            key="project-connect-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Authenticated User Banner Card */}
            {currentUser && (
              <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-12 h-12 rounded-2xl object-cover border-2 border-cyan-500/40 shadow-lg shadow-cyan-500/20"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white">{currentUser.name}</h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                        {currentUser.role}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                      {currentUser.institution} • {currentUser.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => setActiveStep('auth')}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-mono border border-slate-700 transition-all"
                  >
                    Switch Account
                  </button>

                  <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold shadow-md shadow-cyan-500/20 flex items-center gap-1.5 transition-all"
                  >
                    <FolderPlus className="w-3.5 h-3.5" />
                    <span>+ New Research Project</span>
                  </button>
                </div>
              </div>
            )}

            {/* Connection Handshake Telemetry Overlay */}
            {isConnecting && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-panel-glow rounded-2xl p-5 border border-cyan-500/40 bg-cyan-950/20 text-xs font-mono space-y-2"
              >
                <div className="flex items-center justify-between text-cyan-300 font-bold">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
                    <span>CONNECTING PROJECT WORKSPACE TO QDRANT CLUSTER...</span>
                  </div>
                  <span className="text-[10px] text-slate-400">STAGE 3 / 4</span>
                </div>
                <p className="text-slate-300 text-[11px]">{connectionStage}</p>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 animate-pulse w-3/4 rounded-full" />
                </div>
              </motion.div>
            )}

            {/* Projects Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
                <span>SELECT OR CONNECT RESEARCH WORKSPACE ({projects.length} AVAILABLE)</span>
                <span>VECTOR DB: QDRANT DISTRIBUTED</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((proj) => {
                  const isCurrent = connectedProject?.id === proj.id;
                  const isBeingConnected = isConnecting === proj.id;

                  return (
                    <div
                      key={proj.id}
                      className={`glass-panel rounded-3xl p-6 border transition-all flex flex-col justify-between relative overflow-hidden ${
                        isCurrent
                          ? 'border-emerald-500/50 bg-emerald-950/10 shadow-xl shadow-emerald-500/10'
                          : 'border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900/60'
                      }`}
                    >
                      {/* Top Badges */}
                      <div>
                        <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-800/80">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-cyan-400">
                              {proj.code}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                              {proj.discipline}
                            </span>
                          </div>

                          {isCurrent ? (
                            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono font-bold flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                              CONNECTED
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-400 border border-slate-700 text-[10px] font-mono">
                              AVAILABLE
                            </span>
                          )}
                        </div>

                        <h3 className="text-base font-bold text-white mb-1.5 leading-snug">
                          {proj.name}
                        </h3>
                        <p className="text-xs text-slate-300 leading-relaxed mb-4">
                          {proj.description}
                        </p>

                        {/* Project Specs Table */}
                        <div className="grid grid-cols-2 gap-2 text-[11px] font-mono mb-4 bg-slate-950/60 p-3 rounded-2xl border border-slate-800/80">
                          <div>
                            <span className="text-slate-500 block text-[10px]">VECTOR COLLECTION:</span>
                            <span className="text-cyan-300 truncate block">{proj.vectorCollection}</span>
                          </div>

                          <div>
                            <span className="text-slate-500 block text-[10px]">ORCHESTRATOR MODEL:</span>
                            <span className="text-purple-300 truncate block">{proj.primaryModel}</span>
                          </div>

                          <div>
                            <span className="text-slate-500 block text-[10px]">INDEXED PAPERS:</span>
                            <span className="text-slate-200">{proj.indexedPapersCount} Papers ({proj.totalChunksCount} chunks)</span>
                          </div>

                          <div>
                            <span className="text-slate-500 block text-[10px]">COLLABORATORS:</span>
                            <span className="text-slate-200">{proj.collaboratorsCount} Scientists</span>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {proj.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-400 border border-slate-700/80"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Card Action Buttons */}
                      <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
                        <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                          <Activity className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{proj.pingLatencyMs || 22}ms latency</span>
                        </div>

                        {isCurrent ? (
                          <button
                            onClick={onEnterWorkspace}
                            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 transition-all"
                          >
                            <span>Enter Workspace</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleConnect(proj)}
                            disabled={isBeingConnected}
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs shadow-md shadow-cyan-500/20 flex items-center gap-1.5 transition-all disabled:opacity-50"
                          >
                            {isBeingConnected ? (
                              <>
                                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                <span>Connecting...</span>
                              </>
                            ) : (
                              <>
                                <Zap className="w-3.5 h-3.5" />
                                <span>Connect Project</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Floating Action Bar */}
            {connectedProject && (
              <div className="glass-panel-glow rounded-2xl p-4 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-xs font-mono">
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    <Database className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-white font-bold">
                      ACTIVE WORKSPACE: {connectedProject.name}
                    </div>
                    <div className="text-slate-400 text-[11px]">
                      Qdrant Collection: {connectedProject.vectorCollection} • Model: {connectedProject.primaryModel}
                    </div>
                  </div>
                </div>

                <button
                  onClick={onEnterWorkspace}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all"
                >
                  <span>Launch Research Environment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* New Project Creation Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg glass-panel-glow rounded-3xl p-6 sm:p-7 border border-cyan-500/30 relative"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <FolderPlus className="w-4 h-4 text-cyan-400" />
                <span>Initialize Scientific Research Project</span>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProjectSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="text-slate-400 font-mono block mb-1">Project Name:</label>
                <input
                  type="text"
                  required
                  value={newProjName}
                  onChange={(e) => setNewProjName(e.target.value)}
                  placeholder="e.g. Multimodal Clinical Diagnostics RAG"
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 font-mono block mb-1">Project Code:</label>
                  <input
                    type="text"
                    value={newProjCode}
                    onChange={(e) => setNewProjCode(e.target.value)}
                    placeholder="PROJ-CLINICAL-2026"
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 outline-none focus:border-cyan-400 font-mono"
                  />
                </div>

                <div>
                  <label className="text-slate-400 font-mono block mb-1">Discipline:</label>
                  <input
                    type="text"
                    value={newProjDiscipline}
                    onChange={(e) => setNewProjDiscipline(e.target.value)}
                    placeholder="Biomedical NLP / AI"
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 font-mono block mb-1">
                  Qdrant Vector DB Collection Name:
                </label>
                <input
                  type="text"
                  value={newProjCollection}
                  onChange={(e) => setNewProjCollection(e.target.value)}
                  placeholder="qdrant_clinical_rag_1536"
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 outline-none focus:border-cyan-400 font-mono"
                />
              </div>

              <div>
                <label className="text-slate-400 font-mono block mb-1">
                  Primary Multi-Agent LLM Target:
                </label>
                <select
                  value={newProjModel}
                  onChange={(e) => setNewProjModel(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 outline-none focus:border-cyan-400 font-mono"
                >
                  <option value="Claude 3.7 Sonnet & Gemini 2.5 Pro">Claude 3.7 Sonnet & Gemini 2.5 Pro (Optimal)</option>
                  <option value="Gemini 2.5 Flash Multimodal">Gemini 2.5 Flash Multimodal (High Speed Vision)</option>
                  <option value="Claude 3.5 Sonnet">Claude 3.5 Sonnet (Strict Grounding)</option>
                </select>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Provision & Connect Workspace</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
