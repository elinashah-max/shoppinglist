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

