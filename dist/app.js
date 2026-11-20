const categories = ['All finds', 'Going-out tops', 'Beauty & nails', 'Accessories', 'Room finds'];
const catalog = [
  ['1', 'The bow-strap cami', categories[1], 'Pinterest edit', 'Urban Outfitters', 'https://www.urbanoutfitters.com/search?q=crochet%20cami'],
  ['2', 'Cherry-gloss French tips', categories[2], 'Pinterest edit', 'Ulta Beauty', 'https://www.ulta.com/search?search=glossy%20pink%20press%20on%20nails'],
  ['3', 'The cherry shoulder bag', categories[3], 'Pinterest edit', 'Coach', 'https://www.coach.com/search?q=red%20shoulder%20bag'],
  ['4', 'Sculptural gold hoops', categories[3], 'TikTok edit', 'Nordstrom', 'https://www.nordstrom.com/sr?keyword=chunky%20gold%20hoops'],
  ['5', 'Pink gingham bedding', categories[4], 'Pinterest edit', 'Target', 'https://www.target.com/s?searchTerm=pink%20gingham%20bedding'],
  ['6', 'The after-hours halter', categories[1], 'Style edit', 'ASOS', 'https://www.asos.com/us/search/?q=brown%20sequin%20halter%20top']
].map(([id, title, category, source, store, url]) => ({id, title, category, source, store, url, image: 'assets/' + id + '.webp'}));

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
  return article;
}

function render() {
  const personal = view === 'saved';
  const query = byId('search').value.toLowerCase().trim();
  const items = (personal ? [...links, ...catalog].filter(item => saved.has(item.id)) : catalog)
    .filter(item => (category === categories[0] || category === item.category)
      && [item.title, item.category, item.source, item.store].join(' ').toLowerCase().includes(query));
  byId('count').textContent = saved.size || '';
  byId('kicker').textContent = personal ? 'YOUR COLLECTION' : 'THE DISCOVERY EDIT';
  byId('section-title').textContent = personal ? 'Your saved board' : 'On our radar';
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

function show(nextView) {
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
