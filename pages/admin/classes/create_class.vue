<template>
  <div class="Class_Add">
    <div class="card card-cyan">
      <div class="card-header">
        <h3 class="card-title">Add Classroom</h3>
      </div>
      <div class="errors_text" v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </div>

      <form class="card-body">
        <div class="form-group">
          <label>Room Number</label>
          <input v-model="roomnumber" type="text" class="form-control" />
        </div>
      </form>

      <button class="btn btn-info mt-2" @click.prevent="addClassroom">
        Add Classroom
      </button>
      <!-- /.card-body -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roomnumber: null,
      errors: []
    };
  },
  methods: {
    checkErrors() {
      this.errors = [];
      if (
        this.roomnumber === null ||
        this.roomnumber === undefined ||
        this.roomnumber === ""
      ) {
        this.errors.push("Room Number Can't be empty!");
      }
    },
    addClassroom() {
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
          name: this.roomnumber
        };
        this.$axios
          .post("/api/classroom/new", data)
          .then(async res => {
            this.roomnumber = null;
            Toast.fire({
              icon: "success",
              title: "ClassRoom Created"
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
.Class_Add {
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
