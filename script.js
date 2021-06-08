import createTranding from './src/trending.js';
import getRandom from './src/random.js';


window.onload = ()=> {
  const form = document.querySelector('#searchBar');
  const main = document.querySelector('main');
  const search = document.querySelector('#search');
  const typeInput = document.querySelector('.type input');


  form.onsubmit = (e)=> {
    e.preventDefault() ;
    const str = search.value;
    const type = typeInput.checked;
    searchEvent(str, type)
  };

  function getColor() {
    const colors = ['#E7F2F8', '#74BDCB', '#FFA384', '#EFE7BC'];
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
  }

  function createImage(image) {
    const bkColor = getColor();
    const figure = document.createElement('figure');
    const i = document.createElement('img');
    i.src = image.url;
    i.style.width = 15  + 'vw';
    i.style.height = image.height + 'px';
    
    figure.classList.add('slide');
    figure.style.backgroundColor = bkColor;
    figure.appendChild(i);

    return figure;
  }

  function getTitle(str) {
    const index = str.indexOf(' GIF');
    return str.substring(0, index);
  }

  function getLeft(index) {
    const figures = document.querySelectorAll('#content .slide');
    let left = 0;
    if(index % 4 > 0) {
      const lastLeft = +figures[index - 1].style.left.match(/-*[0-9]+/)[0];
      left = lastLeft + 17;
    }
    return left + 'vw';
  }

  function getTop(index) {
    const imgs = document.querySelectorAll('#content .slide img');
    const figures = document.querySelectorAll('#content .slide');
    let top = 60;
    if(index > 3) {
      const height = +imgs[index - 4].style.height.match(/[0-9]+/)[0];
      const lastTop = +figures[index - 4].style.top.match(/[0-9]+/)[0];
      top = lastTop + height + 17;
    }
    return top + 'px';
  }

  function putImage(index, data) {
    const img = data.images.fixed_width;
    const title = getTitle(data.title);
    const figure = createImage(img);
    const figCaption = document.createElement('figcaption');
    if(title === 'New Media Art' ) console.log(data.images.original.url);
    figCaption.textContent = title;
    figCaption.classList.add('cap');
    figure.appendChild(figCaption);
    
    figure.classList.add('content');
    figure.style.top = getTop(index);
    figure.style.left = getLeft(index);

    content.appendChild(figure);
  }

  function removeTranding() {
    const container = document.querySelector('#container');
    if(container) main.removeChild(container);
  }

  function removeNFound() {
    const h3 = document.querySelector('main h3');
    const error = document.querySelector('.error');
    if(h3){
      main.removeChild(h3);
      main.removeChild(error);
    }
  }
 
  function nothingFound() {
    const hasError = document.querySelector('.error');
    if(hasError) return;
    const img = document.createElement('img');
    const h3 = document.createElement('h3');
    h3.textContent = 'Nothing Found!';
    h3.style.color = 'white';
    img.src = 'https://media0.giphy.com/media/iN1aMj0XwhsNq/giphy.gif?cid=a8f29b90m3092qnn8rvk1sac0mzugoo0yhack9bvxi5vwf2u&rid=giphy.gif&ct=g';
    img.classList.add('error');
    main.appendChild(h3);
    main.appendChild(img);
  }

  function createHeader(text, content) {
    const h2 = document.createElement('h2');
    h2.textContent = text;
    h2.classList.add('text')
    content.appendChild(h2);
  }

  function searchEvent(str, isSticker) {
    removeTranding();
    const hasContent = document.querySelector('#content');
    if(hasContent) main.removeChild(hasContent);

    const content = document.createElement('section');
    content.id = 'content';
    main.appendChild(content);
    let type = 'gifs';
    if(isSticker) type = 'stickers'; 
    let dataPromise = getData(str, type);
    dataPromise.then((response)=> {
      if(response.data.length < 1) nothingFound();
      else {
        removeNFound();
        createHeader(str, content);
      }
      response.data.forEach((data, index)=>{
        putImage(index, data);
      })
    }).catch((err)=>{ console.log(err) });
  }

  function getData(str, type){
    return fetch(`https://api.giphy.com/v1/${type}/search?api_key=XcI6775d84WUDVBTSbjFbFqdsbFiTsZA&q=${str}`, {mode: 'cors'})
      .then((result)=> {
        return result.json();
      }).catch((err)=> {
        console.log(err);
      });
  }

  function init() {
    const tranding = createTranding();
    main.appendChild(tranding);
    getRandom();
  }

  init();

}
