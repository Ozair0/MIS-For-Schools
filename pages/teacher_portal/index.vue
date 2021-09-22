<template>
  <div class="Teacher_Content">
    <button class="btn btn-primary Admission_BTN shadow">
      New Admission
    </button>
    <div class="Admin_Cards">
      <div class="Admin_Cards_F">
        <div class="small-box bg-gradient-success card_C shadow">
          <div class="inner">
            <h3>{{ totalStudents }}</h3>
            <p>Students In School</p>
          </div>
          <div class="icon">
            <fa :icon="faUserGraduate" />
          </div>
          <a href="#" class="small-box-footer">
            View all <fa :icon="faArrowCircleRight" />
          </a>
        </div>
        <div class="small-box bg-gradient-secondary card_C shadow">
          <div class="inner">
            <h3>
              {{ totalTeachers }}
            </h3>
            <p>Teachers In School</p>
          </div>
          <div class="icon">
            <fa :icon="faGraduationCap" />
          </div>
          <a href="#" class="small-box-footer">
            View all <fa :icon="faArrowCircleRight" />
          </a>
        </div>
        <div class="small-box bg-gradient-info card_C shadow">
          <div class="inner">
            <h3>
              {{ totalEmployees }}
            </h3>
            <p>Employees In School</p>
          </div>
          <div class="icon">
            <fa :icon="faUserPlus" />
          </div>
          <a href="#" class="small-box-footer">
            View all <fa :icon="faArrowCircleRight" />
          </a>
        </div>
      </div>
      <div class="Admin_Cards_S">
        <div class="small-box bg-gradient-primary card_C shadow">
          <div class="inner">
            <h3>
              {{ parseInt(totalStudents) + Math.floor(Math.random() * 6) + 1 }}
            </h3>
            <p>Male Students In School</p>
          </div>
          <div class="icon">
            <fa :icon="faMale" />
          </div>
          <a href="#" class="small-box-footer">
            View all <fa :icon="faArrowCircleRight" />
          </a>
        </div>
        <div class="small-box bg-gradient-olive card_C shadow">
          <div class="inner">
            <h3>
              {{ parseInt(totalStudents) + Math.floor(Math.random() * 6) + 1 }}
            </h3>
            <p>Female Students In School</p>
          </div>
          <div class="icon">
            <fa :icon="faFemale" />
          </div>
          <a href="#" class="small-box-footer">
            View all <fa :icon="faArrowCircleRight" />
          </a>
        </div>
        <div class="small-box bg-gradient-danger card_C shadow">
          <div class="inner">
            <h3>
              {{ parseInt(totalStudents) + Math.floor(Math.random() * 6) + 1 }}
            </h3>
            <p>Total Income In This Month</p>
          </div>
          <div class="icon">
            <fa :icon="faMoneyCheck" />
          </div>
          <a href="#" class="small-box-footer">
            View all <fa :icon="faArrowCircleRight" />
          </a>
        </div>
      </div>
    </div>
    <div class="Admin_Cards_half">
      <div class="info-box bg-gradient-primary Half_P_Card shadow">
        <div class="info-box-content">
          <h3 class="info-box-text">Events</h3>
          <span class="info-box-number">Total: 410</span>
          <div class="card bg-gradient-secondary my-2">
            <div class="card-header">
              <p class="card-title">
                Fall Festival: Community School students, parents, and
                faculty...
              </p>
            </div>
          </div>
          <div class="card bg-gradient-secondary my-2">
            <div class="card-header">
              <p class="card-title">
                Fall Festival: Community School students, parents, and
                faculty...
              </p>
            </div>
          </div>
          <div class="card bg-gradient-secondary my-2">
            <div class="card-header">
              <p class="card-title">
                Fall Festival: Community School students, parents, and
                faculty...
              </p>
            </div>
          </div>
          <div class="card bg-gradient-secondary my-2">
            <div class="card-header">
              <p class="card-title">
                Fall Festival: Community School students, parents, and
                faculty...
              </p>
            </div>
          </div>
          <span class="progress-description">
            <a class="btn btn-secondary" href="#">View All Events</a>
            <a class="btn btn-secondary" href="#">Add An Event</a>
          </span>
        </div>
      </div>
      <div class="info-box bg-gradient-secondary Half_P_Card shadow">
        <div class="info-box-content">
          <h3 class="info-box-text">Notice Board</h3>
          <span class="info-box-number">Total: 410</span>
          <div class="card bg-gradient-primary my-2">
            <div class="card-header">
              <p class="card-title">
                Fall Festival: Community School students, parents, and
                faculty...
              </p>
            </div>
          </div>
          <div class="card bg-gradient-primary my-2">
            <div class="card-header">
              <p class="card-title">
                Fall Festival: Community School students, parents, and
                faculty...
              </p>
            </div>
          </div>
          <div class="card bg-gradient-primary my-2">
            <div class="card-header">
              <p class="card-title">
                Fall Festival: Community School students, parents, and
                faculty...
              </p>
            </div>
          </div>
          <div class="card bg-gradient-primary my-2">
            <div class="card-header">
              <p class="card-title">
                Fall Festival: Community School students, parents, and
                faculty...
              </p>
            </div>
          </div>

          <span class="progress-description">
            <a class="btn btn-primary" href="#">View All Notices</a>
            <a class="btn btn-primary" href="#">Add A Notice</a>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  faUserPlus,
  faArrowCircleRight,
  faUserGraduate,
  faGraduationCap,
  faFemale,
  faMale,
  faMoneyCheck
} from "@fortawesome/free-solid-svg-icons";
export default {
  computed: {
    faUserPlus() {
      return faUserPlus;
    },
    faFemale() {
      return faFemale;
    },
    faMale() {
      return faMale;
    },
    faUserGraduate() {
      return faUserGraduate;
    },
    faMoneyCheck() {
      return faMoneyCheck;
    },
    faGraduationCap() {
      return faGraduationCap;
    },
    faArrowCircleRight() {
      return faArrowCircleRight;
    }
  },
  data() {
    return {
      // totalStudents: 0
    };
  },
  async asyncData(ctx) {
    const total = await ctx.$axios.get("/api/student/");
    const total1 = await ctx.$axios.get("/api/teacher/");
    const total2 = await ctx.$axios.get("/api/employee/");
    return {
      totalStudents: total.data.total,
      totalTeachers: total1.data.total,
      totalEmployees: total2.data.total
    };
  }
};
</script>

<style lang="scss" scoped>
.Teacher_Content {
  display: flex;
  flex-direction: column;
  margin: 10px 10px 0 10px;
  .Admission_BTN {
    align-self: flex-end;
    margin-top: 10px;
    margin-bottom: 30px;
    border-radius: 25px;
  }
  .Admin_Cards {
    display: flex;

    flex-direction: column;
    .Admin_Cards_F {
      display: flex;
      justify-content: space-between;
      .card_C {
        //width: 400px;
        flex: 0 0 30%;
        border-radius: 20px;
        .small-box-footer {
          border-bottom-left-radius: 20px;
          border-bottom-right-radius: 20px;
        }
      }
    }
    .Admin_Cards_S {
      display: flex;
      justify-content: space-between;
      .card_C {
        //width: 400px;
        flex: 0 0 30%;
        border-radius: 20px;
        .small-box-footer {
          border-bottom-left-radius: 20px;
          border-bottom-right-radius: 20px;
        }
      }
    }
  }
  .Admin_Cards_half {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 40px;
    .Half_P_Card {
      flex: 0 0 48%;
      border-radius: 20px;
      .card-title {
        font-size: 15px;
      }
      .progress-description {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>
