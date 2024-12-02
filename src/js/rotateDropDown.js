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

const legends = { population: "legendPop", cityHall: "legendCityHall" };
Object.keys(legends).forEach((check_id) => {
  console.log(check_id);
  document.getElementById(check_id).addEventListener("change", function () {
    const legendContainer = document.getElementById(legends[check_id]);
    if (this.checked) {
      legendContainer.classList.add("show");
    } else {
      legendContainer.classList.remove("show");
    }
  });
});
