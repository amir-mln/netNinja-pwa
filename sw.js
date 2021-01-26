//adding install event
self.addEventListener("install", (e) =>
  console.log("%c service worker is installed", "color: green")
);

// activate event
self.addEventListener("activate", (e) =>
  console.log("%c service worker is activated", "color: green")
);
