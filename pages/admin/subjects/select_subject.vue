<template>
  <div class="All_Student" v-if="allowSelection">
    <div class="Student_Upper">
      <p class="Student_Title">All Subjects</p>
      <div class="Student_Left">
        <div :class="`btn-group mr-3${showDropDown ? ' show' : ''}`">
          <button
            type="button"
            class="btn btn-info dropdown-toggle dropdown-icon"
            data-toggle="dropdown"
            :aria-expanded="`${showDropDown ? 'true' : 'false'}`"
            @click.prevent="toggleDrop()"
          >
            <div
              :class="`dropdown-menu${showDropDown ? ' show' : ''}`"
              style="width: min-content; min-width: min-content"
              role="menu"
              x-placement="bottom-start"
            >
              <a
                class="dropdown-item"
                href=""
                v-for="grade in grades"
                :key="grade.id"
                @click.passive="selectGrade(grade.id)"
                >{{ grade.title }}</a
              >
            </div>
          </button>
          <button type="button" class="btn btn-info">
            {{ gradeSelected.title }}
          </button>
        </div>
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
                  Subject Name
                </th>
                <th>
                  Grade
                </th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(subject, index) in subjects" :key="index">
                <td>
                  {{ subject.name }}
                </td>
                <td>
                  <a> {{ gradeSelected.title }} </a>
                </td>
                <td class="project-actions text-center">
                  <a
                    class="btn btn-primary btn-sm"
                    @click.prevent="viewClasses(subject.id)"
                    href="#"
                  >
                    <i class="fas fa-folder"> </i>
                    View Classes
                  </a>
                  <a
                    class="btn btn-info btn-sm"
                    @click.prevent="addClass(subject.id)"
                    href="#"
                  >
                    <i class="fas fa-pencil-alt"> </i>
                    Add Classes
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
    <button :class="`btn btn-info`" @click.prevent="createClasses">
      {{ allowCreate ? "Create Classes" : "Update Classes" }}
    </button>
  </div>
  <div class="selection_close_div" v-else>
    <h4 class="selection_close shadow-lg">Subject Selection Closed!</h4>
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
      grades: [
        {
          title: "Grade 1",
          id: 1
        },
        {
          title: "Grade 2",
          id: 2
        },
        {
          title: "Grade 3",
          id: 3
        },
        {
          title: "Grade 4",
          id: 4
        },
        {
          title: "Grade 5",
          id: 5
        },
        {
          title: "Grade 6",
          id: 6
        },
        {
          title: "Grade 7",
          id: 7
        },
        {
          title: "Grade 8",
          id: 8
        },
        {
          title: "Grade 9",
          id: 9
        },
        {
          title: "Grade 10",
          id: 10
        },
        {
          title: "Grade 11",
          id: 11
        },
        {
          title: "Grade 12",
          id: 12
        }
      ],
      gradeSelected: {
        title: "Grade 1",
        id: 1
      },
      showDropDown: false,
      subjects: [],
      inputsHtml: "",
      classes: [],
      teachers: [],
      classrooms: [],
      starttimes: [],
      endtimes: [],
      timeOfTheDay: "Morning",
      allowCreate: false,
      allowSelection: false
    };
  },
  created() {
    this.$axios.get("/api/subject/checkselection").then(res => {
      this.allowSelection = res.data[0].allow;
      if (this.allowSelection) {
        this.$axios
          .get(`/api/subject/bygrade?id=${this.gradeSelected.id}`)
          .then(res => {
            this.subjects = res.data;
          });
        this.$axios
          .get(`/api/teacher/bygrade?id=${this.gradeSelected.id}`)
          .then(res => {
            this.teachers = res.data;
          });
        this.$axios.get("/api/classroom/allinfo").then(res => {
          this.classrooms = res.data;
        });
        this.$axios
          .get(`/api/time/sbytime?time=${this.timeOfTheDay}`)
          .then(res => {
            this.starttimes = res.data;
          });
        this.$axios
          .get(`/api/time/ebytime?time=${this.timeOfTheDay}`)
          .then(res => {
            this.endtimes = res.data;
          });
        this.$axios
          .get(
            `/api/subject/subjectgradecheck?gradeid=${this.gradeSelected.id}`
          )
          .then(res => {
            this.allowCreate = res.data.allow;
            if (!this.allowCreate) {
              this.$axios
                .get(
                  `/api/subject/subjectbygrade?gradeid=${this.gradeSelected.id}`
                )
                .then(res => {
                  res.data.map(item => {
                    this.classes.push({
                      id: item.ssid,
                      subjectid: item.id,
                      teacher: [
                        {
                          id: item.tid,
                          name: item.tname,
                          lastname: item.tlastname
                        }
                      ],
                      room: [
                        {
                          id: item.cid,
                          roomnumber: item.roomnumber
                        }
                      ],
                      start: [
                        {
                          id: item.sid,
                          stime: item.stime
                        }
                      ],
                      end: [
                        {
                          id: item.eid,
                          etime: item.etime
                        }
                      ]
                    });
                  });
                  console.log(this.classes);
                });
            }
          });
      }
    });
  },

  methods: {
    createClasses() {
      // subjectid, teacherid, classroomid, start, end, time
      if (this.classes.length > 0 && this.allowCreate) {
        this.classes.map(subject => {
          const data = {
            subjectid: subject.subjectid,
            teacherid: subject.teacher[0].id,
            classroomid: subject.room[0].id,
            start: subject.start[0].id,
            end: subject.end[0].id,
            time: "Morning"
          };
          this.$axios.post("/api/subject/createsubject", data);
        });
      } else if (this.classes.length > 0 && !this.allowCreate) {
        this.classes.map(subject => {
          const data = {
            id:
              subject.id === null ||
              subject.id === "" ||
              subject.id === undefined
                ? 0
                : subject.id,
            subjectid: subject.subjectid,
            teacherid: subject.teacher[0].id,
            classroomid: subject.room[0].id,
            start: subject.start[0].id,
            end: subject.end[0].id,
            time: "Morning"
          };
          this.$axios.post("/api/subject/updatesubject", data);
        });
      }
      this.$router.go(0);
    },
    toggleDrop() {
      this.showDropDown = !this.showDropDown;
    },
    selectGrade(id) {
      this.grades.filter(item => {
        if (item.id === id) {
          this.gradeSelected = item;
          this.$axios.get(`/api/subject/bygrade?id=${id}`).then(res => {
            this.subjects = res.data;
          });
          this.$axios.get(`/api/teacher/bygrade?id=${id}`).then(res => {
            this.teachers = res.data;
          });
          this.$axios
            .get(
              `/api/subject/subjectgradecheck?gradeid=${this.gradeSelected.id}`
            )
            .then(res => {
              this.allowCreate = res.data.allow;
              this.classes = [];
              if (!this.allowCreate) {
                this.$axios
                  .get(
                    `/api/subject/subjectbygrade?gradeid=${this.gradeSelected.id}`
                  )
                  .then(res => {
                    res.data.map(item => {
                      this.classes.push({
                        subjectid: item.id,
                        teacher: [
                          {
                            id: item.tid,
                            name: item.tname,
                            lastname: item.tlastname
                          }
                        ],
                        room: [
                          {
                            id: item.cid,
                            roomnumber: item.roomnumber
                          }
                        ],
                        start: [
                          {
                            id: item.sid,
                            stime: item.stime
                          }
                        ],
                        end: [
                          {
                            id: item.eid,
                            etime: item.etime
                          }
                        ]
                      });
                    });
                    console.log(this.classes);
                  });
              }
            });
        }
      });
    },
    viewClasses(id) {
      let classes = [];
      if (this.classes.length > 0) {
        classes.push(this.classes.filter(item => item.subjectid === id));
      }
      this.inputsHtml = "";
      // this.inputsHtml += `<div class="d-flex flex-column">`;
      // this.inputsHtml += `<div class="d-flex flex-row align-items-center"><label class="pad_l">Teacher&nbsp;&nbsp;</label><input style="height: 35px" type="text" id="swal-input-3" class="form-control col-3"></div>`;
      this.inputsHtml += `
          <table class="table table-striped projects">
            <thead>
            <tr>
              <th>
                Teacher
              </th>
              <th>
                ClassRoom
              </th>
              <th>
                Start Time
              </th>
              <th>End Time</th>
            </tr>
            </thead>
            <tbody>
      `;
      if (classes.length > 0) {
        for (let i = 0; i < classes[0].length; i++) {
          this.inputsHtml += `
        <tr>
       <td>${classes[0][i].teacher[0].name} ${classes[0][i].teacher[0].lastname}</td>
       <td>${classes[0][i].room[0].roomnumber}</td>
       <td>${classes[0][i].start[0].stime}</td>
       <td>${classes[0][i].end[0].etime}</td>
       </tr>
        `;
        }
      }
      this.inputsHtml += `</tbody></table>`;
      // this.inputsHtml += `</div>`;
      this.inputsHtml += `<br>`;
      this.$swal.fire({
        title: "View Classes",
        html: this.inputsHtml,
        focusConfirm: false,
        customClass: "col-9",
        showConfirmButton: !this.allowCreate,
        inputAttributes: {
          maxlength: 32
        },

        showCancelButton: true,
        confirmButtonText: "Update",
        preConfirm: () => {
          this.inputsHtml = "";
          // this.inputsHtml += `<div class="d-flex flex-column">`;
          // this.inputsHtml += `<div class="d-flex flex-row align-items-center"><label class="pad_l">Teacher&nbsp;&nbsp;</label><input style="height: 35px" type="text" id="swal-input-3" class="form-control col-3"></div>`;
          this.inputsHtml += `<div class="d-flex flex-column" style="width: 100%;">`;
          classes[0].map((cla, index) => {
            if (cla.subjectid === id) {
              this.inputsHtml += `
            <div class="d-flex justify-content-between">
           <div class="d-flex flex-column align-items-center mt-2">
            <label>Teacher&nbsp;&nbsp;</label>
            <select id="swal-input-t${index}" style="height: 35px" class="form-control custom-select">
              <option disabled="">Select one</option>
              ${this.teachers.map(teacher => {
                return `<option
                value="${teacher.id}"
                ${cla.teacher[0].id === teacher.id ? 'selected=""' : ""}
              >${teacher.name} ${teacher.lastname}</option>
                `;
              })}
            </select>
          </div>
          <div class="d-flex flex-column align-items-center mt-2">
            <label>ClassRoom&nbsp;&nbsp;</label>
            <select id="swal-input-c${index}" style="height: 35px" class="form-control custom-select">
              <option disabled="">Select one</option>
              ${this.classrooms.map(classroom => {
                return `<option
                value="${classroom.id}"
                ${cla.room[0].id === classroom.id ? 'selected=""' : ""}
              >${classroom.roomnumber}</option>
                `;
              })}
            </select>
          </div>
           <div class="d-flex flex-column align-items-center mt-2">
            <label>Start Time&nbsp;&nbsp;</label>
            <select id="swal-input-s${index}" style="height: 35px" class="form-control custom-select">
              <option disabled="">Select one</option>
              ${this.starttimes.map(starttime => {
                return `<option
                value="${starttime.id}"
                ${cla.start[0].id === starttime.id ? 'selected=""' : ""}
              >${starttime.stime}</option>
                `;
              })}
            </select>
          </div>
          <div class="d-flex flex-column align-items-center mt-2">
            <label>End Time&nbsp;&nbsp;</label>
            <select id="swal-input-e${index}" style="height: 35px" class="form-control custom-select">
              <option disabled="">Select one</option>
              ${this.endtimes.map(endtime => {
                return `<option
                value="${endtime.id}"
                ${cla.end[0].id === endtime.id ? 'selected=""' : ""}
              >${endtime.etime}</option>
                `;
              })}
            </select>
          </div>
          </div>
      `;
            }
          });

          this.inputsHtml += `</div>`;
          const Toast = this.$swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            customClass: "PopUpAlert",
            didOpen: toast => {
              toast.addEventListener("mouseenter", this.$swal.stopTimer);
              toast.addEventListener("mouseleave", this.$swal.resumeTimer);
            }
          });
          const classCopy = this.classes;
          this.classes = [];

          this.$swal
            .fire({
              title: "Update Classes",
              html: this.inputsHtml,
              focusConfirm: false,
              customClass: "col-9 PopUpModel",
              inputAttributes: {
                maxlength: 32
              },
              confirmButtonText: "Update",
              preConfirm: () => {
                let classes = [];
                if (classCopy.length > 0) {
                  classes = classCopy.filter(item => item.subjectid === id);
                }
                // <td>${classes[0][i].teacher[0].name} ${classes[0][i].teacher[0].lastname}</td>
                // <td>${classes[0][i].room[0].roomnumber}</td>
                // <td>${classes[0][i].start}</td>
                // <td>${classes[0][i].end}</td>
                let val = [];
                let allow = true;
                classes.map((cl, index) => {
                  if (
                    parseInt(
                      document.getElementById(`swal-input-s${index}`).value
                    ) >=
                    parseInt(
                      document.getElementById(`swal-input-e${index}`).value
                    ) +
                      1
                  ) {
                    allow = false;
                    Toast.fire({
                      icon: "error",
                      title: `Invalid Start Time & End Time`
                    });
                  } else if (val.length > 0) {
                    for (let i = 0; i < val.length; i += 4) {
                      if (
                        parseInt(val[1 + i]) ===
                        parseInt(
                          document.getElementById(`swal-input-c${index}`).value
                        )
                      ) {
                        if (
                          parseInt(val[2 + i]) ===
                            parseInt(
                              document.getElementById(`swal-input-s${index}`)
                                .value
                            ) &&
                          parseInt(val[3 + i]) ===
                            parseInt(
                              document.getElementById(`swal-input-e${index}`)
                                .value
                            )
                        ) {
                          allow = false;
                          Toast.fire({
                            icon: "error",
                            title: `Class room '${cl.room[0].roomnumber}' can't be assigned twice at the same time`
                          });
                        }
                      }
                    }
                  }
                  if (allow) {
                    val.push(
                      document.getElementById(`swal-input-t${index}`).value
                    );
                    val.push(
                      document.getElementById(`swal-input-c${index}`).value
                    );
                    val.push(
                      document.getElementById(`swal-input-s${index}`).value
                    );
                    val.push(
                      document.getElementById(`swal-input-e${index}`).value
                    );
                    return val;
                  }
                });
                return val;
              }
            })
            .then(result => {
              if (result && result.value) {
                let ind = 0;
                for (let i = 0; i < result.value.length; i += 4) {
                  this.classes.push({
                    id: classes[0][ind].id,
                    subjectid: id,
                    teacher: this.teachers.filter(
                      teacher => teacher.id === parseInt(result.value[i])
                    ),
                    room: this.classrooms.filter(
                      classr => classr.id === parseInt(result.value[i + 1])
                    ),
                    start: this.starttimes.filter(
                      sttime => sttime.id === parseInt(result.value[i + 2])
                    ),
                    end: this.endtimes.filter(
                      ettime => ettime.id === parseInt(result.value[i + 3])
                    )
                  });
                  ind++;
                }
                if (classCopy.length > 0) {
                  this.classes.push(
                    ...classCopy.filter(item => !(item.subjectid === id))
                  );
                }
              } else if (result.dismiss == "backdrop") {
                this.classes = classCopy;
              }
            });
        }
      });
    },
    addClass(id) {
      this.inputsHtml = "";
      // this.inputsHtml += `<div class="d-flex flex-column">`;
      // this.inputsHtml += `<div class="d-flex flex-row align-items-center"><label class="pad_l">Teacher&nbsp;&nbsp;</label><input style="height: 35px" type="text" id="swal-input-3" class="form-control col-3"></div>`;
      this.inputsHtml += `
           <div class="d-flex flex-column align-items-center">
            <label>Teacher&nbsp;&nbsp;</label>
            <select id="swal-input-t" style="height: 35px" class="form-control custom-select col-5">
              <option selected="" disabled="">Select one</option>
              ${this.teachers.map(teacher => {
                return `<option
                value="${teacher.id}"
              >${teacher.name} ${teacher.lastname}</option>
                `;
              })}
            </select>
          </div>
          <div class="d-flex flex-column align-items-center mt-2">
            <label>ClassRoom&nbsp;&nbsp;</label>
            <select id="swal-input-c" style="height: 35px" class="form-control custom-select col-5">
              <option selected="" disabled="">Select one</option>
              ${this.classrooms.map(classroom => {
                return `<option
                value="${classroom.id}"
              >${classroom.roomnumber}</option>
                `;
              })}
            </select>
          </div>
           <div class="d-flex flex-column align-items-center mt-2">
            <label>Start Time&nbsp;&nbsp;</label>
            <select id="swal-input-s" style="height: 35px" class="form-control custom-select col-5">
              <option selected="" disabled="">Select one</option>
              ${this.starttimes.map(starttime => {
                return `<option
                value="${starttime.id}"
              >${starttime.stime}</option>
                `;
              })}
            </select>
          </div>
          <div class="d-flex flex-column align-items-center mt-2">
            <label>End Time&nbsp;&nbsp;</label>
            <select id="swal-input-e" style="height: 35px" class="form-control custom-select col-5">
              <option selected="" disabled="">Select one</option>
              ${this.endtimes.map(endtime => {
                return `<option
                value="${endtime.id}"
              >${endtime.etime}</option>
                `;
              })}
            </select>
          </div>
      `;
      // this.inputsHtml += `</div>`;
      this.inputsHtml += `<br>`;
      const Toast = this.$swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: "PopUpAlert",
        didOpen: toast => {
          toast.addEventListener("mouseenter", this.$swal.stopTimer);
          toast.addEventListener("mouseleave", this.$swal.resumeTimer);
        }
      });

      this.$swal
        .fire({
          title: "Add Class",
          html: this.inputsHtml,
          focusConfirm: false,
          customClass: "col-9",
          inputAttributes: {
            maxlength: 32
          },
          confirmButtonText: "Add",
          preConfirm: () => {
            let classes = [];
            if (this.classes.length > 0) {
              classes.push(this.classes.filter(item => item.subjectid === id));
            }
            // <td>${classes[0][i].teacher[0].name} ${classes[0][i].teacher[0].lastname}</td>
            // <td>${classes[0][i].room[0].roomnumber}</td>
            // <td>${classes[0][i].start}</td>
            // <td>${classes[0][i].end}</td>
            let val = [];
            let allow = true;
            if (
              parseInt(document.getElementById(`swal-input-s`).value) >=
              parseInt(document.getElementById(`swal-input-e`).value) + 1
            ) {
              allow = false;
              Toast.fire({
                icon: "error",
                title: `Invalid Start Time & End Time`
              });
            } else if (classes.length > 0) {
              for (let i = 0; i < classes[0].length; i++) {
                if (
                  classes[0][i].room[0].id ===
                  parseInt(document.getElementById(`swal-input-c`).value)
                ) {
                  if (
                    classes[0][i].start[0].id ===
                      parseInt(document.getElementById(`swal-input-s`).value) &&
                    classes[0][i].end[0].id ===
                      parseInt(document.getElementById(`swal-input-e`).value)
                  ) {
                    allow = false;
                    Toast.fire({
                      icon: "error",
                      title: `Class room '${classes[0][i].room[0].roomnumber}' can't be assigned twice at the same time`
                    });
                  }
                }
              }
            }
            if (allow) {
              val.push(document.getElementById(`swal-input-t`).value);
              val.push(document.getElementById(`swal-input-c`).value);
              val.push(document.getElementById(`swal-input-s`).value);
              val.push(document.getElementById(`swal-input-e`).value);
              return val;
            }
            return val;
          }
        })
        .then(result => {
          if (result && result.value) {
            this.classes.push({
              subjectid: id,
              teacher: this.teachers.filter(
                teacher => teacher.id === parseInt(result.value[0])
              ),
              room: this.classrooms.filter(
                classr => classr.id === parseInt(result.value[1])
              ),
              start: this.starttimes.filter(
                sttime => sttime.id === parseInt(result.value[2])
              ),
              end: this.endtimes.filter(
                ettime => ettime.id === parseInt(result.value[3])
              )
            });
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.All_Student {
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
.selection_close_div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  .selection_close {
    margin: 0;
    background: #e22939;
    color: white;
    padding: 20px;
    border-radius: 10px;
  }
}
</style>
<style>
.PopUpAlert > .swal2-title {
  font-size: 14px !important;
}
.PopUpModel {
  width: 100% !important;
  max-width: 75% !important;
}
.PopUpModel > .swal2-html-container {
  display: flex !important;
  justify-content: space-between !important;
}
</style>
