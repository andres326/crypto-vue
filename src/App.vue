<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import Alert from './components/Alert.vue';

const currencies = ref([
  { code: 'USD', text: 'US Dollar' },
  { code: 'MXN', text: 'Mexican Peso' },
  { code: 'EUR', text: 'Euro' },
  { code: 'GBP', text: 'Pound Sterling' },
  { code: 'COP', text: 'Colombian Peso' },
])

const estimate = reactive({
  currency: '',
  cryptoCurrency: ''
})

const cryptoCurrencies = ref([])
const error = ref('')
const responseEstimate = ref({})

onMounted(() => {
  fetch('https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD')
    .then(response => response.json())
    .then(({ Data }) => cryptoCurrencies.value = Data)
})

const estimateCrypto = () => {
  if (Object.values(estimate).includes('')) {
    error.value = 'All fields are required'
    return
  }
  error.value = ''
  getEstimate()
}

const getEstimate = async () => {
  const { cryptoCurrency, currency } = estimate
  const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoCurrency}&tsyms=${currency}`
  const response = await fetch(url)
  const data = await response.json()
  responseEstimate.value = data.DISPLAY[cryptoCurrency][currency]
}

const showResult = computed(() => {
  return Object.values(responseEstimate.value).length > 0
})
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
