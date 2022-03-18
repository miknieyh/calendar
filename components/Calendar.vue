<template>

  <div>
    <!-- todo vuex 도입  컴포넌트별 상태관리-->
    <header>
      <h1 class="text-center align-content-center">Calendar 기본과제</h1>
    </header>
    <div class="container">
      <div>
        <section class="d-flex justify-content-evenly">
          <button class="btn Button" disabled>기간</button>
          <input type="date" name="startDate" id="startDate">
          <input type="date" name="endDate" id="endDate">
          <button @click="lookUp" class="btn block Button">조회</button>
        </section>
        <section>
          <h1>{{ currentYear }}년 {{ currentMonthName }} </h1>
        </section>
        <section>
          <div class="days d-flex">
            <p class="text-center" v-for="(day,index) in days" :key="index"><b>{{ day }}</b></p>
          </div>
          <div class="dates d-flex" id="calDateTest">

          </div>
        </section>
        <section class="d-flex justify-content-center">
          <button @click="prev" class="btn Button">Prev</button>
          <button @click="next" class="btn Button">next</button>
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
          <tbody>
<!--todo api 연결 후-->
<!--          <tr v-for="nationalday in nationalDays" :key="nationalday.dateName">-->
<!--            <td>{{ nationalday.dateName }}</td>-->
<!--            <td>{{ nationalday.locdate }}</td>-->
<!--            <td>{{ nationalday.isHoliday }}</td>-->
<!--          </tr>-->
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>


<script>

const convert = require('xml-js')
import axios from 'axios'

export default {
  name: "CalendarComponents",
  data() {
    return {
      nationalDays: [],
      days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      currentMonthInNumber: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      firstMonth: 0,
      lastMonth: 11
    }
  },
  computed: {
    currentMonthName() {
      return new Date(this.currentYear, this.currentMonthInNumber).toLocaleString("default", {month: "long"})
    },
    lastDayOfMonth() {
      return new Date(this.currentYear, this.currentMonthInNumber + 1, 0).getDate()
    },

  },
  mounted() {
    this.drawCalendar();
  },
  methods: {
    prev() {
      if (this.currentMonthInNumber == this.firstMonth) { //0
        this.currentYear--;
        this.currentMonthInNumber = this.lastMonth; //11
      } else {
        this.currentMonthInNumber--;
      }
      this.lookUp()

    },
    next() {
      if (this.currentMonthInNumber == this.lastMonth) { //11
        this.currentYear++;
        this.currentMonthInNumber = this.firstMonth; //0
      } else {
        this.currentMonthInNumber++;
      }
      this.lookUp()
    },
    selectDate(date, SelectDate) {
      if (SelectDate != null && SelectDate != []) {
        let calendarDate = this.currentYear + "-" + this.currentMonthInNumber + "-" + date;
        let selectDate = SelectDate
        if (selectDate.includes(calendarDate)) {
          return "text-primary"
        } else {
          return ""
        }
      }
    },
    firstDay() {
      const firstDay = new Date(this.currentYear, this.currentMonthInNumber, 1).getDay();
      let firstDayList = [];
      for (let i = firstDay; i > 0; i--) {
        firstDayList.push(i);
      }
      return firstDayList
    },
    //조회 버튼 누르면 사이날짜 받아오기
    lookUp() {
      let selectDate = Array();
      let curDate = new Date(document.getElementById('startDate').value);
      const endDate = new Date(document.getElementById('endDate').value);
      while (curDate <= endDate) {
        selectDate.push(curDate.getFullYear() + "-" + curDate.getMonth() + "-" + curDate.getDate());
        curDate.setDate(curDate.getDate() + 1);
      }

      this.drawCalendar(selectDate);

    },
    drawCalendar(selectDate) {
      const element = document.getElementById("calDateTest");
      let elementText1 = "";
      let elementText2 = "";
      let firstDayList = this.firstDay();
      const lastDayOfLastMonth = new Date(this.currentYear, this.currentMonthInNumber, 0).getDate();
      //elementText1 전달 날짜 표시
      for (let date in firstDayList) {
        elementText2 += "<p class=\"text-center text-muted\">" + (lastDayOfLastMonth - firstDayList[date] + 1) + "</p>";
      }
      //elementText2 이달 날짜 표시
      for (let date = 1; date < this.lastDayOfMonth + 1; date++) {
        elementText2 += "<p class=" + this.selectDate(date, selectDate) + "><b>" + date + "</b></p>";
      }
      ;
      element.innerHTML = elementText1 + elementText2;
    }
  },
  created() {
    let vm = this;
    axios.get("http://localhost:4000/?solYear="+this.currentYear)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  },
}

</script>

<style>
.days P, .dates p {
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

section {
  margin-top: 30px;
}

</style>
