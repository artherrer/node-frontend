<template>
  <div class="container">
    <div class="row">
      <div class="col-m-12">
        <h1>Dashboard</h1>
        <button class="btn btn-link" @click="signOut">Cerrar sesion</button>
        <router-link class="btn btn-primary" to="/employees/create">Agregar empleado</router-link>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Email</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(employee, index) in employees" :key="index">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ employee.name }}</td>
              <td>{{ employee.email }}</td>
              <td>
                <router-link class="btn btn-secondary btn-sm" :to="{ name: 'EmployeesEdit', params: { id: employee.id } }"
                  >Editar empleado</router-link
                >
                <button class="btn btn-danger btn-sm" @click="deleteEmployee(employee.id, index)">Eliminar empleado</button>
              </td>
            </tr>
          </tbody>
        </table>
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
    const employees = ref([]);

    onMounted(async () => {
      try {
        const { data } = await axios.get("/employees");
        employees.value = data;
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

    const signOut = async () => {
      localStorage.removeItem("token");
      router.push("/auth/login");
    };

    const deleteEmployee = async (employeeId, index) => {
      try {
        Swal.fire({
          title: "¿Estas seguro?",
          text: "No podras revertir esta accion",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, eliminar",
        }).then(async (result) => {
          if (result.isConfirmed) {
            await axios.delete(`/employees/${employeeId}`);
            employees.value.splice(index, 1);
            Swal.fire("Eliminado!", "El empleado ha sido eliminado.", "success");
          }
        });
      } catch (error) {
        console.warn(error);
        const errorMsg = error.response.data.error;
        Swal.fire({
          title: "Error",
          text: errorMsg || "Error al eliminar el empleado",
          icon: "error",
        });
      }
    };

    return {
      employees,
      signOut,
      deleteEmployee,
    };
  },
};
</script>
