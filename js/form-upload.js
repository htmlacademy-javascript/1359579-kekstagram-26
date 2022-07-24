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
const HASHTAG_RE = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const MAX_RENDER_HASHTAGS = 5;

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text',
});

const resetInputs = () => {
  textHashtags.value = '';
  textDescription.value = '';
  pristine.reset();
};

function keydownEscapeHandler(evt) {
  if (isEscapeKey(evt)) {
    if (document.activeElement !== textHashtags && document.activeElement !== textDescription) {
      evt.preventDefault();
      uploadForm.querySelector('.img-upload__overlay').classList.add('hidden');
      body.classList.remove('modal-open');
      document.removeEventListener('keydown', keydownEscapeHandler);
      resetInputs();
    }
  }
}

function clickHandler() {
  uploadForm.querySelector('.img-upload__overlay').classList.add('hidden');
  body.classList.remove('modal-open');
  uploadCancel.removeEventListener('click', clickHandler);
  resetInputs();
}

uploadFile.addEventListener('change', () => {
  document.addEventListener('keydown', keydownEscapeHandler);
  uploadCancel.addEventListener('click', clickHandler);
  uploadForm.querySelector('.img-upload__overlay').classList.remove('hidden');
  body.classList.add('modal-open');
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

pristine.addValidator(textHashtags, hashtagValidator);

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
