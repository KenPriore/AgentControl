import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { hitlQueueItems } from "@/lib/legalData";
import { AlertCircle, CheckCircle, Clock, ShieldAlert, UserCheck, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Inbox() {
  return (
    <div className="flex flex-col gap-6 max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Attorney Action Queue</h1>
          <p className="text-muted-foreground mt-1">Prioritized decision queue ranked by risk impact.</p>
        </div>
      </div>

      <div className="space-y-4">
        {hitlQueueItems.map((item) => (
          <Card key={item.id} className="border-l-4 border-l-amber-500 border-y border-r border-sidebar-border overflow-hidden">
            <CardContent className="p-0 flex flex-col md:flex-row">
              <div className="flex-1 p-6">
                <div className="flex items-center gap-3 mb-2">
                   {item.severity === 'high' ? <ShieldAlert className="h-5 w-5 text-red-500" /> : <AlertCircle className="h-5 w-5 text-amber-500" />}
                   <h3 className="font-semibold text-lg">{item.title}</h3>
                   <Badge variant="outline" className={item.severity === 'high' ? "text-red-500 border-red-900/50 bg-red-950/10" : "text-amber-500 border-amber-900/50 bg-amber-950/10"}>
                     {item.severity.toUpperCase()} PRIORITY
                   </Badge>
                </div>
                
                <p className="text-muted-foreground mb-4 text-sm">{item.description}</p>
                
                <div className="flex items-center gap-6 text-xs text-muted-foreground font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    Agent: {item.agent}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3 w-3" />
                    {item.timestamp}
                  </div>
                  <div className="text-amber-500 font-medium">Waiting for approval</div>
                </div>
              </div>
              
              <div className="bg-sidebar-accent/30 p-6 flex flex-row md:flex-col justify-center gap-3 border-t md:border-t-0 md:border-l border-border min-w-[200px]">
                 <Button className="w-full bg-emerald-600 hover:bg-emerald-700 gap-2">
                   <CheckCircle className="h-4 w-4" /> Approve
                 </Button>
                 <Button variant="destructive" className="w-full gap-2">
                   <XCircle className="h-4 w-4" /> Reject
                 </Button>
                 <Button variant="outline" className="w-full gap-2 text-blue-600 border-blue-200 hover:bg-blue-50">
                   <ShieldAlert className="h-4 w-4" /> Trust & Deploy
                 </Button>
                 <Button variant="ghost" className="w-full gap-2 text-muted-foreground">
                   <UserCheck className="h-4 w-4" /> Correct Reasoning
                 </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
