<template>
  <div class="Student_Detail">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Profile</h1>
          </div>
        </div>
      </div>
      <!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-3">
            <!-- Profile Image -->
            <div class="card card-primary card-outline">
              <div class="card-body box-profile">
                <div class="text-center">
                  <nuxt-img
                    class="profile-user-img img-fluid img-circle"
                    format="webp"
                    :src="`/Uploads/Students/${student.profileimage}`"
                    alt="Profile Image"
                  />
                </div>

                <h3 class="profile-username text-center">
                  {{ student.name }} {{ student.lastname }}
                </h3>

                <p class="text-muted text-center">{{ student.gradenumber }}</p>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->

            <!-- About Me Box -->
            <div class="card card-primary">
              <div class="card-header">
                <h3 class="card-title">About</h3>
              </div>
              <!-- /.card-header -->
              <div class="card-body">
                <strong>Parent</strong>

                <p class="text-muted">
                  {{ student.parent }}
                </p>

                <hr />

                <strong>Address</strong>

                <p class="text-muted">{{ student.address }}</p>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
          <!-- /.col -->
          <div class="col-md-9">
            <div class="card">
              <div class="card-header p-2">
                <ul class="nav nav-pills">
                  <li class="nav-item">
                    <a
                      class="nav-link active"
                      href="#activity"
                      data-toggle="tab"
                      >Detail information</a
                    >
                  </li>
                  <!--                  <li class="nav-item">-->
                  <!--                    <a class="nav-link" href="#timeline" data-toggle="tab"-->
                  <!--                      >Timeline</a-->
                  <!--                    >-->
                  <!--                  </li>-->
                  <!--                  <li class="nav-item">-->
                  <!--                    <a class="nav-link" href="#settings" data-toggle="tab"-->
                  <!--                      >Settings</a-->
                  <!--                    >-->
                  <!--                  </li>-->
                </ul>
              </div>
              <!-- /.card-header -->
              <div class="card-body">
                <table id="table_users" class="table table-striped projects">
                  <thead>
                    <tr>
                      <th>
                        ID
                      </th>
                      <th>
                        Full Name
                      </th>
                      <th>
                        Parent
                      </th>
                      <th>
                        Grade
                      </th>
                      <th>
                        Joined Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        {{ student.userid }}
                      </td>
                      <td>
                        <a> {{ student.name }} {{ student.lastname }} </a>
                        <br />
                        <small>
                          DOB:
                          {{
                            new Date(student.dob).toLocaleDateString("en-US")
                          }}
                        </small>
                      </td>
                      <td>
                        <a :href="`/parent/${student.parentid}`">{{
                          student.parent
                        }}</a>
                      </td>
                      <td>
                        {{ student.gradenumber }}
                        <!--                  <ul class="list-inline">-->
                        <!--                    <li class="list-inline-item">-->
                        <!--                      <img alt="Avatar" class="table-avatar" src="" />-->
                        <!--                    </li>-->
                        <!--                  </ul>-->
                      </td>
                      <td>
                        {{
                          new Date(student.datejoined).toLocaleDateString(
                            "en-US"
                          )
                        }}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!-- /.tab-content -->
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
    </section>
    <!-- /.content -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      // student: null
    };
  },
  created() {},
  async asyncData(ctx) {
    let stuData = null;
    await ctx.$auth.fetchUser().then(async res => {
      await ctx.$axios
        .post("/api/student/byid", { id: res.data.user[0].id })
        .then(res2 => {
          stuData = res2.data;
          console.log(res2.data);
        });
    });
    return {
      student: stuData
    };
  }
};
</script>

<style lang="scss" scoped>
.Student_Detail {
  margin-left: 25px;
  margin-right: 25px;
}
</style>
