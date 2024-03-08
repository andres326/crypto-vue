<script setup>
import { ref, reactive, } from 'vue';
import Alert from './components/Alert.vue';
import Spinner from './components/Spinner.vue'
import useCrypto from './composables/useCrypto'

const { currencies, cryptoCurrencies, loading, responseEstimate, getEstimate, showResult } = useCrypto()

const estimate = reactive({
  currency: '',
  cryptoCurrency: ''
})


const error = ref('')


const estimateCrypto = () => {
  if (Object.values(estimate).includes('')) {
    error.value = 'All fields are required'
    return
  }
  error.value = ''
  getEstimate(estimate)
}

</script>

<template>
  <div class="container">
    <h1 class="title">Cryptocurrency <span>Trader</span></h1>
    <div class="content">
      <Alert v-if="error">{{ error }}</Alert>
      <form class="form" @submit.prevent="estimateCrypto">
        <div class="field">
          <label for="currency">Currency:</label>
          <select id="currency" v-model="estimate.currency">
            <option value="">-- Select --</option>
            <option v-for="currency in currencies" :value="currency.code">{{ currency.text }}</option>
          </select>
        </div>
        <div class="field">
          <label for="crypto">Crypto Currency:</label>
          <select id="crypto" v-model="estimate.cryptoCurrency">
            <option value="">-- Select --</option>
            <option v-for="crypto in cryptoCurrencies" :value="crypto.CoinInfo.Name">{{ crypto.CoinInfo.FullName }}
            </option>
          </select>
        </div>
        <input type="submit" value="Estimate">
      </form>
      <Spinner v-if="loading" />
      <div v-if="showResult" class="container-result">
        <h2>Result</h2>
        <div class="result"><img :src="`https://cryptocompare.com${responseEstimate.IMAGEURL}`" alt="crypto img">
          <div>
            <p>Price is: <span>{{ responseEstimate.PRICE }}</span></p>
            <p>Highest price for the day: <span>{{ responseEstimate.HIGHDAY }}</span></p>
            <p>Lowest price for the day: <span>{{ responseEstimate.LOWDAY }}</span></p>
            <p>Variation last 24h: <span>{{ responseEstimate.CHANGEPCT24HOUR }}%</span></p>
            <p>Last update: <span>{{ responseEstimate.LASTUPDATE }}</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
