<template>
  <div class="All_Parent">
    <div class="Parent_Upper">
      <p class="Parent_Title">All Parents</p>
      <div class="Parent_Left">
        <div class="btn-group">
          <button type="button" class="btn btn-info">
            Generate Report
          </button>
        </div>
        <button
          @click.prevent="AddParent"
          class="btn btn-outline-primary shadow"
          style="border-radius: 25px;margin-left: 20px; border: none;"
        >
          <fa :icon="faUserPlus" /> New Parent
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
                  ID
                </th>
                <th>
                  Full Name
                </th>
                <th class="text-center">
                  Profile Image
                </th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(parent, index) in parents" :key="index">
                <td>
                  {{ parent.userid }}
                </td>
                <td>
                  <a> {{ parent.name }} {{ parent.lastname }} </a>
                  <br />
                  <small> DOB: {{ parent.dob }} </small>
                </td>
                <td class="project-profile d-flex justify-content-center">
                  <nuxt-img
                    height="50"
                    width="50"
                    format="webp"
                    class="direct-chat-img"
                    :src="`/Uploads/Parents/${parent.profileimage}`"
                    alt="Profile Image"
                  />
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
      parents: []
    };
  },
  created() {
    this.$axios.get("/api/parent/all").then(res => {
      this.parents = res.data;
    });
  },
  methods: {
    AddParent() {
      this.$router.push("parent/add_parent");
    }
  }
};
</script>

<style lang="scss" scoped>
.All_Parent {
  margin: 10px 10px 0 30px;
  display: flex;
  flex-direction: column;
  .Parent_Upper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .Parent_Title {
      font-size: 20px;
      font-weight: bold;
      margin: 0;
    }
    .Parent_Left {
      display: flex;
    }
  }
  .content {
    margin-top: 40px;
  }
}
</style>
