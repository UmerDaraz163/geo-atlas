<template >
  <div class="page"> 
  <img class="img" src="https://cdn.pixabay.com/photo/2024/12/12/18/32/landscape-9263545_1280.jpg" alt="">

  <div class="container">
    <h1>Country Search</h1>
    <div class="box">
      <input
        v-model="searchQuery"
        placeholder="Enter country name (e.g., Pakistan)"
        @keydown.enter="fetchCountry"
      />
    <button class="btn  mx-2 btn-primary button " @click="fetchCountry">Search</button>
    </div>
    <div v-if="loading">Loading...</div>
    <!-- <div v-if="error" class="error">{{ error }}</div> -->
    <div v-if="countries">
      <div v-if="countries.length > 0">
        <div v-for="(country, index) in countries" :key="index" class="country-summary">
          <h2>{{ country.name.common }}</h2>
          <router-link :to="{ name: 'CountryDetails', params: { name: country.name.common }}">
            <button class="btn btn-secondary my-2">Show Details</button>
          </router-link>
        </div>
      </div>
    </div>
    <div v-else>
          <div :class="error">{{ error }}</div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";
import axios from "axios";

// export default {
//   name: "CountrySearch",
//   setup() {
    const searchQuery = ref("");
    const countries = ref(null);
    const loading = ref(false);
    const error = ref("");
    // const singleCountryButton = ref(null);

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

// watch(
//   () => countries,
//   async (newVal) => {
//     if (newVal && newVal.length === 1) {
//       await nextTick(); // Wait for the DOM to update
//       singleCountryButton.value?.click(); // Programmatically click the button
//     }
//   },
//   { immediate: true }
// );


    // return {
    //   searchQuery,
    //   countries,
    //   loading,
    //   error,
    //   fetchCountry,
    // };
//   },
// };
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
.box{
  display: flex;
  flex-direction: row;
}
.page{
  position: relative;
  min-height: 100vh;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.img{
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  object-fit: cover;
  
}
.container{
  border: 2px solid white;
  padding: 20px;
  background-color: white;
  opacity: 80%;
  border-radius: 10px;
}

</style>
