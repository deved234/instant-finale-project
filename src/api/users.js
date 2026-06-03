import api from "./axios";

const normalizeEmail = (email) => email.trim().toLowerCase();

const toUserList = (data) => {
  if (Array.isArray(data)) return data;
  if (data && typeof data === "object") return [data];
  return [];
};

export const findUsersByEmail = async (email) => {
  try {
    const { data } = await api.get("/users", {
      params: { email: normalizeEmail(email) },
    });
    return toUserList(data);
  } catch (error) {
    // MockAPI returns 404 when no user matches the email filter
    if (error.response?.status === 404) return [];
    throw error;
  }
};

export const registerUser = async ({ name, email, password }) => {
  const normalizedEmail = normalizeEmail(email);
  const existing = await findUsersByEmail(normalizedEmail);

  if (existing.length > 0) {
    throw new Error("EMAIL_EXISTS");
  }

  const { data } = await api.post("/users", {
    name: name.trim(),
    email: normalizedEmail,
    password,
  });

  return data;
};

export const loginUser = async ({ email, password }) => {
  const users = await findUsersByEmail(email);

  if (users.length === 0 || users[0].password !== password) {
    throw new Error("INVALID_CREDENTIALS");
  }

  return users[0];
};

export const toAuthUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
});
