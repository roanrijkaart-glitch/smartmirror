# Smart Mirror

MagicMirror voor onze ALA met Raspberry Pi 3 en staand scherm van 300 x 530 mm. De indeling volgt onze schets: temperatuur en agenda bovenaan, klok en datum midden, vraag eronder en bus- en treintijden onderaan.

## Installeren op de Pi

Open de Terminal op de Pi en plak deze ene regel:

```bash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/roanrijkaart-glitch/smartmirror/main/install-on-pi.sh)"
```

De installer zet Node.js, MagicMirror, de bus- en treinmodule en onze configuratie klaar. Daarna vraagt hij lokaal om de iCal-link en NS API-sleutel. Invoer van die twee waarden blijft verborgen en wordt alleen op de Pi opgeslagen. Leeg laten kan ook; dan kun je ze later lokaal invullen.

De eerste installatie kan op een Pi 3 ongeveer tien minuten duren. Laat de Pi aan en sluit de Terminal niet af totdat MagicMirror start.

## Onderdelen

- Temperatuur in Gouda via Open-Meteo.
- Agenda via een iCal-feed.
- Bussen vanaf halte Mammoet.
- Treinen vanaf station Gouda.

Geheime agenda-links en API-sleutels staan niet in deze GitHub-repository.

