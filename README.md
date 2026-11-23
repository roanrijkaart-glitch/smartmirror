# Magic Mirror

Configuratie voor de ALA Magic Mirror met Raspberry Pi 3. De basis toont de klok en het weer in Gouda. Er zijn ook opties voor Google Agenda, bus Blommesteinsingel en treinen vanaf station Gouda.

## Installeren op de Pi

Open de terminal op de Pi en plak deze ene regel:

```bash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/roanrijkaart-glitch/smartmirror/main/install-on-pi.sh)"
```

Dit maakt eerst een reservekopie van je bestaande configuratie, haalt de nieuwste `config.js` op, installeert de bus- en treinmodules en start MagicMirror. MagicMirror moet al geïnstalleerd zijn in `~/MagicMirror`.

## Nog invullen voor bus, trein en agenda

De klok en het weer werken na de installatie. Om de andere onderdelen te activeren, moet je op de Pi lokaal de waarden bovenaan `~/MagicMirror/config/config.js` invullen:

- Treinen: vraag een NS API-sleutel aan via [NS API Portal](https://apiportal.ns.nl/). Station Gouda gebruikt code `GD`.
- Bus: vul de OVapi StopAreaCode in van halte Gouda, Blommesteinsingel bij mboRijnland. De juiste code moet nog worden opgezocht.
- Google Agenda: vul je geheime iCal-link in.

Zet je NS-sleutel en geheime agenda-link nooit op GitHub. In deze repository staan alleen invulplekken, geen persoonlijke gegevens.

## Extra uitbreidingen

Spraakbediening en automatische ledverlichting zijn nog niet ingesteld; daarvoor moet eerst de hardware gekozen worden.
