import { authService } from "./authService";

export function checkAdminAccess() {
  const user = authService.getCurrentUser();
  if (!user || user.role !== "admin") {
    alert("Доступ заборонено. Ви повинні бути адміністратором.");
    return false;
  }
  return true;
}

const STORAGE_KEY = "menuItems";

function loadItems() {
  const json = localStorage.getItem(STORAGE_KEY);
  const items = json ? JSON.parse(json) : [];

  return items.map(item => ({
    ...item,
    id: item.id || crypto.randomUUID()
  }));
}

function saveItems(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}


function generateId() {
  return crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).substring(2, 10);
}

export function addDish({ title, category, imgSrc, price }) {
  if (!checkAdminAccess()) return null;

  const items = loadItems();

  const newDish = {
    id: generateId(),
    title,
    category,
    imgSrc,
    price: Number(price)
  };

  items.push(newDish);
  saveItems(items);

  alert(`Страва "${title}" успішно додана!`);
  return newDish;
}

export function updateDish(id, updates) {
  if (!checkAdminAccess()) return null;

  const items = loadItems();
  const index = items.findIndex(item => item.id === id);

  if (index === -1) {
    alert("Страву не знайдено.");
    return null;
  }

  items[index] = {
    ...items[index],
    ...updates,
    price: updates.price ? Number(updates.price) : items[index].price
  };

  saveItems(items);
  alert(`Страву з ID ${id} успішно оновлено!`);

  return items[index];
}

export function deleteDish(id) {
  if (!checkAdminAccess()) return false;

  const items = loadItems();
  const exists = items.some(item => item.id === id);

  if (!exists) {
    alert("Страву не знайдено.");
    return false;
  }

  const updated = items.filter(item => item.id !== id);
  saveItems(updated);

  alert(`Страву з ID ${id} видалено.`);
  return true;
}

export function getAllDishes() {
  return loadItems();
}

export function getDishesByCategory(category) {
  const items = loadItems();
  return items.filter(item => item.category === category);
}
