import {applyOriginalEffect} from './slider.js';
import {isEscapeKey} from './utils.js';
import {sendData} from './api.js';

const body = document.querySelector('body');
const uploadForm = document.querySelector('.img-upload__form');
const uploadFile = uploadForm.querySelector('#upload-file');
const uploadCancel = uploadForm.querySelector('#upload-cancel');
const textHashtags = uploadForm.querySelector('.text__hashtags');
const textDescription = uploadForm.querySelector('.text__description');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const submitButton = document.querySelector('#upload-submit');
const uploadSuccess = document.querySelector('#success').content.querySelector('.success');
const loadingError =  document.querySelector('#error').content.querySelector('.error');
const effectNone = document.querySelector('#effect-none');

const HASHTAG_RE = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const MAX_RENDER_HASHTAGS = 5;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_STEP = 25;
const SCALE_DEFAULT = 100;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
let scaleValue = SCALE_DEFAULT;


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
  textHashtags.value = '';
  textDescription.value = '';
  scaleValue = SCALE_DEFAULT;
  addScaleValue();
  pristine.reset();
  effectNone.checked = true;
  applyOriginalEffect();
};

const closeForm = (isReset) => {
  uploadForm.querySelector('.img-upload__overlay').classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', keydownEscapeHandler);
  uploadCancel.removeEventListener('click', clickHandler);
  scaleControlSmaller.removeEventListener('click', reductionScale);
  scaleControlBigger.removeEventListener('click', growthScale);
  if (isReset) {
    resetForm();
  }
};

function clickHandler() {
  closeForm(true);
}

function keydownEscapeHandler(evt) {
  if (isEscapeKey(evt)) {
    if (document.activeElement !== textHashtags && document.activeElement !== textDescription) {
      evt.preventDefault();
      closeForm(true);
    }
  }
}

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

const checkNumberHashtags = (value) => {
  const words = value.trim().split(' ');
  const isValid = value === '' || words.every((word) => HASHTAG_RE.test(word));
  return isValid;
};

const checkRepeatedHashtags = (value) => {
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
pristine.addValidator(textHashtags, checkNumberHashtags, 'ХэшТэг начинается с # и содержит не более 20 любых букв и цифр.');
pristine.addValidator(textHashtags, checkRepeatedHashtags, 'ХэшТэги не должны повторяться.');
pristine.addValidator(textHashtags, maxRenderHashtags, 'Можно использовать не более 5 ХэшТэгов.');

const blockSubmitButton = () => {submitButton.disabled = true;};
const unblockSubmitButton = () => {submitButton.disabled = false;};

const showForm = () => {
  scaleControlSmaller.addEventListener('click', reductionScale);
  scaleControlBigger.addEventListener('click', growthScale);
  document.addEventListener('keydown', keydownEscapeHandler);
  uploadCancel.addEventListener('click', clickHandler);
  uploadForm.querySelector('.img-upload__overlay').classList.remove('hidden');
  body.classList.add('modal-open');
};

const showSuccess = () => {
  const elementSuccess = uploadSuccess.cloneNode(true);
  elementSuccess.querySelector('.success__button').addEventListener('click', () => elementSuccess.remove());

  function keydownEscapeSuccessHandler(evt) {
    if (isEscapeKey(evt)) {
      elementSuccess.remove();
      document.removeEventListener('keydown', keydownEscapeSuccessHandler);
      document.removeEventListener('click', clickSuccessHandler);
    }
  }

  document.addEventListener('keydown', keydownEscapeSuccessHandler);

  function clickSuccessHandler() {
    elementSuccess.remove();
    document.removeEventListener('click', clickSuccessHandler);
    document.removeEventListener('keydown', keydownEscapeSuccessHandler);
  }

  document.addEventListener('click', clickSuccessHandler);
  body.appendChild(elementSuccess);
};

const showError = () => {
  const elementError = loadingError.cloneNode(true);
  elementError.querySelector('.error__button').addEventListener('click', () => {
    elementError.remove();
    showForm();
  });

  function keydownEscapeErrorHandler(evt) {
    if (isEscapeKey(evt)) {
      elementError.remove();
      showForm();
      document.removeEventListener('keydown', keydownEscapeErrorHandler);
      document.removeEventListener('click', clickErrorHandler);
    }
  }

  document.addEventListener('keydown', keydownEscapeErrorHandler);
  function clickErrorHandler()  {
    elementError.remove();
    document.removeEventListener('click', clickErrorHandler);
    document.removeEventListener('keydown', keydownEscapeErrorHandler);
    showForm();
  }

  document.addEventListener('click', clickErrorHandler);
  body.appendChild(elementError);
};

const userUploadFile = () => {
  const userFile = uploadFile.files[0];
  const userFileName = userFile.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => userFileName.endsWith(it));
  if (matches) {
    imgUploadPreview.src = URL.createObjectURL(userFile);
  }
};

uploadFile.addEventListener('change', () => {
  showForm();
  userUploadFile();
  addScaleValue();
  applyOriginalEffect();
});

uploadFile.addEventListener('click', (evt) => {
  evt.target.value = '';
});

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();
    sendData(
      new FormData(evt.target),
      () => {
        unblockSubmitButton();
        closeForm(true);
        showSuccess();
      },
      () => {
        unblockSubmitButton();
        closeForm(false);
        showError();
      },
    );
  }
});
