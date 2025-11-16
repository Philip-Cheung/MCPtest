// Helper to generate dates spread across different periods
const today = new Date();
const getDate = (daysAgo) => {
  const date = new Date(today);
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
};

export const buildings = [
  {
    id: "1",
    name: "Calgary Demo Office",
    spaces: 6,
    wellCompliance: "needs-attention",
    airQuality: 67.2,
    thermalComfort: 42.6,
    lastUpdated: getDate(5), // 5 days ago
    metrics: {
      airQuality: [
        { name: "CO₂", target: "≤ 900 ppm", timeInTarget: 44, unit: "ppm" },
        { name: "PM₂.₅", target: "≤ 15 μg/m³", timeInTarget: 100, unit: "μg/m³" },
        { name: "TVOC", target: "≤ 109 ppb", timeInTarget: 58, unit: "ppb" },
      ],
      thermalComfort: [
        { name: "Humidity", target: "30 - 60 %", timeInTarget: 16, unit: "%" },
        { name: "Temperature", target: "20 - 26 °C", timeInTarget: 70, unit: "°C" },
      ],
    },
  },
  {
    id: "2",
    name: "Calgary Office",
    spaces: 10,
    wellCompliance: "needs-attention",
    airQuality: 55.3,
    thermalComfort: 68.9,
    lastUpdated: getDate(12), // 12 days ago
    metrics: {
      airQuality: [
        { name: "CO₂", target: "≤ 900 ppm", timeInTarget: 62, unit: "ppm" },
        { name: "PM₂.₅", target: "≤ 15 μg/m³", timeInTarget: 89, unit: "μg/m³" },
        { name: "TVOC", target: "≤ 109 ppb", timeInTarget: 41, unit: "ppb" },
      ],
      thermalComfort: [
        { name: "Humidity", target: "30 - 60 %", timeInTarget: 72, unit: "%" },
        { name: "Temperature", target: "20 - 26 °C", timeInTarget: 65, unit: "°C" },
      ],
    },
  },
  {
    id: "3",
    name: "Capitol Records Building Tower",
    spaces: 33,
    wellCompliance: "passing",
    airQuality: 85.4,
    thermalComfort: 91.2,
    lastUpdated: getDate(20), // 20 days ago
    metrics: {
      airQuality: [
        { name: "CO₂", target: "≤ 900 ppm", timeInTarget: 88, unit: "ppm" },
        { name: "PM₂.₅", target: "≤ 15 μg/m³", timeInTarget: 95, unit: "μg/m³" },
        { name: "TVOC", target: "≤ 109 ppb", timeInTarget: 82, unit: "ppb" },
      ],
      thermalComfort: [
        { name: "Humidity", target: "30 - 60 %", timeInTarget: 93, unit: "%" },
        { name: "Temperature", target: "20 - 26 °C", timeInTarget: 89, unit: "°C" },
      ],
    },
  },
  {
    id: "4",
    name: "Kaiterra Test",
    spaces: 1,
    wellCompliance: "needs-attention",
    airQuality: 66.7,
    thermalComfort: 50.0,
    lastUpdated: getDate(35), // 35 days ago
    metrics: {
      airQuality: [
        { name: "CO₂", target: "≤ 900 ppm", timeInTarget: 72, unit: "ppm" },
        { name: "PM₂.₅", target: "≤ 15 μg/m³", timeInTarget: 68, unit: "μg/m³" },
        { name: "TVOC", target: "≤ 109 ppb", timeInTarget: 60, unit: "ppb" },
      ],
      thermalComfort: [
        { name: "Humidity", target: "30 - 60 %", timeInTarget: 50, unit: "%" },
        { name: "Temperature", target: "20 - 26 °C", timeInTarget: 50, unit: "°C" },
      ],
    },
  },
  {
    id: "5",
    name: "Royal Canadian Art Museum",
    spaces: 34,
    wellCompliance: "passing",
    airQuality: 78.5,
    thermalComfort: 82.3,
    lastUpdated: getDate(45), // 45 days ago
    metrics: {
      airQuality: [
        { name: "CO₂", target: "≤ 900 ppm", timeInTarget: 81, unit: "ppm" },
        { name: "PM₂.₅", target: "≤ 15 μg/m³", timeInTarget: 84, unit: "μg/m³" },
        { name: "TVOC", target: "≤ 109 ppb", timeInTarget: 71, unit: "ppb" },
      ],
      thermalComfort: [
        { name: "Humidity", target: "30 - 60 %", timeInTarget: 85, unit: "%" },
        { name: "Temperature", target: "20 - 26 °C", timeInTarget: 80, unit: "°C" },
      ],
    },
  },
  {
    id: "6",
    name: "SE-300 Demo Building",
    spaces: 2,
    wellCompliance: "needs-attention",
    airQuality: 45.8,
    thermalComfort: 38.2,
    lastUpdated: getDate(60), // 60 days ago
    metrics: {
      airQuality: [
        { name: "CO₂", target: "≤ 900 ppm", timeInTarget: 42, unit: "ppm" },
        { name: "PM₂.₅", target: "≤ 15 μg/m³", timeInTarget: 58, unit: "μg/m³" },
        { name: "TVOC", target: "≤ 109 ppb", timeInTarget: 37, unit: "ppb" },
      ],
      thermalComfort: [
        { name: "Humidity", target: "30 - 60 %", timeInTarget: 35, unit: "%" },
        { name: "Temperature", target: "20 - 26 °C", timeInTarget: 41, unit: "°C" },
      ],
    },
  },
  {
    id: "7",
    name: "Test Building",
    spaces: 0,
    wellCompliance: "needs-attention",
    airQuality: 32.1,
    thermalComfort: 28.5,
    lastUpdated: getDate(75), // 75 days ago
    metrics: {
      airQuality: [
        { name: "CO₂", target: "≤ 900 ppm", timeInTarget: 28, unit: "ppm" },
        { name: "PM₂.₅", target: "≤ 15 μg/m³", timeInTarget: 45, unit: "μg/m³" },
        { name: "TVOC", target: "≤ 109 ppb", timeInTarget: 23, unit: "ppb" },
      ],
      thermalComfort: [
        { name: "Humidity", target: "30 - 60 %", timeInTarget: 31, unit: "%" },
        { name: "Temperature", target: "20 - 26 °C", timeInTarget: 26, unit: "°C" },
      ],
    },
  },
  {
    id: "8",
    name: "The White House",
    spaces: 52,
    wellCompliance: "passing",
    airQuality: 92.3,
    thermalComfort: 88.7,
    lastUpdated: getDate(90), // 90 days ago
    metrics: {
      airQuality: [
        { name: "CO₂", target: "≤ 900 ppm", timeInTarget: 95, unit: "ppm" },
        { name: "PM₂.₅", target: "≤ 15 μg/m³", timeInTarget: 98, unit: "μg/m³" },
        { name: "TVOC", target: "≤ 109 ppb", timeInTarget: 84, unit: "ppb" },
      ],
      thermalComfort: [
        { name: "Humidity", target: "30 - 60 %", timeInTarget: 90, unit: "%" },
        { name: "Temperature", target: "20 - 26 °C", timeInTarget: 87, unit: "°C" },
      ],
    },
  },
  {
    id: "9",
    name: "United Nations Headquarters",
    spaces: 116,
    wellCompliance: "passing",
    airQuality: 87.9,
    thermalComfort: 85.4,
    lastUpdated: getDate(120), // 120 days ago
    metrics: {
      airQuality: [
        { name: "CO₂", target: "≤ 900 ppm", timeInTarget: 91, unit: "ppm" },
        { name: "PM₂.₅", target: "≤ 15 μg/m³", timeInTarget: 92, unit: "μg/m³" },
        { name: "TVOC", target: "≤ 109 ppb", timeInTarget: 81, unit: "ppb" },
      ],
      thermalComfort: [
        { name: "Humidity", target: "30 - 60 %", timeInTarget: 88, unit: "%" },
        { name: "Temperature", target: "20 - 26 °C", timeInTarget: 83, unit: "°C" },
      ],
    },
  },
  {
    id: "10",
    name: "WELL Office",
    spaces: 10,
    wellCompliance: "passing",
    airQuality: 94.2,
    thermalComfort: 96.8,
    lastUpdated: getDate(180), // 180 days ago
    metrics: {
      airQuality: [
        { name: "CO₂", target: "≤ 900 ppm", timeInTarget: 97, unit: "ppm" },
        { name: "PM₂.₅", target: "≤ 15 μg/m³", timeInTarget: 99, unit: "μg/m³" },
        { name: "TVOC", target: "≤ 109 ppb", timeInTarget: 87, unit: "ppb" },
      ],
      thermalComfort: [
        { name: "Humidity", target: "30 - 60 %", timeInTarget: 98, unit: "%" },
        { name: "Temperature", target: "20 - 26 °C", timeInTarget: 96, unit: "°C" },
      ],
    },
  },
];

