// Title: Kilimanjaro Median Composite using Earth Engine Strings

var modi = ee.ImageCollection('MODIS/061/MOD09A1');

var landsatImage = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2');

// Define AOI
var pointKILI = ee.Geometry.Point([37.35, -3.07]);

// Filter
var kiliLandsat8 = landsatImage.filterBounds(pointKILI).sort('CLOUD_COVER').filterDate('2024-01-01', '2024-12-31').median();
print(kiliLandsat8);
Map.centerObject(kiliLandsat8, 9);

// Visualization, Add to map
Map.addLayer(kiliLandsat8,
{
bands: ['SR_B4', 'SR_B3', 'SR_B2'],
min: 5000,
max: 15000
},
'Kilimanjaro Median Landsat 8');
Map.addLayer(kiliLandsat8,
{
bands: ['SR_B5', 'SR_B4', 'SR_B2'],
min: 5000,
max: 15000
},
'KILI NIR Landsat 8');

Map.addLayer(kiliLandsat8,
{
bands: ['SR_B6', 'SR_B5', 'SR_B2'],
min: 5000,
max: 15000
},
'KILI SWIR Landsat 8');
var modisKILI = modi.filterDate('2024-01-01', '2024-12-31').filterBounds(pointKILI).median();
print(modisKILI);
var modisVis = {
bands: [
'sur_refl_b01',
'sur_refl_b04',
'sur_refl_b03'
],
min: 0,
max: 4000
};
Map.addLayer(modisKILI, modisVis, 'MODIS Kilimanjaro Composite');