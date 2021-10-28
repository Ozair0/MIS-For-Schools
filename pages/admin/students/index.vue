<template>
  <div class="All_Student">
    <div class="Student_Upper">
      <p class="Student_Title">All Students</p>
      <div class="Student_Left">
        <div :class="`btn-group${showDropDown ? ' show' : ''}`">
          <button
            @click.prevent="printToPdf"
            type="button"
            class="btn btn-info"
          >
            Generate Report
          </button>
        </div>
        <button
          @click.prevent="AddStudent()"
          class="btn btn-outline-primary shadow"
          style="border-radius: 25px;margin-left: 20px; border: none;"
        >
          <fa :icon="faUserPlus" /> New Student
        </button>
      </div>
    </div>
    <section class="content">
      <!-- Default box -->
      <div class="card">
        <div class="card-body p-0" style="display: block;">
          <table id="table_users" class="table table-striped projects">
            <thead>
              <tr>
                <th>
                  ID
                </th>
                <th>
                  Full Name
                </th>
                <th>
                  Parent
                </th>
                <th>
                  Grade
                </th>
                <th>
                  Joined Date
                </th>
                <th class="text-center">
                  Profile Image
                </th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(student, index) in students" :key="index">
                <td>
                  {{ student.userid }}
                </td>
                <td>
                  <a> {{ student.name }} {{ student.lastname }} </a>
                  <br />
                  <small>
                    DOB:
                    {{ new Date(student.dob).toLocaleDateString("en-US") }}
                  </small>
                </td>
                <td>
                  <a :href="`/parent/${student.parentid}`">{{
                    student.parent
                  }}</a>
                </td>
                <td>
                  {{ student.gradenumber }}
                  <!--                  <ul class="list-inline">-->
                  <!--                    <li class="list-inline-item">-->
                  <!--                      <img alt="Avatar" class="table-avatar" src="" />-->
                  <!--                    </li>-->
                  <!--                  </ul>-->
                </td>
                <td>
                  {{ new Date(student.datejoined).toLocaleDateString("en-US") }}
                </td>
                <td class="project-profile d-flex justify-content-center">
                  <nuxt-img
                    height="50"
                    width="50"
                    format="webp"
                    class="direct-chat-img"
                    :src="`/Uploads/Students/${student.profileimage}`"
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
      showDropDown: false,
      students: []
    };
  },
  created() {
    this.$axios.get("/api/student/all").then(res => {
      this.students = res.data;
    });
  },
  methods: {
    toggleDrop() {
      this.showDropDown = !this.showDropDown;
    },
    AddStudent() {
      this.$router.push("students/add_student");
    },
    printToPdf() {
      var pdf = new jsPDF();
      pdf.autoTable({
        body: [
          ...this.students.map(item => {
            return {
              id: item.userid,
              fullname: item.name + " " + item.lastname,
              parent: item.parent,
              grade: item.gradenumber,
              joindate: new Date(item.datejoined).toLocaleDateString("en-US")
            };
          })
        ],
        columns: [
          { header: "ID", dataKey: "id" },
          { header: "Full Name", dataKey: "fullname" },
          { header: "Parent", dataKey: "parent" },
          { header: "Grade", dataKey: "grade" },
          { header: "Joined Date", dataKey: "joindate" }
        ]
      });
      pdf.save(`S ${new Date()}.pdf`);
    }
  }
};
</script>

<style lang="scss" scoped>
.All_Student {
  margin: 10px 10px 0 30px;
  display: flex;
  flex-direction: column;
  .Student_Upper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .Student_Title {
      font-size: 20px;
      font-weight: bold;
      margin: 0;
    }
    .Student_Left {
      display: flex;
    }
  }
  .content {
    margin-top: 40px;
  }
}
</style>
