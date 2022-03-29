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
    weekDay: 6,
    clickDateString: "",
    selectDates: [],
    drawCalEx: [],
    drawCal: [],
    clickDate: "",
    firstDayList: [],
    drawCalAfter: [],
    YEAR_NAME: "년",
    MONTH_NAME: "월",
    DATE_NAME: "일",
    hyphen: '-'
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
      state.clickDateString =
        state.currentYear.toString()
        + state.YEAR_NAME
        + (state.currentMonthInNumber + 1).toString()
        + state.MONTH_NAME + newClickDate.date["date"] + state.DATE_NAME;
      state.clickDate =
        state.currentYear.toString()
        + state.hyphen
        + (state.currentMonthInNumber + 1).toString()
        + state.hyphen
        + newClickDate.date["date"];
    },
    prev(state) {
      const isFirstMonth = () => state.currentMonthInNumber === state.firstMonth;
      if (isFirstMonth()) { //0
        state.currentYear--;
        state.currentMonthInNumber = state.lastMonth; //11
      }

      if (!isFirstMonth()) {
        state.currentMonthInNumber--;
      }
    },
    next(state) {
      const isLastMonth = () => state.currentMonthInNumber === state.lastMonth;
      if (isLastMonth()) { //11
        state.currentYear++;
        state.currentMonthInNumber = state.firstMonth; //0
      }
      if (!isLastMonth()) {
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
    lookUp(state) {
      state.selectDates = [];

      let curDate = new Date(document.getElementById('startDate').value);
      const endDate = new Date(document.getElementById('endDate').value);

      const isCurDate =
        (date) => (curDate.getFullYear().toString()
          + state.hyphen
          + (curDate.getMonth() + 1).toString()
          + state.hyphen
          + curDate.getDate().toString()) === date;

      while (curDate <= endDate) {
        let isNational = false;
        let temp = {};
        temp.date = curDate.getFullYear() + state.hyphen + (curDate.getMonth() + 1) + state.hyphen + curDate.getDate();
        temp.day = state.days[curDate.getDay()];

        const weekend = {
          0: 'danger', //sun
          6: 'primary' //sat
        }

        temp._rowVariant = 'light';
        if (weekend[curDate.getDay()] != null) {
          temp._rowVariant = weekend[curDate.getDay()]
        }

        for (let i in state.nationalDayList[0]) {
          let tempDate = String(state.nationalDayList[0][i]["locdate"]);
          const NationalDate = new Date(tempDate.substring(0, 4), tempDate.slice(4, 6), tempDate.slice(6));
          isNational =
            isCurDate((NationalDate.getFullYear().toString()
              + state.hyphen
              + NationalDate.getMonth().toString() + state.hyphen
              + NationalDate.getDate().toString()))

          temp.isNationalDay = isNational ? "예" : "아니오";
        }
        state.selectDates.push(temp);
        curDate.setDate(curDate.getDate() + 1);
      }
    },
    drawCalendar(state, getters) {
      state.drawCal = [];
      state.drawCalEx = [];
      state.drawCalAfter = [];
      let firstDayList = state.firstDayList;

      //전달 날짜 표시
      for (let date in firstDayList) {
        state.drawCalEx.push(getters.lastDayOfLastMonth - firstDayList[date] + 1);
      }
      //다음달 날짜 표시

      const afterDate = state.weekDay - getters.currentDay;
      for (let date = 1; date <= afterDate; date++) {
        state.drawCalAfter.push(date);
      }
      //이달 날짜 표시
      const selectDatesNotNull = selectDates => selectDates !== null && selectDates !== [];

      for (let date = 1; date < getters.lastDayOfCurrentMonth + 1; date++) {

        if (selectDatesNotNull(state.selectDates)) {
          const selectDatesList = state.selectDates.map(row => row.date);
          let isSelect =
            selectDatesList.includes(
              (state.currentYear.toString()
                + state.hyphen
                + (state.currentMonthInNumber + 1).toString()
                + state.hyphen + date.toString())).toString();

          let day = new Date(state.currentYear, state.currentMonthInNumber, date).getDay()

          state.drawCal.push({"date": date.toString(), "select": isSelect, "day": day});
        }
      }
    }
  },
  actions: {
    updateClickDate(context, newClickDate) {
      context.commit('updateClickDate', newClickDate);
    },
    prev(context) {
      context.commit('prev');
    },
    next(context) {
      context.commit('next');
    },
    lookUpPage(context) {
      context.commit('lookUpPage');
    },
    getNationalList({commit}, currentYear) {
      const url = "http://localhost:3000/api";
      const ServiceKey = '?_type=json&ServiceKey=pttHWIl4dfMuWu4ZBaBagNtAzamjrs%2BMGE9JDETUED7tu4y1Dt8ajPP7qmxXBJZQTLLhFHjZ84EkuMHfkxZcnA%3D%3D&solYear=';
      console.log('test');
      axios.get(url + ServiceKey + currentYear.toString(), {headers: {"Accept": "application/json"}})
        .then(res => {
          let nationalDayList = res.data["response"]["body"]["items"]["item"];
          console.log('test2');
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
    currentMonthName: (state) => {
      return new Date(state.currentYear, state.currentMonthInNumber).toLocaleString("default", {month: "long"})
    },
    rows: (state) => {
      return state.selectDates.length;
    },
    currentDay: (state) => {
      return new Date(state.currentYear, state.currentMonthInNumber, this.lastDayOfCurrentMonth()).getDay();
    },
    lastDayOfCurrentMonth: (state) => {
      return new Date(state.currentYear, state.currentMonthInNumber + 1, 0).getDate();
    },
    lastDayOfLastMonth: (state) => {
      return new Date(state.currentYear, state.currentMonthInNumber, 0).getDate();
    }
  }
})

export default store;
