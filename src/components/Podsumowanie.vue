<template>
  <div>
    <h2>Podsumowanie</h2>
    <p>Poprawne odpowiedzi: {{ poprawneOdpowiedzi }} z {{ slowka.length }}</p>
    <p class="czas">Czas: {{ czasTrwania }}</p>
  </div>
</template>

<script setup>
defineProps({
  poprawneOdpowiedzi: Number,
  slowka: Array,
  czasTrwania: String
})
</script>

<style scoped>
.podsumowanie-box {
  text-align: center;
  margin-top: 20px;
}
.czas {
  margin-top: 12px;
  font-weight: bold;
  color: #444;
}
</style>
