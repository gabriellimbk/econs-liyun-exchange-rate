import { ArrowRight, Globe, TrendingUp, Activity, Anchor } from 'lucide-react';

export default function Overview() {
  return (
    <div className="space-y-8 pb-12">
      <header className="space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Exchange Rate Regimes
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
          An exchange rate is the price of one currency in terms of another. How this price is determined depends on the <strong>Exchange Rate Regime</strong> adopted by a country's central bank or government.
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Free Floating</h3>
          <p className="text-slate-600 mb-4">
            Determined entirely by market forces of supply and demand without government intervention.
          </p>
          <div className="flex items-center gap-2 text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg w-fit">
            <Globe className="w-4 h-4" /> Example: US Dollar (USD)
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
            <Activity className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Managed Float</h3>
          <p className="text-slate-600 mb-4">
            Market forces determine the rate, but the central bank intervenes to keep it within a target band.
          </p>
          <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg w-fit">
            <Globe className="w-4 h-4" /> Example: Singapore Dollar (SGD)
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center mb-4">
            <Anchor className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Fixed Peg</h3>
          <p className="text-slate-600 mb-4">
            The currency's value is tied to another major currency (like the USD) at a specific rate.
          </p>
          <div className="flex items-center gap-2 text-sm font-medium text-rose-600 bg-rose-50 px-3 py-1.5 rounded-lg w-fit">
            <Globe className="w-4 h-4" /> Example: Hong Kong Dollar (HKD)
          </div>
        </div>
      </div>

      <div className="bg-indigo-900 text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-4">Why does it matter?</h2>
          <p className="text-indigo-100 text-lg mb-6 max-w-2xl">
            The choice of exchange rate regime affects a country's monetary policy independence, inflation rates, and vulnerability to external shocks. Understanding these regimes is crucial for grasping international economics.
          </p>
          <div className="flex items-center gap-2 text-indigo-200 font-medium">
            Use the sidebar to explore each regime interactively <ArrowRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
}
