// "use client";

// export default function StatCard({ title, value, subtitle, icon: Icon, trend, trendValue }) {
//   return (
//     <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 hover:shadow-lg transition-shadow">
//       <div className="flex items-start justify-between">
//         <div className="flex-1">
//           <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1">
//             {title}
//           </p>
//           <p className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
//             {value}
//           </p>
//           {subtitle && (
//             <p className="text-xs text-zinc-500 dark:text-zinc-400">
//               {subtitle}
//             </p>
//           )}
//           {trend && trendValue && (
//             <div className={`flex items-center gap-1 mt-2 text-sm ${
//               trend === "up" ? "text-green-600" : "text-red-600"
//             }`}>
//               <span>{trend === "up" ? "↑" : "↓"}</span>
//               <span>{trendValue}</span>
//             </div>
//           )}
//         </div>
//         {Icon && (
//           <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
//             <Icon className="w-6 h-6 text-red-600 dark:text-red-400" />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

export default function StatCard({ title, value, subtitle, icon: Icon, trend, trendValue }) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 sm:p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1">
            {title}
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-2">
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {subtitle}
            </p>
          )}
          {trend && trendValue && (
            <div className={`flex items-center gap-1 mt-2 text-xs sm:text-sm ${
              trend === "up" ? "text-green-600" : "text-red-600"
            }`}>
              <span>{trend === "up" ? "↑" : "↓"}</span>
              <span>{trendValue}</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className="p-2 sm:p-3 bg-red-50 dark:bg-red-900/20 rounded-lg flex-shrink-0">
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 dark:text-red-400" />
          </div>
        )}
      </div>
    </div>
  );
}