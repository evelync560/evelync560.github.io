const root = document.documentElement;
const themeToggle = document.querySelector('[data-theme-toggle]');
const savedTheme = localStorage.getItem('evelyn-site-theme');
if (savedTheme) root.dataset.theme = savedTheme;

themeToggle?.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  localStorage.setItem('evelyn-site-theme', next);
});

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
