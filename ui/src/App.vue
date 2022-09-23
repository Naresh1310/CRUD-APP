<template>
  <v-app>
    <v-main class="ma-16">
      <v-app-bar class="mx-12 my-2">
        <h3>CURD</h3>

        <v-spacer></v-spacer>
        <v-btn
          color="light-blue accent-3 white--text"
          class="mr-6"
          @click="refreshUser"
          >Refresh</v-btn
        >
        <v-dialog v-model="newUserDialog" width="500" :retain-focus="false">
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="teal accent-3" v-bind="attrs" v-on="on">
              New User</v-btn
            >
          </template>
          <v-card>
            <v-card-title>New User</v-card-title>
            <v-text-field
              class="px-12"
              label="User name"
              v-model="newUserName"
            ></v-text-field>

            <v-text-field
              class="px-12"
              label="Email"
              v-model="newUserEmail"
            ></v-text-field>

            <v-text-field
              class="px-12"
              label="Age"
              v-model="newUserAge"
              type="number"
            ></v-text-field>

            <v-btn color="success" class="ma-4" @click="newUserRegister"
              >ok</v-btn
            >
            <v-btn class="red white--text" @click="newUserDialog = false"
              >cancel</v-btn
            >
          </v-card>
        </v-dialog>
      </v-app-bar>

      <v-data-table
        :headers="headers"
        class="elevation-1 ma-12"
        :items="this.$store.state.users"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-dialog v-model="editUserdialog" width="500" :retain-focus="false">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="red lighten-2"
                dark
                v-bind="attrs"
                v-on="on"
                @click="editUserData(item)"
              >
                Edit
              </v-btn>
            </template>

            <!-- Modal card -->
            <v-card>
              <v-card-title>Edit user</v-card-title>

              <v-text-field
                class="px-12"
                label="User name"
                v-model="editUserName"
              ></v-text-field>

              <v-text-field
                class="px-12"
                label="email"
                v-model="editUserEmail"
              ></v-text-field>

              <v-text-field
                class="px-12"
                label="age"
                v-model="editUserAge"
                type="number"
              ></v-text-field>

              <v-btn color="success" class="ma-4" @click="editedData">ok</v-btn>
              <v-btn class="red white--text" @click="editUserdialog = false"
                >cancel</v-btn
              >
            </v-card>
          </v-dialog>

          <v-btn color="danger" @click="deleteUser(item)" class="mx-4">
            Delete
          </v-btn>
        </template>
      </v-data-table>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: "User Name", sortable: false, value: "name", align: "center" },
        { text: "Email", value: "email", align: "center" },
        { text: "Age", value: "age", align: "center" },
        { text: "Actions", value: "actions", sortable: false, align: "center" },
      ],

      editUserdialog: false,
      editUserName: "",
      editUserEmail: "",
      editUserAge: "",
      editUserId: "",

      newUserDialog: false,
      newUserName: "",
      newUserEmail: "",
      newUserAge: "",
    };
  },
  mounted() {
    this.$store.dispatch("fetchAllUsers");
  },
  methods: {
    newUserRegister() {
      const newUser = {
        name: this.newUserName,
        email: this.newUserEmail,
        age: this.newUserAge,
      };
      this.$store.dispatch("newUser", newUser);
      this.newUserDialog = false;
    },

    // User data editing modal data
    editUserData(item) {
      const { email, age, name, _id } = item;
      console.log(email);
      this.editUserName = name;
      this.editUserEmail = email;
      this.editUserAge = age;
      this.editUserId = _id;
    },

    // Edited existing user data
    editedData() {
      const newUserData = {
        _id: this.editUserId,
        name: this.editUserName,
        email: this.editUserEmail,
        age: this.editUserAge,
      };
      this.$store.dispatch("editUserData", newUserData);
      this.editUserdialog = false;
    },

    deleteUser(item) {
      this.$store.dispatch("deleteUser", item);
    },

    refreshUser() {
      this.$store.dispatch("fetchAllUsers");
    },
  },
};
</script>

<style></style>
