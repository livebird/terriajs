"use strict";

/*global require*/
var createBingBaseMapOptions = require("./createBingBaseMapOptions");
var BaseMapViewModel = require("./BaseMapViewModel");
var WebMapServiceCatalogItem = require("../Models/WebMapServiceCatalogItem");
var OpenStreetMapCatalogItem = require("../Models/OpenStreetMapCatalogItem");
var UrlTemplateCatalogItem = require("../Models/UrlTemplateCatalogItem");
var ArcGisMapServerCatalogItem = require("../Models/ArcGisMapServerCatalogItem");

var createGlobalBaseMapOptions = function(terria, bingMapsKey) {
  var result = createBingBaseMapOptions(terria, bingMapsKey);

  var naturalEarthII = new WebMapServiceCatalogItem(terria);
  naturalEarthII.name = "Natural Earth II";
  naturalEarthII.url =
    "http://geoserver.nationalmap.nicta.com.au/imagery/natural-earth-ii/wms";
  naturalEarthII.layers = "natural-earth-ii:NE2_HR_LC_SR_W_DR";
  naturalEarthII.parameters = {
    tiled: true
  };
  naturalEarthII.opacity = 1.0;
  naturalEarthII.isRequiredForRendering = true;

  result.push(
    new BaseMapViewModel({
      image: require("../../wwwroot/images/natural-earth.png"),
      catalogItem: naturalEarthII
    })
  );

  var blackMarble = new WebMapServiceCatalogItem(terria);
  blackMarble.name = "NASA Black Marble";
  blackMarble.url =
    "http://geoserver.nationalmap.nicta.com.au/imagery/nasa-black-marble/wms";
  blackMarble.layers =
    "nasa-black-marble:dnb_land_ocean_ice.2012.54000x27000_geo";
  blackMarble.parameters = {
    tiled: true
  };
  blackMarble.opacity = 1.0;
  blackMarble.isRequiredForRendering = true;

  result.push(
    new BaseMapViewModel({
      image: require("../../wwwroot/images/black-marble.png"),
      catalogItem: blackMarble
    })
  );

  var positron = new OpenStreetMapCatalogItem(terria);
  positron.name = "Positron (Light)";
  positron.url = "https://global.ssl.fastly.net/light_all/";

  // https://cartodb.com/basemaps/ gives two different attribution strings. In any case HTML gets swallowed, so we have to adapt.
  // 1 '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy;
  //   <a href="http://cartodb.com/attributions">CartoDB</a>'
  // 2 Map tiles by <a href="http://cartodb.com/attributions#basemaps">CartoDB</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">
  //   CC BY 3.0</a>. Data by <a href="http://www.openstreetmap.org/">OpenStreetMap</a>, under ODbL.
  positron.attribution =
    "© OpenStreetMap contributors ODbL, © CartoDB CC-BY 3.0";

  positron.opacity = 1.0;
  positron.subdomains = [
    "cartodb-basemaps-a",
    "cartodb-basemaps-b",
    "cartodb-basemaps-c",
    "cartodb-basemaps-d"
  ];
  result.push(
    new BaseMapViewModel({
      image: require("../../wwwroot/images/positron.png"),
      catalogItem: positron,
      contrastColor: "#000000"
    })
  );

  var darkMatter = new OpenStreetMapCatalogItem(terria);
  darkMatter.name = "Dark Matter";
  darkMatter.url = "https://global.ssl.fastly.net/dark_all/";

  darkMatter.attribution =
    "© OpenStreetMap contributors ODbL, © CartoDB CC-BY 3.0";

  darkMatter.opacity = 1.0;
  darkMatter.subdomains = [
    "cartodb-basemaps-a",
    "cartodb-basemaps-b",
    "cartodb-basemaps-c",
    "cartodb-basemaps-d"
  ];
  result.push(
    new BaseMapViewModel({
      image: require("../../wwwroot/images/dark-matter.png"),
      catalogItem: darkMatter
    })
  );

  var HERE_TerrainDay = new UrlTemplateCatalogItem(terria);
  HERE_TerrainDay.name = "HERE Terrain";
  HERE_TerrainDay.url =
    "https://1.aerial.maps.api.here.com/maptile/2.1/maptile/newest/terrain.day/{z}/{x}/{y}/256/png8?app_id=iXpRWOfbCuAG3RwT3ItP&app_code=ZLUrS2G28mo2mE-BCIFZmw";
  HERE_TerrainDay.attribution = "HERE Maps";
  HERE_TerrainDay.opacity = 1.0;
  result.push(
    new BaseMapViewModel({
      image: require("../../wwwroot/images/HERE-TerrainDay.png"),
      catalogItem: HERE_TerrainDay
    })
  );

  var HERE_SatelliteDay = new UrlTemplateCatalogItem(terria);
  HERE_SatelliteDay.name = "HERE Satellite";
  HERE_SatelliteDay.url =
    "https://2.aerial.maps.api.here.com/maptile/2.1/maptile/newest/satellite.day/{z}/{x}/{y}/256/png8?app_id=iXpRWOfbCuAG3RwT3ItP&app_code=ZLUrS2G28mo2mE-BCIFZmw";
  HERE_SatelliteDay.attribution = "HERE Maps";
  HERE_SatelliteDay.opacity = 1.0;
  result.push(
    new BaseMapViewModel({
      image: require("../../wwwroot/images/HERE_SatelliteDay.png"),
      catalogItem: HERE_SatelliteDay
    })
  );

  var ThunderforestOutdoors = new UrlTemplateCatalogItem(terria);
  ThunderforestOutdoors.name = "Thunderforest Outdoors";
  ThunderforestOutdoors.url =
    "https://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=7644dc7df2924741a4f39bb88ee89576";
  ThunderforestOutdoors.attribution = "Thunderforest and OSM";
  ThunderforestOutdoors.opacity = 1.0;
  result.push(
    new BaseMapViewModel({
      image: require("../../wwwroot/images/thunderforest_outdoors.png"),
      catalogItem: ThunderforestOutdoors
    })
  );

  var ThunderforestTransportDark = new UrlTemplateCatalogItem(terria);
  ThunderforestTransportDark.name = "Thunderforest Transport Dark";
  ThunderforestTransportDark.url =
    "https://{s}.tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey=7644dc7df2924741a4f39bb88ee89576";
  ThunderforestTransportDark.attribution = "Thunderforest and OSM";
  ThunderforestTransportDark.opacity = 1.0;
  result.push(
    new BaseMapViewModel({
      image: require("../../wwwroot/images/thunderforest_transport_dark.png"),
      catalogItem: ThunderforestTransportDark
    })
  );

  var ESRIOceanMapServer = new ArcGisMapServerCatalogItem(terria);
  ESRIOceanMapServer.name = "ESRI Ocean Basemap";
  ESRIOceanMapServer.url =
    "http://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/";
  ESRIOceanMapServer.attribution = "ESRI Ocean Basemap";
  ESRIOceanMapServer.opacity = 1.0;
  result.push(
    new BaseMapViewModel({
      image: require("../../wwwroot/images/esri_oceanbasemap.png"),
      catalogItem: ESRIOceanMapServer
    })
  );

  var ESRIWorldImageryMapServer = new ArcGisMapServerCatalogItem(terria);
  ESRIWorldImageryMapServer.name = "ESRI World_Imagery Basemap";
  ESRIWorldImageryMapServer.url =
    "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/";
  ESRIWorldImageryMapServer.attribution = "ESRI World_Imagery Basemap";
  ESRIWorldImageryMapServer.opacity = 1.0;
  result.push(
    new BaseMapViewModel({
      image: require("../../wwwroot/images/esri_worldimagery_basemap.png"),
      catalogItem: ESRIWorldImageryMapServer
    })
  );
  var ESRIWorldShadedRelfMapService = new ArcGisMapServerCatalogItem(terria);
  ESRIWorldShadedRelfMapService.name = "ESRI Shaded Relief Basemap";
  ESRIWorldShadedRelfMapService.url =
    "http://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/";
  ESRIWorldShadedRelfMapService.attribution = "ESRI Shaded Relief Basemap";
  ESRIWorldShadedRelfMapService.opacity = 1.0;
  result.push(
    new BaseMapViewModel({
      image: require("../../wwwroot/images/esri_worldshadedrelief_basemap.png"),
      catalogItem: ESRIWorldShadedRelfMapService
    })
  );

  var ESRIWorldStreetMapMapService = new ArcGisMapServerCatalogItem(terria);
  ESRIWorldStreetMapMapService.name = "ESRI World_Street_Map Basemap";
  ESRIWorldStreetMapMapService.url =
    "http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/";
  ESRIWorldStreetMapMapService.attribution = "ESRI Shaded Relief Basemap";
  ESRIWorldStreetMapMapService.opacity = 1.0;
  result.push(
    new BaseMapViewModel({
      image: require("../../wwwroot/images/esri_World_Street_Map_basemap.png"),
      catalogItem: ESRIWorldStreetMapMapService
    })
  );

  var ESRINatGeoMapService = new ArcGisMapServerCatalogItem(terria);
  ESRINatGeoMapService.name = "ESRI NatGeo_World_Map Basemap";
  ESRINatGeoMapService.url =
    "http://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/";
  ESRINatGeoMapService.attribution = "ESRI National Geographic Basemap";
  ESRINatGeoMapService.opacity = 1.0;
  result.push(
    new BaseMapViewModel({
      image: require("../../wwwroot/images/esri_NationalGeographic_basemap.png"),
      catalogItem: ESRINatGeoMapService
    })
  );

  return result;
};

module.exports = createGlobalBaseMapOptions;
