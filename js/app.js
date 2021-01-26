if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((regObj) =>
      console.log("%c service worket is registered.", "color: green")
    );
}
