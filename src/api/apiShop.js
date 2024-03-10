import axios from "axios";

const VITE_APP_API_URL = import.meta.env.VITE_APP_API_URL;

const instance = axios.create({
  baseURL: VITE_APP_API_URL,
});

const api = {
  getShops: async () => {
    try {
      const response = await instance.get("/drugstores");
      return response.data;
    } catch (error) {
      console.error("Error fetching shops:", error);
      return null;
    }
  },

  addOrders: async (data) => {
    try {
      const response = await instance.post("/order", data);
      return response.data;
    } catch (error) {
      console.error("Error adding orders:", error);
      return null;
    }
  },

  updateFavorite: async (id, data) => {
    try {
      const response = await instance.patch(`/drugstores/${id}/favorite`, data);
      return response.data;
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  },
};

export default api;
