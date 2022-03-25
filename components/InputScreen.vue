<template>
  <div class="container-xxl">
    <b-navbar toggleable="lg" type="dark" variant="light">
      <b-row align-h="end">
        <b-navbar>
          <b-navbar-nav class="ms-lg-auto">
            <b-navbar-brand href="#" class="text-black">Find</b-navbar-brand>
            <b-navbar-brand href="#" class="text-black">Clear</b-navbar-brand>
            <b-navbar-brand href="#" class="text-black">New</b-navbar-brand>
            <b-navbar-brand href="#" class="text-black">Save</b-navbar-brand>
            <b-navbar-brand href="#" class="text-black">Delete</b-navbar-brand>
            <b-navbar-brand href="#" class="text-black">Print</b-navbar-brand>
            <b-navbar-brand href="#" class="text-black">Excel</b-navbar-brand>
            <b-navbar-brand href="#" class="text-black">Close</b-navbar-brand>
          </b-navbar-nav>
        </b-navbar>
      </b-row>
    </b-navbar>
    <section>
      <div>
        <DBInputCard/>
        <div class="d-flex">
        <DBTable class="col-8"/>
          <div class="col-4">
            <b-table-simple responsive>
              <b-tbody>
              <b-tr>
                <b-td>
                  biz
                </b-td>
                <b-td>
                  <b-form-select v-model="selected" :options="options" class="ms-lg-2"></b-form-select>
                </b-td>
              </b-tr>
              <b-tr>
                <b-td>
                  Rm Type Code
                </b-td>
                <b-td>
                  <b-form-input aria-label="Input" class="ms-lg-2"></b-form-input>
                </b-td>
              </b-tr>
              <b-tr>
                <b-td>
                  Rm Type Name(Kor)
                </b-td>
                <b-td>
                  <b-form-input aria-label="Input" class="ms-lg-2"></b-form-input>
                </b-td>
              </b-tr>
              <b-tr>
                <b-td>
                  Rm Type Name(Eng)
                </b-td>
                <b-td>
                  <b-form-input aria-label="Input" class="ms-lg-2"></b-form-input>
                </b-td>
              </b-tr>
              <b-tr>
                <b-td>
                  Rm Type Name(Oth)
                </b-td>
                <b-td>
                  <b-form-input aria-label="Input" class="ms-lg-2"></b-form-input>
                </b-td>
              </b-tr>
              <b-tr>
                <b-td>
                  Rm View
                </b-td>
                <b-td>
                  <b-form-input aria-label="Input" class="ms-lg-2"></b-form-input>
                </b-td>
              </b-tr>
              <b-tr>
                <td>
                  Rms
                </td>
                <b-td>
                  <b-form-input aria-label="Input" class="ms-lg-2"></b-form-input>
                </b-td>
              </b-tr>
              <b-tr>
                <b-td>
                  Rack Rate
                </b-td>
                <b-td>
                  <b-form-input aria-label="Input" class="ms-lg-2"></b-form-input>
                </b-td>
              </b-tr>
              <b-tr>
                <b-td>
                  Active
                </b-td>
                <b-td>
                  <b-form-group v-slot="{ ariaDescribedby }" class="m-auto">
                    <b-form-radio-group
                      v-model="selected2"
                      :options="options2"
                      :aria-describedby="ariaDescribedby"
                      value-field="item"
                      text-field="name"
                      name="plain-inline"
                      plain
                    ></b-form-radio-group></b-form-group>
                </b-td>
              </b-tr>
              </b-tbody>
            </b-table-simple>
          </div>
        </div>
      </div>
    </section>

  </div>

</template>

<script>
import DBTable from "~/components/DBTable.vue";
import DBInputCard from "~/components/DBInputCard.vue";

export default {
  name: "SearchScreen",
  components: {DBInputCard, DBTable},
  data() {
    return {
      text: '',
      selected: null,
      options: [{value:null,text:"로그인 사업장"}],
      selected2: 'Yes',
      options2: [
        { item: 'Yes', name: 'Yes' },
        { item: 'No', name: 'No' },
      ],
    }
  }
}
</script>

<style scoped>

</style>
