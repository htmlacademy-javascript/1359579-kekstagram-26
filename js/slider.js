const slider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectsRadio = document.querySelectorAll('.effects__radio');
const effectLevelElement = document.querySelector('.img-upload__effect-level');
const effectsList = document.querySelector('.effects__list');
const imgUploadPreview = document.querySelector('.img-upload__preview img');

const EFFECT_ORIGINAL = 'none';
const SLIDER_OPTIONS = {
  [EFFECT_ORIGINAL]: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    connect: 'lower',
    format: {
      to: (value) => Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1),
      from: (value) => value,
    },
  },
  'chrome': {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },
  'sepia': {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    format: {
      to: (value) => Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1),
      from: (value) => value,
    },
  },
  'marvin': {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
  },
  'phobos': {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
  },
  'heat': {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
  },
};

const EFFECT_STYLE = {
  [EFFECT_ORIGINAL]: 'none',
  'chrome': 'grayscale',
  'sepia': 'sepia',
  'marvin': 'invert',
  'phobos': 'blur',
  'heat': 'brightness',
};

const EFFECT_MEASURE = {
  [EFFECT_ORIGINAL]: '',
  'chrome': '',
  'sepia': '',
  'marvin': '%',
  'phobos': 'px',
  'heat': '',
};

let currentEffect = EFFECT_ORIGINAL;

const disableSlider = () => {
  slider.setAttribute('disabled', true);
  effectLevelElement.classList.add('hidden');
};

const enableSlider = () => {
  slider.removeAttribute('disabled');
  effectLevelElement.classList.remove('hidden');
};

const updatePreviewStyle = () => {
  if (currentEffect === EFFECT_ORIGINAL) {
    imgUploadPreview.style.filter = 'none';
  } else {
    imgUploadPreview.style.filter = `${EFFECT_STYLE[currentEffect]}(${effectLevelValue.value}${EFFECT_MEASURE[currentEffect]})`;
  }
};

noUiSlider.create(slider, SLIDER_OPTIONS[EFFECT_ORIGINAL]);
slider.setAttribute('disabled', true);

slider.noUiSlider.on('update', () => {
  effectLevelValue.value = slider.noUiSlider.get();
  updatePreviewStyle();
});

const getCurrentEffect = () => {
  let effect;
  effectsRadio.forEach((item) => {
    if (item.checked === true) {
      effect = item.value;
    }
  });
  return effect;
};

const resetAllEffects = () => {
  imgUploadPreview.classList.forEach((item) => {
    if (item.startsWith('effects__preview--')) {
      imgUploadPreview.classList.remove(item);
    }
  });
  imgUploadPreview.style.filter = 'none';
};

const setupEffect = (effect) => {
  if (effect === EFFECT_ORIGINAL) {
    disableSlider();
  } else {
    enableSlider();
    imgUploadPreview.classList.add(`effects__preview--${effect}`);
  }
  slider.noUiSlider.updateOptions(SLIDER_OPTIONS[effect]);
  updatePreviewStyle();
};

const addEffect = () => {
  resetAllEffects();
  setupEffect(currentEffect);
};

const applyOriginalEffect = () => {
  currentEffect = EFFECT_ORIGINAL;
  addEffect();
};

effectsList.addEventListener('click', (evt) => {
  if (evt.target.nodeName === 'INPUT') {
    currentEffect = getCurrentEffect();
    addEffect();
  }
});

export {applyOriginalEffect};
