import { createStore } from "vuex";

export default createStore({
  state: {
    token: null,
    user: null,
  },

  mutations: {
    setUser(state, data) {
      localStorage.setItem("token", data.token);
      state.user = data.user;
      state.token = data.token;
    },
  },

  getters: {
    isAuthenticated(state) {
      return !!state.token;
    }
  }
});
