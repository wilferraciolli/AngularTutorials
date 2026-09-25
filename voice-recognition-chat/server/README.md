# Fish Audio Proxy Server

This folder contains a small Node.js server that keeps the Fish Audio API key, model, and URL off the browser.

## Why this exists

The Angular app cannot safely call Fish Audio directly from the browser because the browser would need to send the API key and would be subject to CORS restrictions from `https://api.fish.audio`.

Instead:

1. Angular sends the text to this local Node.js server.
2. The Node.js server reads the Fish API configuration from environment variables.
3. The server calls Fish Audio with the API key.
4. The server returns the generated MP3 audio back to Angular.

## Required environment variables

Create a `.env` file in this folder using the `.env.example` as a template:

```bash
PORT=3000
FISH_API_KEY=your_fish_api_key_here
```

### Variables

- `PORT` — the port for the Node.js server.
- `FISH_API_KEY` — your Fish API key.

## Run the server

```bash
cd server
npm install
cp .env.example .env
# then edit .env and add your real API key
npm start
```

If you want a shortcut from the Angular project root:

```bash
npm run server
```

## API endpoint

### POST /api/tts

Request body:

```json
{
  "text": "Hello from the app",
  "format": "mp3"
}
```

The server sends the request to Fish Audio using the configured API key and returns the MP3 audio bytes as the response.

## Angular app usage

The Angular app should call the local endpoint:

```ts
this.http.post('/api/tts', {
  text: 'Hello world',
  format: 'mp3'
}, {
  responseType: 'arraybuffer'
});
```

This works because the Angular dev server is configured with a proxy in `proxy.conf.json`.
