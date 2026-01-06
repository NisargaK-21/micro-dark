"use client";

import React, { useEffect, useRef, useState } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import cytoscape from "cytoscape";
import dagre from "cytoscape-dagre";

// Register dagre layout
if (!cytoscape.prototype.dagre) {
  cytoscape.use(dagre);
}

const riskColors = {
  critical: "#ef4444",
  high: "#f59e0b",
  medium: "#3b82f6",
  low: "#10b981",
};

export default function CampaignGraph({ elements }) {
  const cyRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive detection safely for Next.js
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (cyRef.current) {
      const cy = cyRef.current;

      // Enable interaction for mobile touch
      cy.userZoomingEnabled(true);
      cy.userPanningEnabled(true);
      cy.boxSelectionEnabled(false); // Better for mobile scrolling

      // Apply styles with responsive sizing
      cy.style()
        .selector("node[type='vendor']")
        .style({
          "background-color": (node) => riskColors[node.data("risk")] || "#ef4444",
          "label": "data(label)",
          "color": "#ffffff",
          "text-valign": "center",
          "text-halign": "center",
          "width": isMobile ? 80 : 120,
          "height": isMobile ? 40 : 60,
          "shape": "round-rectangle",
          "font-size": isMobile ? 9 : 12,
          "font-weight": "bold",
          "text-wrap": "wrap",
          "text-max-width": isMobile ? 70 : 110,
        })
        .selector("node[type='campaign']")
        .style({
          "background-color": (node) => riskColors[node.data("risk")] || "#f59e0b",
          "label": "data(label)",
          "color": "#ffffff",
          "text-valign": "center",
          "text-halign": "center",
          "width": isMobile ? 70 : 100,
          "height": isMobile ? 70 : 100,
          "shape": "ellipse",
          "font-size": isMobile ? 8 : 11,
        })
        .selector("node[type='forum']")
        .style({
          "background-color": (node) => riskColors[node.data("risk")] || "#3b82f6",
          "label": "data(label)",
          "color": "#ffffff",
          "text-valign": "center",
          "text-halign": "center",
          "width": isMobile ? 70 : 100,
          "height": isMobile ? 60 : 80,
          "shape": "round-diamond",
          "font-size": isMobile ? 8 : 11,
        })
        .selector("node[type='tactic']")
        .style({
          "background-color": (node) => riskColors[node.data("risk")] || "#10b981",
          "label": "data(label)",
          "color": "#ffffff",
          "text-valign": "center",
          "text-halign": "center",
          "width": isMobile ? 60 : 80,
          "height": isMobile ? 60 : 80,
          "shape": "round-triangle",
          "font-size": isMobile ? 7 : 10,
        })
        .selector("edge")
        .style({
          "width": (edge) => Math.max(1, (edge.data("weight") || 0.5) * (isMobile ? 2 : 4)),
          "line-color": "#a1a1aa",
          "target-arrow-color": "#a1a1aa",
          "target-arrow-shape": "triangle",
          "curve-style": "bezier",
          "opacity": (edge) => Math.min(1, (edge.data("weight") || 0.5) + 0.2),
        })
        .update();

      // Layout with responsive spacing
      const layout = cy.layout({
        name: "dagre",
        rankDir: "TB",
        spacingFactor: isMobile ? 1.1 : 1.5,
        nodeDimensionsIncludeLabels: true,
        animate: true,
      });
      
      layout.run();
      
      // Auto-fit the graph on load/resize
      cy.fit(null, isMobile ? 20 : 50);
    }
  }, [elements, isMobile]);

  return (
    <div className="w-full relative bg-white dark:bg-zinc-900 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
      <CytoscapeComponent
        elements={elements}
        cy={(cy) => {
          cyRef.current = cy;
        }}
        style={{ 
          width: "100%", 
          height: isMobile ? "400px" : "600px",
          display: "block"
        }}
        // Default layout to prevent flash of unstyled content
        layout={{ name: "dagre", rankDir: "TB" }}
        wheelSensitivity={0.2}
      />
      
      {/* Mobile Interaction Hint */}
      {isMobile && (
        <div className="absolute bottom-2 right-2 bg-black/50 text-[10px] text-white px-2 py-1 rounded pointer-events-none">
          Pinch to zoom • Drag to pan
        </div>
      )}
    </div>
  );
}