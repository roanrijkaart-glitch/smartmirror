# Smart Mirror

MagicMirror voor onze ALA met Raspberry Pi 3 en staand scherm van 300 x 530 mm.

## Installeren op de Pi

De repository is privé. Daarom geeft de oude downloadregel een 404 op de Pi. Je moet de installatiebestanden eerst op de Pi zetten of de repository tijdelijk openbaar maken. De veilige optie is: download de map `magicmirror-pi3` als ZIP via deze computer en zet die bestanden met een USB-stick op de Pi.

Zet daarna de map `github-release` op de Pi en open de Terminal in die map. Voer uit:

```bash
chmod +x install-on-pi.sh
./install-on-pi.sh
```

De installer haalt MagicMirror en Node.js op, plaatst de configuratie en start de spiegel. Hiervoor heeft de Pi internet nodig. Als het script om agenda-link en NS API-sleutel vraagt, voer die dan rechtstreeks op de Pi in. Deel die waarden niet in een openbare GitHub-repository.

## Onderdelen

- Temperatuur in Gouda
- Agenda via een iCal-feed
- Bussen vanaf halte Mammoet
- Treinen vanaf station Gouda
