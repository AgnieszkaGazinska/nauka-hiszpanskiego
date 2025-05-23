
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Zawartość kategorii: {{ nazwaKategorii }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <!-- Komponent Lista Słówek -->
      <ListaSlowek :slowka="slowka" @edytuj="edytujSlowko" @usun="usunSlowko" />
      <ion-button expand="block" @click="dodajSlowko">Dodaj nowe słówko</ion-button>
    </ion-content>
  </ion-page>
</template>


<script setup>
  import ListaSlowek from '@/components/ListaSlowek.vue';
  import { onMounted, ref } from 'vue';
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, alertController} from '@ionic/vue';
  import { useRoute } from 'vue-router';
  import axios from 'axios';

  const route = useRoute();
  const slowka = ref([]);
  const kategoriaId = ref(route.query.kategoria);
  const nazwaKategorii = ref(route.query.nazwa);

  // Pobieranie słówek
  async function pobierzSlowka() {
    try {
      const res = await axios.get(`http://localhost:3000/api/slowka?kategoria=${kategoriaId.value}`);      slowka.value = res.data;
    } catch (error) {
      console.error('Błąd pobierania słówek:', error);
    }
  }

  // Edycja słówek
  async function edytujSlowko(slowko) {
    const alert = await alertController.create({
      header: 'Edytuj słówko',
      inputs: [
        {
          name: 'polski',
          type: 'text',
          placeholder: 'Polskie słowo',
          value: slowko.polski
        },
        {
          name: 'hiszpanski',
          type: 'text',
          placeholder: 'Hiszpańskie słowo',
          value: slowko.hiszpanski
        }
      ],
      buttons: [
        {
          text: 'Anuluj',
          role: 'cancel'
        },
        {
          text: 'Zapisz',
          handler: async (data) => {
            try {
              await axios.put('http://localhost:3000/api/slowka', {
                id: slowko.id,
                polski: data.polski,
                hiszpanski: data.hiszpanski,
                kategoria_id: kategoriaId.value
              });
              pobierzSlowka();
            } catch (err) {
              console.error('Błąd edycji słówka:', err);
            }
          }
        }
      ]
    });
    await alert.present();
  }

  // Usuwanie słówek
  async function usunSlowko(slowko) {
    const alert = await alertController.create({
      header: 'Usuń słówko',
      message: `Czy na pewno chcesz usunąć słówko: ${slowko.polski}?`,
      buttons: [
        {
          text: 'Anuluj',
          role: 'cancel'
        },
        {
          text: 'Usuń',
          role: 'destructive',
          handler: async () => {
            try {
              await axios.delete(`http://localhost:3000/api/slowka/${encodeURIComponent(slowko.polski)}/${kategoriaId.value}`);
              pobierzSlowka();
            } catch (err) {
              console.error('Błąd usuwania słówka:', err);
            }
          }
        }
      ]
    });
    await alert.present();
  }

  // Dodawanie słówek
  async function dodajSlowko() {
    const alert = await alertController.create({
      header: 'Dodaj nowe słówko',
      inputs: [
        {
          name: 'polski',
          type: 'text',
          placeholder: 'Polskie słowo'
        },
        {
          name: 'hiszpanski',
          type: 'text',
          placeholder: 'Hiszpańskie słowo'
        }
      ],
      buttons: [
        {
          text: 'Anuluj',
          role: 'cancel'
        },
        {
          text: 'Dodaj',
          handler: async (data) => {
            try {
              await axios.post('http://localhost:3000/api/slowka', {
                polski: data.polski,
                hiszpanski: data.hiszpanski,
                kategoria_id: kategoriaId.value
              });
              pobierzSlowka();
            } catch (err) {
              console.error('Błąd dodawania słówka:', err);
            }
          }
        }
      ]
    });
    await alert.present();
  }


onMounted(() => {
  pobierzSlowka()
})
</script>