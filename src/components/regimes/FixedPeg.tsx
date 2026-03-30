import { useState } from 'react';
import { motion } from 'motion/react';
import { Anchor, Info, RefreshCw, AlertCircle } from 'lucide-react';
import ScenarioQuiz from '../ScenarioQuiz';

const fixedPegScenarios = [
  { id: 'hk1', text: "Tourism Boom: Mainland tourists flood HK for shopping", correctFactorId: 'd1' },
  { id: 'hk2', text: "Travel Surge: HK residents spend heavily on overseas trips", correctFactorId: 's1' },
  { id: 'hk3', text: "Mega IPO: Foreign funds pour in to buy HK shares", correctFactorId: 'd2' },
  { id: 'hk4', text: "Capital Flight: Locals move funds to US for higher rates", correctFactorId: 's2' },
  { id: 'hk5', text: "Speculation: Traders bet HKMA will revalue peg upwards", correctFactorId: 'd3' },
  { id: 'hk6', text: "Soros Attack: Hedge funds sell HKD betting peg will break", correctFactorId: 's3' },
];

export default function FixedPeg() {
  const [demandShift, setDemandShift] = useState(0);
  const [supplyShift, setSupplyShift] = useState(0);
  const [resetKey, setResetKey] = useState(0);

  const handleCorrect = (type: 'demand' | 'supply') => {
    if (type === 'demand') {
      setDemandShift(d => Math.min(d + 40, 160));
    } else {
      setSupplyShift(s => Math.min(s + 40, 160));
    }
  };

  const pegY = 150;

  // Calculate required intervention to maintain the peg
  // To keep eqY = pegY (150):
  // 150 = 150 + (supplyShift + cbSupplyShift - demandShift) / 2
  // 0 = supplyShift + cbSupplyShift - demandShift
  // cbSupplyShift = demandShift - supplyShift
  const cbSupplyShiftNeeded = demandShift - supplyShift;
  
  // Derive reserves from the cumulative intervention needed
  // Base reserves = 400. Each unit of shift = 2.5 units of reserves.
  // Positive cbSupplyShiftNeeded means CB sells HKD (buys USD) -> Reserves increase
  // Negative cbSupplyShiftNeeded means CB buys HKD (sells USD) -> Reserves decrease
  let reserves = 400 + cbSupplyShiftNeeded * 2.5;
  let pegBroken = false;

  if (reserves <= 0) {
    pegBroken = true;
    reserves = 0;
  } else if (reserves > 1000) {
    reserves = 1000;
  }

  const cbSupplyShift = pegBroken ? 0 : cbSupplyShiftNeeded;
  
  const eqX = 150 + (demandShift + supplyShift + cbSupplyShift) / 2;
  const eqY = 150 + (supplyShift + cbSupplyShift - demandShift) / 2;

  const reset = () => {
    setDemandShift(0);
    setSupplyShift(0);
    setResetKey(k => k + 1);
  };

  return (
    <div className="space-y-8 pb-12">
      <header className="space-y-4">
        <div className="flex items-center gap-3 text-rose-600">
          <Anchor className="w-8 h-8" />
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Fixed Peg Regime
          </h1>
        </div>
        <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
          In a fixed peg (like Hong Kong's Currency Board), the exchange rate is tied to another currency (e.g., USD) at a specific rate. The central bank <strong>must</strong> intervene continuously to maintain this exact rate.
        </p>
      </header>

      <div className="grid items-start lg:grid-cols-2 gap-8">
        {/* Interactive Graph & Reserves */}
        <div className="space-y-6 lg:sticky lg:top-8">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 relative overflow-hidden">
            <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">Forex Market for Hong Kong Dollars (HKD)</h3>
            
            <div className="relative w-full aspect-square max-w-md mx-auto bg-slate-50 rounded-xl border border-slate-100 overflow-hidden">
              <svg viewBox="0 0 300 300" className="w-full h-full">
                {/* Axes */}
                <line x1="30" y1="270" x2="280" y2="270" stroke="#94a3b8" strokeWidth="2" />
                <line x1="30" y1="20" x2="30" y2="270" stroke="#94a3b8" strokeWidth="2" />
                <text x="150" y="290" textAnchor="middle" className="text-xs fill-slate-500 font-medium">Quantity of HKD</text>
                <text x="15" y="150" transform="rotate(-90 15 150)" textAnchor="middle" className="text-xs fill-slate-500 font-medium">Price of HKD in foreign $ &rarr; Stronger</text>

                {/* Fixed Peg Line */}
                <line x1="30" y1={pegY} x2="280" y2={pegY} stroke="#f43f5e" strokeWidth="3" />
                <text x="275" y={pegY - 10} textAnchor="end" className="text-[10px] fill-rose-600 font-bold">Peg: 7.80 HKD/USD</text>

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

                {/* Active Supply (Market) */}
                <motion.line 
                  x1={50 + supplyShift} y1={250} 
                  x2={250 + supplyShift} y2={50} 
                  stroke="#ef4444" strokeWidth={cbSupplyShift !== 0 ? 2 : 3} 
                  strokeDasharray={cbSupplyShift !== 0 ? "4 4" : "none"}
                  animate={{ x1: 50 + supplyShift, x2: 250 + supplyShift }}
                  transition={{ type: "spring", stiffness: 100 }}
                />
                <motion.text 
                  x={260 + supplyShift} y={45} 
                  className={`text-sm font-bold ${cbSupplyShift !== 0 ? 'fill-red-400' : 'fill-red-500'}`}
                  animate={{ x: 260 + supplyShift }}
                >{supplyShift !== 0 ? 'S1' : 'S'}</motion.text>

                {/* CB Intervention Supply (Only visible if intervening) */}
                {cbSupplyShift !== 0 && (
                  <>
                    <motion.line 
                      x1={50 + supplyShift + cbSupplyShift} y1={250} 
                      x2={250 + supplyShift + cbSupplyShift} y2={50} 
                      stroke="#10b981" strokeWidth="3" strokeDasharray="6 4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, x1: 50 + supplyShift + cbSupplyShift, x2: 250 + supplyShift + cbSupplyShift }}
                      transition={{ type: "spring", stiffness: 100 }}
                    />
                    <motion.text 
                      x={260 + supplyShift + cbSupplyShift} y={45} 
                      className="text-sm fill-emerald-600 font-bold"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, x: 260 + supplyShift + cbSupplyShift }}
                    >S2 (CB)</motion.text>
                  </>
                )}

                {/* Equilibrium Point */}
                <motion.circle 
                  cx={eqX} cy={eqY} r="5" fill={pegBroken ? "#ef4444" : "#0f172a"}
                  animate={{ cx: eqX, cy: eqY }}
                  transition={{ type: "spring", stiffness: 100 }}
                />
                
                {/* Equilibrium Lines */}
                <motion.line 
                  x1="30" y1={eqY} x2={eqX} y2={eqY} 
                  stroke={pegBroken ? "#ef4444" : "#0f172a"} strokeWidth="1" strokeDasharray="2 2"
                  animate={{ y1: eqY, y2: eqY, x2: eqX }}
                />
                <motion.line 
                  x1={eqX} y1={eqY} x2={eqX} y2="270" 
                  stroke={pegBroken ? "#ef4444" : "#0f172a"} strokeWidth="1" strokeDasharray="2 2"
                  animate={{ x1: eqX, x2: eqX, y1: eqY }}
                />
              </svg>
            </div>
          </div>

          {/* Foreign Reserves Meter */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center justify-between">
              <span>Foreign Reserves (USD)</span>
              <span className="text-rose-600 font-mono">${reserves.toFixed(0)}B</span>
            </h3>
            
            <div className="h-8 bg-slate-100 rounded-full overflow-hidden relative border border-slate-200">
              <motion.div 
                className={`h-full ${reserves < 200 ? 'bg-red-500' : 'bg-emerald-500'}`}
                animate={{ width: `${(reserves / 1000) * 100}%` }}
                transition={{ type: "spring", stiffness: 50 }}
              />
            </div>
            
            {pegBroken && (
              <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-xl text-sm font-bold flex items-center gap-2 border border-red-200">
                <AlertCircle className="w-5 h-5" />
                RESERVES DEPLETED! The peg breaks! (Currency Crisis)
              </div>
            )}
            {!pegBroken && cbSupplyShift !== 0 && (
              <div className="mt-4 p-3 bg-emerald-50 text-emerald-800 rounded-xl text-sm font-medium flex items-center gap-2 border border-emerald-200">
                <Info className="w-5 h-5" />
                {cbSupplyShift > 0 
                  ? "HKMA sells HKD (buys USD) to prevent appreciation. Reserves UP."
                  : "HKMA buys HKD (sells USD) to prevent depreciation. Reserves DOWN."}
              </div>
            )}
          </div>
        </div>

        {/* Controls & Explanation */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Knowledge Check: Market Shocks</h3>
            
            <div className="space-y-4">
              <ScenarioQuiz 
                scenarios={fixedPegScenarios} 
                onCorrect={handleCorrect} 
                resetKey={resetKey} 
              />

              <button 
                onClick={reset}
                className="w-full px-4 py-3 bg-slate-900 text-white hover:bg-slate-800 rounded-xl text-sm font-bold transition-colors mt-4 flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" /> Reset Scenario
              </button>
            </div>
          </div>

          <div className="bg-rose-50 p-6 rounded-3xl border border-rose-100">
            <h3 className="text-lg font-bold text-rose-900 mb-3 flex items-center gap-2">
              <Info className="w-5 h-5" /> Pros & Cons
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-rose-800">Pros</h4>
                <ul className="list-disc list-inside text-sm text-rose-700 space-y-1 mt-1">
                  <li>Absolute certainty for international trade and investment.</li>
                  <li>Imports credibility from the anchor currency (e.g., low inflation).</li>
                  <li>Eliminates exchange rate risk.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-rose-800">Cons</h4>
                <ul className="list-disc list-inside text-sm text-rose-700 space-y-1 mt-1">
                  <li>Total loss of independent monetary policy (must follow US Fed).</li>
                  <li>Requires massive foreign reserves to defend the peg.</li>
                  <li>Vulnerable to speculative attacks if reserves run low.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
