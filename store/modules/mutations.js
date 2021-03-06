export const mutations = {
  firstDay(state) {
    const firstDay = new Date(state.currentYear, state.currentMonthInNumber, 1).getDay();

    state.firstDayList = Array(firstDay)
      .fill()
      .map((value, index) => {
        return index + 1
      }).reverse();
  },
  updateClickDate(state, newClickDate) {
    state.clickDateString =
      state.currentYear.toString()
      + state.YEAR_NAME
      + (state.currentMonthInNumber + 1).toString()
      + state.MONTH_NAME + newClickDate.date["date"] + state.DATE_NAME;

    const clickDateList =
      [state.currentYear.toString(), (state.currentMonthInNumber + 1).toString(), newClickDate.date["date"]];
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

    if (isLastMonth()) {
      state.currentYear++;
      state.currentMonthInNumber = state.firstMonth;
    }
    if (!isLastMonth()) {
      state.currentMonthInNumber++;
    }
  },
  lookUpPage(state) {
    state.currentMonthInNumber = new Date(document.getElementById('startDate').value).getMonth();
  },
  getNationalList(state, data) {
    data.forEach(({locdate}) => {
      const tempDate = String(locdate);
      const NationalDate = new Date(tempDate.substring(0, 4), tempDate.slice(4, 6), tempDate.slice(6));
      const NationalDateList =
        [NationalDate.getFullYear().toString(), NationalDate.getMonth().toString(), NationalDate.getDate().toString()]
      const nationalDateString = NationalDateList.join(state.hyphen);

      state.nationalDateStringList.push(nationalDateString);
    })
  },
  lookUp(state) {
    state.selectDates = [];
    const curDate = new Date(document.getElementById('startDate').value);
    const endDate = new Date(document.getElementById('endDate').value);
    const weekend = {
      0: 'danger', //sun
      6: 'primary', //sat
      null: 'light'
    }

    while (curDate <= endDate) {
      const curDateList =
        [curDate.getFullYear().toString(), (curDate.getMonth() + 1).toString(), curDate.getDate().toString()]
      const curDateListString = curDateList.join(state.hyphen);

      let temp = {};
      temp.date = curDate.getFullYear() + state.hyphen + (curDate.getMonth() + 1) + state.hyphen + curDate.getDate();
      temp.day = state.days[curDate.getDay()];
      temp._rowVariant = weekend[curDate.getDay()]
      temp.isNationalDay = state.nationalDateStringList.includes(curDateListString) ? state.YES : state.NO;
      state.selectDates.push(temp);
      curDate.setDate(curDate.getDate() + 1);
    }
  },
  drawCalendar(state) {
    const lastDayOfLastMonth = new Date(state.currentYear, state.currentMonthInNumber, 0).getDate();
    const lastDayOfCurrentMonth = new Date(state.currentYear, state.currentMonthInNumber + 1, 0).getDate();
    const currentDay = new Date(state.currentYear, state.currentMonthInNumber, lastDayOfCurrentMonth).getDay();

    const afterDate = state.weekDay - currentDay;
    const selectDatesList = state.selectDates.map(({date}) => date);

    const makeDateString = date => {
      return [state.currentYear.toString(), (state.currentMonthInNumber + 1).toString(), date.toString()]
    }
    const makeDay = date => {
      return new Date(state.currentYear, state.currentMonthInNumber, date).getDay()
    }
    const isSelect = date => {
      return selectDatesList.includes(makeDateString(date).join(state.hyphen)).toString();
    }

    state.drawCalEx = state.firstDayList.map((value) => {
      return lastDayOfLastMonth - value + 1
    });

    state.drawCalAfter = Array(afterDate).fill().map((value, index) => {
      return index + 1
    });

    state.drawCal = Array(lastDayOfCurrentMonth)
      .fill()
      .map((value, date) => {
        return {
          "date": (date + 1).toString(), "select": isSelect((date + 1)), "day": makeDay((date + 1))
        }
      })
  }
}
