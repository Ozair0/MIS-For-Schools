<template>
  <div class="Student_Add">
    <div class="card card-cyan">
      <div class="card-header">
        <h3 class="card-title">Add Student</h3>
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
            <label>Select Parent</label>
            <select v-model="parentid" class="form-control custom-select">
              <option selected="" disabled="">Select one</option>
              <option value="1">Mahmood</option>
              <option value="2">Khan</option>
              <option value="3">Test</option>
            </select>
          </div>
          <div class="form-group">
            <label>Password</label>
            <input v-model="password" type="password" class="form-control" />
          </div>
          <div class="form-group">
            <label>Join Date</label>
            <input v-model="joindate" type="date" class="form-control" />
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
        </div>
        <div class="card_input_f">
          <div class="form-group">
            <label>DOB</label>
            <input v-model="dob" type="date" class="form-control" />
          </div>
          <div class="form-group">
            <label>Select Gender</label>
            <select v-model="gender" class="form-control custom-select">
              <option selected="" disabled="">Select one</option>
              <option value="1">Male</option>
              <option value="2">Female</option>
            </select>
          </div>
          <div class="form-group">
            <label>Select Grade</label>
            <select v-model="gradeid" class="form-control custom-select">
              <option selected="" disabled="">Select one</option>
              <option value="1">Grade 1</option>
              <option value="2">Grade 2</option>
              <option value="3">Grade 3</option>
            </select>
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

      <button class="btn btn-info mt-2" @click.prevent="addStudent">
        Add Student
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
      joindate: null,
      userid: null,
      password: null,
      address: null,
      parentid: null,
      gradeid: null,
      gender: null,
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
        this.parentid === null ||
        this.parentid === undefined ||
        this.parentid === ""
      ) {
        this.errors.push("Parent Can't be empty!");
      }
      if (
        this.userid === null ||
        this.userid === undefined ||
        this.userid === ""
      ) {
        this.errors.push("UserID Can't be empty!");
      }
      if (
        this.address === null ||
        this.address === undefined ||
        this.address === ""
      ) {
        this.errors.push("Address Can't be empty!");
      }
      if (
        this.selectedImage === null ||
        this.selectedImage === undefined ||
        this.selectedImage === ""
      ) {
        this.errors.push("Image Can't be empty!");
      }
      if (
        this.joindate === null ||
        this.joindate === undefined ||
        this.joindate === ""
      ) {
        this.errors.push("Join Date Can't be empty!");
      }
      if (this.dob === null || this.dob === undefined || this.dob === "") {
        this.errors.push("DOB Can't be empty!");
      }
      if (
        this.gradeid === null ||
        this.gradeid === undefined ||
        this.gradeid === ""
      ) {
        this.errors.push("Grade Can't be empty!");
      }
      if (
        this.gender === null ||
        this.gender === undefined ||
        this.gender === ""
      ) {
        this.errors.push("Gender Can't be empty!");
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
    addStudent() {
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
          parentid: this.parentid,
          userid: this.userid,
          password: this.password,
          gender: this.gender,
          gradeid: this.gradeid,
          joindate: this.joindate,
          address: this.address,
          dob: this.dob
        };
        this.$axios
          .post("/api/student/new", data)
          .then(async res => {
            let formData = new FormData();
            formData.append("profile", this.selectedImage);
            formData.append("userid", res.data.id);
            await this.$axios
              .post("/api/student/image", formData, {
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
                this.gender = "";
                this.gradeid = "";
                this.dob = "";
                this.parentid = "";
                this.joindate = "";
                Toast.fire({
                  icon: "success",
                  title: "Student added successfully"
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
.Student_Add {
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
