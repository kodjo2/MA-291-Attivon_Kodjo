// TODO task003: implémenter une fonction similaire à fetchSnacks
export default async function fetchSalesPoints() {
  const response = await fetch("../../data/points-of-sale.json");

  if (!response.ok) {
    throw new Error(`Unable to load sales points: ${response.status}`);
  }

  return response.json();
}
