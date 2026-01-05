// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { Shield, TrendingUp, Users, Network, ArrowRight, AlertTriangle } from "lucide-react";
// import { fetchOverviewStats } from "@/lib/api";
// import StatCard from "@/components/StatCard";

// export default function Home() {
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function loadStats() {
//       try {
//         const data = await fetchOverviewStats();
//         setStats(data);
//       } catch (err) {
//         console.error("Failed to load overview stats:", err);
//         // Continue with null stats - page will show placeholders
//       } finally {
//         setLoading(false);
//       }
//     }
//     loadStats();
//   }, []);
//   return (
//     <div className="min-h-screen bg-zinc-50 dark:bg-black">
//       <div className="ml-64 p-8">
//         {/* Hero Section */}
//         <div className="mb-12">
//           <div className="flex items-center gap-3 mb-4">
//             <Shield className="w-10 h-10 text-red-600 dark:text-red-400" />
//             <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">
//               DarkTrace
//             </h1>
//           </div>
//           <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-2">
//             Uncovering Dark Web Marketing Strategies
//           </p>
//           <p className="text-zinc-500 dark:text-zinc-500 max-w-3xl">
//             A research-driven cybersecurity platform that analyzes publicly accessible dark web forums 
//             to identify promotional language, persuasion tactics, and coordinated campaigns used by 
//             illegal vendors. Empowering researchers and policymakers with actionable intelligence.
//           </p>
//         </div>

//         {/* Key Stats */}
//         {stats ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//             <StatCard
//               title="Total Campaigns"
//               value={stats.totalCampaigns?.toLocaleString() || "0"}
//               subtitle="Detected marketing campaigns"
//               icon={Network}
//             />
//             <StatCard
//               title="Active Vendors"
//               value={stats.activeVendors || "0"}
//               subtitle="Currently monitored"
//               icon={Users}
//             />
//             <StatCard
//               title="Detected Tactics"
//               value={stats.detectedTactics || "0"}
//               subtitle="Unique persuasion methods"
//               icon={TrendingUp}
//             />
//             <StatCard
//               title="Forums Monitored"
//               value={stats.forumsMonitored || "0"}
//               subtitle="Dark web forums"
//               icon={Shield}
//             />
//           </div>
//         ) : loading ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//             {[1, 2, 3, 4].map((i) => (
//               <div key={i} className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 animate-pulse">
//                 <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-24 mb-2"></div>
//                 <div className="h-8 bg-zinc-200 dark:bg-zinc-700 rounded w-16 mb-2"></div>
//                 <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-32"></div>
//               </div>
//             ))}
//           </div>
//         ) : null}

//         {/* Features Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
//           <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 hover:shadow-lg transition-shadow">
//             <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center mb-4">
//               <Network className="w-6 h-6 text-red-600 dark:text-red-400" />
//             </div>
//             <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
//               Campaign Analysis
//             </h3>
//             <p className="text-zinc-600 dark:text-zinc-400 text-sm">
//               Identify and track coordinated marketing campaigns across multiple forums, 
//               revealing how illegal vendors scale their operations.
//             </p>
//           </div>

//           <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 hover:shadow-lg transition-shadow">
//             <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4">
//               <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
//             </div>
//             <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
//               Tactic Detection
//             </h3>
//             <p className="text-zinc-600 dark:text-zinc-400 text-sm">
//               Apply NLP and pattern detection to uncover persuasion tactics like urgency, 
//               social proof, and trust-building strategies.
//             </p>
//           </div>

//           <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 hover:shadow-lg transition-shadow">
//             <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center mb-4">
//               <Users className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
//             </div>
//             <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
//               Vendor Intelligence
//             </h3>
//             <p className="text-zinc-600 dark:text-zinc-400 text-sm">
//               Monitor vendor activity, track behavior patterns, and assess risk levels 
//               to understand evolving criminal ecosystems.
//             </p>
//           </div>
//         </div>

//         {/* Quick Actions */}
//         <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
//           <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
//             Quick Access
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <Link
//               href="/dashboard"
//               className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors group"
//             >
//               <div className="flex items-center gap-3">
//                 <TrendingUp className="w-5 h-5 text-red-600 dark:text-red-400" />
//                 <span className="font-medium text-zinc-900 dark:text-white">Analytics Dashboard</span>
//               </div>
//               <ArrowRight className="w-5 h-5 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
//             </Link>

//             <Link
//               href="/vendors"
//               className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors group"
//             >
//               <div className="flex items-center gap-3">
//                 <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
//                 <span className="font-medium text-zinc-900 dark:text-white">Vendor Activity</span>
//               </div>
//               <ArrowRight className="w-5 h-5 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
//             </Link>

//             <Link
//               href="/campaigns"
//               className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors group"
//             >
//               <div className="flex items-center gap-3">
//                 <Network className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
//                 <span className="font-medium text-zinc-900 dark:text-white">Campaign Graph</span>
//               </div>
//               <ArrowRight className="w-5 h-5 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
//             </Link>
//           </div>
//         </div>

//         {/* Mission Statement */}
//         <div className="mt-12 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg p-8 text-white">
//           <div className="flex items-start gap-4">
//             <AlertTriangle className="w-8 h-8 flex-shrink-0" />
//             <div>
//               <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
//               <p className="text-red-50 leading-relaxed">
//                 DarkTrace addresses a critical blind spot in cybersecurity: understanding how illegal 
//                 goods and services are actively marketed on the dark web. While most solutions detect 
//                 illegal listings or leaked data, we focus on the marketing strategies that enable 
//                 underground markets to grow, scale, and retain users. Our goal is early insight and 
//                 prevention, empowering researchers, policymakers, and cybersecurity teams with 
//                 actionable intelligence to design proactive countermeasures—before campaigns reach scale.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Shield, TrendingUp, Users, Network, ArrowRight, AlertTriangle } from "lucide-react";
import { fetchOverviewStats } from "@/lib/api";
import StatCard from "@/components/StatCard";

export default function Home() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await fetchOverviewStats();
        setStats(data);
      } catch (err) {
        console.error("Failed to load overview stats:", err);
        // Continue with null stats - page will show placeholders
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="ml-0 md:ml-64 p-4 sm:p-6 md:p-8">
        {/* Hero Section */}
        <div className="mb-8 md:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-red-600 dark:text-red-400" />
            <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">
              DarkTrace
            </h1>
          </div>
          <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 mb-2">
            Uncovering Dark Web Marketing Strategies
          </p>
          <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-500 max-w-3xl">
            A research-driven cybersecurity platform that analyzes publicly accessible dark web forums 
            to identify promotional language, persuasion tactics, and coordinated campaigns used by 
            illegal vendors. Empowering researchers and policymakers with actionable intelligence.
          </p>
        </div>

        {/* Key Stats */}
        {stats ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
            <StatCard
              title="Total Campaigns"
              value={stats.totalCampaigns?.toLocaleString() || "0"}
              subtitle="Detected marketing campaigns"
              icon={Network}
            />
            <StatCard
              title="Active Vendors"
              value={stats.activeVendors || "0"}
              subtitle="Currently monitored"
              icon={Users}
            />
            <StatCard
              title="Detected Tactics"
              value={stats.detectedTactics || "0"}
              subtitle="Unique persuasion methods"
              icon={TrendingUp}
            />
            <StatCard
              title="Forums Monitored"
              value={stats.forumsMonitored || "0"}
              subtitle="Dark web forums"
              icon={Shield}
            />
          </div>
        ) : loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 animate-pulse">
                <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-24 mb-2"></div>
                <div className="h-8 bg-zinc-200 dark:bg-zinc-700 rounded w-16 mb-2"></div>
                <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-32"></div>
              </div>
            ))}
          </div>
        ) : null}

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-5 md:p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center mb-4">
              <Network className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-white mb-2">
              Campaign Analysis
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm">
              Identify and track coordinated marketing campaigns across multiple forums, 
              revealing how illegal vendors scale their operations.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-5 md:p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-white mb-2">
              Tactic Detection
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm">
              Apply NLP and pattern detection to uncover persuasion tactics like urgency, 
              social proof, and trust-building strategies.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-5 md:p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-white mb-2">
              Vendor Intelligence
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm">
              Monitor vendor activity, track behavior patterns, and assess risk levels 
              to understand evolving criminal ecosystems.
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-5 md:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-zinc-900 dark:text-white mb-4">
            Quick Access
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            <Link
              href="/dashboard"
              className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                <span className="font-medium text-sm sm:text-base text-zinc-900 dark:text-white">Analytics Dashboard</span>
              </div>
              <ArrowRight className="w-5 h-5 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors flex-shrink-0" />
            </Link>

            <Link
              href="/vendors"
              className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <span className="font-medium text-sm sm:text-base text-zinc-900 dark:text-white">Vendor Activity</span>
              </div>
              <ArrowRight className="w-5 h-5 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors flex-shrink-0" />
            </Link>

            <Link
              href="/campaigns"
              className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Network className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
                <span className="font-medium text-sm sm:text-base text-zinc-900 dark:text-white">Campaign Graph</span>
              </div>
              <ArrowRight className="w-5 h-5 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors flex-shrink-0" />
            </Link>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-8 md:mt-12 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg p-6 md:p-8 text-white">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <AlertTriangle className="w-8 h-8 flex-shrink-0" />
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-3">Our Mission</h2>
              <p className="text-sm sm:text-base text-red-50 leading-relaxed">
                DarkTrace addresses a critical blind spot in cybersecurity: understanding how illegal 
                goods and services are actively marketed on the dark web. While most solutions detect 
                illegal listings or leaked data, we focus on the marketing strategies that enable 
                underground markets to grow, scale, and retain users. Our goal is early insight and 
                prevention, empowering researchers, policymakers, and cybersecurity teams with 
                actionable intelligence to design proactive countermeasures—before campaigns reach scale.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}