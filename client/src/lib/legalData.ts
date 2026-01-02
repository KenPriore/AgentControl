import { LucideIcon, Shield, Search, FileText, Scale, Zap, AlertTriangle, CheckCircle, Brain, Gavel } from "lucide-react";

export interface LogStep {
  id: string;
  type: "user" | "agent" | "tool" | "system";
  content: string;
  timestamp: string;
  metadata?: Record<string, any>;
  status?: "success" | "error" | "pending" | "warning";
}

export interface WorkflowStep {
  id: string;
  name: string;
  status: "completed" | "processing" | "pending" | "failed";
  type: "input" | "validation" | "processing" | "review";
  details: {
    input?: string;
    output?: string;
    validationErrors?: string[];
  };
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  status: "active" | "idle" | "error" | "paused";
  mode: "autonomous" | "structured";
  icon: LucideIcon;
  currentTask?: string;
  stats: {
    tasksCompleted: number;
    accuracy: number;
    tokensUsed: number;
  };
}

export const activeAgents: Agent[] = [
  {
    id: "a1",
    name: "Commercial Terms Reviewer",
    role: "Contract Analysis",
    status: "active",
    mode: "structured",
    icon: FileText,
    currentTask: "Comparing payment terms in MSA against Global Sales Playbook v4.2",
    stats: { tasksCompleted: 1240, accuracy: 99.2, tokensUsed: 450000 },
  },
  {
    id: "a2",
    name: "Finance Policy Guardian",
    role: "Compliance Check",
    status: "active",
    mode: "autonomous",
    icon: Scale,
    currentTask: "Validating revenue recognition rules in Q3 Order Forms",
    stats: { tasksCompleted: 85, accuracy: 94.5, tokensUsed: 1200000 },
  },
  {
    id: "a3",
    name: "Order Form Validator",
    role: "Sales Operations",
    status: "idle",
    mode: "structured",
    icon: CheckCircle,
    stats: { tasksCompleted: 5600, accuracy: 99.9, tokensUsed: 890000 },
  },
  {
    id: "a4",
    name: "Risk & Liability Scout",
    role: "Risk Management",
    status: "error",
    mode: "autonomous",
    icon: Shield,
    currentTask: "Cross-referencing indemnity caps with corporate insurance limits",
    stats: { tasksCompleted: 312, accuracy: 88.0, tokensUsed: 210000 },
  },
];

export const simulationLogs: LogStep[] = [
  {
    id: "l1",
    type: "user",
    content: "Review 'Cloud_Services_MSA_Draft.pdf'. Check for deviations from Standard Sales Playbook and Finance Revenue Rec policies.",
    timestamp: "10:42:01",
  },
  {
    id: "l2",
    type: "agent",
    content: "Ingesting document. Activating Commercial Terms Reviewer. Loading 'Global Sales Playbook v4.2'.",
    timestamp: "10:42:03",
    status: "success",
    metadata: { agent: "Commercial Terms Reviewer" },
  },
  {
    id: "l3",
    type: "tool",
    content: "ClauseExtractionTool called on 'Cloud_Services_MSA_Draft.pdf'. Extracted: Payment Terms, Indemnity, Limitation of Liability.",
    timestamp: "10:42:05",
    status: "success",
  },
  {
    id: "l4",
    type: "agent",
    content: "Analyzing Payment Terms: 'Net 90' detected. Playbook Standard: 'Net 30'. Deviation found.",
    timestamp: "10:42:06",
    status: "success",
    metadata: { agent: "Commercial Terms Reviewer" },
  },
  {
    id: "l5",
    type: "agent",
    content: "Reasoning: Client is a strategic partner, but Finance approval is required for Net > 60. Marking for specialized review.",
    timestamp: "10:42:09",
    status: "success",
    metadata: { agent: "Finance Policy Guardian" },
  },
  {
    id: "l6",
    type: "system",
    content: "POLICY VIOLATION DETECTED: 'Unlimited Liability' clause detected in section 12.3. Triggers automatic rejection block. Flagging for HITL.",
    timestamp: "10:42:12",
    status: "error",
  },
];

export const activityData = [
  { time: "09:00", tokens: 1200, tasks: 45 },
  { time: "09:15", tokens: 1800, tasks: 52 },
  { time: "09:30", tokens: 2400, tasks: 68 },
  { time: "09:45", tokens: 3800, tasks: 85 },
  { time: "10:00", tokens: 3200, tasks: 72 },
  { time: "10:15", tokens: 4500, tasks: 90 },
  { time: "10:30", tokens: 5100, tasks: 112 },
  { time: "10:45", tokens: 4800, tasks: 105 },
];

export const mockWorkflow: WorkflowStep[] = [
  {
    id: "s1",
    name: "Contract Ingestion",
    status: "completed",
    type: "input",
    details: {
      input: "Cloud_Services_MSA_Draft.pdf (2.4MB)",
      output: "Clauses Extracted (Payment, Liability, Indemnity)",
    },
  },
  {
    id: "s2",
    name: "Playbook Comparison",
    status: "completed",
    type: "processing",
    details: {
      input: "Extracted Clauses",
      output: "Deviations: Payment Terms (Net 90 vs Net 30)",
    },
  },
  {
    id: "s3",
    name: "Finance Policy Check",
    status: "failed",
    type: "review",
    details: {
      input: "Section 12.3 Liability",
      output: "Non-Compliant (Critical Risk)",
      validationErrors: ["Unlimited Liability detected", "Exceeds corporate risk threshold"],
    },
  },
  {
    id: "s4",
    name: "Approval Routing",
    status: "pending",
    type: "processing",
    details: {},
  },
];

export const hitlQueueItems = [
  {
    id: "h1",
    title: "Liability Cap Breach",
    agent: "Risk & Liability Scout",
    severity: "high",
    description: "Contract contains 'Unlimited Liability' clause which violates corporate risk policy.",
    timestamp: "10:42:12",
  },
  {
    id: "h2",
    title: "Payment Terms Exception",
    agent: "Commercial Terms Reviewer",
    severity: "medium",
    description: "Client requesting Net 90 payment terms. Playbook limit is Net 60.",
    timestamp: "10:38:45",
  },
  {
    id: "h3",
    title: "Missing Data Privacy Addendum",
    agent: "Order Form Validator",
    severity: "low",
    description: "Order form references EU data processing but DPA is missing.",
    timestamp: "10:15:22",
  },
];
