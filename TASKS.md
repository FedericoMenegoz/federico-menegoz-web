# Valutazione del sito e task di miglioramento

Valutazione del 30 ottobre 2026 sulla versione locale in `dist/`.

Il sito ha una direzione riconoscibile: terminale per lo sviluppo e manopole
ispirate alla musica. La base tecnica è proporzionata a un sito personale:
HTML, CSS e JavaScript senza dipendenze, font di sistema, circa 22,7 kB di asset
non compressi. Sono già presenti focus visibile, controlli nativi da tastiera,
riduzione del movimento, pausa, tema persistente e gestione degli errori dello storage.

Il problema principale è il percorso del visitatore: la Home descrive soltanto
due attività, tre destinazioni del menu sono vuote e Music non offre contenuti.
Oggi si comprende l'impostazione del sito, ma mancano elementi per valutare il
lavoro svolto e avviare un contatto. La prima iterazione dovrebbe completare
questo percorso mantenendo l'identità grafica e l'architettura statica.

## Metodo e limiti

- Esaminati HTML, CSS, JavaScript, README e struttura degli asset.
- Eseguiti controlli di sintassi JavaScript, unicità degli ID e presenza degli
  asset direttamente referenziati dall'HTML.
- Eseguita la logica reale degli script in un ambiente Node con DOM simulato:
  link diretto, pagina corrente, cambio Dev/Music, ritorno a Dev, hash sconosciuto
  e pausa durante la scrittura. Questo verifica la logica, non il rendering.
- Chrome headless non si avvia: il sandbox dell'ambiente impedisce un'operazione
  sui socket. Nessuna verifica visiva, con screen reader o Lighthouse è stata
  completata. Le relative attività sotto sono verifiche da eseguire, non difetti
  di rendering già dimostrati.
- Non sono stati verificati dominio, hosting o versione pubblicata.

Priorità: **P0** = percorso essenziale da completare prima di presentare il sito
come portfolio; **P1** = prima iterazione; **P2** = consolidamento successivo.
Le priorità descrivono l'impatto sul portfolio, non incidenti di produzione.

## Backlog

### T01 — P0 — Rendere possibile il contatto — Completato

**Evidenza:** `dist/index.html:110` contiene soltanto “Coming soon.”;
Home e footer non offrono collegamenti di contatto.

**Intervento realizzato:** su richiesta del proprietario, rimossa la sezione
Contacts e aggiunti soltanto LinkedIn e GitHub nel footer, con i collegamenti
indicati nel CV. I profili sono raggiungibili con un clic anche dalla Home,
in Music e senza JavaScript. I link hanno etichette descrittive, focus visibile
e un'area interattiva alta almeno 44 px.

**Completamento:**

- [x] Il visitatore raggiunge un profilo professionale dalla Home con un clic.
- [x] Il footer sostituisce Contacts con link nativi descrittivi e accessibili da tastiera.
- [x] I profili sono quelli del CV, espressamente autorizzati dal proprietario.

**Verifica:** controllati struttura HTML, corrispondenza degli URL con il CV e
navigazione dopo la rimozione di Contacts. La verifica visiva e con tastiera
in un browser reale resta da eseguire.

### T02 — P0 — Dare una destinazione utile alla modalità Music

**Evidenza:** `dist/js/navigation.js:14` nasconde tutto `dev-content`;
in `dist/index.html` non esiste un contenitore di contenuti Music.

**Intervento:** aggiungere una breve presentazione musicale, almeno un
collegamento di ascolto reale e un canale per richieste musicali. Se i materiali
non sono ancora disponibili, rimandare l'attivazione pubblica della modalità.

**Avanzamento del 30 ottobre 2026:** aggiunta la sezione Music; su successiva
richiesta del proprietario, sostituiti i player SoundCloud con player MP3 in stile
terminale. Il proprietario ha fornito i WAV e scelto i titoli **Unconfy** ed
**Ersh**: aggiunte le copie MP3 per il sito, conservando gli originali fuori
dalla cartella pubblicabile. Sono presenti Play/Pausa, Stop, durata e barra
testuale interattiva legata al tempo di riproduzione. File, durata e decodifica
sono verificati localmente; l'ascolto effettivo nel browser resta da verificare.
Restano da definire il canale per richieste musicali e contenuti che
rappresentino anche l'attività di danza.

**Completamento:**

- [x] Music mostra le due tracce fornite, con player e controlli di ascolto.
- [x] Il passaggio tra Dev e Music mantiene comprensibili identità e destinazione.
- [ ] Le etichette Producer, DJ e Dancer riflettono i contenuti effettivamente disponibili.

### T03 — P1 — Presentare un progetto pubblico verificabile — Completato

**Evidenza:** `dist/index.html:102` mostra un segnaposto; le competenze della
Home non sono accompagnate da esempi.

**Intervento aggiornato dal proprietario:** presentare soltanto Brickworks-rs,
progetto pubblico verificabile. I lavori aziendali restano nel CV e non vengono
usati come casi da mostrare. Descrivere obiettivo, contributo personale e
artefatti disponibili, con collegamenti al codice e alle istruzioni di build.
Il confronto numerico è stato esplicitamente escluso dalla richiesta.

**Completamento:**

- [x] Il caso distingue il contributo personale dalla libreria C originale di Orastron.
- [x] Gli artefatti sono consultabili: libreria Rust/binding C e plugin di distorsione VST3/CLAP.
- [x] I repository pubblici e le istruzioni di build sono collegati; non sono presentati risultati numerici non verificati.

**Intervento realizzato:** consultati i README pubblici di `brickworks-rs` e
`Brickworks-rs-plugin` sul GitHub indicato dal proprietario. Rimossi i due casi
aziendali e le richieste di screenshot, metriche o dettagli relativi a quei lavori.
Brickworks presenta il contributo Rust/FFI, l'integrazione nih-plug e il comando
di build documentato, con link ai due repository. Build e benchmark del progetto
esterno non sono stati eseguiti; non viene dichiarato alcun risultato misurato.

### T04 — P1 — Chiarire proposta professionale e gerarchia della Home — Completato

**Evidenza:** `dist/index.html:94` presenta due punti generici; il nome completo
e il titolo nell'H1 sono nascosti visivamente. Il ruolo visibile è animato.

**Intervento:** aggiungere un'introduzione stabile che spieghi specializzazione,
problemi affrontati e tipo di collaborazione cercata. Dare priorità a identità,
progetti e contatto, conservando il terminale come elemento distintivo.

**Completamento:**

- [x] Nome e proposta professionale sono leggibili senza attendere l'animazione.
- [x] Home collega i progetti e offre i profili di contatto nel footer.
- [x] I fatti provengono dal CV fornito; disponibilità non documentate sono lasciate da completare.

**Intervento realizzato:** nome e specializzazione Java/Spring Boot sono ora
statici e visibili, con una sintesi del lavoro full stack, stack essenziale,
trasferimento e diritto al lavoro riportati dal CV. Home collega Projects e CV;
i profili di contatto restano nel footer. Disponibilità effettiva e preferenza
di lavoro sono indicate come informazioni da aggiungere fra parentesi quadre.

### T05 — P1 — Completare il CV consultabile sul sito

**Evidenza:** `dist/index.html:106` non contiene esperienze né un documento.

**Intervento:** pubblicare una sintesi HTML di esperienze, responsabilità e
competenze. Offrire eventualmente un PDF coerente con la versione HTML,
preparato appositamente per la pubblicazione.

**Completamento:**

- [x] Il percorso professionale si può valutare senza scaricare un file.
- [x] Le esperienze evidenziano responsabilità e risultati, oltre alle tecnologie.
- [ ] Un eventuale PDF è aggiornato, leggibile e privo di dati personali non necessari.

**Avanzamento:** sintesi HTML completata con esperienze, contributi tecnici,
competenze raggruppate, formazione e lingue. Selezione orientata alla valutazione
di un profilo full stack Java/Spring Boot. Il PDF resta opzionale e non è stato
pubblicato; il CV sorgente non è stato modificato.

### T06 — P1 — Rendere condivisibile e ripristinabile la modalità Music

**Evidenza:** `dist/js/navigation.js:11` legge solo la pagina Dev dall'hash;
il cambio modalità non modifica l'URL. Riprodotto: passando a Music da Projects,
l'indirizzo resta `#projects`.

**Intervento:** rappresentare modalità e destinazione nell'URL con uno schema
documentato, preservando i collegamenti Dev esistenti. Inizializzare interfaccia
e contenuti dallo stesso stato di navigazione.

**Completamento:**

- [ ] Un link a Music apre Music anche in una nuova scheda e dopo un reload.
- [ ] Indietro e Avanti ripristinano modalità, contenuto e selettore coerenti.
- [ ] `#home`, `#projects` e `#cv` continuano a funzionare; `#contacts`, rimosso
  con T01, ripristina Home.
- [ ] Tornando a Dev viene conservata una destinazione coerente con la navigazione.

**Dipendenza:** T02.

### T07 — P1 — Mostrare un'identità completa quando si sospende l'animazione

**Evidenza:** `dist/js/typewriter.js:107` arresta il timer ma conserva il testo
parziale. Riprodotto: pausa durante la prima scrittura lascia il ruolo visibile
come una sola lettera. Anche l'identità cambia attraverso cancellazione e riscrittura.

**Intervento:** definire la pausa come stato statico leggibile: completare nome
e ruolo del profilo attivo, mantenendo corretto il successivo riavvio.

**Completamento:**

- [ ] Pausa durante scrittura, cancellazione e cambio profilo lascia testi completi.
- [ ] Ripresa e cambi rapidi di modalità non avviano animazioni concorrenti.
- [ ] Il movimento ridotto continua a mostrare subito un profilo completo.

### T08 — P1 — Mantenere disponibili i contenuti essenziali senza animazione o JavaScript

**Evidenza:** nell'HTML il menu e le pagine secondarie sono `hidden`.
Senza JavaScript rimane solo Home. L'attivazione del selettore Dev/Music è
inoltre affidata a `typewriter.js`, mentre la visibilità del contenuto è
gestita da `navigation.js`.

**Intervento:** rendere contatti e informazioni professionali essenziali
consultabili nell'HTML di base. Affidare lo stato delle sezioni alla navigazione,
con l'animazione come comportamento aggiuntivo. È possibile mantenere una
singola pagina statica.

**Completamento:**

- [ ] Con JavaScript disabilitato sono raggiungibili presentazione, progetti e contatto.
- [ ] Se il solo script dell'animazione non si carica, il percorso principale resta utilizzabile.
- [ ] La versione con JavaScript conserva link diretti e navigazione funzionante.

### T09 — P1 — Verificare focus, titoli e annunci con tecnologie assistive

**Evidenza:** `dist/js/navigation.js` cambia la visibilità ma non gestisce
esplicitamente il focus; le sezioni secondarie prendono il nome dai link del menu
e non hanno un proprio titolo visibile. Sono già presenti buone basi di accessibilità.

**Intervento:** verificare il comportamento effettivo con tastiera e almeno
uno screen reader, poi correggere eventuali salti di focus o annunci poco chiari.
Aggiungere un collegamento per saltare al contenuto se utile al percorso finale.

**Completamento:**

- [ ] Pagina attiva, cambio modalità e controlli sono comprensibili senza vista.
- [ ] Dopo navigazione, Indietro e Avanti, il focus rimane in una posizione utile e visibile.
- [ ] Gli aggiornamenti animati non producono annunci ripetitivi.
- [ ] Il contenuto mantiene una gerarchia di titoli chiara con e senza JavaScript.

### T10 — P1 — Completare la revisione visiva e responsive con contenuti reali

**Evidenza:** il CSS prevede breakpoint a 840, 480 e 420 px e testi piccoli
per menu e controlli. Il rendering non è stato verificabile in questo ambiente;
overflow, contrasto e stabilità visiva restano da misurare.

**Intervento:** verificare entrambe le modalità e i temi su desktop e telefono,
con testi finali, zoom e movimento ridotto. Valutare leggibilità e peso dei
controlli rispetto alla presentazione, preservando lo stile minimale.

**Completamento:**

- [ ] Nessuno scorrimento orizzontale a 320, 375, 768, 1024 e 1440 CSS px.
- [ ] Contenuti e controlli restano utilizzabili con zoom al 200%.
- [ ] Contrasto di testo, focus e controlli verificato in entrambi i temi.
- [ ] Animazione e cambio modalità non causano spostamenti fastidiosi del contenuto.
- [ ] Verificati almeno Chromium, Firefox e Safari, anche su un dispositivo mobile reale.

**Dipendenze:** T02–T05, per evitare una revisione basata sui soli segnaposto.

### T11 — P2 — Completare metadati e anteprima di condivisione

**Evidenza:** `dist/index.html:7` include description e metadati Open Graph
di base, ma manca un'immagine di anteprima, `og:url` e un URL canonical.
Il titolo cambia per modalità, non per pagina Dev.

**Intervento:** definire i metadati sull'indirizzo pubblico definitivo,
aggiungere un'immagine coerente e titoli comprensibili per le destinazioni.
Mantenere allineati contenuto visibile e anteprima. Valutare URL HTML distinti
solo se servono anteprime indipendenti per le diverse sezioni.

**Completamento:**

- [ ] Canonical e `og:url` puntano all'indirizzo pubblico scelto, mai a localhost.
- [ ] Immagine di condivisione pubblica, testo alternativo e descrizione sono presenti.
- [ ] L'anteprima è verificata sull'URL distribuito, senza affidarsi all'esecuzione di JavaScript.
- [ ] Titoli delle pagine Dev identificano la destinazione nella scheda del browser.

**Dipendenze:** contenuti finali e indirizzo pubblico confermato.

### T12 — P2 — Conservare controlli di regressione sui percorsi principali

**Evidenza:** nel repository non risultano test ripetibili. Navigazione,
profilo e animazione condividono stato e gestiscono numerosi eventi.

**Intervento:** aggiungere una piccola suite sui comportamenti osservabili:
link diretti, cronologia, modalità, pausa, movimento ridotto e storage non
disponibile. Usare un browser reale per i percorsi che dipendono dal DOM.

**Completamento:**

- [ ] Un comando documentato verifica i percorsi principali e termina con errore se falliscono.
- [ ] Inclusi i casi di regressione di T06 e T07 e il caricamento senza animazione di T08.
- [ ] I controlli non dipendono dai singoli fotogrammi o dai tempi esatti della scrittura.

### T13 — P2 — Rendere ripetibile la preparazione del pacchetto pubblicabile

**Evidenza:** il README indica `dist/` come contenuto da distribuire e uno ZIP
esterno al repository. Non c'è un comando versionato per rigenerare e verificare
il pacchetto. Il repository locale è su `main` e non ha ancora commit.

**Intervento:** documentare o automatizzare la generazione dello ZIP a partire
da `dist/`, con un controllo di corrispondenza degli asset. Versionare i sorgenti
quando richiesto dal proprietario e mantenere esclusi appunti e dati privati.

**Completamento:**

- [ ] Un comando ripetibile produce un archivio con `index.html` alla radice.
- [ ] Il contenuto estratto coincide con `dist/` e include tutti gli asset referenziati.
- [ ] `.codex/` resta ignorata; il pacchetto contiene solo file pubblicabili.
- [ ] L'anteprima locale e la cartella da distribuire sono documentate senza passaggi ambigui.

## Ordine operativo suggerito

1. T01 e T02: chiudere i percorsi che oggi terminano senza un'azione utile.
2. T03, T04 e T05: raccogliere e pubblicare materiali professionali reali.
3. T06, T07 e T08: consolidare navigazione, identità statica e accesso ai contenuti.
4. T09 e T10: validare l'esperienza completa con browser e tecnologie assistive.
5. T11, T12 e T13: consolidare condivisione, regressioni e distribuzione.

I task editoriali richiedono materiali e preferenze del proprietario; questo
backlog non autorizza la pubblicazione di recapiti o documenti privati. Le
modifiche proposte non sono state applicate al sito durante la valutazione.
