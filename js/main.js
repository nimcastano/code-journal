const $photoUrl = document.querySelector('#photo-url');
const $img = document.querySelector('img');

$photoUrl.addEventListener('input', e => {
  $img.setAttribute('src', e.target.value);
});

const renderEntry = entry => {
  const $li = document.createElement('li');

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

  const $h2 = document.createElement('h2');
  $h2.textContent = entry.title;

  const $p = document.createElement('p');
  $p.textContent = entry.notes;

  $div2b.appendChild($h2);
  $div2b.appendChild($p);

  return $li;
};

const $ul = document.querySelector('ul');

document.addEventListener('DOMContentLoaded', e => {
  for (let i = 0; i < data.entries.length; i++) {
    const $child = renderEntry(data.entries[i]);
    $ul.appendChild($child);
  }

  viewSwap(data.view);

  if (data.entrieslength === 0) {
    toggleNoEntries();
  }
});

const $noEntries = document.querySelector('.no-entry');

const toggleNoEntries = () => {
  if ($noEntries.className === 'no-entry') {
    $noEntries.classList.add('hidden');
  } else {
    $noEntries.className = 'no-entry';
  }
};

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

$entriesAnchor.addEventListener('click', e => {
  viewSwap('entries');
});

const $entryFormAnchor = document.querySelector('.entry-form-anchor');

$entryFormAnchor.addEventListener('click', e => {
  viewSwap('entry-form');
});

const $form = document.querySelector('#entry-form');

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

  const $newEntry = renderEntry(inputObj);

  $ul.prepend($newEntry);

  viewSwap('entries');

  if (data.entries.length !== 0) {
    toggleNoEntries();
  }

  $img.setAttribute('src', 'images/placeholder-image-square.jpg');

  $form.reset();
});
