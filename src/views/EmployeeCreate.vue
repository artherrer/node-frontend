<template>
  <div class="bg-gradient-primary">
    <div class="container">
      <div class="row">
        <div class="col-m-12">
          <h1>Registro de empleado</h1>
          <form @submit.prevent="register">
            <div class="mb-3">
              <label for="">Nombre</label>
              <input type="text" class="form-control" v-model="name" required />
            </div>
            <div class="mb-3">
              <label for="">Apellido</label>
              <input type="text" class="form-control" v-model="last_name" required />
            </div>
            <div class="mb-3">
              <label for="">Email</label>
              <input type="email" class="form-control" v-model="email" required />
            </div>
            <div class="mb-3">
              <label for="">Dirección</label>
              <input type="text" class="form-control" v-model="address" required />
            </div>
            <div class="mb-3">
              <label for="">Teléfono</label>
              <input type="text" class="form-control" v-model="phone_number" required />
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
    const last_name = ref("");
    const email = ref("");
    const address = ref("");
    const phone_number = ref("");

    const register = async () => {
      try {
        await axios.post("/employees", {
          name: name.value,
          email: email.value,
          last_name: last_name.value,
          address: address.value,
          phone_number: phone_number.value,
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
      last_name,
      email,
      address,
      phone_number,
      register,
    };
  },
};
</script>
