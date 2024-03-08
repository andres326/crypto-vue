<script setup>

defineProps({
  currencies: {
    type: Array,
    required: true
  },
  cryptoCurrencies: {
    type: Array,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  cryptoCurrency: {
    type: String,
    required: true
  }
})

defineEmits(['estimate-crypto', 'update:currency', 'update:cryptoCurrency'])

</script>
<template>
  <form class="form" @submit.prevent="$emit('estimate-crypto')">
    <div class="field">
      <label for="currency">Currency:</label>
      <select id="currency" :value="currency" @input="$event => $emit('update:currency', $event.target.value)">
        <option value="">-- Select --</option>
        <option v-for="currency in currencies" :value="currency.code">{{ currency.text }}</option>
      </select>
    </div>
    <div class="field">
      <label for="crypto">Crypto Currency:</label>
      <select id="crypto" :value="cryptoCurrency" @input="$event => $emit('update:cryptoCurrency', $event.target.value)">
        <option value="">-- Select --</option>
        <option v-for="crypto in cryptoCurrencies" :value="crypto.CoinInfo.Name">{{ crypto.CoinInfo.FullName }}
        </option>
      </select>
    </div>
    <input type="submit" value="Estimate">
  </form>
</template>
