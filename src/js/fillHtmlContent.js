const generalInforData = [
  {
    label: "すべてのレイヤーを選択",
    id: "generalSelectAll",
    name: "classification",
    onchange: null, // No onchange for this checkbox
  },
  {
    label: "市役所",
    id: "cityHall",
    name: "classification",
    onchange: "eqCheck(event, 'general')",
  },
  {
    label: "石川県境",
    id: "boundary",
    name: "classification",
    onchange: "eqCheck(event, 'general')",
  },
  {
    label: "人口",
    id: "population",
    name: "classification",
    onchange: "eqCheck(event, 'general')",
  },
  {
    label: "Damaged road by EQ - Drone",
    id: "eq_road_drone",
    name: "classification",
    onchange: "eqCheck(event, 'general')",
  },
];
const potentialData = [
  {
    label: "すべてのレイヤーを選択",
    id: "potentialSelectAll",
    name: "classification",
    onchange: null, // No onchange handler
  },
  {
    label: "Potential isolated villages",
    id: "potential_isolated",
    name: "classification",
    onchange: "eqCheck(event, 'po_disaster')",
  },
  {
    label: "損傷の可能性道路",
    id: "potential_damaged_road",
    name: "classification",
    onchange: "eqCheck(event, 'po_disaster')",
  },
  {
    label: "土砂崩れの可能性",
    id: "potential_landslide",
    name: "classification",
    onchange: "eqCheck(event, 'po_disaster')",
  },
];

const generalInforDataIida = [
  {
    label: "すべてのレイヤーを選択",
    id: "iida_generalSelectAll",
    name: "classification",
    onchange: null, // No onchange for this checkbox
  },
  {
    label: "市役所",
    id: "iida_cityHall",
    name: "classification",
    onchange: "eqCheck(event, 'general', 'iida')",
  },
  {
    label: "石川県境",
    id: "iida_boundary",
    name: "classification",
    onchange: "eqCheck(event, 'general', 'iida')",
  },
];
const potentialDataIida = [
  {
    label: "すべてのレイヤーを選択",
    id: "iida_potentialSelectAll",
    name: "classification",
    onchange: null, // No onchange handler
  },
  {
    label: "Potential isolated villages",
    id: "iida_potential_isolated",
    name: "classification",
    onchange: "eqCheck(event, 'po_disaster', 'iida')",
  },
  {
    label: "損傷の可能性道路",
    id: "iida_potential_damaged_road",
    name: "classification",
    onchange: "eqCheck(event, 'po_disaster', 'iida')",
  },
  {
    label: "土砂崩れの可能性",
    id: "iida_potential_landslide",
    name: "classification",
    onchange: "eqCheck(event, 'po_disaster', 'iida')",
  },
];

const disasterData = [
  {
    label: "すべてのレイヤーを選択",
    id: "notoDisasterSelectAll",
    name: "classification",
    onchange: null,
  },
  {
    label: "Isolated villages",
    id: "isolated_2024",
    name: "classification",
    onchange: "eqCheck(event, 'disaster')",
  },
  {
    label: "損傷した道路",
    id: "DRoad_2024",
    name: "classification",
    onchange: "eqCheck(event, 'disaster')",
  },
  {
    label: "大雨 (2024/9)",
    id: "heavyRain",
    name: "classification",
    onchange: "eqCheck(event, 'disaster')",
  },
  {
    label: "地震 能登半島 (2024/01/10-22)",
    id: "noto_eq",
    name: "classification",
    onchange: "eqCheck(event, 'disaster')",
  },
  {
    label: "津波 能登半島 (2024/01/10-18)",
    id: "noto_tsunami",
    name: "classification",
    onchange: "eqCheck(event, 'disaster')",
  },
];

const earthQuakeData = [
  {
    label: "すべてのレイヤーを選択",
    id: "eqSelectAll",
    name: "classification",
    switch: true,
    onchange: null,
  },
  {
    label: "能登地区 (2024, April 05-26)",
    id: "20240102noto_0405_0426do",
    name: "classification",
    switch: true,
    onchange: "eqCheck(event)",
  },
  {
    label: "輪島西地区 (2024/01/17)",
    id: "20240102noto_wazimanishi_0117do",
    name: "classification",
    switch: true,
    onchange: "eqCheck(event)",
  },
  {
    label: "穴水地区 (2024/01/17)",
    id: "20240102noto_anamizu_0117do",
    name: "classification",
    switch: true,
    onchange: "eqCheck(event)",
  },
  {
    label: "七尾地区 (2024/01/17)",
    id: "20240102noto_nanao_0117do",
    name: "classification",
    switch: true,
    onchange: "eqCheck(event)",
  },
  {
    label: "珠洲地区 (2024/01/14)",
    id: "20240102noto_suzu_0114do",
    name: "classification",
    switch: true,
    onchange: "eqCheck(event)",
  },
  {
    label: "輪島東地区 (2024/01/14)",
    id: "20240102noto_wazimahigashi_0114do",
    name: "classification",
    switch: true,
    onchange: "eqCheck(event)",
  },
  {
    label: "穴水地区 (2024/01/14)",
    id: "20240102noto_anamizu_0114do",
    name: "classification",
    switch: true,
    onchange: "eqCheck(event)",
  },
  {
    label: "輪島中地区 (2024/01/11)",
    id: "20240102noto_wazimanaka_0111do",
    name: "classification",
    switch: true,
    onchange: "eqCheck(event)",
  },
  {
    label: "輪島西地区 (2024/01/11)",
    id: "20240102noto_wazimanishi_0111do",
    name: "classification",
    switch: true,
    onchange: "eqCheck(event)",
  },
  {
    label: "穴水地区 (2024/01/11)",
    id: "20240102noto_anamizu_0111do",
    name: "classification",
    switch: true,
    onchange: "eqCheck(event)",
  },
  {
    label: "珠洲地区 (2024/01/05)",
    id: "20240102_noto_suzu_0105do",
    name: "classification",
    switch: true,
    onchange: "eqCheck(event)",
  },
  {
    label: "輪島中地区 (2024/01/05)",
    id: "20240102_noto_wazimanaka_0105do",
    name: "classification",
    switch: true,
    onchange: "eqCheck(event)",
  },
  {
    label: "穴水地区 (2024/01/05)",
    id: "20240102_noto_anamizu_0105do",
    name: "classification",
    switch: true,
    onchange: "eqCheck(event)",
  },
  {
    label: "七尾地区 (2024/01/05)",
    id: "20240102_noto_nanao_0105do",
    name: "classification",
    switch: true,
    onchange: "eqCheck(event)",
  },
  {
    label: "珠洲地区 (2024/01/02)",
    id: "20240102noto_suzu_0102do",
    name: "classification",
    switch: true,
    onchange: "eqCheck(event)",
  },
  {
    label: "輪島中地区 (2024/01/02)",
    id: "20240102noto_wazimanaka_0102do",
    name: "classification",
    switch: true,
    onchange: "eqCheck(event)",
  },
  {
    label: "輪島東地区 (2024/01/02)",
    id: "20240102noto_wazimahigashi_0102do",
    name: "classification",
    switch: true,
    onchange: "eqCheck(event)",
  },
];

const rainData = [
  {
    id: "rainSelectAll",
    label: "すべてのレイヤーを選択",
    isChecked: false,
    onChange: null,
  },
  {
    id: "20240923rain_wajimatobu_0924do_sokuho",
    label: "輪島東部地区 (2024/09/24)",
    isChecked: false,
    onChange: "eqCheck(event, 'rain')",
  },
  {
    id: "20240923rain_wajimaseibu_0924do_sokuho",
    label: "輪島西部地区 (2024/09/24)",
    isChecked: false,
    onChange: "eqCheck(event, 'rain')",
  },
  {
    id: "20240923rain_wajima_0923do_sokuho",
    label: "輪島地区 (2024/09/23)",
    isChecked: false,
    onChange: "eqCheck(event, 'rain')",
  },
];

function populateGeneralInforList(data, ulID) {
  const dynamicList = document.getElementById(ulID);
  dynamicList.innerHTML = ""; // Clear existing content
  if (data.length > 0) {
    data.forEach((item) => {
      // Create list item
      const li = document.createElement("li");

      // Create row container
      const row = document.createElement("div");
      row.className = "row align-items-center";

      // Create label column
      const labelCol = document.createElement("div");
      labelCol.className = "col-9 text-light align-items-center";
      labelCol.textContent = item.label;

      // Create checkbox column
      const checkboxCol = document.createElement("div");
      checkboxCol.className = "col-3 text-light";

      // Create switch container
      const formSwitch = document.createElement("div");
      formSwitch.className = "form-switch";

      // Create checkbox
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "form-check-input";
      checkbox.role = "switch";
      checkbox.name = item.name;
      checkbox.id = item.id;

      // Add onchange event if available
      if (item.onchange) {
        checkbox.setAttribute("onchange", item.onchange);
      }

      // Create label for checkbox
      const checkboxLabel = document.createElement("label");
      checkboxLabel.className = "form-check-label ms-3";
      checkboxLabel.htmlFor = item.id;

      // Append elements
      formSwitch.appendChild(checkbox);
      formSwitch.appendChild(checkboxLabel);
      checkboxCol.appendChild(formSwitch);
      row.appendChild(labelCol);
      row.appendChild(checkboxCol);
      li.appendChild(row);
      dynamicList.appendChild(li);
    });
  } else {
    dynamicList.innerHTML = "No data";
  }
}

// Populate the list with the data
populateGeneralInforList(generalInforData, "generalInforUL");
populateGeneralInforList(potentialData, "potentialDisasterLayersUL");
populateGeneralInforList(disasterData, "allDisasterLayersUL");
populateGeneralInforList(earthQuakeData, "eqlayersUL");
populateGeneralInforList(rainData, "rainlayersUL");

// on change handling
const regionSelect = document.getElementById("regionSelect");

regionSelect.addEventListener("change", function (event) {
  const selectedValue = event.target.value; // Get the selected value
  console.log("Selected Region:", selectedValue);

  if (selectedValue == "ishikawa") {
    populateGeneralInforList(generalInforData, "generalInforUL");
    populateGeneralInforList(potentialData, "potentialDisasterLayersUL");
    populateGeneralInforList(disasterData, "allDisasterLayersUL");
    populateGeneralInforList(earthQuakeData, "eqlayersUL");
    populateGeneralInforList(rainData, "rainlayersUL");
  } else if (selectedValue == "iida") {
    populateGeneralInforList(generalInforDataIida, "generalInforUL");
    populateGeneralInforList(potentialDataIida, "potentialDisasterLayersUL");
    populateGeneralInforList({}, "allDisasterLayersUL");
    populateGeneralInforList({}, "eqlayersUL");
    populateGeneralInforList({}, "rainlayersUL");
  }
});
