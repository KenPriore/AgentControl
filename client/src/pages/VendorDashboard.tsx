import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip as RechartsTooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Users, FileText, AlertTriangle, Scale, Clock, CheckCircle2, TrendingUp, DollarSign, Briefcase } from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Data for charts
const renewalData = [
  { month: "OVERDUE", value: 700, fill: "#e2e8f0" },
  { month: "FEB", value: 250, fill: "#3b82f6" },
  { month: "MAR", value: 150, fill: "#60a5fa" },
  { month: "APR", value: 300, fill: "#34d399" },
  { month: "MAY", value: 350, fill: "#34d399" },
  { month: "JUN", value: 100, fill: "#34d399" },
  { month: "JUL", value: 250, fill: "#d1fae5" },
  { month: "AUG", value: 600, fill: "#d1fae5" },
  { month: "SEP", value: 650, fill: "#d1fae5" },
];

const categoryData = [
  { name: "Services", value: 45, fill: "#34d399" },
  { name: "Software", value: 25, fill: "#60a5fa" },
  { name: "Hardware", value: 15, fill: "#818cf8" },
  { name: "Consulting", value: 15, fill: "#d1fae5" },
];

const riskData = [
  { category: "Vendors", low: 13, medium: 21, high: 44, critical: 8 },
  { category: "Contracts", low: 13, medium: 21, high: 44, critical: 8 },
];

export default function VendorDashboard() {
  return (
    <div className="flex flex-col gap-6 max-w-[1600px] mx-auto p-6 bg-[#0f172a] text-slate-100 min-h-screen">
      
      {/* Top Stats Row - Dark blue aesthetic with vertical dividers */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-slate-700 bg-[#1e293b] rounded-lg border border-slate-700 shadow-lg">
        <StatItem label="Total Annual Value" value="$17 MM" icon={DollarSign} />
        <StatItem label="Categories" value="14" icon={Briefcase} />
        <StatItem label="Suppliers" value="116" icon={Users} />
        <StatItem label="Contracts" value="236" icon={FileText} />
        <StatItem label="Open Risks" value="5" icon={AlertTriangle} highlight="text-red-400" />
        <StatItem label="Open Actions" value="9" icon={Scale} />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Contract Renewals Timeline - Large Bar Chart */}
        <Card className="lg:col-span-2 border-slate-700 bg-[#1e293b] shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-slate-100 flex items-center gap-2">
              <Clock className="h-4 w-4 text-slate-400" />
              Contract Renewals Timeline
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={renewalData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis 
                  dataKey="month" 
                  stroke="#94a3b8" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#94a3b8" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  label={{ value: 'Contract Amount ($)', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 10 }}
                />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '6px' }}
                  itemStyle={{ color: '#e2e8f0' }}
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={30}>
                  {renewalData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* RAG Status - Horizontal Stacked Bars */}
        <Card className="border-slate-700 bg-[#1e293b] shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-slate-100 flex items-center justify-between">
              <span className="flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-slate-400" /> Risk Analysis</span>
              <span className="text-xs font-normal text-slate-400">Red Amber Green Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col justify-center gap-8 py-8">
            {riskData.map((item) => (
              <div key={item.category} className="space-y-2">
                <div className="flex justify-between text-sm text-slate-300 mb-1">
                  <span>{item.category}</span>
                  <div className="flex gap-4 text-xs text-slate-400">
                    <span className="text-red-400 font-bold">{item.low}%</span>
                    <span className="text-amber-400 font-bold">{item.medium}%</span>
                    <span className="text-emerald-400 font-bold">{item.high}%</span>
                    <span className="text-slate-400 font-bold">{item.critical}%</span>
                  </div>
                </div>
                <div className="flex h-6 w-full overflow-hidden rounded-full bg-slate-800">
                  <div className="bg-red-600 h-full flex items-center justify-center text-[10px] font-bold text-white" style={{ width: `${item.low}%` }}></div>
                  <div className="bg-amber-500 h-full flex items-center justify-center text-[10px] font-bold text-black" style={{ width: `${item.medium}%` }}></div>
                  <div className="bg-emerald-500 h-full flex items-center justify-center text-[10px] font-bold text-black" style={{ width: `${item.high}%` }}></div>
                  <div className="bg-slate-500 h-full flex items-center justify-center text-[10px] font-bold text-white" style={{ width: `${item.critical}%` }}></div>
                </div>
              </div>
            ))}
            
            <div className="flex justify-center gap-4 mt-4">
               <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-600"></div><span className="text-xs text-slate-400">High Risk</span></div>
               <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-amber-500"></div><span className="text-xs text-slate-400">Medium</span></div>
               <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500"></div><span className="text-xs text-slate-400">Low Risk</span></div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Row */}
        
        {/* Contract Concentration */}
        <Card className="border-slate-700 bg-[#1e293b] shadow-lg">
           <CardHeader className="pb-2">
             <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-medium text-slate-100 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-slate-400" /> Contracts
                </CardTitle>
                <div className="text-right">
                  <div className="text-sm font-bold text-emerald-400">$17MM</div>
                  <div className="text-xs text-slate-400">236 Total</div>
                </div>
             </div>
           </CardHeader>
           <CardContent className="space-y-6 pt-4">
             <div>
               <div className="flex justify-between text-xs mb-1">
                 <span className="text-slate-300">Top 10 Contracts</span>
                 <span className="font-mono text-emerald-400">30%</span>
               </div>
               <Progress value={30} className="h-1.5 bg-slate-800" indicatorClassName="bg-emerald-500" />
             </div>
             <div>
               <div className="flex justify-between text-xs mb-1">
                 <span className="text-slate-300">10 to 20 Contracts</span>
                 <span className="font-mono text-emerald-400">20%</span>
               </div>
               <Progress value={20} className="h-1.5 bg-slate-800" indicatorClassName="bg-emerald-500" />
             </div>
             
             <div className="pt-4 border-t border-slate-700">
               <p className="text-xs text-slate-400 mb-2">Contract Concentration Risk</p>
               <div className="text-2xl font-bold text-white">Low</div>
             </div>
           </CardContent>
        </Card>

        {/* Actions Table */}
        <Card className="border-slate-700 bg-[#1e293b] shadow-lg">
          <CardHeader>
             <div className="flex gap-2">
               <span className="px-3 py-1 bg-emerald-900/50 text-emerald-400 text-xs font-medium rounded border border-emerald-800">Actions</span>
               <span className="px-3 py-1 bg-slate-800 text-slate-400 text-xs font-medium rounded border border-slate-700">Overdue</span>
               <span className="px-3 py-1 bg-slate-800 text-slate-400 text-xs font-medium rounded border border-slate-700">Current</span>
             </div>
          </CardHeader>
          <CardContent>
            <div className="border border-slate-700 rounded overflow-hidden">
               <div className="grid grid-cols-3 bg-slate-800/50 p-3 text-xs font-medium text-slate-400 border-b border-slate-700">
                  <div>Type</div>
                  <div className="text-center">Count</div>
                  <div className="text-right">Pending</div>
               </div>
               <div className="divide-y divide-slate-700">
                  <div className="grid grid-cols-3 p-3 text-sm text-slate-200">
                     <div className="flex items-center gap-2"><AlertTriangle className="h-3 w-3 text-amber-500" /> Risks</div>
                     <div className="text-center font-mono">5</div>
                     <div className="text-right font-mono text-slate-400">12</div>
                  </div>
                  <div className="grid grid-cols-3 p-3 text-sm text-slate-200">
                     <div className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-blue-500" /> Other</div>
                     <div className="text-center font-mono">0</div>
                     <div className="text-right font-mono text-slate-400">23</div>
                  </div>
                  <div className="grid grid-cols-3 p-3 text-sm text-slate-200">
                     <div className="flex items-center gap-2"><TrendingUp className="h-3 w-3 text-emerald-500" /> Opps</div>
                     <div className="text-center font-mono">2</div>
                     <div className="text-right font-mono text-slate-400">8</div>
                  </div>
               </div>
            </div>
          </CardContent>
        </Card>

        {/* Categories Donut Chart */}
        <Card className="border-slate-700 bg-[#1e293b] shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-100">Top Categories</CardTitle>
            <div className="bg-emerald-950 px-2 py-0.5 rounded text-emerald-400 text-xs font-bold border border-emerald-900">14 Total</div>
          </CardHeader>
          <CardContent className="h-[200px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} strokeWidth={0} />
                  ))}
                </Pie>
                <RechartsTooltip 
                   contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '6px' }}
                   itemStyle={{ color: '#e2e8f0' }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Legend Overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
               <div className="text-2xl font-bold text-white">4</div>
               <div className="text-[10px] text-slate-400 uppercase tracking-widest">Major</div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

function StatItem({ label, value, icon: Icon, highlight }: any) {
  return (
    <div className="flex flex-col items-center justify-center p-6 hover:bg-slate-800/50 transition-colors group">
      <div className={cn("text-2xl font-bold mb-1 group-hover:scale-110 transition-transform", highlight ? highlight : "text-white")}>
        {value}
      </div>
      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 uppercase tracking-wide">
        {Icon && <Icon className="h-3 w-3 opacity-70" />}
        {label}
      </div>
    </div>
  );
}
