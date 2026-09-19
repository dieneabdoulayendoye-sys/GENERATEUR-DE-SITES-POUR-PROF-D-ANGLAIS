const products = [
  {
    title: 'Site vitrine pour entreprise',
    category: 'Site vitrine',
    tag: 'Modèle prêt',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80',
    description: 'Accueil, services, témoignages et contact prêts à recevoir votre contenu. Plusieurs pages vierges à personnaliser.'
  },
  {
    title: 'Site de formation / école',
    category: 'Académique',
    tag: 'À personnaliser',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
    description: 'Pages d’accueil, des cours, à propos et inscription laissées vides pour transférer vos informations.'
  },
  {
    title: 'Portfolio créatif',
    category: 'Portfolio',
    tag: 'Disponible',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80',
    description: 'Structure moderne avec galerie, bio, réalisations et contact. Vous ajoutez votre contenu ensuite.'
  },
  {
    title: 'Boutique de produits',
    category: 'Boutique',
    tag: 'Élégant',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80',
    description: 'Pages de produits, panier, catégories et FAQ vides afin de remplacer les contenus par les vôtres.'
  },
  {
    title: 'Blog / média',
    category: 'Blog',
    tag: 'Flexible',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80',
    description: 'Une mise en page moderne pour articles, services et contact avec espaces vierges à remplir.'
  },
  {
    title: 'Site institutionnel',
    category: 'Site vitrine',
    tag: 'Premium',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80',
    description: 'Pages d’accueil, mission, équipe et contact prêtes à recevoir votre identité et vos informations.'
  }
];

const productGrid = document.getElementById('productGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('searchInput');
const noResults = document.getElementById('noResults');

let activeFilter = 'Tous';

function renderProducts() {
  if (!productGrid || !searchInput || !noResults) {
    return;
  }

  const searchTerm = searchInput.value.trim().toLowerCase();

  const filteredProducts = products.filter((product) => {
    const matchesFilter = activeFilter === 'Tous' || product.category === activeFilter;
    const matchesSearch =
      searchTerm === '' ||
      product.title.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm);

    return matchesFilter && matchesSearch;
  });

  if (!filteredProducts.length) {
    productGrid.innerHTML = '';
    noResults.classList.remove('hidden');
    return;
  }

  noResults.classList.add('hidden');

  productGrid.innerHTML = filteredProducts
    .map(
      (product) => `
        <article class="product-card">
          <img src="${product.image}" alt="${product.title}" />
          <div class="product-body">
            <div class="card-meta">
              <span class="tag">${product.tag}</span>
              <span class="card-status">Modèle premium</span>
            </div>
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <div class="card-footer">
              <span class="card-action">${product.category}</span>
              <a class="btn btn-primary" href="https://wa.me/221776742507" target="_blank" rel="noreferrer">Demander</a>
            </div>
          </div>
        </article>
      `
    )
    .join('');
}

if (filterButtons.length) {
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      activeFilter = button.dataset.filter;
      renderProducts();
    });
  });
}

if (searchInput) {
  searchInput.addEventListener('input', renderProducts);
}

if (productGrid) {
  renderProducts();
}
