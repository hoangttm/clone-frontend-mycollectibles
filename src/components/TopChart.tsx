import { useState } from 'react';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';
import { ChevronUpIcon } from './Icons';
import { portfolioData } from '../data/mockData';

const timePeriods = ['7D', '30D', '90D', 'All'];

const TopChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7D');
  const { totalValue, priceChange, priceChangePercent, chartData } = portfolioData;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-white rounded-2xl p-6 flex items-center gap-5">
      {/* Balance Info */}
      <div className="flex flex-col gap-4 flex-1">
        <p className="text-lg font-bold text-gray-900">Total value</p>
        <p className="text-6xl font-bold text-black" style={{ fontFamily: "'Inria Serif', serif" }}>
          {formatCurrency(totalValue)}
        </p>
        <div className="flex items-center gap-2">
          <ChevronUpIcon size={24} className="text-positive" />
          <span className="text-base font-medium text-positive">
            +${priceChange.toFixed(2)} (+{priceChangePercent.toFixed(2)}%)
          </span>
        </div>
      </div>

      {/* Chart Section */}
      <div className="flex flex-col gap-4 items-end w-[650px]">
        <div className="w-full h-40">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4e93d7" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#4e93d7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <YAxis domain={['dataMin - 50000', 'dataMax + 50000']} hide />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#4e93d7"
                strokeWidth={2}
                fill="url(#colorValue)"
                dot={{ r: 3, fill: '#4e93d7', strokeWidth: 0 }}
                activeDot={{ r: 5, fill: '#4e93d7', strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Time Period Tabs */}
        <div className="flex items-center justify-end px-4">
          {timePeriods.map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`h-8 px-3 rounded-full text-xs font-normal transition-colors ${
                selectedPeriod === period
                  ? 'border border-gray-700 text-gray-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopChart;
