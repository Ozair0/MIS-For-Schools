<template>
  <div class="All_Departments">
    <div class="Department_Upper">
      <p class="Department_Title">All Departments</p>
      <div class="Department_Left">
        <div class="btn-group">
          <button
            @click.prevent="printToPdf"
            type="button"
            class="btn btn-info"
          >
            Generate Report
          </button>
        </div>
        <button
          @click.prevent="AddDepartment()"
          class="btn btn-outline-primary shadow"
          style="border-radius: 25px;margin-left: 20px; border: none;"
        >
          <fa :icon="faUserPlus" /> New Department
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
                  Department Name
                </th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(department, index) in departments" :key="index">
                <td>
                  {{ department.id }}
                </td>
                <td>
                  <a> {{ department.name }} </a>
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
import jsPDF from "jspdf";
import "jspdf-autotable";
export default {
  computed: {
    faUserPlus() {
      return faUserPlus;
    }
  },
  data() {
    return {
      departments: []
    };
  },
  created() {
    this.$axios.get("/api/department/allinfo").then(res => {
      this.departments = res.data;
    });
  },
  methods: {
    AddDepartment() {
      this.$router.push("department/add_department");
    },
    printToPdf() {
      var pdf = new jsPDF();
      pdf.autoTable({
        body: [
          ...this.departments.map(item => {
            return {
              id: item.id,
              dep: item.name
            };
          })
        ],
        columns: [
          { header: "ID", dataKey: "id" },
          { header: "Department Name", dataKey: "dep" }
        ]
      });
      pdf.save(`D ${new Date()}.pdf`);
    }
  }
};
</script>

<style lang="scss" scoped>
.All_Departments {
  margin: 10px 10px 0 30px;
  display: flex;
  flex-direction: column;
  .Department_Upper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .Department_Title {
      font-size: 20px;
      font-weight: bold;
      margin: 0;
    }
    .Department_Left {
      display: flex;
    }
  }
  .content {
    margin-top: 40px;
  }
}
</style>
