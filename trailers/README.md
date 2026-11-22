# Trailers

Each trailer is one HTML page with a canvas. `render(t)` draws the frame at time `t` seconds and depends on
nothing else, so frames can be rendered in any order and the loop is exact. The videos in `public/videos/` are
rendered from these pages.

| Trailer | Look | Fonts it expects in `<trailer>/fonts/` |
| --- | --- | --- |
| `codeguard/` | CodeGuard AI's neo-brutalist UI | `bricolage-grotesque-latin-opsz-normal.woff2` (`@fontsource-variable/bricolage-grotesque`), `space-mono-latin-{400,700}-normal.woff2` (`@fontsource/space-mono`) |

The fonts are not committed. Get them with `npm pack <package>` and copy the files above out of `package/files/`.

## Render

Needs Node, Playwright with Chromium, and ffmpeg.

```bash
node trailers/preview.mjs "$PWD/trailers/codeguard" 5 12.5 20   # stills to check a few moments
node trailers/render.mjs "$PWD/trailers/codeguard"              # every frame at 30 fps into frames/
```

```bash
cd trailers/codeguard
ffmpeg -framerate 30 -i frames/%04d.png -vf "scale=1280:800:flags=lanczos,format=yuv420p" \
  -c:v libx264 -preset slow -crf 23 -tune animation -movflags +faststart -an codeguard-ai.mp4
ffmpeg -framerate 30 -i frames/%04d.png -vf "scale=1280:800:flags=lanczos,format=yuv420p" \
  -c:v libvpx-vp9 -b:v 0 -crf 36 -row-mt 1 -deadline good -cpu-used 2 -an codeguard-ai.webm
ffmpeg -i frames/0168.png -vf scale=1280:800 -c:v libwebp -quality 82 codeguard-ai-poster.webp
```

The scenes use real output: the CodeGuard findings and grade come from running its CLI on its own
`tests/fixtures/vulnerable_app`.
