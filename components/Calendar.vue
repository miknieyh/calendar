<template>

  <div>
    <!-- todo vuex 도입  컴포넌트별 상태관리-->
    <header>
      <h1 class="text-center align-content-center">Calendar 기본과제</h1>
    </header>
    <div class="container">
      <div class="calendarBox">
        <section class="d-flex justify-content-evenly">
          <button class="btn Button" disabled>기간</button>
          <input type="date" name="startDate" id="startDate">
          <input type="date" name="endDate" id="endDate">
          <button @click="lookUpPage" class="btn block Button">조회</button>
        </section>
        <section>
          <h1>{{ currentYear }}년 {{ currentMonthName }} </h1>
        </section>
        <section>
          <div class="days d-flex">
            <p class="text-center" v-for="(day,index) in days" :key="'days'+index"><b>{{ day }}</b></p>
          </div>
          <div class="dates d-flex" id="calDateTest">
            <p v-for="date in drawCalEx" :key="'drawCalEx'+date">
              <button class="btn clickButton" disabled>{{ date }}</button>
            </p>

            <span v-for="date in $store.state.drawCal" :key="'drawCal'+date.date">
              <span v-if="date.select ==='true'"><button class="btn clickButton" @click="updateClickDate({date})">
                <b class="textColor">{{ date.date }}</b
                ></button></span>

              <span v-else><button class="btn clickButton" disabled><b>{{ date.date }}</b></button></span>
            </span>
          </div>
        </section>
        <section class="d-flex justify-content-center">
          <button @click="prev" class="btn Button">Prev</button>
          <button @click="next" class="btn Button">next</button>
        </section>
        <section>
          <h3>선택한 날짜</h3>
          <h5>{{ clickDateString }}</h5>
        </section>
      </div>


      <div class="container">
        <table class="table text-center">
          <thead>
          <tr>
            <th>일자</th>
            <th>요일</th>
            <th>국경일</th>
          </tr>
          </thead>
          <tbody v-for="(selectDate,index) in selectDates" :key="'selectDates'+index">
          <tr>
            <td>{{ selectDate.get("date") }}</td>
            <td>{{ selectDate.get("day") }}</td>
            <td>{{ selectDate.get("isNationalDay") }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>


<script>

import {mapGetters, mapState} from 'vuex';

export default {
  name: "CalendarComponents",
  computed: {
    ...mapState({ //data vuex 에서 가져오는 것
      nationalDayList: 'nationalDayList',
      days: 'days',
      currentMonthInNumber: 'currentMonthInNumber',
      currentYear: 'currentYear',
      firstMonth: 'firstMonth',
      lastMonth: 'lastMonth',
      clickDateString: 'clickDateString',
      selectDates: 'selectDates',
      drawCalEx: 'drawCalEx',
      clickDate: 'clickDate',
      drawCal: 'drawCal'
    }),
    ...mapGetters({
      currentMonthName:'currentMonthName',
      nameFromStore: 'name'
    })

  },
  mounted() {
    this.drawCalendar();
    this.getNationalList();

  },
  methods: {
    updateClickDate(newClickDate) {
      this.$store.dispatch('updateClickDate', newClickDate);
    },
    prev() {
      this.$store.dispatch('prev');
      this.lookUp();
    },
    next() {
      this.$store.dispatch('next');
      this.lookUp();
    },
    selectDate(date, SelectDates) {
      return this.$store.getters.selectDate(this.$store.state,date,SelectDates);
    },
    firstDay() {
      return this.$store.dispatch('firstDay');
    },
    //조회 버튼 누르면 사이날짜 받아오기
    lookUpPage() {
      this.$store.dispatch('lookUpPage');
      this.lookUp()
    },
    getNationalList() {
      this.$store.dispatch('getNationalList',this.currentYear);
    },
    lookUp() {
      this.$store.dispatch('lookUp');
      this.drawCalendar();
    },
    drawCalendar() {
      this.firstDay()
      this.$store.dispatch('drawCalendar');
    }
  }
  ,
  created() {

  }
  ,
}

</script>

<style>
.days P, .dates p {
  width: 14.28%;
}

span {
  width: 14.28%;
}

.dates {
  flex-wrap: wrap;
}

.Button {
  background-color: #42b983;
  font-weight: bold;
  color: white;
}

.textColor {
  color: #42b983;
}

section {
  margin-top: 30px;
}

.calendarBox {
  width: 50%
}

.clickButton:visited {
  color: #35495e;
}
</style>
