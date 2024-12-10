import * as Config from "./config.js";
import {
  GeoJsonDataSource,
  Color,
  IonResource,
  Ion,
  HeightReference,
  JulianDate,
  Math,
  Cartesian3,
  PointGraphics,
  LabelGraphics,
} from "cesium";

Ion.defaultAccessToken = Config.ionToken;

const boundary_path = "./data/boundary/boundary.geojson";
const cityHall_path = "./data/cityhall/cityhall.geojson";
const pop_path = "./data/pop/pop_2020.geojson";

const damaged_road_2024_path = "./data/damaged_road/noto_damaged_road.geojson";
const heavyrain_path = "./data/heavyrain/heavyrain.geojson";

const isolated_2024_path = "./data/isolated_village/affected_areas.geojson";
// const isolated_2024_ion = await IonResource.fromAssetId(2911721);

const po_isolated_path = "./data/isolated_village/po_affected_areas.geojson";

const potential_damaged_road_path =
  "./data/damaged_road/potential_damaged_road.geojson";
const potential_landslide_path =
  "./data/earthquake/potential_landslide.geojson";

const eq_road_drone_path =
  "../data/mlit_road_data/geojson/damage_situation_aerial_photography.geojson";

const eq_path = {
  hokai_20240122_wajimaWEST:
    "./data/earthquake/hokai_20240122_wajimaWEST.geojson",
  hokai_all_20240115_wajimaCENTRAL_Re2:
    "./data/earthquake/hokai_all_20240115_wajimaCENTRAL_Re2.geojson",
  hokai_all_20240118_anamizu:
    "./data/earthquake/hokai_all_20240118_anamizu.geojson",
  hokai_all_20240118_nanao:
    "./data/earthquake/hokai_all_20240118_nanao.geojson",
  noto_eq: "./data/earthquake/earthquake_2024010_22.geojson",
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
  noto_tsunami: "./data/tsunami/tsunami_20240110_18.geojson",
};

const boundary_iida_path = "./data/iida/boundary.geojson";
const cityHall_iida_path = "./data/iida/cityhall.geojson";
const po_iida_dmg_road_path = "./data/iida/po_dmg_road.geojson";
const po_iida_isolated_village_path = "./data/iida/po_isolated_village.geojson";
const po_iida_landslide_path = "./data/iida/po_landslide_w84.geojson";

export const getGeneralInfor = async () => {
  const geojson_layer = {
    cityHall: await GeoJsonDataSource.load(cityHall_path, {
      markerSize: 30,
      markerSymbol: "city",
      markerColor: Config.CITYGHALL_COLOR,
    }),

    boundary: await GeoJsonDataSource.load(boundary_path, {
      strokeWidth: 2,
      stroke: Config.BOUND_COLOR,
    }),
    eq_road_drone: await GeoJsonDataSource.load(eq_road_drone_path, {
      markerSize: 30,
      markerSymbol: "roadblock",
      markerColor: Config.DRONEIMG_COLOR,
    }),
    population: await GeoJsonDataSource.load(pop_path),
  };
  return geojson_layer;
};

export const getGeneralInforIida = async () => {
  const geojson_layer = {
    iida_cityHall: await GeoJsonDataSource.load(cityHall_iida_path, {
      markerSize: 30,
      markerSymbol: "city",
      markerColor: Config.CITYGHALL_COLOR,
    }),

    iida_boundary: await GeoJsonDataSource.load(boundary_iida_path, {
      strokeWidth: 2,
      stroke: Config.BOUND_COLOR,
    }),
  };
  return geojson_layer;
};

export const getPoDisaster2024Iida = async () => {
  const geojson_layer = {
    iida_potential_isolated: await GeoJsonDataSource.load(
      po_iida_isolated_village_path,
      {
        stroke: Config.ISOLATED_COLOR,
        fill: Config.ISOLATED_COLOR,
      }
    ),
    iida_potential_landslide: await GeoJsonDataSource.load(
      po_iida_landslide_path,
      {
        stroke: Config.PO_QUAKE_COLOR,
        fill: Config.PO_QUAKE_COLOR,
      }
    ),
    iida_potential_damaged_road: await GeoJsonDataSource.load(
      po_iida_dmg_road_path,
      {
        stroke: Config.PO_ROAD_COLOR,
        fill: Config.PO_ROAD_COLOR,
      }
    ),
  };

  return geojson_layer;
};

export const getPoDisaster2024 = async () => {
  const geojson_layer = {
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
  (geojson_layer["isolated_2024"] = await GeoJsonDataSource.load(
    isolated_2024_path,
    {
      stroke: Config.ROAD_COLOR,
      fill: Config.ISOLATED_COLOR,
    }
  )),
    // (geojson_layer["isolated_2024"] = await GeoJsonDataSource.load(
    //   isolated_2024_ion
    // )),
    (geojson_layer["heavyRain"] = await GeoJsonDataSource.load(heavyrain_path, {
      stroke: Config.RAIN_COLOR,
      fill: Config.RAIN_COLOR,
    }));

  geojson_layer["noto_eq"] = await GeoJsonDataSource.load(eq_path["noto_eq"], {
    stroke: Config.QUAKE_COLOR,
    fill: Config.QUAKE_COLOR,
  });

  geojson_layer["noto_tsunami"] = await GeoJsonDataSource.load(
    tsunami_path["noto_tsunami"],
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

function popLayerSetUp(obj) {
  obj.entities.values.forEach((entity) => {
    const pop_count = entity.properties.Population._value;
    entity.polygon.material = Config.setPopColor(pop_count);
  });
}

function droneImgLayerSetUp(obj) {
  const entities = obj.entities.values;
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
}

function villageLayerSetUp(obj) {
  obj.entities.values.forEach((entity) => {
    const cls = entity.properties.Class._value;
    entity.polygon.material = Config.setVillageColor(cls);
  });
}

function poVillageSetUp(obj) {
  obj.entities.values.forEach((entity) => {
    const cls = entity.properties.Class._value;
    entity.polygon.material = Config.setPoVillageColor(cls);
  });
}

export function handleGeoJsonLayer(viewer, tmsObj, selectAllID) {
  const events = Object.keys(tmsObj);
  if (events.length > 0) {
    document.getElementById(selectAllID).addEventListener("change", (event) => {
      if (event.target.checked) {
        events.forEach((key) => {
          if (!viewer.dataSources.contains(tmsObj[key])) {
            if (key == "population") {
              tmsObj[key].entities.values.forEach((entity) => {
                const pop_count = entity.properties.Population._value;
                entity.polygon.material = Config.setPopColor(pop_count);
              });
            } else if (key == "eq_road_drone") {
              const entities = tmsObj[key].entities.values;
              for (const entity of entities) {
                const imageUrl = entity.properties.src?.getValue();
                const name = entity.properties.name?.getValue();
                (entity.billboard.heightReference =
                  HeightReference.CLAMP_TO_GROUND),
                  (entity.description = `
                    <div style="overflow: auto; text-align: center;">
                        <img src="${imageUrl}" 
                             alt="Image for ${name}" 
                             style="width: 800px; height: 400px; display: block;" />
                    </div>
                `);
              }
            } else if (key == "isolated_2024") {
              tmsObj[key].entities.values.forEach((entity) => {
                const cls = entity.properties.Class._value;
                entity.polygon.material = Config.setVillageColor(cls);
                // entity.polygon.height = 0;
              });
            } else if (key === "potential_isolated") {
              tmsObj[key].entities.values.forEach((entity) => {
                const cls = entity.properties.Class._value;
                entity.polygon.material = Config.setPoVillageColor(cls);
                // entity.polygon.height = 0;
              });
            } else if (key === "iida_potential_isolated") {
              tmsObj[key].entities.values.forEach((entity) => {
                const cls = entity.properties.Class._value;
                entity.polygon.material = Config.setPoVillageColor(cls);
                // entity.polygon.height = 0;
              });
            }
            viewer.dataSources.add(tmsObj[key]);
          }
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
}

// Handle individual checkbox
export function turnOnGJSLayer(viewer, dataSrcObj, id) {
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
    viewer.dataSources.add(dataSrcObj[id]);
  }
  dataSrcObj[id].show = true;
}
