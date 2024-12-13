if (!self.define) {
  let e,
    c = {};
  const s = (s, r) => (
    (s = new URL(s + ".js", r).href),
    c[s] ||
      new Promise((c) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = s), (e.onload = c), document.head.appendChild(e);
        } else (e = s), importScripts(s), c();
      }).then(() => {
        let e = c[s];
        if (!e) throw new Error(`Module ${s} didn’t register its module`);
        return e;
      })
  );
  self.define = (r, i) => {
    const o =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (c[o]) return;
    let d = {};
    const n = (e) => s(e, o),
      l = { module: { uri: o }, exports: d, require: n };
    c[o] = Promise.all(r.map((e) => l[e] || n(e))).then((e) => (i(...e), d));
  };
}
define(["./workbox-a7e13a4a"], function (e) {
  "use strict";
  self.addEventListener("message", (e) => {
    e.data && "SKIP_WAITING" === e.data.type && self.skipWaiting();
  }),
    e.precacheAndRoute(
      [
        {
          url: "public/favicon.ico",
          revision: "c92b85a5b907c70211f4ec25e29a8c4a",
        },
        {
          url: "public/index.html",
          revision: "61ce8b3e3ac58d33cc9dcf52e203866f",
        },
        {
          url: "public/logo192.png",
          revision: "33dbdd0177549353eeeb785d02c294af",
        },
        {
          url: "public/logo512.png",
          revision: "917515db74ea8d1aee6a246cfbcc0b45",
        },
        {
          url: "public/robots.txt",
          revision: "61c27d2cd39a713f7829422c3d9edcc7",
        },
        { url: "src/App.js", revision: "d77de4265a85f24e2b801889511e2e17" },
        {
          url: "src/components/BookList.js",
          revision: "1139b4b14ff8d2bdd1cefc5b80e6ae6a",
        },
        {
          url: "src/components/SearchBooks.js",
          revision: "3993a23b93bd24972666a9a5c925557c",
        },
        {
          url: "src/css/App.css",
          revision: "9598d3dc48ddb0ea57411ff99adcb9a0",
        },
        {
          url: "src/css/BookList.css",
          revision: "a8b4718fbb2eb575d338500c9644786c",
        },
        {
          url: "src/css/SearchBooks.css",
          revision: "e698ed95f4b28dfc17f47fcf910d3bd3",
        },
        { url: "src/index.css", revision: "7386d27f653921d6b5c3b54e0cd9d67d" },
        { url: "src/index.js", revision: "66ed07bfc852507e08e8aed7a9c46833" },
        { url: "src/logo.svg", revision: "06e733283fa43d1dd57738cfc409adbd" },
      ],
      { ignoreURLParametersMatching: [/^utm_/, /^fbclid$/] }
    );
});
