let slideIndex = 0;

function createImage(image) {
  const figure = document.createElement('figure');
  const i = document.createElement('img');
  i.src = image.url;
  i.style.width = image.width + 'px';
  i.style.height = image.height + 'px';
  
  figure.classList.add('slide')
  figure.appendChild(i);

  return figure;
}

function changeSlide(e) {
  slideIndex = 0;
  console.log(1);
  const sliderContainer = document.querySelector('.slider');
  const children = sliderContainer.querySelectorAll('.slide');
  const moreBtn = document.querySelector('.more');
  const prev = document.querySelector('.prev');
  const text = e.target.textContent;

  children.forEach((child)=> sliderContainer.removeChild(child));
  

  createTrandingSlider(sliderContainer, text);
  e.target.textContent = (text === 'stickers')? 'gifs': 'stickers';
  moreBtn.textContent = (text === 'stickers')? 'All The Stickers >': 'All The Gifs >';
  sliderContainer.style.transform = 'translateX(0px)'
  prev.classList.add('disabled');
}

function nextSlide(e, prev) {
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

function prevSlide(e, next) {
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

function putEvents(next, prev) {
  next.addEventListener('click', (e)=> {
    nextSlide(e, prev);
  });
  prev.addEventListener('click', (e)=> {
    prevSlide(e, next);
  });
}

function createBar() {
  const bar = document.createElement('div');
  const title = document.createElement('h2');
  const changeBtn = document.createElement('button');
  const moreBtn = document.createElement('button'); 

  title.classList.add('title');
  title.innerHTML = '<i class="fab fa-hotjar hot"></i>Trending';

  changeBtn.classList.add('change');
  moreBtn.classList.add('more');

  changeBtn.textContent = 'stickers';
  moreBtn.textContent = 'All The Gifs';

  bar.classList.add('bar');
  changeBtn.addEventListener('click', changeSlide);

  bar.appendChild(title);
  bar.appendChild(changeBtn);
  bar.appendChild(moreBtn);
  return bar;
}

function createSlider(container) {
  const slider = document.createElement('div');
  const prevSpan = document.createElement('span');
  const nextSpan = document.createElement('span');

  slider.classList.add('slider');
  prevSpan.classList = 'prev disabled';
  nextSpan.classList.add('next');

  prevSpan.innerHTML = '<i class="fas fa-chevron-left"></i>';
  nextSpan.innerHTML = '<i class="fas fa-chevron-right"></i>';

  putEvents(nextSpan, prevSpan);

  container.appendChild(slider);
  container.appendChild(prevSpan);
  container.appendChild(nextSpan);
  return slider;
}

function getTranding(type) {
  return fetch(`https://api.giphy.com/v1/${type}/trending?api_key=XcI6775d84WUDVBTSbjFbFqdsbFiTsZA`, { mode: 'cors' })
    .then((response)=> {
      return response.json();
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

export default function createTranding() {
  const container = document.createElement('section');
  const box = document.createElement('div');
  const sliderContainer = document.createElement('div');

  container.id = 'container';
  box.classList.add('box');
  sliderContainer.classList.add('slider-container');
  const bar = createBar();
  const slider = createSlider(sliderContainer);
  createTrandingSlider(slider, 'gifs');
  box.appendChild(bar);
  box.appendChild(sliderContainer);

  container.appendChild(box);
  return container;
}