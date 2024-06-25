import { createStore } from 'vuex';
import { login, register, getSwapHouses } from '@/services/apiService';

const store = createStore({
    state: {
        loading: false,
        user: null,
        token: localStorage.getItem('token') || null,
        error: null,
        filteredHouses: []
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
                localStorage.setItem('token', token);
            } else {
                localStorage.removeItem('token');
            }
        },
        setError(state, error) {
            state.error = error;
        },
        setFilteredHouses(state, houses) {
            state.filteredHouses = houses;
        },
        clearAuthData(state) {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
            state.error = null;
        },
        startLoading(state) {
            state.loading = true;
        },
        stopLoading(state) {
            state.loading = false;
        }
    },
    actions: {
        startLoading({ commit }) {
            commit('startLoading');
        },
        stopLoading({ commit }) {
            commit('stopLoading');
        },
        async login({ commit }, { number, password }) {
            commit('startLoading');
            commit('setError', null); // Clear previous errors
            try {
                const response = await login(number, password);
                if (response.success) {
                    commit('setUser', response.result.user);
                    commit('setToken', response.result.token);
                } else {
                    commit('setError', response.message);
                    throw new Error(response.message);
                }
            } catch (error) {
                commit('setError', error.response ? error.response.data.message : error.message);
                throw error;
            } finally {
                commit('stopLoading');
            }
        },
        async register({ commit }, { firstName, lastName, email, phone, password }) {
            commit('startLoading');
            commit('setError', null); // Clear previous errors
            try {
                const response = await register({ firstName, lastName, email, phone, password });
                if (response.success) {
                    commit('setUser', response.result.user);
                    commit('setToken', response.result.token);
                } else {
                    commit('setError', response.message);
                    throw new Error(response.message);
                }
            } catch (error) {
                commit('setError', error.response ? error.response.data.message : error.message);
                throw error;
            } finally {
                commit('stopLoading');
            }
        },
        async fetchFilteredHouses({ commit }, params) {
            commit('startLoading');
            commit('setError', null); // Clear previous errors
            try {
                const response = await getSwapHouses(params);
                if (response.success) {
                    commit('setFilteredHouses', response.result.filtered_houses.data);
                } else {
                    commit('setError', response.message);
                }
            } catch (error) {
                commit('setError', error.response ? error.response.data.message : error.message);
            } finally {
                commit('stopLoading');
            }
        }
    },
    getters: {
        isLoading: state => state.loading,
        user: state => state.user,
        token: state => state.token,
        error: state => state.error,
        filteredHouses: state => state.filteredHouses
    },
});

export default store;
