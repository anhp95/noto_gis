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
