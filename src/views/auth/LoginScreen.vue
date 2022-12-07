<template>
  <div class="bg-gradient-primary">
    <div class="container">
      <div class="row">
        <div class="col-m-12">
          <h1>Login</h1>
          <form @submit.prevent="signIn">
            <div class="mb-3">
              <label for="">Email</label>
              <input type="email" class="form-control" v-model="email" />
            </div>
            <div class="mb-3">
              <label for="">Contraseña</label>
              <input type="password" class="form-control" v-model="password" />
            </div>
            <div class="mb-3">
              <button class="btn btn-primary">Entrar</button>
            </div>
          </form>
        </div>
        <div class="col-12">
          <div class="row">
            <router-link to="/signup">Registro</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import axios from "../../services/axios";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const email = ref("");
    const password = ref("");

    const signIn = async () => {
      try {
        const { data } = await axios.post("/auth/signin", {
          email: email.value,
          password: password.value,
        });
        store.commit("setUser", data);
        router.push("/");
      } catch (error) {
        console.warn(error);
        const errorMsg = error.response.data.error;
        Swal.fire({
          title: "Error",
          text: errorMsg,
          icon: "error",
        });
      }
    };

    return {
      email,
      password,
      signIn,
    };
  },
};
</script>
