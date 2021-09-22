<template>
  <div class="Department_Add">
    <div class="card card-cyan">
      <div class="card-header">
        <h3 class="card-title">Add Department</h3>
      </div>
      <div class="errors_text" v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </div>

      <form class="card-body">
        <div class="form-group">
          <label>Department Name</label>
          <input v-model="name" type="text" class="form-control" />
        </div>
      </form>

      <button class="btn btn-info mt-2" @click.prevent="addDepartment">
        Add Department
      </button>
      <!-- /.card-body -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: null,
      errors: []
    };
  },
  methods: {
    checkErrors() {
      this.errors = [];
      if (
        this.name === null ||
        this.name === undefined ||
        this.name === ""
      ) {
        this.errors.push("Department Name Can't be empty!");
      }
    },
    addDepartment() {
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
          name: this.name
        };
        this.$axios
          .post("/api/department/new", data)
          .then(async res => {
            this.name = null;
            Toast.fire({
              icon: "success",
              title: "Department Created"
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
.Department_Add {
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
