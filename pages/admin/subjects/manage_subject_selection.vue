<template>
  <div class="S_S_M">
    <h4>Manage Subject Selection</h4>
    <section class="content">
      <!-- Default box -->
      <div class="card">
        <div class="card-body p-0" style="display: block;">
          <table class="table table-striped projects">
            <thead>
              <tr>
                <th>
                  Manage Selection
                </th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  Subject Selection
                </td>
                <td class="project-actions text-center">
                  <a
                    v-if="allow"
                    @click.prevent="changeSelection"
                    class="btn btn-danger btn-sm"
                    href="#"
                  >
                    <i class="fas fa-pencil-alt"> </i>
                    Close Selection
                  </a>
                  <a
                    v-else
                    @click.prevent="changeSelection"
                    class="btn btn-primary btn-sm"
                    href="#"
                  >
                    <i class="fas fa-folder"> </i>
                    Allow Selection
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
export default {
  data() {
    return {
      allow: null
    };
  },
  created() {
    this.$axios.get("/api/subject/checkselection").then(res => {
      this.allow = res.data[0].allow;
    });
  },
  methods: {
    changeSelection() {
      const data = {
        status: !this.allow
      };
      this.$axios.post("/api/subject/allowselection", data).then(() => {
        this.$axios.get("/api/subject/checkselection").then(res => {
          this.allow = res.data[0].allow;
        });
      });
    }
  }
};
</script>
<style lang="scss">
.S_S_M {
  margin: 40px 10px 0 30px;
  display: flex;
  flex-direction: column;
  .content {
    margin-top: 30px;
  }
}
</style>
