# Magic Mirror

Configuratie voor de ALA Magic Mirror met Raspberry Pi 3 en een verticale monitor van 300 mm breed x 530 mm hoog. De indeling loopt van boven naar beneden: klok, weer, verwachting, agenda en openbaar vervoer.

## Monitor rechtop zetten

Stel op de Raspberry Pi bij de scherminstellingen de weergave in op **Portrait/Staand**. De configuratie ordent de onderdelen van boven naar beneden; de schermrotatie zelf stel je in bij de Pi.

## Installeren of bijwerken op de Pi

Open de terminal op de Pi en plak deze ene regel:

```bash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/roanrijkaart-glitch/smartmirror/main/install-on-pi.sh)"
```

Dit maakt eerst een reservekopie van je bestaande configuratie, haalt de nieuwste `config.js` op, installeert de bus- en treinmodules en start MagicMirror. MagicMirror moet al geïnstalleerd zijn in `~/MagicMirror`. Als MagicMirror al draait, stop het eerst met Ctrl+C.

## Nog invullen voor bus, trein en agenda

De klok en het weer werken na de installatie. Om de andere onderdelen te activeren, moet je op de Pi lokaal de waarden bovenaan `~/MagicMirror/config/config.js` invullen:

- Treinen: vraag een NS API-sleutel aan via [NS API Portal](https://apiportal.ns.nl/). Station Gouda gebruikt code `GD`.
- Bus: vul de OVapi StopAreaCode in van halte Gouda, Blommesteinsingel bij mboRijnland. De juiste code moet nog worden opgezocht.
- Google Agenda: vul je geheime iCal-link in.

Zet je NS-sleutel en geheime agenda-link nooit op GitHub. In deze repository staan alleen invulplekken, geen persoonlijke gegevens.

## Extra uitbreidingen

Spraakbediening en automatische ledverlichting zijn nog niet ingesteld; daarvoor moet eerst de hardware gekozen worden.
