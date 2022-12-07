<template>
  <div class="bg-gradient-primary">
    <div class="container">
      <div class="row">
        <div class="col-m-12">
          <h1>Registro de empleado</h1>
          <form @submit.prevent="register">
            <div class="mb-3">
              <label for="">Nombre completo</label>
              <input type="text" class="form-control" v-model="name" />
            </div>
            <div class="mb-3">
              <label for="">Email</label>
              <input type="email" class="form-control" v-model="email" />
            </div>
            <div class="mb-3">
              <label for="">Contraseña</label>
              <input type="password" class="form-control" v-model="password" />
            </div>
            <div class="mb-3">
              <button class="btn btn-primary">Registrarme</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import axios from "../services/axios";
export default {
  setup() {
    const router = useRouter();
    const name = ref("");
    const email = ref("");
    const password = ref("");

    const register = async () => {
      try {
        await axios.post("/employees", {
          name: name.value,
          email: email.value,
          password: password.value,
        });
        router.push("/");
      } catch (error) {
        console.warn(error);
        const errorMsg = error.response?.data?.error;
        Swal.fire({
          title: "Error",
          text: errorMsg || "Error al registrar empleado",
          icon: "error",
        });
      }
    };

    return {
      name,
      email,
      password,
      register,
    };
  },
};
</script>
