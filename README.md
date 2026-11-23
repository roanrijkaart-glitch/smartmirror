# Magic Mirror

Configuratie voor de ALA Magic Mirror met Raspberry Pi 3. De basis toont de klok en het weer in Gouda. Er zijn ook opties voor Google Agenda, bus Blommesteinsingel en treinen vanaf station Gouda.

## Installeren

Kopieer `config.js` naar `~/MagicMirror/config/config.js` op de Pi. Maak eerst een reservekopie van je bestaande bestand.

Controleer de configuratie en start MagicMirror:

```bash
cd ~/MagicMirror
node --check config/config.js
npm start
```

## Treinen

De configuratie gebruikt stationcode `GD` voor Gouda. Vraag een persoonlijke NS API-sleutel aan via [NS API Portal](https://apiportal.ns.nl/) en vul die lokaal op de Pi in bij `NS_API_KEY`. Zet geheime sleutels niet in GitHub.

## Bus

De gekozen halte is Gouda, Blommesteinsingel, bij mboRijnland. De module `MMM-bustimes` verwacht de OVapi StopAreaCode van die halte. Die code moet nog worden opgezocht en lokaal ingevuld bij `BUS_STOP_AREA_CODE`. De code staat daarom bewust nog als invulplek in dit bestand.

Installatie-instructies voor de module staan in de [MMM-bustimes README](https://github.com/73cirdan/MMM-bustimes).

## Google Agenda

Vul de geheime iCal-link lokaal in bij `GOOGLE_CALENDAR_ICAL_URL`. Deel die link niet en zet hem niet in GitHub.

## Let op

Deze repository bevat alleen de configuratie en deze uitleg. Installeer de bus- en treinmodules apart volgens hun eigen installatie-instructies. Spraakbediening en automatische ledverlichting zijn nog niet ingesteld, omdat daarvoor de benodigde hardware nog gekozen moet worden.
