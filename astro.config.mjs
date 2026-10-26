import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import netlify from "@astrojs/netlify";

export default defineConfig({
  site: "https://www.avsaadasi.net",
  adapter: netlify(), // /api/chat (sohbet botu) Netlify Function olarak çalışır; sayfalar statik üretilir
  build: { inlineStylesheets: "always" }, // küçük CSS'i HTML'e gömer (Lighthouse)
  vite: { plugins: [tailwindcss()] },
});
