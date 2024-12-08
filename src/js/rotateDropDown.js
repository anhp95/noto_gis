// Rotate icon on collapse toggle
document.querySelectorAll('[data-bs-toggle="collapse"]').forEach((button) => {
  button.addEventListener("click", function () {
    const icon = this.querySelector(".dropdown-icon");
    const target = document.querySelector(this.getAttribute("data-bs-target"));

    target.addEventListener("shown.bs.collapse", () =>
      icon.classList.add("rotate")
    );
    target.addEventListener("hidden.bs.collapse", () =>
      icon.classList.remove("rotate")
    );
  });
});

export function update_legend(legends) {
  Object.keys(legends).forEach((check_id) => {
    const element = document.getElementById(check_id);
    if (element) {
      element.addEventListener("change", function () {
        const legendContainer = document.getElementById(legends[check_id]);
        if (this.checked) {
          legendContainer.classList.add("show");
        } else {
          legendContainer.classList.remove("show");
        }
      });
    }
  });
}

export function update_legend_selAll(legends, id) {
  document.getElementById(id).addEventListener("change", function () {
    const key = Object.keys(legends);
    key.forEach((key) => {
      const legendContainer = document.getElementById(legends[key]);
      if (this.checked) {
        legendContainer.classList.add("show");
      } else {
        legendContainer.classList.remove("show");
      }
    });
  });
}

export function remove_legend_when_switch(legends) {
  const key = Object.keys(legends);
  key.forEach((key) => {
    const legendContainer = document.getElementById(legends[key]);
    legendContainer.classList.remove("show");
  });
}

const legends_general_ishikawa = {
  population: "legendPop",
};

const legends_po_ishikawa = {
  potential_isolated: "legendPoVillage",
  potential_damaged_road: "legendPoDmgRoad",
  potential_landslide: "legendPoBosai",
};
const legends_affect_ishikawa = {
  isolated_2024: "legendVillage",
  DRoad_2024: "legendDmgRoad",
  heavyRain: "legendRain",
  noto_eq: "legendEarthquake",
  noto_tsunami: "lengendTsunami",
};
const legends_po_iida = {
  iida_potential_isolated: "legendPoVillage",
  iida_potential_damaged_road: "legendPoDmgRoad",
  iida_potential_landslide: "legendPoBosai",
};

const legends_ishikawa = Object.assign(
  {},
  legends_general_ishikawa,
  legends_po_ishikawa,
  legends_affect_ishikawa
);
update_legend(legends_ishikawa);
update_legend_selAll(legends_general_ishikawa, "generalSelectAll");
update_legend_selAll(legends_po_ishikawa, "potentialSelectAll");
update_legend_selAll(legends_affect_ishikawa, "notoDisasterSelectAll");

const regionSelect = document.getElementById("regionSelect");

regionSelect.addEventListener("change", function (event) {
  const selectedValue = event.target.value; // Get the selected value
  console.log("Selected Region:", selectedValue);

  if (selectedValue == "ishikawa") {
    remove_legend_when_switch(legends_po_iida);
    update_legend(legends_ishikawa);
    update_legend_selAll(legends_general_ishikawa, "generalSelectAll");
    update_legend_selAll(legends_po_ishikawa, "potentialSelectAll");
    update_legend_selAll(legends_affect_ishikawa, "notoDisasterSelectAll");
  } else if (selectedValue == "iida") {
    remove_legend_when_switch(legends_ishikawa);
    update_legend(legends_po_iida);
    update_legend_selAll(legends_po_iida, "iida_potentialSelectAll");
  }
});
