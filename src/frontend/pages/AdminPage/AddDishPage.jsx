// import React, { useState } from "react";
// import styles from "./AdminPage.module.css";

// const AddDishPage = () => {
//   const [name, setName] = useState("");
//   const [category, setCategory] = useState("");
//   const [image, setImage] = useState("");
//   const [price, setPrice] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert(`Страву "${name}" успішно додано!`);
//     setName("");
//     setCategory("");
//     setImage("");
//     setPrice("");
//   };

//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.content}>
//         <div className={styles.inner}>
//           <h2>Додавання нової страви</h2>
//           <form onSubmit={handleSubmit} className={styles.form}>
//             <label>Назва страви:</label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />

//             <label>Категорія:</label>
//             <input
//               type="text"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               required
//             />

//             <label>Зображення (URL або назва файлу):</label>
//             <input
//               type="text"
//               value={image}
//               onChange={(e) => setImage(e.target.value)}
//               required
//             />

//             <label>Ціна:</label>
//             <input
//               type="number"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               required
//             />

//             <button type="submit">Додати страву</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddDishPage;

import React, { useState } from "react";
import { addDish } from "../../services/menuService";
import styles from "./AdminPage.module.css";

const AddDishPage = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = addDish({ title, category, imgSrc, price: Number(price) });

    if (result.success) {
      alert(`Страву "${title}" успішно додано! ID: ${result.dish.id}`);
      setTitle("");
      setCategory("");
      setImgSrc("");
      setPrice("");
    } else {
      alert("Помилка додавання страви");
      console.error(result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Додавання нової страви</h2>

      <label>Назва:</label>
      <input value={title} onChange={e => setTitle(e.target.value)} required />

      <label>Категорія:</label>
      <select value={category} onChange={e => setCategory(e.target.value)} required>
        <option value="">Оберіть категорію</option>
        <option value="drinks">Напої</option>
        <option value="soups">Супи</option>
        <option value="salads">Салати</option>
        <option value="main">Основні страви</option>
      </select>

      <label>Зображення (URL):</label>
      <input value={imgSrc} onChange={e => setImgSrc(e.target.value)} required />

      <label>Ціна:</label>
      <input
        type="number"
        value={price}
        onChange={e => setPrice(e.target.value)}
        required
      />

      <button type="submit">Додати</button>
    </form>
  );
};

export default AddDishPage;
