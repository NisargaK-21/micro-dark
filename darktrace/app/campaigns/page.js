"use client";

import { useEffect, useState } from "react";
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
        <div className="ml-64 p-8">
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
        <div className="ml-64 p-8">
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
      <div className="ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
            Campaign Network Analysis
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Visualize relationships between vendors, campaigns, forums, and tactics
          </p>
        </div>


        {stats && graphData && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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


        {graphData && graphElements.length > 0 ? (
          <div className="mb-8">
            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
                Campaign Network Graph
              </h2>
              <CampaignGraph elements={graphElements} />
            </div>
          </div>
        ) : (
          <div className="mb-8">
            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
              <p className="text-zinc-500 dark:text-zinc-400 text-center py-8">
                No campaign graph data available
              </p>
            </div>
          </div>
        )}


        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
          <h3 className="text-md font-semibold text-zinc-900 dark:text-white mb-4">
            Legend
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-sm text-zinc-600 dark:text-zinc-400">Vendors</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-zinc-600 dark:text-zinc-400">Campaigns</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 transform rotate-45"></div>
              <span className="text-sm text-zinc-600 dark:text-zinc-400">Forums</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 transform rotate-180"></div>
              <span className="text-sm text-zinc-600 dark:text-zinc-400">Tactics</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Edge thickness and opacity represent relationship strength. Color intensity indicates risk level.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

