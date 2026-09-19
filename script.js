const products = [
  {
    title: 'Plan de cours – Present Simple',
    category: 'Cours',
    tag: 'Prêt à utiliser',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
    description: 'Séquence complète sur le présent simple avec objectifs, activités, correction et évaluation.'
  },
  {
    title: 'Leçon de grammaire – Articles',
    category: 'Grammaire',
    tag: 'Généré',
    image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=900&q=80',
    description: 'Explication claire, exemples, exercices et fiche de révision sur l’usage des articles.'
  },
  {
    title: 'Devoir d’anglais – Reading Comprehension',
    category: 'Devoirs',
    tag: 'Niveau A2',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80',
    description: 'Texte de compréhension, questions, réponses et fiche d’exploitation pédagogique.'
  },
  {
    title: 'Support visuel – Vocabulary Builder',
    category: 'Vocabulaire',
    tag: 'Classique',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80',
    description: 'Liste de mots, contextes, cartes visuelles et activités pour enrichir le vocabulaire.'
  },
  {
    title: 'Leçon orale – Speaking Practice',
    category: 'Oral',
    tag: 'Interactif',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80',
    description: 'Activités de conversation, consignes, fiches d’échange et mini quiz oral.'
  },
  {
    title: 'Évaluation – English Test Pack',
    category: 'Évaluation',
    tag: 'Premium',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80',
    description: 'Test de grammaire, compréhension, vocabulaire et rédaction prêt à imprimer.'
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
