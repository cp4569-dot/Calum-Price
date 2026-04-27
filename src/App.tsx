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
  ArrowRight
} from 'lucide-react';
import { useState } from 'react';

// Types for our Roadmap
interface Node {
  id: string;
  title: string;
  type: 'current' | 'future' | 'milestone';
  skills: string[];
  gaps?: string[];
  department?: string;
}

const NODES: Node[] = [
  {
    id: 'prop-designer',
    title: 'Product Designer',
    type: 'current',
    skills: ['UI/UX', 'Prototyping', 'User Research'],
    department: 'Design',
  },
  {
    id: 'sr-product-designer',
    title: 'Senior Product Designer',
    type: 'milestone',
    skills: ['Design Systems', 'Mentorship', 'Strategy'],
    department: 'Design',
  },
  {
    id: 'design-lead',
    title: 'Design Lead',
    type: 'milestone',
    skills: ['Team Leadership', 'Product Vision'],
    gaps: ['Stakeholder Management'],
    department: 'Product',
  },
  {
    id: 'lead-strategist',
    title: 'Lead Strategist',
    type: 'future',
    skills: ['Market Analysis', 'Business Growth'],
    gaps: ['Financial Modeling'],
    department: 'Strategy',
  }
];

const SkillGapCard = ({ title, description }: { title: string; description: string }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-xl shadow-sm mb-4"
  >
    <div className="flex items-center gap-3">
      <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
        <AlertCircle size={20} />
      </div>
      <div>
        <h4 className="font-semibold text-orange-900 text-sm">{title}</h4>
        <p className="text-orange-700 text-xs mt-1">{description}</p>
      </div>
    </div>
  </motion.div>
);

const AISuggestionBox = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5 }}
    className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-violet-700 p-6 rounded-2xl text-white shadow-xl shadow-indigo-200/50"
  >
    <div className="absolute top-0 right-0 p-4 opacity-10">
      <Sparkles size={120} />
    </div>
    
    <div className="flex items-center gap-2 mb-4">
      <div className="bg-white/20 p-2 rounded-lg backdrop-blur-md">
        <Sparkles size={20} className="text-white" />
      </div>
      <span className="text-sm font-bold tracking-widest uppercase">AI Recommendation</span>
    </div>

    <h3 className="text-xl font-bold mb-2">Stretch Assignment: Q3 Financial Planning</h3>
    <p className="text-indigo-100 text-sm leading-relaxed mb-6">
      To bridge your gaps in <span className="text-orange-300 font-bold">Financial Modeling</span> and <span className="text-orange-300 font-bold">Stakeholder Management</span>, I recommend an 8-week rotation in the Finance department. You will assist in the annual budgetary forecasting for product-led growth initiatives.
    </p>

    <div className="flex flex-wrap gap-3">
      <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm border border-white/10">
        <MapPin size={14} /> Finance Dept
      </div>
      <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm border border-white/10">
        <TrendingUp size={14} /> 8 Week Sprint
      </div>
    </div>

    <button className="mt-8 w-full bg-white text-indigo-700 font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 hover:bg-indigo-50 transition-colors group">
      View Assignment Brief
      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
    </button>
  </motion.div>
);

export default function App() {
  const [activeNode, setActiveNode] = useState(NODES[0].id);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 selection:bg-indigo-100">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)', backgroundSize: '32px 32px' }} 
      />

      {/* Navigation */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
              <Briefcase size={22} />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">Career Growth Path</h1>
              <p className="text-xs text-slate-500 font-medium tracking-wide uppercase">Employee Profile: Calum</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-500">
              <a href="#" className="text-indigo-600">Roadmap</a>
              <a href="#" className="hover:text-slate-800 transition-colors">Skill Matrix</a>
              <a href="#" className="hover:text-slate-800 transition-colors">Performance</a>
            </nav>
            <div className="h-10 w-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop" 
                alt="Calum profile" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Roadmap Visualization */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-1">Visual Career Path</h2>
                <p className="text-slate-500 text-sm">Mapping the journey from Product Design to Strategy Lead.</p>
              </div>
              <div className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wider">
                Active Path: Standard
              </div>
            </div>

            {/* Path Visualization */}
            <div className="relative pt-8 pb-16">
              {/* Connector Line */}
              <div className="absolute top-[calc(2rem+24px)] left-8 right-8 h-1 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: '0%' }}
                  animate={{ width: '66%' }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                />
              </div>

              <div className="grid grid-cols-4 gap-4 relative z-10">
                {NODES.map((node, idx) => (
                  <div key={node.id} className="flex flex-col items-center">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveNode(node.id)}
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 relative ${
                        node.type === 'current' 
                          ? 'bg-indigo-600 text-white ring-4 ring-indigo-100 shadow-xl' 
                          : node.type === 'future'
                          ? 'bg-slate-100 text-slate-400 border-2 border-dashed border-slate-300'
                          : 'bg-white text-indigo-600 border-2 border-indigo-200 shadow-sm'
                      } ${activeNode === node.id ? 'scale-110 shadow-lg' : ''}`}
                    >
                      {idx === 0 && <Layout size={20} />}
                      {idx === 1 && <Target size={20} />}
                      {idx === 2 && <Users size={20} />}
                      {idx === 3 && <TrendingUp size={20} />}
                      
                      {activeNode === node.id && (
                        <motion.div 
                          layoutId="node-pulse"
                          className="absolute inset-0 rounded-2xl bg-indigo-500/20 animate-ping -z-10"
                        />
                      )}
                    </motion.button>
                    
                    <div className="mt-6 text-center">
                      <span className={`block font-bold text-sm ${activeNode === node.id ? 'text-indigo-600' : 'text-slate-800'}`}>
                        {node.title}
                      </span>
                      <span className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mt-1">
                        {node.department}
                      </span>
                    </div>

                    {node.gaps && node.gaps.length > 0 && (
                      <div className="mt-4">
                        <div className="flex -space-x-1">
                          {node.gaps.map((gap, i) => (
                            <div key={i} className="w-2.5 h-2.5 bg-orange-400 rounded-full border-2 border-white" title={gap} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Active Node Detail */}
            <AnimatePresence mode="wait">
              {activeNode && (
                <motion.div
                  key={activeNode}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-8 pt-8 border-t border-slate-100"
                >
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1">
                      <h4 className="flex items-center gap-2 text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">
                        Core Competencies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {NODES.find(n => n.id === activeNode)?.skills.map(skill => (
                          <span key={skill} className="bg-slate-50 px-3 py-1 rounded-lg text-sm text-slate-700 font-medium border border-slate-200">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {NODES.find(n => n.id === activeNode)?.gaps && (
                      <div className="flex-1">
                        <h4 className="flex items-center gap-2 text-sm font-bold text-orange-600 uppercase tracking-widest mb-4">
                          Development Areas
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {NODES.find(n => n.id === activeNode)?.gaps?.map(gap => (
                            <span key={gap} className="bg-orange-50 px-3 py-1 rounded-lg text-sm text-orange-700 font-bold border border-orange-200">
                              {gap}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 flex gap-4 items-start shadow-sm">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <PieChart size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800">Skill Progress</h4>
                <p className="text-sm text-slate-500 mt-1">You are 68% proficient for your current role requirements.</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-6 flex gap-4 items-start shadow-sm">
              <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                <TrendingUp size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800">Next Milestone</h4>
                <p className="text-sm text-slate-500 mt-1">Design Lead target date: Q1 2027 based on current growth velocity.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Skill Gaps & AI Advice */}
        <div className="lg:col-span-4 space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <h3 className="text-lg font-bold text-slate-800">Identified Gaps</h3>
              <div className="px-2 py-0.5 bg-orange-100 text-orange-600 rounded text-[10px] font-bold">2 CRITICAL</div>
            </div>
            
            <SkillGapCard 
              title="Stakeholder Management" 
              description="Requires transition from design execution to cross-functional alignment and executive persuasion."
            />
            <SkillGapCard 
              title="Financial Modeling" 
              description="Necessary for Lead Strategist role to project ROI on new product initiatives and market expansions."
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800">Growth Catalyst</h3>
              <div className="flex items-center gap-1 text-xs text-indigo-600 font-bold hover:underline cursor-pointer">
                Refresh Advice <ChevronRight size={14} />
              </div>
            </div>
            <AISuggestionBox />
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 text-white overflow-hidden relative">
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <Users size={120} />
            </div>
            <h4 className="font-bold mb-2">Mentor Network</h4>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              We've found 3 Directors in Finance who previously held Design titles.
            </p>
            <div className="flex -space-x-3 mb-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-700 overflow-hidden ring-2 ring-indigo-500/30">
                  <img src={`https://i.pravatar.cc/100?u=mentor${i}`} alt="mentor" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-indigo-600 flex items-center justify-center text-[10px] font-bold">
                +12
              </div>
            </div>
            <button className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 py-3 rounded-xl text-xs font-bold transition-colors">
              Request Introduction
            </button>
          </div>
        </div>
      </main>

      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-200 mt-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-50 grayscale">
            <Briefcase size={18} />
            <span className="text-sm font-bold tracking-tighter italic">Lumina HR Systems</span>
          </div>
          <div className="flex gap-8 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <a href="#" className="hover:text-slate-600 transition-colors">Data Privacy</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Security</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Career API</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
