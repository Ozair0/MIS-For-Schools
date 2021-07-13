const express = require("express");
const consola = require("consola");
const { Nuxt, Builder } = require("nuxt");
const app = express();

// Import and Set Nuxt.js options
const config = require("../nuxt.config.js");
config.dev = process.env.NODE_ENV !== "production";

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  const { host, port } = nuxt.options.server;

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }

  // Express GET endpoint
  app.get("/api/next-movie", async (req, res, next) => {
    const movieOptions = [
      "tt3896198",
      "tt0071253",
      "tt0109686",
      "tt2267998",
      "tt0109040",
      "tt0089218"
    ];
    res.json(movieOptions);
  });

  // Give nuxt middleware to express
  app.use(nuxt.render);

  // Listen the server
  app.listen(port, "10.10.10.8");
  consola.ready({
    message: `Server listening on http://10.10.10.8:${port}`,
    badge: true
  });
}
start();
