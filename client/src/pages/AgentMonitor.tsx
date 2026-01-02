import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Activity, AlertTriangle, Brain, CheckCircle, Database, GitMerge, Lock, Shield, Eye, Server, FileText } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const agentActivityLog = [
  {
    id: "log-1",
    agent: "Clause Architect",
    task: "NDA Redlining",
    dataSources: ["MSA Playbook", "Docusign Navigator"],
    decisionLogic: "Accepted standard Indemnity language; flagged custom Liability Cap.",
    status: "active",
    timestamp: "10:42:05"
  },
  {
    id: "log-2",
    agent: "Policy Guardian",
    task: "Compliance Audit",
    dataSources: ["FedRAMP Moderate Boundary"],
    decisionLogic: "Verified no sensitive Customer Data was exported to unapproved connectors.",
    status: "success",
    timestamp: "10:38:12"
  },
  {
    id: "log-3",
    agent: "Risk Scout",
    task: "Overage Monitoring",
    dataSources: ["IAM Order Form", "Seat Allowance"],
    decisionLogic: "Identified 95% Seat utilization; alerted Sales Ops for potential overage.",
    status: "warning",
    timestamp: "10:15:30"
  },
  {
    id: "log-4",
    agent: "Maestro Orchestrator",
    task: "Partner Onboarding Routing",
    dataSources: ["Salesforce", "Web Form"],
    decisionLogic: "Routed to Legal for high-value contract (> $100k); auto-approved KYC check.",
    status: "success",
    timestamp: "09:55:10"
  },
  {
    id: "log-5",
    agent: "Navigator Guardian",
    task: "Legacy Contract Indexing",
    dataSources: ["SharePoint Connector", "OCR Engine"],
    decisionLogic: "Extracted key dates and renewal terms from 150 legacy PDFs.",
    status: "success",
    timestamp: "09:42:00"
  }
];

const decisionDistribution = [
  { name: "Autonomous", value: 85, fill: "#10b981" }, // Emerald-500
  { name: "Attorney Review", value: 15, fill: "#f59e0b" }, // Amber-500
];

const dataAccessHeatmap = [
  { source: "Navigator", queries: 450 },
  { source: "Salesforce", queries: 320 },
  { source: "FedRAMP Boundary", queries: 180 },
  { source: "Workday", queries: 120 },
  { source: "ServiceNow", queries: 90 },
];

const exceptionsFeed = [
  {
    id: "exc-1",
    title: "PII in Sandbox",
    agent: "Sandbox Watchdog",
    category: "Security & Privacy",
    severity: "High",
    description: "Sandbox Data Guard scanned a file in a demo account and detected Personally Identifiable Information.",
    logic: "Detected SSN pattern in 'test_employee_data.csv'. Blocked export.",
    time: "10 mins ago"
  },
  {
    id: "exc-2",
    title: "Non-Standard Liability Cap",
    agent: "Clause Architect",
    category: "Legal Policy",
    severity: "Medium",
    description: "Counterparty requested 'Uncapped' liability for data breach.",
    logic: "Flagged for attorney review. Playbook limit is 3x fees.",
    time: "45 mins ago"
  },
  {
    id: "exc-3",
    title: "Export Control Check",
    agent: "Compliance Sentinel",
    category: "Trade Compliance",
    severity: "Low",
    description: "Potential match for restricted entity in partner list.",
    logic: "Similarity score 82% against denied party list. Holding for manual verification.",
    time: "2 hours ago"
  }
];

export default function AgentMonitor() {
  return (
    <div className="flex flex-col gap-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Agent Monitor</h1>
          <p className="text-muted-foreground mt-1">Real-time visualization of AI agent performance, decisions, and oversight.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Activity className="h-4 w-4" /> Live Feed
          </Button>
          <Button className="gap-2">
            <Server className="h-4 w-4" /> System Logs
          </Button>
        </div>
      </div>

      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Decision Distribution */}
        <Card className="border-sidebar-border bg-card">
          <CardHeader>
            <CardTitle className="text-sm font-medium uppercase text-muted-foreground tracking-wider flex items-center gap-2">
              <Brain className="h-4 w-4" /> Decision Distribution
            </CardTitle>
            <CardDescription className="text-xs">Autonomous vs. Human-in-the-Loop (Maestro & Agents)</CardDescription>
          </CardHeader>
          <CardContent className="relative flex items-center justify-center h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={decisionDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {decisionDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px' }}
                  itemStyle={{ color: '#1e293b' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" formatter={(value) => <span className="ml-2 mr-4 text-sm font-medium">{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none pb-8">
              <span className="text-3xl font-bold text-slate-900">85%</span>
              <p className="text-[10px] text-muted-foreground uppercase">Autonomous</p>
            </div>
          </CardContent>
        </Card>

        {/* Data Access Heatmap */}
        <Card className="border-sidebar-border bg-card">
          <CardHeader>
            <CardTitle className="text-sm font-medium uppercase text-muted-foreground tracking-wider flex items-center gap-2">
              <Database className="h-4 w-4" /> Data Access Heatmap
            </CardTitle>
            <CardDescription className="text-xs">System query frequency by Agents (Last 24h)</CardDescription>
          </CardHeader>
          <CardContent className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataAccessHeatmap} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="source" type="category" width={120} tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px' }}
                  itemStyle={{ color: '#1e293b' }}
                />
                <Bar dataKey="queries" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Agent Activity Log Table */}
      <Card className="border-sidebar-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" /> Agent Intelligence & Data Access Log
          </CardTitle>
          <CardDescription>Live log tracking logic application and connector utilization.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent Name</TableHead>
                <TableHead>Current Task</TableHead>
                <TableHead>Data Sources Accessed</TableHead>
                <TableHead>Key Decision / Logic</TableHead>
                <TableHead className="text-right">Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agentActivityLog.map((log) => (
                <TableRow key={log.id} className="group hover:bg-muted/50">
                  <TableCell className="font-medium text-primary">{log.agent}</TableCell>
                  <TableCell>{log.task}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {log.dataSources.map((source, i) => (
                        <Badge key={i} variant="outline" className="text-[10px] bg-background text-muted-foreground border-border">
                          {source}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground italic">"{log.decisionLogic}"</TableCell>
                  <TableCell className="text-right font-mono text-xs text-muted-foreground">{log.timestamp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Exception & Oversight Feed */}
      <Card className="border-sidebar-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-500" /> Oversight: Policy Exceptions
          </CardTitle>
          <CardDescription>Cases where agents triggered Human-in-the-Loop (HITL) review.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {exceptionsFeed.map((exception) => (
              <div key={exception.id} className="flex flex-col md:flex-row gap-4 p-4 border border-border rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center text-red-600 dark:text-red-400">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-sm flex items-center gap-2">
                        {exception.title}
                        <Badge variant="outline" className="border-red-200 text-red-600 bg-red-50 dark:bg-red-900/10 dark:text-red-400 dark:border-red-800 text-[10px] uppercase">
                          {exception.severity} Priority
                        </Badge>
                      </h4>
                      <p className="text-xs text-muted-foreground mt-0.5">Agent: <span className="font-medium text-foreground">{exception.agent}</span> • Category: {exception.category}</p>
                    </div>
                    <span className="text-xs text-muted-foreground font-mono">{exception.time}</span>
                  </div>
                  <p className="text-sm">{exception.description}</p>
                  <div className="text-xs bg-background p-2 rounded border border-border font-mono text-muted-foreground">
                    Logic: {exception.logic}
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <Button size="sm" variant="secondary" className="text-xs h-8">Review Case</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
