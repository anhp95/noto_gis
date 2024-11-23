import {
  Color,
  GeoJsonDataSource,
  UrlTemplateImageryProvider,
  ImageryLayer,
} from "cesium";

const ionToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhZDM0NTQ2NC0zODQ2LTRmMmYtODI5Yi1hMGQxODgxMzc5M2IiLCJpZCI6NzU4LCJpYXQiOjE2MDkzMDAyMDJ9.gLTs2dRIDfU8ZAuA0qIAAxrO8UzKPjHad9Gc1JUmx18";

const EQ_COLOR = Color.GOLD;
const HR_COLOR = Color.TURQUOISE;
const RD_COLOR = Color.RED;
const BOUND_COLR = Color.BLACK;
const HALL_COLOR = Color.CHARTREUSE;

const ISHIKAWA_BOUNDARY = "./data/boundary/boundary.geojson";
const CITY_HALL_GEOJSON = "./data/cityhall/cityhall.geojson";

const EQ_TMS = [
  {
    place: "Noto",
    time: "2024, April 05-26",
    tms: "https://cyberjapandata.gsi.go.jp/xyz/20240102noto_0405_0426do/{z}/{x}/{y}.png",
  },
  {
    place: "Wazimanishi",
    time: "2024/01/17",
    tms: "https://cyberjapandata.gsi.go.jp/xyz/20240102noto_wazimanishi_0117do/{z}/{x}/{y}.png",
  },
  {
    place: "Anamizu",
    time: "2024/01/17",
    tms: "https://cyberjapandata.gsi.go.jp/xyz/20240102noto_anamizu_0117do/{z}/{x}/{y}.png",
  },
  {
    place: "Nanao",
    time: "2024/01/17",
    tms: "https://cyberjapandata.gsi.go.jp/xyz/20240102noto_nanao_0117do/{z}/{x}/{y}.png",
  },
  {
    place: "Suzu",
    time: "2024/01/14",
    tms: "https://cyberjapandata.gsi.go.jp/xyz/20240102noto_suzu_0114do/{z}/{x}/{y}.png",
  },
  {
    place: "Wazimahigashi",
    time: "2024/01/14",
    tms: "https://cyberjapandata.gsi.go.jp/xyz/20240102noto_wazimahigashi_0114do/{z}/{x}/{y}.png",
  },
  {
    place: "Anamizu",
    time: "2024/01/14",
    tms: "https://cyberjapandata.gsi.go.jp/xyz/20240102noto_anamizu_0114do/{z}/{x}/{y}.png",
  },
  {
    place: "Wazimanaka",
    time: "2024/01/11",
    tms: "https://cyberjapandata.gsi.go.jp/xyz/20240102noto_wazimanaka_0111do/{z}/{x}/{y}.png",
  },
  {
    place: "Wazimanishi",
    time: "2024/01/11",
    tms: "https://cyberjapandata.gsi.go.jp/xyz/20240102noto_wazimanishi_0111do/{z}/{x}/{y}.png",
  },
  {
    place: "Anamizu",
    time: "2024/01/11",
    tms: "https://cyberjapandata.gsi.go.jp/xyz/20240102noto_anamizu_0111do/{z}/{x}/{y}.png",
  },
  {
    place: "Suzu",
    time: "2024/01/05",
    tms: "https://cyberjapandata.gsi.go.jp/xyz/20240102_noto_suzu_0105do/{z}/{x}/{y}.png",
  },
  {
    place: "Wazimanaka",
    time: "2024/01/05",
    tms: "https://cyberjapandata.gsi.go.jp/xyz/20240102_noto_wazimanaka_0105do/{z}/{x}/{y}.png",
  },
  {
    place: "Anamizu",
    time: "2024/01/05",
    tms: "https://cyberjapandata.gsi.go.jp/xyz/20240102_noto_anamizu_0105do/{z}/{x}/{y}.png",
  },
  {
    place: "Nanao",
    time: "2024/01/05",
    tms: "https://cyberjapandata.gsi.go.jp/xyz/20240102_noto_nanao_0105do/{z}/{x}/{y}.png",
  },
  {
    place: "Suzu",
    time: "2024/01/02",
    tms: "https://cyberjapandata.gsi.go.jp/xyz/20240102noto_suzu_0102do/{z}/{x}/{y}.png",
  },
  {
    place: "Wazimanaka",
    time: "2024/01/02",
    tms: "https://cyberjapandata.gsi.go.jp/xyz/20240102noto_wazimanaka_0102do/{z}/{x}/{y}.png",
  },
  {
    place: "Wazimahigashi",
    time: "2024/01/02",
    tms: "https://cyberjapandata.gsi.go.jp/xyz/20240102noto_wazimahigashi_0102do/{z}/{x}/{y}.png",
  },
];
const RAIN_TMS = [
  {
    place: "wajimatobu",
    time: "2024/09/24",
    tms: "https://cyberjapandata.gsi.go.jp/xyz/20240923rain_wajimatobu_0924do_sokuho/{z}/{x}/{y}.png",
  },
  {
    place: "wajimaseibu",
    time: "2024/09/24",
    tms: "https://cyberjapandata.gsi.go.jp/xyz/20240923rain_wajimaseibu_0924do_sokuho/{z}/{x}/{y}.png",
  },
  {
    place: "wajima",
    time: "2024/09/23",
    tms: "https://cyberjapandata.gsi.go.jp/xyz/20240923rain_wajima_0923do_sokuho/{z}/{x}/{y}.png",
  },
];
const TSUNAMI_TMS = [
  {
    place: "suzu",
    time: "2024/01/02",
    tms: "",
  },
  {
    place: "wajima",
    time: "2024/01/02",
    tms: "",
  },
  {
    place: "anamizu",
    time: "2024/01/02",
    tms: "",
  },
  {
    place: "nanao",
    time: "2024, Jan 14-17",
    tms: "",
  },
];

const EQ_TMS_OBJ = {};
const RAIN_TMS_OBJ = {};

EQ_TMS.forEach((obj) => {
  const layerProvider = new UrlTemplateImageryProvider({
    url: obj.tms,
  });
  EQ_TMS_OBJ[obj.tms.split("/")[4]] = new ImageryLayer(layerProvider);
});

RAIN_TMS.forEach((obj) => {
  RAIN_TMS_OBJ[obj.tms.split("/")[4]] = obj.tms;
});

export {
  ionToken,
  EQ_COLOR,
  HR_COLOR,
  RD_COLOR,
  BOUND_COLR,
  HALL_COLOR,
  ISHIKAWA_BOUNDARY,
  CITY_HALL_GEOJSON,
  EQ_TMS_OBJ,
  RAIN_TMS_OBJ,
};
