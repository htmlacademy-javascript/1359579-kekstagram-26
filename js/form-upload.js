import {isEscapeKey} from './utils.js';

const body = document.querySelector('body');
const uploadForm = document.querySelector('.img-upload__form');
const uploadFile = uploadForm.querySelector('#upload-file');
const uploadCancel = uploadForm.querySelector('#upload-cancel');
// const templateSuccess = document.querySelector('#success').content.querySelector('.success');
// const templateError = document.querySelector('#error').content.querySelector('.error');
// const uploadText = document.querySelector('.img-upload__text');
const textHashtags = uploadForm.querySelector('.text__hashtags');
const textDescription = uploadForm.querySelector('.text__description');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview').querySelector('img');
const slider = document.querySelector('.effect-level__slider');
const effectsRadio = document.querySelectorAll('.effects__radio');
const effectsList = document.querySelector('.effects__list');
const effectLevelValue = document.querySelector('.effect-level__value');
const HASHTAG_RE = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const MAX_RENDER_HASHTAGS = 5;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_STEP = 25;
const SCALE_DEFAULT = 100;
const EFFECT_ORIGINAL = 'none';
let scaleValue = SCALE_DEFAULT;

const SLIDER_OPTIONS = {
  [EFFECT_ORIGINAL]: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
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
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
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

noUiSlider.create(slider, SLIDER_OPTIONS[EFFECT_ORIGINAL]);
slider.setAttribute('disabled', true);
let currentEffect = EFFECT_ORIGINAL;

const updatePreviewStyle = () => {
  if (currentEffect === EFFECT_ORIGINAL) {
    imgUploadPreview.style.filter = 'none';
  } else {
    imgUploadPreview.style.filter = `${EFFECT_STYLE[currentEffect]}(${effectLevelValue.value}${EFFECT_MEASURE[currentEffect]})`;
  }
};

slider.noUiSlider.on('update', () => {
  effectLevelValue.value = slider.noUiSlider.get();
  updatePreviewStyle();
});

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text',
});

const addScaleValue = () => {
  scaleControlValue.value = `${scaleValue}%`;
  imgUploadPreview.style.transform = `scale(${scaleValue / 100})`;
};

const reductionScale = () => {
  if (scaleValue >= SCALE_MIN + SCALE_STEP) {
    scaleValue -= SCALE_STEP;
    addScaleValue();
  }
};

const growthScale = () => {
  if (scaleValue <= SCALE_MAX - SCALE_STEP) {
    scaleValue += SCALE_STEP;
    addScaleValue();
  }
};

const resetForm = () => {
  scaleControlSmaller.removeEventListener('click', reductionScale);
  scaleControlBigger.removeEventListener('click', growthScale);
  textHashtags.value = '';
  textDescription.value = '';
  scaleValue = SCALE_DEFAULT;
  addScaleValue();
  pristine.reset();
};

uploadFile.addEventListener('change', () => {
  scaleControlSmaller.addEventListener('click', reductionScale);
  scaleControlBigger.addEventListener('click', growthScale);
  document.addEventListener('keydown', keydownEscapeHandler);
  uploadCancel.addEventListener('click', clickHandler);
  uploadForm.querySelector('.img-upload__overlay').classList.remove('hidden');
  body.classList.add('modal-open');
  addScaleValue();
});

function hashtagValidator (value) {
  const words = value.trim().split(' ');
  let isValid = words.every((word) => HASHTAG_RE.test(word));
  if (isValid) {
    isValid = new Set(words).size === words.length;
  }
  if (isValid) {
    isValid = words.length <= 5;
  }
  return isValid;
}

const validateHashtag = (value) => {
  const words = value.trim().split(' ');
  const isValid = value === '' || words.every((word) => HASHTAG_RE.test(word));
  return isValid;
};

const noRepeatHashtags = (value) => {
  const words = value.trim().toLowerCase().split(' ');
  const isValid = value === '' || new Set(words).size === words.length;
  return isValid;
};

const maxRenderHashtags = (value) => {
  const words = value.trim().split(' ');
  const isValid = value === '' || words.length <= MAX_RENDER_HASHTAGS;
  return isValid;
};

pristine.addValidator(textHashtags, hashtagValidator);
pristine.addValidator(textHashtags, validateHashtag, 'ХэшТэг начинается с # и содержит не более 20 любых букв и цифр.');
pristine.addValidator(textHashtags, noRepeatHashtags, 'ХэшТэги не должны повторяться.');
pristine.addValidator(textHashtags, maxRenderHashtags, 'Можно использовать не более 5 ХэшТэгов.');

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    clickHandler();
  }
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
  if (effect !== EFFECT_ORIGINAL) {
    slider.setAttribute('disabled', true);
  } else {
    slider.removeAttribute('disabled');
    imgUploadPreview.classList.add(`effects__preview--${effect}`);
  }
  slider.noUiSlider.updateOptions(SLIDER_OPTIONS[effect]);
  updatePreviewStyle();
};

const addEffect = () => {
  currentEffect = getCurrentEffect();
  resetAllEffects();
  setupEffect(currentEffect);
};

effectsList.addEventListener('click', (evt) => {
  if (evt.target.nodeName === 'INPUT') {
    addEffect();
  }
});

function keydownEscapeHandler(evt) {
  if (isEscapeKey(evt)) {
    if (document.activeElement !== textHashtags && document.activeElement !== textDescription) {
      evt.preventDefault();
      uploadForm.querySelector('.img-upload__overlay').classList.add('hidden');
      body.classList.remove('modal-open');
      document.removeEventListener('keydown', keydownEscapeHandler);
      resetForm();
    }
  }
}

function clickHandler() {
  uploadForm.querySelector('.img-upload__overlay').classList.add('hidden');
  body.classList.remove('modal-open');
  uploadCancel.removeEventListener('click', clickHandler);
  resetForm();
}
