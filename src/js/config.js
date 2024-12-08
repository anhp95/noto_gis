import { Color } from "cesium";

export const ionToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiNWMwMDEwOC0zNzMxLTRjMzktYmNjYi1hMTEyOTMyNjQ1ZjgiLCJpZCI6NzU4LCJpYXQiOjE1MjU3NzI1Mzl9.kiP25lmIFUKvME9ByQEKwgT4aDfYExBsT1sKUywaD7s";

export const QUAKE_COLOR = Color.GOLD;
export const RAIN_COLOR = Color.TURQUOISE;
export const TSUNAMI_COLOR = Color.FUCHSIA;
export const ROAD_COLOR = Color.RED;
export const PO_ROAD_COLOR = Color.CORNFLOWERBLUE;
export const PO_QUAKE_COLOR = Color.FIREBRICK;
export const BOUND_COLOR = Color.WHITE;
export const HALL_COLOR = Color.CHARTREUSE;

export const LIMITED_COLOR = Color.BLUE;
export const ISOLATED_COLOR = Color.ORANGE;

export const setPopColor = (val) => {
  if (val > 1 && val < 145) {
    return Color.fromCssColorString("#2b83ba");
  } else if (val > 145 && val < 454) {
    return Color.fromCssColorString("#abdda4");
  } else if (val > 454 && val < 935) {
    return Color.fromCssColorString("#ffffbf");
  } else if (val > 935 && val < 1537) {
    return Color.fromCssColorString("#fdae61");
  } else if (val > 1537) {
    return Color.fromCssColorString("#d7191c");
  }
};

export const setVillageColor = (val) => {
  const no_color_list = ["Normal", "No Data"];
  if (no_color_list.includes(val)) {
    return Color.WHITE.withAlpha(0.0);
  } else if (val == "Limited Isolated Village") {
    return Color.fromCssColorString("#a6611a");
  } else if (val == "Isolated Village") {
    return Color.fromCssColorString("#018571");
  }
};

export const setPoVillageColor = (val) => {
  const no_color_list = ["Normal", "No Data"];
  if (no_color_list.includes(val)) {
    return Color.WHITE.withAlpha(0.0);
  } else if (val == "Limited Isolated Village") {
    return Color.fromCssColorString("#dfc27d");
  } else if (val == "Isolated Village") {
    return Color.fromCssColorString("#80cdc1");
  }
};
