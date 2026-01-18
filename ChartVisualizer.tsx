import React, { useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

interface ChartVisualizerProps {
  monthlyAmount: number;
  years: number;
}

const ChartVisualizer: React.FC<ChartVisualizerProps> = ({ monthlyAmount, years }) => {
  const data = useMemo(() => {
    const chartData = [];
    const yearlyIncome = monthlyAmount * 12;
    
    // Generate data points for each year + 1 (starting at 0)
    for (let i = 0; i <= years; i++) {
        chartData.push({
            year: `Year ${i}`,
            yearNum: i,
            value: yearlyIncome * i,
        });
    }
    return chartData;
  }, [monthlyAmount, years]);

  const totalValue = monthlyAmount * 12 * years;

  const formatCurrencyYAxis = (value: number) => {
    if (value === 0) return 'RM 0k';
    if (value >= 1000000) return `RM ${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `RM ${(value / 1000).toFixed(0)}k`;
    return `RM ${value}`;
  };

  return (
    <div className="w-full h-full flex flex-col relative">
      {/* Chart Header - Overlay */}
      <div className="absolute top-0 left-0 z-10 pointer-events-none">
        <p className="text-xs text-brand-orange font-bold uppercase tracking-widest mb-1">Total Coverage Needed</p>
        <p className="text-4xl md:text-5xl font-serif text-white">
            {new Intl.NumberFormat('en-MY', { style: 'currency', currency: 'MYR', maximumFractionDigits: 0 }).format(totalValue)}
        </p>
      </div>

      <div className="w-full h-full pt-20">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 20,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff5400" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#ff5400" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
            <XAxis 
                dataKey="yearNum" 
                tick={{fill: '#9ca3af', fontSize: 12}} 
                axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                tickLine={false}
                tickFormatter={(val) => `Year ${val}`}
                dy={10}
            />
            <YAxis 
                tickFormatter={formatCurrencyYAxis} 
                tick={{fill: '#9ca3af', fontSize: 12}} 
                axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                tickLine={false}
                width={70}
            />
            <Tooltip 
                formatter={(value: number) => [new Intl.NumberFormat('en-MY', { style: 'currency', currency: 'MYR' }).format(value), 'Coverage']}
                labelFormatter={(label) => `Duration: ${label} years`}
                contentStyle={{ 
                    backgroundColor: '#163325', 
                    borderRadius: '12px', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
                    color: '#fff'
                }}
                itemStyle={{ color: '#ff5400' }}
            />
            
            <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#ff5400" 
                strokeWidth={3}
                fill="url(#colorValue)" 
                animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartVisualizer;