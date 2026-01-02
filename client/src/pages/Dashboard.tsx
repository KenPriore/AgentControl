import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { activeAgents, simulationLogs, policyExceptionData, recentWorkflows, iamMetrics, connectorHealth } from "@/lib/legalData";
import { Activity, AlertTriangle, ArrowRight, Brain, Clock, Shield, Terminal, Zap, FileText, CheckCircle, Users, Scale, Search, Database, Server, GitMerge, Globe, Lock } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";
import { Link } from "wouter";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Intelligence Desk</h1>
          <p className="text-muted-foreground mt-1">Counsel Nexus Intelligent Agreement Management</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Clock className="h-4 w-4" /> Last 24 Hours
          </Button>
          <Button className="gap-2 bg-primary hover:bg-primary/90">
            <Zap className="h-4 w-4" /> System Healthy
          </Button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <KpiCard 
          title="Agreements in Process" 
          value={iamMetrics.orchestrationSteps}
          trend="+2" 
          trendType="negative"
          icon={GitMerge}
          description="Awaiting your review"
        />
        <KpiCard 
          title="Active Workflows" 
          value="24" 
          trend="+5" 
          trendType="neutral"
          icon={Activity}
          description="Processing in real-time"
        />
        <KpiCard 
          title="Active Agents Overview" 
          value={activeAgents.length.toString()} 
          trend="All Systems Go" 
          trendType="neutral"
          icon={Brain}
          description="Agents currently operational"
        />
      </div>

      {/* Activity Chart Section */}
      <div className="grid grid-cols-1 gap-6">
        <Card className="border-sidebar-border bg-card/50">
          <CardHeader>
            <CardTitle className="text-sm font-medium uppercase text-muted-foreground tracking-wider">AGENT & WORKFLOW PERFORMANCE</CardTitle>
            <CardDescription className="text-xs">Volume of autonomous agent tasks and Maestro workflow runs by clause type.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={policyExceptionData}>
                <XAxis 
                  dataKey="month" 
                  stroke="#525252" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#525252" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `${value}`} 
                  label={{ value: 'Number of Runs', angle: -90, position: 'insideLeft', style: { fill: '#525252', fontSize: 12, textAnchor: 'middle' }, offset: 15 }}
                />
                <Tooltip 
                  content={<CustomTooltip />}
                  cursor={{ fill: '#1e293b', opacity: 0.4 }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="indemnity" name="Indemnity" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
                <Bar dataKey="dataPrivacy" name="Data Privacy" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} />
                <Bar dataKey="liability" name="Liability Cap" stackId="a" fill="#f59e0b" radius={[0, 0, 0, 0]} />
                <Bar dataKey="paymentTerms" name="Payment Terms" stackId="a" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Interoperability & Compliance Row - Removed */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Honeycomb Grid - Agents */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              Maestro Orchestration Engines
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeAgents.map((agent) => (
              <Card key={agent.id} className="border-sidebar-border bg-card/50 hover:bg-card/80 transition-colors cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-3">
                      <div className={cn("p-2 rounded-lg bg-sidebar-accent", agent.status === 'error' ? 'bg-destructive/10 text-destructive' : 'text-primary')}>
                        <agent.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{agent.name}</h3>
                        <p className="text-xs text-muted-foreground">{agent.role}</p>
                      </div>
                    </div>
                    <Badge variant={agent.status === 'active' ? 'default' : agent.status === 'error' ? 'destructive' : 'secondary'} className={cn("uppercase text-[10px] tracking-wider", agent.status === 'active' && 'bg-primary text-primary-foreground')}>
                      {agent.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Mode</span>
                      <span className={cn("font-medium", agent.mode === 'autonomous' ? "text-blue-400" : "text-purple-400")}>
                        {agent.mode === 'autonomous' ? 'Autonomous' : 'Structured Workflow'}
                      </span>
                    </div>

                    {/* Visual Progress Bars */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] uppercase text-muted-foreground">
                        <span>Accuracy Confidence</span>
                        <span>{agent.stats.accuracy}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-sidebar-accent rounded-full overflow-hidden">
                        <div 
                          className={cn("h-full rounded-full", agent.stats.accuracy > 90 ? "bg-emerald-500" : agent.stats.accuracy > 80 ? "bg-amber-500" : "bg-red-500")} 
                          style={{ width: `${agent.stats.accuracy}%` }} 
                        />
                      </div>
                    </div>
                    
                    {agent.currentTask && (
                      <div className="p-3 bg-sidebar-accent/50 rounded-md border border-sidebar-border/50">
                        <p className="text-xs font-mono text-muted-foreground mb-1">CURRENT TASK</p>
                        <p className="text-sm line-clamp-2">{agent.currentTask}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Workflows Mini-List */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-4">
               <h2 className="text-xl font-semibold flex items-center gap-2">
                 <FileText className="h-5 w-5 text-primary" />
                 Recent Agreements
               </h2>
               <Link href="/workflows">
                 <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-primary">
                   View All <ArrowRight className="h-3 w-3 ml-1" />
                 </Button>
               </Link>
            </div>
            <div className="space-y-2">
               {recentWorkflows.slice(0, 2).map(wf => (
                 <div key={wf.id} className="flex items-center justify-between p-4 bg-card/50 border border-sidebar-border rounded-lg">
                    <div className="flex items-center gap-4">
                       <div className={cn("h-2 w-2 rounded-full", 
                         wf.status === 'Completed' ? "bg-emerald-500" : 
                         wf.status === 'Failed' ? "bg-red-500" : "bg-blue-500"
                       )} />
                       <div>
                         <p className="font-medium text-sm">{wf.name}</p>
                         <p className="text-xs text-muted-foreground">{wf.agent}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="flex -space-x-2">
                          <div className={cn("h-6 w-6 rounded-full border-2 border-background flex items-center justify-center text-[8px]", wf.approvals.legal ? "bg-emerald-500 text-white" : "bg-muted text-muted-foreground")}>L</div>
                          <div className={cn("h-6 w-6 rounded-full border-2 border-background flex items-center justify-center text-[8px]", wf.approvals.finance ? "bg-emerald-500 text-white" : "bg-muted text-muted-foreground")}>F</div>
                          <div className={cn("h-6 w-6 rounded-full border-2 border-background flex items-center justify-center text-[8px]", wf.approvals.security ? "bg-emerald-500 text-white" : "bg-muted text-muted-foreground")}>S</div>
                       </div>
                       <Badge variant="outline" className="text-[10px]">{wf.status}</Badge>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Live Thought Stream */}
        <Card className="flex flex-col h-full border-sidebar-border bg-sidebar/50 backdrop-blur-sm shadow-xl">
          <CardHeader className="pb-3 border-b border-border/50 bg-sidebar/80">
            <CardTitle className="text-sm font-mono uppercase tracking-widest flex items-center gap-2">
              <Terminal className="h-4 w-4 text-emerald-500" />
              Live Thought Stream
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex-1 overflow-hidden font-mono text-xs relative">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
            <ScrollArea className="h-full p-4">
              <div className="space-y-6">
                {simulationLogs.map((log) => (
                  <div key={log.id} className="relative pl-4 border-l border-border/50">
                    <div className={cn(
                      "absolute -left-[5px] top-0 h-2.5 w-2.5 rounded-full border-2 border-sidebar",
                      log.type === 'user' ? "bg-muted-foreground" :
                      log.type === 'agent' ? "bg-blue-500" :
                      log.type === 'tool' ? "bg-purple-500" :
                      "bg-red-500"
                    )}></div>
                    <div className="flex items-center gap-2 mb-1 opacity-70">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">{log.timestamp}</span>
                      <span className={cn("text-[10px] uppercase font-bold tracking-wider", 
                        log.type === 'user' ? "text-muted-foreground" :
                        log.type === 'agent' ? "text-blue-400" :
                        log.type === 'tool' ? "text-purple-400" :
                        "text-red-400"
                      )}>{log.type}</span>
                    </div>
                    <p className={cn("leading-relaxed", 
                      log.type === 'system' ? "text-red-300 font-bold" : "text-sidebar-foreground"
                    )}>
                      {log.content}
                    </p>
                    {log.status === 'error' && (
                       <Button size="sm" variant="destructive" className="h-6 text-[10px] mt-2 w-full justify-between">
                         Review Intervention <ArrowRight className="h-3 w-3" />
                       </Button>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function KpiCard({ title, value, trend, trendType, icon: Icon, description, alert }: any) {
  return (
    <Card className={cn("border-sidebar-border bg-card shadow-sm", alert && "border-red-900/50 bg-red-950/10")}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <Icon className={cn("h-4 w-4", alert ? "text-red-500" : "text-muted-foreground")} />
        </div>
        <div className="flex items-baseline gap-2">
          <h3 className="text-2xl font-bold">{value}</h3>
          <span className={cn("text-xs font-medium", 
            trendType === 'positive' ? "text-emerald-500" : 
            trendType === 'neutral' ? "text-blue-400" :
            "text-red-500"
          )}>
            {trend}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const total = payload.reduce((acc: number, entry: any) => acc + (entry.value || 0), 0);
    return (
      <div className="bg-popover border border-border p-3 rounded-lg shadow-xl text-xs">
        <p className="font-bold text-popover-foreground mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-4 mb-1">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-muted-foreground">{entry.name}</span>
            </div>
            <span className="font-mono text-popover-foreground">{entry.value}</span>
          </div>
        ))}
        <div className="border-t border-border mt-2 pt-2 flex items-center justify-between font-medium">
          <span className="text-muted-foreground">Total Runs</span>
          <span className="text-emerald-500">{total}</span>
        </div>
      </div>
    );
  }
  return null;
};
