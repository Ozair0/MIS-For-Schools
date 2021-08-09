<template>
  <div class="Teacher_Add">
    <div class="card card-cyan">
      <div class="card-header">
        <h3 class="card-title">Add Teacher</h3>
      </div>
      <div class="errors_text" v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </div>

      <form class="card-body">
        <div class="card_input_f">
          <div class="form-group">
            <label for="inputName">Name</label>
            <input v-model="name" type="text" class="form-control" />
          </div>
          <div class="form-group">
            <label for="inputName">Last Name</label>
            <input v-model="lastname" type="text" class="form-control" />
          </div>
          <div class="form-group">
            <label>Select School</label>
            <select v-model="schoolid" class="form-control custom-select">
              <option selected="" disabled="">Select one</option>
              <option value="1">KIS Taimani</option>
              <option value="2">KIS Parwan 2</option>
            </select>
          </div>
          <div class="form-group">
            <label>UserID</label>
            <input v-model="userid" type="text" class="form-control" />
          </div>
          <!--          <div class="form-group">-->
          <!--            <label for="inputName">Joined Date</label>-->
          <!--            <input v-model="joindate" type="date" class="form-control" />-->
          <!--          </div>-->
        </div>
        <div class="card_input_f">
          <div class="form-group">
            <label>Select Department</label>
            <select v-model="departmentid" class="form-control custom-select">
              <option selected="" disabled="">Select one</option>
              <option value="1">BCS</option>
              <option value="2">HTS</option>
              <option value="3">IOM</option>
            </select>
          </div>
          <div class="form-group">
            <label>Password</label>
            <input v-model="password" type="password" class="form-control" />
          </div>
          <div class="form-group">
            <label>Upload Picture</label>
            <div class="custom-file">
              <input
                type="file"
                class="custom-file-input"
                accept=".jpeg,.png"
                id="exampleInputFile"
                @change="onFileChange()"
              />
              <label class="custom-file-label" for="exampleInputFile">{{
                selectedImage.name
              }}</label>
            </div>
          </div>
          <div class="form-group">
            <label>Salary</label>
            <input v-model="salary" type="number" class="form-control" />
          </div>
        </div>
        <div class="card_input_f">
          <div class="form-group">
            <label>Select Salary Type</label>
            <select v-model="salarytype" class="form-control custom-select">
              <option selected="" disabled="">Select one</option>
              <option value="1">AFN</option>
              <option value="2">USD</option>
            </select>
          </div>
          <div class="form-group">
            <label>DOB</label>
            <input v-model="dob" type="date" class="form-control" />
          </div>
          <div class="form-group">
            <label for="inputProjectLeader">Address</label>
            <input
              v-model="address"
              type="text"
              id="inputProjectLeader"
              class="form-control"
            />
          </div>
        </div>
      </form>

      <button class="btn btn-info mt-2" @click.prevent="addTeacher">
        Add Teacher
      </button>
      <!-- /.card-body -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedImage: "",
      name: null,
      lastname: null,
      schoolid: null,
      // joindate: null,
      userid: null,
      departmentid: null,
      password: null,
      address: null,
      salary: null,
      salarytype: null,
      dob: null,
      errors: []
    };
  },
  created() {},
  methods: {
    showAlert() {},
    onFileChange() {
      this.selectedImage = event.target.files[0];
    },
    checkErrors() {
      this.errors = [];
      if (this.name === null || this.name === undefined || this.name === "") {
        this.errors.push("Name Can't be empty!");
      }
      if (
        this.lastname === null ||
        this.lastname === undefined ||
        this.lastname === ""
      ) {
        this.errors.push("Last Name Can't be empty!");
      }
      if (
        this.schoolid === null ||
        this.schoolid === undefined ||
        this.schoolid === ""
      ) {
        this.errors.push("School Can't be empty!");
      }
      if (
        this.departmentid === null ||
        this.departmentid === undefined ||
        this.departmentid === ""
      ) {
        this.errors.push("Department Can't be empty!");
      }
      if (
        this.userid === null ||
        this.userid === undefined ||
        this.userid === ""
      ) {
        this.errors.push("UserID Can't be empty!");
      }
      if (this.dob === null || this.dob === undefined || this.dob === "") {
        this.errors.push("DOB Can't be empty!");
      }
      if (
        this.address === null ||
        this.address === undefined ||
        this.address === ""
      ) {
        this.errors.push("Address Can't be empty!");
      }
      if (
        this.salary === null ||
        this.salary === undefined ||
        this.salary === ""
      ) {
        this.errors.push("Salary Can't be empty!");
      }
      if (
        this.salarytype === null ||
        this.salarytype === undefined ||
        this.salarytype === ""
      ) {
        this.errors.push("Salary Type Can't be empty!");
      }
      if (
        this.selectedImage === null ||
        this.selectedImage === undefined ||
        this.selectedImage === ""
      ) {
        this.errors.push("Image Can't be empty!");
      }
      if (
        this.password === null ||
        this.password === undefined ||
        this.password.length < 6 ||
        this.password === ""
      ) {
        this.errors.push("Password Can't be empty or length less the 6!");
      }
    },
    addTeacher() {
      this.checkErrors();
      if (this.errors.length === 0) {
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
        const data = {
          name: this.name,
          lastname: this.lastname,
          schoolid: this.schoolid,
          departmentid: this.departmentid,
          userid: this.userid,
          password: this.password,
          // profileimage: this.profileimage,
          address: this.address,
          salary: this.salary,
          salarytype: this.salarytype,
          dob: this.dob
        };
        this.$axios
          .post("/api/teacher/new", data)
          .then(async res => {
            let formData = new FormData();
            formData.append("profile", this.selectedImage);
            formData.append("userid", res.data.id);
            await this.$axios
              .post("/api/teacher/image", formData, {
                headers: {
                  "Content-Type": "multipart/form-data"
                }
              })
              .then(() => {
                this.name = "";
                this.lastname = "";
                this.schoolid = "";
                this.departmentid = "";
                this.userid = "";
                this.password = "";
                this.selectedImage = "";
                this.address = "";
                this.salary = "";
                this.salarytype = "";
                this.dob = "";
                Toast.fire({
                  icon: "success",
                  title: "Teacher added successfully"
                });
              })
              .catch(e => {
                Toast.fire({
                  icon: "error",
                  title: "Error"
                });
              });
          })
          .catch(e => {
            Toast.fire({
              icon: "error",
              title: e.response.data.msg[0].msg
            });
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.Teacher_Add {
  margin: 50px 30px 0 30px;
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
