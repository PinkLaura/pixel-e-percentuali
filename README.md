# pixel-e-percentuali
### Tentiamo di modificare immagini in modo che riescano a rendere in maniera intuitiva valori percentuali

## Requisiti

1. Il sistema dovrà essere on line e correttamente eseguito sui browser comuni (ad es. Firefox)
2. Il sistema dovrà accettare in ingresso una immagine ad alta risoluzione (ad esempio con controllo `<input>`)
3. Il sistema prende in ingresso anche due percentuali (numero tra 0 e 100), sia come input text che come slider continuo in una pagina, e, con selettore a cascata, il colore si sfondo (black | white) e la logica di conversione (linear | S-shaped)
4. Il sistema, in un'altra pagina rispetto all'inserimento delle percentuali, visualizza due volte l'immagine caricata su sfondo, in modalità affiancata (larghezza 45%, con padding tra le immagini di almeno 50 pixel)
4. Il sistema dovrà applicare alla immagini i seguenti effetti, in misura proporzionale alle percentuali inserite:
  -1. il blur dell'immagine
  -2. la trasparenza dell'immagine (alpha layer)
  -3. la quantità di pixel colorati (rispetto ad averli del colore di sfondo)
  -4. la quantità di pixel fuori posto (cioè se probabilità 30%, il 30% dei pixel, scelti casualmente sarà al posto sbagliato, cioè il 15% dei pixel scelti casualmente sarà scambiato con un pixel dall'insieme di altri 15% di pixel scelti casualmente)
5. La logica di conversione lineare agisce linearmente sulle funzioni ai punti 4. 
La funzione S-shaped (ad esempio: 1/(1+e^(−10*(x−0.5)))) invece attenua i valoi vicini agli estremi del'intervallo [0-1].


## Stato dell'arte
- Rimozione pixel funzionante
- Trasparenza funzionante
- Swap funzionante 
- Blur: da controllare il range, ha senso così?
- Questione doppia pagina risolta

- Problema: immagini ad alta definizione, come gestirle? ora vengono tagliate anche adattando le dimensioni, perchè escono dalla pagina
- Ho messo slider e invio in due pagine diverse, ha senso?