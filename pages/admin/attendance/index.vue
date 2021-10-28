<template>
  <div class="Attendance_Page">
    <div class="Attendance_Upper">
      <p class="Attendance_Title">Select Attendance</p>
    </div>
    <section class="content">
      <!-- Default box -->
      <div class="card">
        <div class="card-body p-0" style="display: block;">
          <table class="table table-striped projects">
            <thead>
              <tr>
                <th>
                  School Name
                </th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="school in schools" :key="school.id">
                <td>
                  {{ school.schoolname }}
                </td>
                <td class="project-actions text-center">
                  <nuxt-link
                    :to="`attendance/view/${school.id}/s`"
                    class="btn btn-info btn-sm"
                    href=""
                  >
                    <i class="fas fa-trash"> </i>
                    Students
                  </nuxt-link>
                  <!--                  <nuxt-link-->
                  <!--                    :to="`attendance/view/${school.id}/t`"-->
                  <!--                    class="btn btn-info btn-sm"-->
                  <!--                    href=""-->
                  <!--                  >-->
                  <!--                    <i class="fas fa-trash"> </i>-->
                  <!--                    Teachers-->
                  <!--                  </nuxt-link>-->
                  <!--                  <nuxt-link-->
                  <!--                    :to="`attendance/view/${school.id}/e`"-->
                  <!--                    class="btn btn-info btn-sm"-->
                  <!--                    href=""-->
                  <!--                  >-->
                  <!--                    <i class="fas fa-trash"> </i>-->
                  <!--                    Employees-->
                  <!--                  </nuxt-link>-->
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
export default {
  data() {
    return {
      schools: []
    };
  },
  created() {
    this.$axios.get("/api/school/allinfo").then(res => {
      this.schools = res.data;
    });
  }
};
</script>

<style lang="scss" scoped>
.Attendance_Page {
  margin: 50px 30px 0 30px;
  .Attendance_Upper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    .Attendance_Title {
      font-size: 20px;
      font-weight: bold;
      margin: 0;
    }
  }
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
