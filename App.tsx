import React, { useState } from 'react';
import ChartVisualizer from './ChartVisualizer';
import QuoteModal from './QuoteModal';
import { Calculator, Info } from 'lucide-react';

const App: React.FC = () => {
  // State for Calculator
  const [monthlyAmount, setMonthlyAmount] = useState<number>(5000);
  const [years, setYears] = useState<number>(5);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Constants
  const MIN_INCOME = 0;
  const MAX_INCOME = 100000;
  const STEP_INCOME = 500;

  const MIN_YEARS = 1;
  const MAX_YEARS = 20;

  // Format currency
  const formatMoney = (val: number) => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const totalProtection = monthlyAmount * 12 * years;

  return (
    <div className="min-h-screen font-sans flex flex-col items-center py-12 px-4 md:px-8">
      
      {/* Page Header */}
      <header className="text-center mb-12 max-w-2xl">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-4">
          Plan for the Unexpected
        </h1>
        <p className="text-gray-400 text-lg">
          Use our calculator to estimate how much coverage you actually need.
        </p>
      </header>

      {/* Main Card Container */}
      <main className="w-full max-w-7xl bg-brand-card rounded-[2rem] p-6 md:p-10 lg:p-12 shadow-2xl border border-white/5">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* LEFT COLUMN: Controls */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            
            <div className="mb-10">
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-3">
                Income Protection Calculator
              </h2>
              <p className="text-gray-400">
                Adjust the dials to visualize your coverage needs.
              </p>
            </div>

            {/* CONTROL 1: Monthly Income/Expenses */}
            <div className="mb-8 bg-brand-input/30 p-6 rounded-2xl border border-white/5">
              <div className="flex justify-between items-center mb-6">
                <label className="flex items-center text-brand-orange text-xs font-bold uppercase tracking-widest">
                  <span className="mr-2 text-lg">$</span> Monthly Income / Expenses
                </label>
                <div className="text-2xl font-serif text-white">
                  {formatMoney(monthlyAmount)}
                </div>
              </div>
              
              <div className="relative h-6 flex items-center mb-2">
                 <input
                  type="range"
                  min={MIN_INCOME}
                  max={MAX_INCOME}
                  step={STEP_INCOME}
                  value={monthlyAmount}
                  onChange={(e) => setMonthlyAmount(Number(e.target.value))}
                  className="w-full z-10 relative"
                />
                {/* Custom Track Background */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 rounded-full -translate-y-1/2 overflow-hidden pointer-events-none">
                    <div 
                        className="h-full bg-brand-orange transition-all duration-75"
                        style={{ width: `${((monthlyAmount - MIN_INCOME) * 100) / (MAX_INCOME - MIN_INCOME)}%` }}
                    />
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 font-medium">
                <span>RM 0</span>
                <span>RM 100k</span>
              </div>
            </div>

            {/* CONTROL 2: Years to Protect */}
            <div className="mb-10 bg-brand-input/30 p-6 rounded-2xl border border-white/5">
              <div className="flex justify-between items-center mb-6">
                <label className="flex items-center text-brand-orange text-xs font-bold uppercase tracking-widest">
                  <span className="mr-2 text-lg">🕒</span> Protection Duration
                </label>
                <div className="text-2xl font-serif text-white">
                  {years} Years
                </div>
              </div>
              
              <div className="relative h-6 flex items-center mb-2">
                <input
                  type="range"
                  min={MIN_YEARS}
                  max={MAX_YEARS}
                  step={1}
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full z-10 relative"
                />
                 {/* Custom Track Background */}
                 <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 rounded-full -translate-y-1/2 overflow-hidden pointer-events-none">
                    <div 
                        className="h-full bg-brand-orange transition-all duration-75"
                        style={{ width: `${((years - MIN_YEARS) * 100) / (MAX_YEARS - MIN_YEARS)}%` }}
                    />
                </div>
              </div>
              
              <div className="flex justify-between text-xs text-gray-500 font-medium mb-6">
                <span>1 Year</span>
                <span>20 Years</span>
              </div>
              
              <div className="flex items-start p-3 bg-brand-input rounded-lg border border-white/5">
                <Info className="text-brand-orange w-4 h-4 mr-2 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-400 leading-relaxed">
                  <span className="text-white font-medium">Rule of thumb:</span> Experts recommend <span className="text-white font-medium">3-6 years</span> of income protection.
                </p>
              </div>
            </div>

            {/* ACTION BUTTON */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-brand-orange text-white text-lg font-bold py-4 px-6 rounded-xl hover:bg-orange-600 transition-all transform active:scale-95 shadow-lg shadow-orange-900/20 flex items-center justify-center gap-2"
            >
              <Calculator size={20} />
              <span>Calculate & Get Quote</span>
            </button>

          </div>

          {/* RIGHT COLUMN: Visualization */}
          <div className="lg:col-span-7 flex flex-col">
             <div className="mb-6">
                <h3 className="font-serif text-xl text-white/90">Projected Income Visualization</h3>
                <p className="text-sm text-gray-500">Total income needed to cover living expenses in the event of loss of income.</p>
             </div>
             
             <div className="flex-grow bg-brand-input/30 rounded-3xl p-6 md:p-8 border border-white/5 min-h-[400px]">
                <ChartVisualizer monthlyAmount={monthlyAmount} years={years} />
             </div>
          </div>

        </div>
      </main>

      <QuoteModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        calculationData={{
            monthlyAmount,
            years,
            totalProtectionNeeded: totalProtection
        }}
      />
    </div>
  );
};

export default App;