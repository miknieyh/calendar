<template>
  <div class="col-5">
    <div>
    <b-table class="table text-center" :per-page="pageSize" :current-page="pageNum" :items="selectDates" :fields="fields" id="calendar-table">
    </b-table>
      <div class="overflow-auto">
        <b-pagination
          v-model="pageNum"
          :total-rows="rows"
          :per-page="pageSize"
          aria-controls="calendar-table"
          align="center"
          pills
          size="small"
        ></b-pagination>
      </div>
    </div>
    </div>

    </template>
    <script>
    import {mapGetters, mapState} from 'vuex';

    export default {
      data(){
        return{
          pageSize: 10,
          pageNum:1,
          fields:[
            { key:'date',label:'일자'},
            { key:'day',label:'요일'},
            { key:'isNationalDay',label:'국경일'}
          ]
        }
      },
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
          drawCal: 'drawCal',
        }),
        ...mapGetters({
          currentMonthName: 'currentMonthName',
          rows : 'rows'
        })
      }
      ,
      mounted() {
        this.drawCalendar();
        this.getNationalList();

      }
      ,
      methods: {
        nextPage() {
          this.$store.dispatch('nextPage');
        },
        prevPage() {
          this.$store.dispatch('prevPage');
        },
        updateClickDate(newClickDate) {
          this.$store.dispatch('updateClickDate', newClickDate);
        }
        ,
        prev() {
          this.$store.dispatch('prev');
          this.lookUp();
        }
        ,
        next() {
          this.$store.dispatch('next');
          this.lookUp();
        }
        ,
        selectDate(date, SelectDates) {
          return this.$store.getters.selectDate(this.$store.state, date, SelectDates);
        }
        ,
        firstDay() {
          return this.$store.dispatch('firstDay');
        }
        ,
        //조회 버튼 누르면 사이날짜 받아오기
        lookUpPage() {
          this.$store.dispatch('lookUpPage');
          this.lookUp()
        }
        ,
        getNationalList() {
          this.$store.dispatch('getNationalList', this.currentYear);
        }
        ,
        lookUp() {
          this.$store.dispatch('lookUp');
          this.drawCalendar();
        }
        ,
        drawCalendar() {
          this.firstDay()
          this.$store.dispatch('drawCalendar');
        }
      }
      ,
      created() {

      },

    }
    </script>

    <style scoped>
    .days P, .dates p {
      width: 14.28%;
    }

    span {
      width: 14.28%;
    }

    section {
      margin-top: 30px;
    }




    </style>
