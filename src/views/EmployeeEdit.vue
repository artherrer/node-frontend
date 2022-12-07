<template>
  <div class="bg-gradient-primary">
    <div class="container">
      <div class="row">
        <div class="col-m-12">
          <h1>Editar empleado</h1>
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
import { ref, onMounted } from "vue";
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

    const employeeId = router.currentRoute.value.params.id;

    onMounted(async () => {
      try {
        const { data } = await axios.get(`/employees/${employeeId}`);
        name.value = data.name;
        email.value = data.email;
        last_name.value = data.last_name;
        address.value = data.address;
        phone_number.value = data.phone_number;
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
      email,
      last_name,
      address,
      phone_number,
      register,
    };
  },
};
</script>
