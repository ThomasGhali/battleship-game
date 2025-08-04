export default function showMenu() {  
  return new Promise(async (resolve) => {
    const menu = document.getElementById('menu');
    const startBtn = document.querySelector('.start-btn');
    const menuImages = menu.querySelectorAll('.menu__image');

    // Wait for all menu images to load
    await Promise.all(Array.from(menuImages).map(img => 
      new Promise(resolveImg => {
        if (img.complete) resolveImg();
        else {
          img.addEventListener('load', resolveImg);
          img.addEventListener('error', resolveImg);
        }
      })
    ));

    menu.classList.add('active');

    startBtn.addEventListener('click', async () => {
      // menu fade-out
      menu.classList.remove('active');

      await new Promise(r => setTimeout(r, 500));

      resolve();
    }, { once: true })
  })
}