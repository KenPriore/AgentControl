import AgentMonitor from "@/pages/AgentMonitor";
import ClaimsAnalytics from "@/pages/ClaimsAnalytics";
import { Switch, Route, Link, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import Traceability from "@/pages/Traceability";
import Agents from "@/pages/Agents";
import Approvals from "@/pages/Approvals";
import Workflows from "@/pages/Workflows";
import Inbox from "@/pages/Inbox";
import { LayoutDashboard, FileText, Bot, Inbox as InboxIcon, Menu, ShieldCheck, PieChart, Scale, GitGraph, CheckSquare, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { cn } from "@/lib/utils";

function NavLink({ href, icon: Icon, children }: { href: string; icon: any; children: React.ReactNode }) {
  const [location] = useLocation();
  const isActive = location === href;

  return (
    <Link href={href}>
      <Button
        variant={isActive ? "secondary" : "ghost"}
        className={cn(
          "w-full justify-start gap-3 mb-1 font-medium",
          isActive ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50"
        )}
      >
        <Icon className="h-4 w-4" />
        {children}
      </Button>
    </Link>
  );
}

function Sidebar() {
  return (
    <div className="h-full w-64 bg-sidebar border-r border-sidebar-border flex flex-col p-4">
      <div className="flex items-center gap-2 px-2 mb-8 mt-2">
        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
          <ShieldCheck className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-bold text-sidebar-foreground tracking-tight leading-none">AGENTIC WORKFLOW DESK</h1>
          <p className="text-[10px] text-muted-foreground font-mono tracking-widest uppercase mt-0.5">Legal OS v2.0</p>
        </div>
      </div>

      <nav className="flex-1">
        <div className="mb-4">
          <p className="px-2 text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Oversight</p>
          <NavLink href="/" icon={LayoutDashboard}>Orchestrator Oversight</NavLink>
          <NavLink href="/claims-analytics" icon={Scale}>Clause Intelligence</NavLink>
          <NavLink href="/workflows" icon={GitGraph}>Workflow History</NavLink>
          <NavLink href="/agent-monitor" icon={Activity}>Agent Monitor</NavLink>
          <NavLink href="/approvals" icon={CheckSquare}>Stakeholder Approvals</NavLink>
        </div>
        
        <div className="mb-4">
          <p className="px-2 text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Operations</p>
          <NavLink href="/traceability" icon={FileText}>Traceability Audit</NavLink>
          <NavLink href="/agents" icon={Bot}>Agent Composition</NavLink>
          <NavLink href="/inbox" icon={InboxIcon}>Attorney Action Queue</NavLink>
        </div>
      </nav>

      <div className="mt-auto border-t border-sidebar-border pt-4 px-2">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-sidebar-accent flex items-center justify-center text-xs font-bold">
            JD
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Jane Doe</span>
            <span className="text-xs text-muted-foreground">Lead Counsel</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-sidebar w-64 border-r border-sidebar-border">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-background text-foreground font-sans">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-14 border-b border-border flex items-center px-4 md:hidden">
          <MobileNav />
          <span className="ml-2 font-semibold">LexGuard</span>
        </header>
        <div className="flex-1 overflow-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/claims-analytics" component={ClaimsAnalytics} />
        <Route path="/traceability" component={Traceability} />
        <Route path="/agents" component={Agents} />
        <Route path="/workflows" component={Workflows} />
        <Route path="/agent-monitor" component={AgentMonitor} />
        <Route path="/approvals" component={Approvals} />
        <Route path="/inbox" component={Inbox} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider>
          <Toaster />
          <Router />
        </SidebarProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
