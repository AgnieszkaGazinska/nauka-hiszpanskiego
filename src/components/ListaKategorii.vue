<template>
  <ion-list>
    <ion-item v-for="kategoria in kategorie" :key="kategoria.id">

      <ion-button expand="block" @click="$emit('wybierz', kategoria.id)">
        {{ kategoria.nazwa }}
      </ion-button>

      <ion-button fill="clear" @click="$emit('edytuj', kategoria)">
        <ion-icon slot="icon-only" :icon="pencilOutline" style="font-size: 24px;"></ion-icon>
      </ion-button>

      <ion-button size="small" @click="$emit('modyfikuj', kategoria)">
        Edytuj zawartość kategorii
      </ion-button>

      <ion-button v-if="trybUsuwania" color="danger" @click="$emit('usun', kategoria)">
        <ion-icon slot="icon-only" :icon="closeOutline" style="font-size: 24px;"></ion-icon>
      </ion-button>
    </ion-item>
    <ion-button expand="block" @click="$emit('dodaj')">
      <ion-icon slot="start" :icon="addCircleOutline"></ion-icon>
      Dodaj nową kategorię
    </ion-button>
  </ion-list>
</template>

<script setup>
import { pencilOutline, addCircleOutline, closeOutline } from 'ionicons/icons'

defineProps({
  kategorie: Array,
  trybUsuwania: Boolean
})
</script>