<template>
  <div class="col-5">
    <div>
      <b-table class="table text-center" :per-page="pageSize" :current-page="pageNum" :items="selectDates"
               :fields="fields" id="calendar-table">
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
  data() {
    return {
      pageSize: 10,
      pageNum: 1,
      fields: [
        {key: 'date', label: '일자'},
        {key: 'day', label: '요일'},
        {key: 'isNationalDay', label: '국경일'}
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
      rows: 'rows'
    })
  },
  methods: {
    nextPage() {
      this.$store.dispatch('nextPage');
    },
    prevPage() {
      this.$store.dispatch('prevPage');
    },

  }
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
