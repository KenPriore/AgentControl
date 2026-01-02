import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { approvalRequests } from "@/lib/legalData";
import { CheckCircle2, Clock, FileText, XCircle, Search, Filter, AlertCircle, MinusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function Approvals() {
  return (
    <div className="flex flex-col gap-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Stakeholder Approvals</h1>
          <p className="text-muted-foreground mt-1">Cross-functional review status for pending contracts.</p>
        </div>
        <div className="flex gap-2">
           <Input className="bg-card border-border w-64" placeholder="Search requests..." />
           <Button variant="outline" className="gap-2">
             <Filter className="h-4 w-4" /> Filter
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {approvalRequests.map((req) => (
          <Card key={req.id} className="border-sidebar-border bg-card overflow-hidden">
            <div className="border-b border-border bg-sidebar-accent/20 p-4 flex items-center justify-between">
               <div className="flex items-center gap-4">
                 <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                   <FileText className="h-5 w-5 text-primary" />
                 </div>
                 <div>
                   <h3 className="font-semibold text-base">{req.contractName}</h3>
                   <div className="flex items-center gap-3 text-xs text-muted-foreground">
                     <span className="font-mono">{req.id}</span>
                     <span>•</span>
                     <span>{req.contractType}</span>
                     <span>•</span>
                     <span>Requester: {req.requester}</span>
                   </div>
                 </div>
               </div>
               <div className="flex items-center gap-3">
                 <span className="text-xs text-muted-foreground">{req.date}</span>
                 <Badge variant="outline" className={cn(
                   "bg-background",
                   req.status === 'Approved' ? "text-emerald-500 border-emerald-500/30" :
                   req.status === 'Rejected' ? "text-red-500 border-red-500/30" :
                   "text-amber-500 border-amber-500/30"
                 )}>
                   {req.status.toUpperCase()}
                 </Badge>
               </div>
            </div>
            
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 divide-y md:divide-y-0 md:divide-x divide-border">
                {req.teams.map((team) => (
                  <div key={team.name} className="p-4 flex flex-col gap-3 group hover:bg-sidebar-accent/5 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <team.icon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{team.name}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {team.status === 'Approved' && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                      {team.status === 'Rejected' && <XCircle className="h-4 w-4 text-red-500" />}
                      {team.status === 'Pending' && <Clock className="h-4 w-4 text-amber-500 animate-pulse" />}
                      {team.status === 'Not Required' && <MinusCircle className="h-4 w-4 text-muted-foreground/30" />}
                      
                      <span className={cn("text-xs font-medium", 
                        team.status === 'Approved' ? "text-emerald-500" :
                        team.status === 'Rejected' ? "text-red-500" :
                        team.status === 'Pending' ? "text-amber-500" :
                        "text-muted-foreground/50"
                      )}>
                        {team.status}
                      </span>
                    </div>

                    {team.status !== 'Not Required' && team.status !== 'Pending' && (
                      <div className="mt-auto pt-2 border-t border-border/50">
                        <p className="text-[10px] text-muted-foreground">Approved by</p>
                        <p className="text-xs font-medium truncate">{team.approver}</p>
                      </div>
                    )}

                    {team.status === 'Rejected' && team.comment && (
                      <div className="mt-2 p-2 bg-red-500/10 border border-red-500/20 rounded text-[10px] text-red-200">
                        "{team.comment}"
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
