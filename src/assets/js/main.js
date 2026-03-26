import fetchSnacks from "./fetchSnacks.js";
import fetchSalesPoints from "./fetchSalesPoints.js";

const loadSnacksBtn = document.querySelector("#load-snacks-btn");
const snacksContainer = document.querySelector("#snacks-container");
const feedback = document.querySelector("#feedback");

const toggleSalesPointsBtn = document.querySelector("#toggle-sales-points-btn");
const salesPointsSection = document.querySelector("#sales-points-section");
const salesPointsGrid = document.querySelector("#sales-points-grid");
const salesPointsFeedback = document.querySelector("#sales-points-feedback");

let areSalesPointsVisible = false;
let salesPointsLoaded = false;

loadSnacksBtn.addEventListener("click", loadSnacks);
toggleSalesPointsBtn.addEventListener("click", toggleSalesPoints);

async function loadSnacks() {
  feedback.textContent = "";

  try {
    const snacks = await fetchSnacks();
    displaySnacks(snacks);
  } catch (error) {
    console.error(error);
    feedback.textContent = "Impossible de charger les snacks.";
  }
}

function displaySnacks(snacks) {
  snacksContainer.innerHTML = snacks
    .map(
      (snack) => `
    <article class="card">
      <img src="${snack.imageUrl}" alt="${snack.alt}">
      <div class="card-content">
        <h3>${snack.name.toUpperCase()}</h3>
        <p>${snack.description}</p>
        <p class="price">CHF ${snack.price.toFixed(2)}</p>
        <span class="fake-action">Commander</span>
      </div>
    </article>
  `,
    )
    .join("");
}

async function toggleSalesPoints() {
  // Toggle l'état d'affichage sans re-fetch systématique (Task004)
  areSalesPointsVisible = !areSalesPointsVisible;
  salesPointsSection.hidden = !areSalesPointsVisible;
  toggleSalesPointsBtn.textContent = areSalesPointsVisible
    ? "Masquer les points de vente"
    : "Afficher les points de vente";

  if (areSalesPointsVisible && !salesPointsLoaded) {
    await loadSalesPoints();
  }
}

async function loadSalesPoints() {
  salesPointsFeedback.textContent = "";

  try {
    const salesPoints = await fetchSalesPoints();
    displaySalesPoints(salesPoints);
    salesPointsLoaded = true;
  } catch (error) {
    // Task005: message lisible + console garde l'erreur
    console.error(error);
    salesPointsFeedback.textContent =
      "Impossible de charger les points de vente.";
  }
}

function displaySalesPoints(salesPoints) {
  salesPointsGrid.innerHTML = salesPoints
    .map(
      (sp) => `
    <article class="sales-point-card">
      <h3>${sp.building}</h3>
      <p><strong>Salle :</strong> ${sp.room}</p>
      <p><strong>Horaires :</strong> ${sp.openingHours}</p>
      <p><strong>Email :</strong> ${sp.email}</p>
    </article>
  `,
    )
    .join("");
}
