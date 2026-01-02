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
          <h1 className="text-3xl font-bold tracking-tight">Docusign IAM Dashboard</h1>
          <p className="text-muted-foreground mt-1">Intelligent Agreement Management & Maestro Orchestration</p>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard 
          title="Pending Orchestration Steps" 
          value={iamMetrics.orchestrationSteps}
          trend="+2" 
          trendType="negative"
          icon={GitMerge}
          description="Maestro steps awaiting action"
        />
        <KpiCard 
          title="IAM Agreement Count" 
          value={iamMetrics.agreementCount.current.toLocaleString()} 
          trend={`${Math.round((iamMetrics.agreementCount.current / iamMetrics.agreementCount.entitlement) * 100)}% Used`} 
          trendType="neutral"
          icon={FileText}
          description={`of ${iamMetrics.agreementCount.entitlement.toLocaleString()} Entitlement`}
        />
        <KpiCard 
          title="Search Intelligence" 
          value={`${iamMetrics.navigatorIndex}%`} 
          trend="+0.1%" 
          trendType="positive"
          icon={Search}
          description="Navigator Documents Indexed"
        />
        <KpiCard 
          title="Seat Allowance" 
          value={`${iamMetrics.seatAllowance.active} / ${iamMetrics.seatAllowance.total}`}
          trend={`${iamMetrics.seatAllowance.total - iamMetrics.seatAllowance.active} left`}
          trendType="positive"
          icon={Users}
          description="Active vs Provisioned Users"
        />
      </div>

      {/* Activity Chart Section */}
      <div className="grid grid-cols-1 gap-6">
        <Card className="border-sidebar-border bg-card/50">
          <CardHeader>
            <CardTitle className="text-sm font-medium uppercase text-muted-foreground tracking-wider">Policy Exception Frequency</CardTitle>
            <CardDescription className="text-xs">Volume by exception type to refine standard playbooks</CardDescription>
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
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }}
                  itemStyle={{ color: '#e2e8f0' }}
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

      {/* Interoperability & Compliance Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {/* Connector Health */}
         <Card className="border-sidebar-border bg-card/50">
            <CardHeader className="pb-2">
               <CardTitle className="text-sm font-medium uppercase text-muted-foreground tracking-wider flex items-center gap-2">
                  <Globe className="h-4 w-4" /> Interoperability
               </CardTitle>
            </CardHeader>
            <CardContent>
               <div className="space-y-3">
                  {connectorHealth.map((conn) => (
                     <div key={conn.name} className="flex items-center justify-between text-sm">
                        <span className="font-medium">{conn.name}</span>
                        <div className="flex items-center gap-2">
                           <div className={cn("h-2 w-2 rounded-full", 
                              conn.status === 'active' || conn.status === 'secure' ? "bg-emerald-500" : "bg-amber-500"
                           )} />
                           <span className="text-xs text-muted-foreground">{conn.latency || conn.lastAudit}</span>
                        </div>
                     </div>
                  ))}
               </div>
            </CardContent>
         </Card>

         {/* FedRAMP Boundary */}
         <Card className="border-sidebar-border bg-card/50">
            <CardHeader className="pb-2">
               <CardTitle className="text-sm font-medium uppercase text-muted-foreground tracking-wider flex items-center gap-2">
                  <Shield className="h-4 w-4" /> Global Compliance
               </CardTitle>
            </CardHeader>
            <CardContent>
               <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between p-3 border border-emerald-900/30 bg-emerald-950/10 rounded-lg">
                     <div>
                        <p className="font-medium text-sm">FedRAMP Boundary</p>
                        <p className="text-xs text-muted-foreground">Audit Status</p>
                     </div>
                     <Badge variant="outline" className="text-emerald-500 border-emerald-500/30 bg-emerald-500/10">Authorized</Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
                     <span>Data Exports</span>
                     <span>0 Violations</span>
                  </div>
               </div>
            </CardContent>
         </Card>

         {/* Sandbox Data Guard */}
         <Card className="border-sidebar-border bg-card/50">
            <CardHeader className="pb-2">
               <CardTitle className="text-sm font-medium uppercase text-muted-foreground tracking-wider flex items-center gap-2">
                  <Lock className="h-4 w-4" /> Security & Privacy
               </CardTitle>
            </CardHeader>
            <CardContent>
               <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between p-3 border border-blue-900/30 bg-blue-950/10 rounded-lg">
                     <div>
                        <p className="font-medium text-sm">Sandbox Data Guard</p>
                        <p className="text-xs text-muted-foreground">PII Detection</p>
                     </div>
                     <Badge variant="outline" className="text-blue-500 border-blue-500/30 bg-blue-500/10">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
                     <span>Scanned Objects</span>
                     <span>14.2k</span>
                  </div>
               </div>
            </CardContent>
         </Card>
      </div>

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
