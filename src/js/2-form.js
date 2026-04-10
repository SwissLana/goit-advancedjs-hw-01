const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
};

let formData = {
  email: '',
  message: '',
};

fillFormFields();

refs.form.addEventListener('input', onFormInput);
refs.form.addEventListener('submit', onFormSubmit);

function onFormInput(event) {
  const { name, value } = event.target;

  if (!name) return;

  formData[name] = value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(event) {
  event.preventDefault();

  if (Object.values(formData).includes('')) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);
  event.currentTarget.reset();

  formData = {
    email: '',
    message: '',
  };
}

function fillFormFields() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (!savedData) return;

  try {
    const parsedData = JSON.parse(savedData);

    formData = {
      email: parsedData.email || '',
      message: parsedData.message || '',
    };

    Object.keys(formData).forEach(key => {
      if (refs.form.elements[key]) {
        refs.form.elements[key].value = formData[key] || '';
      }
    });
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}
