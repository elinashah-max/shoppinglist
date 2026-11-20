const byId = id => document.getElementById(id);
function read(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

const saved = new Set(read('pin-and-tell-saved'));
const links = read('pin-and-tell-links');
let view = 'discover';
let category = categories[0];
let statusTimer;
const edits = [
  {title: 'Friday night', image: 6, ids: ['1', '3', '4', '6', '7'], description: 'Going-out tops, gold hoops, and a good heel.'},
  {title: 'Cherry on top', image: 2, ids: ['2', '3', '9', '12'], description: 'Glossy nails and little hits of red.'},
  {title: 'Room refresh', image: 5, ids: ['5', '10'], description: 'Playful pieces for your space.'}
];
let currentEdit;

function announce(message) {
  byId('status').textContent = message;
  clearTimeout(statusTimer);
  statusTimer = setTimeout(() => byId('status').textContent = '', 2600);
}

function persist() {
  try {
    localStorage.setItem('pin-and-tell-saved', JSON.stringify([...saved]));
    localStorage.setItem('pin-and-tell-links', JSON.stringify(links));
    return true;
  } catch {
    return false;
  }
}

function node(tag, className, value) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (value) element.textContent = value;
  return element;
}

function externalLink(item, className, label) {
  const link = node('a', className, label);
  link.href = item.url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  return link;
}

function card(item) {
  const article = node('article', 'card');
  const media = node('div', 'card-media');
  const imageLink = externalLink(item, item.image ? '' : 'placeholder', item.image ? '' : '✦');
  imageLink.setAttribute('aria-label', 'Open ' + item.title);
  if (item.image) {
    const image = node('img');
    image.src = item.image;
    image.alt = '';
    image.loading = 'lazy';
    imageLink.append(image);
  }
  const heart = node('button', 'heart');
  function syncHeart() {
    const selected = saved.has(item.id);
    heart.textContent = selected ? '♥' : '♡';
    heart.setAttribute('aria-pressed', selected);
    heart.setAttribute('aria-label', (selected ? 'Remove saved item ' : 'Save ') + item.title);
  }
  syncHeart();
  heart.addEventListener('click', () => {
    const selected = saved.has(item.id);
    if (selected) saved.delete(item.id);
    else saved.add(item.id);
    const stored = persist();
    byId('count').textContent = saved.size || '';
    if (view === 'saved' && selected) {
      render();
      (byId('grid').querySelector('.heart') || byId('search')).focus();
    } else {
      syncHeart();
    }
    announce(stored ? (selected ? 'Removed from your board' : 'Saved to your board') : 'Available for this session only');
  });
  media.append(imageLink, node('span', 'source', item.source), heart);
  article.append(media, node('h3', '', item.title), node('p', '', item.category),
    externalLink(item, 'shop', item.image ? 'Shop similar at ' + item.store : 'Open link'));
  if (!item.image) {
    const similar = externalLink({
      url: 'https://www.google.com/search?tbm=shop&q=' + encodeURIComponent(item.title)
    }, 'shop similar', 'Find similar');
    article.append(similar);
  }
  return article;
}

function render() {
  const personal = view === 'saved';
  const query = byId('search').value.toLowerCase().trim();
  const source = byId('source-filter').value;
  const order = byId('sort').value;
  const items = (personal ? [...links, ...catalog].filter(item => saved.has(item.id)) : catalog)
    .filter(item => (!currentEdit || currentEdit.ids.includes(item.id))
      && (!source || source === item.source)
      && (category === categories[0] || category === item.category)
      && [item.title, item.category, item.source, item.store].join(' ').toLowerCase().includes(query));
  if (order === 'az') items.sort((a,b) => a.title.localeCompare(b.title));
  if (order === 'category') items.sort((a, b) => a.category.localeCompare(b.category));
  byId('count').textContent = saved.size || '';
  byId('results').textContent = items.length + (items.length === 1 ? ' find' : ' finds');
  byId('source-filter').hidden = personal;
  byId('edits-section').hidden = personal;
  byId('clear-edit').hidden = !currentEdit;
  byId('kicker').textContent = personal ? 'YOUR COLLECTION' : 'THE DISCOVERY EDIT';
  byId('section-title').textContent = personal ? 'Your saved board' : currentEdit?.title ?? 'On our radar';
  document.querySelectorAll('.nav').forEach(button => {
    const active = button.dataset.view === view;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', active);
  });
  byId('grid').replaceChildren(...items.map(card));
  byId('empty').hidden = items.length > 0;
  byId('empty').textContent = personal && saved.size === 0
    ? 'Save a find with the heart or add a link to start your board.'
    : 'No matches. Try a different search or category.';
}

function show(nextView, edit) {
  currentEdit = edit;
  byId('source-filter').value = '';
  byId('sort').value = '';
  view = nextView;
  category = categories[0];
  byId('search').value = '';
  renderFilters();
  render();
  byId('browse').scrollIntoView({block:'start'});
}

function renderFilters() {
  byId('filters').replaceChildren(...categories.map(value => {
    const button = node('button', 'filter', value);
    button.setAttribute('aria-pressed', value === category);
    button.addEventListener('click', () => {
      category = value;
      for (const filter of byId('filters').children) {
        filter.setAttribute('aria-pressed', filter === button);
      }
      render();
    });
    return button;
  }));
}

function platform(hostname) {
  if (hostname === 'pin.it' || hostname === 'pinterest.com' || hostname.endsWith('.pinterest.com')) return 'Pinterest';
  if (hostname === 'tiktok.com' || hostname.endsWith('.tiktok.com')) return 'TikTok';
  return hostname.replace(/^www\./, '');
}

document.querySelectorAll('.nav').forEach(button => button.addEventListener('click', () => show(button.dataset.view)));
byId('explore').addEventListener('click', () => show('discover'));
byId('search').addEventListener('input', render);
byId('source-filter').addEventListener('change', render);
byId('sort').addEventListener('change', render);
byId('clear-edit').addEventListener('click', () => show('discover'));
for (const edit of edits) {
  const button = node('button', 'edit-card');
  const image = node('img');
  image.src = 'assets/' + edit.image + '.webp';
  image.alt = '';
  image.loading = 'lazy';
  const label = node('span', 'edit-label');
  label.append(node('strong', '', edit.title), node('span', '', edit.description));
  button.append(image, label);
  button.addEventListener('click', () => show('discover', edit));
  byId('edits').append(button);
}
const dialog = byId('link-dialog');
const error = byId('link-error');
byId('add').addEventListener('click', () => { error.textContent = ''; dialog.showModal(); });
byId('close').addEventListener('click', () => dialog.close());
byId('link-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const url = new URL(data.get('url'));
  const title = data.get('title').trim();
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || !title) {
    error.textContent = 'Enter a web link and a title.';
    return;
  }
  const existing = links.find(item => item.url === url.href);
  const id = existing?.id ?? crypto.randomUUID();
  if (!existing) links.unshift({id, title, url: url.href, category: data.get('category'), source: platform(url.hostname)});
  saved.add(id);
  const stored = persist();
  form.reset();
  dialog.close();
  show('saved');
  announce(stored ? 'Link saved to your board' : 'Link available for this session only');
});

renderFilters();
render();
