// "use client";

// import { Line, Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler
// );

// export function LineChart({ data, title }) {
//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: "top",
//         labels: {
//           color: "#a1a1aa",
//           usePointStyle: true,
//         },
//       },
//       title: {
//         display: !!title,
//         text: title,
//         color: "#e4e4e7",
//         font: {
//           size: 16,
//           weight: "bold",
//         },
//       },
//     },
//     scales: {
//       x: {
//         grid: {
//           color: "rgba(161, 161, 170, 0.1)",
//         },
//         ticks: {
//           color: "#a1a1aa",
//         },
//       },
//       y: {
//         grid: {
//           color: "rgba(161, 161, 170, 0.1)",
//         },
//         ticks: {
//           color: "#a1a1aa",
//         },
//       },
//     },
//   };

//   return <Line data={data} options={options} />;
// }

// export function BarChart({ data, title }) {
//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         display: false,
//       },
//       title: {
//         display: !!title,
//         text: title,
//         color: "#e4e4e7",
//         font: {
//           size: 16,
//           weight: "bold",
//         },
//       },
//     },
//     scales: {
//       x: {
//         grid: {
//           color: "rgba(161, 161, 170, 0.1)",
//         },
//         ticks: {
//           color: "#a1a1aa",
//         },
//       },
//       y: {
//         grid: {
//           color: "rgba(161, 161, 170, 0.1)",
//         },
//         ticks: {
//           color: "#a1a1aa",
//         },
//       },
//     },
//   };

//   return <Bar data={data} options={options} />;
// }

"use client";

import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export function LineChart({ data, title }) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#a1a1aa",
          usePointStyle: true,
          font: {
            size: window.innerWidth < 640 ? 10 : 12,
          },
        },
      },
      title: {
        display: !!title,
        text: title,
        color: "#e4e4e7",
        font: {
          size: window.innerWidth < 640 ? 14 : 16,
          weight: "bold",
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(161, 161, 170, 0.1)",
        },
        ticks: {
          color: "#a1a1aa",
          font: {
            size: window.innerWidth < 640 ? 9 : 11,
          },
          maxRotation: window.innerWidth < 640 ? 45 : 0,
          minRotation: window.innerWidth < 640 ? 45 : 0,
        },
      },
      y: {
        grid: {
          color: "rgba(161, 161, 170, 0.1)",
        },
        ticks: {
          color: "#a1a1aa",
          font: {
            size: window.innerWidth < 640 ? 9 : 11,
          },
        },
      },
    },
  };

  return <Line data={data} options={options} />;
}

export function BarChart({ data, title }) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: !!title,
        text: title,
        color: "#e4e4e7",
        font: {
          size: window.innerWidth < 640 ? 14 : 16,
          weight: "bold",
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(161, 161, 170, 0.1)",
        },
        ticks: {
          color: "#a1a1aa",
          font: {
            size: window.innerWidth < 640 ? 9 : 11,
          },
          maxRotation: window.innerWidth < 640 ? 45 : 0,
          minRotation: window.innerWidth < 640 ? 45 : 0,
        },
      },
      y: {
        grid: {
          color: "rgba(161, 161, 170, 0.1)",
        },
        ticks: {
          color: "#a1a1aa",
          font: {
            size: window.innerWidth < 640 ? 9 : 11,
          },
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
}