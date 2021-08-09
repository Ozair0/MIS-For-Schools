<template>
  <div class="All_Employee">
    <div class="Employee_Upper">
      <p class="Employee_Title">All Employees</p>
      <div class="Employee_Left">
        <div class="btn-group">
          <button type="button" class="btn btn-info">
            Generate Report
          </button>
        </div>
        <button
          @click.prevent="AddEmployee"
          class="btn btn-outline-primary shadow"
          style="border-radius: 25px;margin-left: 20px; border: none;"
        >
          <fa :icon="faUserPlus" /> New Employee
        </button>
      </div>
    </div>
    <section class="content">
      <!-- Default box -->
      <div class="card">
        <div class="card-body p-0" style="display: block;">
          <table class="table table-striped projects">
            <thead>
              <tr>
                <th>
                  ID
                </th>
                <th>
                  Full Name
                </th>
                <th>
                  School
                </th>
                <th>
                  Department
                </th>
                <th class="text-center">
                  Profile Image
                </th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(employee, index) in employees" :key="index">
                <td>
                  {{ employee.userid }}
                </td>
                <td>
                  <a> {{ employee.name }} {{ employee.lastname }} </a>
                  <br />
                  <small> DOB: {{ employee.dob }} </small>
                </td>
                <td>
                  <a :href="`/school/${employee.schoolid}`">{{
                    employee.school
                  }}</a>
                </td>
                <td>
                  <a :href="`/department/${employee.departmentid}`">{{
                    employee.dep
                  }}</a>
                </td>
                <td class="project-profile d-flex justify-content-center">
                  <nuxt-img
                    height="50"
                    width="50"
                    format="webp"
                    class="direct-chat-img"
                    :src="`/Uploads/Employees/${employee.profileimage}`"
                    alt="Profile Image"
                  />
                </td>
                <td class="project-actions text-center">
                  <a class="btn btn-primary btn-sm" href="#">
                    <i class="fas fa-folder"> </i>
                    View
                  </a>
                  <a class="btn btn-info btn-sm" href="#">
                    <i class="fas fa-pencil-alt"> </i>
                    Edit
                  </a>
                  <a class="btn btn-danger btn-sm" href="#">
                    <i class="fas fa-trash"> </i>
                    Delete
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- /.card-body -->
      </div>
      <!-- /.card -->
    </section>
  </div>
</template>

<script>
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

export default {
  computed: {
    faUserPlus() {
      return faUserPlus;
    }
  },
  data() {
    return {
      employees: []
    };
  },
  created() {
    this.$axios.get("/api/employee/all").then(res => {
      this.employees = res.data;
    });
  },
  methods: {
    AddEmployee() {
      this.$router.push("employee/add_employee");
    }
  }
};
</script>

<style lang="scss" scoped>
.All_Employee {
  margin: 10px 10px 0 30px;
  display: flex;
  flex-direction: column;
  .Employee_Upper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .Employee_Title {
      font-size: 20px;
      font-weight: bold;
      margin: 0;
    }
    .Employee_Left {
      display: flex;
    }
  }
  .content {
    margin-top: 40px;
  }
}
</style>
