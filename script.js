// ===== NAVBAR: scroll highlight + active section =====
const navbar = document.querySelector('.navbar');
const menuLinks = document.querySelectorAll('.menu-link');
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('navbar--scrolled', window.scrollY > 20);
});

// Hamburguer
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('aberto');
  menu.classList.toggle('aberto');
});

// Fecha o menu ao clicar num link
menuLinks.forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('aberto');
    menu.classList.remove('aberto');
  });
});

const sections = document.querySelectorAll('section[id]');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        menuLinks.forEach((link) => {
          link.classList.toggle('menu-link--ativo', link.dataset.id === entry.target.id);
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach((s) => observer.observe(s));

// ===== SCROLL SUAVE =====
function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

// ===== FILTRO DE PROJETOS =====
const projetos = [
  {
    id: 1,
    titulo: 'Portfolio Pessoal',
    descricao: 'Site de portfólio desenvolvido com React e Vite, com design moderno em tons de azul.',
    tags: ['React', 'CSS', 'Vite'],
    categoria: 'Frontend',
    github: 'https://github.com/waynna-sm',
    demo: '#',
    destaque: true,
  },
  {
    id: 2,
    titulo: 'Projeto CRUD',
    descricao: 'Aplicação de gerenciamento com CRUD completo, filtros e persistência.',
    tags: ['PHP', 'HTML', 'CSS'],
    categoria: 'Frontend',
    github: 'https://github.com/waynna-sm',
    demo: '#',
    destaque: false,
  },
  {
    id: 3,
    titulo: 'API REST',
    descricao: 'API RESTful construída com Node.js e Express, com autenticação JWT.',
    tags: ['Node.js', 'Express', 'JWT'],
    categoria: 'Backend',
    github: 'https://github.com/waynna-sm',
    demo: null,
    destaque: false,
  },
  {
    id: 4,
    titulo: 'Dashboard Analytics',
    descricao: 'Dashboard interativo com gráficos e visualização de dados, consumindo API externa.',
    tags: ['React', 'Charts', 'API'],
    categoria: 'Frontend',
    github: 'https://github.com/waynna-sm',
    demo: '#',
    destaque: false,
  },
  {
    id: 5,
    titulo: 'Sistema de Login',
    descricao: 'Sistema completo de autenticação com cadastro, login e proteção de rotas.',
    tags: ['React', 'Node.js', 'SQL'],
    categoria: 'Fullstack',
    github: 'https://github.com/waynna-sm',
    demo: '#',
    destaque: false,
  },
  {
    id: 6,
    titulo: 'Landing Page',
    descricao: 'Página de conversão responsiva com animações CSS e formulário de captura.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    categoria: 'Frontend',
    github: 'https://github.com/waynna-sm',
    demo: '#',
    destaque: false,
  },
];

const GITHUB_SVG = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>`;
const DEMO_SVG = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;

function renderProjetos(filtro) {
  const grid = document.getElementById('projetos-grid');
  const lista = filtro === 'Todos' ? projetos : projetos.filter((p) => p.categoria === filtro);

  grid.innerHTML = lista
    .map(
      (p) => `
    <div class="card projeto-card ${p.destaque ? 'destaque' : ''}">
      <div class="projeto-top">
        <div class="projeto-icone">📁</div>
        <div class="projeto-links">
          <a href="${p.github}" target="_blank" rel="noreferrer" title="GitHub">${GITHUB_SVG}</a>
          ${p.demo ? `<a href="${p.demo}" target="_blank" rel="noreferrer" title="Ver demo">${DEMO_SVG}</a>` : ''}
        </div>
      </div>
      ${p.destaque ? '<span class="destaque-badge">⭐ Destaque</span>' : ''}
      <h3 class="projeto-titulo">${p.titulo}</h3>
      <p class="projeto-desc">${p.descricao}</p>
      <div class="projeto-tags">
        ${p.tags.map((t) => `<span class="projeto-tag">${t}</span>`).join('')}
      </div>
    </div>
  `
    )
    .join('');
}

// Inicializa projetos
renderProjetos('Todos');

// Filtros
document.querySelectorAll('.filtro-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filtro-btn').forEach((b) => b.classList.remove('ativo'));
    btn.classList.add('ativo');
    renderProjetos(btn.dataset.filtro);
  });
});

// ===== ANO DO FOOTER =====
document.getElementById('footer-ano').textContent = new Date().getFullYear();
