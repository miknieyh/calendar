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
      const clickDateList =
        [state.currentYear.toString(),(state.currentMonthInNumber + 1).toString(), newClickDate.date["date"]];
      state.clickDate = clickDateList.join(state.hyphen);
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

      const curDate = new Date(document.getElementById('startDate').value);
      const endDate = new Date(document.getElementById('endDate').value);
      const curDateList =
        [curDate.getFullYear().toString(),(curDate.getMonth() + 1).toString(),curDate.getDate().toString()]
      const curDateListString = curDateList.join(state.hyphen);

      const isCurDate = date => curDateListString === date;

      while (curDate <= endDate) {
        let temp = {};
        temp.date = curDate.getFullYear() + state.hyphen + (curDate.getMonth() + 1) + state.hyphen + curDate.getDate();
        temp.day = state.days[curDate.getDay()];

        const weekend = {
          0: 'danger', //sun
          6: 'primary' //sat
        }
        const isNotNull = weekend => weekend != null

        temp._rowVariant = 'light';

        if (isNotNull(weekend[curDate.getDay()])) {
          temp._rowVariant = weekend[curDate.getDay()]
        }

        for (let i in state.nationalDayList[0]) {
          const tempDate = String(state.nationalDayList[0][i]["locdate"]);
          const NationalDate = new Date(tempDate.substring(0, 4), tempDate.slice(4, 6), tempDate.slice(6));
          const NationalDateList =
            [NationalDate.getFullYear().toString(),NationalDate.getMonth().toString(),NationalDate.getDate().toString()]
          const NationalDateString = NationalDateList.join(state.hyphen);
          temp.isNationalDay = isCurDate(NationalDateString) ? "예" : "아니오";
        }

        state.selectDates.push(temp);
        curDate.setDate(curDate.getDate() + 1);
      }
    },
    drawCalendar(state) {
      state.drawCal = [];
      state.drawCalEx = [];
      state.drawCalAfter = [];
      const firstDayList = state.firstDayList;
      const lastDayOfLastMonth = new Date(state.currentYear, state.currentMonthInNumber, 0).getDate();
      const lastDayOfCurrentMonth = new Date(state.currentYear, state.currentMonthInNumber + 1, 0).getDate();
      const currentDay = new Date(state.currentYear, state.currentMonthInNumber,lastDayOfCurrentMonth).getDay();

      //전달 날짜 표시
      for (let date in firstDayList) {
        state.drawCalEx.push(lastDayOfLastMonth - firstDayList[date] + 1);
      }

      //다음달 날짜 표시
      const afterDate = state.weekDay - currentDay;
      for (let date = 1; date <= afterDate; date++) {
        state.drawCalAfter.push(date);
      }

      //이달 날짜 표시
      const selectDatesNotNull = selectDates => selectDates !== null && selectDates !== [];

      for (let date = 1; date < lastDayOfCurrentMonth + 1; date++) {
        if (selectDatesNotNull(state.selectDates)) {
          const selectDatesList = state.selectDates.map(row => row.date);
          const curDateList = [state.currentYear.toString(),(state.currentMonthInNumber + 1).toString(), date.toString()]
          const isSelect =
            selectDatesList.includes(curDateList.join(state.hyphen)).toString();
          const day = new Date(state.currentYear, state.currentMonthInNumber, date).getDay()
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
          const nationalDayList = res.data["response"]["body"]["items"]["item"];
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
      return new Date(state.currentYear, state.currentMonthInNumber)
        .toLocaleString("default", {month: "long"})
    },
    rows: (state) => {
      return state.selectDates.length;
    }

  }
})

export default store;
