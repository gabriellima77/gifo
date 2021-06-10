import createTranding from './src/trending.js';
import getRandom from './src/random.js';
import image from './src/image.js';


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

  function removeTranding() {
    const container = document.querySelector('#container');
    if(container) main.removeChild(container);
  }

  function removeRImg() {
    const randomImg = document.querySelector('.random-img');
    const body = document.querySelector('body');
    if(randomImg) body.removeChild(randomImg);
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
    removeRImg();
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
        image.putImage(index, data);
      });
    }).catch((err)=>{
      console.log(err);
      removeRImg();
      removeNFound();
      nothingFound();
    });
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
