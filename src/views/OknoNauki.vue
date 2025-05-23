<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="jezyk = 'pl'">🇵🇱</ion-button>
          <ion-button @click="jezyk = 'es'">🇪🇸</ion-button>
        </ion-buttons>
        <ion-title>Fiszki</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div v-if="slowka.length > 0">
        <div v-if="index >= slowka.length && !czyPokazanoPodsumowanie">
          <!-- Komponent Podsumowanie -->
           <Podsumowanie
              :poprawneOdpowiedzi="poprawneOdpowiedzi"
              :slowka="slowka"
              :czasTrwania="czasTrwania"
            />
        </div>
        <div v-else>
          <!-- Komponent Fiszki -->
          <Fiszki
            :slowka="slowka"
            :index="index"
            :odpowiedz="odpowiedz"
            :info="info"
            :jezyk="jezyk"
            @update-odpowiedz= "odpowiedz = $event"
            @dodaj-znak="dodajZnak"
            @sprawdz="sprawdz"
            @pokaz-poprawna="pokazPoprawna"
            @nastepne="nastepne"
            @poprzednie="poprzednie"
          />
        </div>
      </div>
    <div v-else>
      <p>Brak słówek w tej kategorii.</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import Fiszki from '@/components/Fiszki.vue'
import Podsumowanie from '@/components/Podsumowanie.vue'
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonInput, alertController } from '@ionic/vue'

const route = useRoute()
const kategoria = ref(route.query.kategoria || '')
const slowka = ref([])
const index = ref(0)
const odpowiedz = ref('')
const jezyk = ref('pl') // domyślny język
const info = ref('')
const biezaceSlowo = computed(() => slowka.value[index.value] || null)
const poprawneOdpowiedzi = ref(0)
const startCzas = ref(null)
const koniecCzas = ref(null)

const czasTrwania = computed(() => {
  if (!startCzas.value || !koniecCzas.value) return ''
  const sekundy = Math.floor((koniecCzas.value - startCzas.value) / 1000)
  const minuty = Math.floor(sekundy / 60)
  const resztaSekund = sekundy % 60
  return `${minuty} min ${resztaSekund} sek`
})
const czyPokazanoPodsumowanie = ref(false)

onMounted(async () => {
  startCzas.value = new Date()
  if (!kategoria.value) return
  try {
    const res = await axios.get(`http://localhost:3000/api/slowka?kategoria=${encodeURIComponent(kategoria.value)}`)
    console.log('Otrzymane słówka z API:', res.data);
    slowka.value = res.data
    index.value = 0
    odpowiedz.value = ''
    info.value = ''
  } catch (err) {
    console.error('Błąd podczas ładowania słówek:', err)
  }
})

function normalizujTekst(tekst) {
  if (!tekst) return ''; 
  return tekst.normalize('NFC').trim().toLowerCase().replace(/\s+/g, ' ')
}

function sprawdz() {
  if (!biezaceSlowo.value) return
  const poprawne = jezyk.value === 'pl'
    ? normalizujTekst(biezaceSlowo.value.hiszpanski)
    : normalizujTekst(biezaceSlowo.value.polski)
  const uzytkownik = normalizujTekst(odpowiedz.value)
  if (uzytkownik === '') {
    info.value = '❗ Proszę wpisać odpowiedź.'
    return
  }
  if (uzytkownik === poprawne) {
    info.value = '✅ Poprawnie!'
    poprawneOdpowiedzi.value++
  } else {
    info.value = '❌ Niepoprawnie.'
  }
}

function pokazPoprawna() {
  odpowiedz.value = jezyk.value === 'pl'
    ? biezaceSlowo.value.hiszpanski
    : biezaceSlowo.value.polski
}

function dodajZnak(znak) {
  odpowiedz.value += znak
}

async function nastepne() {
  if (index.value < slowka.value.length - 1) {
    index.value++
    odpowiedz.value = ''
    info.value = ''
  } else {
    if (index.value === slowka.value.length - 1) {
      index.value++
      koniecCzas.value = new Date()
      if (!czyPokazanoPodsumowanie.value) {
        czyPokazanoPodsumowanie.value = true
        const alert = await alertController.create({
          header: 'Podsumowanie',
          message: `Poprawne odpowiedzi: ${poprawneOdpowiedzi.value} z ${slowka.value.length}\nCzas: ${czasTrwania.value}`,
          buttons: ['OK']
        })
      await alert.present()
      }
    }
  }
}

function poprzednie() {
  if (index.value > 0) {
    index.value--
    odpowiedz.value = ''
    info.value = ''
  }
}
</script>
