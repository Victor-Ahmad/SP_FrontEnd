import { createStore } from "vuex";
import {
  login,
  registerUser,
  getSwapHouses,
  getTriangleSwapHouses,
  saveFcmTokenToBackend,
  logout as apiLogout,
} from "@/services/apiService";
import { initializeApp } from "firebase/app";
import { getMessaging, deleteToken } from "firebase/messaging";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1pYbJOZtRoI6uP0CG2BJwbyiF66t8yhs",
  authDomain: "snelwoningruil.firebaseapp.com",
  projectId: "snelwoningruil",
  storageBucket: "snelwoningruil.appspot.com",
  messagingSenderId: "95029283842",
  appId: "1:95029283842:web:cf6baac956ad264d7b2b1b",
  measurementId: "G-ZB2PQERS5W",
};

// Initialize Firebase once and reuse it
const app = initializeApp(firebaseConfig);

const store = createStore({
  state: {
    activeTab: localStorage.getItem("activeTab") || "houses",
    loading: false,
    user: null,
    token: localStorage.getItem("token") || null,
    fcmToken: localStorage.getItem("fcmToken") || null, // Store the FCM token here
    error: null,
    filteredHouses: [],
    triangleSwapHouses: [],
    triangleSwapHousesMyHouse: null,
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
    currentLanguage: localStorage.getItem("language") || "nl",
    hasMoreThanTwoImages: false,
    fcmInitialized: false,
  },
  mutations: {
    setActiveTab(state, tab) {
      state.activeTab = tab;
      localStorage.setItem("activeTab", tab);
    },
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
    setFcmToken(state, token) {
      state.fcmToken = token;
      if (token) {
        localStorage.setItem("fcmToken", token); // Store in localStorage
      } else {
        localStorage.removeItem("fcmToken"); // Remove if null
      }
    },
    clearFcmToken(state) {
      state.fcmToken = null;
      localStorage.removeItem("fcmToken"); // Clear from localStorage
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
    setTriangleSwapHouseMyHouse(state, house) {
      state.triangleSwapHousesMyHouse = house;
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
      state.fcmToken = null; // Clear FCM token
      state.fcmInitialized = false;
      localStorage.removeItem("token");
      localStorage.removeItem("fcmToken");
      state.error = null;
    },
    setFcmInitialized(state, initialized) {
      state.fcmInitialized = initialized;
    },
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    },
    setCurrentLanguage(state, language) {
      state.currentLanguage = language;
      localStorage.setItem("language", language);
    },
    setHasMoreThanTwoImages(state, value) {
      state.hasMoreThanTwoImages = value;
    },
  },
  actions: {
    updateActiveTab({ commit }, tab) {
      commit("setActiveTab", tab);
    },
    startLoading({ commit }) {
      commit("startLoading");
    },
    stopLoading({ commit }) {
      commit("stopLoading");
    },
    async login({ commit }, { email, password }) {
      commit("startLoading");
      commit("setError", null);
      try {
        const response = await login(email, password);
        if (response.success) {
          commit("setUser", response.result.user);
          commit("setToken", response.result.token);
        } else {
          commit("setError", response.message);
          throw new Error(response.message);
        }
        return response; // Return the response
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
      commit("setError", null);
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
      commit("setError", null);
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
          commit(
            "setHasMoreThanTwoImages",
            response.result.has_more_than_two_images
          );
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
      commit("setError", null);
      try {
        const response = await getTriangleSwapHouses(params);
        if (response.success) {
          commit("setTriangleSwapHouses", response.result.paginatedItems.data);
          commit("setTrianglePagination", {
            current_page: response.result.paginatedItems.current_page,
            last_page: response.result.paginatedItems.last_page,
            per_page: response.result.paginatedItems.per_page,
            total: response.result.paginatedItems.total,
          });
          commit("setTriangleSwapHouseMyHouse", response.result.my_house);
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
    async saveFcmToken({ commit }, token) {
      try {
        await saveFcmTokenToBackend(token);
        commit("setFcmToken", token);
      } catch (error) {
        console.error("Failed to save FCM token:", error);
      }
    },
    async revokeFcmToken({ state, commit }) {
      console.log("revokeFcmToken");
      if (state.fcmToken) {
        try {
          const messaging = getMessaging(app);

          // Delete the FCM token from the client
          await deleteToken(messaging);
          // Clear the FCM token from the Vuex state and localStorage
          commit("clearFcmToken");
          console.log("revokeFcmToken success");
        } catch (error) {
          console.error("Failed to revoke FCM token:", error);
        }
      }
    },
    async logout({ commit, dispatch }) {
      try {
        // Step 1: Call the logout API
        await apiLogout();

        // Step 2: Revoke FCM token before logging out
        await dispatch("revokeFcmToken");

        // Step 3: Clear auth data from the store and localStorage
        commit("clearAuthData");

        console.log("Logout successful and FCM token revoked.");
      } catch (error) {
        console.error("Logout API call failed:", error);
        // Handle any errors that might occur during the API call
      }
    },
    setCurrentLanguage({ commit }, language) {
      commit("setCurrentLanguage", language);
    },
  },
  getters: {
    activeTab: (state) => state.activeTab,
    isLoading: (state) => state.loading,
    user: (state) => state.user,
    token: (state) => state.token,
    fcmToken: (state) => state.fcmToken,
    error: (state) => state.error,
    filteredHouses: (state) => state.filteredHouses,
    pagination: (state) => state.pagination,
    triangleSwapHouses: (state) => state.triangleSwapHouses,
    trianglePagination: (state) => state.trianglePagination,
    triangleSwapHousesMyHouse: (state) => state.triangleSwapHousesMyHouse,
    currentLanguage: (state) => state.currentLanguage,
    hasMoreThanTwoImages: (state) => state.hasMoreThanTwoImages,
  },
});

export default store;
