import { LucideIcon, Shield, Search, FileText, Scale, Zap, AlertTriangle, CheckCircle, Brain, Gavel, FileCheck, Users, GitMerge, UserCheck, Lock, Eye, BarChart, Server, Database, Globe } from "lucide-react";

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
    id: "REQ-2024-901",
    contractName: "Partner Onboarding - Nexus Systems",
    contractType: "Partner Agreement",
    requester: "Alex Rivera (Partner Ops)",
    date: "Today, 11:45 AM",
    status: "Approved",
    teams: [
      { name: "Legal", status: "Approved", approver: "Jane Doe", icon: Scale },
      { name: "Finance", status: "Approved", approver: "Mike Ross", icon: BarChart },
      { name: "Security", status: "Approved", approver: "Sarah Chen", icon: Lock },
      { name: "Privacy", status: "Approved", approver: "Jessica Pearson", icon: Eye },
      { name: "Product", status: "Not Required", icon: Box },
      { name: "Partners", status: "Approved", approver: "Alex Rivera", icon: Users },
      { name: "Sales Ops", status: "Not Required", icon: FileCheck },
    ]
  },
  {
    id: "REQ-2024-902",
    contractName: "Enterprise Quote - Acme Corp",
    contractType: "Sales Quote Exception",
    requester: "Sarah Chen (Sales VP)",
    date: "Today, 11:30 AM",
    status: "Pending",
    teams: [
      { name: "Legal", status: "Pending", icon: Scale },
      { name: "Finance", status: "Approved", approver: "Louis Litt", icon: BarChart },
      { name: "Security", status: "Approved", approver: "Mike Ross", icon: Lock },
      { name: "Privacy", status: "Not Required", icon: Eye },
      { name: "Product", status: "Not Required", icon: Box },
      { name: "Partners", status: "Not Required", icon: Users },
      { name: "Sales Ops", status: "Approved", approver: "Donna Paulsen", icon: FileCheck },
    ]
  },
  {
    id: "REQ-2024-903",
    contractName: "GovCloud Procurement - Agency X",
    contractType: "Government Contract",
    requester: "Mike Ross (Security Lead)",
    date: "Today, 10:20 AM",
    status: "Approved",
    teams: [
      { name: "Legal", status: "Approved", approver: "Harvey Specter", icon: Scale },
      { name: "Finance", status: "Approved", approver: "Louis Litt", icon: BarChart },
      { name: "Security", status: "Approved", approver: "Mike Ross", icon: Lock },
      { name: "Privacy", status: "Approved", approver: "Jessica Pearson", icon: Eye },
      { name: "Product", status: "Not Required", icon: Box },
      { name: "Partners", status: "Not Required", icon: Users },
      { name: "Sales Ops", status: "Not Required", icon: FileCheck },
    ]
  },
  {
    id: "REQ-2024-904",
    contractName: "Annual Renewal - TechFlow Inc",
    contractType: "MSA Renewal",
    requester: "Navigator AI (System)",
    date: "Today, 09:15 AM",
    status: "Pending",
    teams: [
      { name: "Legal", status: "Approved", approver: "Standard Terms", icon: Scale },
      { name: "Finance", status: "Pending", icon: BarChart },
      { name: "Security", status: "Not Required", icon: Lock },
      { name: "Privacy", status: "Not Required", icon: Eye },
      { name: "Product", status: "Not Required", icon: Box },
      { name: "Partners", status: "Not Required", icon: Users },
      { name: "Sales Ops", status: "Pending", icon: FileCheck },
    ]
  },
  {
    id: "REQ-2024-905",
    contractName: "Senior Engineer Offer - J. Doe",
    contractType: "Employment Offer",
    requester: "HR Department",
    date: "Yesterday, 3:45 PM",
    status: "Approved",
    teams: [
      { name: "Legal", status: "Approved", approver: "Jane Doe", icon: Scale },
      { name: "Finance", status: "Approved", approver: "Payroll", icon: BarChart },
      { name: "Security", status: "Approved", approver: "Identity Verifier", icon: Lock },
      { name: "Privacy", status: "Approved", approver: "HR Privacy", icon: Eye },
      { name: "Product", status: "Not Required", icon: Box },
      { name: "Partners", status: "Not Required", icon: Users },
      { name: "Sales Ops", status: "Not Required", icon: FileCheck },
    ]
  }
];

import { Box } from "lucide-react"; // Import Box separately as it was missing

export const iamMetrics = {
  agreementCount: { current: 12450, entitlement: 15000 },
  seatAllowance: { active: 142, total: 200 },
  navigatorIndex: 98.4,
  orchestrationSteps: 14
};

export const connectorHealth = [
  { name: "Salesforce", status: "active", latency: "45ms", uptime: "99.99%" },
  { name: "Workday", status: "active", latency: "120ms", uptime: "99.95%" },
  { name: "ServiceNow", status: "warning", latency: "350ms", uptime: "98.50%" },
  { name: "FedRAMP Boundary", status: "secure", lastAudit: "2h ago" }
];

export const activeAgents: Agent[] = [
  {
    id: "a1",
    name: "Maestro Orchestrator",
    role: "Workflow Management",
    status: "active",
    mode: "structured",
    icon: GitMerge,
    currentTask: "Routing MSA #4421 through Finance and Security parallel steps",
    stats: { tasksCompleted: 1420, accuracy: 99.9, tokensUsed: 550000 },
  },
  {
    id: "a2",
    name: "Navigator Guardian",
    role: "Search Intelligence",
    status: "active",
    mode: "autonomous",
    icon: Search,
    currentTask: "Indexing legacy PDFs and extracting key terms for metadata",
    stats: { tasksCompleted: 5112, accuracy: 98.2, tokensUsed: 1300000 },
  },
  {
    id: "a3",
    name: "Compliance Sentinel",
    role: "Policy Enforcement",
    status: "idle",
    mode: "structured",
    icon: Shield,
    stats: { tasksCompleted: 8900, accuracy: 99.9, tokensUsed: 420000 },
  },
  {
    id: "a4",
    name: "Sandbox Watchdog",
    role: "Data Guard",
    status: "active",
    mode: "autonomous",
    icon: Lock,
    currentTask: "Scanning Sandbox environment for PII leakage",
    stats: { tasksCompleted: 410, accuracy: 100.0, tokensUsed: 250000 },
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

export const policyExceptionData = [
  { month: "Jan", indemnity: 12, dataPrivacy: 8, liability: 5, paymentTerms: 15 },
  { month: "Feb", indemnity: 15, dataPrivacy: 12, liability: 7, paymentTerms: 12 },
  { month: "Mar", indemnity: 18, dataPrivacy: 10, liability: 4, paymentTerms: 10 },
  { month: "Apr", indemnity: 14, dataPrivacy: 15, liability: 8, paymentTerms: 8 },
  { month: "May", indemnity: 22, dataPrivacy: 18, liability: 12, paymentTerms: 11 },
  { month: "Jun", indemnity: 25, dataPrivacy: 22, liability: 15, paymentTerms: 9 },
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
    id: "WKF-2024-005",
    name: "Partner Onboarding & KYC",
    status: "Completed",
    date: "Today, 11:45 AM",
    agent: "Maestro Orchestrator",
    approvals: { legal: true, finance: true, security: true }
  },
  {
    id: "WKF-2024-006",
    name: "Salesforce Quote Exception",
    status: "In Progress",
    date: "Today, 11:30 AM",
    agent: "Approval Sentinel",
    approvals: { legal: false, finance: true, security: true }
  },
  {
    id: "WKF-2024-007",
    name: "FedRAMP Procurement Check",
    status: "Completed",
    date: "Today, 10:20 AM",
    agent: "Compliance Sentinel",
    approvals: { legal: true, finance: true, security: true }
  },
  {
    id: "WKF-2024-008",
    name: "Automated Renewal - Navigator",
    status: "Processing",
    date: "Today, 09:15 AM",
    agent: "Navigator Guardian",
    approvals: { legal: true, finance: false, security: false }
  },
  {
    id: "WKF-2024-009",
    name: "HR Offer Letter & IDV",
    status: "Completed",
    date: "Yesterday, 3:45 PM",
    agent: "Identity Verifier",
    approvals: { legal: true, finance: true, security: true }
  },
  {
    id: "WKF-2024-001",
    name: "NDA Review - Vertex Corp",
    status: "Completed",
    date: "Yesterday, 10:15 AM",
    agent: "Clause Architect",
    approvals: { legal: true, finance: true, security: true }
  },
  {
    id: "WKF-2024-002",
    name: "MSA Renewal - TechFlow",
    status: "In Progress",
    date: "Yesterday, 09:45 AM",
    agent: "Policy Guardian",
    approvals: { legal: true, finance: false, security: true }
  }
];
