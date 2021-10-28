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
                <th class="text-center">Actions</th>
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
                  />
                </td>
                <td>
                  <input
                    v-model="name"
                    type="text"
                    class="form-control"
                    placeholder="Name"
                  />
                </td>
                <td>
                  <input
                    v-model="lastname"
                    type="text"
                    class="form-control"
                    placeholder="Last Name"
                  />
                </td>
                <td class="project-actions text-center">
                  <a
                    class="btn btn-info btn-sm"
                    href="#"
                    @click.prevent="search"
                  >
                    <i class="fas fa-trash"> </i>
                    Search
                  </a>
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
                  ID
                </th>
                <th>
                  Full Name
                </th>
                <th class="text-center">
                  Profile Image
                </th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in users" :key="index">
                <td>
                  {{ user.userid }}
                </td>
                <td>
                  <a> {{ user.name }} {{ user.lastname }} </a>
                </td>
                <td class="project-profile d-flex justify-content-center">
                  <nuxt-img
                    height="50"
                    width="50"
                    format="webp"
                    class="direct-chat-img"
                    :src="`/Uploads/${info.picUrl}/${user.profileimage}`"
                    alt="Profile Image"
                  />
                </td>
                <td class="project-actions text-center">
                  <nuxt-link
                    :to="
                      `/admin/exams/show/${
                        user.id
                      }/${$route.params.type.trim()}`
                    "
                    class="btn btn-primary btn-sm"
                  >
                    <i class="fas fa-folder"> </i>
                    {{ info.linkTitle }}
                  </nuxt-link>
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
      users: [],
      name: null,
      lastname: null,
      userID: null
    };
  },
  created() {
    if (this.$route.params.type.trim() === "s") {
      this.info = {
        title: "Search Students",
        linkTitle: "View Student Marks",
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
          this.users = res.data;
        } else {
          this.users = [];
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
