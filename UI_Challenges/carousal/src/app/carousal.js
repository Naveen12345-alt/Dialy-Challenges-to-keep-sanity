export default class Carousal {
  defaultOptions = {
    autoplay: true,
    duration: 2000,
    dots: false,
    pauseOnHover: false,
  };
  constructor(options = defaultOptions) {
    this.baseWrapper = document.getElementById('carousal');

    this.validateCarousal(options);
    this.initCarousal(options);
  }

  validateCarousal(options) {
    if (!this.baseWrapper) {
      throw new Error('Cannot find a valid element');
    }

    if (typeof options !== 'object' || typeof options === 'null') {
      throw new Error('Provide Valid Options');
    }
  }

  initCarousal(options) {
    const { autoplay, duration, pauseOnHover } = options;
    let slides = this.baseWrapper.getElementsByClassName('slide');

    slides = Array.from(slides);

    if (!slides.length) {
      throw new Error('No Slides to show!');
    }

    let documentFrag = new DocumentFragment();
    let innerDiv = document.createElement('div');

    const width = this.baseWrapper.clientWidth;
    innerDiv.style.height = `calc(100vh - 80px)`;
    innerDiv.style.width = `${slides.length * width}px`;
    innerDiv.style.transition = '0.2s';
    innerDiv.style.display = 'flex';

    slides.forEach((slide) => {
      slide.style.userSelect = 'none';
      innerDiv.appendChild(slide);
    });

    documentFrag.appendChild(innerDiv);

    this.baseWrapper.appendChild(documentFrag);
    let slide = { current: 1 };
    let timer;
    if (autoplay) {
      timer = this.initAutoplayCarousal(duration, slides.length, slide, width, innerDiv);
    }

    if (pauseOnHover) {
      this.initPauseOnHover((type) => {
        if (type === 'mouseenter') {
          clearInterval(timer);
        } else {
          timer = this.initAutoplayCarousal(duration, slides.length, slide, width, innerDiv);
        }
      });
    }
  }

  initAutoplayCarousal(duration, slideLength, slide, width, innerDiv) {
    return setInterval(() => {
      innerDiv.style.transform = `translateX(-${slide.current * width}px)`;
      slide.current = (slide.current + 1) % slideLength;
    }, duration);
  }

  initPauseOnHover(cb) {
    this.baseWrapper.addEventListener('mouseenter', () => cb('mouseenter'));
    this.baseWrapper.addEventListener('mouseleave', () => cb('mouseleave'));
  }
}
