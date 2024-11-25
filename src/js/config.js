import { Color } from "cesium";

export const ionToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhZDM0NTQ2NC0zODQ2LTRmMmYtODI5Yi1hMGQxODgxMzc5M2IiLCJpZCI6NzU4LCJpYXQiOjE2MDkzMDAyMDJ9.gLTs2dRIDfU8ZAuA0qIAAxrO8UzKPjHad9Gc1JUmx18";

export const QUAKE_COLOR = Color.GOLD;
export const RAIN_COLOR = Color.TURQUOISE;
export const TSUNAMI_COLOR = Color.FUCHSIA;
export const ROAD_COLOR = Color.RED;
export const PO_ROAD_COLOR = Color.CORNFLOWERBLUE;
export const PO_QUAKE_COLOR = Color.DEEPPINK;
export const BOUND_COLOR = Color.BLACK;
export const HALL_COLOR = Color.CHARTREUSE;

export const LIMITED_COLOR = Color.BLUE;
export const ISOLATED_COLOR = Color.ORANGE;

export const colorFunction = (val) => {
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
