/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  Target, 
  MapPin, 
  AlertCircle, 
  Sparkles, 
  TrendingUp, 
  Briefcase, 
  Layout, 
  Users, 
  PieChart, 
  ArrowRight,
  CheckCircle2,
  BarChart3,
  Award,
  Zap,
  Star,
  ZapIcon,
  Globe,
  ShieldCheck,
  Lock,
  ChevronDown
} from 'lucide-react';
import { useState, useCallback, FormEvent } from 'react';

// --- Types & Data ---

interface Notification {
  id: number;
  message: string;
  type: 'success' | 'info' | 'warning';
}

type TabValue = 'roadmap' | 'skills' | 'performance' | 'executive';

interface Node {
  id: string;
  title: string;
  type: 'current' | 'future' | 'milestone';
  skills: string[];
  gaps?: string[];
  department?: string;
  status?: 'done' | 'active' | 'future';
}

const NODES: Node[] = [
  {
    id: 'prop-designer',
    title: 'Product Designer',
    type: 'current',
    status: 'done',
    skills: ['UI/UX', 'Prototyping', 'User Research'],
    department: 'Design',
  },
  {
    id: 'sr-product-designer',
    title: 'Senior Product Designer',
    type: 'milestone',
    status: 'active',
    skills: ['Design Systems', 'Mentorship', 'Strategy'],
    department: 'Design',
  },
  {
    id: 'design-lead',
    title: 'Design Lead',
    type: 'milestone',
    status: 'future',
    skills: ['Team Leadership', 'Product Vision'],
    gaps: ['Stakeholder Management'],
    department: 'Product',
  },
  {
    id: 'lead-strategist',
    title: 'Lead Strategist',
    type: 'future',
    status: 'future',
    skills: ['Market Analysis', 'Business Growth'],
    gaps: ['Financial Modeling'],
    department: 'Strategy',
  }
];

const SKILL_MATRIX = [
  { category: 'Technical', skills: [
    { name: 'UI Systems', level: 92 },
    { name: 'Prototyping', level: 88 },
    { name: 'Data Visualization', level: 64 }
  ]},
  { category: 'Soft Skills', skills: [
    { name: 'Empathy', level: 96 },
    { name: 'Mentorship', level: 72 },
    { name: 'Executive Persuasion', level: 38, gap: true }
  ]},
  { category: 'Strategic', skills: [
    { name: 'Market Fit', level: 62 },
    { name: 'Product Vision', level: 58 },
    { name: 'Unit Economics', level: 18, gap: true }
  ]}
];

const PERFORMANCE_METRICS = [
  { label: 'Growth Velocity', value: '94%', trend: 'up', color: 'text-emerald-400' },
  { label: 'Stakeholder NPS', value: '8.2/10', trend: 'down', color: 'text-orange-400' },
  { label: 'Strategic Impact', value: '+12%', trend: 'up', color: 'text-indigo-400' }
];

// --- Views ---

const RoadmapView = ({ activeNode, setActiveNode, onAction, isDetailed }: { activeNode: string, setActiveNode: (id: string) => void, onAction: (msg: string, type?: Notification['type']) => void, isDetailed: boolean }) => (
  <div className="grid grid-cols-12 grid-rows-6 gap-4 h-full">
    {/* Career Path (Centerpiece) */}
    <div className="col-span-12 lg:col-span-8 row-span-4 bg-slate-900/50 border border-slate-800 rounded-3xl p-8 relative overflow-hidden flex flex-col min-h-[400px]">
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #475569 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      
      <div className="flex justify-between items-center mb-12 relative z-10">
        <h3 className="text-lg font-bold text-white tracking-tight">Path Visualization</h3>
        <div className="flex gap-4 text-[10px] uppercase font-black text-slate-500 tracking-widest">
          <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div> Done</span>
          <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.4)]"></div> Active</span>
          <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.4)]"></div> Gap</span>
        </div>
      </div>

      <div className="relative flex justify-between items-center mt-auto mb-16 px-4 z-10">
        {NODES.map((node, idx) => (
          <div key={node.id} className="flex flex-col items-center flex-1 relative">
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveNode(node.id)}
              className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 border-2 transition-all duration-300 relative z-20 group ${
                node.status === 'done' ? 'bg-emerald-500/10 border-emerald-500/50' :
                node.status === 'active' ? 'bg-indigo-500/20 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.2)]' :
                node.gaps ? 'bg-orange-500/10 border-orange-500/50' : 'bg-slate-800 border-slate-700'
              } ${activeNode === node.id ? 'ring-4 ring-indigo-500/20 shadow-xl' : ''}`}
            >
              {/* Tooltip */}
              <div className="absolute -top-14 left-1/2 -translate-x-1/2 px-3 py-2 bg-white text-slate-950 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 pointer-events-none whitespace-nowrap z-30 border border-slate-200">
                <p className="text-[9px] font-black uppercase tracking-widest leading-none mb-1 text-indigo-600">{node.department}</p>
                <p className="text-xs font-bold text-slate-900">{node.title}</p>
                <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-slate-200 rotate-45" />
              </div>

              <div className={`w-3 h-3 rounded-full transition-all duration-500 ${
                node.status === 'done' ? 'bg-emerald-500' :
                node.status === 'active' ? 'bg-indigo-500' :
                node.gaps ? 'bg-orange-500' : 'bg-slate-500'
              } ${activeNode === node.id ? 'scale-125' : ''}`} />

              {/* Enhanced Subtle Pulse */}
              {activeNode === node.id && (
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0.3 }}
                  animate={{ scale: 1.8, opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeOut" }}
                  className={`absolute inset-0 rounded-full -z-10 ${
                    node.status === 'active' ? 'bg-indigo-500' : 
                    node.gaps ? 'bg-orange-500' : 
                    'bg-emerald-500'
                  }`}
                />
              )}
            </motion.button>
            <p className={`text-xs font-bold text-center mb-1 transition-colors ${activeNode === node.id ? 'text-white' : 'text-slate-400'}`}>
              {node.title}
            </p>
            {node.status === 'active' && <p className="text-[9px] text-indigo-400 font-black uppercase tracking-widest">Active Role</p>}
            {isDetailed && node.status === 'done' && (
              <div className="absolute -bottom-6 flex items-center gap-1">
                <ShieldCheck size={10} className="text-emerald-500" />
                <span className="text-[8px] font-black text-emerald-500 uppercase">Verified</span>
              </div>
            )}
            
            {idx < NODES.length - 1 && (
              <div className={`absolute top-6 left-[60%] w-[80%] h-0.5 z-0 transition-all duration-1000 ${
                NODES[idx].status === 'done' ? 'bg-emerald-500/20' : 'border-t-2 border-dashed border-slate-800'
              }`} />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={activeNode}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-5 bg-slate-950/40 rounded-2xl border border-slate-800/50 backdrop-blur-sm"
        >
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <span className="text-[10px] uppercase font-black text-slate-500 tracking-[0.2em] mb-3 block">Market Value Skills</span>
              <div className="flex flex-wrap gap-2">
                {NODES.find(n => n.id === activeNode)?.skills.map(s => (
                  <span key={s} className="px-3 py-1 bg-slate-800/80 text-slate-200 text-[11px] rounded-lg font-bold border border-slate-700/50 group hover:border-indigo-500/30 transition-colors">
                    {s}
                  </span>
                ))}
              </div>
              {isDetailed && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[9px] text-slate-600 mt-3 font-medium">
                  * Competency levels in these skills are in the top 15% of your peer group.
                </motion.p>
              )}
            </div>
            {NODES.find(n => n.id === activeNode)?.gaps && (
              <div className="flex-1 border-t md:border-t-0 md:border-l border-slate-800 pt-6 md:pt-0 md:pl-8">
                <span className="text-[10px] uppercase font-black text-orange-400 tracking-[0.2em] mb-3 block">Roadblock Gaps</span>
                <div className="flex flex-wrap gap-2">
                  {NODES.find(n => n.id === activeNode)?.gaps?.map(g => (
                    <div key={g} className="flex items-center gap-2 px-3 py-1 bg-orange-500/5 text-orange-400 text-[11px] rounded-lg font-bold border border-orange-500/20 group hover:bg-orange-500/10 transition-colors">
                      <AlertCircle size={12} />
                      {g}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>

    {/* Skill Gaps Side Cards */}
    <div className="col-span-12 lg:col-span-4 row-span-2 bg-orange-500/5 border border-orange-500/20 rounded-3xl p-7 flex flex-col justify-between group hover:border-orange-500/40 transition-all hover:bg-orange-500/10 cursor-pointer">
      <div>
        <div className="bg-orange-500 text-slate-950 w-fit px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter mb-5">Skill Gap 01</div>
        <h4 className="text-xl font-bold text-orange-100 leading-tight group-hover:text-white transition-colors tracking-tight">Stakeholder Alignment</h4>
        <p className="text-sm text-orange-200/40 mt-2 font-medium leading-relaxed">Transition from execution to executive level strategic persuasion.</p>
      </div>
      <div className="w-full bg-slate-800/50 h-2 rounded-full mt-6 overflow-hidden">
        <motion.div initial={{ width: 0 }} animate={{ width: '38%' }} className="bg-orange-500 h-full rounded-full shadow-[0_0_10px_rgba(249,115,22,0.3)]" />
      </div>
    </div>

    <div className="col-span-12 lg:col-span-4 row-span-2 bg-orange-500/5 border border-orange-500/20 rounded-3xl p-7 flex flex-col justify-between group hover:border-orange-500/40 transition-all hover:bg-orange-500/10 cursor-pointer">
      <div>
        <div className="bg-orange-500 text-slate-950 w-fit px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter mb-5">Skill Gap 02</div>
        <h4 className="text-xl font-bold text-orange-100 leading-tight group-hover:text-white transition-colors tracking-tight">Unit Economics</h4>
        <p className="text-sm text-orange-200/40 mt-2 font-medium leading-relaxed">Required for roadmap modeling and P&L accountability.</p>
      </div>
      <div className="w-full bg-slate-800/50 h-2 rounded-full mt-6 overflow-hidden">
        <motion.div initial={{ width: 0 }} animate={{ width: '18%' }} className="bg-orange-500 h-full rounded-full shadow-[0_0_10px_rgba(249,115,22,0.3)]" />
      </div>
    </div>

    {/* AI Recommendation (Wide Bottom) */}
    <div className="col-span-12 row-span-2 bg-gradient-to-r from-indigo-950/80 to-slate-900 border border-indigo-500/30 rounded-3xl p-8 flex items-center gap-10 relative overflow-hidden group shadow-2xl shadow-indigo-900/10">
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 blur-[120px] pointer-events-none group-hover:bg-indigo-500/10 transition-all duration-700" />
      <div className="w-24 h-24 shrink-0 bg-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-indigo-600/40 border border-indigo-400/30 group-hover:scale-105 transition-transform duration-500">
        <Sparkles size={44} className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
      </div>
      <div className="flex-grow">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em]">AI Synthesis Recommendation</span>
          <div className="h-px w-24 bg-indigo-500/20"></div>
        </div>
        <h4 className="text-2xl font-black text-white tracking-tight">Q4 Operational Budget Audit</h4>
        <p className="text-indigo-100/60 mt-2 max-w-2xl text-sm leading-relaxed font-medium">
          Bridge your <span className="text-orange-400 font-bold">Financial Modeling</span> gap by joining the Finance team to map Design ROI.
          {isDetailed && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="block mt-2 text-indigo-400/80 text-[11px]"
            >
              * Global Talent Health Impact: +1.2% Org Efficiency.
            </motion.span>
          )}
        </p>
      </div>
      <button 
        onClick={() => onAction('Assignment accepted: Q4 Operational Budget Audit')}
        className="px-10 py-5 bg-white text-slate-950 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-50 hover:scale-[1.03] active:scale-95 transition-all shadow-xl shadow-white/5 flex items-center gap-3"
      >
        Accept Assignment <ArrowRight size={20} />
      </button>
    </div>
  </div>
);

const SkillsView = ({ onAction, isDetailed }: { onAction: (msg: string, type?: Notification['type']) => void, isDetailed: boolean }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full pb-12">
    {SKILL_MATRIX.map((group, idx) => (
      <motion.div 
        key={group.category}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: idx * 0.1 }}
        className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 group hover:bg-slate-900/60 transition-all"
      >
        <div className="flex items-center justify-between mb-10">
          <h3 className="text-xl font-black text-white tracking-tight">{group.category}</h3>
          <div className="p-2 bg-slate-800/50 rounded-xl text-slate-500 group-hover:text-indigo-400 transition-colors">
            <Award size={22} />
          </div>
        </div>
        <div className="space-y-10">
          {group.skills.map(skill => (
            <div key={skill.name}>
              <div className="flex justify-between items-end mb-3">
                <span className={`text-sm font-bold tracking-tight ${skill.gap ? 'text-orange-400' : 'text-slate-300'}`}>
                  {skill.name}
                  {(skill.gap || isDetailed) && (
                    <span className={`ml-2 text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-md border ${
                      skill.gap 
                        ? 'bg-orange-500/20 text-orange-500 border-orange-500/20' 
                        : 'bg-indigo-500/20 text-indigo-500 border-indigo-500/20'
                    }`}>
                      {skill.gap ? 'Critical Gap' : 'Advanced'}
                    </span>
                  )}
                </span>
                <span className="text-[11px] font-mono font-bold text-slate-500">{skill.level}%</span>
              </div>
              <div className="h-2.5 bg-slate-800/50 rounded-full overflow-hidden border border-slate-800">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, ease: 'easeOut', delay: idx * 0.2 }}
                  className={`h-full rounded-full ${skill.gap ? 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.3)]' : 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.3)]'}`}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-slate-800/50">
          <button 
            onClick={() => onAction(`Loading training pathway for ${group.category} skills...`)}
            className="w-full py-4 bg-slate-950/50 hover:bg-slate-800 text-slate-500 hover:text-white text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all border border-slate-800 hover:border-indigo-500/30"
          >
            View Training Pathway
          </button>
        </div>
      </motion.div>
    ))}
  </div>
);

const PerformanceView = ({ onAction, isDetailed }: { onAction: (msg: string, type?: Notification['type']) => void, isDetailed: boolean }) => {
  const [timeRange, setTimeRange] = useState('6M');
  const [isAddingFeedback, setIsAddingFeedback] = useState(false);
  const [feedbacks, setFeedbacks] = useState([
    { text: "Calum's transition to strategy is evident in the vision deck. Needs more data rigour.", author: "Marcus T", role: "Strategy Director", color: "indigo" },
    { text: "Excellent delivery of the Design System Phase 3. Ready for more responsibility.", author: "Sarah L", role: "Product VP", color: "emerald" },
    { text: "Strong operational agility shown during the budget crisis. Promotion candidate.", author: "David K", role: "Finance Head", color: "orange" }
  ]);
  const [newFeedbackForm, setNewFeedbackForm] = useState({ text: '', author: '', role: '' });

  const handleSubmitFeedback = (e: FormEvent) => {
    e.preventDefault();
    if (!newFeedbackForm.text || !newFeedbackForm.author) {
      onAction('Please fill in both name and feedback.', 'warning');
      return;
    }
    
    const colors = ['indigo', 'emerald', 'orange', 'sky', 'violet'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    setFeedbacks(prev => [
      { 
        text: newFeedbackForm.text, 
        author: newFeedbackForm.author, 
        role: newFeedbackForm.role || 'Stakeholder', 
        color: randomColor 
      },
      ...prev
    ]);
    
    setNewFeedbackForm({ text: '', author: '', role: '' });
    setIsAddingFeedback(false);
    onAction('Success: Pulse updated in real-time', 'success');
  };
  
  return (
  <div className="grid grid-cols-12 grid-rows-2 gap-6 h-full pb-12">
    {/* Velocity Chart Card */}
    <div className="col-span-12 lg:col-span-8 row-span-2 bg-slate-900/40 border border-slate-800 rounded-3xl p-8 flex flex-col">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h3 className="text-xl font-black text-white tracking-tight text-shadow-sm">Performance Benchmark</h3>
          <p className="text-slate-500 text-xs mt-1 font-bold">Historical data across 7 sprint cycles</p>
        </div>
        <div className="flex gap-2 bg-slate-950 border border-slate-800 p-1.5 rounded-xl">
          {['1M', '6M', '1Y'].map(t => (
            <button 
              key={t} 
              onClick={() => {
                setTimeRange(t);
                onAction(`Performance view adjusted to ${t} window`);
              }}
              className={`px-4 py-1.5 text-[10px] font-black rounded-lg transition-all ${timeRange === t ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-6 mb-12">
        {PERFORMANCE_METRICS.map((m, i) => (
          <motion.div 
            key={m.label} 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-slate-950/40 border border-slate-800/50 p-6 rounded-2xl group hover:border-indigo-500/20 transition-colors"
          >
            <p className="text-[10px] uppercase font-black text-slate-500 tracking-[0.2em] mb-3 flex items-center justify-between">
              {m.label}
              {isDetailed && <span className="text-emerald-400 font-bold tracking-tighter">+3.2% vs Mkt.</span>}
            </p>
            <div className="flex items-baseline gap-3">
              <span className={`text-4xl font-black tracking-tighter ${m.color}`}>{m.value}</span>
              <div className={`p-1 rounded-full ${m.trend === 'up' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-orange-500/10 text-orange-500'}`}>
                <TrendingUp size={14} className={m.trend === 'up' ? '' : 'rotate-180'} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex-grow min-h-[200px] relative bg-slate-950/30 rounded-2xl border border-slate-800/50 flex items-end p-8 gap-5 overflow-hidden">
        <div className="absolute inset-0 flex flex-col justify-between p-6 opacity-5 pointer-events-none">
          {[1,2,3,4,5].map(i => <div key={i} className="h-px bg-white w-full" />)}
        </div>
        {[42, 68, 48, 84, 58, 92, 88].map((h, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-3">
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: 0.3 + i * 0.08, duration: 1, ease: 'backOut' }}
              className={`w-full rounded-t-xl relative group ${i === 5 ? 'bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.4)]' : 'bg-slate-700 hover:bg-slate-600 transition-colors'}`}
            >
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-slate-950 text-[10px] font-black px-2 py-1 rounded shadow-xl pointer-events-none">
                {h}%
              </div>
            </motion.div>
            <span className="text-[9px] font-black text-slate-700 tracking-widest">S0{i+1}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Stakeholder Sentiment */}
    <div className="col-span-12 lg:col-span-4 bg-indigo-900/10 border border-indigo-500/20 rounded-3xl p-8 flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-black text-white flex items-center gap-3">
          <ZapIcon size={20} className="text-indigo-400" /> Stakeholder Pulse
        </h3>
        <button 
          onClick={() => setIsAddingFeedback(!isAddingFeedback)}
          className={`px-4 py-2 rounded-xl border transition-all duration-300 flex items-center gap-2 ${
            isAddingFeedback 
              ? 'bg-orange-500/10 border-orange-500/50 text-orange-400' 
              : 'bg-indigo-500 text-white border-indigo-400 hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/20'
          }`}
        >
          {isAddingFeedback ? <AlertCircle size={14} /> : <Sparkles size={14} />}
          <span className="text-[10px] font-black uppercase tracking-widest">{isAddingFeedback ? 'Cancel' : 'Provide Feedback'}</span>
        </button>
      </div>

      <div className="flex-grow overflow-y-auto pr-2 no-scrollbar space-y-6">
        <AnimatePresence>
          {isAddingFeedback && (
            <motion.form 
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              onSubmit={handleSubmitFeedback}
              className="bg-slate-950 border border-slate-800 rounded-2xl p-6 overflow-hidden space-y-4"
            >
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Your Pulse Observation</label>
                <textarea 
                  value={newFeedbackForm.text}
                  onChange={e => setNewFeedbackForm({...newFeedbackForm, text: e.target.value})}
                  placeholder="e.g., 'Demonstrates incredible technical depth in project X...'"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs font-medium text-white placeholder:text-slate-700 focus:outline-none focus:border-indigo-500/50 min-h-[100px] resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Name</label>
                  <input 
                    type="text"
                    value={newFeedbackForm.author}
                    onChange={e => setNewFeedbackForm({...newFeedbackForm, author: e.target.value})}
                    placeholder="Enter name"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs font-bold text-white placeholder:text-slate-700 focus:outline-none focus:border-indigo-500/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Role</label>
                  <input 
                    type="text"
                    value={newFeedbackForm.role}
                    onChange={e => setNewFeedbackForm({...newFeedbackForm, role: e.target.value})}
                    placeholder="e.g., 'CTO'"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs font-bold text-white placeholder:text-slate-700 focus:outline-none focus:border-indigo-500/50"
                  />
                </div>
              </div>
              <button 
                type="submit"
                className="w-full py-4 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500 transition-all mt-4"
              >
                Publish Feedback
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {feedbacks.map((feedback, idx) => (
          <motion.div 
            key={`${feedback.author}-${idx}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className={`bg-slate-900/50 p-5 rounded-2xl border-l-[6px] transition-all duration-500 hover:bg-slate-900/80 group ${
              feedback.color === 'indigo' ? 'border-indigo-500/50' : 
              feedback.color === 'emerald' ? 'border-emerald-500/50' :
              feedback.color === 'orange' ? 'border-orange-500/50' : 
              feedback.color === 'sky' ? 'border-blue-500/50' :
              'border-violet-500/50'
            }`}
          >
            <p className="text-white/80 text-sm italic font-medium leading-relaxed mb-4">"{feedback.text}"</p>
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-800 transition-colors group-hover:border-slate-700 shadow-sm`}>
                <Users size={14} className="text-slate-400 group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="text-[10px] font-black text-white tracking-widest leading-none">{feedback.author}</p>
                <p className="text-[9px] font-bold text-slate-500 uppercase mt-1">{feedback.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>

    {/* Promotion Widget */}
    <div 
      onClick={() => onAction('Opening full Gap Analysis report...')}
      className="col-span-12 lg:col-span-4 bg-slate-900/40 border border-slate-800 rounded-3xl p-8 flex items-center gap-8 group hover:bg-emerald-500/5 hover:border-emerald-500/30 transition-all cursor-pointer"
    >
      <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center justify-center text-emerald-500 group-hover:scale-110 group-hover:border-emerald-500 transition-all duration-500">
        <CheckCircle2 size={40} className="drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]" />
      </div>
      <div>
        <h4 className="font-black text-white uppercase text-xs tracking-[0.2em] mb-1">Logic Assessment</h4>
        <p className="text-emerald-400 font-bold text-lg">Next Promotion Criteria <span className="text-white">82%</span> Met</p>
        <div className="flex items-center gap-2 mt-2 text-[10px] font-black uppercase text-slate-500">
          Expand for Gap Analysis <ChevronRight size={14} />
        </div>
      </div>
    </div>
  </div>
  );
};

const ExecutiveView = ({ onAction, isDetailed }: { onAction: (msg: string, type?: Notification['type']) => void, isDetailed: boolean }) => {
  const [showAudit, setShowAudit] = useState(false);

  return (
    <div className="flex flex-col gap-8 h-full pb-12">
      <div className="grid grid-cols-12 grid-rows-3 gap-6">
        {/* Org Health Map */}
        <div className="col-span-12 lg:col-span-8 row-span-2 bg-slate-900/40 border border-slate-800 rounded-3xl p-8 relative overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-black text-white tracking-tight text-shadow-sm">Organization Talent Health</h3>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Cross-functional skill mapping</p>
            </div>
            <div className="px-4 py-2 bg-indigo-500/10 border border-indigo-400/20 rounded-xl flex items-center gap-2">
              <Globe size={14} className="text-indigo-400" />
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Global View</span>
            </div>
          </div>

          <div className="flex-grow grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Retention Risk', value: 'Low', color: 'emerald' },
              { label: 'Skill Redundancy', value: '84%', color: 'indigo' },
              { label: 'Leadership Pipeline', value: '12 Active', color: 'orange' },
              { label: 'Strategic Alignment', value: '96%', color: 'emerald' }
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-950/50 border border-slate-800/50 p-6 rounded-2xl flex flex-col justify-between group hover:border-indigo-500/20 transition-colors"
              >
                <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em]">{stat.label}</span>
                <span className={`text-2xl font-black text-${stat.color}-400 tracking-tighter mt-2 group-hover:scale-105 origin-left transition-transform`}>{stat.value}</span>
                {isDetailed && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[8px] text-slate-500 font-bold uppercase mt-2"
                  >
                    +3% vs. Prev Qtr
                  </motion.p>
                )}
              </motion.div>
            ))}
            
            {/* Heatmap Simulation */}
            <div className="col-span-full mt-6 bg-slate-950/30 rounded-2xl border border-slate-800/30 p-6 flex flex-col gap-4">
               <div className="flex justify-between items-center text-[10px] font-black text-slate-700 uppercase tracking-[0.3em]">
                 <span>Department Skill Volatility</span>
                 <div className="flex gap-4">
                    <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-slate-800"></div> Stable</span>
                    <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]"></div> High Risk</span>
                 </div>
               </div>
               <div className="flex gap-2 h-16">
                  {[80, 20, 45, 90, 30, 60, 15, 75, 40, 85].map((h, i) => (
                    <div key={i} className="flex-1 bg-slate-900 rounded-lg overflow-hidden relative group">
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        className={`absolute bottom-0 left-0 right-0 ${h < 30 ? 'bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.3)]' : 'bg-slate-800 opacity-40'}`}
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 backdrop-blur-sm cursor-help">
                        <span className="text-[8px] font-black text-white">{h}%</span>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>

        {/* Promotion Pipeline Card */}
        <div className="col-span-12 lg:col-span-4 row-span-2 bg-indigo-600 border border-indigo-400 rounded-3xl p-8 relative overflow-hidden group shadow-2xl shadow-indigo-900/40">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
            <Target size={180} />
          </div>
          <div className="relative z-10 h-full flex flex-col">
            <div className="mb-auto">
              <div className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-black text-white uppercase tracking-widest w-fit backdrop-blur-md mb-6">Pipeline Velocity</div>
              <h4 className="text-3xl font-black text-white leading-tight tracking-tighter">Calum is in the <br /> top 2% of <br /> high-potentials.</h4>
              <p className="text-indigo-100/70 text-xs mt-4 font-medium leading-relaxed">System confidence for "Lead Strategist" eligibility in Q1: <span className="text-white font-bold">94%</span></p>
            </div>
            
            <button 
              onClick={() => onAction('Promotion path approved for board review.')}
              className="w-full bg-white text-indigo-700 py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-indigo-950/20 hover:bg-indigo-50 hover:scale-[1.02] active:scale-98 transition-all mt-8"
            >
              Approve Promotion Path
            </button>
          </div>
        </div>

        {/* Org Benchmarking (Wide Bottom) */}
        <div className="col-span-12 row-span-1 bg-slate-900/40 border border-slate-800 rounded-3xl p-8 flex flex-col lg:flex-row items-center gap-12 group hover:bg-slate-900 transition-all">
          <div className="flex-1 flex items-center gap-6 w-full lg:w-auto lg:border-r border-slate-800">
             <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 border border-indigo-500/20 shadow-lg shadow-indigo-500/5">
               <ZapIcon size={24} />
             </div>
             <div>
                <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">Market Benchmarking</p>
                <p className="text-white font-bold text-lg tracking-tight">Strategy Lead: <span className="text-indigo-400">+18% Premium</span></p>
             </div>
          </div>
          <div className="flex-1 flex items-center gap-6 w-full lg:w-auto">
             <div className="w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-400 border border-orange-500/20 shadow-lg shadow-orange-500/5">
               <ShieldCheck size={24} />
             </div>
             <div>
                <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">Compliance Health</p>
                <p className="text-white font-bold text-lg tracking-tight">100% Verified <span className="text-slate-500 text-xs ml-2 font-medium">Clear audits</span></p>
             </div>
          </div>
          <button 
            onClick={() => {
              setShowAudit(!showAudit);
              onAction(showAudit ? 'Closing organizational audit' : 'Opening organizational audit', showAudit ? 'info' : 'success');
            }}
            className={`flex items-center justify-center gap-3 px-8 py-4 border rounded-2xl text-[10px] font-black uppercase transition-all tracking-widest whitespace-nowrap shadow-xl ${
              showAudit 
                ? 'bg-white text-slate-950 border-white' 
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-500'
            }`}
          >
            {showAudit ? 'Close Audit Report' : 'Full Org Audit'} <ChevronDown size={14} className={showAudit ? 'rotate-180 transition-transform' : 'transition-transform'} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showAudit && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-slate-900/60 border border-slate-800 rounded-3xl p-8 shadow-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { dept: 'Engineering', health: '92%', risk: 'Low', headcount: 145 },
                { dept: 'Product', health: '88%', risk: 'Med', headcount: 42 },
                { dept: 'Design', health: '96%', risk: 'Low', headcount: 28 },
                { dept: 'Marketing', health: '74%', risk: 'High', headcount: 34 },
                { dept: 'Sales', health: '81%', risk: 'Med', headcount: 88 },
                { dept: 'Strategy', health: '98%', risk: 'Low', headcount: 12 }
              ].map((d, i) => (
                <div key={d.dept} className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800/50 flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-black text-white">{d.dept}</span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded ${d.risk === 'Low' ? 'bg-emerald-500/20 text-emerald-400' : d.risk === 'High' ? 'bg-orange-500/20 text-orange-400' : 'bg-indigo-500/20 text-indigo-400'}`}>
                      {d.risk} Risk
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold text-slate-500">
                      <span>Vitality score</span>
                      <span className="text-white">{d.health}</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: d.health }}
                        className={`h-full ${parseInt(d.health) > 90 ? 'bg-emerald-500' : parseInt(d.health) > 80 ? 'bg-indigo-500' : 'bg-orange-500'}`}
                      />
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-[10px] font-black text-slate-600 uppercase tracking-widest">
                    <span>Active Roles</span>
                    <span className="text-slate-400 font-bold">{d.headcount}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <button className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600 hover:text-indigo-400 transition-colors">
                Export Executive Summary (.PDF)
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Layout Wrapper ---

export default function App() {
  const [activeTab, setActiveTab] = useState<TabValue>('roadmap');
  const [activeNode, setActiveNode] = useState(NODES[1].id);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isDetailedView, setIsDetailedView] = useState(false);

  const addNotification = useCallback((message: string, type: Notification['type'] = 'info') => {
    const id = Date.now();
    setNotifications(prev => [{ id, message, type }, ...prev]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200 p-6 md:p-10 flex flex-col selection:bg-indigo-500/40 antialiased overflow-x-hidden relative">
      <AnimatePresence>
        <div className="fixed top-8 right-8 z-[100] flex flex-col gap-4">
          {notifications.map(n => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              className={`px-6 py-4 rounded-2xl border-l-[6px] shadow-2xl backdrop-blur-xl flex items-center gap-4 min-w-[300px] ${
                n.type === 'success' ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' :
                n.type === 'info' ? 'bg-indigo-500/10 border-indigo-500 text-indigo-400' :
                'bg-orange-500/10 border-orange-500 text-orange-400'
              }`}
            >
              <Zap size={18} />
              <span className="text-[11px] font-black uppercase tracking-widest">{n.message}</span>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
      <div className="fixed inset-0 pointer-events-none -z-20">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-600/5 rounded-full blur-[120px]" />
      </div>

      {/* Header Bento Card */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 gap-8 pb-10 border-b border-white/[0.05]">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 bg-white text-slate-950 text-[10px] font-black uppercase tracking-widest rounded-full">Pro v.2.4</div>
            <div className="h-px w-10 bg-slate-800" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Talent Architecture Analysis</p>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white leading-[0.9]">
            Calum's <br />
            <span className="text-indigo-500 drop-shadow-[0_0_15px_rgba(99,102,241,0.2)]">Growth Roadmap</span>
          </h1>
          
          <div className="flex items-center gap-4 mt-6">
            <button 
              onClick={() => {
                setIsDetailedView(!isDetailedView);
                addNotification(isDetailedView ? 'Switching to Condensed View' : 'Enabling Full Data Overlay', 'info');
              }}
              className={`flex items-center gap-3 px-5 py-2.5 rounded-2xl border transition-all duration-500 font-black text-[10px] uppercase tracking-widest group ${
                isDetailedView 
                  ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-600/20' 
                  : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-white'
              }`}
            >
              <Zap size={14} className={isDetailedView ? 'animate-pulse' : ''} />
              {isDetailedView ? 'Detailed Analysis: ON' : 'Detailed Analysis: OFF'}
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 w-full lg:w-auto">
          <div className="flex bg-slate-950 border border-slate-800 rounded-3xl p-1.5 gap-2 shadow-2xl overflow-x-auto sm:overflow-visible no-scrollbar">
            {(['roadmap', 'skills', 'performance', 'executive'] as TabValue[]).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 sm:flex-none px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 transform active:scale-95 whitespace-nowrap ${
                  activeTab === tab 
                    ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/30 border border-indigo-400/30' 
                    : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900 border border-transparent'
                }`}
              >
                {tab === 'roadmap' && <div className="flex items-center justify-center gap-2.5"><MapPin size={14} /> Roadmap</div>}
                {tab === 'skills' && <div className="flex items-center justify-center gap-2.5"><PieChart size={14} /> Matrix</div>}
                {tab === 'performance' && <div className="flex items-center justify-center gap-2.5"><Star size={14} /> Data</div>}
                {tab === 'executive' && <div className="flex items-center justify-center gap-2.5"><Lock size={14} /> Executive</div>}
              </button>
            ))}
          </div>
          
          <div className="flex gap-4">
            <div className="flex-1 bg-slate-900/80 border border-slate-800 rounded-3xl px-6 py-3.5 flex items-center gap-4 group hover:bg-slate-900 transition-colors">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
              <div>
                <p className="text-[8px] text-slate-500 uppercase font-black tracking-widest leading-none mb-1">Status</p>
                <p className="text-white font-black text-xs leading-none">On Track</p>
              </div>
            </div>
            <div className="flex-1 bg-indigo-600 border border-indigo-400/40 rounded-3xl px-6 py-3.5 flex items-center gap-4 shadow-xl shadow-indigo-900/30">
              <BarChart3 size={20} className="text-white" />
              <div>
                <p className="text-[8px] text-indigo-200 uppercase font-black tracking-widest leading-none mb-1">Velocity</p>
                <p className="text-white font-black text-xs leading-none">High</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid View */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 150 }}
            className="h-full"
          >
            {activeTab === 'roadmap' && <RoadmapView activeNode={activeNode} setActiveNode={setActiveNode} onAction={addNotification} isDetailed={isDetailedView} />}
            {activeTab === 'skills' && <SkillsView onAction={addNotification} isDetailed={isDetailedView} />}
            {activeTab === 'performance' && <PerformanceView onAction={addNotification} isDetailed={isDetailedView} />}
            {activeTab === 'executive' && <ExecutiveView onAction={addNotification} isDetailed={isDetailedView} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Design Pattern */}
      <footer className="mt-16 pt-12 border-t border-white/[0.05] grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-slate-700 rounded-full" />
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600">Enterprise Grade AI Diagnostics</p>
          </div>
          <div className="flex gap-8 pl-5">
            <span className="text-[10px] font-bold text-slate-600 tracking-widest">Last Model Calibration: 27 Apr 2026</span>
            <span className="text-[10px] font-bold text-slate-600 tracking-widest">Latency: 284ms</span>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-end gap-10 items-center">
          <div className="flex items-center gap-3 px-5 py-2 bg-emerald-500/5 rounded-full border border-emerald-500/10">
            <CheckCircle2 size={16} className="text-emerald-500" />
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Authenticated User: cp4569@nyu.edu</span>
          </div>
          <div className="flex items-center gap-4">
             <div 
               onClick={() => addNotification('System pulse check: Status nominal', 'success')}
               className="p-3 bg-slate-900 border border-slate-800 rounded-2xl text-indigo-400 cursor-pointer hover:bg-slate-800 transition-colors"
             >
               <ZapIcon size={20} />
             </div>
             <div 
               onClick={() => addNotification('Initiating enterprise talent search...')}
               className="w-12 h-12 rounded-3xl bg-white flex items-center justify-center text-slate-950 font-black text-sm shadow-xl hover:scale-110 transition-transform cursor-pointer"
             >
               GO
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
