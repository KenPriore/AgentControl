import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { recentWorkflows } from "@/lib/legalData";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, FileText, GitGraph, XCircle, ChevronRight, UserCheck, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export default function Workflows() {
  return (
    <div className="flex flex-col gap-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Workflow History</h1>
          <p className="text-muted-foreground mt-1">Audit trail of automated contract reviews and approvals.</p>
        </div>
        <div className="flex gap-2">
           <Input className="bg-card border-border w-64" placeholder="Search workflows..." />
           <Button variant="outline">Filter</Button>
           <Button>New Workflow</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {recentWorkflows.map((workflow) => (
          <Card key={workflow.id} className="border-sidebar-border bg-card hover:bg-sidebar-accent/10 transition-colors group cursor-pointer">
            <CardContent className="p-6 flex items-center gap-6">
              
              {/* Status Icon */}
              <div className={cn(
                "h-12 w-12 rounded-full flex items-center justify-center shrink-0 border-2",
                workflow.status === 'Completed' ? "bg-emerald-950/30 border-emerald-500/50 text-emerald-500" :
                workflow.status === 'Failed' ? "bg-red-950/30 border-red-500/50 text-red-500" :
                "bg-blue-950/30 border-blue-500/50 text-blue-500"
              )}>
                {workflow.status === 'Completed' && <CheckCircle className="h-6 w-6" />}
                {workflow.status === 'Failed' && <XCircle className="h-6 w-6" />}
                {workflow.status === 'In Progress' && <Clock className="h-6 w-6 animate-pulse" />}
              </div>

              <div className="flex-1 grid grid-cols-12 gap-4 items-center">
                
                {/* Workflow Info */}
                <div className="col-span-4">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{workflow.name}</h3>
                    <Badge variant="outline" className="text-[10px] h-5 px-1.5 font-mono text-muted-foreground">{workflow.id}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {workflow.date}</span>
                    <span className="flex items-center gap-1"><BotIcon className="h-3 w-3" /> {workflow.agent}</span>
                    {/* Expiration Logic - Mocking urgency if 'Renewal' is in name */}
                    {workflow.name.includes("Renewal") && (
                       <Badge variant="secondary" className="bg-red-500/10 text-red-500 border-red-500/20 text-[10px] h-5">URGENT: Expiring</Badge>
                    )}
                  </div>
                </div>

                {/* Approvals Grid -> Replaced with Orchestration Stepper */}
                <div className="col-span-5 flex flex-col justify-center">
                   <div className="flex items-center justify-between text-[10px] uppercase text-muted-foreground mb-1.5 px-1">
                     <span>Maestro Progress</span>
                     <span>Step 3 of 4</span>
                   </div>
                   <div className="flex items-center gap-1 w-full">
                      {['Identity', 'Legal Review', 'Finance', 'Signature'].map((step, idx) => {
                         // Mock logic for progress based on workflow status
                         const isCompleted = workflow.status === 'Completed' || (workflow.status === 'In Progress' && idx < 2);
                         const isCurrent = workflow.status === 'In Progress' && idx === 2;
                         
                         return (
                           <div key={idx} className="flex-1 flex flex-col gap-1">
                             <div className={cn("h-1.5 rounded-full w-full", 
                               isCompleted ? "bg-emerald-500" : 
                               isCurrent ? "bg-blue-500 animate-pulse" : 
                               "bg-sidebar-accent"
                             )} />
                           </div>
                         )
                      })}
                   </div>
                   <div className="flex justify-between text-[10px] text-muted-foreground mt-1 px-1">
                     <span>Identity</span>
                     <span>Signature</span>
                   </div>
                </div>
                
                {/* Actions */}
                <div className="col-span-3 flex justify-end">
                   <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground group-hover:text-foreground">
                     View Audit Log <ChevronRight className="h-4 w-4" />
                   </Button>
                </div>

              </div>

            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ApprovalStatus({ label, status }: { label: string, status: boolean }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
       <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">{label}</span>
       <div className={cn(
         "flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border",
         status ? "bg-emerald-950/30 text-emerald-400 border-emerald-900/50" : "bg-muted/50 text-muted-foreground border-border dashed border-dashed"
       )}>
         {status ? <CheckCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
         {status ? "Approved" : "Pending"}
       </div>
    </div>
  )
}

function BotIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  )
}
