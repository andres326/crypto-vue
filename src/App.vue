<script setup>
import { ref, reactive, } from 'vue';
import Alert from './components/Alert.vue';
import Spinner from './components/Spinner.vue'
import EstimateResult from './components/EstimateResult.vue'
import Form from './components/Form.vue'
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
      <Form @estimate-crypto="estimateCrypto" :cryptoCurrencies="cryptoCurrencies" :currencies="currencies"
        v-model:currency="estimate.currency" v-model:cryptoCurrency="estimate.cryptoCurrency" />
      <Spinner v-if="loading" />
      <EstimateResult v-if="showResult" :responseEstimate="responseEstimate" />
    </div>
  </div>
</template>
