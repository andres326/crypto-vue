<script setup>
import { ref, reactive, onMounted } from 'vue';
import Alert from './components/Alert.vue';

const currencies = ref([
  { code: 'USD', text: 'US Dollar' },
  { code: 'MXN', text: 'Mexican Peso' },
  { code: 'EUR', text: 'Euro' },
  { code: 'GBP', text: 'Pound Sterling' },
  { code: 'COP', text: 'Colombian Peso' },
])

const estimation = reactive({
  currency: '',
  cryptoCurrency: ''
})

const cryptoCurrencies = ref([])
const error = ref('')

onMounted(() => {
  fetch('https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD')
    .then(response => response.json())
    .then(({ Data }) => cryptoCurrencies.value = Data)
})

const estimateCrypto = () => {
  if (Object.values(estimation).includes('')) {
    error.value = 'All fields are required'
    return
  }
  error.value = ''
}

const getEstimate = async () => {
  const { cryptoCurrency, currency } = estimation
  const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoCurrency}&tsyms=${currency}`
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
          <select id="currency" v-model="estimation.currency">
            <option value="">-- Select --</option>
            <option v-for="currency in currencies" :value="currency.code">{{ currency.text }}</option>
          </select>
        </div>
        <div class="field">
          <label for="crypto">Crypto Currency:</label>
          <select id="crypto" v-model="estimation.cryptoCurrency">
            <option value="">-- Select --</option>
            <option v-for="crypto in cryptoCurrencies" :value="crypto.CoinInfo.Name">{{ crypto.CoinInfo.FullName }}
            </option>
          </select>
        </div>
        <input type="submit" value="Estimate">
      </form>
    </div>
  </div>
</template>
