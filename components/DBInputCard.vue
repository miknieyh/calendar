<template>
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
  </div>
</template>

<script>
export default {
  name: "DBInputCard.vue",
  data(){
    return {
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
