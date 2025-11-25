export function validateRegistrationData({ username, email, password }) {
  const errors = {};

  if (!username.trim()) {
    errors.username = "Ім'я користувача не може бути порожнім";
  }

  if (!email.includes("@") || email.length < 5) {
    errors.email = "Некоректний email";
  }

  if (password.length < 8) {
    errors.password = "Пароль має містити мінімум 8 символів";
  }

  if (Object.keys(errors).length > 0) {
    const messages = Object.values(errors).join("\n");
    alert(messages);
  }

  return errors;
}

export function registerUser({ username, email, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      const exists = users.find(u => u.email === email);
      if (exists) {
        alert("Користувач з таким email вже існує");
        reject({ message: "Користувач з таким email вже існує" });
        return;
      }

      const newUser = { id: Date.now(), username, email, password };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      alert("Успішно зареєстровано");
      resolve({ message: "Успішно зареєстровано", user: newUser });
    }, 600);
  });
}

export function loginUser({ email, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      const user = users.find(u => u.email === email && u.password === password);

      if (!user) {
        alert("Невірний email або пароль");
        reject({ message: "Невірний email або пароль" });
        return;
      }

      localStorage.setItem("currentUser", JSON.stringify(user));
      alert("Успішний вхід");
      resolve({ message: "Успішний вхід", user });
    }, 600);
  });
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

export function logoutUser() {
  localStorage.removeItem("currentUser");
  alert("Ви вийшли з акаунту");
}

export const authService = {
  login: loginUser,
  logout: logoutUser,
  register: registerUser,
  getCurrentUser,
};

// export function registerUser({ username, email, password, role = "user" }) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const users = JSON.parse(localStorage.getItem("users") || "[]");

//       if (users.find(u => u.email === email)) {
//         alert("Користувач з таким email вже існує");
//         reject();
//         return;
//       }

//       const newUser = {
//         id: Date.now(),
//         username,
//         email,
//         password,
//         role
//       };

//       users.push(newUser);
//       localStorage.setItem("users", JSON.stringify(users));
//       alert("Успішно зареєстровано");

//       resolve(newUser);
//     }, 500);
//   });
// }

// localStorage.setItem("users", JSON.stringify([
//   {
//     id: 1,
//     username: "Admin",
//     email: "admin@example.com",
//     password: "12345678",
//     role: "admin"
//   }
// ]));
