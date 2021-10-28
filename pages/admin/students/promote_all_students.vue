<template>
  <div class="Student_Promote">
    <div class="School_Upper">
      <p class="School_Title">All Schools</p>
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
                  Address
                </th>
                <th>
                  Image
                </th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="school in schools" :key="school.id">
                <td>
                  {{ school.schoolname }}
                </td>
                <td>
                  {{ school.address }}
                </td>
                <td>
                  <nuxt-img
                    height="50"
                    width="50"
                    format="webp"
                    class="direct-chat-img"
                    :src="`/${school.profileimage}`"
                    alt="Profile Image"
                  />
                </td>
                <td class="project-actions text-center">
                  <a
                    class="btn btn-info btn-sm"
                    href="#"
                    @click.prevent="promoteStudents"
                  >
                    <i class="fas fa-trash"> </i>
                    Promote All Students
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
      schools: []
    };
  },
  created() {
    this.$axios.get("/api/school/allinfo").then(res => {
      this.schools = res.data;
    });
  },
  methods: {
    promoteStudents() {
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
      this.$axios.get("/api/student/promotegrade").then(async () => {
        await this.$axios
          .get("/api/student/promotallstudents")
          .then(res => {
            Toast.fire({
              icon: "success",
              title: "Students Promoted Successfully!"
            });
          })
          .catch(e => {
            console.log(e.response.data);
            Toast.fire({
              icon: "error",
              title: e.response.data.msg
            });
          });
      });
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
