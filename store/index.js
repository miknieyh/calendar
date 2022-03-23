import axios from "axios";
import Vuex from 'vuex'

const store = () => new Vuex.Store({
  state: {
    currentMonthName: "",
    nationalDayList: [],
    days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    currentMonthInNumber: new Date().getMonth(),
    currentYear: new Date().getFullYear(),
    firstMonth: 0,
    lastMonth: 11,
    clickDateString: "",
    selectDates: [],
    drawCalEx: [],
    drawCal: [],
    clickDate: "",
    firstDayList: [],
    name: "Stackoverflow"
  },
  mutations: {
    firstDay(state) {
      const firstDay = new Date(state.currentYear, state.currentMonthInNumber, 1).getDay();
      state.firstDayList = [];
      for (let i = firstDay; i > 0; i--) {
        state.firstDayList.push(i);
      }
    },
    updateClickDate(state, newClickDate) {
      state.clickDateString = state.currentYear.toString() + "년 " + (state.currentMonthInNumber + 1).toString() + "월 " + newClickDate.date["date"] + "일";
      state.clickDate = state.currentYear.toString() + "-" + (state.currentMonthInNumber + 1).toString() + "-" + newClickDate.date["date"];
    },
    prev(state) {
      if (state.currentMonthInNumber === state.firstMonth) { //0
        state.currentYear--;
        state.currentMonthInNumber = state.lastMonth; //11
      } else {
        state.currentMonthInNumber--;
      }
    },
    next(state) {
      if (state.currentMonthInNumber === state.lastMonth) { //11
        state.currentYear++;
        state.currentMonthInNumber = state.firstMonth; //0
      } else {
        state.currentMonthInNumber++;
      }
    },
    lookUpPage(state) {
      let curDate = new Date(document.getElementById('startDate').value);
      state.currentMonthInNumber = curDate.getMonth();
    },
    getNationalList(state, data) {
      state.nationalDayList.push(data);

    },
    lookUp(state, actions) {
      state.selectDates = [];

      let curDate = new Date(document.getElementById('startDate').value);
      const endDate = new Date(document.getElementById('endDate').value);
      while (curDate <= endDate) {
        let isNational = false;
        let temp = new Map();
        temp.set("date", curDate.getFullYear() + "-" + (curDate.getMonth() + 1) + "-" + curDate.getDate());
        temp.set("day", state.days[curDate.getDay()]);
        console.log()
        for (let i in state.nationalDayList[0]) {
          let tempDate = String(state.nationalDayList[0][i]["locdate"]);
          let NationalDate = new Date(tempDate.substring(0, 4), tempDate.slice(4, 6), tempDate.slice(6));
          if (curDate.getFullYear().toString() + "-" + (curDate.getMonth() + 1).toString() + "-" + curDate.getDate().toString()
            === NationalDate.getFullYear().toString() + "-" + NationalDate.getMonth().toString() + "-" + NationalDate.getDate().toString()) {
            isNational = true;
          }
          if (isNational) {
            temp.set("isNationalDay", "예");
          } else {
            temp.set("isNationalDay", "아니오");
          }
        }

        state.selectDates.push(temp);
        curDate.setDate(curDate.getDate() + 1);
      }
    },
    drawCalendar(state, getters) {
      state.drawCal = [];
      state.drawCalEx = [];
      let firstDayList = state.firstDayList;
      const lastDayOfLastMonth = new Date(state.currentYear, state.currentMonthInNumber, 0).getDate();
      //elementText1 전달 날짜 표시
      for (let date in firstDayList) {
        state.drawCalEx.push(lastDayOfLastMonth - firstDayList[date] + 1);
      }
      //elementText2 이달 날짜 표시
      for (let date = 1; date < lastDayOfLastMonth + 1; date++) {
        if (state.selectDates != null && state.selectDates !== []) {
          let calendarDate = state.currentYear + "-" + (state.currentMonthInNumber + 1) + "-" + date;
          let isSelect = "false";
          for (let i in state.selectDates) {
            if (state.selectDates[i].get("date") === calendarDate) {
              isSelect = "true";
            }
          }
          state.drawCal.push({"date":date.toString(),"select":isSelect});
        }

      }
    }
  },
  actions: {
    updateClickDate(context, newClickDate) {
      context.commit('updateClickDate', newClickDate);
    }
    ,
    prev(context) {
      context.commit('prev');
    }
    ,
    next(context) {
      context.commit('next');
    },
    lookUpPage(context) {
      context.commit('lookUpPage');
    },
    getNationalList({commit}, currentYear) {
      let url = "http://localhost:3000/api";
      let ServiceKey = '?_type=json&ServiceKey=pttHWIl4dfMuWu4ZBaBagNtAzamjrs%2BMGE9JDETUED7tu4y1Dt8ajPP7qmxXBJZQTLLhFHjZ84EkuMHfkxZcnA%3D%3D&solYear=';

      axios.get(url + ServiceKey + currentYear.toString(), {headers: {"Accept": "application/json"}})
        .then(res => {
          let nationalDayList = res.data["response"]["body"]["items"]["item"];
          commit('getNationalList', nationalDayList);
        }).catch(err => {
        console.log("error : ", err);
      })

    },
    lookUp(context) {
      context.commit('lookUp');
    },
    drawCalendar(context) {
      context.commit('drawCalendar');
    },
    firstDay(context) {
      context.commit('firstDay');
    }
  },
  getters: {
    name: (state) => {
      return state.name;
    }
    ,
    currentMonthName: (state) => {
      return new Date(state.currentYear, state.currentMonthInNumber).toLocaleString("default", {month: "long"})
    },


  }
})

export default store;
