
export const metadata = {
  title: 'Privacybeleid | Advies N Consultancy BV',
  description: 'Privacybeleid van Advies N Consultancy BV - Hoe wij uw persoonlijke gegevens beschermen en verwerken.'
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Privacybeleid</h1>
          <p className="text-xl text-muted-foreground">
            Hoe Advies N Consultancy BV uw persoonlijke gegevens beschermt en verwerkt
          </p>
          <div className="flex justify-center items-center space-x-2 mt-4">
            <div className="text-sm border rounded px-2 py-1">
              Laatst bijgewerkt: 11 juli 2025
            </div>
            <div className="text-sm border rounded px-2 py-1">
              GDPR Compliant
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">1. Wie zijn wij?</h2>
            <p className="mb-4">
              Advies N Consultancy BV is een IT-consultancybedrijf gevestigd in Voorburg, Nederland. 
              Wij zijn verantwoordelijk voor de verwerking van uw persoonlijke gegevens zoals beschreven in dit privacybeleid.
            </p>
            <div className="bg-gray-50 p-4 rounded">
              <h3 className="font-semibold mb-2">Contactgegevens:</h3>
              <p><strong>Bedrijfsnaam:</strong> Advies N Consultancy BV</p>
              <p><strong>E-mail:</strong> marc@adviesnconsultancy.nl</p>
              <p><strong>Website:</strong> adviesnconsultancy.nl</p>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">2. Welke gegevens verzamelen wij?</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Persoonlijke gegevens</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Naam en e-mailadres (bij QuickScan en contactformulieren)</li>
                  <li>Bedrijfsinformatie (bij vrijblijvende gesprekken)</li>
                  <li>Communicatiegegevens (bij contact via e-mail of telefoon)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Automatisch verzamelde gegevens</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>IP-adres (geanonimiseerd)</li>
                  <li>Browsertype en -versie</li>
                  <li>Paginabezoeken en navigatiepatronen</li>
                  <li>Tijd en datum van bezoek</li>
                  <li>Referrer-URL</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">3. Cookies en tracking</h2>
            <p className="mb-4">
              Wij gebruiken cookies en vergelijkbare technologieën om uw ervaring op onze website te verbeteren 
              en voor analysedoeleinden. U kunt uw voorkeuren beheren via onze cookie-instellingen.
            </p>
            <div className="space-y-4">
              <h3 className="font-semibold mb-2">Cookie categorieën</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded">
                  <h4 className="font-medium mb-1">🔒 Noodzakelijke cookies</h4>
                  <p className="text-sm">Voor basisfunctionaliteit van de website</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <h4 className="font-medium mb-1">📊 Analytische cookies</h4>
                  <p className="text-sm">Google Analytics 4, Microsoft Clarity</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <h4 className="font-medium mb-1">🎯 Marketing cookies</h4>
                  <p className="text-sm">Toekomstige marketing functionaliteit</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <h4 className="font-medium mb-1">⚙️ Voorkeur cookies</h4>
                  <p className="text-sm">Thema, taal, A/B testing</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">4. Uw rechten</h2>
            <p className="mb-4">
              Onder de AVG heeft u de volgende rechten met betrekking tot uw persoonlijke gegevens:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-semibold">Recht van inzage</h3>
                <p className="text-sm">U kunt vragen welke gegevens wij van u verwerken</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Recht van rectificatie</h3>
                <p className="text-sm">U kunt vragen onjuiste gegevens te corrigeren</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Recht van vergetelheid</h3>
                <p className="text-sm">U kunt vragen uw gegevens te verwijderen</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Recht van overdraagbaarheid</h3>
                <p className="text-sm">U kunt vragen uw gegevens over te dragen</p>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">5. Contact</h2>
            <p className="mb-4">
              Heeft u vragen over dit privacybeleid of wilt u gebruik maken van uw rechten? 
              Neem dan contact met ons op.
            </p>
            <div className="bg-gray-50 p-4 rounded">
              <h3 className="font-semibold mb-2">Contactgegevens:</h3>
              <p><strong>E-mail:</strong> marc@adviesnconsultancy.nl</p>
              <p><strong>Onderwerp:</strong> Privacy verzoek</p>
              <p><strong>Reactietijd:</strong> Binnen 30 dagen</p>
            </div>
          </section>
        </div>

        <hr className="my-12" />

        <div className="text-center">
          <p className="text-gray-600">
            Dit privacybeleid is opgesteld in overeenstemming met de Algemene Verordening Gegevensbescherming (AVG) 
            en de Nederlandse implementatiewet.
          </p>
        </div>
      </div>
    </div>
  )
}
