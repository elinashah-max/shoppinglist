const categories = ['All finds', 'Going-out tops', 'Beauty & nails', 'Accessories', 'Room finds', 'Shoes', 'Outfits'];
const catalog = [
  ['1', 'The bow-strap cami', categories[1], 'Pinterest edit', 'Urban Outfitters', 'https://www.urbanoutfitters.com/search?q=crochet%20cami'],
  ['2', 'Cherry-gloss French tips', categories[2], 'Pinterest edit', 'Ulta Beauty', 'https://www.ulta.com/search?search=glossy%20pink%20press%20on%20nails'],
  ['3', 'The cherry shoulder bag', categories[3], 'Pinterest edit', 'Coach', 'https://www.coach.com/search?q=red%20shoulder%20bag'],
  ['4', 'Sculptural gold hoops', categories[3], 'TikTok edit', 'Nordstrom', 'https://www.nordstrom.com/sr?keyword=chunky%20gold%20hoops'],
  ['5', 'Pink gingham bedding', categories[4], 'Pinterest edit', 'Target', 'https://www.target.com/s?searchTerm=pink%20gingham%20bedding'],
  ['6', 'The after-hours halter', categories[1], 'Style edit', 'ASOS', 'https://www.asos.com/us/search/?q=brown%20sequin%20halter%20top'],
  ['7', 'Black kitten-heel slingbacks', categories[5], 'Pinterest edit', 'Nordstrom', 'https://www.nordstrom.com/sr?keyword=black%20kitten%20heel%20slingbacks'],
  ['8', 'Butter-yellow mini dress', categories[6], 'Pinterest edit', 'ASOS', 'https://www.asos.com/us/search/?q=butter%20yellow%20mini%20dress'],
  ['9', 'Glossy cherry lip oil', categories[2], 'TikTok edit', 'Sephora', 'https://www.sephora.com/search?keyword=cherry%20lip%20oil'],
  ['10', 'Wavy pink table lamp', categories[4], 'Pinterest edit', 'Target', 'https://www.target.com/s?searchTerm=pink%20wavy%20table%20lamp'],
  ['11', 'Leopard barrel jeans', categories[6], 'TikTok edit', 'ASOS', 'https://www.asos.com/us/search/?q=leopard%20barrel%20jeans'],
  ['12', 'Cherry-red ballet flats', categories[5], 'Pinterest edit', 'Nordstrom', 'https://www.nordstrom.com/sr?keyword=red%20ballet%20flats']
].map(([id, title, category, source, store, url]) => ({id, title, category, source, store, url, image: 'assets/' + id + '.webp'}));


const additionalFinds = [
  [
    'Charcoal embellished halter', 'Black lace-trim cami', 'Aqua striped strapless top',
    'Zebra mesh cami', 'Black floral lace top', 'Burgundy studded cami',
    'Black and ivory lace mini dress', 'Chocolate cowl-neck halter', 'Ivory satin corset',
    'Silver chainmail top', 'Rose mesh long-sleeve top', 'Cherry velvet bustier',
    'Black sequin tube top', 'Plum satin scarf top', 'Denim lace-up vest',
    'Butter-yellow knit cami', 'Ivory eyelet peplum', 'Olive draped bodysuit',
    'Sheer polka-dot blouse', 'Blush bow-front cardigan', 'White asymmetric tank',
    'Navy lace babydoll top'
  ],
  [
    'Gold evil-eye fish charm', 'Chunky mixed-metal hoops', 'Cherry charm necklace',
    'Pearl bow earrings', 'Black east-west bag', 'Chocolate suede shoulder bag',
    'Silver mesh clutch', 'Burgundy woven mini bag', 'Tortoiseshell oval sunglasses',
    'Gold dome ring', 'Silver heart locket', 'Pearl phone charm',
    'Leopard print shoulder bag', 'Black skinny studded belt', 'Sculptural silver cuff',
    'Amber beaded necklace', 'Satin rose hair clip', 'Black lace headband',
    'Cherry red claw clip', 'Cream quilted makeup bag', 'Gold starfish earrings',
    'Blue beaded bag'
  ],
  [
    'Pink striped wall sconce', 'Cherry red checkered throw', 'Scalloped cream wall mirror',
    'Pink glass bud vase', 'Mushroom table lamp', 'Leopard print throw pillow',
    'Ruffle-edged cushion', 'Blue gingham duvet', 'Pink acrylic jewelry tray',
    'Red bow taper holders', 'Pink flower bath rug', 'Cream boucle storage ottoman',
    'Cherry ceramic mug', 'Pink glass coupe set', 'Shell bedside dish',
    'Striped pink desk organizer', 'Navy French-tip nails', 'Glazed pearl press-on nails',
    'Burgundy jelly nail polish', 'Rose cream blush compact', 'Shimmer body oil bottle',
    'Pink satin heatless curler'
  ],
  [
    'Black lace slip dress', 'Cherry satin bias skirt', 'Chocolate wide-leg trousers',
    'Cream pinstripe blazer', 'Light wash wide-leg jeans', 'Navy pleated mini skirt',
    'Pink floral mesh dress', 'Olive cargo midi skirt', 'Black ruched mini dress',
    'Red gingham mini dress', 'Cream crochet matching set', 'Chocolate ribbed matching set',
    'Espresso suede ankle boots', 'Black studded ballet flats', 'Silver mesh flats',
    'Burgundy kitten heels', 'Cream retro sneakers', 'Black platform Mary Janes',
    'Chocolate suede loafers', 'Pink satin ballet flats', 'Black knee-high boots',
    'Gold strappy sandals'
  ]
];

const retailers = {
  'ASOS': 'https://www.asos.com/us/search/?q=',
  'Nordstrom': 'https://www.nordstrom.com/sr?keyword=',
  'Target': 'https://www.target.com/s?searchTerm=',
  'Ulta Beauty': 'https://www.ulta.com/search?search='
};

for (let position = 0; position < additionalFinds[0].length; position++) {
  additionalFinds.forEach((group, index) => {
    const title = group[position];
    const id = String([13, 35, 57, 79][index] + position);
    const category = [
      position === 6 ? 'Outfits' : 'Going-out tops',
      'Accessories',
      position < 16 ? 'Room finds' : 'Beauty & nails',
      position < 12 ? 'Outfits' : 'Shoes'
    ][index];
    const store = [
      position % 3 === 0 ? 'Nordstrom' : 'ASOS',
      position % 3 === 0 ? 'Target' : 'Nordstrom',
      position < 16 ? 'Target' : 'Ulta Beauty',
      position < 12 ? 'ASOS' : 'Nordstrom'
    ][index];
    catalog.push({
      id, title, category, store, source: 'Pinterest edit',
      url: retailers[store] + encodeURIComponent(title),
      image: position < (index === 0 ? 8 : index < 3 ? 4 : 0) ? 'assets/' + id + '.webp' : undefined
    });
  });
}
