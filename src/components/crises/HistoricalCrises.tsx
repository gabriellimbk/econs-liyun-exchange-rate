import { AlertTriangle, TrendingDown, ShieldAlert, ArrowRight } from 'lucide-react';

export default function HistoricalCrises() {
  return (
    <div className="space-y-8 pb-12">
      <header className="space-y-4">
        <div className="flex items-center gap-3 text-amber-600">
          <AlertTriangle className="w-8 h-8" />
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Historical Currency Crises
          </h1>
        </div>
        <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
          Exchange rate regimes are not just theoretical concepts. When a country chooses the wrong regime or fails to maintain it, the economic consequences can be devastating. Let's examine two major historical events.
        </p>
      </header>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Asian Financial Crisis */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mb-6">
            <TrendingDown className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Asian Financial Crisis (1997)</h2>
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">The Danger of Unsustainable Pegs</h3>
          
          <div className="space-y-4 text-slate-600">
            <p>
              <strong>The Context (Macro Goal: FDI & Export Growth):</strong> In the 1990s, countries like Thailand pegged their currencies (e.g., the Baht) to the US Dollar. This eliminated exchange rate risk, encouraging Foreign Direct Investment (FDI) and stabilizing prices for international trade.
            </p>
            <p>
              <strong>The External Shock (Current Account Deficit):</strong> As the US economy boomed, the USD appreciated. Tied to the USD, the Baht also appreciated against other major currencies.
              <br/><span className="text-sm text-slate-500 mt-1 block"><strong>The "Why":</strong> A stronger Baht made Thai exports more expensive and imports cheaper. Assuming the Marshall-Lerner condition holds, net export revenue (X - M) fell, leading to a massive Current Account deficit. Thailand was spending more foreign currency than it was earning.</span>
            </p>
            <p>
              <strong>The Speculative Attack (Depleting Reserves):</strong> Currency speculators realized Thailand's foreign reserves were insufficient to sustain this deficit and short-sold the Baht.
              <br/><span className="text-sm text-slate-500 mt-1 block"><strong>The "Why":</strong> Panic led to massive outflows of "hot money". In the forex market, the supply of Baht surged. To maintain the fixed exchange rate, the Bank of Thailand had to artificially increase demand by buying up Baht using its limited US Dollar foreign reserves.</span>
            </p>
            <div className="bg-red-50 border border-red-100 p-4 rounded-xl text-red-800 text-sm mt-4">
              <strong>The Collapse:</strong> In July 1997, Thailand ran out of foreign reserves and was forced to float the Baht. It immediately depreciated by over 50%.
              <br/><span className="mt-2 block"><strong>The "Why":</strong> This massive depreciation caused severe imported inflation. Furthermore, Thai firms with USD-denominated debts saw their debt burdens double overnight in local currency terms. This led to widespread bankruptcies, a collapse in Investment (I) and Consumption (C), causing Aggregate Demand (AD) to plummet and resulting in a severe recession.</span>
            </div>
          </div>
        </div>

        {/* Argentina's Currency Struggles */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Argentina's Currency Crisis (2001)</h2>
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">The Cost of Losing Monetary Independence</h3>
          
          <div className="space-y-4 text-slate-600">
            <p>
              <strong>The Context (Macro Goal: Low Inflation):</strong> In 1991, Argentina suffered from hyperinflation. To restore confidence, they established a strict Fixed Exchange Rate (a "Currency Board"), pegging the Argentine Peso exactly 1:1 to the US Dollar. This successfully anchored inflation expectations.
            </p>
            <p>
              <strong>The External Shock (Loss of Competitiveness):</strong> In the late 90s, the US Dollar appreciated significantly globally. Because the Peso was locked 1:1 to the USD, the Peso <em>also</em> appreciated against Argentina's trading partners (like Brazil). 
              <br/><span className="text-sm text-slate-500 mt-1 block"><strong>The "Why":</strong> A stronger Peso meant Argentina's exports became more expensive in foreign currency, while imports became cheaper. Assuming the Marshall-Lerner condition holds, net exports (X - M) fell. Since AD = C + I + G + (X - M), Aggregate Demand fell, leading to a multiplied contraction in national income and rising cyclical unemployment.</span>
            </p>
            <p>
              <strong>The Policy Paralysis (Hot Money Flows):</strong> Facing a severe recession, a central bank would normally use Expansionary Monetary Policy (lowering interest rates) to boost Consumption (C) and Investment (I). Argentina <em>could not do this</em>.
              <br/><span className="text-sm text-slate-500 mt-1 block"><strong>The "Why":</strong> If Argentina lowered interest rates, it would trigger massive outflows of "hot money" seeking higher returns elsewhere. This capital flight would create massive supply of Pesos in the forex market, putting severe downward pressure on the exchange rate. To defend the 1:1 peg, the central bank would have to rapidly drain its foreign reserves to buy up those Pesos.</span>
            </p>
            <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl text-amber-800 text-sm mt-4">
              <strong>The Collapse:</strong> Trapped in a recession with no ability to lower interest rates, investors panicked and pulled their capital out anyway. Foreign reserves were depleted. In 2002, Argentina was forced to abandon the peg. The Peso's value plummeted, and the country defaulted on its foreign debt.
            </div>
          </div>
        </div>
      </div>

      {/* Key Takeaways */}
      <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-lg mt-8">
        <h2 className="text-2xl font-bold mb-6">The "Impossible Trinity" (The Trilemma)</h2>
        <p className="text-slate-300 mb-6 max-w-3xl">
          These crises illustrate a fundamental concept in international economics. A country cannot simultaneously have all three of the following:
        </p>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
            <div className="font-bold text-indigo-400 mb-2">1. Fixed Exchange Rate</div>
            <p className="text-sm text-slate-400">Stability for trade and investment.</p>
          </div>
          <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
            <div className="font-bold text-emerald-400 mb-2">2. Free Capital Flow</div>
            <p className="text-sm text-slate-400">Money can move in and out of the country freely.</p>
          </div>
          <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
            <div className="font-bold text-rose-400 mb-2">3. Independent Monetary Policy</div>
            <p className="text-sm text-slate-400">Ability to set interest rates to manage domestic inflation/growth.</p>
          </div>
        </div>
        
        <div className="mt-6 text-sm text-slate-400 flex items-center gap-2">
          <ArrowRight className="w-4 h-4 text-slate-500" />
          Countries must choose two and give up the third.
        </div>
      </div>
    </div>
  );
}
