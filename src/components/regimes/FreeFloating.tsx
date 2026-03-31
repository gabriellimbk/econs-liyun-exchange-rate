import { useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Info, RefreshCw } from 'lucide-react';
import ScenarioQuiz from '../ScenarioQuiz';

const freeFloatingScenarios = [
  { id: 'us1', text: "Tech Boom: Global demand for US software & AI", correctFactorId: 'd1' },
  { id: 'us2', text: "Consumer Binge: US imports more foreign goods", correctFactorId: 's1' },
  { id: 'us3', text: "Fed Hikes Rates: Hot money flows into US bonds", correctFactorId: 'd2' },
  { id: 'us4', text: "Yield Chasing: US funds invest in emerging markets", correctFactorId: 's2' },
  { id: 'us5', text: "Speculation: Funds bet USD will appreciate", correctFactorId: 'd3' },
  { id: 'us6', text: "Speculation: Traders sell USD fearing recession", correctFactorId: 's3' },
];

export default function FreeFloating() {
  const [demandShift, setDemandShift] = useState(0);
  const [supplyShift, setSupplyShift] = useState(0);
  const [resetKey, setResetKey] = useState(0);

  const handleCorrect = (type: 'demand' | 'supply', direction: 'increased' | 'decreased' = 'increased') => {
    const shiftAmount = direction === 'increased' ? 40 : -40;
    if (type === 'demand') {
      setDemandShift(d => Math.min(Math.max(d + shiftAmount, -120), 120));
    } else {
      setSupplyShift(s => Math.min(Math.max(s + shiftAmount, -120), 120));
    }
  };

  // Calculate new equilibrium
  const eqX = 150 + (demandShift + supplyShift) / 2;
  const eqY = 150 + (supplyShift - demandShift) / 2;

  const reset = () => {
    setDemandShift(0);
    setSupplyShift(0);
    setResetKey(k => k + 1);
  };

  return (
    <div className="space-y-8 pb-12">
      <header className="space-y-4">
        <div className="flex items-center gap-3 text-blue-600">
          <TrendingUp className="w-8 h-8" />
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Free Floating Regime
          </h1>
        </div>
        <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
          In a free floating regime, the exchange rate is determined entirely by the market forces of <strong>Supply</strong> and <strong>Demand</strong>. The central bank does not intervene to set the price.
        </p>
      </header>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Interactive Graph */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 lg:sticky lg:top-8 self-start">
          <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">Forex Market for US Dollars (USD)</h3>
          
          <div className="relative w-full aspect-square max-w-md mx-auto bg-slate-50 rounded-xl border border-slate-100 overflow-hidden">
            <svg viewBox="0 0 300 300" className="w-full h-full">
              {/* Axes */}
              <line x1="30" y1="270" x2="280" y2="270" stroke="#94a3b8" strokeWidth="2" />
              <line x1="30" y1="20" x2="30" y2="270" stroke="#94a3b8" strokeWidth="2" />
              <text x="150" y="290" textAnchor="middle" className="text-xs fill-slate-500 font-medium">Quantity of USD</text>
              <text x="15" y="150" transform="rotate(-90 15 150)" textAnchor="middle" className="text-xs fill-slate-500 font-medium">Price of USD in foreign $ &rarr; Stronger</text>

              {/* Base Demand */}
              <line x1="50" y1="50" x2="250" y2="250" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />
              <text x="255" y="255" className="text-xs fill-slate-400 font-bold">D</text>
              
              {/* Base Supply */}
              <line x1="50" y1="250" x2="250" y2="50" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />
              <text x="255" y="45" className="text-xs fill-slate-400 font-bold">S</text>

              {/* Active Demand */}
              <motion.line 
                x1={50 + demandShift} y1={50} 
                x2={250 + demandShift} y2={250} 
                stroke="#3b82f6" strokeWidth="3" 
                animate={{ x1: 50 + demandShift, x2: 250 + demandShift }}
                transition={{ type: "spring", stiffness: 100 }}
              />
              <motion.text 
                x={260 + demandShift} y={260} 
                className="text-sm fill-blue-600 font-bold"
                animate={{ x: 260 + demandShift }}
              >{demandShift !== 0 ? 'D1' : 'D'}</motion.text>

              {/* Active Supply */}
              <motion.line 
                x1={50 + supplyShift} y1={250} 
                x2={250 + supplyShift} y2={50} 
                stroke="#ef4444" strokeWidth="3" 
                animate={{ x1: 50 + supplyShift, x2: 250 + supplyShift }}
                transition={{ type: "spring", stiffness: 100 }}
              />
              <motion.text 
                x={260 + supplyShift} y={45} 
                className="text-sm fill-red-500 font-bold"
                animate={{ x: 260 + supplyShift }}
              >{supplyShift !== 0 ? 'S1' : 'S'}</motion.text>

              {/* Equilibrium Point */}
              <motion.circle 
                cx={eqX} cy={eqY} r="5" fill="#0f172a"
                animate={{ cx: eqX, cy: eqY }}
                transition={{ type: "spring", stiffness: 100 }}
              />
              
              {/* Equilibrium Lines */}
              <motion.line 
                x1="30" y1={eqY} x2={eqX} y2={eqY} 
                stroke="#0f172a" strokeWidth="1" strokeDasharray="2 2"
                animate={{ y1: eqY, y2: eqY, x2: eqX }}
              />
              <motion.line 
                x1={eqX} y1={eqY} x2={eqX} y2="270" 
                stroke="#0f172a" strokeWidth="1" strokeDasharray="2 2"
                animate={{ x1: eqX, x2: eqX, y1: eqY }}
              />
            </svg>
          </div>

          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-sm font-semibold text-slate-700">
              Current ER: <span className={eqY < 150 ? 'text-green-600' : eqY > 150 ? 'text-red-600' : ''}>
                {eqY < 150 ? 'Appreciated' : eqY > 150 ? 'Depreciated' : 'Equilibrium'}
              </span>
            </div>
          </div>
        </div>

        {/* Controls & Explanation */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Knowledge Check: Market Shocks</h3>
            
            <div className="space-y-4">
              <ScenarioQuiz 
                scenarios={freeFloatingScenarios} 
                onCorrect={handleCorrect} 
                resetKey={resetKey} 
              />

              <button 
                onClick={reset}
                className="w-full px-4 py-3 bg-slate-900 text-white hover:bg-slate-800 rounded-xl text-sm font-bold transition-colors mt-4 flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" /> Reset Market
              </button>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
            <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
              <Info className="w-5 h-5" /> Pros & Cons
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-blue-800">Pros</h4>
                <ul className="list-disc list-inside text-sm text-blue-700 space-y-1 mt-1">
                  <li>Automatic adjustment to economic shocks.</li>
                  <li>Independent monetary policy (can set interest rates freely, assuming free capital flow).</li>
                  <li>No need to hold massive foreign reserves.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-800">Cons</h4>
                <ul className="list-disc list-inside text-sm text-blue-700 space-y-1 mt-1">
                  <li>High volatility and uncertainty for trade/investment.</li>
                  <li>Can be driven by speculation rather than fundamentals.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
