<template>
  <div class="All_Subject">
    <div class="Subject_Upper">
      <p class="Subject_Title">All Subjects</p>
      <div class="Subject_Left">
        <div class="btn-group">
          <button type="button" class="btn btn-info">
            Generate Report
          </button>
        </div>
        <button
          @click.prevent="AddSubject"
          class="btn btn-outline-primary shadow"
          style="border-radius: 25px;margin-left: 20px; border: none;"
        >
          <fa :icon="faUserPlus" /> New Subject
        </button>
      </div>
    </div>
    <section class="content">
      <!-- Default box -->
      <div class="card">
        <div class="card-body p-0" style="display: block;">
          <table class="table table-striped projects">
            <thead>
            <tr>
              <th>
                Subject
              </th>
              <th>
                Teacher
              </th>
              <th>
                Grade
              </th>
              <th>
                Classroom
              </th>
              <th class="text-center">Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(subject, index) in subjects" :key="index">
              <td>
                {{ subject.subject }}
              </td>
              <td>
                <a href="#">{{ subject.teacher }}</a>
              </td>
              <td>
                {{ subject.gradenumber }}
              </td>
              <td>
                {{ subject.roomnumber }}
              </td>
              <td class="project-actions text-center">
                <a class="btn btn-primary btn-sm" href="#">
                  <i class="fas fa-folder"> </i>
                  View
                </a>
                <a class="btn btn-info btn-sm" href="#">
                  <i class="fas fa-pencil-alt"> </i>
                  Edit
                </a>
                <a class="btn btn-danger btn-sm" href="#">
                  <i class="fas fa-trash"> </i>
                  Delete
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
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

export default {
  computed: {
    faUserPlus() {
      return faUserPlus;
    }
  },
  data() {
    return {
      subjects: []
    };
  },
  created() {
    this.$axios.get("/api/subject/all").then(res => {
      this.subjects = res.data;
    });
  },
  methods: {
    AddSubject() {
      this.$router.push("subjects/create_subject");
    }
  }
};
</script>

<style lang="scss" scoped>
.All_Subject {
  margin: 10px 10px 0 30px;
  display: flex;
  flex-direction: column;
  .Subject_Upper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .Subject_Title {
      font-size: 20px;
      font-weight: bold;
      margin: 0;
    }
    .Subject_Left {
      display: flex;
    }
  }
  .content {
    margin-top: 40px;
  }
}
</style>
