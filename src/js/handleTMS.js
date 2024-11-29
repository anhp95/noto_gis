import { UrlTemplateImageryProvider, ImageryLayer } from "cesium";

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

export const EQ_TMS_OBJ = {};
export const RAIN_TMS_OBJ = {};

EQ_TMS.forEach((obj) => {
  const layerProvider = new UrlTemplateImageryProvider({
    url: obj.tms,
  });
  EQ_TMS_OBJ[obj.tms.split("/")[4]] = new ImageryLayer(layerProvider);
});

RAIN_TMS.forEach((obj) => {
  const layerProvider = new UrlTemplateImageryProvider({
    url: obj.tms,
  });
  RAIN_TMS_OBJ[obj.tms.split("/")[4]] = new ImageryLayer(layerProvider);
});

export function handleTMS(viewer, tmsObj, selectAllID) {
  const events = Object.keys(tmsObj);

  document.getElementById(selectAllID).addEventListener("change", (event) => {
    if (event.target.checked) {
      events.forEach((key) => {
        const checkbox = document.getElementById(key);

        if (!viewer.imageryLayers.contains(tmsObj[key])) {
          viewer.imageryLayers.add(tmsObj[key]);
        }

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
