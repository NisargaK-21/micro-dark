"use client";

import { useEffect, useRef } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import cytoscape from "cytoscape";
import dagre from "cytoscape-dagre";

cytoscape.use(dagre);

const nodeStyles = {
  vendor: {
    shape: "round-rectangle",
    width: 120,
    height: 60,
    backgroundColor: "#ef4444",
    color: "#ffffff",
    borderWidth: 2,
    borderColor: "#dc2626",
  },
  campaign: {
    shape: "ellipse",
    width: 100,
    height: 100,
    backgroundColor: "#f59e0b",
    color: "#ffffff",
    borderWidth: 2,
    borderColor: "#d97706",
  },
  forum: {
    shape: "round-diamond",
    width: 100,
    height: 80,
    backgroundColor: "#3b82f6",
    color: "#ffffff",
    borderWidth: 2,
    borderColor: "#2563eb",
  },
  tactic: {
    shape: "round-triangle",
    width: 80,
    height: 80,
    backgroundColor: "#10b981",
    color: "#ffffff",
    borderWidth: 2,
    borderColor: "#059669",
  },
};

const riskColors = {
  critical: "#ef4444",
  high: "#f59e0b",
  medium: "#3b82f6",
  low: "#10b981",
};

export default function CampaignGraph({ elements }) {
  const cyRef = useRef(null);

  useEffect(() => {
    if (cyRef.current) {
      const cy = cyRef.current;

      cy.style()
        .selector("node[type='vendor']")
        .style({
          "background-color": (node) => riskColors[node.data("risk")] || "#ef4444",
          "label": "data(label)",
          "color": "#ffffff",
          "text-valign": "center",
          "text-halign": "center",
          "width": 120,
          "height": 60,
          "shape": "round-rectangle",
          "font-size": 12,
          "font-weight": "bold",
        })
        .selector("node[type='campaign']")
        .style({
          "background-color": (node) => riskColors[node.data("risk")] || "#f59e0b",
          "label": "data(label)",
          "color": "#ffffff",
          "text-valign": "center",
          "text-halign": "center",
          "width": 100,
          "height": 100,
          "shape": "ellipse",
          "font-size": 11,
        })
        .selector("node[type='forum']")
        .style({
          "background-color": (node) => riskColors[node.data("risk")] || "#3b82f6",
          "label": "data(label)",
          "color": "#ffffff",
          "text-valign": "center",
          "text-halign": "center",
          "width": 100,
          "height": 80,
          "shape": "round-diamond",
          "font-size": 11,
        })
        .selector("node[type='tactic']")
        .style({
          "background-color": (node) => riskColors[node.data("risk")] || "#10b981",
          "label": "data(label)",
          "color": "#ffffff",
          "text-valign": "center",
          "text-halign": "center",
          "width": 80,
          "height": 80,
          "shape": "round-triangle",
          "font-size": 10,
        })
        .selector("edge")
        .style({
          "width": (edge) => edge.data("weight") * 5,
          "line-color": "#a1a1aa",
          "target-arrow-color": "#a1a1aa",
          "target-arrow-shape": "triangle",
          "curve-style": "bezier",
          "opacity": (edge) => edge.data("weight") || 0.5,
        })
        .update();

      // Layout
      const layout = cy.layout({
        name: "dagre",
        rankDir: "TB",
        spacingFactor: 1.5,
        nodeDimensionsIncludeLabels: true,
      });
      layout.run();
    }
  }, [elements]);

  return (
    <div className="w-full h-full min-h-[600px] bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
      <CytoscapeComponent
        elements={elements}
        cy={(cy) => {
          cyRef.current = cy;
        }}
        style={{ width: "100%", height: "100%", minHeight: "600px" }}
        layout={{ name: "dagre", rankDir: "TB", spacingFactor: 1.5 }}
      />
    </div>
  );
}

