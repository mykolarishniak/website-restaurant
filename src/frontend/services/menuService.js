// const MENU_ITEMS_STORAGE_KEY = "menuItems";

// function generateId(items) {
//   const maxId = items.reduce((max, item) => {
//     const num = Number(item.id);
//     return isNaN(num) ? max : Math.max(max, num);
//   }, 0);
//   return String(maxId + 1);
// }

// function ensureIds(items) {
//   return items.map(item => {
//     if (item.id && !isNaN(Number(item.id))) return item;
//     return {
//       ...item,
//       id: generateId(items)
//     };
//   });
// }

// export function saveMenuItems(items) {
//   localStorage.setItem(MENU_ITEMS_STORAGE_KEY, JSON.stringify(items));
// }

// export function getMenuItems() {
//   const raw = localStorage.getItem(MENU_ITEMS_STORAGE_KEY);
//   const items = raw ? JSON.parse(raw) : [];
//   const fixed = ensureIds(items);
//   saveMenuItems(fixed);
//   return fixed;
// }

// export function addDish({ title, category, imgSrc, price }) {
//   try {
//     const items = getMenuItems();
//     const newDish = {
//       id: generateId(items),
//       title,
//       category,
//       imgSrc,
//       price
//     };

//     items.push(newDish);
//     saveMenuItems(items);

//     return { success: true, dish: newDish };
//   } catch (error) {
//     console.error("Помилка додавання страви:", error);
//     return { success: false, error };
//   }
// }

// export function updateDish(id, data) {
//   try {
//     const items = getMenuItems();
//     const index = items.findIndex(d => d.id === id);

//     if (index === -1) {
//       alert("Страву не знайдено");
//       return { success: false };
//     }

//     items[index] = { ...items[index], ...data };
//     saveMenuItems(items);

//     return { success: true, dish: items[index] };
//   } catch (error) {
//     console.error("Помилка редагування:", error);
//     return { success: false, error };
//   }
// }

// export function deleteDish(id) {
//   try {
//     const items = getMenuItems();
//     const exists = items.some(d => d.id === id);

//     if (!exists) {
//       alert("Страву з таким ID не знайдено");
//       return { success: false };
//     }

//     const updated = items.filter(d => d.id !== id);
//     saveMenuItems(updated);

//     return { success: true };
//   } catch (error) {
//     console.error("Помилка видалення:", error);
//     return { success: false, error };
//   }
// }

// export function getItemsByCategory(category) {
//   return getMenuItems().filter(item => item.category === category);
// }

// === MENU SERVICE ===

const MENU_ITEMS_STORAGE_KEY = "menuItems";

// Генерація коректного ID
function generateId(items) {
  const maxId = items.reduce((max, item) => {
    const num = Number(item.id);
    return isNaN(num) ? max : Math.max(max, num);
  }, 0);
  return String(maxId + 1);
}

// Завжди додаємо ID тим, у кого його нема
function ensureIds(items) {
  return items.map(item => {
    if (item.id && !isNaN(Number(item.id))) return item;
    return {
      ...item,
      id: generateId(items)
    };
  });
}

// Зберегти
export function saveMenuItems(items) {
  localStorage.setItem(MENU_ITEMS_STORAGE_KEY, JSON.stringify(items));
}

// Отримати
export function getMenuItems() {
  const raw = localStorage.getItem(MENU_ITEMS_STORAGE_KEY);
  const items = raw ? JSON.parse(raw) : [];
  const fixed = ensureIds(items);
  saveMenuItems(fixed);
  return fixed;
}

// Додати страву
export function addDish({ title, category, imgSrc, price }) {
  try {
    const items = getMenuItems();
    const newDish = {
      id: generateId(items),
      title,
      category,
      imgSrc,
      price
    };

    items.push(newDish);
    saveMenuItems(items);

    return { success: true, dish: newDish };
  } catch (error) {
    console.error("Помилка додавання страви:", error);
    return { success: false, error };
  }
}

// Редагування
export function updateDish(id, data) {
  try {
    const items = getMenuItems();
    const index = items.findIndex(d => d.id === id);

    if (index === -1) {
      alert("Страву не знайдено");
      return { success: false };
    }

    items[index] = { ...items[index], ...data };
    saveMenuItems(items);

    return { success: true, dish: items[index] };
  } catch (error) {
    console.error("Помилка редагування:", error);
    return { success: false, error };
  }
}

// Видалення
export function deleteDish(id) {
  try {
    const items = getMenuItems();
    const exists = items.some(d => d.id === id);

    if (!exists) {
      alert("Страву з таким ID не знайдено");
      return { success: false };
    }

    const updated = items.filter(d => d.id !== id);
    saveMenuItems(updated);

    return { success: true };
  } catch (error) {
    console.error("Помилка видалення:", error);
    return { success: false, error };
  }
}

export function getItemsByCategory(category) {
  return getMenuItems().filter(item => item.category === category);
}
