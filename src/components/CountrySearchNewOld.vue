<template>
  <div class="container">
    <h1>Country Search</h1>
    <div>
      <input
        v-model="searchQuery"
        placeholder="Enter country name (e.g., Pakistan)"
      />
    </div>
    <button @click="fetchCountry">Search</button>
    <div v-if="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="countries">
      <div v-for="(country) in countries">
      <h2>{{ country.name.common }} ({{ country.name.official }})</h2>
      <img :src="country.flags.png" :alt="`Flag of ${country.name.common}`" />
      <ul>
        <li><strong>Urdu Name:</strong> {{ country.translations.urd.official }}</li>
        <li v-if="country?.capital"><strong>Capital:</strong> {{ country?.capital[0] }}</li>
        <li><strong>Region:</strong> {{ country.region }}</li>
        <li><strong>Sub Region:</strong> {{ country.subregion }}</li>
        <li><strong>Languages:</strong>
        <ul>
        <li class="tab-indent" v-for="(language, code) in country.languages" :key="code">
           {{"-"+ language }}
        </li>
      </ul>
      </li>
        <li><strong>Population:</strong> {{ country.population.toLocaleString() }}</li>
        <li><strong>Area:</strong> {{ country.area.toLocaleString() }} km²</li>
        <li><strong>Country Codes:</strong> {{ country.cca2 +"," + country.cca3 +","+ country.ccn3 }}</li>
        <li><strong>Currency:</strong> {{ Object.keys(country.currencies)[0]}}</li>
        <li><strong>Border Countries:</strong>
          <ul>
            <li class="tab-indent" v-for="borderCountry in country.borders" :key="borderCountry">
              {{"-"+ borderCountry }}
            </li>
          </ul>
        </li>
        <li><strong>Timezones:</strong> {{ country.timezones[0] }} </li>
        <li><strong>Calling Code</strong> {{ country.idd['root']+ country.idd['suffixes'] }}</li>
        <li><a :href="country.maps.googleMaps" target="_blank">View on Google Maps</a></li>
        <li><a :href="country.maps.openStreetMaps" target="_blank">View on Open Street Maps</a></li>

      </ul>
    </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  name: "CountrySearch",
  setup() {
    const searchQuery = ref("");
    const countries = ref(null);
    const loading = ref(false);
    const error = ref("");

    const fetchCountry = async () => {
      if (!searchQuery.value) {
        error.value = "Please enter a country name.";
        return;
      }

      loading.value = true;
      error.value = "";
      countries.value = null;

      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/name/${searchQuery.value}`
        );
        countries.value = response.data;
      } catch (err) {
        error.value = "Country not found or an error occurred.";
        console.error(err);
      } finally {
        loading.value = false;
      }
    };

    return {
      searchQuery,
      countries,
      loading,
      error,
      fetchCountry,
    };
  },
};
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
</style>
