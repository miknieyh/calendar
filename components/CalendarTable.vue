<template>
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
</template>

<script>
import axios from "axios";
export default {
  name: "CalendarTable"
}
</script>

<style scoped>

</style>
