class  Image {

  getColor() {
    const colors = ['#E7F2F8', '#74BDCB', '#FFA384', '#EFE7BC'];
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
  }

  createImage(image) {
    const bkColor = this.getColor();
    const figure = document.createElement('figure');
    const i = document.createElement('img');
    i.src = image.url;
    i.style.width = image.width + 'px';
    i.style.height = image.height + 'px';
    
    figure.classList.add('slide');
    figure.style.backgroundColor = bkColor;
    figure.appendChild(i);

    return figure;
  }

  getTitle(str) {
    const index = str.indexOf(' GIF');
    return str.substring(0, index);
  }

  getLeft(index) {
    const figures = document.querySelectorAll('#content .slide');
    let left = 0;
    if(index % 4 > 0) {
      const lastLeft = +figures[index - 1].style.left.match(/-*[0-9]+/)[0];
      left = lastLeft + 17;
    }
    return left + 'vw';
  }

  getTop(index) {
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

  putImage(index, data) {
    const img = data.images.fixed_width;
    const title = this.getTitle(data.title);
    const figure = this.createImage(img);
    const figCaption = document.createElement('figcaption');
    figCaption.textContent = title;
    figCaption.classList.add('cap');
    figure.appendChild(figCaption);
    
    figure.classList.add('content');
    figure.style.top = this.getTop(index);
    figure.style.left = this.getLeft(index);
  
    content.appendChild(figure);
  }
}

const image = new Image();
export default image;