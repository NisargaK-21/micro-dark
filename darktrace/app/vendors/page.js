"use client";

import React, { useEffect, useState } from "react";
import StatCard from "@/components/StatCard";
import { Users, AlertTriangle, Activity } from "lucide-react";
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
          fetchOverviewStats(),
        ]);
        setVendors(vendorsData || []);
        setStats(statsData);
        setError(null);
      } catch (err) {
        console.error("Data fetch error:", err);
        setError("Failed to load data. Please ensure backend is running.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black p-8">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="ml-0 md:ml-64 p-4 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
            Vendor Activity
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Monitor and analyze vendor behavior across dark web forums
          </p>
        </div>

        {/* Stats Section */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
              title="Total Vendors"
              value={stats.activeVendors || vendors.length}
              subtitle="Currently monitored"
              icon={Users}
            />
            <StatCard
              title="High Risk Vendors"
              value={vendors.filter(v => v.riskLevel === "High" || v.riskLevel === "Critical").length}
              subtitle="Requiring attention"
              icon={AlertTriangle}
            />
            <StatCard
              title="Avg. Activity Score"
              value={
                vendors.length > 0
                  ? Math.round(vendors.reduce((sum, v) => sum + (v.activity || 0), 0) / vendors.length)
                  : 0
              }
              subtitle="Across all vendors"
              icon={Activity}
            />
          </div>
        )}

        {/* ================= MOBILE VIEW ONLY ================= */}
        <div className="md:hidden space-y-4">
          {vendors.map((vendor) => (
            <div
              key={vendor.id}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-white text-lg">{vendor.name}</h3>
                  <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider">ID: {vendor.id}</p>
                </div>
                <span className={`px-3 py-1 text-xs font-bold rounded-full ${riskLevelColors[vendor.riskLevel] || "bg-zinc-100"}`}>
                  {vendor.riskLevel}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4 border-y border-zinc-100 dark:border-zinc-800 py-4">
                <div>
                  <p className="text-xs text-zinc-500 uppercase font-semibold">Activity Score</p>
                  <p className="text-lg font-bold text-zinc-800 dark:text-zinc-200">{vendor.activity}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase font-semibold">Last Seen</p>
                  <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                    {vendor.lastSeen ? new Date(vendor.lastSeen).toLocaleDateString() : "N/A"}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-xs text-zinc-500 mb-2 font-semibold uppercase">Primary Tactics</p>
                <div className="flex flex-wrap gap-2">
                  {vendor.tactics?.slice(0, 4).map((tactic, i) => (
                    <span key={i} className="px-2.5 py-1 text-[11px] bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-md border border-zinc-200 dark:border-zinc-700">
                      {tactic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ================= DESKTOP VIEW (UNCHANGED) ================= */}
        <div className="hidden md:block bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Vendor List</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-zinc-50 dark:bg-zinc-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Vendor</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Risk Level</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Activity</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Tactics</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Last Seen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {vendors.map((vendor) => (
                  <tr key={vendor.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-zinc-900 dark:text-white">{vendor.name}</div>
                        <div className="text-xs text-zinc-500">ID: {vendor.id}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${riskLevelColors[vendor.riskLevel]}`}>
                        {vendor.riskLevel}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                          <div className="h-full bg-red-600 rounded-full" style={{ width: `${vendor.activity}%` }} />
                        </div>
                        <span className="text-sm text-zinc-600 dark:text-zinc-400">{vendor.activity}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {vendor.tactics?.map((t, i) => (
                          <span key={i} className="px-2 py-0.5 text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded">
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500">
                      {vendor.lastSeen ? new Date(vendor.lastSeen).toLocaleString() : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}