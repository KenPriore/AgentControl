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
    name: "Privilege Reviewer",
    role: "Privilege & Confidentiality",
    status: "active",
    mode: "structured",
    icon: Shield,
    currentTask: "Reviewing Exhibit 4B for Attorney-Client Privilege",
    stats: { tasksCompleted: 1240, accuracy: 99.2, tokensUsed: 450000 },
  },
  {
    id: "a2",
    name: "Case Law Researcher",
    role: "Legal Research",
    status: "active",
    mode: "autonomous",
    icon: Scale,
    currentTask: "Synthesizing recent Delaware Chancery rulings",
    stats: { tasksCompleted: 85, accuracy: 94.5, tokensUsed: 1200000 },
  },
  {
    id: "a3",
    name: "Contract Extractor",
    role: "Document Analysis",
    status: "idle",
    mode: "structured",
    icon: FileText,
    stats: { tasksCompleted: 5600, accuracy: 99.9, tokensUsed: 890000 },
  },
  {
    id: "a4",
    name: "Fact Checker",
    role: "Validation",
    status: "error",
    mode: "autonomous",
    icon: Search,
    currentTask: "Verifying citation existence in Westlaw",
    stats: { tasksCompleted: 312, accuracy: 88.0, tokensUsed: 210000 },
  },
];

export const simulationLogs: LogStep[] = [
  {
    id: "l1",
    type: "user",
    content: "Analyze document 'Exhibit_4B.pdf' for privilege. Flag any communications with external counsel.",
    timestamp: "10:42:01",
  },
  {
    id: "l2",
    type: "agent",
    content: "Receiving document. Initiating structured review workflow. Checking metadata for attorney participants.",
    timestamp: "10:42:03",
    status: "success",
    metadata: { agent: "Privilege Reviewer" },
  },
  {
    id: "l3",
    type: "tool",
    content: "MetadataExtractionTool called on 'Exhibit_4B.pdf'. Found sender: 'j.doe@company.com', recipient: 's.smith@external-law.com'.",
    timestamp: "10:42:05",
    status: "success",
  },
  {
    id: "l4",
    type: "agent",
    content: "Recipient domain matches known external counsel. Analyzing body text for legal advice.",
    timestamp: "10:42:06",
    status: "success",
    metadata: { agent: "Privilege Reviewer" },
  },
  {
    id: "l5",
    type: "agent",
    content: "Reasoning: The email discusses 'strategic implications of the merger'. This constitutes legal advice.",
    timestamp: "10:42:09",
    status: "success",
    metadata: { agent: "Privilege Reviewer" },
  },
  {
    id: "l6",
    type: "system",
    content: "HALLUCINATION DETECTED: Secondary validation model disputes 'strategic implications' as legal advice without explicit request for counsel. Flagging for HITL.",
    timestamp: "10:42:12",
    status: "error",
  },
];

export const mockWorkflow: WorkflowStep[] = [
  {
    id: "s1",
    name: "Document Ingestion",
    status: "completed",
    type: "input",
    details: {
      input: "Exhibit_4B.pdf (2.4MB)",
      output: "Text extracted (4500 words)",
    },
  },
  {
    id: "s2",
    name: "Metadata Analysis",
    status: "completed",
    type: "processing",
    details: {
      input: "Extracted Text",
      output: "Sender: Internal, Recipient: External Counsel",
    },
  },
  {
    id: "s3",
    name: "Privilege Assessment",
    status: "failed",
    type: "review",
    details: {
      input: "Email Body",
      output: "Privileged (Confidence: 0.72)",
      validationErrors: ["Confidence score below threshold (0.90)", "Secondary validator disagreement"],
    },
  },
  {
    id: "s4",
    name: "Final Classification",
    status: "pending",
    type: "processing",
    details: {},
  },
];

export const hitlQueueItems = [
  {
    id: "h1",
    title: "Privilege Claim Dispute",
    agent: "Privilege Reviewer",
    severity: "high",
    description: "Agent claimed privilege on a business strategy email with no explicit legal advice request.",
    timestamp: "10:42:12",
  },
  {
    id: "h2",
    title: "Citation Verification Failed",
    agent: "Fact Checker",
    severity: "medium",
    description: "Agent generated a case citation that does not exist in the provided database.",
    timestamp: "10:38:45",
  },
  {
    id: "h3",
    title: "Spending Threshold Alert",
    agent: "Case Law Researcher",
    severity: "low",
    description: "Agent exceeded 500k token limit for a single research session.",
    timestamp: "10:15:22",
  },
];
