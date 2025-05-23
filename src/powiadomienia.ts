import { LocalNotifications } from '@capacitor/local-notifications'
import { Preferences } from '@capacitor/preferences'

export async function powiadomienie() {
  const { value } = await Preferences.get({ key: 'lastOpen' })

  if (value) {
    const ostatniRaz = new Date(value)
    const teraz = new Date()
    const roznicaGodzin = (teraz.getTime() - ostatniRaz.getTime()) / (1000 * 60 * 60)

    if (roznicaGodzin >= 24) {
      await LocalNotifications.schedule({
        notifications: [
          {
            title: 'Czas na naukę!',
            body: 'Nie widzieliśmy Cię od wczoraj. Wróć do nauki hiszpańskiego!',
            id: 1,
            schedule: { at: new Date(new Date().getTime() + 5000) } // za 5 sek
          }
        ]
      })
    }
  }

  // Zaktualizuj datę
  await Preferences.set({
    key: 'lastOpen',
    value: new Date().toISOString()
  })
}