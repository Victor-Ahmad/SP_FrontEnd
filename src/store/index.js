// store/index.js

import { createStore } from "vuex";
import {
  login,
  registerUser,
  getSwapHouses,
  getTriangleSwapHouses,
} from "@/services/apiService";

const store = createStore({
  state: {
    loading: false,
    user: null,
    token: localStorage.getItem("token") || null,
    error: null,
    filteredHouses: [],
    triangleSwapHouses: [],
    pagination: {
      current_page: 1,
      last_page: 1,
      per_page: 12,
      total: 0,
    },
    trianglePagination: {
      current_page: 1,
      last_page: 1,
      per_page: 5,
      total: 0,
    },
    currentLanguage: "nl", // Add current language state
  },
  mutations: {
    setLoading(state, status) {
      state.loading = status;
    },
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
      if (token) {
        localStorage.setItem("token", token);
      } else {
        localStorage.removeItem("token");
      }
    },
    setError(state, error) {
      state.error = error;
    },
    setFilteredHouses(state, houses) {
      state.filteredHouses = houses;
    },
    setTriangleSwapHouses(state, houses) {
      state.triangleSwapHouses = houses;
    },
    setPagination(state, pagination) {
      state.pagination = pagination;
    },
    setTrianglePagination(state, pagination) {
      state.trianglePagination = pagination;
    },
    clearAuthData(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      state.error = null;
    },
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    },
    setCurrentLanguage(state, language) {
      // Add mutation to set current language
      state.currentLanguage = language;
    },
  },
  actions: {
    startLoading({ commit }) {
      commit("startLoading");
    },
    stopLoading({ commit }) {
      commit("stopLoading");
    },
    async login({ commit }, { email, password }) {
      commit("startLoading");
      commit("setError", null); // Clear previous errors
      try {
        const response = await login(email, password);
        if (response.success) {
          commit("setUser", response.result.user);
          commit("setToken", response.result.token);
        } else {
          commit("setError", response.message);
          throw new Error(response.message);
        }
      } catch (error) {
        commit(
          "setError",
          error.response ? error.response.data.message : error.message
        );
        throw error;
      } finally {
        commit("stopLoading");
      }
    },
    async registerUser({ commit }, formData) {
      commit("startLoading");
      commit("setError", null); // Clear previous errors
      try {
        const response = await registerUser(formData);
        if (response.success) {
          const user = response.result[0].user;
          const token = response.result[0].token;
          commit("setUser", user);
          commit("setToken", token);
        } else {
          commit("setError", response.message);
          throw new Error(response.message);
        }
      } catch (error) {
        commit(
          "setError",
          error.response ? error.response.data.message : error.message
        );
        throw error;
      } finally {
        commit("stopLoading");
      }
    },
    async fetchFilteredHouses({ commit }, { formData = null, page }) {
      commit("startLoading");
      commit("setError", null); // Clear previous errors
      try {
        const response = await getSwapHouses(formData, page);
        if (response.success) {
          commit("setFilteredHouses", response.result.filtered_houses.data);
          commit("setPagination", {
            current_page: response.result.filtered_houses.current_page,
            last_page: response.result.filtered_houses.last_page,
            per_page: response.result.filtered_houses.per_page,
            total: response.result.filtered_houses.total,
          });
        } else {
          commit("setError", response.message);
        }
      } catch (error) {
        commit(
          "setError",
          error.response ? error.response.data.message : error.message
        );
      } finally {
        commit("stopLoading");
      }
    },
    async fetchTriangleSwapHouses({ commit }, params) {
      commit("startLoading");
      commit("setError", null); // Clear previous errors
      try {
        const response = await getTriangleSwapHouses(params);
        if (response.success) {
          commit("setTriangleSwapHouses", response.result.data);
          commit("setTrianglePagination", {
            current_page: response.result.current_page,
            last_page: response.result.last_page,
            per_page: response.result.per_page,
            total: response.result.total,
          });
        } else {
          commit("setError", response.message);
        }
      } catch (error) {
        commit(
          "setError",
          error.response ? error.response.data.message : error.message
        );
      } finally {
        commit("stopLoading");
      }
    },
    async logout({ commit }) {
      commit("clearAuthData");
    },
    setCurrentLanguage({ commit }, language) {
      // Add action to set current language
      commit("setCurrentLanguage", language);
    },
  },
  getters: {
    isLoading: (state) => state.loading,
    user: (state) => state.user,
    token: (state) => state.token,
    error: (state) => state.error,
    filteredHouses: (state) => state.filteredHouses,
    pagination: (state) => state.pagination,
    triangleSwapHouses: (state) => state.triangleSwapHouses,
    trianglePagination: (state) => state.trianglePagination,
    currentLanguage: (state) => state.currentLanguage, // Add getter for current language
  },
});

export default store;
