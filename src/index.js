import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import "./css/main.css";
// // import "cesium/Build/Cesium/Widgets/widgets.css";
import "./js/rotateDropDown.js";

import { Viewer, Terrain, Ion, GeoJsonDataSource } from "cesium";
import "cesium/Widgets/widgets.css";
import "../src/css/main.css";

import "./js/rotateDropDown.js";

import * as Config from "./js/config.js";
import * as handleTMS from "./js/handleTMS.js";
import * as handleGeoJson from "./js/handleGeoJson.js";

Ion.defaultAccessToken = Config.ionToken;

const viewer = new Viewer("cesiumContainer", {
  terrain: Terrain.fromWorldTerrain({
    requestWaterMask: true,
    requestVertexNormals: true,
  }),
});

// Add Earthquake TMS
handleTMS.handleTMS(viewer, handleTMS.EQ_TMS_OBJ, "eqSelectAll");
// Add Heavy Rain TMS
handleTMS.handleTMS(viewer, handleTMS.RAIN_TMS_OBJ, "rainSelectAll");

// Load Geojson data
GeoJsonDataSource.clampToGround = true;
viewer.scene.globe.depthTestAgainstTerrain = true;

const GJS_DISASTER_2024_LAYER = await handleGeoJson.getDisaster2024();
const GJS_POTENTIAL_DISASTER_LAYER = await handleGeoJson.getPoDisaster2024();
const GJS_GENERAL_INFOR_LAYER = await handleGeoJson.getGeneralInfor();

// Add data the viewer
Object.keys(GJS_DISASTER_2024_LAYER).forEach((key) => {
  viewer.dataSources.add(GJS_DISASTER_2024_LAYER[key]);
});

Object.keys(GJS_POTENTIAL_DISASTER_LAYER).forEach((key) => {
  viewer.dataSources.add(GJS_POTENTIAL_DISASTER_LAYER[key]);
});

Object.keys(GJS_GENERAL_INFOR_LAYER).forEach((key) => {
  viewer.dataSources.add(GJS_GENERAL_INFOR_LAYER[key]);
});

// Load population data
const popGeoJson = viewer.dataSources.add(
  GeoJsonDataSource.load("./data/pop/pop_2020.geojson")
);
popGeoJson.then((dataSource) => {
  dataSource.entities.values.forEach((entity) => {
    const pop_count = entity.properties.Population._value;
    entity.polygon.material = Config.colorFunction(pop_count);
  });
});

GJS_GENERAL_INFOR_LAYER["population"] = await popGeoJson;

viewer.zoomTo(GJS_GENERAL_INFOR_LAYER["boundary"]);

handleGeoJson.handleGeoJsonLayer(
  GJS_DISASTER_2024_LAYER,
  "notoDisasterSelectAll"
);
handleGeoJson.handleGeoJsonLayer(
  GJS_POTENTIAL_DISASTER_LAYER,
  "potentialSelectAll"
);
handleGeoJson.handleGeoJsonLayer(GJS_GENERAL_INFOR_LAYER, "generalSelectAll");

// Handle individual checkbox
export function eqCheck(event, hazard = "eq") {
  const id = event.target.id;
  if (event.target.checked) {
    if (hazard == "eq") {
      handleTMS.EQ_TMS_OBJ[id].show = true;
    } else if (hazard == "rain") {
      handleTMS.RAIN_TMS_OBJ[id].show = true;
    } else if (hazard == "disaster") {
      GJS_DISASTER_2024_LAYER[id].show = true;
    } else if (hazard == "po_disaster") {
      GJS_POTENTIAL_DISASTER_LAYER[id].show = true;
    } else if (hazard == "general") {
      GJS_GENERAL_INFOR_LAYER[id].show = true;
    }
  } else {
    if (hazard == "eq") {
      handleTMS.EQ_TMS_OBJ[id].show = false;
    } else if (hazard == "rain") {
      handleTMS.RAIN_TMS_OBJ[id].show = false;
    } else if (hazard == "disaster") {
      GJS_DISASTER_2024_LAYER[id].show = false;
    } else if (hazard == "po_disaster") {
      GJS_POTENTIAL_DISASTER_LAYER[id].show = false;
    } else if (hazard == "general") {
      GJS_GENERAL_INFOR_LAYER[id].show = false;
    }
  }
}

window.eqCheck = eqCheck;
