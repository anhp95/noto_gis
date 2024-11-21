import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import "./css/main.css";
// // import "cesium/Build/Cesium/Widgets/widgets.css";

import {
  Viewer,
  Terrain,
  createOsmBuildingsAsync,
  Cartesian3,
  Math,
  Ion,
  Cesium3DTileset,
  Cesium3DTileStyle,
  Color,
  GeoJsonDataSource,
  UrlTemplateImageryProvider,
} from "cesium";
import "cesium/Widgets/widgets.css";
import "../src/css/main.css";
import {
  ionToken,
  EQ_COLOR,
  HR_COLOR,
  RD_COLOR,
  BOUND_COLR,
  HALL_COLOR,
} from "./js/config.js";

Ion.defaultAccessToken = ionToken;

const viewer = new Viewer("cesiumContainer", {
  terrain: Terrain.fromWorldTerrain({
    requestWaterMask: true,
    requestVertexNormals: true,
  }),
});

const custom = new UrlTemplateImageryProvider({
  url: "https://cyberjapandata.gsi.go.jp/xyz/20240923rain_wajimatobu_0924do_sokuho/{z}/{x}/{y}.png",
  customTags: {
    Time: function (imageryProvider, x, y, level) {
      return "20171231";
    },
  },
});

const custom2 = new UrlTemplateImageryProvider({
  url: "https://cyberjapandata.gsi.go.jp/xyz/20240923rain_wajimaseibu_0924do_sokuho/{z}/{x}/{y}.png",
  customTags: {
    Time: function (imageryProvider, x, y, level) {
      return "20171231";
    },
  },
});

const custom3 = new UrlTemplateImageryProvider({
  url: "https://cyberjapandata.gsi.go.jp/xyz/20240923rain_wajimaseibu_0924do_sokuho/{z}/{x}/{y}.png",
  customTags: {
    Time: function (imageryProvider, x, y, level) {
      return "20171231";
    },
  },
});

viewer.imageryLayers.addImageryProvider(custom);
viewer.imageryLayers.addImageryProvider(custom2);
GeoJsonDataSource.clampToGround = true;
viewer.scene.globe.depthTestAgainstTerrain = true;
const eq1 = GeoJsonDataSource.load(
  "./data/earthquake/hokai_20240122_wajimaWEST.geojson",
  {
    stroke: EQ_COLOR,
    fill: EQ_COLOR,
  }
);
const eq2 = GeoJsonDataSource.load(
  "./data/earthquake/hokai_all_20240106_suzu-wajimaEAST.geojson",
  {
    stroke: EQ_COLOR,
    fill: EQ_COLOR,
  }
);
const eq3 = GeoJsonDataSource.load(
  "./data/earthquake/hokai_all_20240115_wajimaCENTRAL_Re2.geojson",
  {
    stroke: EQ_COLOR,
    fill: EQ_COLOR,
  }
);
const eq4 = GeoJsonDataSource.load(
  "./data/earthquake/hokai_all_20240118_anamizu.geojson",
  {
    stroke: EQ_COLOR,
    fill: EQ_COLOR,
  }
);

const eq5 = GeoJsonDataSource.load(
  "./data/earthquake/hokai_all_20240118_nanao.geojson",
  {
    stroke: EQ_COLOR,
    fill: EQ_COLOR,
  }
);

const hrain = GeoJsonDataSource.load("./data/heavyrain/heavyrain.geojson", {
  stroke: HR_COLOR,
  fill: HR_COLOR,
});

const droad = GeoJsonDataSource.load(
  "./data/damaged_road/damaged_road.geojson",
  {
    stroke: RD_COLOR,
    fill: RD_COLOR,
  }
);

const cityhall = GeoJsonDataSource.load("./data/cityhall/cityhall.geojson", {
  markerColor: HALL_COLOR,
  markerSize: 45,
  markerSymbol: "city",
});

const boundary = GeoJsonDataSource.load("./data/boundary/boundary.geojson", {
  strokeWidth: 2,
  stroke: BOUND_COLR,
});

viewer.dataSources.add(eq1);
viewer.dataSources.add(eq2);
viewer.dataSources.add(eq3);
viewer.dataSources.add(eq4);
viewer.dataSources.add(eq5);
viewer.dataSources.add(hrain);
viewer.dataSources.add(droad);
viewer.dataSources.add(cityhall);
viewer.dataSources.add(boundary);
viewer.zoomTo(cityhall);
