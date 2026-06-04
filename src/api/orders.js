import api from "./axios";
import { resolveUserId } from "./users";

const normalizeOrders = (orders) => (Array.isArray(orders) ? orders : []);

export const getUserRecordById = async (id) => {
  const { data } = await api.get(`/users/${id}`);
  return data;
};

export const getOrdersForUser = async (user) => {
  const id = await resolveUserId(user);
  if (!id) return [];

  const record = await getUserRecordById(id);
  return normalizeOrders(record.orders);
};

export const appendOrderForUser = async (user, order) => {
  const id = await resolveUserId(user);
  if (!id) {
    throw new Error("NO_USER_ID");
  }

  const current = await getUserRecordById(id);
  const orders = [...normalizeOrders(current.orders), order];

  const { data } = await api.put(`/users/${id}`, {
    name: current.name,
    email: current.email,
    password: current.password,
    ...(current.avatar ? { avatar: current.avatar } : {}),
    ...(current.address ? { address: current.address } : {}),
    orders,
  });

  return normalizeOrders(data.orders);
};
