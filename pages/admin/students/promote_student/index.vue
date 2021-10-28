<template>
  <div class="Student_Promote">
    <div class="School_Upper">
      <p class="School_Title">Search Student</p>
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
                    @click.prevent="searchStudents"
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
                  <nuxt-link
                    :to="`promote_student/${student.id}`"
                    class="btn btn-primary btn-sm"
                  >
                    <i class="fas fa-folder"> </i>
                    Promote
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
      students: [],
      name: null,
      lastname: null,
      userID: null
    };
  },
  methods: {
    searchStudents() {
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
      this.$axios.post("/api/student/byidnl", data).then(res => {
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
            title: "Student matching found!"
          });
          this.students = res.data;
        } else {
          this.students = [];
          Toast.fire({
            icon: "error",
            title: "Student not found!"
          });
        }
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
