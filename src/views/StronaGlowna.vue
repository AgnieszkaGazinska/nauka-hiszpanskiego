<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Kategorie</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <!-- Komponent Lista Kategorii -->
      <ListaKategorii
        :kategorie="kategorie"
        :trybUsuwania="trybUsuwania"
        @wybierz="wybierzKategorie"
        @edytuj="edytujKategorie"
        @modyfikuj="przejdzDoModyfikacji"
        @usun="potwierdzUsuniecie"
        @dodaj="pokazDodawanie"
      />

      <ion-button expand="block" @click="pokazUsuwanie">
        {{ trybUsuwania ? 'Anuluj usuwanie' : 'Usuń kategorię' }}

      </ion-button>
      <!-- Button do odświeżania strony -->
      <ion-button expand="block" @click="odswiezStrone">
        <ion-icon :icon="refreshOutline" slot="start"></ion-icon>
        Odśwież stronę
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, alertController, IonIcon } from '@ionic/vue'
import { useRouter } from 'vue-router'
import { refreshOutline } from 'ionicons/icons';
import ListaKategorii from '@/components/ListaKategorii.vue';
const router = useRouter();
const kategorie = ref([])
const trybUsuwania = ref(false);


// Przejście do okna nauki po wybraniu kategorii
function wybierzKategorie(id) {
  router.push(`/tabs/TabOknoNauki?kategoria=${id}`);
}


// Dodawanie kategorii
const pokazDodawanie = async () => {
  const alert = await alertController.create({
    header: 'Nowa kategoria',
    inputs: [
      {
        name: 'nazwa',
        type: 'text',
        placeholder: 'Wpisz nazwę kategorii'
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
          const nazwa = data.nazwa;
          try {
            const res = await axios.post('http://localhost:3000/api/kategorie', { nazwa });
            await pobierzKategorie();
            const confirm = await alertController.create({
              header: 'Sukces!',
              message: `Dodano kategorię: "${nazwa}"`,
              buttons: ['OK']
            });
            await confirm.present();
            console.log('Dodano:', res.data);
          } catch (err) {
            console.error('Błąd:', err);
            const errorAlert = await alertController.create({
              header: 'Błąd',
              message: 'Nie udało się dodać kategorii.',
              buttons: ['OK']
            });
            await errorAlert.present();
          }
        }
      }
    ]
  });
  await alert.present();
}

// Pobierz kategorie
async function pobierzKategorie() {
  try {
    const res = await axios.get('http://localhost:3000/api/kategorie')
    kategorie.value = res.data
  } catch (error) {
    console.error('Błąd przy pobieraniu kategorii:', error)
  }
}

// Usuwanie kategorii
function pokazUsuwanie() {
  trybUsuwania.value = !trybUsuwania.value;
}
async function potwierdzUsuniecie(kategoria) {
  const alert = await alertController.create({
    header: 'Potwierdź usunięcie',
    message: `Czy na pewno chcesz usunąć kategorię "${kategoria.nazwa}"?\n\n⚠️ Uwaga: Usunięcie jest nieodwracalne i usunie także zawartość tej kategorii.`,
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
            await axios.delete(`http://localhost:3000/api/kategorie/${kategoria.id}/${encodeURIComponent(kategoria.nazwa)}`);
            await pobierzKategorie();
          } catch (err) {
            console.error('Błąd podczas usuwania:', err);
            const errorAlert = await alertController.create({
              header: 'Błąd',
              message: 'Nie udało się usunąć kategorii.',
              buttons: ['OK']
            });
            await errorAlert.present();
          }
        }
      }
    ]
  });
  await alert.present();
}

//Edycja kategorii
async function edytujKategorie(kategoria) {
  const alert = await alertController.create({
    header: 'Edytuj kategorię',
    inputs: [
      {
        name: 'nowaNazwa',
        type: 'text',
        placeholder: 'Nowa nazwa kategorii',
        value: kategoria.nazwa
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
            await axios.put(`http://localhost:3000/api/kategorie/${kategoria.id}`, {
              id: kategoria.id,
              nowaNazwa: data.nowaNazwa
            })
            await odswiezStrone()
          } catch (error) {
            const blad = await alertController.create({
              header: 'Błąd',
              message: 'Nie udało się zaktualizować nazwy.',
              buttons: ['OK']
            })
            await blad.present()
          }
        }
      }
    ]
  })
  await alert.present()
}

// Odświeżanie
function odswiezStrone() {
  pobierzKategorie();
}

// Przejście do okna modyfikacji
function przejdzDoModyfikacji(kategoria) {
  router.push(`/tabs/TabOknoModyfikacji?kategoria=${kategoria.id}&nazwa=${encodeURIComponent(kategoria.nazwa)}`);
}

onMounted(() => {
  pobierzKategorie()
})

</script>