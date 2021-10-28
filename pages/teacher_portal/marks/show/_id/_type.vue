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
                  Name
                </th>
                <th>
                  Grade
                </th>
                <th>
                  Classroom Number
                </th>
                <th>Select Student</th>
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
                      >{{ grade.name + " " + grade.lastname }}</option
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
                <th>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(att, index) in attendance" :key="index">
                <td>
                  <input
                    class="form-control col-2 text-center"
                    type="number"
                    v-model="f"
                  />
                </td>
                <td>
                  <input
                    class="form-control col-2 text-center"
                    type="number"
                    v-model="s"
                  />
                </td>
                <td>
                  {{ parseInt(f) + parseInt(s) }}
                </td>
                <td>
                  <button @click.prevent="addMarks" class="btn btn-info">
                    {{ !create ? "Update" : "Create" }}
                  </button>
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
      attendance: [
        {
          sscore: 0,
          fscore: 0
        }
      ],
      f: 0,
      s: 0,
      subjid: null,
      name: null,
      lastname: null,
      userID: null,
      grades: null,
      subjects: null,
      grade: null,
      subject: null,
      create: true
    };
  },
  created() {
    this.$axios
      .post("/api/subject/subjbyid", { id: this.$route.params.id })
      .then(async res => {
        this.name = res.data[0].name;
        this.lastname = res.data[0].gradenumber;
        this.userID = res.data[0].roomnumber;
        this.subjid = res.data[0].id;
        await this.$axios
          .post("/api/student/bysubid", {
            id: this.$route.params.id,
            gradeid: res.data[0].gradeid
          })
          .then(async res2 => {
            this.grades = res2.data;
            this.grade = res2.data[0].id;
            await this.$axios
              .post("/api/marks/markbyidsubjid", {
                studentid: res2.data[0].id,
                subjectid: res.data[0].id
              })
              .then(res3 => {
                if (res3.data.length > 0) {
                  this.attendance = res3.data;
                  this.f = res3.data[0].fscore;
                  this.s = res3.data[0].sscore;
                  this.create = false;
                }
              });
          });
      });

    if (this.$route.params.type.trim() === "s") {
      this.info = {
        title: "Search Students",
        linkTitle: "View Student Marks",
        urlName: "student",
        picUrl: "Students",
        applicant: "Student"
      };
    }
  },
  methods: {
    async selectGrade() {
      await this.$axios
        .post("/api/marks/markbyidsubjid", {
          studentid: this.grade,
          subjectid: this.subjid
        })
        .then(res3 => {
          if (res3.data.length > 0) {
            this.attendance = res3.data;
            this.f = res3.data[0].fscore;
            this.s = res3.data[0].sscore;
            this.create = false;
          } else {
            this.f = 0;
            this.s = 0;
          }
        });
    },
    async addMarks() {
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
      if (this.s > 60) {
        Toast.fire({
          icon: "error",
          title: `Second Score Can't Be More then 60!`
        });
      } else if (this.f > 40) {
        Toast.fire({
          icon: "error",
          title: `First Score Can't Be More then 40!`
        });
      } else {
        await this.$axios
          .post("/api/subject/addmarks", {
            subjectselectedid: this.subjid,
            fscore: parseInt(this.f),
            sscore: parseInt(this.s),
            totalscore: parseInt(this.f) + parseInt(this.s)
          })
          .then(res => {
            this.selectGrade();
            Toast.fire({
              icon: "success",
              title: `Marks Added!`
            });
          });
      }
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
