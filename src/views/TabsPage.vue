<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <!-- Wstecz -->
        <ion-tab-button @click="wroc" tab="wstecz">
          <ion-icon aria-hidden="true" :icon="chevronBack" />
          <ion-label>Wstecz</ion-label>
        </ion-tab-button>

        <!-- Strona Główna -->
        <ion-tab-button tab="tab2" href="/tabs/TabStronaGlowna">
          <ion-icon aria-hidden="true" :icon="home" />
          <ion-label>Główna</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import {IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet} from '@ionic/vue';
import { home, chevronBack } from 'ionicons/icons';
import { useRouter } from 'vue-router';

const router = useRouter();

function wroc() {
  router.back();
}
</script>