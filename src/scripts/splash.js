export default function showSplash() {
  return new Promise(async (resolve) => {
    const splash = document.getElementById('splash');
    const splashImage = splash.querySelector('img');

    // Wait for the image to load first
    await new Promise((resolve) => {
      if (splashImage.complete) resolve();
      else {
        splashImage.addEventListener('load', resolve);
        splashImage.addEventListener('error', resolve);
      }
    })

    splash.classList.add('active');

    // fade-in splash
    await new Promise(r => setTimeout(r, 500));

    // keep splash for 1.5 seconds
    await new Promise(r => setTimeout(r, 1500));

    // fade-out splash
    splash.classList.remove('active');

    // wait for the fade-out and resolve the promise
    await new Promise(r => setTimeout(r, 500));

    resolve();
  })
}