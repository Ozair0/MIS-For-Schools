<template>
  <div class="Attendance_Search">
    <div class="Attendance_Upper">
      <p class="Attendance_Title">{{ info.title }}</p>
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
                  Name
                </th>
                <th>
                  Last Name
                </th>
                <th>Select Grade</th>
                <th>Select Subject</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    v-model="userID"
                    type="text"
                    class="form-control"
                    placeholder="User ID"
                    disabled
                  />
                </td>
                <td>
                  <input
                    v-model="name"
                    type="text"
                    class="form-control"
                    placeholder="Name"
                    disabled
                  />
                </td>
                <td>
                  <input
                    v-model="lastname"
                    type="text"
                    class="form-control"
                    placeholder="Last Name"
                    disabled
                  />
                </td>
                <td>
                  <select
                    @change.prevent="selectGrade"
                    v-model="grade"
                    class="form-control"
                  >
                    <option
                      v-for="grade in grades"
                      :key="grade.id"
                      :value="grade.id"
                      >{{ grade.gradenumber }}</option
                    >
                  </select>
                </td>
                <td>
                  <select @change.prevent="selectSubject" class="form-control">
                    <option
                      v-for="sub in subjects"
                      :key="sub.id"
                      :value="sub.id"
                      >{{ sub.name }}</option
                    >
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- /.card-body -->
      </div>
      <div class="card">
        <div class="card-body p-0" style="display: block;">
          <table class="table table-striped projects">
            <thead>
              <tr>
                <th>
                  First Score
                </th>
                <th>
                  Second Score
                </th>
                <th>
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(att, index) in attendance"
                :key="index"
                :class="att.sscore + att.fscore < 60 ? 'bg-danger' : ''"
              >
                <td>
                  <a> {{ att.sscore }} </a>
                </td>
                <td>{{ att.fscore }}</td>
                <td>
                  {{ att.sscore + att.fscore }}
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
export default {
  data() {
    return {
      info: null,
      attendance: [],
      name: null,
      lastname: null,
      userID: null,
      grades: null,
      subjects: null,
      grade: null,
      subject: null
    };
  },
  created() {
    this.$axios
      .post("/api/student/byid", { id: this.$route.params.id })
      .then(async res => {
        this.name = res.data.name;
        this.lastname = res.data.lastname;
        this.userID = res.data.userid;
        await this.$axios.get(`/api/grade/allinfo`).then(async res2 => {
          this.grades = res2.data;
          this.grade = res.data.gradeid;
          await this.$axios
            .post("/api/subject/subjbyidgradejid", {
              studentid: res.data.id,
              gradeid: this.grade
            })
            .then(async res3 => {
              this.subjects = res3.data;
              this.subject = res3.data[0].id;
              await this.$axios
                .post("/api/marks/markbyidsubjid", {
                  studentid: res.data.id,
                  subjectid: res3.data[0].id
                })
                .then(res4 => {
                  this.attendance = res4.data;
                });
            });
        });
      });
    if (this.$route.params.type.trim() === "s") {
      this.info = {
        title: "Search Students",
        linkTitle: "View Student Attendance",
        urlName: "student",
        picUrl: "Students",
        applicant: "Student"
      };
    } else if (this.$route.params.type.trim() === "t") {
      this.info = {
        title: "Search Teachers",
        linkTitle: "View Teacher Attendance",
        urlName: "teacher",
        picUrl: "Teachers",
        applicant: "Teacher"
      };
    } else if (this.$route.params.type.trim() === "e") {
      this.info = {
        title: "Search Employees",
        linkTitle: "View Employee Attendance",
        urlName: "employee",
        picUrl: "Employees",
        applicant: "Employee"
      };
    } else {
      this.$router.push("/admin/attendance");
    }
  },
  methods: {
    async selectGrade() {
      await this.$axios
        .post("/api/subject/subjbyidgradejid", {
          studentid: this.$route.params.id,
          gradeid: this.grade
        })
        .then(async res3 => {
          if (res3.data.length > 0) {
            this.subjects = res3.data;
            this.subject = res3.data[0].id;
            await this.$axios
              .post("/api/marks/markbyidsubjid", {
                studentid: this.$route.params.id,
                subjectid: res3.data[0].id
              })
              .then(res4 => {
                this.attendance = res4.data;
              });
          } else {
            this.attendance = [];
            this.subjects = [];
          }
        });
    },
    async selectSubject() {
      await this.$axios
        .post("/api/marks/markbyidsubjid", {
          studentid: this.$route.params.id,
          subjectid: this.subject
        })
        .then(res4 => {
          this.attendance = res4.data;
        });
    },
    search() {
      const data = {
        id:
          this.userID === null ||
          this.userID.trim() === "" ||
          this.userID === undefined
            ? "0"
            : this.userID,
        name:
          this.name === null ||
          this.name.trim() === "" ||
          this.name === undefined
            ? "null"
            : this.name,
        lastname:
          this.lastname === null ||
          this.lastname.trim() === "" ||
          this.lastname === undefined
            ? "null"
            : this.lastname
      };
      this.$axios.post(`/api/${this.info.urlName}/byidnl`, data).then(res => {
        const Toast = this.$swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: toast => {
            toast.addEventListener("mouseenter", this.$swal.stopTimer);
            toast.addEventListener("mouseleave", this.$swal.resumeTimer);
          }
        });
        if (res.data.length > 0) {
          Toast.fire({
            icon: "success",
            title: `${this.info.applicant} matching found!`
          });
          this.students = res.data;
        } else {
          this.students = [];
          Toast.fire({
            icon: "error",
            title: `${this.info.applicant} not found!`
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.Attendance_Search {
  margin: 50px 30px 0 30px;
  .Attendance_Upper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    .Attendance_Title {
      font-size: 20px;
      font-weight: bold;
      margin: 0;
    }
  }
  .errors_text {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
    ul {
      li {
        color: red;
      }
    }
  }
  .card_input_f {
    display: flex;
    justify-content: space-between;
    .form-group {
      flex: 0 0 23%;
    }
  }
}
</style>
