(function () {
  'use strict';

  var MAX_AVATAR_BYTES = 500 * 1024; // 500KB
  var VALID_TYPES = ['image/jpeg', 'image/png'];

  var form = document.getElementById('ticketForm');
  var formView = document.getElementById('formView');
  var ticketView = document.getElementById('ticketView');

  var dropzone = document.getElementById('dropzone');
  var avatarInput = document.getElementById('avatarInput');
  var dropzoneEmpty = document.getElementById('dropzoneEmpty');
  var dropzoneFilled = document.getElementById('dropzoneFilled');
  var avatarPreview = document.getElementById('avatarPreview');
  var removeImageBtn = document.getElementById('removeImageBtn');
  var changeImageBtn = document.getElementById('changeImageBtn');
  var avatarHint = document.getElementById('avatarHint');
  var avatarHintText = document.getElementById('avatarHintText');

  var fullNameInput = document.getElementById('fullName');
  var emailInput = document.getElementById('email');
  var githubInput = document.getElementById('github');

  var nameHint = document.getElementById('nameHint');
  var emailHint = document.getElementById('emailHint');
  var githubHint = document.getElementById('githubHint');

  var DEFAULT_AVATAR_HINT = 'Upload your photo (JPG or PNG, max size: 500KB).';
  var avatarDataUrl = null;
  var avatarValid = false;

  /* ---------------- avatar upload ---------------- */

  function openFilePicker() {
    avatarInput.click();
  }

  dropzone.addEventListener('click', function (e) {
    // Let the ghost buttons handle their own clicks when a file is present
    if (e.target.closest('.ghost-btn')) return;
    openFilePicker();
  });

  dropzone.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openFilePicker();
    }
  });

  dropzone.addEventListener('focus', function () {
    dropzone.classList.add('is-focused');
  });
  dropzone.addEventListener('blur', function () {
    dropzone.classList.remove('is-focused');
  });

  ['dragenter', 'dragover'].forEach(function (evt) {
    dropzone.addEventListener(evt, function (e) {
      e.preventDefault();
      dropzone.classList.add('is-dragover');
    });
  });
  ['dragleave', 'drop'].forEach(function (evt) {
    dropzone.addEventListener(evt, function (e) {
      e.preventDefault();
      dropzone.classList.remove('is-dragover');
    });
  });
  dropzone.addEventListener('drop', function (e) {
    var files = e.dataTransfer.files;
    if (files && files.length) handleAvatarFile(files[0]);
  });

  avatarInput.addEventListener('change', function () {
    if (avatarInput.files && avatarInput.files.length) {
      handleAvatarFile(avatarInput.files[0]);
    }
  });

  removeImageBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    clearAvatar();
  });

  changeImageBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    openFilePicker();
  });

  function handleAvatarFile(file) {
    if (VALID_TYPES.indexOf(file.type) === -1) {
      setAvatarError('Please upload a JPG or PNG file.');
      return;
    }
    if (file.size > MAX_AVATAR_BYTES) {
      setAvatarError('File too large. Please upload a photo under 500KB.');
      return;
    }

    var reader = new FileReader();
    reader.onload = function (e) {
      avatarDataUrl = e.target.result;
      avatarValid = true;
      showAvatarPreview(avatarDataUrl);
      clearAvatarError();
    };
    reader.readAsDataURL(file);
  }

  function showAvatarPreview(src) {
    avatarPreview.src = src;
    dropzoneEmpty.hidden = true;
    dropzoneFilled.hidden = false;
  }

  function clearAvatar() {
    avatarDataUrl = null;
    avatarValid = false;
    avatarInput.value = '';
    dropzoneFilled.hidden = true;
    dropzoneEmpty.hidden = false;
    clearAvatarError();
  }

  function setAvatarError(message) {
    avatarValid = false;
    dropzone.classList.add('is-invalid');
    avatarHint.classList.add('hint--error');
    avatarHintText.textContent = message;
  }

  function clearAvatarError() {
    dropzone.classList.remove('is-invalid');
    avatarHint.classList.remove('hint--error');
    avatarHintText.textContent = DEFAULT_AVATAR_HINT;
  }

  /* ---------------- field validation ---------------- */

  function setFieldError(input, hintEl, message) {
    input.classList.add('is-invalid');
    hintEl.hidden = false;
    hintEl.textContent = message;
  }

  function clearFieldError(input, hintEl) {
    input.classList.remove('is-invalid');
    hintEl.hidden = true;
    hintEl.textContent = '';
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  [fullNameInput, emailInput, githubInput].forEach(function (input) {
    input.addEventListener('input', function () {
      var hintEl =
        input === fullNameInput
          ? nameHint
          : input === emailInput
            ? emailHint
            : githubHint;
      clearFieldError(input, hintEl);
    });
  });

  function validateForm() {
    var valid = true;

    if (!avatarValid) {
      setAvatarError('Please upload your photo (JPG or PNG, max size: 500KB).');
      valid = false;
    }

    if (!fullNameInput.value.trim()) {
      setFieldError(fullNameInput, nameHint, 'Please enter your full name.');
      valid = false;
    } else {
      clearFieldError(fullNameInput, nameHint);
    }

    if (!emailInput.value.trim() || !isValidEmail(emailInput.value.trim())) {
      setFieldError(
        emailInput,
        emailHint,
        'Please enter a valid email address.',
      );
      valid = false;
    } else {
      clearFieldError(emailInput, emailHint);
    }

    var githubValue = githubInput.value.trim();
    if (!githubValue) {
      setFieldError(
        githubInput,
        githubHint,
        'Please enter your GitHub username.',
      );
      valid = false;
    } else {
      clearFieldError(githubInput, githubHint);
    }

    return valid;
  }

  /* ---------------- submit / ticket generation ---------------- */

  function generateTicketNumber() {
    var n = Math.floor(Math.random() * 90000) + 10000;
    return '#' + n;
  }

  function normalizeGithubHandle(value) {
    value = value.trim();
    return value.charAt(0) === '@' ? value : '@' + value;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validateForm()) return;

    var fullName = fullNameInput.value.trim();
    var email = emailInput.value.trim();
    var github = normalizeGithubHandle(githubInput.value);

    document.getElementById('ticketFirstName').textContent = fullName;
    document.getElementById('ticketEmail').textContent = email;
    document.getElementById('ticketFullName').textContent = fullName;
    document.getElementById('ticketHandle').textContent = github;
    document.getElementById('ticketNumber').textContent =
      generateTicketNumber();

    var ticketAvatar = document.getElementById('ticketAvatar');
    ticketAvatar.src = avatarDataUrl;
    ticketAvatar.alt = fullName + '\u2019s avatar';

    formView.hidden = true;
    ticketView.hidden = false;
    ticketView.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
})();
