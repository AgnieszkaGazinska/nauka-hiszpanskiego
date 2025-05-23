<template>
  <ion-list>
    <ion-item v-for="slowko in slowka" :key="slowko.id">
      <ion-label>
        <h2>{{ slowko.polski }}</h2>
        <p>{{ slowko.hiszpanski }}</p>
      </ion-label>
      <ion-button fill="clear" color="primary" @click="$emit('edytuj', slowko)">
        <ion-icon slot="icon-only" :icon="pencilOutline" style="font-size: 24px;" />
      </ion-button>
      <ion-button fill="clear" color="danger" @click="$emit('usun', slowko)">
        <ion-icon slot="icon-only" :icon="closeOutline" style="font-size: 24px;" />
      </ion-button>
    </ion-item>
  </ion-list>
</template>

<script setup>
import { IonList, IonItem, IonLabel, IonButton, IonIcon } from '@ionic/vue';
import { pencilOutline, closeOutline } from 'ionicons/icons';

defineProps({
  slowka: Array
});

defineEmits(['edytuj', 'usun']);
</script>
