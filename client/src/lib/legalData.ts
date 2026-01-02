import { LucideIcon, Shield, Search, FileText, Scale, Zap, AlertTriangle, CheckCircle, Brain, Gavel, FileCheck, Users, GitMerge, UserCheck, Lock, Eye, BarChart } from "lucide-react";

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

export interface ApprovalRequest {
  id: string;
  contractName: string;
  contractType: string;
  requester: string;
  date: string;
  status: "Pending" | "Approved" | "Rejected";
  teams: {
    name: string;
    status: "Pending" | "Approved" | "Rejected" | "Not Required";
    approver?: string;
    comment?: string;
    icon: LucideIcon;
  }[];
}

export const approvalRequests: ApprovalRequest[] = [
  {
    id: "REQ-2024-882",
    contractName: "Vertex AI Partnership Agreement",
    contractType: "Partnership Agreement",
    requester: "Sarah Chen (Product VP)",
    date: "Today, 09:30 AM",
    status: "Pending",
    teams: [
      { name: "Legal", status: "Approved", approver: "Jane Doe", icon: Scale },
      { name: "Finance", status: "Pending", icon: BarChart },
      { name: "Security", status: "Approved", approver: "Mike Ross", icon: Lock },
      { name: "Privacy", status: "Approved", approver: "Jessica Pearson", icon: Eye },
      { name: "Product", status: "Approved", approver: "Sarah Chen", icon: Box },
      { name: "Partners", status: "Pending", icon: Users },
      { name: "Sales Ops", status: "Not Required", icon: FileCheck },
    ]
  },
  {
    id: "REQ-2024-885",
    contractName: "Cloud Infrastructure Renewal - AWS",
    contractType: "Vendor Agreement",
    requester: "David Kim (CTO)",
    date: "Yesterday, 4:15 PM",
    status: "Pending",
    teams: [
      { name: "Legal", status: "Approved", approver: "Harvey Specter", icon: Scale },
      { name: "Finance", status: "Rejected", approver: "Louis Litt", comment: "Budget cap exceeded by 15%", icon: BarChart },
      { name: "Security", status: "Approved", approver: "Mike Ross", icon: Lock },
      { name: "Privacy", status: "Not Required", icon: Eye },
      { name: "Product", status: "Not Required", icon: Box },
      { name: "Partners", status: "Not Required", icon: Users },
      { name: "Sales Ops", status: "Not Required", icon: FileCheck },
    ]
  },
  {
    id: "REQ-2024-891",
    contractName: "Enterprise License - MegaCorp",
    contractType: "MSA + Order Form",
    requester: "Rachel Zane (Sales Dir)",
    date: "Today, 11:00 AM",
    status: "Pending",
    teams: [
      { name: "Legal", status: "Pending", icon: Scale },
      { name: "Finance", status: "Pending", icon: BarChart },
      { name: "Security", status: "Not Required", icon: Lock },
      { name: "Privacy", status: "Not Required", icon: Eye },
      { name: "Product", status: "Not Required", icon: Box },
      { name: "Partners", status: "Not Required", icon: Users },
      { name: "Sales Ops", status: "Approved", approver: "Donna Paulsen", icon: FileCheck },
    ]
  }
];

import { Box } from "lucide-react"; // Import Box separately as it was missing

export const activeAgents: Agent[] = [
  {
    id: "a1",
    name: "Clause Architect",
    role: "Contract Drafting",
    status: "active",
    mode: "structured",
    icon: FileText,
    currentTask: "Redlining Indemnity Clause to match Series B Preferred Language",
    stats: { tasksCompleted: 1420, accuracy: 99.5, tokensUsed: 550000 },
  },
  {
    id: "a2",
    name: "Policy Guardian",
    role: "Compliance Check",
    status: "active",
    mode: "autonomous",
    icon: Shield,
    currentTask: "Cross-referencing Order Form #4421 against Q3 Discount Policy",
    stats: { tasksCompleted: 112, accuracy: 96.2, tokensUsed: 1300000 },
  },
  {
    id: "a3",
    name: "Approval Sentinel",
    role: "Workflow Orchestration",
    status: "idle",
    mode: "structured",
    icon: Users,
    stats: { tasksCompleted: 8900, accuracy: 99.9, tokensUsed: 420000 },
  },
  {
    id: "a4",
    name: "Risk Scout",
    role: "Risk Management",
    status: "error",
    mode: "autonomous",
    icon: AlertTriangle,
    currentTask: "Analyzing Force Majeure applicability for Vendor X region",
    stats: { tasksCompleted: 410, accuracy: 89.0, tokensUsed: 250000 },
  },
];

export const simulationLogs: LogStep[] = [
  {
    id: "l1",
    type: "user",
    content: "Review 'Enterprise_License_Agreement_Acme.docx'. Compare against 'Standard SaaS Terms v3.0'. Identify missing approvals for custom payment terms.",
    timestamp: "10:42:01",
  },
  {
    id: "l2",
    type: "agent",
    content: "Ingesting contract. Activating Clause Architect. Loading 'Standard SaaS Terms v3.0'.",
    timestamp: "10:42:03",
    status: "success",
    metadata: { agent: "Clause Architect" },
  },
  {
    id: "l3",
    type: "tool",
    content: "ClauseCompareTool called. Extracted: Payment Terms (Net 60), Liability Cap (2x Fees), Governing Law (NY).",
    timestamp: "10:42:05",
    status: "success",
  },
  {
    id: "l4",
    type: "agent",
    content: "Deviation Analysis: Payment Terms 'Net 60' deviates from Standard 'Net 30'. Liability Cap '2x Fees' aligns with Policy.",
    timestamp: "10:42:06",
    status: "success",
    metadata: { agent: "Clause Architect" },
  },
  {
    id: "l5",
    type: "agent",
    content: "Checking Approvals: Sales VP approval found for 'Net 60'. Finance CFO approval MISSING for 'Net 60' > $50k deal size.",
    timestamp: "10:42:09",
    status: "warning",
    metadata: { agent: "Approval Sentinel" },
  },
  {
    id: "l6",
    type: "system",
    content: "BLOCKING ACTION: Contract cannot proceed to signature. Missing required Finance Approval for payment term exception. Escalating to Deal Desk.",
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
      input: "Enterprise_License_Agreement_Acme.docx",
      output: "Clauses Extracted & Normalized",
    },
  },
  {
    id: "s2",
    name: "Policy Comparison",
    status: "completed",
    type: "processing",
    details: {
      input: "Extracted Clauses vs SaaS Terms v3.0",
      output: "Deviations: Payment Terms, Indemnity Cap",
    },
  },
  {
    id: "s3",
    name: "Stakeholder Approval Check",
    status: "failed",
    type: "review",
    details: {
      input: "Exception: Net 60 Terms",
      output: "Missing Finance Approval",
      validationErrors: ["CFO Approval required for Net > 45 on deals > $50k"],
    },
  },
  {
    id: "s4",
    name: "Signature Readiness",
    status: "pending",
    type: "processing",
    details: {},
  },
];

export const hitlQueueItems = [
  {
    id: "h1",
    title: "Missing Finance Approval",
    agent: "Approval Sentinel",
    severity: "high",
    description: "Net 60 terms detected without CFO sign-off in Salesforce.",
    timestamp: "10:42:12",
  },
  {
    id: "h2",
    title: "Non-Standard Indemnity",
    agent: "Clause Architect",
    severity: "medium",
    description: "Counterparty redlined 'uncapped' indemnity for IP infringement. Requires Counsel review.",
    timestamp: "10:38:45",
  },
  {
    id: "h3",
    title: "DPA Version Mismatch",
    agent: "Policy Guardian",
    severity: "low",
    description: "Contract references DPA v2.1, current standard is v2.4.",
    timestamp: "10:15:22",
  },
];

export const recentWorkflows = [
  {
    id: "WKF-2024-001",
    name: "NDA Review - Vertex Corp",
    status: "Completed",
    date: "Today, 10:15 AM",
    agent: "Clause Architect",
    approvals: { legal: true, finance: true, security: true }
  },
  {
    id: "WKF-2024-002",
    name: "MSA Renewal - TechFlow",
    status: "In Progress",
    date: "Today, 09:45 AM",
    agent: "Policy Guardian",
    approvals: { legal: true, finance: false, security: true }
  },
  {
    id: "WKF-2024-003",
    name: "Vendor Agreement - OfficeSupplies",
    status: "Failed",
    date: "Yesterday, 4:30 PM",
    agent: "Risk Scout",
    approvals: { legal: false, finance: false, security: false }
  },
  {
    id: "WKF-2024-004",
    name: "SaaS Order Form - BigBank",
    status: "Completed",
    date: "Yesterday, 2:15 PM",
    agent: "Approval Sentinel",
    approvals: { legal: true, finance: true, security: true }
  }
];
