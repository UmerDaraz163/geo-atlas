<template>
  <div class="container d-flex justify-content-center align-items-center flex-column">
    
      <h2>{{ country?.name?.common }} ({{ country?.name?.official }})</h2>
      <div class="card w-50 h-50">
        <img :src="country?.flags?.svg" :alt="`Flag of ${country?.name?.common}`" />
      </div>
        <div class="line mt-4"></div>
        <ul class="mt-2">
          <li><strong>Urdu Name:</strong> {{ country?.translations?.urd?.official }}</li>
          <li v-if="country?.capital"><strong>Capital:</strong> {{ country?.capital?.[0] }}</li>
          <li><strong>Region:</strong> {{ country?.region }}</li>
          <li><strong>Sub Region:</strong> {{ country?.subregion }}</li>
          <li><strong>Languages:</strong>
          <ul>
          <li class="tab-indent" v-for="(language, code) in country?.languages" :key="code">
             {{"-"+ language }}
          </li>
        </ul>
        </li>

      </ul>
      <ul v-if="isVisible" class="show-more">
          <li><strong>Population:</strong> {{ country?.population?.toLocaleString() }}</li>
          <li><strong>Area:</strong> {{ country?.area?.toLocaleString() }} km²</li>
          <li><strong>Country Codes:</strong> {{ country?.cca2 +"," + country?.cca3 +","+ country?.ccn3 }}</li>
          <li><strong>Currency:</strong> {{currency}}</li>
          <li><strong>Border Countries:</strong>
            <ul>
              <li class="tab-indent" v-for="borderCountry in country?.borders" :key="borderCountry">
                {{"-"+ borderCountry }}
              </li>
            </ul>
          </li>
          <li><strong>Timezones:</strong> {{ country?.timezones?.[0] }} </li>
          <li><strong>Calling Code</strong> {{ country?.idd?.['root']+ country?.idd?.['suffixes'] }}</li>
          <li><a :href="country?.maps?.googleMaps" target="_blank">View on Google Maps</a></li>
          <li><a :href="country?.maps?.openStreetMaps" target="_blank">View on Open Street Maps</a></li>
  
        </ul>
        <button @click="shwoMore" class="btn my-2">Show {{More}} Details</button>
      <router-link to="/"><button class="btn btn-primary">Back to Search</button> </router-link>
    </div>
</template>

<script setup>
import { onMounted, ref, nextTick ,computed } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const country = ref([])
const currency = ref() 
const isVisible = ref(false)
const More = computed(() => isVisible.value ? "less" : "more")

const route = useRoute()
console.log("🚀 ~ route:", route)
onMounted( async () => {

    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${route?.params?.name}`
      );
      nextTick(() => {
        country.value = response?.data?.[0]
        currency.value = Object.keys(country.value?.currencies)[0];
      } )
      
    } catch (err) {
      console.error(err);
    }
  })
  function shwoMore() {
    isVisible.value =!isVisible.value;
    // More.value == "More"?"Less":"More";
  }
  
</script>

<style>
.container {
  max-width: 600px;
  margin: 20px auto;
  font-family: Arial, sans-serif;
}

input {
  padding: 10px;
  margin: 10px 0;
  width: 100%;
  box-sizing: border-box;
}

button {
  padding: 10px;
  margin: 10px 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 5px 0;
}

.error {
  color: red;
}
.tab-indent {
  margin-left: 16px;
}
.line {
  height: 1px;
  width: 100%;
  background-color: black;
}
</style>
