import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AlertTriangle, BookOpen, CheckCircle2, ClipboardCheck, FileWarning, Scale, UserCheck, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// --- Mock Data ---

const playbookData = [
  { name: "Aligned", value: 45, fill: "#3b82f6" }, // Blue
  { name: "Deviating", value: 12, fill: "#ef4444" }, // Red
  { name: "Partial", value: 8, fill: "#eab308" },    // Yellow
];

const standardsData = [
  { name: "Compliant", value: 82, fill: "#10b981" }, // Emerald
  { name: "Violations", value: 5, fill: "#ef4444" },  // Red
  { name: "Under Review", value: 13, fill: "#f59e0b" }, // Amber
];

const factCheckData = [
  { name: "Verified", value: 156, fill: "#3b82f6" },
  { name: "Hallucination", value: 8, fill: "#ef4444" },
  { name: "Citation Error", value: 14, fill: "#eab308" },
];

const reviewQueue = [
  { id: "CLM-9921", type: "Playbook Deviation", desc: "Indemnity clause exceeds cap", confidence: "Low", status: "Needs Review", time: "10m ago" },
  { id: "CLM-9924", type: "Fact Check", desc: "Citation not found in Westlaw", confidence: "Med", status: "Needs Review", time: "24m ago" },
  { id: "CLM-9928", type: "Standard Violation", desc: "GDPR compliance check failed", confidence: "High", status: "Critical", time: "1h ago" },
  { id: "CLM-9931", type: "Playbook Deviation", desc: "Payment terms > 60 days", confidence: "Med", status: "Needs Review", time: "2h ago" },
  { id: "CLM-9935", type: "Fact Check", desc: "Date mismatch in Exhibit A", confidence: "Low", status: "Needs Review", time: "3h ago" },
];

// --- Components ---

export default function ClaimsAnalytics() {
  return (
    <div className="flex flex-col gap-6 max-w-[1600px] mx-auto p-6 bg-[#0f172a] text-slate-100 min-h-screen">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Claims & Compliance Intelligence</h1>
          <p className="text-slate-400 text-sm mt-1">Real-time analysis of claims against playbooks, standards, and factual accuracy.</p>
        </div>
        <div className="flex items-center gap-2 bg-[#1e293b] p-1 rounded-lg border border-slate-700">
           <span className="text-xs font-medium px-3 py-1 text-slate-400">System Status:</span>
           <span className="text-xs font-bold px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded flex items-center gap-1">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Monitoring
           </span>
        </div>
      </div>

      {/* Top Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart 1: Playbook Deviations */}
        <ChartCard 
          title="Playbook Adherence" 
          subtitle="Claims vs. Internal Playbooks"
          data={playbookData}
          total={65}
          alertCount={12}
          icon={BookOpen}
          color="blue"
        />

        {/* Chart 2: Standards Compliance */}
        <ChartCard 
          title="Standards Compliance" 
          subtitle="Regulatory & Industry Standards"
          data={standardsData}
          total={100}
          alertCount={5}
          icon={Scale}
          color="emerald"
        />

        {/* Chart 3: Fact Check Errors */}
        <ChartCard 
          title="Fact Verification" 
          subtitle="Accuracy & Hallucination Check"
          data={factCheckData}
          total={178}
          alertCount={22}
          icon={ClipboardCheck}
          color="amber"
        />
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
         
         {/* Table 1: Playbook Gaps */}
         <DetailTable 
           title="Playbook Gaps Detected" 
           icon={FileWarning}
           rows={[
             { label: "Indemnity Cap Exceeded", count: 8, severity: "High" },
             { label: "Governing Law Mismatch", count: 3, severity: "Med" },
             { label: "Payment Terms Deviation", count: 1, severity: "Low" },
           ]}
         />

         {/* Table 2: Standards Violations */}
         <DetailTable 
           title="Standards Violations" 
           icon={AlertTriangle}
           rows={[
             { label: "GDPR Data Transfer", count: 2, severity: "Critical" },
             { label: "ISO 27001 Control", count: 3, severity: "Med" },
             { label: "CCPA Opt-Out Missing", count: 0, severity: "Low" },
           ]}
         />

         {/* Table 3: Human Review Queue (The "Ask for Human" Section) */}
         <Card className="border-slate-700 bg-[#1e293b] shadow-lg flex flex-col h-full">
            <CardHeader className="pb-3 border-b border-slate-700/50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-slate-100 flex items-center gap-2">
                  <UserCheck className="h-4 w-4 text-purple-400" />
                  Pending Human Determination
                </CardTitle>
                <Badge variant="secondary" className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                  5 Actions
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
               <div className="divide-y divide-slate-700/50">
                 {reviewQueue.map((item) => (
                   <div key={item.id} className="p-4 hover:bg-slate-800/50 transition-colors group cursor-pointer">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-mono text-[10px] text-slate-500">{item.id}</span>
                        <span className="text-[10px] text-slate-400">{item.time}</span>
                      </div>
                      <div className="flex justify-between items-start gap-4">
                         <div>
                            <p className="text-sm font-medium text-slate-200 group-hover:text-purple-400 transition-colors">{item.desc}</p>
                            <p className="text-xs text-slate-400 mt-0.5">{item.type}</p>
                         </div>
                         <Button size="sm" variant="outline" className="h-7 text-xs border-slate-600 bg-slate-800 hover:bg-purple-900/20 hover:text-purple-400 hover:border-purple-500/50">
                           Review
                         </Button>
                      </div>
                   </div>
                 ))}
               </div>
               <div className="p-3 border-t border-slate-700/50 text-center">
                 <Button variant="ghost" className="text-xs text-slate-400 hover:text-white w-full h-8">
                   View Full Queue
                 </Button>
               </div>
            </CardContent>
         </Card>

      </div>
    </div>
  );
}

function ChartCard({ title, subtitle, data, total, alertCount, icon: Icon, color }: any) {
  // Determine color for the big number/icon based on the 'color' prop
  const colorClass = 
    color === 'blue' ? 'text-blue-500' : 
    color === 'emerald' ? 'text-emerald-500' : 
    color === 'amber' ? 'text-amber-500' : 'text-slate-500';

  return (
    <Card className="border-slate-700 bg-[#1e293b] shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 p-3">
         <button className="text-slate-500 hover:text-white transition-colors">
            <XCircle className="h-4 w-4" />
         </button>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-slate-100">{title}</CardTitle>
        <p className="text-xs text-slate-400">{subtitle}</p>
      </CardHeader>
      <CardContent className="flex flex-col items-center pb-6">
        <div className="h-[200px] w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '6px' }}
                  itemStyle={{ color: '#e2e8f0' }}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Center Content */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none flex flex-col items-center justify-center">
             <div className={cn("text-4xl font-bold", colorClass)}>{alertCount}</div>
             <div className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Alerts</div>
          </div>
        </div>
        
        <div className="w-full mt-2 grid grid-cols-3 divide-x divide-slate-700 border-t border-slate-700 pt-4">
           {data.map((item: any) => (
             <div key={item.name} className="flex flex-col items-center px-2">
               <div className="flex items-center gap-1.5 mb-1">
                 <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }} />
                 <span className="text-[10px] text-slate-400 truncate max-w-[60px]">{item.name}</span>
               </div>
               <span className="text-lg font-bold text-slate-200">{item.value}</span>
             </div>
           ))}
        </div>
      </CardContent>
    </Card>
  );
}

function DetailTable({ title, rows, icon: Icon }: any) {
  return (
    <Card className="border-slate-700 bg-[#1e293b] shadow-lg flex flex-col h-full">
      <CardHeader className="pb-3 border-b border-slate-700/50">
        <CardTitle className="text-sm font-medium text-slate-100 flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4 text-slate-400" />}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="w-full">
          <div className="grid grid-cols-12 px-4 py-2 bg-slate-800/50 text-[10px] uppercase font-bold text-slate-500">
             <div className="col-span-7">Issue Type</div>
             <div className="col-span-3">Severity</div>
             <div className="col-span-2 text-right">Count</div>
          </div>
          <div className="divide-y divide-slate-700/50">
            {rows.map((row: any, i: number) => (
              <div key={i} className="grid grid-cols-12 px-4 py-3 text-sm items-center hover:bg-slate-800/30">
                <div className="col-span-7 font-medium text-slate-300">{row.label}</div>
                <div className="col-span-3">
                   <Badge variant="outline" className={cn(
                     "text-[10px] h-5 px-1.5 border-0",
                     row.severity === 'Critical' ? "bg-red-500/20 text-red-400" :
                     row.severity === 'High' ? "bg-orange-500/20 text-orange-400" :
                     row.severity === 'Med' ? "bg-yellow-500/20 text-yellow-400" :
                     "bg-blue-500/20 text-blue-400"
                   )}>
                     {row.severity}
                   </Badge>
                </div>
                <div className="col-span-2 text-right font-mono text-slate-400">{row.count}</div>
              </div>
            ))}
          </div>
          {/* Empty State / Filler */}
          {rows.length < 5 && Array.from({ length: 5 - rows.length }).map((_, i) => (
             <div key={`empty-${i}`} className="grid grid-cols-12 px-4 py-3 text-sm items-center opacity-0 pointer-events-none">
               <div className="col-span-12 h-5"></div>
             </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
