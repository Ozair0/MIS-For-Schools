<template>
  <div class="All_Class">
    <div class="Class_Upper">
      <p class="Class_Title">All Classrooms</p>
      <div class="Class_Left">
        <div class="btn-group">
          <button type="button" class="btn btn-info">
            Generate Report
          </button>
        </div>
        <button
          @click.prevent="AddClass"
          class="btn btn-outline-primary shadow"
          style="border-radius: 25px;margin-left: 20px; border: none;"
        >
          <fa :icon="faUserPlus" /> New Classroom
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
                  Classroom Number
                </th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(classroom, index) in classrooms" :key="index">
                <td>
                  <a> {{ classroom.roomnumber }} </a>
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
      classrooms: []
    };
  },
  created() {
    this.$axios.get("/api/classroom/all").then(res => {
      this.classrooms = res.data;
    });
  },
  methods: {
    AddClass() {
      this.$router.push("classes/create_class");
    }
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
