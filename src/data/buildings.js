// Helper to generate dates spread across different periods
const today = new Date();
const getDate = (daysAgo) => {
  const date = new Date(today);
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
};

// Placeholder images for buildings
const buildingImages = [
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=100&h=100&fit=crop",
];

// Helper function to generate realistic time-variant data
const generateTimeVariantData = (baseAir, baseThermal) => ({
  "7days": { 
    airQuality: Math.max(0, Math.min(100, baseAir + (Math.random() * 6 - 3))),
    thermalComfort: Math.max(0, Math.min(100, baseThermal + (Math.random() * 6 - 3)))
  },
  "30days": { 
    airQuality: baseAir, 
    thermalComfort: baseThermal 
  },
  "3months": { 
    airQuality: Math.max(0, Math.min(100, baseAir + (Math.random() * 10 - 5))),
    thermalComfort: Math.max(0, Math.min(100, baseThermal + (Math.random() * 10 - 5)))
  },
  "6months": { 
    airQuality: Math.max(0, Math.min(100, baseAir + (Math.random() * 12 - 6))),
    thermalComfort: Math.max(0, Math.min(100, baseThermal + (Math.random() * 12 - 6)))
  },
});

// Helper function to generate time-variant metrics data
const generateTimeVariantMetrics = (baseMetrics) => {
  const periods = ["7days", "30days", "3months", "6months"];
  const result = {};
  
  periods.forEach((period) => {
    const variance = period === "7days" ? 5 : period === "30days" ? 0 : period === "3months" ? 8 : 12;
    
    result[period] = {
      airQuality: baseMetrics.airQuality.map(metric => ({
        ...metric,
        timeInTarget: Math.max(0, Math.min(100, 
          metric.timeInTarget + (Math.random() * variance * 2 - variance)
        ))
      })),
      thermalComfort: baseMetrics.thermalComfort.map(metric => ({
        ...metric,
        timeInTarget: Math.max(0, Math.min(100, 
          metric.timeInTarget + (Math.random() * variance * 2 - variance)
        ))
      }))
    };
  });
  
  return result;
};

export const buildings = [
  {
    id: "1",
    name: "Calgary Demo Office",
    image: buildingImages[0],
    spaces: 6,
    wellCompliance: "needs-attention",
    airQuality: 67.2,
    thermalComfort: 42.6,
    dataByPeriod: generateTimeVariantData(67.2, 42.6),
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
    metricsByPeriod: null, // Will be set after creation
  },
  {
    id: "2",
    name: "Calgary Office",
    image: buildingImages[1],
    spaces: 10,
    wellCompliance: "needs-attention",
    airQuality: 55.3,
    thermalComfort: 68.9,
    dataByPeriod: generateTimeVariantData(55.3, 68.9),
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
    metricsByPeriod: null, // Will be set after creation
  },
  {
    id: "3",
    name: "Capitol Records Building Tower",
    image: buildingImages[2],
    spaces: 33,
    wellCompliance: "passing",
    airQuality: 85.4,
    thermalComfort: 91.2,
    dataByPeriod: generateTimeVariantData(85.4, 91.2),
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
    metricsByPeriod: null, // Will be set after creation
  },
  {
    id: "4",
    name: "Kaiterra Test",
    image: buildingImages[3],
    spaces: 1,
    wellCompliance: "needs-attention",
    airQuality: 66.7,
    thermalComfort: 50.0,
    dataByPeriod: generateTimeVariantData(66.7, 50.0),
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
    metricsByPeriod: null, // Will be set after creation
  },
  {
    id: "5",
    name: "Royal Canadian Art Museum",
    image: buildingImages[4],
    spaces: 34,
    wellCompliance: "passing",
    airQuality: 78.5,
    thermalComfort: 82.3,
    dataByPeriod: generateTimeVariantData(78.5, 82.3),
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
    metricsByPeriod: null, // Will be set after creation
  },
  {
    id: "6",
    name: "SE-300 Demo Building",
    image: buildingImages[5],
    spaces: 2,
    wellCompliance: "needs-attention",
    airQuality: 45.8,
    thermalComfort: 38.2,
    dataByPeriod: generateTimeVariantData(45.8, 38.2),
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
    metricsByPeriod: null, // Will be set after creation
  },
  {
    id: "7",
    name: "Test Building",
    image: buildingImages[6],
    spaces: 0,
    wellCompliance: "needs-attention",
    airQuality: 32.1,
    thermalComfort: 28.5,
    dataByPeriod: generateTimeVariantData(32.1, 28.5),
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
    metricsByPeriod: null, // Will be set after creation
  },
  {
    id: "8",
    name: "The White House",
    image: buildingImages[0],
    spaces: 52,
    wellCompliance: "passing",
    airQuality: 92.3,
    thermalComfort: 88.7,
    dataByPeriod: generateTimeVariantData(92.3, 88.7),
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
    metricsByPeriod: null, // Will be set after creation
  },
  {
    id: "9",
    name: "United Nations Headquarters",
    image: buildingImages[1],
    spaces: 116,
    wellCompliance: "passing",
    airQuality: 87.9,
    thermalComfort: 85.4,
    dataByPeriod: generateTimeVariantData(87.9, 85.4),
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
    metricsByPeriod: null, // Will be set after creation
  },
  {
    id: "10",
    name: "WELL Office",
    image: buildingImages[2],
    spaces: 10,
    wellCompliance: "passing",
    airQuality: 94.2,
    thermalComfort: 96.8,
    dataByPeriod: generateTimeVariantData(94.2, 96.8),
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
    metricsByPeriod: null, // Will be set after creation
  },
];

// Populate metricsByPeriod for all buildings after creation
buildings.forEach(building => {
  if (building.metrics) {
    building.metricsByPeriod = generateTimeVariantMetrics(building.metrics);
  }
});

