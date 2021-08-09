<template>
  <div class="Parent_Add">
    <div class="card card-cyan">
      <div class="card-header">
        <h3 class="card-title">Add Parent</h3>
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
            <label for="inputProjectLeader">Address</label>
            <input
              v-model="address"
              type="text"
              id="inputProjectLeader"
              class="form-control"
            />
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
        </div>
      </form>

      <button class="btn btn-info mt-2" @click.prevent="addParent">
        Add Parent
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
      userid: null,
      password: null,
      address: null,
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
        this.password === null ||
        this.password === undefined ||
        this.password.length < 6 ||
        this.password === ""
      ) {
        this.errors.push("Password Can't be empty or length less the 6!");
      }
    },
    addParent() {
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
          userid: this.userid,
          password: this.password,
          address: this.address
        };
        this.$axios
          .post("/api/parent/new", data)
          .then(async res => {
            let formData = new FormData();
            formData.append("profile", this.selectedImage);
            formData.append("userid", res.data.id);
            await this.$axios
              .post("/api/parent/image", formData, {
                headers: {
                  "Content-Type": "multipart/form-data"
                }
              })
              .then(() => {
                this.name = "";
                this.lastname = "";
                this.userid = "";
                this.password = "";
                this.selectedImage = "";
                this.address = "";
                Toast.fire({
                  icon: "success",
                  title: "Parent added successfully"
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
.Parent_Add {
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
