const root = document.documentElement;
const themeToggle = document.querySelector('[data-theme-toggle]');
const savedTheme = localStorage.getItem('evelyn-site-theme');
if (savedTheme) root.dataset.theme = savedTheme;

themeToggle?.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  localStorage.setItem('evelyn-site-theme', next);
});

const replaceChildren = (element, children) => {
  if (!element) return;
  element.replaceChildren(...children);
};

const renderManagedLists = (content) => {
  const focusMetrics = document.querySelector('[data-content-list="focus_metrics"]');
  if (focusMetrics && Array.isArray(content.focus_metrics)) {
    replaceChildren(focusMetrics, content.focus_metrics.map((item) => {
      const wrapper = document.createElement('div');
      const value = document.createElement('strong');
      const label = document.createElement('span');
      value.textContent = item.value;
      label.textContent = item.label;
      wrapper.append(value, label);
      return wrapper;
    }));
  }

  const tags = document.querySelector('[data-content-list="project_tags"]');
  if (tags && Array.isArray(content.project_tags)) {
    replaceChildren(tags, content.project_tags.map((item) => {
      const tag = document.createElement('span');
      tag.className = 'tag';
      tag.textContent = item;
      return tag;
    }));
  }

  const projectBullets = document.querySelector('[data-content-list="project_bullets"]');
  if (projectBullets && Array.isArray(content.project_bullets)) {
    replaceChildren(projectBullets, content.project_bullets.map((item) => {
      const bullet = document.createElement('li');
      const lead = document.createElement('strong');
      lead.textContent = item.lead;
      bullet.append(lead, document.createTextNode(` ${item.detail}`));
      return bullet;
    }));
  }

  const toolbox = document.querySelector('[data-content-list="toolbox_items"]');
  if (toolbox && Array.isArray(content.toolbox_items)) {
    replaceChildren(toolbox, content.toolbox_items.map((item) => {
      const group = document.createElement('div');
      group.className = 'tool-group';
      const title = document.createElement('h3');
      const description = document.createElement('p');
      title.textContent = item.title;
      description.textContent = item.description;
      group.append(title, description);
      return group;
    }));
  }

  const summaryMetrics = document.querySelector('[data-content-list="summary_metrics"]');
  if (summaryMetrics && Array.isArray(content.summary_metrics)) {
    replaceChildren(summaryMetrics, content.summary_metrics.map((item) => {
      const metric = document.createElement('div');
      metric.className = ['metric', item.tone].filter(Boolean).join(' ');
      const value = document.createElement('span');
      const label = document.createElement('span');
      value.className = 'metric-value';
      label.className = 'metric-label';
      value.textContent = item.value;
      label.textContent = item.label;
      metric.append(value, label);
      return metric;
    }));
  }

  const summaryBullets = document.querySelector('[data-content-list="summary_bullets"]');
  if (summaryBullets && Array.isArray(content.summary_bullets)) {
    replaceChildren(summaryBullets, content.summary_bullets.map((item) => {
      const bullet = document.createElement('li');
      bullet.textContent = item;
      return bullet;
    }));
  }
};

const renderManagedFigures = (content) => {
  if (!Array.isArray(content.figures)) return;
  document.querySelectorAll('[data-content-figure]').forEach((section) => {
    const figure = content.figures[Number(section.dataset.contentFigure)];
    if (!figure) return;
    const image = section.querySelector('img');
    const button = section.querySelector('[data-lightbox]');
    section.querySelector('.section-kicker').textContent = figure.kicker;
    section.querySelector('h2').textContent = figure.title;
    section.querySelector('figcaption').textContent = figure.caption;
    if (image) {
      image.src = figure.image;
      image.alt = figure.alt;
    }
    if (button) {
      button.dataset.lightbox = figure.image;
      button.setAttribute('aria-label', `Enlarge ${figure.alt}`);
    }
  });
};

const loadManagedContent = async () => {
  const source = document.body.dataset.contentSource;
  if (!source) return;
  try {
    const response = await fetch(source, { cache: 'no-cache' });
    if (!response.ok) throw new Error(`Content request failed: ${response.status}`);
    const content = await response.json();
    if (content.page_title) document.title = content.page_title;
    const description = document.querySelector('meta[name="description"]');
    if (description && content.meta_description) description.content = content.meta_description;
    document.querySelectorAll('[data-content-text]').forEach((element) => {
      const value = content[element.dataset.contentText];
      if (typeof value === 'string') element.textContent = value;
    });
    document.querySelectorAll('[data-content-image]').forEach((image) => {
      const sourceValue = content[image.dataset.contentImage];
      const altValue = content[image.dataset.contentAlt];
      if (typeof sourceValue === 'string') image.src = sourceValue;
      if (typeof altValue === 'string') image.alt = altValue;
    });
    renderManagedLists(content);
    renderManagedFigures(content);
  } catch (error) {
    console.warn('Using the page’s built-in content because managed content could not be loaded.', error);
  }
};

loadManagedContent();

const dialog = document.getElementById('lightbox');
const dialogImage = document.getElementById('lightboxImage');
document.querySelectorAll('[data-lightbox]').forEach((button) => {
  button.addEventListener('click', () => {
    if (!dialog || !dialogImage) return;
    dialogImage.src = button.dataset.lightbox;
    dialogImage.alt = button.querySelector('img')?.alt || '';
    dialog.showModal();
  });
});

dialog?.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

const sections = [...document.querySelectorAll('.article-section[id]')];
const tocLinks = [...document.querySelectorAll('.toc a')];
if (sections.length && tocLinks.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      tocLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: '-20% 0px -68% 0px' });
  sections.forEach((section) => observer.observe(section));
}
