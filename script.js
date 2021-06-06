window.onload = ()=> {
  const form = document.querySelector('#searchBar');
  const box = document.querySelector('#container');
  const search = document.querySelector('#search');
  const typeInput = document.querySelector('.type input');
  const content = document.querySelector('#content');
  const changeBtn = document.querySelector('.change');
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');
  let slideIndex = 0;

  form.onsubmit = (e)=> {
    e.preventDefault() ;
    const str = search.value;
    const type = typeInput.checked;
    searchEvent(str, type)
  };

  next.addEventListener('click', nextSlide);
  prev.addEventListener('click', prevSlide);
  changeBtn.addEventListener('click', changeSlide);

  function removeContent() {
    const children = [...content.children];
    children.forEach((child)=> {
      content.removeChild(child);
    })
  }

  function changeSlide(e) {
    const sliderContainer = document.querySelector('.slider');
    const children = sliderContainer.querySelectorAll('.slide');
    const moreBtn = document.querySelector('.more');
    children.forEach((child)=> sliderContainer.removeChild(child));
    const text = e.target.textContent;
    createTrandingSlider(sliderContainer, text);
    e.target.textContent = (text === 'stickers')? 'gifs': 'stickers';
    moreBtn.textContent = (text === 'stickers')? 'All The Stickers >': 'All The Gifs >';
  }

  function nextSlide(e) {
    const slider = document.querySelector('.slider');
    const slides = slider.querySelectorAll('.slide');
    const valueMax = slides.length;

    prev.classList.remove('disabled');
    if(slideIndex >= valueMax - 2) {
      e.target.classList.add('disabled');
    } else if(slideIndex >= valueMax -1) return;

    const value = slides[slideIndex].clientWidth;
    slideIndex++;
    let lastValue = 0;

    if(slider.style.transform) {
      lastValue = +slider.style.transform.match(/[0-9]+/)[0];
    }
    const newValue = -(value+10) - lastValue;
    slider.style.transform = `translateX(${newValue}px)`;
    
  }

  function prevSlide(e) {
    const slider = document.querySelector('.slider');
    const slides = slider.querySelectorAll('.slide');


    next.classList.remove('disabled');
    if(slideIndex <= 0) return;
    else if (slideIndex <= 1) e.target.classList.add('disabled');
    const value = slides[slideIndex-1].clientWidth;
    slideIndex--;
    let lastValue = 0;
    if(slider.style.transform) {
      lastValue = +slider.style.transform.match(/[0-9]+/)[0];
    }
    const newValue = -lastValue + (value+10);
    slider.style.transform = `translateX(${newValue}px)`;
  }

  function createImage(image) {
    const figure = document.createElement('figure');
    const i = document.createElement('img');
    i.src = image.url;
    i.style.width = image.width + 'px';
    i.style.height = image.height + 'px';
    
    figure.classList.add('slide');
    figure.appendChild(i);

    return figure;
  }

  function getTitle(str) {
    const index = str.indexOf(' GIF');
    return str.substring(0, index);
  }

  function searchEvent(str, isSticker) {
    removeContent();
    let type = 'gifs';
    if(isSticker) type = 'stickers'; 
    let dataPromise = getData(str, type);
    dataPromise.then((response)=> {
      response.data.forEach((data, index)=>{
        let top = 0;
        if(index % 4 === 0 && index > 0) {
          const heightB = +response.data[index - 4].images.fixed_width.height;
          const heightA = +data.images.fixed_width.height;
          if(heightA < heightB) {
            top = heightB - heightA;
          }
          
        }
        const img = data.images.fixed_width;
        const title = getTitle(data.title);
        const figure = createImage(img);
        const figCaption = document.createElement('figcaption');

        figCaption.textContent = title;
        figCaption.classList.add('cap');
        figure.appendChild(figCaption);
        
        figure.style.top = -top + 'px';

        content.appendChild(figure);
      })
    }).catch((err)=>{ console.log(err) });
  }

  function getTranding(type) {
    return fetch(`https://api.giphy.com/v1/${type}/trending?api_key=XcI6775d84WUDVBTSbjFbFqdsbFiTsZA`, { mode: 'cors' })
      .then((response)=> {
        return response.json();
      }).catch((err)=> {
        console.log(err);
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

  function createTrandingSlider(container, type) {
    const promise = getTranding(type);
    promise.then((data)=> {
      data.data.forEach((img, index)=>{
        if(index > 20) return;
        const image = img.images.fixed_height;
        const figure = createImage(image);

        container.appendChild(figure);
      });
    });
  }

  function init() {
    const sliderContainer = document.querySelector('.slider');
    createTrandingSlider(sliderContainer, 'gifs');
  }

  init();

}
