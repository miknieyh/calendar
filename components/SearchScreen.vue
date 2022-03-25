<template>
<div class="container-xxl">
  <b-navbar toggleable="lg" type="dark" variant="light">
    <b-row align-h="end">
    <b-navbar>
      <b-navbar-nav class="ms-lg-auto">
      <b-navbar-brand href="#" class="text-black">Find</b-navbar-brand>
      <b-navbar-brand href="#" class="text-black">Clear</b-navbar-brand>
      <b-navbar-brand href="#" class="text-black">Print</b-navbar-brand>
      <b-navbar-brand href="#" class="text-black">Excel</b-navbar-brand>
      <b-navbar-brand href="#" class="text-black">Close</b-navbar-brand>
      </b-navbar-nav>
    </b-navbar>
     </b-row>
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
      <DBTable/>
    </div>
  </section>

</div>

</template>

<script>
import DBTable from "@/components/DBTable";
export default {
  name: "SearchScreen",
  components: {DBTable},
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
    }
  }
}
</script>

<style scoped>

</style>
