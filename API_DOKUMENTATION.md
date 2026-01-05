# Bot Stats API - Dokumentation

## Übersicht
Die Website ruft automatisch Bot-Statistiken von deiner API ab und zeigt sie animiert an.

## API Endpoint

**URL:** `https://api.alphacloud.de/stats` (ersetze mit deiner Domain)  
**Methode:** `GET`  
**CORS:** Muss aktiviert sein (erlaubt Requests von alphacloud.de)

## Response Format

Die API muss ein JSON-Objekt mit folgendem Format zurückgeben:

```json
{
  "servers": 150,
  "users": 50000,
  "uptime": 123456789
}
```

### Felder:

- **servers** (Number): Anzahl der Server, auf denen der Bot ist
- **users** (Number): Gesamtanzahl der Nutzer, die der Bot verwaltet
- **uptime** (Number): Uptime in **Millisekunden** ODER **Sekunden**
  - Das Script erkennt automatisch, ob es Millisekunden oder Sekunden sind

## Beispiel-Implementation (Node.js + Express)

### Option 1: Einfacher Express Endpoint

```javascript
const express = require('express');
const app = express();
const { Client } = require('discord.js');

// CORS aktivieren
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://alphacloud.de');
    res.header('Access-Control-Allow-Methods', 'GET');
    next();
});

// Stats Endpoint
app.get('/stats', (req, res) => {
    const client = req.app.get('discordClient'); // Dein Discord Client
    
    res.json({
        servers: client.guilds.cache.size,
        users: client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0),
        uptime: client.uptime // in Millisekunden
    });
});

app.listen(3000, () => {
    console.log('API läuft auf Port 3000');
});
```

### Option 2: Mit Caching (empfohlen für Performance)

```javascript
const express = require('express');
const app = express();

let cachedStats = {
    servers: 0,
    users: 0,
    uptime: 0
};

// Stats alle 5 Minuten aktualisieren
function updateStats(client) {
    cachedStats = {
        servers: client.guilds.cache.size,
        users: client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0),
        uptime: client.uptime
    };
}

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Oder spezifische Domain
    res.header('Access-Control-Allow-Methods', 'GET');
    next();
});

// Stats Endpoint
app.get('/stats', (req, res) => {
    res.json(cachedStats);
});

// Stats periodisch aktualisieren
setInterval(() => {
    const client = require('./bot').client; // Dein Bot Client
    updateStats(client);
}, 5 * 60 * 1000); // Alle 5 Minuten

app.listen(3000);
```

### Option 3: Als Teil deines Bot-Projekts

```javascript
// In deiner bot.js oder main.js
const express = require('express');
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

// Express API
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/stats', (req, res) => {
    if (!client.isReady()) {
        return res.status(503).json({ error: 'Bot not ready' });
    }
    
    res.json({
        servers: client.guilds.cache.size,
        users: client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0),
        uptime: client.uptime
    });
});

app.listen(3000, () => {
    console.log('Stats API läuft auf Port 3000');
});

client.login('YOUR_BOT_TOKEN');
```

## Wichtige Hinweise

1. **URL aktualisieren**: In `js/main.js` Zeile 25 die API-URL anpassen:
   ```javascript
   const response = await fetch('https://api.alphacloud.de/stats');
   ```

2. **CORS aktivieren**: Die API muss CORS-Headers senden, sonst blockiert der Browser die Requests

3. **HTTPS verwenden**: Wenn deine Website HTTPS nutzt, muss auch die API HTTPS verwenden

4. **Fallback-Werte**: Bei API-Fehlern zeigt die Website "-" an

5. **Rate Limiting**: Optional kannst du Rate Limiting einbauen, um Spam zu verhindern

## Uptime Format

Die Uptime wird automatisch formatiert:
- Bei > 24 Stunden: `"Xd Yh"` (z.B. "5d 12h")
- Bei < 24 Stunden: `"Xh Ym"` (z.B. "18h 45m")

## Testing

Teste deine API mit:
```bash
curl https://api.alphacloud.de/stats
```

Erwartete Antwort:
```json
{
  "servers": 150,
  "users": 50000,
  "uptime": 123456789
}
```

## Fehlerbehandlung

Wenn die API nicht erreichbar ist oder Fehler zurückgibt:
- Wird in der Browser-Konsole geloggt
- Statistiken zeigen "-" als Fallback

## Reverse Proxy (Nginx Beispiel)

Falls du Nginx verwendest:

```nginx
location /api/stats {
    proxy_pass http://localhost:3000/stats;
    proxy_set_header Host $host;
    add_header Access-Control-Allow-Origin *;
}
```
