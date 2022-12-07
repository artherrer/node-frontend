<template>
  <div class="bg-gradient-primary">
    <div class="container">
      <div class="row">
        <div class="col-m-12">
          <h1>Editar empleado</h1>
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
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import axios from "../services/axios";
export default {
  setup() {
    const router = useRouter();
    const name = ref("");
    const email = ref("");
    const password = ref("");

    const employeeId = router.currentRoute.value.params.id;

    onMounted(async () => {
      try {
        const { data } = await axios.get(`/employees/${employeeId}`);
        name.value = data.name;
        email.value = data.email;
      } catch (error) {
        console.warn(error);
        const errorMsg = error.response.data.error;
        Swal.fire({
          title: "Error",
          text: errorMsg || "Error al obtener los empleados",
          icon: "error",
        });
      }
    });

    const register = async () => {
      try {
        await axios.put(`/employees/${employeeId}`, {
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
