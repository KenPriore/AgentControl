import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { activeAgents, simulationLogs, activityData } from "@/lib/legalData";
import { Activity, AlertTriangle, ArrowRight, Brain, Clock, Shield, Terminal, Zap } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mission Control</h1>
          <p className="text-muted-foreground mt-1">Real-time oversight of legal autonomous agents and workflows.</p>
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
          title="Active Agents" 
          value="12" 
          trend="+2" 
          trendType="positive"
          icon={Brain}
          description="Operational in last hour"
        />
        <KpiCard 
          title="Playbook Deviations" 
          value="12%" 
          trend="+0.4%" 
          trendType="negative"
          icon={Shield}
          description="Terms varying from standard"
        />
        <KpiCard 
          title="Intervention Rate" 
          value="4.8%" 
          trend="-1.2%" 
          trendType="positive"
          icon={Activity}
          description="Human-in-the-loop triggers"
        />
        <KpiCard 
          title="Hallucinations Caught" 
          value="3" 
          trend="+1" 
          trendType="negative"
          icon={AlertTriangle}
          description="Blocked by governance layer"
          alert
        />
      </div>

      {/* Activity Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-sidebar-border bg-card/50">
          <CardHeader>
            <CardTitle className="text-sm font-medium uppercase text-muted-foreground tracking-wider">System Throughput</CardTitle>
          </CardHeader>
          <CardContent className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id="colorTokens" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="time" 
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
                />
                <Area 
                  type="monotone" 
                  dataKey="tokens" 
                  stroke="#10b981" 
                  fillOpacity={1} 
                  fill="url(#colorTokens)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="border-sidebar-border bg-card/50">
           <CardHeader>
            <CardTitle className="text-sm font-medium uppercase text-muted-foreground tracking-wider">Governance Health</CardTitle>
           </CardHeader>
           <CardContent className="flex flex-col justify-center items-center h-[200px]">
              <div className="relative h-32 w-32 flex items-center justify-center">
                 <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                   <circle cx="50" cy="50" r="40" fill="none" stroke="#1e293b" strokeWidth="10" />
                   <circle 
                      cx="50" cy="50" r="40" 
                      fill="none" 
                      stroke="#10b981" 
                      strokeWidth="10" 
                      strokeDasharray="251.2" 
                      strokeDashoffset="25.12" 
                      strokeLinecap="round"
                   />
                 </svg>
                 <div className="absolute flex flex-col items-center">
                    <span className="text-2xl font-bold">90%</span>
                    <span className="text-[10px] text-muted-foreground uppercase">Compliance</span>
                 </div>
              </div>
           </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Honeycomb Grid */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Agent Matrix
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
                    
                    <div className="flex gap-4 pt-2 border-t border-border/50">
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase">Tasks</p>
                        <p className="font-mono font-medium">{agent.stats.tasksCompleted}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase">Token Spend</p>
                         <p className="font-mono font-medium">{(agent.stats.tokensUsed / 1000).toFixed(1)}k</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
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
            trendType === 'positive' ? "text-emerald-500" : "text-red-500"
          )}>
            {trend}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );
}
