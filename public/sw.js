if (!self.define) {
  let e,
    i = {};
  const o = (o, n) => (
    (o = new URL(o + ".js", n).href),
    i[o] ||
      new Promise((i) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = o), (e.onload = i), document.head.appendChild(e);
        } else (e = o), importScripts(o), i();
      }).then(() => {
        let e = i[o];
        if (!e) throw new Error(`Module ${o} didn’t register its module`);
        return e;
      })
  );
  self.define = (n, r) => {
    const c =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (i[c]) return;
    let d = {};
    const s = (e) => o(e, c),
      t = { module: { uri: c }, exports: d, require: s };
    i[c] = Promise.all(n.map((e) => t[e] || s(e))).then((e) => (r(...e), d));
  };

  self.addEventListener("activate", (event) => {
    event.waitUntil(
      caches.keys().then((cacheNames) =>
        Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== "precache-v1") {
              console.log("Limpiando caché antigua:", cacheName);
              return caches.delete(cacheName);
            }
          })
        )
      )
    );
  });
}
define(["./workbox-a7e13a4a"], function (e) {
  "use strict";
  self.addEventListener("message", (e) => {
    e.data && "SKIP_WAITING" === e.data.type && self.skipWaiting();
  }),
    e.precacheAndRoute(
      [
        { url: "/PAD_Practica_3/favicon.ico", revision: "0acfd7b068767a2a16bbeb5953e2fdf5" },
        { url: "/PAD_Practica_3/index.html", revision: "61ce8b3e3ac58d33cc9dcf52e203866f" },
        { url: "/PAD_Practica_3/logo192.png", revision: "53b1430636f2ddbf6da9a6957c56ebb9" },
        { url: "/PAD_Practica_3/logo512.png", revision: "03d4df01bedfe00cfcbb3a4914522ddd" },
        { url: "/PAD_Practica_3/manifest.json", revision: "d5c9c4cc1c5d9d38824e09b38b064d9d" },
      ],
      { ignoreURLParametersMatching: [/^utm_/, /^fbclid$/] }
    );
});
//# sourceMappingURL=sw.js.map
