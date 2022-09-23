import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],

    editUserdialog: false,
    editUserName: "",
    editUserEmail: "",
    editUserAge: "",

    newUserDialog: false,
    newUserName: "",
    newUserEmail: "",
    newUserAge: "",
  },
  getters: {},
  mutations: {
    allUsers(state, payload) {
      state.users = payload;
    },
    newUserRegister(state, payload) {
      console.log(state, payload);
      state.users.push(payload);
    },
    editUserData(store, payload) {
      const index = store.users.findIndex((el) => el.email === payload.email);
      const arr = [...store.users];
      arr[index] = payload;
      store.users = arr;
    },
    deleteUser(store, payload) {
      const index = store.users.findIndex((el) => el.email === payload);
      const arr = store.users.filter((el, i) => i !== index && el);
      store.users = arr;
    },
  },
  actions: {
    async fetchAllUsers(context) {
      const { data } = await axios.get("http://localhost:4000/user/allUsers");
      console.log("fetched");
      if (data) {
        context.commit("allUsers", data);
      }
    },

    async newUser(context, payload) {
      const { data } = await axios.post(
        "http://localhost:4000/user/newUser",
        payload
      );

      if (data.user) {
        console.log(data);
        context.dispatch("fetchAllUsers");
      }
    },

    async editUserData(context, payload) {
      const { data } = await axios.patch(
        "http://localhost:4000/user/editUser",
        {
          _id: payload._id,
          name: payload.name,
          email: payload.email,
          age: payload.age,
        }
      );
      if (data.user) {
        context.dispatch("fetchAllUsers");
      }
    },

    async deleteUser(context, payload) {
      await axios.delete(
        "http://localhost:4000/user/deleteUser/" + payload._id
      );
      context.dispatch("fetchAllUsers");
    },
  },
  modules: {},
});
