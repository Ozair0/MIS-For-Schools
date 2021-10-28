<template>
  <div class="All_Grade">
    <div class="Grade_Upper">
      <p class="Grade_Title">All Grades</p>
      <div class="Grade_Left">
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
          @click.prevent="AddGrade"
          class="btn btn-outline-primary shadow"
          style="border-radius: 25px;margin-left: 20px; border: none;"
        >
          <fa :icon="faUserPlus" /> New Grade
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
                  Grade
                </th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(grade, index) in grades" :key="index">
                <td>
                  <a> {{ grade.gradenumber }} </a>
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
      grades: []
    };
  },
  created() {
    this.$axios.get("/api/grade/all").then(res => {
      this.grades = res.data;
    });
  },
  methods: {
    AddGrade() {
      this.$router.push("create_grade");
    },
    printToPdf() {
      var pdf = new jsPDF();
      pdf.autoTable({
        body: [
          ...this.grades.map(item => {
            return {
              gradenumber: item.gradenumber
            };
          })
        ],
        columns: [{ header: "Grade", dataKey: "gradenumber" }]
      });
      pdf.save(`G ${new Date()}.pdf`);
    }
  }
};
</script>

<style lang="scss" scoped>
.All_Grade {
  margin: 10px 10px 0 30px;
  display: flex;
  flex-direction: column;
  .Grade_Upper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .Grade_Title {
      font-size: 20px;
      font-weight: bold;
      margin: 0;
    }
    .Grade_Left {
      display: flex;
    }
  }
  .content {
    margin-top: 40px;
  }
}
</style>
