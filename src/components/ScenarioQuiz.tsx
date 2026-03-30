import { useState, useEffect } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

export const THEORETICAL_FACTORS = [
  { id: 'd1', text: "Demand: Due to demand for the country's exports", type: 'demand' },
  { id: 'd2', text: "Demand: Due to demand to invest in the country", type: 'demand' },
  { id: 'd3', text: "Demand: Due to currency speculators betting the currency will appreciate", type: 'demand' },
  { id: 's1', text: "Supply: Due to the country's demand for foreign imports", type: 'supply' },
  { id: 's2', text: "Supply: Due to domestic investors' willingness to invest abroad", type: 'supply' },
  { id: 's3', text: "Supply: Due to currency speculators betting the currency will depreciate", type: 'supply' },
];

export type Scenario = {
  id: string;
  text: string;
  correctFactorId: string;
};

export default function ScenarioQuiz({
  scenarios,
  onCorrect,
  resetKey
}: {
  scenarios: Scenario[];
  onCorrect: (type: 'demand' | 'supply') => void;
  resetKey: number;
}) {
  const [shuffledScenarios, setShuffledScenarios] = useState<Scenario[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Record<string, 'correct' | 'incorrect'>>({});

  useEffect(() => {
    // Shuffle scenarios on mount or reset
    const shuffled = [...scenarios].sort(() => Math.random() - 0.5);
    setShuffledScenarios(shuffled);
    setAnswers({});
    setStatus({});
  }, [resetKey, scenarios]);

  const handleSelect = (scenarioId: string, factorId: string) => {
    if (status[scenarioId] === 'correct') return;

    setAnswers(prev => ({ ...prev, [scenarioId]: factorId }));
    
    const scenario = scenarios.find(s => s.id === scenarioId);
    if (scenario?.correctFactorId === factorId) {
      setStatus(prev => ({ ...prev, [scenarioId]: 'correct' }));
      const factor = THEORETICAL_FACTORS.find(f => f.id === factorId);
      if (factor) {
        onCorrect(factor.type as 'demand' | 'supply');
      }
    } else {
      setStatus(prev => ({ ...prev, [scenarioId]: 'incorrect' }));
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600 mb-4">
        Match each real-life scenario below to the correct theoretical factor. The market graph will only update when you select the correct answer!
      </p>
      {shuffledScenarios.map(scenario => {
        const isCorrect = status[scenario.id] === 'correct';
        const isIncorrect = status[scenario.id] === 'incorrect';

        return (
          <div key={scenario.id} className={`p-4 rounded-xl border transition-colors ${isCorrect ? 'bg-emerald-50 border-emerald-200' : isIncorrect ? 'bg-rose-50 border-rose-200' : 'bg-slate-50 border-slate-200'}`}>
            <p className="text-sm font-semibold text-slate-800 mb-3">{scenario.text}</p>
            
            <div className="flex flex-col gap-2">
              <select 
                className={`w-full p-2.5 text-sm rounded-lg border ${isCorrect ? 'border-emerald-300 bg-emerald-100/50 text-emerald-900 font-medium' : 'border-slate-300 bg-white text-slate-700'} focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-100`}
                value={answers[scenario.id] || ''}
                onChange={(e) => handleSelect(scenario.id, e.target.value)}
                disabled={isCorrect}
              >
                <option value="" disabled>Select the theoretical factor...</option>
                {THEORETICAL_FACTORS.map(factor => (
                  <option key={factor.id} value={factor.id}>{factor.text}</option>
                ))}
              </select>

              {isCorrect && (
                <div className="flex items-center gap-1.5 text-emerald-600 text-sm font-medium mt-1">
                  <CheckCircle2 className="w-4 h-4" /> Correct! The {THEORETICAL_FACTORS.find(f => f.id === scenario.correctFactorId)?.type} curve has shifted.
                </div>
              )}
              {isIncorrect && (
                <div className="flex items-start gap-1.5 text-rose-600 text-sm font-medium mt-1">
                  <XCircle className="w-4 h-4 shrink-0 mt-0.5" /> 
                  <span>Incorrect. Hint: Think about whether this involves foreigners buying the domestic currency (Demand) or locals selling it to buy foreign currency (Supply).</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
