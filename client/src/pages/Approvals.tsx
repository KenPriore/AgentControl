import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { approvalRequests } from "@/lib/legalData";
import { CheckCircle2, Clock, FileText, XCircle, Filter, MinusCircle, User, ChevronRight, MoreHorizontal, GitGraph } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

export default function Approvals() {
  return (
    <div className="flex flex-col gap-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Stakeholder Approvals</h1>
          <p className="text-muted-foreground mt-1">Cross-functional review status and decision tracking.</p>
        </div>
        <div className="flex gap-2">
           <Input className="bg-card border-border w-64" placeholder="Search requests..." />
           <Button variant="outline" className="gap-2">
             <Filter className="h-4 w-4" /> Filter
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {approvalRequests.map((req) => {
          const approvedCount = req.teams.filter(t => t.status === 'Approved').length;
          const requiredCount = req.teams.filter(t => t.status !== 'Not Required').length;
          const progress = Math.round((approvedCount / requiredCount) * 100);

          return (
            <Card key={req.id} className="border-sidebar-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              {/* Enhanced Header */}
              <div className="border-b border-border bg-sidebar/30 p-6">
                 <div className="flex items-start justify-between mb-6">
                   <div className="flex gap-5">
                     <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/10 shadow-inner">
                       <FileText className="h-7 w-7 text-primary" />
                     </div>
                     <div>
                       <div className="flex items-center gap-3 mb-1">
                         <h3 className="font-bold text-xl tracking-tight">{req.contractName}</h3>
                         <Badge variant="outline" className={cn(
                           "bg-background/50 backdrop-blur font-mono uppercase text-[10px] tracking-wider",
                           req.status === 'Approved' ? "text-emerald-500 border-emerald-500/30" :
                           req.status === 'Rejected' ? "text-red-500 border-red-500/30" :
                           "text-amber-500 border-amber-500/30"
                         )}>
                           {req.status}
                         </Badge>
                       </div>
                       <div className="flex items-center gap-4 text-sm text-muted-foreground">
                         <span className="flex items-center gap-1.5"><span className="font-mono text-xs opacity-70">ID:</span> {req.id}</span>
                         <span className="h-1 w-1 rounded-full bg-border" />
                         <span>{req.contractType}</span>
                         <span className="h-1 w-1 rounded-full bg-border" />
                         <span className="flex items-center gap-1.5"><User className="h-3 w-3" /> {req.requester}</span>
                         <span className="h-1 w-1 rounded-full bg-border" />
                         <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> {req.date}</span>
                       </div>
                     </div>
                   </div>
                   
                   <div className="flex items-center gap-2">
                     <Button variant="outline" size="sm">View Contract</Button>
                     <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                   </div>
                 </div>

                 {/* Maestro Branching Indicator */}
                 {req.contractType.includes("Exception") && (
                   <div className="px-6 pb-2">
                     <div className="flex items-center gap-2 text-xs text-purple-500 bg-purple-500/5 border border-purple-500/20 rounded-md px-3 py-1.5 w-fit">
                       <GitGraph className="h-3 w-3" />
                       <span className="font-medium">Maestro Branch Active:</span> Product Exception Request Workflow
                     </div>
                   </div>
                 )}

                 {/* Progress Bar */}
                 <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-2">
                        <span className="font-medium text-muted-foreground uppercase tracking-wider">Approval Progress</span>
                        <span className="font-mono text-muted-foreground">{approvedCount} of {requiredCount} Required</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                    <div className="text-right min-w-[60px]">
                       <span className="text-lg font-bold">{progress}%</span>
                    </div>
                 </div>
              </div>
              
              <CardContent className="p-6 bg-gradient-to-b from-card to-card/50">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
                  {req.teams.map((team, index) => (
                    <div key={team.name} className="relative group">
                      {/* Connector Line (Desktop) */}
                      {index !== req.teams.length - 1 && (
                        <div className="hidden xl:block absolute top-6 left-1/2 w-full h-[2px] bg-border -z-10" />
                      )}
                      
                      <div className={cn(
                        "flex flex-col items-center text-center p-4 rounded-xl border transition-all duration-200 h-full",
                        team.status === 'Approved' ? "bg-emerald-500/5 border-emerald-500/20 hover:bg-emerald-500/10" :
                        team.status === 'Rejected' ? "bg-red-500/5 border-red-500/20 hover:bg-red-500/10" :
                        team.status === 'Pending' ? "bg-amber-500/5 border-amber-500/20 hover:bg-amber-500/10" :
                        "bg-muted/30 border-border opacity-60 grayscale hover:grayscale-0 hover:opacity-100"
                      )}>
                        <div className={cn(
                          "h-12 w-12 rounded-full flex items-center justify-center mb-3 shadow-sm border-2",
                          team.status === 'Approved' ? "bg-emerald-500 text-white border-emerald-600" :
                          team.status === 'Rejected' ? "bg-red-500 text-white border-red-600" :
                          team.status === 'Pending' ? "bg-amber-100 text-amber-600 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800" :
                          "bg-muted text-muted-foreground border-border"
                        )}>
                          <team.icon className="h-5 w-5" />
                        </div>

                        <span className="text-sm font-semibold mb-1">{team.name}</span>
                        
                        <div className="flex items-center gap-1.5 mb-3">
                          {team.status === 'Approved' && <CheckCircle2 className="h-3 w-3 text-emerald-500" />}
                          {team.status === 'Rejected' && <XCircle className="h-3 w-3 text-red-500" />}
                          {team.status === 'Pending' && <Clock className="h-3 w-3 text-amber-500" />}
                          {team.status === 'Not Required' && <MinusCircle className="h-3 w-3 text-muted-foreground" />}
                          <span className={cn("text-[10px] uppercase font-bold tracking-wider",
                            team.status === 'Approved' ? "text-emerald-600 dark:text-emerald-400" :
                            team.status === 'Rejected' ? "text-red-600 dark:text-red-400" :
                            team.status === 'Pending' ? "text-amber-600 dark:text-amber-400" :
                            "text-muted-foreground"
                          )}>{team.status}</span>
                        </div>

                        {team.approver && (
                          <div className="mt-auto pt-3 border-t border-border/50 w-full">
                            <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                              <User className="h-3 w-3" />
                              <span className="truncate max-w-[100px]">{team.approver}</span>
                            </div>
                          </div>
                        )}

                        {team.status === 'Rejected' && team.comment && (
                          <div className="mt-3 p-2 bg-red-500/10 border border-red-500/20 rounded-md text-[10px] leading-tight text-red-600 dark:text-red-300 w-full text-left">
                            "{team.comment}"
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
