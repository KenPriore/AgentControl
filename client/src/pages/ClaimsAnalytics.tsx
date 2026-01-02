import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AlertTriangle, BookOpen, CheckCircle2, ClipboardCheck, FileWarning, Scale, UserCheck, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldAlert } from "lucide-react";

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

export default function ClaimsAnalytics() {
  return (
    <div className="flex flex-col gap-6 max-w-[1600px] mx-auto p-6 bg-slate-50 text-slate-900 min-h-screen">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Clause Intelligence</h1>
          <p className="text-slate-500 text-sm mt-1">Real-time analysis of claims against playbooks, standards, and factual accuracy.</p>
        </div>
        <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-slate-200">
           <span className="text-xs font-medium px-3 py-1 text-slate-500">System Status:</span>
           <span className="text-xs font-bold px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded flex items-center gap-1">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Monitoring
           </span>
        </div>
      </div>

      <Tabs defaultValue="standard" className="w-full">
        <TabsList className="bg-white border border-slate-200">
          <TabsTrigger value="standard">Standard MSA Playbook</TabsTrigger>
          <TabsTrigger value="custom">Custom Client Playbooks</TabsTrigger>
        </TabsList>

        <div className="mt-4">
          <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-900 mb-6">
            <ShieldAlert className="h-4 w-4 text-red-600" />
            <AlertTitle className="text-red-900 font-semibold">Hallucination Shield Active</AlertTitle>
            <AlertDescription className="text-red-800">
              3 generated clauses flagged with confidence score &lt; 95%. Manual review required before export.
            </AlertDescription>
          </Alert>
        </div>

        <TabsContent value="standard" className="mt-0 space-y-6">
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
              title="Clause Generation" 
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
             <Card className="border-slate-200 bg-white shadow-lg flex flex-col h-full">
                <CardHeader className="pb-3 border-b border-slate-200">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-slate-900 flex items-center gap-2">
                      <UserCheck className="h-4 w-4 text-purple-600" />
                      Attorney Approval Required
                    </CardTitle>
                    <Badge variant="secondary" className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                      5 Actions
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                   <div className="divide-y divide-slate-200">
                     {reviewQueue.map((item) => (
                       <div key={item.id} className="p-4 hover:bg-slate-50 transition-colors group cursor-pointer">
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-mono text-[10px] text-slate-500">{item.id}</span>
                            <span className="text-[10px] text-slate-400">{item.time}</span>
                          </div>
                          <div className="flex justify-between items-start gap-4">
                             <div>
                                <p className="text-sm font-medium text-slate-900 group-hover:text-purple-600 transition-colors">{item.desc}</p>
                                <p className="text-xs text-slate-500 mt-0.5">{item.type}</p>
                             </div>
                             <Button size="sm" variant="outline" className="h-7 text-xs border-slate-200 bg-white hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200">
                               Review
                             </Button>
                          </div>
                       </div>
                     ))}
                   </div>
                   <div className="p-3 border-t border-slate-200 text-center">
                     <Button variant="ghost" className="text-xs text-slate-500 hover:text-slate-900 w-full h-8">
                       View Full Queue
                     </Button>
                   </div>
                </CardContent>
             </Card>

          </div>
        </TabsContent>
        
        <TabsContent value="custom" className="mt-6">
          <div className="flex items-center justify-center h-64 border-2 border-dashed border-slate-200 rounded-lg">
             <p className="text-slate-500">Select a client to view custom playbook analytics.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ChartCard({ title, subtitle, data, total, alertCount, icon: Icon, color }: any) {
  // Determine color for the big number/icon based on the 'color' prop
  const colorClass = 
    color === 'blue' ? 'text-blue-600' : 
    color === 'emerald' ? 'text-emerald-600' : 
    color === 'amber' ? 'text-amber-600' : 'text-slate-600';

  return (
    <Card className="border-slate-200 bg-white shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 p-3">
         <button className="text-slate-400 hover:text-slate-900 transition-colors">
            <XCircle className="h-4 w-4" />
         </button>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-slate-900">{title}</CardTitle>
        <p className="text-xs text-slate-500">{subtitle}</p>
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
                  contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px' }}
                  itemStyle={{ color: '#1e293b' }}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Center Content */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none flex flex-col items-center justify-center">
             <div className={cn("text-4xl font-bold", colorClass)}>{alertCount}</div>
             <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Alerts</div>
          </div>
        </div>
        
        <div className="w-full mt-2 grid grid-cols-3 divide-x divide-slate-200 border-t border-slate-200 pt-4">
           {data.map((item: any) => (
             <div key={item.name} className="flex flex-col items-center px-2">
               <div className="flex items-center gap-1.5 mb-1">
                 <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }} />
                 <span className="text-[10px] text-slate-500 truncate max-w-[60px]">{item.name}</span>
               </div>
               <span className="text-lg font-bold text-slate-900">{item.value}</span>
             </div>
           ))}
        </div>
      </CardContent>
    </Card>
  );
}

function DetailTable({ title, rows, icon: Icon }: any) {
  return (
    <Card className="border-slate-200 bg-white shadow-lg flex flex-col h-full">
      <CardHeader className="pb-3 border-b border-slate-200">
        <CardTitle className="text-sm font-medium text-slate-900 flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4 text-slate-500" />}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="w-full">
          <div className="grid grid-cols-12 px-4 py-2 bg-slate-50 text-[10px] uppercase font-bold text-slate-500">
             <div className="col-span-7">Issue Type</div>
             <div className="col-span-3">Severity</div>
             <div className="col-span-2 text-right">Count</div>
          </div>
          <div className="divide-y divide-slate-200">
            {rows.map((row: any, i: number) => (
              <div key={i} className="grid grid-cols-12 px-4 py-3 text-sm items-center hover:bg-slate-50">
                <div className="col-span-7 font-medium text-slate-700">{row.label}</div>
                <div className="col-span-3">
                   <Badge variant="outline" className={cn(
                     "text-[10px] h-5 px-1.5 border-0",
                     row.severity === 'Critical' ? "bg-red-100 text-red-600" :
                     row.severity === 'High' ? "bg-orange-100 text-orange-600" :
                     row.severity === 'Med' ? "bg-yellow-100 text-yellow-600" :
                     "bg-blue-100 text-blue-600"
                   )}>
                     {row.severity}
                   </Badge>
                </div>
                <div className="col-span-2 text-right font-mono text-slate-500">{row.count}</div>
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
