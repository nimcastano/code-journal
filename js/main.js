const $photoUrl = document.querySelector('#photo-url');
const $img = document.querySelector('img');

const $deleteButton = document.querySelector('.delete-button');
const $formTitle = document.querySelector('.form-title');

$photoUrl.addEventListener('input', e => {
  $img.setAttribute('src', e.target.value);
});

const renderEntry = entry => {
  const $li = document.createElement('li');
  $li.setAttribute('data-entry-id', entry.entryId);

  const $div1 = document.createElement('div');
  $div1.setAttribute('class', 'row');

  $li.appendChild($div1);

  const $div2a = document.createElement('div');
  $div2a.setAttribute('class', 'column-half');

  $div1.appendChild($div2a);

  const $img = document.createElement('img');
  $img.setAttribute('src', entry.photoUrl);

  $div2a.appendChild($img);

  const $div2b = document.createElement('div');
  $div2b.setAttribute('class', 'column-half');

  $div1.appendChild($div2b);

  const $div3 = document.createElement('div');
  $div3.setAttribute('id', 'name-edit');

  $div2b.appendChild($div3);

  const $h2 = document.createElement('h2');
  $h2.textContent = entry.title;

  const $faPencil = document.createElement('i');
  $faPencil.className = 'fa fa-pencil';

  const $p = document.createElement('p');
  $p.textContent = entry.notes;

  $div3.appendChild($h2);
  $div3.appendChild($faPencil);
  $div2b.appendChild($p);

  return $li;
};

const $ul = document.querySelector('ul');

const $noEntries = document.querySelector('.no-entry');

const toggleNoEntries = () => {
  if (data.entries.length === 0) {
    $noEntries.className = 'no-entry';
  } else {
    $noEntries.className = 'no-entry hidden';
  }
};

document.addEventListener('DOMContentLoaded', e => {
  for (let i = 0; i < data.entries.length; i++) {
    const $child = renderEntry(data.entries[i]);
    $ul.appendChild($child);
  }

  viewSwap(data.view);

  toggleNoEntries();
});

const $dataViews = document.querySelectorAll('.view');

const viewSwap = view => {
  for (let i = 0; i < $dataViews.length; i++) {
    if ($dataViews[i].getAttribute('data-view') === view) {
      $dataViews[i].className = 'view';
    } else {
      $dataViews[i].className = 'view hidden';
    }
  }
  data.view = view;
};

const $entriesAnchor = document.querySelector('.entries-anchor');

const $form = document.querySelector('#entry-form');

$entriesAnchor.addEventListener('click', e => {
  viewSwap('entries');
  data.editing = null;
  $form.reset();
  $formTitle.textContent = 'New Entry';
  toggleNoEntries();
});

const $entryFormAnchor = document.querySelector('.entry-form-anchor');

$entryFormAnchor.addEventListener('click', e => {
  viewSwap('entry-form');
  $deleteButton.className = 'delete-button invisible';
  $form.reset();
  $formTitle.textContent = 'New Entry';
});

$form.addEventListener('submit', e => {

  e.preventDefault();

  if (data.editing === null) {

    const inputObj = {
      title: $form.elements.title.value,
      photoUrl: $form.elements[1].value,
      notes: $form.elements.notes.value,
      entryId: Number(data.nextEntryId)
    };

    data.nextEntryId++;
    data.entries.unshift(inputObj);

    const $newEntry = renderEntry(inputObj);

    $ul.prepend($newEntry);

    viewSwap('entries');

    toggleNoEntries();

    $img.setAttribute('src', 'images/placeholder-image-square.jpg');

    $form.reset();

  } else {

    const inputObj = {
      title: $form.elements.title.value,
      photoUrl: $form.elements[1].value,
      notes: $form.elements.notes.value,
      entryId: Number(data.editing.entryId)
    };

    const indexFinder = el => {
      return el.entryId === data.editing.entryId;
    };

    const indexFound = data.entries.findIndex(indexFinder);

    data.entries[indexFound] = inputObj;

    const $newLi = renderEntry(inputObj);

    $ul.replaceChild($newLi, $ul.childNodes[indexFound]);

    const $formTitle = document.querySelector('.form-title');
    $formTitle.textContent = 'New Entry';

    viewSwap('entries');

    data.editing = null;

  }

});

$ul.addEventListener('click', e => {
  if (e.target.tagName === 'I') {
    const $closest = e.target.closest('li');
    let $dataEntryId = $closest.getAttribute('data-entry-id');
    $dataEntryId = Number($dataEntryId);

    viewSwap('entry-form');

    $formTitle.textContent = 'Edit Entry';

    $deleteButton.className = 'delete-button';

    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === $dataEntryId) {
        data.editing = data.entries[i];

        document.querySelector('#title').value = data.entries[i].title;
        document.querySelector('#photo-url').value = data.entries[i].photoUrl;
        document.querySelector('#notes').value = data.entries[i].notes;

        break;
      }
    }
  }
});

const $cancelButton = document.querySelector('.cancel-button');
const $confirmButton = document.querySelector('.confirm-button');
const $modalContainer = document.querySelector('#modal-container');

$deleteButton.addEventListener('click', e => {
  $modalContainer.className = 'modal-container';
});

$cancelButton.addEventListener('click', e => {
  $modalContainer.className = 'modal-container hidden';
});

$confirmButton.addEventListener('click', e => {
  const indexFinder = el => {
    return el.entryId === data.editing.entryId;
  };
  const indexFound = data.entries.findIndex(indexFinder);

  const $liElements = document.querySelectorAll('li');

  data.entries.splice(indexFound, 1);

  for (let i = 0; i < $liElements.length; i++) {
    const element = $liElements[i];
    const thisElId = Number(element.getAttribute('data-entry-id'));
    if (thisElId === data.editing.entryId) {
      element.remove();
    }
  }

  toggleNoEntries();

  $modalContainer.className = 'modal-container hidden';

  viewSwap('entries');

});
