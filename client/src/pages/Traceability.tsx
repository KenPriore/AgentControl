import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { mockWorkflow, simulationLogs } from "@/lib/legalData";
import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle, ChevronDown, ChevronRight, Download, FileText, GitCommit, Search, ShieldAlert, XCircle, Terminal } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function Traceability() {
  const [selectedStepId, setSelectedStepId] = useState<string>("s3"); // Default to the failed step for demo

  // Enhanced Mock Data synced with Workflow History & Agent Monitor
  const auditSteps = [
    {
      id: "s1",
      name: "Partner Onboarding Trigger",
      status: "completed",
      type: "input",
      details: {
        input: "Web Form Submission: Nexus Systems Inc.\nRequester: Alex Rivera (Partner Ops)\nDeal Value: $150k",
        output: "Entity Normalized: NEXUS-SYS-2024\nRisk Profile: LOW",
        validationErrors: []
      }
    },
    {
      id: "s2",
      name: "Identity Verification (IDV)",
      status: "completed",
      type: "validation",
      details: {
        input: "Upload: driver_license_front.jpg\nMatch Confidence Threshold: 90%",
        output: "Verification Passed: 98.4% Match\nDocument: Valid Government ID",
        validationErrors: []
      }
    },
    {
      id: "s3",
      name: "Compliance & Sanctions Check",
      status: "completed",
      type: "processing",
      details: {
        input: "Entity: Nexus Systems Inc.\nJurisdiction: US-CA",
        output: "OFAC Screen: CLEAR\nExport Control: CLEAR\nFedRAMP Boundary: VERIFIED (Data Resident in US-East)",
        validationErrors: []
      }
    },
    {
      id: "s4",
      name: "Quote Exception Logic",
      status: "completed",
      type: "processing",
      details: {
        input: "Discount Requested: 15%\nStandard Threshold: 10%\nApprover: Finance (Auto-Routed)",
        output: "Approval Route: FINANCE_Director_Level",
        validationErrors: []
      }
    },
    {
      id: "s5",
      name: "Contract Generation",
      status: "failed",
      type: "processing",
      details: {
        input: "Template: Partner_Reseller_Agreement_v4.docx\nVariables: {payment_terms: 'Net 60'}",
        output: "Generation Halted",
        validationErrors: ["Policy Violation: 'Net 60' exceeds standard 'Net 45' for this partner tier."]
      }
    }
  ];

  const selectedStep = auditSteps.find(s => s.id === selectedStepId);

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.24))] gap-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Traceability & Audit Center</h1>
          <p className="text-muted-foreground mt-1">Deep inspection of agent reasoning chains and workflow execution.</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" /> Export Agent Certification of Action
        </Button>
      </div>

      <div className="grid grid-cols-12 gap-6 flex-1 min-h-0">
        
        {/* Left Col: Workflow Visualizer (The "Legal Notebook") */}
        <Card className="col-span-12 lg:col-span-4 flex flex-col border-sidebar-border h-full">
          <CardHeader className="pb-4 border-b border-border/50">
            <CardTitle className="text-sm font-mono uppercase tracking-widest flex items-center gap-2">
              <GitCommit className="h-4 w-4 text-purple-500" />
              Maestro Workflow Execution
            </CardTitle>
            <CardDescription>Orchestration ID: #WKF-2024-005</CardDescription>
          </CardHeader>
          <CardContent className="p-0 flex-1 overflow-y-auto">
            <div className="relative p-6">
              
              {/* Connector Line */}
              <div className="absolute left-10 top-10 bottom-10 w-0.5 bg-border/50" />

              <div className="flex flex-col gap-8 relative z-10">
                {auditSteps.map((step, index) => (
                  <div key={step.id} className="relative group">
                    {/* Connecting Arrow (visual only, for steps after first) */}
                    {index > 0 && (
                      <div className="absolute -top-6 left-5 flex flex-col items-center h-6 w-4">
                        <div className={cn("w-0.5 h-full", 
                          auditSteps[index-1].status === 'completed' ? "bg-primary/50" : "bg-border/50"
                        )} />
                        <ChevronDown className={cn("h-3 w-3 -mt-1",
                          auditSteps[index-1].status === 'completed' ? "text-primary/50" : "text-border/50"
                        )} />
                      </div>
                    )}

                    <div 
                      className={cn(
                        "relative flex gap-4 p-4 rounded-xl border transition-all cursor-pointer",
                        selectedStepId === step.id 
                          ? "border-primary bg-sidebar-accent shadow-[0_0_15px_-3px_rgba(16,185,129,0.2)]" 
                          : "border-border/40 bg-card/40 hover:bg-card/60 hover:border-border"
                      )}
                      onClick={() => setSelectedStepId(step.id)}
                    >
                      {/* Status Icon */}
                      <div className={cn(
                        "relative z-10 h-8 w-8 rounded-full flex items-center justify-center shrink-0 border-2 shadow-sm transition-transform group-hover:scale-105",
                        step.status === 'completed' ? "bg-emerald-950/80 border-emerald-500 text-emerald-500" :
                        step.status === 'failed' ? "bg-red-950/80 border-red-500 text-red-500" :
                        step.status === 'processing' ? "bg-blue-950/80 border-blue-500 text-blue-500 animate-pulse" :
                        "bg-muted border-muted-foreground text-muted-foreground"
                      )}>
                        {step.status === 'completed' && <CheckCircle className="h-4 w-4" />}
                        {step.status === 'failed' && <XCircle className="h-4 w-4" />}
                        {step.status === 'processing' && <div className="h-2 w-2 rounded-full bg-blue-500" />}
                        {step.status === 'pending' && <div className="h-2 w-2 rounded-full bg-muted-foreground" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className={cn("font-medium text-sm truncate pr-2", selectedStepId === step.id ? "text-primary" : "text-foreground")}>
                            {step.name}
                          </h4>
                          <Badge variant="outline" className="text-[9px] font-mono h-5 px-1.5 uppercase shrink-0">
                            {step.type}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 truncate">
                          {step.status === 'completed' ? "Executed successfully" : 
                           step.status === 'failed' ? "Validation errors detected" : 
                           "Waiting for dependencies"}
                        </p>
                      </div>
                      
                      {selectedStepId === step.id && (
                         <div className="absolute right-4 top-1/2 -translate-y-1/2 animate-in fade-in slide-in-from-left-2 duration-300">
                           <ChevronRight className="h-4 w-4 text-primary" />
                         </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Middle Col: Step-Level Inspection */}
        <Card className="col-span-12 lg:col-span-8 flex flex-col border-sidebar-border h-full bg-sidebar/30">
          {selectedStep ? (
            <>
              <CardHeader className="pb-4 border-b border-border/50">
                 <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <div className={cn(
                        "h-10 w-10 rounded-lg flex items-center justify-center",
                        selectedStep.status === 'completed' ? "bg-emerald-500/10 text-emerald-500" :
                        selectedStep.status === 'failed' ? "bg-red-500/10 text-red-500" : "bg-muted text-muted-foreground"
                     )}>
                       {selectedStep.status === 'completed' ? <CheckCircle className="h-6 w-6" /> : <ShieldAlert className="h-6 w-6" />}
                     </div>
                     <div>
                       <CardTitle>{selectedStep.name}</CardTitle>
                       <CardDescription className="flex items-center gap-2 mt-1">
                         Step ID: <code className="text-xs bg-muted px-1 rounded">{selectedStep.id}</code>
                         <span className="text-muted-foreground">•</span>
                         <Badge variant="outline" className={cn("capitalize", 
                           selectedStep.status === 'completed' ? "text-emerald-500 border-emerald-500/20" : 
                           selectedStep.status === 'failed' ? "text-red-500 border-red-500/20" : ""
                         )}>
                           {selectedStep.status}
                         </Badge>
                       </CardDescription>
                     </div>
                   </div>
                 </div>
              </CardHeader>
              <CardContent className="p-0 flex-1 overflow-hidden grid grid-rows-2 divide-y divide-border/50">
                
                {/* Inputs & Outputs */}
                <div className="grid grid-cols-2 divide-x divide-border/50">
                  <div className="p-6 overflow-y-auto">
                    <h3 className="text-xs font-mono text-muted-foreground uppercase mb-3 flex items-center gap-2">
                      <FileText className="h-3 w-3" /> Input Data
                    </h3>
                    <div className="bg-card rounded-md border border-border/50 p-4 font-mono text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap">
                      {selectedStep.details.input || "No input data available."}
                    </div>
                  </div>
                  <div className="p-6 overflow-y-auto">
                    <h3 className="text-xs font-mono text-muted-foreground uppercase mb-3 flex items-center gap-2">
                      <Terminal className="h-3 w-3" /> Output / Result
                    </h3>
                     <div className="bg-card rounded-md border border-border/50 p-4 font-mono text-xs text-foreground leading-relaxed whitespace-pre-wrap">
                      {selectedStep.details.output || "No output generated."}
                    </div>
                  </div>
                </div>

                {/* Validation & Errors */}
                <div className="p-6 bg-card/30">
                  <h3 className="text-xs font-mono text-muted-foreground uppercase mb-3 flex items-center gap-2">
                    <ShieldAlert className="h-3 w-3" /> Validation Layer
                  </h3>
                  
                  {selectedStep.details.validationErrors && selectedStep.details.validationErrors.length > 0 ? (
                    <div className="space-y-3">
                      {selectedStep.details.validationErrors.map((error, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 rounded-md bg-red-950/20 border border-red-900/50 text-red-200 text-sm">
                           <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                           {error}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 p-3 rounded-md bg-emerald-950/20 border border-emerald-900/50 text-emerald-200 text-sm">
                       <CheckCircle className="h-4 w-4 shrink-0" />
                       All validation checks passed.
                    </div>
                  )}

                  <div className="mt-6">
                    <h4 className="text-sm font-medium mb-2">Maestro Orchestration Trace</h4>
                    <div className="rounded-md border border-border/50 bg-sidebar-accent/30 p-2">
                      <ScrollArea className="h-[200px]">
                        <div className="flex flex-col gap-1 p-2">
                           {simulationLogs.filter(log => log.timestamp >= "10:42:06").map(log => (
                             <div key={log.id} className="text-xs font-mono py-1 border-b border-border/10 last:border-0">
                               <span className="text-muted-foreground mr-2">[{log.timestamp}]</span>
                               <span className={cn("font-medium", 
                                  log.type === 'agent' ? "text-blue-400" : 
                                  log.type === 'system' ? "text-red-400" : "text-purple-400"
                               )}>{log.type.toUpperCase()}: </span>
                               <span>{log.content}</span>
                             </div>
                           ))}
                        </div>
                      </ScrollArea>
                    </div>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
             <div className="flex items-center justify-center h-full text-muted-foreground">
               Select a step to inspect details
             </div>
          )}
        </Card>
      </div>
    </div>
  );
}
