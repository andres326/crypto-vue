<script setup>
defineProps({
  responseEstimate: {
    type: Object,
    required: true
  }
})
</script>
<template>
  <div class="container-result">
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
</template>
