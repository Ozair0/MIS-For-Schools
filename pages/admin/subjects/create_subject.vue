<template>
  <div class="Subject_Add">
    <div class="card card-cyan">
      <div class="card-header">
        <h3 class="card-title">Add Subject</h3>
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
            <label>Subject</label>
            <input v-model="subject" type="text" class="form-control" />
          </div>
          <div class="form-group">
            <label>Select Grade</label>
            <select v-model="grade" class="form-control custom-select">
              <option selected="" disabled="">Select one</option>
              <option
                v-for="(grade, index) in grades"
                :key="index"
                :value="grade.id"
              >{{ grade.gradenumber }}</option
              >
            </select>
          </div>
        </div>
      </form>

      <button class="btn btn-info mt-2" @click.prevent="addSubject">
        Add Subject
      </button>
      <!-- /.card-body -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      subject: null,
      grade: null,
      errors: [],
      grades: [],
    };
  },
  created() {
    this.$axios.get("/api/grade/allinfo").then(res => {
      this.grades = res.data;
    });
  },
  methods: {
    checkErrors() {
      this.errors = [];
      if (
        this.subject === null ||
        this.subject === undefined ||
        this.subject === ""
      ) {
        this.errors.push("Subject Can't be empty!");
      }
      if (
        this.grade === null ||
        this.grade === undefined ||
        this.grade === ""
      ) {
        this.errors.push("Grade Can't be empty!");
      }
    },
    addSubject() {
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
          name: this.subject,
          gradeid: this.grade
        };
        this.$axios
          .post("/api/subject/new", data)
          .then(async res => {
            this.subject = null;
            this.grade = null;
            Toast.fire({
              icon: "success",
              title: "Subject Created"
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
.Subject_Add {
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
      flex: 0 0 45%;
    }
  }
}
</style>
