<template>
  <div class="Grade_Add">
    <div class="card card-cyan">
      <div class="card-header">
        <h3 class="card-title">Add Grade</h3>
      </div>
      <div class="errors_text" v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </div>

      <form class="card-body">
        <div class="form-group">
          <label>Grade</label>
          <input v-model="grade" type="text" class="form-control" />
        </div>
      </form>

      <button class="btn btn-info mt-2" @click.prevent="addGrade">
        Add Grade
      </button>
      <!-- /.card-body -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      grade: null,
      errors: []
    };
  },
  methods: {
    checkErrors() {
      this.errors = [];
      if (
        this.grade === null ||
        this.grade === undefined ||
        this.grade === ""
      ) {
        this.errors.push("Grade Can't be empty!");
      }
    },
    addGrade() {
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
          name: this.grade
        };
        this.$axios
          .post("/api/grade/new", data)
          .then(async res => {
            this.grade = null;
            Toast.fire({
              icon: "success",
              title: "Grade Created"
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
.Grade_Add {
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
