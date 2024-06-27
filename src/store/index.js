import { createStore } from 'vuex';
import { login, register, getSwapHouses } from '@/services/apiService';

const store = createStore({
    state: {
        loading: false,
        user: null,
        token: localStorage.getItem('token') || null,
        error: null,
        filteredHouses: [],
        pagination: {
            current_page: 1,
            last_page: 1,
            per_page: 12,
            total: 0
        }
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
            console.log('Token:', token);
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
        setPagination(state, pagination) {
            state.pagination = pagination;
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
                    commit('setPagination', {
                        current_page: response.result.filtered_houses.current_page,
                        last_page: response.result.filtered_houses.last_page,
                        per_page: response.result.filtered_houses.per_page,
                        total: response.result.filtered_houses.total
                    });
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
        filteredHouses: state => state.filteredHouses,
        pagination: state => state.pagination
    },
});

export default store;
