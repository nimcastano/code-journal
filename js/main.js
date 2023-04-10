const $photoUrl = document.querySelector('#photo-url');
const $img = document.querySelector('img');

$photoUrl.addEventListener('input', e => {
  $img.setAttribute('src', e.target.value);
});

const $form = document.querySelector('#entry-form');

// console.log($form.elements);

$form.addEventListener('submit', e => {
  e.preventDefault();

  const inputObj = {
    title: $form.elements.title.value,
    photoUrl: $form.elements[1].value,
    notes: $form.elements.notes.value,
    entryId: data.nextEntryId
  };

  data.nextEntryId++;
  data.entries.unshift(inputObj);

  $img.setAttribute('src', 'images/placeholder-image-square.jpg');

  $form.reset();
});
