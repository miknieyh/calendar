<template>
  <b-table striped hover :items="tableItems"></b-table>
</template>

<script>
export default {
  name: "DBTable",
  data(){
    return{
      tableItems:[
        {"Rm Type Code":"SDB","Rm Type Name(Kor)" :"슈페리어 더블","Rm Type Name(Eng)":"Superior Double","Rm Type Name(Oth)":"Superior Double",
          "Rm View":"Ocean","Rms":"105","Rack Rate":"235,000","Active":"Yes"},
        {"Rm Type Code":"DTW","Rm Type Name(Kor)" :"디럭스 트윈","Rm Type Name(Eng)":"Deluxe Twin","Rm Type Name(Oth)":"Deluxe Twin",
          "Rm View":"City","Rms":"99","Rack Rate":"263,000","Active":"Yes"},
        {"Rm Type Code":"DDB","Rm Type Name(Kor)" :"디럭스 더블","Rm Type Name(Eng)":"Deluxe Double","Rm Type Name(Oth)":"Deluxe Double",
          "Rm View":"Ocean","Rms":"20","Rack Rate":"263,000","Active":"No"}
      ]
    }
  }
}
</script>

<style scoped>

</style>
