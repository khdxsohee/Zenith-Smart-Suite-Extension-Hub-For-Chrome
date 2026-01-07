
import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Clock, 
  Globe, 
  ShieldCheck, 
  Cpu, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';

const data = [
  { name: 'Mon', usage: 4.5 },
  { name: 'Tue', usage: 5.2 },
  { name: 'Wed', usage: 3.8 },
  { name: 'Thu', usage: 6.1 },
  { name: 'Fri', usage: 4.7 },
  { name: 'Sat', usage: 2.3 },
  { name: 'Sun', usage: 1.8 },
];

const Dashboard: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const stats = [
    { label: 'Screen Time Today', value: '4h 32m', icon: Clock, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Ads Blocked', value: '1,248', icon: ShieldCheck, color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: 'Active Extensions', value: '12', icon: Cpu, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { label: 'Pages Analyzed', value: '84', icon: Globe, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  ];

  const recentSites = [
    { name: 'GitHub', url: 'github.com', time: '1h 12m', icon: 'https://github.githubassets.com/favicons/favicon.svg' },
    { name: 'StackOverflow', url: 'stackoverflow.com', time: '45m', icon: 'https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico' },
    { name: 'Tailwind CSS', url: 'tailwindcss.com', time: '30m', icon: 'https://tailwindcss.com/favicons/favicon-32x32.png?v=3' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, i) => (
        <div key={i} className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
            </div>
          </div>
        </div>
      ))}

      {/* Chart Section */}
      <div className={`md:col-span-2 lg:col-span-3 p-6 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} flex flex-col`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold">Browser Usage Intensity</h2>
          <select className={`bg-transparent text-sm border-none focus:ring-0 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "#1e293b" : "#e2e8f0"} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: isDarkMode ? '#0f172a' : '#fff', 
                  border: isDarkMode ? '1px solid #1e293b' : '1px solid #e2e8f0',
                  borderRadius: '12px',
                  color: isDarkMode ? '#f8fafc' : '#0f172a'
                }} 
              />
              <Area type="monotone" dataKey="usage" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorUsage)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Sites */}
      <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} flex flex-col`}>
        <h2 className="text-lg font-bold mb-4">Top Sites</h2>
        <div className="space-y-4 flex-1">
          {recentSites.map((site, i) => (
            <div key={i} className="flex items-center justify-between group cursor-pointer">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
                  <img src={site.icon} alt={site.name} className="w-6 h-6 rounded" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{site.name}</h4>
                  <p className="text-xs text-slate-500">{site.url}</p>
                </div>
              </div>
              <div className="text-right flex items-center gap-2">
                <span className="text-xs font-medium text-slate-400">{site.time}</span>
                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-blue-500 transition-colors" />
              </div>
            </div>
          ))}
        </div>
        <button className="mt-6 w-full py-2.5 rounded-xl text-sm font-medium border border-slate-800 hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
          View History <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
