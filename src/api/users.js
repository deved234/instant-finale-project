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
  id: user.id != null ? String(user.id) : undefined,
  name: user.name,
  email: user.email,
  ...(user.address ? { address: user.address } : {}),
});

const fetchUserById = async (id) => {
  try {
    const { data } = await api.get(`/users/${id}`);
    return data;
  } catch (error) {
    if (error.response?.status === 404) return null;
    throw error;
  }
};

/** Resolve MockAPI user id from session or email lookup (fixes old localStorage without id). */
export const resolveUserId = async (user) => {
  if (user?.id != null && user.id !== "") {
    return String(user.id);
  }
  if (!user?.email) return null;

  const matches = await findUsersByEmail(user.email);
  const match = matches[0];
  return match?.id != null ? String(match.id) : null;
};

export const updateUserProfile = async (id, updates) => {
  const userId = String(id);
  const current = await fetchUserById(userId);
  if (!current) {
    throw new Error("USER_NOT_FOUND");
  }

  const payload = {
    name: updates.name ?? current?.name,
    email: updates.email ?? current?.email,
    password: current?.password,
    ...(current?.avatar ? { avatar: current.avatar } : {}),
    ...(updates.address !== undefined
      ? { address: updates.address }
      : current?.address
        ? { address: current.address }
        : {}),
    ...(Array.isArray(current?.orders) ? { orders: current.orders } : {}),
  };

  const { data } = await api.put(`/users/${userId}`, payload);
  return data;
};

export const syncUserToApi = async (user, updates) => {
  const id = await resolveUserId(user);
  if (!id) {
    return { localOnly: true };
  }

  const updated = await updateUserProfile(id, updates);
  return { user: toAuthUser({ ...updated, id }), localOnly: false };
};

/** Refresh auth session with id + address from API (call on Profile mount if needed). */
export const fetchAuthUserByEmail = async (email) => {
  const matches = await findUsersByEmail(email);
  if (!matches[0]) return null;
  return toAuthUser(matches[0]);
};
