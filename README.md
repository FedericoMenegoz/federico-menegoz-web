# Federico Menegoz

Pagina personale statica, in inglese, senza dipendenze o compilazione.

La valutazione tecnica e il backlog dei miglioramenti, con priorità e criteri di
completamento, sono in [TASKS.md](./TASKS.md).

## Anteprima locale

Per vedere subito la pagina, aprire `dist/index.html` nel browser. Non serve
un server: tutti i riferimenti agli asset locali sono relativi. I player Music
usano file MP3 locali e non richiedono servizi esterni.

In alternativa:

```sh
cd site # Se si parte dalla cartella che contiene il repository.
python3 -m http.server 8000 --directory dist
```

Aprire <http://localhost:8000>.

## Contenuti e struttura

- `dist/index.html`: struttura, navigazione e contenuti delle tre pagine Dev.
- `dist/styles.css`: punto d'ingresso dei fogli di stile.
- `dist/css/base.css`: temi, reset e accessibilità.
- `dist/css/layout.css`: intestazione, corpo, footer e layout responsive.
- `dist/css/controls.css`: manopole e pulsante pausa/play.
- `dist/css/terminal.css`: prompt, cursore e animazione.
- `dist/css/content.css`: menu, contenuti Dev e player Music responsive.
- `dist/js/config.js`: profili, titoli, competenze e durate della scrittura.
- `dist/js/theme.js`: manopola del tema e persistenza della preferenza.
- `dist/js/typewriter.js`: animazione del prompt, cambio identità e pausa.
- `dist/js/navigation.js`: navigazione Dev e visibilità delle sezioni Dev/Music.
- `dist/js/music.js`: riproduzione MP3, avanzamento, ricerca e stati dei player terminale.
- `dist/audio/`: copie MP3 delle tracce pubblicate.
- `dist/favicon.svg`: favicon.

La manopola Dev / Music nell'intestazione sceglie la sezione: ha due posizioni,
una tacca a contrasto e una scala graduata ispirata ai sintetizzatori. Un clic la ruota
da una posizione all'altra. Il prompt mostra l'username del profilo selezionato,
seguito direttamente dalle competenze animate dopo `~/`. Dev alterna Software Developer e
Full Stack Developer; Music alterna Producer, DJ e Dancer. Il cambio di sezione
cancella e riscrive nome e competenze, senza passaggi automatici tra le identità.
Una pausa di 500 ms separa il completamento del nuovo nome dall'inizio delle
competenze; la durata è configurabile come `timing.profileGap` in `config.js`.

Il selettore è accessibile con tastiera (Tab, poi Spazio). Il pulsante nel footer
permette di sospendere l'animazione, con icone SVG monocromatiche di pausa e play.
Con movimento ridotto il cambio di sezione
è immediato e statico; senza JavaScript resta visibile il prompt developer.

Il tema iniziale è scuro, con testo bianco. Una seconda manopola, affiancata
dalle icone luna/sole, passa al tema chiaro e conserva la scelta in localStorage
quando disponibile. Il cambio di tema è indipendente dalla sezione e non
interrompe la scrittura. I nomi appaiono come username (`federico.menegoz` e
`sweaty.effe`) nel prompt `federico.menegoz@dev:~/` o `sweaty.effe@music:~/`.
Il prompt usa font Courier e cursore a blocco.
Identità e competenze sono sulla stessa riga quando lo spazio lo permette; sugli
schermi più stretti vanno a capo. Le competenze riservano una larghezza stabile,
senza aggiungere spazio dopo il prompt; sui telefoni più stretti l'altezza
riservata evita spostamenti del menu durante il cambio di profilo.

Il prompt e il menu formano un unico blocco a sinistra, allineato in basso
rispetto alle due manopole a destra. Il pulsante
pausa/play resta nel footer. Su schermi piccoli le manopole passano sopra il prompt,
lasciando il menu subito sotto il testo. Il contenitore
`main#content` contiene le pagine Dev ricavate dal CV oppure i player Music,
secondo la modalità selezionata. Il logo `fm.` è stato rimosso.

Header e footer restano sempre visibili: la pagina occupa l'altezza dinamica
della finestra, con il contenuto nella riga centrale. Scorre soltanto
`#content-scroll`, con barra nascosta e una maschera trasparente ai bordi superiore
e inferiore. Il contenuto è disposto in una colonna centrale; le sezioni brevi
sono centrate anche in altezza, quelle lunghe scorrono normalmente fino alla
fine. Il footer diventa più compatto sugli schermi stretti.

L'area centrale è raggiungibile con Tab e supporta lo scorrimento nativo con
tastiera, mouse e touch. I margini di scorrimento mantengono i controlli
focalizzati fuori dalla sfumatura. Cambiando pagina o modalità lo scorrimento
torna all'inizio; gli aggiornamenti della stessa sezione conservano la posizione.

In Music sono presenti due player MP3 nello stile del terminale, con i comandi
`play Unconfy` e `play Ersh`, con ciascun nome in un riquadro a doppio bordo.
Ogni traccia ha Play/Pausa, Stop,
tempo trascorso, durata e una barra testuale come `[======>.............] 30%`.
La barra rappresenta il tempo realmente riprodotto: si può cliccare per spostarsi
nella traccia oppure usare Tab e le frecce. Non sono presenti animazioni fittizie.
I colori seguono il tema del sito.

Le schede hanno una superficie leggermente sfumata e un'ombra morbida, adattate
ai due temi. Durante la riproduzione si accende un bagliore fisso, interno ed
esterno, senza pulsazioni. Si spegne in pausa, durante il buffering, a fine
traccia o tornando a Dev. Accensione e spegnimento sfumano in 700 ms, mentre
l'audio risponde subito ai controlli. Con movimento ridotto il cambio è immediato.

La barra occupa tutta la larghezza disponibile prima della percentuale; il numero
di caratteri si adatta allo spazio. Si può cliccare, trascinare o usare il touch
per cercare una posizione, con precisione dello 0,1% della durata. L'area
interattiva coincide con la barra, è alta almeno 44 px ed esclude la percentuale.
La ricerca mantiene lo stato Play/Pausa e resta disponibile da tastiera.

Le tracce fornite in WAV sono state convertite in MP3 VBR con FFmpeg/libmp3lame
(`-q:a 2`) per la riproduzione sul sito:

- **Unconfy**: `dist/audio/uncomfy_05.mp3`, da `uncomfy_05.wav`.
- **Ersh**: `dist/audio/erh_shh.mp3`, da `erh_shh.wav`.

I WAV originali sono conservati senza modifiche in `audio-originals/`, fuori da
`dist/` ed esclusi da Git e dal pacchetto pubblicabile. Titoli visibili e metadati
MP3 usano i nomi indicati dal proprietario. Per cambiare un titolo, aggiornare
`data-title`, intestazione ed etichette accessibili nell'HTML; il percorso reale
del file resta in `audio[src]` ed è indipendente dal nome mostrato.

Aprendo Music vengono lette le durate e abilitati i controlli. In caso di file
non disponibile il player rimane inattivo con il messaggio previsto, senza
mostrare un avanzamento fittizio.

L'audio viene caricato soltanto entrando in Music, senza autoplay. Può suonare
una sola traccia alla volta. Tornando a Dev la riproduzione va in pausa;
riaprendo Music è possibile riprenderla dalla posizione conservata. Stop riporta
all'inizio. Non sono richiesti SoundCloud, chiavi API, librerie o compilazione.
Per un'anteprima via HTTP usare il comando sopra: il sito e i file audio devono
essere pubblicati insieme. Lo ZIP va rigenerato anche dopo l'aggiunta degli MP3.

Il menu Dev contiene Home, Projects e CV, con link `#home`, `#projects`
e `#cv`. I contenuti in inglese sono selezionati dal CV fornito, con priorità
alle informazioni utili a valutare una candidatura full stack:

- Home: identità e specializzazione stabili, stack principale, trasferimento e
  diritto al lavoro, collegamenti diretti a progetti e percorso professionale.
- Projects: il solo progetto pubblico Brickworks-rs, con obiettivo, contributo
  individuale, libreria DSP, plugin di distorsione VST3/CLAP e collegamenti ai
  due repository GitHub. I lavori aziendali restano descritti soltanto nel CV.
- CV: esperienze in ordine cronologico inverso, competenze raggruppate,
  formazione, lingue e una sintesi delle esperienze precedenti.

L'informazione da integrare resta indicata in inglese fra parentesi quadre:
disponibilità effettiva e modalità di lavoro preferita. I contenuti di Brickworks
provengono dai README pubblici della libreria e del plugin; il comando di build
documentato è consultabile anche nella sezione espandibile del progetto.
Il confronto numerico non è richiesto dal proprietario e non viene presentato.
React/TypeScript resta indicato come esperienza limitata con
codebase esistenti. Non è stato aggiunto un PDF né modificato il CV di origine.

Il menu si trova sotto il prompt e sopra il bordo inferiore dell'intestazione.
Il menu entra dal basso, in corrispondenza del bordo dell'intestazione; passando
a Music esce verso sinistra e sfuma. Conserva il proprio spazio e diventa subito
non interattivo durante l'uscita, mantenendo fermo il bordo dell'intestazione.
Anche i contenuti, sia nel cambio Dev/Music sia tra le pagine Dev, escono verso
sinistra prima che la nuova sezione entri da destra. Le uscite durano 180 ms e
gli ingressi 300 ms. I cambi rapidi annullano le transizioni precedenti e
riprendono dalla posizione corrente. Durante l'uscita il contenuto è inerte;
l'altezza dell'area centrale resta vincolata alla finestra.
Con movimento ridotto o senza supporto alla Web Animations API il cambio di
contenuti è immediato. La preferenza per il movimento ridotto viene applicata
anche se cambia durante una transizione.
La sezione corrente è indicata anche
con `aria-current`. La navigazione supporta link diretti e cronologia del browser,
e conserva la pagina selezionata passando a Music e tornando a Dev. Senza
JavaScript resta disponibile la descrizione Home, mentre il menu è nascosto.

Il footer contiene i collegamenti LinkedIn e GitHub indicati nel CV e confermati
dal proprietario. Sono disponibili dalla Home e da tutte le sezioni, anche in
Music e senza JavaScript. La pagina Contacts è stata rimossa: il contatto passa
dai profili nel footer. I vecchi link `#contacts` aprono Home tramite il normale
ripristino previsto per gli hash sconosciuti.

Gli script classici vengono caricati in ordine con `defer`: non servono moduli
ES, fetch di frammenti HTML o un server per aprire la pagina da file. Per modificare
i testi delle pagine si interviene sull'HTML; per modificare identità e competenze,
solo su `dist/js/config.js`.

## Pubblicazione

La cartella da pubblicare è `dist/`, senza comando di build. Può essere usata
su Cloudflare Pages. Il workflow `.github/workflows/deploy.yml` pubblica il sito
automaticamente a ogni push su `main`, oppure tramite avvio manuale da GitHub
Actions. La configurazione iniziale di GitHub, Cloudflare e del dominio è
documentata in [DEPLOYMENT.md](./DEPLOYMENT.md).

L'archivio `../federico-menegoz-cloudflare.zip` contiene direttamente `index.html`
e i relativi asset, pronti per un progetto Cloudflare Pages con Direct Upload.

La configurazione Sites è in `.openai/hosting.json`. La creazione di un progetto
Sites non implica che la pagina sia stata pubblicata o che il dominio sia collegato.
