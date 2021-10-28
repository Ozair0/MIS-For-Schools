<template>
  <div class="Student_Promote">
    <div class="School_Upper">
      <p class="School_Title">Promote Student</p>
    </div>
    <section class="content">
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
                  Grade
                </th>
                <th>
                  Select Grade
                </th>
                <th class="text-center">
                  Profile Image
                </th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="student">
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
                  {{ student.gradenumber }}
                </td>
                <td>
                  <select v-model="gradeid" class="form-control custom-select">
                    <option selected="" disabled="">Select one</option>
                    <option
                      v-for="grade in grades"
                      :value="grade.id"
                      :key="grade.id"
                      >{{ grade.gradenumber }}</option
                    >
                  </select>
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
                  <a
                    @click.prevent="promoteStudent"
                    class="btn btn-primary btn-sm"
                  >
                    <i class="fas fa-folder"> </i>
                    Promote
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
export default {
  data() {
    return {
      student: null,
      gradeid: null,
      grades: []
    };
  },
  async created() {
    const data = {
      id: parseInt(this.$route.params.id)
    };
    await this.$axios.post(`/api/student/byid`, data).then(async res => {
      this.student = res.data;
      await this.$axios
        .post(`/api/grade/abyid`, { id: this.student.gradeid })
        .then(result => {
          this.grades = result.data;
          this.gradeid = result.data[0].id;
        });
    });
  },
  methods: {
    promoteStudent() {
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
      if (this.gradeid <= 12) {
        const data = {
          id: parseInt(this.$route.params.id),
          gradeid: this.gradeid
        };
        const data2 = {
          id: parseInt(this.$route.params.id)
        };
        this.$axios
          .post("/api/student/promotegradebyid", data)
          .then(async res => {
            await this.$axios
              .post("/api/student/promotebyid", data2)
              .then(result => {
                Toast.fire({
                  icon: "success",
                  title: "Student Promoted Successfully!"
                });
              })
              .catch(e => {
                Toast.fire({
                  icon: "error",
                  title: e.response.data.msg
                });
              });
          })
          .catch(e => {
            Toast.fire({
              icon: "error",
              title: "Student Can't Be Promoted!"
            });
          });
      } else {
        const data = {
          id: parseInt(this.$route.params.id),
          gradeid: this.gradeid
        };
        this.$axios
          .post("/api/student/promotegradebyid", data)
          .then(res => {
            Toast.fire({
              icon: "success",
              title: "Student Graduated!"
            });
          })
          .catch(e => {
            Toast.fire({
              icon: "error",
              title: "Student Can't Be Graduated!"
            });
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.Student_Promote {
  margin: 50px 30px 0 30px;
  .School_Upper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    .School_Title {
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
