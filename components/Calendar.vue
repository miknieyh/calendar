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
            <p class="text-center" v-for="(day,index) in days" :key="index"><b>{{ day }}</b></p>
          </div>
          <div class="dates d-flex" id="calDateTest">
            <p v-for="date in drawCalEx" :key="'A'+date">
              <button class="btn clickButton" disabled>{{ date }}</button>
            </p>

            <span v-for="date in drawCal" :key="date.date">
              <span v-if="date.select =='true'"><button class="btn clickButton" @click="updateClickDate({date})"><b
                class="textColor">{{ date.date }}</b></button></span>

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
          <h5>{{ clickDate }}</h5>
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
          <tbody v-for="(selectDate,index) in selectDates" :key="index">
          <tr>
            <td>{{ selectDate.get("date") }}</td>
            <td>{{ selectDate.get("day") }}</td>
            <td>{{selectDate.get("isNationalDay")}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>


<script>

import axios from "axios";


export default {
  name: "CalendarComponents",
  data() {
    return {
      nationalDayList: [],
      days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      currentMonthInNumber: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      firstMonth: 0,
      lastMonth: 11,
      clickDate: "",
      selectDates: [],
      drawCalEx: [],
      drawCal: [{date: "", select: ""}],
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
    this.getNationalList();

  },
  methods: {
    updateClickDate(newClickDate) {
      this.clickDate = this.currentYear.toString() + "년 " + (this.currentMonthInNumber + 1).toString() + "월 " + newClickDate.date["date"] + "일";
    },
    prev() {
      if (this.currentMonthInNumber === this.firstMonth) { //0
        this.currentYear--;
        this.currentMonthInNumber = this.lastMonth; //11
      } else {
        this.currentMonthInNumber--;
      }
      this.lookUp()

    },
    next() {
      if (this.currentMonthInNumber === this.lastMonth) { //11
        this.currentYear++;
        this.currentMonthInNumber = this.firstMonth; //0
      } else {
        this.currentMonthInNumber++;
      }
      this.lookUp()
    },
    selectDate(date, SelectDates) {
      if (SelectDates != null && SelectDates !== []) {
        let calendarDate = this.currentYear + "-" + (this.currentMonthInNumber + 1) + "-" + date;
        let isSelect = false;
        for (let i in SelectDates) {
          if (SelectDates[i].get("date") == calendarDate) {
            isSelect = true;
          }
        }
        return isSelect;
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
    lookUpPage() {
      let curDate = new Date(document.getElementById('startDate').value);
      this.currentMonthInNumber = curDate.getMonth();
      this.lookUp()
    },
    getNationalList(){
      let url = "http://localhost:3000/api";
      let ServiceKey = '?_type=json&ServiceKey=pttHWIl4dfMuWu4ZBaBagNtAzamjrs%2BMGE9JDETUED7tu4y1Dt8ajPP7qmxXBJZQTLLhFHjZ84EkuMHfkxZcnA%3D%3D&solYear=';

      axios.get(url + ServiceKey +this.currentYear.toString(),{headers:{"Accept":"application/json"}})
        .then(res => {
          this.nationalDayList = res.data["response"]["body"]["items"]["item"];
        }).catch(err => {
        console.log("error : ", err);
      })
    },
    isNational(curDate) {
     let list = this.nationalDayList;
     let isNational = false;
     for(let i in list){
       let tempDate = String(list[i]["locdate"]);
       let NationalDate = new Date(tempDate.substring(0,4),tempDate.slice(4,6),tempDate.slice(6));
       if(curDate.getFullYear().toString()+"-"+(curDate.getMonth()+1).toString()+"-"+curDate.getDate().toString()
         === NationalDate.getFullYear().toString()+"-"+NationalDate.getMonth().toString()+"-"+NationalDate.getDate().toString()){
         isNational =true;
       }
     }
     return isNational
    },
    lookUp() {
      this.selectDates = [];
      let curDate = new Date(document.getElementById('startDate').value);
      const endDate = new Date(document.getElementById('endDate').value);
      while (curDate <= endDate) {
        let temp = new Map();
        temp.set("date", curDate.getFullYear() + "-" + (curDate.getMonth() + 1) + "-" + curDate.getDate());
        temp.set("day", this.days[curDate.getDay()]);
        if (this.isNational(curDate)) {
          temp.set("isNationalDay", "예");
        } else {
          temp.set("isNationalDay", "아니오");
        }
        this.selectDates.push(temp);
        curDate.setDate(curDate.getDate() + 1);
      }

      this.drawCalendar(this.selectDates);

    },
    drawCalendar() {
      const element = document.getElementById("calDateTest");
      this.drawCal = [];
      this.drawCalEx = [];
      let firstDayList = this.firstDay();
      const lastDayOfLastMonth = new Date(this.currentYear, this.currentMonthInNumber, 0).getDate();
      //elementText1 전달 날짜 표시
      for (let date in firstDayList) {
        this.drawCalEx.push(lastDayOfLastMonth - firstDayList[date] + 1);
      }
      //elementText2 이달 날짜 표시
      for (let date = 1; date < this.lastDayOfMonth + 1; date++) {

        if (this.selectDate(date, this.selectDates)) {
          this.drawCal.push({"date": date.toString(), "select": "true"});

        } else {
          this.drawCal.push({"date": date.toString(), "select": "false"});
        }
      }
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

</style>
