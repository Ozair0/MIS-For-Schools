<template>
  <div class="All_Students">
    <div class="Student_Upper">
      <p class="Student_Title">Attendance</p>
      <div class="Class_Left mr-4">
        <label>Select Date</label>
        <input @change.prevent="dateChange" v-model="adate" type="date" class="form-control"/>

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
                Name
              </th>
              <th>
                Student ID
              </th>
              <th>
                Present
              </th>
              <th class="text-center">Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(student, index) in students" :key="index">
              <td>
                <a> {{ student.name }} </a>
              </td>
              <td>
                <a> {{ student.userid }} </a>
              </td>
              <td>
                <a> {{ }} </a>

                <input v-if="student.present === true" type="checkbox" checked disabled/>
                <input v-else-if="student.present === false" type="checkbox" disabled/>
                <p v-else>No Attendance</p>
              </td>
              <td class="project-actions text-center">
                <a :class="`btn btn-primary btn-sm${allowed ? '' : ' disabled'}`"
                   @click.prevent="addAttendance(true,student.id,student.subjectid)" href="">
                  <i class="fas fa-pencil-alt"> </i>
                  Present
                </a>
                <a :class="`btn btn-danger btn-sm${allowed ? '' : ' disabled'}`"
                   @click.prevent="addAttendance(false,student.id,student.subjectid)" href="">
                  <i class="fas fa-pencil-alt"> </i>
                  Unspent
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
import {faUserPlus} from "@fortawesome/free-solid-svg-icons";

export default {
  data() {
    return {
      dateC: null
    }
  },
  asyncData({params, redirect, $axios}) {
    const data = {
      adate: `${params.date}`,
      subjectid: params.id
    };
    const data2 = {
      adate: `${params.date}`
    };
    return $axios.post("/api/studentattendance/getStudentsAttendanceBySubjectID", data).then(res => {
      return $axios.post("/api/studentattendance/allowed", data2).then(res2 => {
        console.log(res2.data)
        return {
          students: res.data,
          allowed: res2.data.allowed,
          adate: params.date,
          pageid: params.id
        }
      })

    });
  },
  computed: {
    faUserPlus() {
      return faUserPlus;
    }
  },

  methods: {
    dateChange() {
      console.log(this.adate)
      const data2 = {
        adate: `${this.adate}`,
        subjectid: this.pageid
      }
      const data3 = {
        adate: `${this.adate}`
      };
      this.$axios.post("/api/studentattendance/getStudentsAttendanceBySubjectID", data2).then(res2 => {
        this.$axios.post("/api/studentattendance/allowed", data3).then(res3 => {
          this.students = res2.data;
          this.allowed = res3.data.allowed;
        })
      });
    },
    addAttendance(present, studentid, subjectid) {
      const data = {
        present,
        adate: `${this.adate}`,
        studentid,
        subjectid
      }
      this.$axios.post('/api/studentattendance/new', data).then(res => {
        const data2 = {
          adate: `${this.adate}`,
          subjectid: this.pageid
        }
        const data3 = {
          adate: `${this.adate}`
        };
        this.$axios.post("/api/studentattendance/getStudentsAttendanceBySubjectID", data2).then(res2 => {
          this.$axios.post("/api/studentattendance/allowed", data3).then(res3 => {
            this.students = res2.data;
            this.allowed = res3.data.allowed;
          })
        });
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.All_Students {
  margin: 10px 10px 0 30px;
  display: flex;
  flex-direction: column;

  .Student_Upper {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .Student_Title {
      font-size: 20px;
      font-weight: bold;
      margin: 0;
    }

    .Student_Left {
      display: flex;
    }
  }

  .content {
    margin-top: 40px;
  }
}
</style>
