"use client";

import { useEffect, useState } from "react";
import { LineChart, BarChart } from "@/components/MarketingChart";
import StatCard from "@/components/StatCard";
import { 
  TrendingUp, 
  Users, 
  Network, 
  Shield, 
  AlertTriangle,
  Activity 
} from "lucide-react";
import { 
  fetchOverviewStats, 
  fetchDashboardTrends, 
  fetchTacticDistribution,
  fetchRecentActivity 
} from "@/lib/api";

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [trends, setTrends] = useState(null);
  const [tactics, setTactics] = useState(null);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [statsData, trendsData, tacticsData, activityData] = await Promise.all([
          fetchOverviewStats(),
          fetchDashboardTrends(7),
          fetchTacticDistribution(),
          fetchRecentActivity(10)
        ]);
        setStats(statsData);
        setTrends(trendsData);
        setTactics(tacticsData);
        setActivity(activityData);
        setError(null);
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
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
              <p className="text-zinc-600 dark:text-zinc-400">Loading dashboard...</p>
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
            <p className="text-sm text-red-600 dark:text-red-400 mt-2">
              Make sure the backend API is running on http://localhost:8000
            </p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Real-time insights into dark web marketing campaigns
          </p>
        </div>

        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Campaigns"
              value={stats.totalCampaigns?.toLocaleString() || "0"}
              subtitle="Active marketing campaigns"
              icon={Network}
              trend="up"
              trendValue="+12% this week"
            />
            <StatCard
              title="Active Vendors"
              value={stats.activeVendors || "0"}
              subtitle="Vendors currently active"
              icon={Users}
              trend="up"
              trendValue="+8% this week"
            />
            <StatCard
              title="Detected Tactics"
              value={stats.detectedTactics || "0"}
              subtitle="Unique persuasion tactics"
              icon={Shield}
              trend="up"
              trendValue="+4 this week"
            />
            <StatCard
              title="Threat Level"
              value={stats.threatLevel || "Unknown"}
              subtitle="Current risk assessment"
              icon={AlertTriangle}
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {trends && (
            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
                Campaign Trends
              </h2>
              <div className="h-80">
                <LineChart data={trends} />
              </div>
            </div>
          )}

          {tactics && (
            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
                Tactic Distribution
              </h2>
              <div className="h-80">
                <BarChart data={tactics} />
              </div>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-red-600 dark:text-red-400" />
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
              Recent Activity
            </h2>
          </div>
          <div className="space-y-3">
            {activity && activity.length > 0 ? activity.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-zinc-900 dark:text-white">
                    {item.description}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    {item.vendor} • {new Date(item.timestamp).toLocaleString()}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    item.severity === "high"
                      ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                  }`}
                >
                  {item.severity}
                </span>
              </div>
            )) : (
              <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center py-4">
                No recent activity
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

