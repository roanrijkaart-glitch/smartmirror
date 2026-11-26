# Magic Mirror

Configuratie voor de ALA Magic Mirror met Raspberry Pi 3 en een verticale monitor van 300 mm breed x 530 mm hoog. De indeling loopt van boven naar beneden: klok, weer, verwachting, agenda en openbaar vervoer.

## Installeren op de Pi

Open de terminal op de Pi en plak deze ene regel:

```bash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/roanrijkaart-glitch/smartmirror/main/install-on-pi.sh)"
```

Dit maakt eerst een reservekopie van je bestaande configuratie, haalt de nieuwste `config.js` op, installeert de bus- en treinmodules en start MagicMirror. MagicMirror moet al geïnstalleerd zijn in `~/MagicMirror`. Als MagicMirror al draait, stop het eerst met Ctrl+C.

## Bus bij mboRijnland

Voor bushalte Gouda, Blommesteinsingel is de OVapi TimingPointCode `53514170`. Die staat ingevuld in `config.js`. De code is gecontroleerd in de actuele OVapi-gegevens voor Qbuzz-lijn 1.

## Treinen vanaf Gouda

De NS-stationscode voor Gouda is `Gd`. Voor vertrektijden is een persoonlijke NS API-sleutel nodig. Meld je aan op het [NS API-portaal](https://apiportal.ns.nl/), zoek de API voor vertrektijden/reisinformatie en open het bijbehorende product. Vraag via dat product een subscription aan. Na eventuele goedkeuring vind je je persoonlijke key op je profiel. Vul die lokaal op de Pi in bij `NS_API_KEY`; zet de sleutel niet in GitHub.

## Google Agenda

Vul de geheime iCal-link lokaal in bij `GOOGLE_CALENDAR_ICAL_URL`. Deel die link niet en zet hem niet in GitHub.

## Monitor staand zetten

Stel op de Raspberry Pi bij de scherminstellingen de weergave in op **Portrait/Staand**. De configuratie ordent de onderdelen van boven naar beneden; de schermrotatie zelf stel je in bij de Pi.

## Extra uitbreidingen

Spraakbediening en automatische ledverlichting zijn nog niet ingesteld; daarvoor moet eerst de hardware gekozen worden.
