<template>
  <div class="All_Teacher">
    <div class="Teacher_Upper">
      <p class="Teacher_Title">All Teachers</p>
      <div class="Teacher_Left">
        <div class="btn-group">
          <button
            type="button"
            @click.prevent="printToPdf"
            class="btn btn-info"
          >
            Generate Report
          </button>
        </div>
        <button
          @click.prevent="AddTeacher()"
          class="btn btn-outline-primary shadow"
          style="border-radius: 25px;margin-left: 20px; border: none;"
        >
          <fa :icon="faUserPlus" /> New Teacher
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
              <tr v-for="(teacher, index) in teachers" :key="index">
                <td>
                  {{ teacher.userid }}
                </td>
                <td>
                  <a> {{ teacher.name }} {{ teacher.lastname }} </a>
                  <br />
                  <small>
                    DOB: {{ new Date(teacher.dob).toLocaleDateString("en-US") }}
                  </small>
                </td>
                <td>
                  <a :href="`/school/${teacher.schoolid}`">{{
                    teacher.school
                  }}</a>
                </td>
                <td>
                  <a :href="`/department/${teacher.departmentid}`">{{
                    teacher.dep
                  }}</a>
                </td>
                <td class="project-profile d-flex justify-content-center">
                  <nuxt-img
                    height="50"
                    width="50"
                    format="webp"
                    class="direct-chat-img"
                    :src="`/Uploads/Teachers/${teacher.profileimage}`"
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
      teachers: []
    };
  },
  created() {
    this.$axios.get("/api/teacher/all").then(res => {
      this.teachers = res.data;
    });
  },
  methods: {
    AddTeacher() {
      this.$router.push("teacher/add_teacher");
    },
    printToPdf() {
      var pdf = new jsPDF();
      pdf.autoTable({
        body: [
          ...this.teachers.map(item => {
            return {
              id: item.userid,
              fullname: item.name + " " + item.lastname,
              school: item.school,
              dob: new Date(item.dob).toLocaleDateString("en-US"),
              dep: item.dep
            };
          })
        ],
        columns: [
          { header: "ID", dataKey: "id" },
          { header: "Full Name", dataKey: "fullname" },
          { header: "School", dataKey: "school" },
          { header: "DOB", dataKey: "dob" },
          { header: "Department", dataKey: "dep" }
        ]
      });
      pdf.save(`T ${new Date()}.pdf`);
    }
  }
};
</script>

<style lang="scss" scoped>
.All_Teacher {
  margin: 10px 10px 0 30px;
  display: flex;
  flex-direction: column;
  .Teacher_Upper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .Teacher_Title {
      font-size: 20px;
      font-weight: bold;
      margin: 0;
    }
    .Teacher_Left {
      display: flex;
    }
  }
  .content {
    margin-top: 40px;
  }
}
</style>
