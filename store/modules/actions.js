
import axios from "axios";
export const actions = {
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
    const url = process.env.URL;
    const ServiceKey = process.env.SERVICE_KEY;
    axios.get(url + ServiceKey + currentYear.toString(), {headers: {"Accept": "application/json"}})
      .then(res => {
        const nationalDayList = res.data["response"]["body"]["items"]["item"];
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
}
