// ===== SETTINGS =====
// Paste your online application form link between the quotes.
// Leave it empty ("") to hide the "Apply online" button on every page.
const FORM_LINK = "";

// ===== PAGE LOGIC (nothing is saved or sent anywhere) =====
(function () {
  // "Apply online" buttons: show with the link, or remove if FORM_LINK is empty
  var link = FORM_LINK.trim();
  document.querySelectorAll(".btn-online").forEach(function (btn) {
    if (link) {
      btn.href = link;
      btn.hidden = false;
    } else {
      btn.remove();
    }
  });

  // Expand / collapse job cards (job list page)
  document.querySelectorAll(".card-toggle").forEach(function (toggle) {
    var card = toggle.closest(".card");
    var details = document.getElementById(toggle.getAttribute("aria-controls"));
    var hint = toggle.querySelector(".hint");
    toggle.addEventListener("click", function () {
      var open = details.hidden;
      details.hidden = !open;
      card.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      if (hint) hint.textContent = open ? "Tap to hide details" : "Tap to view details";
    });
  });

  // Search and filters (job list page only)
  var searchBox = document.getElementById("search");
  if (!searchBox) return;
  var cards = document.querySelectorAll(".card");
  var countBox = document.getElementById("count");
  var emptyMsg = document.getElementById("empty");
  var filterButtons = document.querySelectorAll(".filter");
  var currentFilter = "all";

  function render() {
    var term = searchBox.value.trim().toLowerCase();
    var shown = 0;
    cards.forEach(function (card) {
      var isManager = card.getAttribute("data-manager") === "1";
      var ok = true;
      if (currentFilter === "managers" && !isManager) ok = false;
      if (currentFilter === "staff" && isManager) ok = false;
      if (ok && term && card.getAttribute("data-search").indexOf(term) === -1) ok = false;
      card.hidden = !ok;
      if (ok) shown++;
    });
    emptyMsg.hidden = shown !== 0;
    countBox.textContent = "Showing " + shown + " of " + cards.length + " positions";
  }

  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterButtons.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      currentFilter = btn.getAttribute("data-filter");
      render();
    });
  });

  searchBox.addEventListener("input", render);
  render();
})();
