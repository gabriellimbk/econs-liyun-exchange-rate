import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  TrendingUp, 
  Activity, 
  Anchor, 
  AlertTriangle,
  Menu,
  X
} from 'lucide-react';

import Overview from './components/Overview';
import FreeFloating from './components/regimes/FreeFloating';
import ManagedFloat from './components/regimes/ManagedFloat';
import FixedPeg from './components/regimes/FixedPeg';
import HistoricalCrises from './components/crises/HistoricalCrises';

const navItems = [
  { id: 'overview', label: 'Overview', icon: Globe },
  { id: 'free', label: 'Free Floating (US)', icon: TrendingUp },
  { id: 'managed', label: 'Managed Float (SG)', icon: Activity },
  { id: 'fixed', label: 'Fixed Peg (HK)', icon: Anchor },
  { id: 'crises', label: 'Historical Crises', icon: AlertTriangle },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <Overview />;
      case 'free': return <FreeFloating />;
      case 'managed': return <ManagedFloat />;
      case 'fixed': return <FixedPeg />;
      case 'crises': return <HistoricalCrises />;
      default: return <Overview />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-2 font-bold text-lg text-indigo-700">
          <Globe className="w-6 h-6" />
          <span>ER Regimes</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-600">
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        flex flex-col pt-16 md:pt-0
      `}>
        <div className="hidden md:flex items-center gap-2 font-bold text-xl text-indigo-700 p-6 border-b border-slate-100">
          <Globe className="w-7 h-7" />
          <span>ER Regimes</span>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left ${
                  isActive 
                    ? 'bg-indigo-50 text-indigo-700 font-medium shadow-sm border border-indigo-100' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-100 text-xs text-slate-400 text-center">
          Interactive Economics Tool
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pt-16 md:pt-0 relative bg-slate-50/50">
        <div className="max-w-5xl mx-auto p-4 md:p-8 min-h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
