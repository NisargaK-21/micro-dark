"use client";

import { useEffect, useState } from "react";
import StatCard from "@/components/StatCard";
import { Users, TrendingUp, AlertTriangle, Activity } from "lucide-react";
import { fetchVendors, fetchOverviewStats } from "@/lib/api";

const riskLevelColors = {
  Critical: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  High: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  Medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Low: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
};

export default function VendorsPage() {
  const [vendors, setVendors] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [vendorsData, statsData] = await Promise.all([
          fetchVendors(),
          fetchOverviewStats()
        ]);
        setVendors(vendorsData);
        setStats(statsData);
        setError(null);
      } catch (err) {
        console.error("Failed to load vendors data:", err);
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
              <p className="text-zinc-600 dark:text-zinc-400">Loading vendors...</p>
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

  const vendorActivity = vendors;
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
            Vendor Activity
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Monitor and analyze vendor behavior across dark web forums
          </p>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
              title="Total Vendors"
              value={stats.activeVendors || vendorActivity.length}
              subtitle="Currently monitored"
              icon={Users}
            />
            <StatCard
              title="High Risk Vendors"
              value={vendorActivity.filter(v => v.riskLevel === "High" || v.riskLevel === "Critical").length}
              subtitle="Requiring attention"
              icon={AlertTriangle}
            />
            <StatCard
              title="Avg. Activity Score"
              value={vendorActivity.length > 0 ? Math.round(vendorActivity.reduce((sum, v) => sum + (v.activity || 0), 0) / vendorActivity.length) : 0}
              subtitle="Across all vendors"
              icon={Activity}
            />
          </div>
        )}

        {/* Vendor Table */}
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
              Vendor List
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-zinc-50 dark:bg-zinc-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Vendor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Activity Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Campaigns
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Tactics
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Risk Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Last Seen
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {vendorActivity.length > 0 ? vendorActivity.map((vendor) => (
                  <tr
                    key={vendor.id}
                    className="hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-zinc-900 dark:text-white">
                        {vendor.name}
                      </div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">
                        ID: {vendor.id}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-zinc-200 dark:bg-zinc-700 rounded-full h-2 w-24">
                          <div
                            className="bg-red-600 h-2 rounded-full"
                            style={{ width: `${(vendor.activity / 100) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-zinc-900 dark:text-white">
                          {vendor.activity}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-white">
                      {vendor.campaigns}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {vendor.tactics.slice(0, 2).map((tactic, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 text-xs bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded"
                          >
                            {tactic}
                          </span>
                        ))}
                        {vendor.tactics.length > 2 && (
                          <span className="px-2 py-1 text-xs text-zinc-500 dark:text-zinc-400">
                            +{vendor.tactics.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded ${
                          riskLevelColors[vendor.riskLevel]
                        }`}
                      >
                        {vendor.riskLevel}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500 dark:text-zinc-400">
                      {vendor.lastSeen ? new Date(vendor.lastSeen).toLocaleString() : "N/A"}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-zinc-500 dark:text-zinc-400">
                      No vendors found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

