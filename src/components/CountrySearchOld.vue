<template>
  <div class="container">
    <h1>Country Search</h1>
    <div>
      <input
        v-model="searchRegion"
        @input="fetchCountries"
        placeholder="Search by region (e.g., africa)"
      />
    </div>
    <div>
      <label for="limit">Limit Results:</label>
      <input
        type="number"
        id="limit"
        v-model.number="limit"
        @change="fetchCountries"
      />
    </div>
    <div v-if="loading">Loading...</div>
    <ul v-else>
      <li v-for="country in countries" :key="country.region">
        <strong>{{ country.name }}</strong> ({{ country.region }})
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import axios from "axios";

export default {
  name: "CountrySearch",
  setup() {
    const searchRegion = ref("");
    const limit = ref(5);
    const countries = ref([]);
    const loading = ref(false);

    const fetchCountries = async () => {
      if (!searchRegion.value) {
        countries.value = [];
        return;
      }

      loading.value = true;
      try {
        const response = await axios.get("/api/data/v1/countries", {
          params: {
            pretty: true,
            // region: searchRegion.value,
            // limit: limit.value,
          },
        });
                
        countries.value = Object.values(response.data.data).map((country) => ({
          name: country.country,
          region: country["region"],
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        loading.value = false;
      }
    };

    // Watch for changes in `searchRegion` or `limit` to refetch countries
    watch([searchRegion, limit], fetchCountries);

    return {
      searchRegion,
      limit,
      countries,
      loading,
      fetchCountries,
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
  padding: 5px;
  margin: 10px 0;
  width: 100%;
  box-sizing: border-box;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 5px 0;
}
</style>
