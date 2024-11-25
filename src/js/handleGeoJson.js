import { GeoJsonDataSource } from "cesium";
import * as Config from "./config.js";

async function loadGeoJson(path, color) {
  return await GeoJsonDataSource.load(path, {
    stroke: color,
    fill: color,
  });
}

const boundary_path = "./data/boundary/boundary.geojson";
const cityHall_path = "./data/cityhall/cityhall.geojson";
const pop_path = "./data/pop/pop_2020.geojson";

const damaged_road_2024_path = "./data/damaged_road/noto_damaged_road.geojson";
const heavyrain_path = "./data/heavyrain/heavyrain.geojson";

const limited_isolated_2024_path =
  "./data/isolated_village/limited_isolated_2024.geojson";
const isolated_2024_path = "./data/isolated_village/isolated_2024.geojson";

const po_limited_isolated_path =
  "./data/isolated_village/po_limited_isolated.geojson";
const po_isolated_path = "./data/isolated_village/po_isolated.geojson";

const potential_damaged_road_path =
  "./data/damaged_road/potential_damaged_road.geojson";
const potential_landslide_path =
  "./data/earthquake/potential_landslide.geojson";

const eq_path = {
  hokai_20240122_wajimaWEST:
    "./data/earthquake/hokai_20240122_wajimaWEST.geojson",
  hokai_all_20240115_wajimaCENTRAL_Re2:
    "./data/earthquake/hokai_all_20240115_wajimaCENTRAL_Re2.geojson",
  hokai_all_20240118_anamizu:
    "./data/earthquake/hokai_all_20240118_anamizu.geojson",
  hokai_all_20240118_nanao:
    "./data/earthquake/hokai_all_20240118_nanao.geojson",
};

const tsunami_path = {
  tsunami_area_anamizu_20240118:
    "./data/tsunami/shinsui-tsunami-area_anamizu_20240118.geojson",
  tsunami_area_nanao_20240118:
    "./data/tsunami/shinsui-tsunami-area_nanao_20240118.geojson",
  tsunami_area_suzu_wajimaEAST_Re2_20240110:
    "./data/tsunami/shinsui-tsunami-area_suzu-wajimaEAST-Re2_20240110.geojson",
  tsunami_area_wajimaWEST_20240112:
    "./data/tsunami/shinsui-tsunami-area_wajimaWEST_20240112.geojson",
};

export const getGeneralInfor = async () => {
  const geojson_layer = {
    cityHall: await GeoJsonDataSource.load(cityHall_path, {
      markerColor: Config.HALL_COLOR,
      markerSize: 45,
      markerSymbol: "city",
    }),

    boundary: await GeoJsonDataSource.load(boundary_path, {
      strokeWidth: 2,
      stroke: Config.BOUND_COLOR,
    }),
  };
  return geojson_layer;
};

export const getPoDisaster2024 = async () => {
  const geojson_layer = {
    potential_limited: await GeoJsonDataSource.load(po_limited_isolated_path, {
      stroke: Config.LIMITED_COLOR,
      fill: Config.LIMITED_COLOR,
    }),
    potential_isolated: await GeoJsonDataSource.load(po_isolated_path, {
      stroke: Config.ISOLATED_COLOR,
      fill: Config.ISOLATED_COLOR,
    }),
    potential_landslide: await GeoJsonDataSource.load(
      potential_landslide_path,
      {
        stroke: Config.PO_QUAKE_COLOR,
        fill: Config.PO_QUAKE_COLOR,
      }
    ),
    potential_damaged_road: await GeoJsonDataSource.load(
      potential_damaged_road_path,
      {
        stroke: Config.PO_ROAD_COLOR,
        fill: Config.PO_ROAD_COLOR,
      }
    ),
  };

  return geojson_layer;
};

export const getDisaster2024 = async () => {
  const geojson_layer = {};
  (geojson_layer["limited_2024"] = await GeoJsonDataSource.load(
    limited_isolated_2024_path,
    {
      stroke: Config.ROAD_COLOR,
      fill: Config.LIMITED_COLOR,
    }
  )),
    (geojson_layer["isolated_2024"] = await GeoJsonDataSource.load(
      isolated_2024_path,
      {
        stroke: Config.ROAD_COLOR,
        fill: Config.ISOLATED_COLOR,
      }
    )),
    (geojson_layer["heavyRain"] = await GeoJsonDataSource.load(heavyrain_path, {
      stroke: Config.RAIN_COLOR,
      fill: Config.RAIN_COLOR,
    }));

  geojson_layer["hokai_20240122_wajimaWEST"] = await GeoJsonDataSource.load(
    eq_path["hokai_20240122_wajimaWEST"],
    {
      stroke: Config.QUAKE_COLOR,
      fill: Config.QUAKE_COLOR,
    }
  );

  geojson_layer["hokai_all_20240115_wajimaCENTRAL_Re2"] =
    await GeoJsonDataSource.load(
      eq_path["hokai_all_20240115_wajimaCENTRAL_Re2"],
      {
        stroke: Config.QUAKE_COLOR,
        fill: Config.QUAKE_COLOR,
      }
    );

  geojson_layer["hokai_all_20240118_anamizu"] = await GeoJsonDataSource.load(
    eq_path["hokai_all_20240118_anamizu"],
    {
      stroke: Config.QUAKE_COLOR,
      fill: Config.QUAKE_COLOR,
    }
  );

  geojson_layer["hokai_all_20240118_nanao"] = await GeoJsonDataSource.load(
    eq_path["hokai_all_20240118_nanao"],
    {
      stroke: Config.QUAKE_COLOR,
      fill: Config.QUAKE_COLOR,
    }
  );

  geojson_layer["tsunami_area_anamizu_20240118"] = await GeoJsonDataSource.load(
    tsunami_path["tsunami_area_anamizu_20240118"],
    {
      stroke: Config.TSUNAMI_COLOR,
      fill: Config.TSUNAMI_COLOR,
    }
  );

  geojson_layer["tsunami_area_nanao_20240118"] = await GeoJsonDataSource.load(
    tsunami_path["tsunami_area_nanao_20240118"],
    {
      stroke: Config.TSUNAMI_COLOR,
      fill: Config.TSUNAMI_COLOR,
    }
  );

  geojson_layer["tsunami_area_suzu_wajimaEAST_Re2_20240110"] =
    await GeoJsonDataSource.load(
      tsunami_path["tsunami_area_suzu_wajimaEAST_Re2_20240110"],
      {
        stroke: Config.TSUNAMI_COLOR,
        fill: Config.TSUNAMI_COLOR,
      }
    );

  geojson_layer["tsunami_area_wajimaWEST_20240112"] =
    await GeoJsonDataSource.load(
      tsunami_path["tsunami_area_wajimaWEST_20240112"],
      {
        stroke: Config.TSUNAMI_COLOR,
        fill: Config.TSUNAMI_COLOR,
      }
    );
  geojson_layer["DRoad_2024"] = await GeoJsonDataSource.load(
    damaged_road_2024_path,
    {
      stroke: Config.ROAD_COLOR,
      fill: Config.ROAD_COLOR,
    }
  );

  return geojson_layer;
};

export function handleGeoJsonLayer(tmsObj, selectAllID) {
  const events = Object.keys(tmsObj);

  document.getElementById(selectAllID).addEventListener("change", (event) => {
    if (event.target.checked) {
      events.forEach((key) => {
        const checkbox = document.getElementById(key);
        checkbox.checked = true;
        tmsObj[key].show = true;
      });
    } else {
      events.forEach((key) => {
        const checkbox = document.getElementById(key);
        checkbox.checked = false;
        tmsObj[key].show = false;
      });
    }
  });
}
