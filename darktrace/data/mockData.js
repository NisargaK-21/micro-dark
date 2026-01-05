// Mock data for DarkTrace platform

export const overviewStats = {
  totalCampaigns: 1247,
  activeVendors: 342,
  detectedTactics: 89,
  forumsMonitored: 23,
  threatLevel: "High",
  lastUpdated: "2024-01-15T10:30:00Z"
};

export const vendorActivity = [
  {
    id: "v001",
    name: "ShadowMarket_Pro",
    activity: 89,
    campaigns: 12,
    tactics: ["Urgency", "Social Proof", "Limited Supply"],
    riskLevel: "Critical",
    lastSeen: "2024-01-15T08:45:00Z"
  },
  {
    id: "v002",
    name: "DarkDealer_X",
    activity: 76,
    campaigns: 8,
    tactics: ["Trust Building", "Repetition", "Exclusivity"],
    riskLevel: "High",
    lastSeen: "2024-01-15T09:12:00Z"
  },
  {
    id: "v003",
    name: "UndergroundSupply",
    activity: 65,
    campaigns: 15,
    tactics: ["Urgency", "FOMO", "Testimonials"],
    riskLevel: "High",
    lastSeen: "2024-01-15T07:30:00Z"
  },
  {
    id: "v004",
    name: "HiddenVendor_99",
    activity: 54,
    campaigns: 6,
    tactics: ["Trust Building", "Limited Supply"],
    riskLevel: "Medium",
    lastSeen: "2024-01-14T22:15:00Z"
  },
  {
    id: "v005",
    name: "CryptoMarket_Alpha",
    activity: 43,
    campaigns: 9,
    tactics: ["Social Proof", "Urgency", "Exclusivity"],
    riskLevel: "Medium",
    lastSeen: "2024-01-14T20:45:00Z"
  }
];

export const campaignTrends = {
  labels: ["Jan 1", "Jan 3", "Jan 5", "Jan 7", "Jan 9", "Jan 11", "Jan 13", "Jan 15"],
  datasets: [
    {
      label: "New Campaigns",
      data: [12, 19, 15, 25, 22, 30, 28, 35],
      borderColor: "rgb(239, 68, 68)",
      backgroundColor: "rgba(239, 68, 68, 0.1)",
      tension: 0.4
    },
    {
      label: "Active Vendors",
      data: [280, 295, 310, 320, 315, 330, 340, 342],
      borderColor: "rgb(59, 130, 246)",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      tension: 0.4
    },
    {
      label: "Detected Tactics",
      data: [65, 70, 72, 75, 78, 82, 85, 89],
      borderColor: "rgb(34, 197, 94)",
      backgroundColor: "rgba(34, 197, 94, 0.1)",
      tension: 0.4
    }
  ]
};

export const tacticDistribution = {
  labels: ["Urgency", "Trust Building", "Social Proof", "Limited Supply", "FOMO", "Repetition", "Exclusivity", "Testimonials"],
  datasets: [
    {
      label: "Usage Frequency",
      data: [245, 198, 187, 156, 142, 128, 115, 98],
      backgroundColor: [
        "rgba(239, 68, 68, 0.8)",
        "rgba(59, 130, 246, 0.8)",
        "rgba(34, 197, 94, 0.8)",
        "rgba(251, 191, 36, 0.8)",
        "rgba(168, 85, 247, 0.8)",
        "rgba(236, 72, 153, 0.8)",
        "rgba(20, 184, 166, 0.8)",
        "rgba(249, 115, 22, 0.8)"
      ]
    }
  ]
};

export const campaignGraph = {
  nodes: [
    { data: { id: "v001", label: "ShadowMarket_Pro", type: "vendor", risk: "critical" } },
    { data: { id: "v002", label: "DarkDealer_X", type: "vendor", risk: "high" } },
    { data: { id: "v003", label: "UndergroundSupply", type: "vendor", risk: "high" } },
    { data: { id: "c001", label: "Campaign Alpha", type: "campaign", risk: "critical" } },
    { data: { id: "c002", label: "Campaign Beta", type: "campaign", risk: "high" } },
    { data: { id: "c003", label: "Campaign Gamma", type: "campaign", risk: "medium" } },
    { data: { id: "f001", label: "Forum A", type: "forum", risk: "high" } },
    { data: { id: "f002", label: "Forum B", type: "forum", risk: "medium" } },
    { data: { id: "f003", label: "Forum C", type: "forum", risk: "low" } },
    { data: { id: "t001", label: "Urgency", type: "tactic", risk: "medium" } },
    { data: { id: "t002", label: "Trust Building", type: "tactic", risk: "medium" } },
    { data: { id: "t003", label: "Social Proof", type: "tactic", risk: "low" } }
  ],
  edges: [
    { data: { id: "e1", source: "v001", target: "c001", weight: 0.9 } },
    { data: { id: "e2", source: "v002", target: "c001", weight: 0.7 } },
    { data: { id: "e3", source: "v003", target: "c002", weight: 0.8 } },
    { data: { id: "e4", source: "v001", target: "c002", weight: 0.6 } },
    { data: { id: "e5", source: "c001", target: "f001", weight: 0.85 } },
    { data: { id: "e6", source: "c002", target: "f001", weight: 0.75 } },
    { data: { id: "e7", source: "c002", target: "f002", weight: 0.65 } },
    { data: { id: "e8", source: "c003", target: "f002", weight: 0.55 } },
    { data: { id: "e9", source: "c001", target: "t001", weight: 0.9 } },
    { data: { id: "e10", source: "c001", target: "t002", weight: 0.8 } },
    { data: { id: "e11", source: "c002", target: "t001", weight: 0.7 } },
    { data: { id: "e12", source: "c002", target: "t003", weight: 0.75 } },
    { data: { id: "e13", source: "c003", target: "t002", weight: 0.6 } }
  ]
};

export const recentActivity = [
  {
    id: "a001",
    type: "campaign",
    description: "New campaign detected: 'Limited Time Offer'",
    vendor: "ShadowMarket_Pro",
    timestamp: "2024-01-15T10:15:00Z",
    severity: "high"
  },
  {
    id: "a002",
    type: "tactic",
    description: "Urgency tactic usage increased by 23%",
    vendor: "Multiple",
    timestamp: "2024-01-15T09:45:00Z",
    severity: "medium"
  },
  {
    id: "a003",
    type: "vendor",
    description: "New vendor detected: 'CryptoMarket_Alpha'",
    vendor: "CryptoMarket_Alpha",
    timestamp: "2024-01-15T08:30:00Z",
    severity: "medium"
  },
  {
    id: "a004",
    type: "campaign",
    description: "Campaign 'Beta' expanded to 3 forums",
    vendor: "DarkDealer_X",
    timestamp: "2024-01-15T07:20:00Z",
    severity: "high"
  }
];

