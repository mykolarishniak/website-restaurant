// import React, { useState } from "react";
// import styles from "./AdminPage.module.css";

// const EditDishPage = () => {
//   const [dishId, setDishId] = useState("");
//   const [newName, setNewName] = useState("");
//   const [newPrice, setNewPrice] = useState("");

//   const handleEdit = (e) => {
//     e.preventDefault();
//     alert(`Страву з ID ${dishId} успішно оновлено!`);
//     setDishId("");
//     setNewName("");
//     setNewPrice("");
//   };

//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.content}>
//         <div className={styles.inner}>
//           <h2>Редагування страви</h2>
//           <form onSubmit={handleEdit} className={styles.form}>
//             <label>ID страви:</label>
//             <input
//               type="text"
//               value={dishId}
//               onChange={(e) => setDishId(e.target.value)}
//               required
//             />

//             <label>Нова назва:</label>
//             <input
//               type="text"
//               value={newName}
//               onChange={(e) => setNewName(e.target.value)}
//             />

//             <label>Нова ціна:</label>
//             <input
//               type="number"
//               value={newPrice}
//               onChange={(e) => setNewPrice(e.target.value)}
//             />

//             <button type="submit">Оновити страву</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditDishPage;

import React, { useState } from "react";
import { getMenuItems, updateDish } from "../../services/menuService";
import styles from "./AdminPage.module.css";

const EditDishPage = () => {
  const items = getMenuItems();

  const [selectedId, setSelectedId] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const handleSelect = (id) => {
    setSelectedId(id);
    const dish = items.find(d => d.id === id);
    setTitle(dish.title);
    setPrice(dish.price);
  };

  const handleEdit = (e) => {
    e.preventDefault();

    const result = updateDish(selectedId, { title, price });

    if (result.success) {
      alert("Страву оновлено!");
    } else {
      alert("Помилка редагування");
      console.error(result.error);
    }
  };

  return (
    <form onSubmit={handleEdit} className={styles.form}>
      <h2>Редагування страви</h2>

      <label>Оберіть страву:</label>
      <select value={selectedId} onChange={e => handleSelect(e.target.value)} required>
        <option value="">Оберіть...</option>
        {items.map(item => (
          <option key={item.id} value={item.id}>
            {item.id} — {item.title}
          </option>
        ))}
      </select>

      {selectedId && (
        <>
          <label>Нова назва:</label>
          <input value={title} onChange={e => setTitle(e.target.value)} />

          <label>Нова ціна:</label>
          <input value={price} onChange={e => setPrice(e.target.value)} />

          <button>Оновити</button>
        </>
      )}
    </form>
  );
};

export default EditDishPage;
