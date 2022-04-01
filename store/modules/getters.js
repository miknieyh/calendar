export const getters = {
  currentMonthName: (state) => {
    return new Date(state.currentYear, state.currentMonthInNumber)
      .toLocaleString("default", {month: "long"})
  },
  rows: (state) => {
    return state.selectDates.length;
  }

}
