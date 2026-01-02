import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Settings, Trash2, PenTool, Database, Puzzle, FileText, ShieldCheck } from "lucide-react";
import { activeAgents } from "@/lib/legalData";

export default function Agents() {
  return (
    <div className="flex flex-col gap-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Agent Composition</h1>
          <p className="text-muted-foreground mt-1">Manage agent tools, models, and permissions.</p>
        </div>
        <Button className="gap-2 bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4" /> Deploy New Agent
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left: Active Agents List */}
        <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeAgents.map((agent) => (
             <Card key={agent.id} className="border-sidebar-border bg-card hover:border-primary/50 transition-colors">
               <CardHeader className="flex flex-row items-start justify-between pb-2">
                 <div className="flex items-center gap-3">
                   <div className="p-2 bg-primary/10 rounded-md">
                     <agent.icon className="h-5 w-5 text-primary" />
                   </div>
                   <div>
                     <CardTitle className="text-lg">{agent.name}</CardTitle>
                     <CardDescription className="text-xs font-mono">{agent.id} • {agent.role}</CardDescription>
                   </div>
                 </div>
                 <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                   <Settings className="h-4 w-4" />
                 </Button>
               </CardHeader>
               <CardContent>
                 <div className="space-y-4">
                   <div className="flex gap-2">
                     <Badge variant="outline" className="bg-blue-950/30 text-blue-400 border-blue-900/50">GPT-4-Turbo</Badge>
                     <Badge variant="outline" className="bg-purple-950/30 text-purple-400 border-purple-900/50">VectorDB: CaseLaw_v2</Badge>
                   </div>
                   
                   <div className="space-y-2">
                     <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Active Tools</p>
                     <div className="flex flex-wrap gap-2">
                       {['Westlaw Search', 'PDF Extractor', 'Privilege Classifier'].map((tool) => (
                         <div key={tool} className="flex items-center gap-1.5 px-2 py-1 bg-secondary rounded text-xs">
                           <Puzzle className="h-3 w-3 text-muted-foreground" />
                           {tool}
                         </div>
                       ))}
                       <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-muted-foreground border border-dashed border-border hover:border-primary hover:text-primary">
                         <Plus className="h-3 w-3 mr-1" /> Add
                       </Button>
                     </div>
                   </div>

                   <div className="pt-4 mt-2 border-t border-border/50 flex justify-between items-center">
                     <span className="text-xs text-muted-foreground">Last deployment: 2 hours ago</span>
                     <div className="flex gap-2">
                       <Button variant="outline" size="sm" className="h-8">Test</Button>
                       <Button variant="outline" size="sm" className="h-8 text-destructive hover:text-destructive hover:bg-destructive/10">Disable</Button>
                     </div>
                   </div>
                 </div>
               </CardContent>
             </Card>
          ))}
        </div>

        {/* Right: Tool Library */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="bg-sidebar-accent/20 border-sidebar-border">
            <CardHeader>
              <CardTitle className="text-lg">Available Tools</CardTitle>
              <CardDescription>Drag and drop to inject into agents</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
               {[
                 { name: "Westlaw API", type: "Research", icon: Database },
                 { name: "Pacer Case Puller", type: "Research", icon: Database },
                 { name: "Contract Summarizer", type: "Analysis", icon: FileText },
                 { name: "Logic Validator", type: "Governance", icon: ShieldCheck },
                 { name: "Email Notification", type: "Communication", icon: PenTool },
               ].map((tool, i) => (
                 <div key={i} className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg cursor-grab active:cursor-grabbing hover:bg-sidebar-accent transition-colors">
                   <div className="p-2 bg-background rounded border border-border">
                     <tool.icon className="h-4 w-4 text-muted-foreground" />
                   </div>
                   <div className="flex-1">
                     <p className="font-medium text-sm">{tool.name}</p>
                     <p className="text-[10px] text-muted-foreground uppercase">{tool.type}</p>
                   </div>
                   <Button variant="ghost" size="icon" className="h-6 w-6">
                     <Plus className="h-3 w-3" />
                   </Button>
                 </div>
               ))}
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-emerald-950/20 to-transparent border-emerald-900/20">
            <CardHeader>
               <CardTitle className="text-emerald-500">System Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-1">
                   <div className="flex justify-between text-xs">
                     <span>Total Token Usage (Daily)</span>
                     <span className="font-mono">72%</span>
                   </div>
                   <div className="h-2 bg-secondary rounded-full overflow-hidden">
                     <div className="h-full bg-emerald-500 w-[72%]"></div>
                   </div>
                </div>
                <div className="space-y-1">
                   <div className="flex justify-between text-xs">
                     <span>Tool Latency</span>
                     <span className="font-mono">142ms</span>
                   </div>
                   <div className="h-2 bg-secondary rounded-full overflow-hidden">
                     <div className="h-full bg-blue-500 w-[20%]"></div>
                   </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
