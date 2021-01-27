const STATIC_CACHE_NAME = "site-static-assetes-v.0.2";
const DYNAMIC_CACHE_NAME = "site-dynamic-assetes-v.0.1";
const CACHEPATHS = [
  "/",
  "/index.html",
  "pages/fallback.html",
  "/js/app.js",
  "/js/ui.js",
  "/js/materialize.min.js",
  "/css/styles.css",
  "/css/materialize.min.css",
  "/img/dish.png",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
];

//adding install event
self.addEventListener("install", (e) => {
  console.log("%c service worker is installed", "color: green");
  e.waitUntil(
    caches.open(STATIC_CACHE_NAME).then((cache) => {
      cache.addAll(CACHEPATHS);
    })
  );
});

// activate event
self.addEventListener("activate", (e) =>
  // removing old versions of the caches
  // waitUntil method recieves a promise and waits until it resolves.
  // this is why we need a Promis.all
  e.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter(
              (key) => key !== STATIC_CACHE_NAME || key !== DYNAMIC_CACHE_NAME
            )
            .map((key) => caches.delete(key))
        )
      )
  )
);

self.addEventListener("fetch", (fetchObj) => {
  // this solves the "Failed to execute 'put' on 'Cache' " bug that is caused by extensions
  fetchObj.request.url.indexOf("http") === 0 &&
    fetchObj.respondWith(
      caches
        .match(fetchObj.request)
        .then((cacheRes) => cacheRes || fetch(fetchObj.request))
        .then((fetchObj2) =>
          caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
            cache.put(fetchObj.request.url, fetchObj2.clone());
            return fetchObj2;
          })
        )
        .catch(
          //checking the type of request's resource to only fallback to html pages.
          () =>
            fetchObj.request.url.indexOf(".html") > -1 &&
            caches.match("pages/fallback.html")
        )
    );
});
