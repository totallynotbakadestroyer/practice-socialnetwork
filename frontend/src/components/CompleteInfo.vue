<template>
  <v-row justify="center">
    <v-col cols="12">
      <v-card-subtitle class="text-center">
        Share some info with us so you can find your classmates/coworkers more easily!
      </v-card-subtitle>
      <v-divider/>
    </v-col>
    <v-col cols="7">
      <v-flex>
        <v-radio-group @change="emitCurrStateToParent"
                       ref="gender" label="Gender" v-model="userInfo.gender" row :mandatory="false">
          <v-radio label="Male" value="Male"></v-radio>
          <v-radio label="Female" value="Female"></v-radio>
        </v-radio-group>
        <v-combobox @change="emitCurrStateToParent"
                    :items="countryItems" v-model="userInfo.country" label="Country"/>
        <v-text-field @change="emitCurrStateToParent" ref="city"
                      v-model="userInfo.city" label="City"/>
        <v-select @change="emitCurrStateToParent" ref="relationship" v-model="userInfo.relationship"
                  :items="relationshipItems" label="Relationship"/>
        <v-menu
          v-model="birthdayMenu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="userInfo.birthday"
              label="Birthday"
              v-bind="attrs"
              v-on="on"
              ref="birthday"
            ></v-text-field>
          </template>
          <v-date-picker @change="emitCurrStateToParent"
                         v-model="userInfo.birthday" @input="birthdayMenu = false"></v-date-picker>
        </v-menu>
      </v-flex>
    </v-col>
  </v-row>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CompleteInfo',
  data() {
    return {
      birthdayMenu: false,
      country: 'None selected',
      countryItems: [],
      relationshipItems: ['None selected', 'Unmarried', 'In love', 'Married'],
      userInfo: {
        birthday: new Date().toISOString().substr(0, 10),
        gender: '',
        country: 'None selected',
        city: '',
        relationship: 'None selected',
      },
    };
  },
  mounted() {
    axios({
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'get',
      url: 'https://cors-anywhere.herokuapp.com/https://restcountries.eu/rest/v2/all/?fields=name',
    }).then((response) => {
      const countries = response.data.map((a) => a.name);
      this.countryItems.unshift(...countries);
    })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    emitCurrStateToParent() {
      console.log((this.userInfo));
      this.$emit('emitCurrentState', this.userInfo);
    },
  },
};
</script>

<style scoped>

</style>
