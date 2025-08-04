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

    setTimeout(() => {
      splash.classList.remove('active');

      setTimeout(() => {
        splash.classList.add('hidden');
        resolve();
      }, 1000)
    }, 2000)
  })
}