"use client";

import React, { useEffect, useState } from "react";
import CampaignGraph from "@/components/CampaignGraph";
import StatCard from "@/components/StatCard";
import { Network, AlertTriangle, TrendingUp, Activity } from "lucide-react";
import { fetchCampaignGraph, fetchOverviewStats } from "@/lib/api";

export default function CampaignsPage() {
  const [graphData, setGraphData] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [graphDataRes, statsData] = await Promise.all([
          fetchCampaignGraph(),
          fetchOverviewStats()
        ]);
        setGraphData(graphDataRes);
        setStats(statsData);
        setError(null);
      } catch (err) {
        console.error("Failed to load campaigns data:", err);
        setError("Failed to load data. Please ensure backend is running.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black">
        <div className="ml-0 md:ml-64 p-4 md:p-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
              <p className="text-zinc-600 dark:text-zinc-400">Loading campaigns...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black">
        <div className="ml-0 md:ml-64 p-4 md:p-8">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
            <p className="text-red-800 dark:text-red-200">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const graphElements = graphData ? [
    ...(graphData.nodes || []),
    ...(graphData.edges || []),
  ] : [];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      {/* Container with responsive margin to account for desktop sidebar */}
      <div className="ml-0 md:ml-64 p-4 md:p-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-2">
            Campaign Network Analysis
          </h1>
          <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400">
            Visualize relationships between vendors, campaigns, forums, and tactics
          </p>
        </div>

        {/* Responsive Stats Grid */}
        {stats && graphData && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            <StatCard
              title="Total Campaigns"
              value={stats.totalCampaigns?.toLocaleString() || "0"}
              subtitle="Active campaigns"
              icon={Network}
            />
            <StatCard
              title="Network Nodes"
              value={graphData.nodes?.length || 0}
              subtitle="Entities in graph"
              icon={Activity}
            />
            <StatCard
              title="Connections"
              value={graphData.edges?.length || 0}
              subtitle="Relationships"
              icon={TrendingUp}
            />
            <StatCard
              title="High Risk"
              value={graphData.nodes?.filter(n => n.data?.risk === "high" || n.data?.risk === "critical").length || 0}
              subtitle="Critical entities"
              icon={AlertTriangle}
            />
          </div>
        )}

        {/* Network Graph Section */}
        <div className="mb-8">
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 md:p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
              Campaign Network Graph
            </h2>
            
            {graphData && graphElements.length > 0 ? (
              <div className="h-[400px] md:h-[600px] w-full">
                <CampaignGraph elements={graphElements} />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-zinc-500 dark:text-zinc-400 text-center">
                  No campaign graph data available
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Responsive Legend Section */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 md:p-6 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-4">
            Legend
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-4 gap-x-2">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-red-500 rounded shadow-sm"></div>
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Vendors</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-yellow-500 rounded-full shadow-sm"></div>
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Campaigns</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-blue-500 rotate-45 shadow-sm"></div>
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Forums</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-green-500 rotate-180 shadow-sm"></div>
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Tactics</span>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-500">
              Edge thickness and opacity represent relationship strength. Color intensity indicates risk level. 
              On mobile, use two fingers to pan and pinch to zoom the graph.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}