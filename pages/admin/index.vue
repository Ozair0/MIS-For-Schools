<template>
  <div class="wrapper">
    <p>Index Page</p>
    <button class="btn btn-danger">Danger</button>
    <div class="small-box bg-gradient-success card_C">
      <div class="inner">
        <h3>44</h3>
        <p>User Registrations</p>
      </div>
      <div class="icon">
        <fa :icon="faUserPlus" />
      </div>
      <a href="#" class="small-box-footer">
        More info <fa :icon="faArrowCircleRight" />
      </a>
    </div>
  </div>
</template>

<script>
import {
  faUserPlus,
  faArrowCircleRight
} from "@fortawesome/free-solid-svg-icons";
export default {
  computed: {
    faUserPlus() {
      return faUserPlus;
    },
    faArrowCircleRight() {
      return faArrowCircleRight;
    }
  }
};
</script>

<style>
.card_C {
  margin-top: 10px;
  margin-left: 20px;
  width: 350px;
}
</style>
