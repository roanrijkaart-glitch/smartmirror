# Smart Mirror

MagicMirror voor onze ALA met Raspberry Pi 3 en verticaal scherm van 300 x 530 mm.

## Installeren op de Pi

Zet deze GitHub-repository op **Public**. Open daarna Terminal op de Pi en plak deze regel:

```bash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/roanrijkaart-glitch/smartmirror/main/install-on-pi.sh)"
```

De installer zet Node.js, MagicMirror, de bus- en treinmodule en de indeling klaar. Typ de agenda-link en NS API-sleutel wanneer daarom wordt gevraagd; de invoer is zichtbaar. Die gegevens worden lokaal op de Pi opgeslagen en staan niet in deze repository.

## Bijwerken

Plak op de Pi:

```bash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/roanrijkaart-glitch/smartmirror/main/update-on-pi.sh)"
```

De updater haalt de nieuwste bestanden op, maakt een reservekopie en start MagicMirror opnieuw. Laat de agenda-link en API-sleutel leeg om de huidige waarden op de Pi te behouden.

De tijd staat boven de datum in het midden, met één lettertype. De vraag over de korte broek is verwijderd.
