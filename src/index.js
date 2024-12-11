import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import "./css/main.css";
import { showLoading, hideLoading } from "./js/loadingScreen.js";
showLoading();

import {
  Viewer,
  Terrain,
  GeoJsonDataSource,
  Cartesian3,
  Color,
  HeightReference,
} from "cesium";

import "cesium/Widgets/widgets.css";
import "../src/css/main.css";
import "./js/fillHtmlContent.js";

import * as handleTMS from "./js/handleTMS.js";
import * as handleGeoJson from "./js/handleGeoJson.js";
import "./js/rotateDropDown.js";
import * as Config from "./js/config.js";

const viewer = new Viewer("cesiumContainer", {
  terrain: Terrain.fromWorldTerrain({
    requestWaterMask: true,
    requestVertexNormals: true,
  }),
});

// Disable ocean movement
viewer.scene.globe.enableLighting = false; // Disables lighting effects, which includes ocean reflections
viewer.scene.globe.depthTestAgainstTerrain = true; // Ensures terrain and water bodies stay static
viewer.scene.globe.showWaterEffect = false; // Turns off water effect animations

const zoom_ishikawa = Cartesian3.fromDegrees(136.873498, 37.270735, 130000);
const zoom_iida = Cartesian3.fromDegrees(137.958613, 35.56171, 130000);

try {
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

  const IIDA_GJS_POTENTIAL_DISASTER_LAYER =
    await handleGeoJson.getPoDisaster2024Iida();
  const IIDA_GJS_GENERAL_INFOR_LAYER =
    await handleGeoJson.getGeneralInforIida();

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

  const po_disaster_layer = {
    ishikawa: GJS_POTENTIAL_DISASTER_LAYER,
    iida: IIDA_GJS_POTENTIAL_DISASTER_LAYER,
  };
  const generalInfor_layer = {
    ishikawa: GJS_GENERAL_INFOR_LAYER,
    iida: IIDA_GJS_GENERAL_INFOR_LAYER,
  };

  // Handle individual checkbox
  function turnOnGJSLayer(viewer, dataSrcObj, id, tms = false) {
    if (!viewer.dataSources.contains(dataSrcObj[id])) {
      if (id == "population") {
        dataSrcObj[id].entities.values.forEach((entity) => {
          const pop_count = entity.properties.Population._value;
          entity.polygon.material = Config.setPopColor(pop_count);
          entity.outline = true; // Enable outline
          entity.outlineColor = Color.WHITE; // Set outline color
          entity.outlineWidth = 2.0;
        });
      } else if (id == "eq_road_drone") {
        const entities = dataSrcObj[id].entities.values;

        for (const entity of entities) {
          const imageUrl = entity.properties.src?.getValue();
          const name = entity.properties.name?.getValue();
          (entity.billboard.heightReference = HeightReference.CLAMP_TO_GROUND),
            (entity.description = `
              <div style="overflow: auto; text-align: center;">
                  <img src="${imageUrl}" 
                      alt="Image for ${name}" 
                      style="width: 800px; height: 400px; display: block;" />
              </div>
          `);
        }
      } else if (id == "isolated_2024") {
        dataSrcObj[id].entities.values.forEach((entity) => {
          const cls = entity.properties.Class._value;
          entity.polygon.material = Config.setVillageColor(cls);
        });
      } else if (id == "potential_isolated") {
        dataSrcObj[id].entities.values.forEach((entity) => {
          const cls = entity.properties.Class._value;
          entity.polygon.material = Config.setPoVillageColor(cls);
        });
      } else if (id == "iida_potential_isolated") {
        dataSrcObj[id].entities.values.forEach((entity) => {
          const cls = entity.properties.Class._value;
          entity.polygon.material = Config.setPoVillageColor(cls);
        });
      }

      if (tms) {
        viewer.imageryLayers.add(dataSrcObj[id]);
      } else {
        viewer.dataSources.add(dataSrcObj[id]);
      }
    }
    dataSrcObj[id].show = true;
  }

  function eqCheck(event, hazard = "eq", reg = "ishikawa") {
    const id = event.target.id;
    if (event.target.checked) {
      if (hazard == "eq") {
        turnOnGJSLayer(viewer, handleTMS.EQ_TMS_OBJ, id, true);
      } else if (hazard == "rain") {
        turnOnGJSLayer(viewer, handleTMS.RAIN_TMS_OBJ, id, true);
      } else if (hazard == "disaster") {
        turnOnGJSLayer(viewer, GJS_DISASTER_2024_LAYER, id);
      } else if (hazard == "po_disaster") {
        turnOnGJSLayer(viewer, po_disaster_layer[reg], id);
      } else if (hazard == "general") {
        turnOnGJSLayer(viewer, generalInfor_layer[reg], id);
      }
    } else {
      if (hazard == "eq") {
        handleTMS.EQ_TMS_OBJ[id].show = false;
      } else if (hazard == "rain") {
        handleTMS.RAIN_TMS_OBJ[id].show = false;
      } else if (hazard == "disaster") {
        GJS_DISASTER_2024_LAYER[id].show = false;
      } else if (hazard == "po_disaster") {
        po_disaster_layer[reg][id].show = false;
      } else if (hazard == "general") {
        generalInfor_layer[reg][id].show = false;
      }
    }
  }
  window.eqCheck = eqCheck;

  const ishikawa_all_layers = [
    GJS_DISASTER_2024_LAYER,
    GJS_POTENTIAL_DISASTER_LAYER,
    GJS_GENERAL_INFOR_LAYER,
    handleTMS.EQ_TMS_OBJ,
    handleTMS.RAIN_TMS_OBJ,
  ];

  const iida_all_layers = [
    IIDA_GJS_POTENTIAL_DISASTER_LAYER,
    IIDA_GJS_GENERAL_INFOR_LAYER,
  ];

  const regionSelect = document.getElementById("regionSelect");
  regionSelect.addEventListener("change", function (event) {
    const selectedValue = event.target.value; // Get the selected value
    console.log("Selected Region:", selectedValue);

    if (selectedValue == "iida") {
      ishikawa_all_layers.forEach((obj) => {
        const events = Object.keys(obj);
        events.forEach((key) => {
          obj[key].show = false;
        });
      });
      viewer.camera.flyTo({
        destination: zoom_iida,
      });
      handleGeoJson.handleGeoJsonLayer(
        viewer,
        IIDA_GJS_POTENTIAL_DISASTER_LAYER,
        "iida_potentialSelectAll"
      );
      handleGeoJson.handleGeoJsonLayer(
        viewer,
        IIDA_GJS_GENERAL_INFOR_LAYER,
        "iida_generalSelectAll"
      );
    } else if (selectedValue == "ishikawa") {
      iida_all_layers.forEach((obj) => {
        const events = Object.keys(obj);
        events.forEach((key) => {
          obj[key].show = false;
        });
      });
      viewer.camera.flyTo({
        destination: zoom_ishikawa,
      });
      // Add Earthquake TMS
      handleTMS.handleTMS(viewer, handleTMS.EQ_TMS_OBJ, "eqSelectAll");
      // Add Heavy Rain TMS
      handleTMS.handleTMS(viewer, handleTMS.RAIN_TMS_OBJ, "rainSelectAll");
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
    }
  });
} catch (error) {
  console.error("Error fetching data:", error);
} finally {
  // Hide the loading screen and zoom to ishikawa first
  hideLoading();
  viewer.camera.flyTo({
    destination: zoom_ishikawa,
  });
  viewer.scene.frameState.creditDisplay.container.style.bottom = "40px";
}
