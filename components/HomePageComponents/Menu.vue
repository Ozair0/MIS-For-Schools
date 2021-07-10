<template>
  <div class="H_Menu">
    <div class="Logo_Menu">
      <a href="/">
        <img src="~/static/Title.png" width="180px" alt="KIS" />
      </a>
    </div>
    <div class="Menu_List">
      <a href="/">Home</a>
      <a href="/" class="Fa_A Our_School"
        >Our School <fa :icon="faAngleDown" color="white"
      /></a>
      <div class="Drop_Down_Menu">
        <p>Programs</p>
        <div class="Drop_Down_Menu_List">
          <div class="Drop_Down_Menu_List_Item D_Active">
            |
            <a href="#" class="D_A_Active">About Kardan International School</a>
          </div>
          <div class="Drop_Down_Menu_List_Item">
            | <a href="#">Principal's Message</a>
          </div>
          <div class="Drop_Down_Menu_List_Item">
            | <a href="#">Our Vision and Mission</a>
          </div>
          <div class="Drop_Down_Menu_List_Item">
            | <a href="#">Campus and Facilities</a>
          </div>
          <div class="Drop_Down_Menu_List_Item">
            | <a href="#">School Cafeteria and Kitchen</a>
          </div>
          <div class="Drop_Down_Menu_List_Item">
            | <a href="#">Term Dates</a>
          </div>
        </div>
      </div>
      <a href="/">learning</a>
      <a href="/">Admissions</a>
      <a href="/">Our Team</a>
      <a href="/" class="Fa_A news_events"
        >News & Events <fa :icon="faAngleDown" color="white"
      /></a>
      <div class="Drop_Down_Menu_2">
        <p>News & Events</p>
        <div class="Drop_Down_Menu_List">
          <div class="Drop_Down_Menu_List_Item D_Active">
            |
            <a href="#" class="D_A_Active">News</a>
          </div>
          <div class="Drop_Down_Menu_List_Item">| <a href="#">Events</a></div>
        </div>
      </div>
      <a class="Link_Line">|</a>
      <a href="/" class="Contact_Us_Link">Contact Us</a>
    </div>
  </div>
</template>

<script>
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
export default {
  computed: {
    faAngleDown() {
      return faAngleDown;
    },
  },
};
</script>
<style lang="scss">
.H_Menu {
  display: flex;
  justify-content: space-between;
  height: 20%;
}
.Logo_Menu {
  margin-top: 17px;
  margin-left: 30px;
}
.Menu_List {
  display: flex;
  margin-top: 15px;
  margin-right: 60px;
  align-items: center;
}
.Menu_List > a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 18px;
  font-style: normal;
  height: min-content;
}

.Menu_List > a:not(:first-child) {
  margin-left: 15px;
}

.Drop_Down_Menu {
  display: none;
  position: absolute;
  background: #ffffff;
  box-shadow: 0px 24px 32px rgba(0, 0, 0, 0.04),
    0px 16px 24px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.04),
    0px 0px 1px rgba(0, 0, 0, 0.04);
  border-radius: 20px;
  margin-left: 63px;
  margin-top: 265px;
  width: 280px;
  z-index: 999;
  &:hover {
    display: block;
  }
}
.Drop_Down_Menu > p,
.Drop_Down_Menu_2 > p {
  margin: 0;
  margin-left: 15px;
  margin-top: 10px;
  color: #a8a8a8;
  font-weight: bold;
  font-size: 16px;
}
.Drop_Down_Menu_List {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 25px;
  a {
    color: black;
    text-decoration: none;
    font-size: 14px;
  }
}
.Drop_Down_Menu_List_Item {
  font-weight: bold;
  color: #e5e5e5;
  &:not(:first-child) {
    margin-top: 10px;
  }
}
.D_Active {
  color: #9c42f3;
}
.D_A_Active {
  color: #404040;
}

.Our_School {
  height: 70px !important;
  &:hover ~ .Drop_Down_Menu {
    display: block;
  }
}

.Drop_Down_Menu_2 {
  display: none;
  position: absolute;
  background: #ffffff;
  box-shadow: 0px 24px 32px rgba(0, 0, 0, 0.04),
    0px 16px 24px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.04),
    0px 0px 1px rgba(0, 0, 0, 0.04);
  border-radius: 20px;
  margin-left: 460px;
  margin-top: 150px;
  width: 150px;
  z-index: 999;
  &:hover {
    display: block;
  }
}
.news_events {
  height: 70px !important;
  &:hover ~ .Drop_Down_Menu_2 {
    display: block;
  }
}
.Link_Line {
  padding: 0 20px;
}
.Contact_Us_Link {
  padding: 15px;
  background: rgba(255, 255, 255, 0.23);
  border-radius: 38px;
}
.Fa_A {
  display: flex;
  align-items: center;
}
.Fa_A > svg {
  margin-left: 4px;
}
</style>
