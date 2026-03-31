import { useState } from 'react';
import { motion } from 'motion/react';
import { Activity, Info, RefreshCw } from 'lucide-react';
import ScenarioQuiz from '../ScenarioQuiz';

const managedFloatScenarios = [
  { id: 'sg1', text: "Export Surge: High demand for SG electronics & pharma", correctFactorId: 'd1' },
  { id: 'sg2', text: "Import Reliance: SG increases spending on foreign food & energy", correctFactorId: 's1' },
  { id: 'sg3', text: "Safe Haven: Multinationals move Asian HQs to Singapore", correctFactorId: 'd2' },
  { id: 'sg4', text: "Overseas Expansion: SG wealth funds invest heavily abroad", correctFactorId: 's2' },
  { id: 'sg5', text: "Speculation: Traders expect MAS to tighten policy (appreciate)", correctFactorId: 'd3' },
  { id: 'sg6', text: "Speculation: Traders sell SGD anticipating regional slowdown", correctFactorId: 's3' },
];

export default function ManagedFloat() {
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

  const upperBound = 120; // Stronger SGD (lower Y)
  const lowerBound = 180; // Weaker SGD (higher Y)

  // Free market equilibrium without CB intervention
  const freeY = 150 + (supplyShift - demandShift) / 2;
  
  let cbSupplyShift = 0;
  let cbDemandShift = 0;
  let interventionMsg = null;

  if (freeY < upperBound) {
    // ER is too strong (y is too low). CB needs to sell SGD (increase supply).
    cbSupplyShift = demandShift - supplyShift - 60;
    interventionMsg = "MAS sells SGD (increases supply) to prevent excessive appreciation.";
  } else if (freeY > lowerBound) {
    // ER is too weak (y is too high). CB needs to buy SGD (increase demand).
    cbDemandShift = supplyShift - demandShift - 60;
    interventionMsg = "MAS buys SGD (increases demand) to prevent excessive depreciation.";
  }

  const eqX = 150 + (demandShift + cbDemandShift + supplyShift + cbSupplyShift) / 2;
  const eqY = 150 + (supplyShift + cbSupplyShift - (demandShift + cbDemandShift)) / 2;

  const reset = () => {
    setDemandShift(0);
    setSupplyShift(0);
    setResetKey(k => k + 1);
  };

  return (
    <div className="space-y-8 pb-12">
      <header className="space-y-4">
        <div className="flex items-center gap-3 text-emerald-600">
          <Activity className="w-8 h-8" />
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Managed Float Regime
          </h1>
        </div>
        <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
          In a managed float (like Singapore's BBC framework), the exchange rate fluctuates freely within a <strong>policy band</strong>. The central bank intervenes only when the rate hits the edges of the band.
        </p>
      </header>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Interactive Graph */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 lg:sticky lg:top-8 self-start">
          <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">Forex Market for Singapore Dollars (SGD)</h3>
          
          <div className="relative w-full aspect-square max-w-md mx-auto bg-slate-50 rounded-xl border border-slate-100 overflow-hidden">
            <svg viewBox="0 0 300 300" className="w-full h-full">
              {/* Axes */}
              <line x1="30" y1="270" x2="280" y2="270" stroke="#94a3b8" strokeWidth="2" />
              <line x1="30" y1="20" x2="30" y2="270" stroke="#94a3b8" strokeWidth="2" />
              <text x="150" y="290" textAnchor="middle" className="text-xs fill-slate-500 font-medium">Quantity of SGD</text>
              <text x="15" y="150" transform="rotate(-90 15 150)" textAnchor="middle" className="text-xs fill-slate-500 font-medium">Price of SGD in foreign $ &rarr; Stronger</text>

              {/* Policy Band */}
              <rect x="30" y={upperBound} width="250" height={lowerBound - upperBound} fill="#10b981" fillOpacity="0.1" />
              <line x1="30" y1={upperBound} x2="280" y2={upperBound} stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="30" y1={lowerBound} x2="280" y2={lowerBound} stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" />
              <text x="275" y={upperBound - 5} textAnchor="end" className="text-[10px] fill-emerald-600 font-bold">Upper Bound</text>
              <text x="275" y={lowerBound + 12} textAnchor="end" className="text-[10px] fill-emerald-600 font-bold">Lower Bound</text>

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
                stroke="#3b82f6" strokeWidth={cbDemandShift !== 0 ? 2 : 3} 
                strokeDasharray={cbDemandShift !== 0 ? "4 4" : "none"}
                animate={{ x1: 50 + demandShift, x2: 250 + demandShift }}
                transition={{ type: "spring", stiffness: 100 }}
              />
              <motion.text 
                x={260 + demandShift} y={260} 
                className={`text-sm font-bold ${cbDemandShift !== 0 ? 'fill-blue-400' : 'fill-blue-600'}`}
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

              {/* CB Intervention Demand (Only visible if intervening) */}
              {cbDemandShift !== 0 && (
                <>
                  <motion.line 
                    x1={50 + demandShift + cbDemandShift} y1={50} 
                    x2={250 + demandShift + cbDemandShift} y2={250} 
                    stroke="#10b981" strokeWidth="3" strokeDasharray="6 4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, x1: 50 + demandShift + cbDemandShift, x2: 250 + demandShift + cbDemandShift }}
                    transition={{ type: "spring", stiffness: 100 }}
                  />
                  <motion.text 
                    x={260 + demandShift + cbDemandShift} y={260} 
                    className="text-sm fill-emerald-600 font-bold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, x: 260 + demandShift + cbDemandShift }}
                  >D2 (CB)</motion.text>
                </>
              )}

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

          <div className="mt-6 text-center h-12">
            {interventionMsg ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full text-sm font-bold text-emerald-800 border border-emerald-200"
              >
                {interventionMsg}
              </motion.div>
            ) : (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-sm font-semibold text-slate-700">
                ER is within policy band. No intervention.
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
                scenarios={managedFloatScenarios} 
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

          <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100">
            <h3 className="text-lg font-bold text-emerald-900 mb-3 flex items-center gap-2">
              <Info className="w-5 h-5" /> Pros & Cons
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-emerald-800">Pros</h4>
                <ul className="list-disc list-inside text-sm text-emerald-700 space-y-1 mt-1">
                  <li>Provides stability while allowing some flexibility.</li>
                  <li>Prevents extreme volatility that hurts trade.</li>
                  <li>Can be used to control imported inflation (like SG does).</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-emerald-800">Cons</h4>
                <ul className="list-disc list-inside text-sm text-emerald-700 space-y-1 mt-1">
                  <li>Requires significant foreign exchange reserves.</li>
                  <li>Loss of some monetary policy independence (Impossible Trinity).</li>
                  <li>Can be target of speculative attacks if band is perceived as unsustainable.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
