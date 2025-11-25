// import React, { useState } from "react";
// import styles from "./AdminPage.module.css";

// const DeleteDishPage = () => {
//   const [dishId, setDishId] = useState("");

//   const handleDelete = (e) => {
//     e.preventDefault();
//     alert(`Страву з ID ${dishId} видалено!`);
//     setDishId("");
//   };

//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.content}>
//         <div className={styles.inner}>
//           <h2>Видалення страви</h2>
//           <form onSubmit={handleDelete} className={styles.form}>
//             <label>Введіть ID страви:</label>
//             <input
//               type="text"
//               value={dishId}
//               onChange={(e) => setDishId(e.target.value)}
//               required
//             />
//             <button type="submit" className={styles.deleteBtn}>
//               Видалити страву
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DeleteDishPage;

import React, { useState } from "react";
import { deleteDish } from "../../services/menuService";
import styles from "./AdminPage.module.css";

const DeleteDishPage = () => {
  const [id, setId] = useState("");

  const handleDelete = (e) => {
    e.preventDefault();

    const result = deleteDish(id);

    if (result.success) {
      alert(`Страву з ID ${id} видалено`);
      setId("");
    } else {
      alert("Помилка видалення");
      console.error(result.error);
    }
  };

  return (
    <form onSubmit={handleDelete} className={styles.form}>
      <h2>Видалення страви</h2>

      <label>ID страви:</label>
      <input value={id} onChange={e => setId(e.target.value)} required />

      <button className={styles.deleteBtn}>Видалити</button>
    </form>
  );
};

export default DeleteDishPage;
