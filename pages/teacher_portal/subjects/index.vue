<template>
  <div class="All_Class">
    <div class="Class_Upper">
      <p class="Class_Title">All Subjects Currently Teaching</p>

    </div>
    <section class="content">
      <!-- Default box -->
      <div class="card">
        <div class="card-body p-0" style="display: block;">
          <table class="table table-striped projects">
            <thead>
            <tr>
              <th>
                Name
              </th>
              <th>
                Grade
              </th>
              <th>
                Classroom Number
              </th>
              <th class="text-center">Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(subject, index) in subjects" :key="index">
              <td>
                <a> {{ subject.name }} </a>
              </td>
              <td>
                <a> {{ subject.gradenumber }} </a>
              </td>              <td>
                <a> {{ subject.roomnumber }} </a>
              </td>
              <td class="project-actions text-center">
                <nuxt-link :to="`attendance/${subject.id}/${new Date().getFullYear()}-${new Date().getMonth()+1 < 10 ? '0'+(new Date().getMonth()+1):new Date().getMonth()+1}-${new Date().getDate() < 10 ? '0'+new Date().getDate():new Date().getDate()}`" class="btn btn-primary btn-sm">
                  <i class="fas fa-folder"> </i>
                  Attendance
                </nuxt-link>
                <a class="btn btn-info btn-sm" href="#">
                  <i class="fas fa-pencil-alt"> </i>
                  Upload Resources
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
    this.$axios.get("/api/subject/subjectThoughtByTeacher").then(res => {
      this.subjects = res.data;
    });
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
.All_Class {
  margin: 10px 10px 0 30px;
  display: flex;
  flex-direction: column;
  .Class_Upper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .Class_Title {
      font-size: 20px;
      font-weight: bold;
      margin: 0;
    }
    .Class_Left {
      display: flex;
    }
  }
  .content {
    margin-top: 40px;
  }
}
</style>
