import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import "./css/main.css";
import "./js/rotateDropDown.js";

import {
  Viewer,
  Terrain,
  Ion,
  GeoJsonDataSource,
  HeightReference,
} from "cesium";
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
viewer.scene.globe.depthTestAgainstTerrain = true;
GeoJsonDataSource.clampToGround = true;

// Add Earthquake TMS
handleTMS.handleTMS(viewer, handleTMS.EQ_TMS_OBJ, "eqSelectAll");
// Add Heavy Rain TMS
handleTMS.handleTMS(viewer, handleTMS.RAIN_TMS_OBJ, "rainSelectAll");

// Load Geojson data
const GJS_DISASTER_2024_LAYER = await handleGeoJson.getDisaster2024();
const GJS_POTENTIAL_DISASTER_LAYER = await handleGeoJson.getPoDisaster2024();
const GJS_GENERAL_INFOR_LAYER = await handleGeoJson.getGeneralInfor();

// viewer.zoomTo(GJS_GENERAL_INFOR_LAYER["boundary"]);

handleGeoJson.handleGeoJsonLayer(
  viewer,
  GJS_DISASTER_2024_LAYER,
  "notoDisasterSelectAll"
);
handleGeoJson.handleGeoJsonLayer(
  viewer,
  GJS_POTENTIAL_DISASTER_LAYER,
  "potentialSelectAll"
);
handleGeoJson.handleGeoJsonLayer(
  viewer,
  GJS_GENERAL_INFOR_LAYER,
  "generalSelectAll"
);

// Handle individual checkbox
function turnOnGJSLayer(viewer, dataSrcObj, id) {
  if (!viewer.dataSources.contains(dataSrcObj[id])) {
    if (id == "population") {
      dataSrcObj[id].entities.values.forEach((entity) => {
        const pop_count = entity.properties.Population._value;
        entity.polygon.material = Config.colorFunction(pop_count);
      });
    }
    if (id == "eq_road_drone") {
      const entities = dataSrcObj[id].entities.values;
      for (const entity of entities) {
        // entity.heightReference = HeightReference.CLAMP_TO_GROUND;
        // Set the InfoBox description to include the image
        const imageUrl = entity.properties.src?.getValue();
        const name = entity.properties.name?.getValue();
        entity.description = `
            <div style="overflow: auto; text-align: center;">
                <img src="${imageUrl}" 
                     alt="Image for ${name}" 
                     style="width: 800px; height: 400px; display: block;" />
            </div>
        `;
      }
    }
    viewer.dataSources.add(dataSrcObj[id]);
  }
  dataSrcObj[id].show = true;
}
export function eqCheck(event, hazard = "eq") {
  const id = event.target.id;
  if (event.target.checked) {
    if (hazard == "eq") {
      turnOnGJSLayer(viewer, handleTMS.EQ_TMS_OBJ, id);
    } else if (hazard == "rain") {
      turnOnGJSLayer(viewer, handleTMS.RAIN_TMS_OBJ, id);
    } else if (hazard == "disaster") {
      turnOnGJSLayer(viewer, GJS_DISASTER_2024_LAYER, id);
    } else if (hazard == "po_disaster") {
      turnOnGJSLayer(viewer, GJS_POTENTIAL_DISASTER_LAYER, id);
    } else if (hazard == "general") {
      turnOnGJSLayer(viewer, GJS_GENERAL_INFOR_LAYER, id);
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
