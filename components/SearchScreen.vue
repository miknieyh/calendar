<template>
<div class="container-xxl">
  <b-navbar toggleable="lg" type="dark" variant="light">
    <b-row align-h="end"><b-col cols="3">
    <b-navbar>
      <b-navbar-brand href="#" class="text-black">Find</b-navbar-brand>
      <b-navbar-brand href="#" class="text-black">Clear</b-navbar-brand>
      <b-navbar-brand href="#" class="text-black">Print</b-navbar-brand>
      <b-navbar-brand href="#" class="text-black">Excel</b-navbar-brand>
      <b-navbar-brand href="#" class="text-black">Close</b-navbar-brand>
    </b-navbar>
    </b-col> </b-row>
  </b-navbar>
  <section>
    <div>
      <b-card>
      <b-row align-h="around">
        <b-col cols="4" class="d-flex">
          <b-button class="border-dark bg-white text-black">Biz</b-button>
          <b-form-select v-model="selected" :options="options" class="ms-lg-2"></b-form-select></b-col>
        <b-col cols="4" class="d-flex">
          <b-button class="border-dark bg-white text-black">Rm Type Code /Name</b-button>
          <b-form-input aria-label="Input" class="ms-lg-2"></b-form-input></b-col>
        <b-col cols="4" class="d-flex">
          <b-button class="border-dark bg-white text-black">사용여부</b-button>
          <b-form-group v-slot="{ ariaDescribedby }" class="m-auto ms-lg-2">
          <b-form-radio-group
            v-model="selected2"
            :options="options2"
            :aria-describedby="ariaDescribedby"
            value-field="item"
            text-field="name"
            name="plain-inline"
            plain
          ></b-form-radio-group></b-form-group></b-col>
      </b-row>
      </b-card>
      <b-table striped hover :items="tableItems"></b-table>
    </div>
  </section>

</div>

</template>

<script>
export default {
  name: "SearchScreen",
  data(){
    return{
      text: '',
      selected: null,
      options: [{value:null,text:"로그인 사업장"}],
      selected2: 'Yes',
      options2: [
        { item: 'Yes', name: 'Yes' },
        { item: 'No', name: 'No' },
        { item: 'All', name: 'All'},
      ],
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
