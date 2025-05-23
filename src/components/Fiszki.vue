<template>
  <div>
    <h2>{{ jezyk === 'pl' ? slowka[index]?.polski : slowka[index]?.hiszpanski }}</h2>

    <ion-input
      :value="odpowiedz"
      placeholder="Wpisz tłumaczenie..."
      @ionInput="$emit('update-odpowiedz', $event.detail.value)"
    ></ion-input>

    <div class="diakrytyczne">
      <ion-button size="small" @click="$emit('dodaj-znak', 'á')">á</ion-button>
      <ion-button size="small" @click="$emit('dodaj-znak', 'é')">é</ion-button>
      <ion-button size="small" @click="$emit('dodaj-znak', 'í')">í</ion-button>
      <ion-button size="small" @click="$emit('dodaj-znak', 'ó')">ó</ion-button>
      <ion-button size="small" @click="$emit('dodaj-znak', 'ú')">ú</ion-button>
      <ion-button size="small" @click="$emit('dodaj-znak', 'ñ')">ñ</ion-button>
      <ion-button size="small" @click="$emit('dodaj-znak', 'ü')">ü</ion-button>
    </div>

    <ion-button expand="block" @click="$emit('sprawdz')">Sprawdź</ion-button>

    <p>{{ info }}</p>

    <ion-button expand="block" color="medium" @click="$emit('pokaz-poprawna')">
      Pokaż prawidłową odpowiedź
    </ion-button>

    <div class="nawigacja">
      <ion-button @click="$emit('poprzednie')" :disabled="index === 0">←</ion-button>
      <span>{{ index + 1 }} / {{ slowka.length }}</span>
      <ion-button @click="$emit('nastepne')">→</ion-button>
    </div>
  </div>
</template>

<script setup>
import { IonInput, IonButton } from '@ionic/vue'

defineProps({
  slowka: Array,
  index: Number,
  odpowiedz: String,
  info: String,
  jezyk: String
})
</script>

<style scoped>
.diakrytyczne {
  margin: 10px 0;
}
.nawigacja {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 20px;
}
</style>