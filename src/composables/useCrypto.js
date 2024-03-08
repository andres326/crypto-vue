import { ref, onMounted, computed } from 'vue';

export default function useCrypto() {
  const currencies = ref([
    { code: 'USD', text: 'US Dollar' },
    { code: 'MXN', text: 'Mexican Peso' },
    { code: 'EUR', text: 'Euro' },
    { code: 'GBP', text: 'Pound Sterling' },
    { code: 'COP', text: 'Colombian Peso' },
  ]);

  const cryptoCurrencies = ref([]);

  onMounted(() => {
    fetch(
      'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
    )
      .then((response) => response.json())
      .then(({ Data }) => (cryptoCurrencies.value = Data));
  });

  const responseEstimate = ref({});
  const loading = ref(false);

  const getEstimate = async (estimate) => {
    loading.value = true;
    responseEstimate.value = {};
    try {
      const { cryptoCurrency, currency } = estimate;
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoCurrency}&tsyms=${currency}`;
      const response = await fetch(url);
      const data = await response.json();
      responseEstimate.value = data.DISPLAY[cryptoCurrency][currency];
    } catch (error) {
    } finally {
      loading.value = false;
    }
  };

  const showResult = computed(() => {
    return Object.values(responseEstimate.value).length > 0;
  });

  return {
    currencies,
    cryptoCurrencies,
    responseEstimate,
    loading,
    getEstimate,
    showResult,
  };
}
