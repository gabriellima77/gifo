import image from './image.js';


function randomEvent() {
  fetch('https://api.giphy.com/v1/gifs/random?api_key=XcI6775d84WUDVBTSbjFbFqdsbFiTsZA')
  .then((result)=> {
    return result.json();
  })
  .then((data)=> {
    const img = document.querySelector('.random-img .slide img');
    const title = document.querySelector('.random-img h3');
    title.textContent = data.data.title;
    const url = data.data.images.original.url;
    img.src = url;
  })
  .catch((err)=>{ console.log(err) });
}

function createRandomBtn() {
  const btn = document.createElement('div');
  btn.classList.add('random-btn');
  btn.innerHTML = '<i class="fas fa-random"></i>';
  btn.addEventListener('click', randomEvent);
  return btn;
}

function createContainer(str) {
  const container = document.createElement('div');
  const h3 = document.createElement('h3');

  h3.style.color = 'white';
  h3.textContent = str;
  container.appendChild(h3);
  container.classList.add('random-img');
  return container;
}

export default function getRandom() {
  fetch('https://api.giphy.com/v1/gifs/random?api_key=XcI6775d84WUDVBTSbjFbFqdsbFiTsZA')
    .then((result)=> {
      return result.json();
    })
    .then((data)=> {
      const body = document.querySelector('body');
      const img = data.data.images.original;
      const figure = image.createImage(img);
      const container = createContainer(data.data.title);
      const randomBtn = createRandomBtn();
      container.appendChild(figure);
      container.appendChild(randomBtn);
      body.appendChild(container);
    })
    .catch((err)=>{ console.log(err) });
}