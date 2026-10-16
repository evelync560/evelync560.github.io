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

  const projects = document.querySelector('[data-content-list="projects"]');
  if (projects && Array.isArray(content.projects)) {
    replaceChildren(projects, content.projects.map((item) => {
      const article = document.createElement('article');
      article.className = 'project-card';

      const visual = document.createElement('div');
      visual.className = 'project-visual';
      const image = document.createElement('img');
      image.src = item.image;
      image.alt = item.alt;
      visual.append(image);

      const projectContent = document.createElement('div');
      projectContent.className = 'project-content';
      const tags = document.createElement('div');
      tags.className = 'tags';
      tags.setAttribute('aria-label', 'Research topics');
      (item.tags || []).forEach((label) => {
        const tag = document.createElement('span');
        tag.className = 'tag';
        tag.textContent = label;
        tags.append(tag);
      });
      const title = document.createElement('h3');
      title.textContent = item.title;
      const summary = document.createElement('p');
      summary.className = 'project-summary';
      summary.textContent = item.summary;
      const metrics = document.createElement('div');
      metrics.className = 'project-metrics';
      metrics.setAttribute('aria-label', 'Headline results');
      (item.metrics || []).forEach((metricItem) => {
        const metric = document.createElement('div');
        const value = document.createElement('strong');
        const label = document.createElement('span');
        value.textContent = metricItem.value;
        label.textContent = metricItem.label;
        metric.append(value, label);
        metrics.append(metric);
      });
      const link = document.createElement('a');
      link.className = 'project-link';
      link.href = item.link;
      link.textContent = 'View research';

      projectContent.append(tags, title, summary, metrics, link);
      article.append(visual, projectContent);
      return article;
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

  const dataRows = document.querySelector('[data-content-list="data_rows"]');
  if (dataRows && Array.isArray(content.data_rows)) {
    replaceChildren(dataRows, content.data_rows.map((item) => {
      const row = document.createElement('tr');
      [item.block, item.frequency, item.content, item.source].forEach((value) => {
        const cell = document.createElement('td');
        cell.textContent = value;
        row.append(cell);
      });
      return row;
    }));
  }

  const scoringRows = document.querySelector('[data-content-list="scoring_rows"]');
  if (scoringRows && Array.isArray(content.scoring_rows)) {
    replaceChildren(scoringRows, content.scoring_rows.map((item) => {
      const row = document.createElement('tr');
      [item.factor, item.points, item.rule].forEach((value) => {
        const cell = document.createElement('td');
        cell.textContent = value;
        row.append(cell);
      });
      return row;
    }));
  }

  const strategyRows = document.querySelector('[data-content-list="strategy_rows"]');
  if (strategyRows && Array.isArray(content.strategy_rows)) {
    replaceChildren(strategyRows, content.strategy_rows.map((item) => {
      const row = document.createElement('tr');
      const zoneCell = document.createElement('td');
      const zone = document.createElement('span');
      zone.className = `zone zone-${item.tone || 'mid'}`;
      zone.textContent = item.zone;
      zoneCell.append(zone);
      const rule = document.createElement('td');
      const rationale = document.createElement('td');
      rule.textContent = item.rule;
      rationale.textContent = item.rationale;
      row.append(zoneCell, rule, rationale);
      return row;
    }));
  }

  const resultRows = document.querySelector('[data-content-list="result_rows"]');
  if (resultRows && Array.isArray(content.result_rows)) {
    replaceChildren(resultRows, content.result_rows.map((item) => {
      const row = document.createElement('tr');
      [item.approach, item.return, item.drawdown, item.sharpe, item.calmar].forEach((value) => {
        const cell = document.createElement('td');
        cell.textContent = value;
        row.append(cell);
      });
      return row;
    }));
  }

  const fundingDecayRows = document.querySelector('[data-content-list="funding_decay_rows"]');
  if (fundingDecayRows && Array.isArray(content.funding_decay_rows)) {
    replaceChildren(fundingDecayRows, content.funding_decay_rows.map((item) => {
      const row = document.createElement('div');
      const time = document.createElement('time');
      const rate = document.createElement('strong');
      const bar = document.createElement('span');
      time.textContent = item.time;
      rate.textContent = item.rate;
      bar.style.setProperty('--decay', item.width);
      row.append(time, rate, bar);
      return row;
    }));
  }

  const strategySteps = document.querySelector('[data-content-list="strategy_steps"]');
  if (strategySteps && Array.isArray(content.strategy_steps)) {
    replaceChildren(strategySteps, content.strategy_steps.map((item) => {
      const step = document.createElement('div');
      const label = document.createElement('strong');
      const detail = document.createElement('p');
      label.textContent = item.label;
      detail.textContent = item.detail;
      step.append(label, detail);
      return step;
    }));
  }

  const interdayRows = document.querySelector('[data-content-list="interday_rows"]');
  if (interdayRows && Array.isArray(content.interday_rows)) {
    replaceChildren(interdayRows, content.interday_rows.map((item) => {
      const row = document.createElement('tr');
      [item.sample, item.trades, item.win_rate, item.basis, item.funding, item.cost, item.net].forEach((value) => {
        const cell = document.createElement('td');
        cell.textContent = value;
        row.append(cell);
      });
      return row;
    }));
  }

  const continuationRows = document.querySelector('[data-content-list="continuation_rows"]');
  if (continuationRows && Array.isArray(content.continuation_rows)) {
    replaceChildren(continuationRows, content.continuation_rows.map((item) => {
      const row = document.createElement('tr');
      [item.approach, item.result, item.meaning].forEach((value) => {
        const cell = document.createElement('td');
        cell.textContent = value;
        row.append(cell);
      });
      return row;
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
    const kicker = section.querySelector('[data-figure-kicker]');
    const title = section.querySelector('[data-figure-title]');
    const insight = section.querySelector('[data-figure-insight]');
    const caption = section.querySelector('figcaption');
    if (kicker) kicker.textContent = figure.kicker;
    if (title) title.textContent = figure.title;
    if (insight) insight.textContent = figure.insight;
    if (caption) caption.textContent = figure.caption;
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

const initCxmtInteractiveChart = async () => {
  const chart = document.querySelector('[data-cxmt-chart]');
  if (!chart) return;
  const canvas = chart.querySelector('canvas');
  const stage = chart.querySelector('.interactive-chart-stage');
  const tooltip = chart.querySelector('.chart-tooltip');
  const buttons = [...chart.querySelectorAll('[data-chart-range]')];
  if (!canvas || !stage || !tooltip) return;

  try {
    const response = await fetch(chart.dataset.source, { cache: 'no-cache' });
    if (!response.ok) throw new Error(`Chart data request failed: ${response.status}`);
    const payload = await response.json();
    const allRows = payload.rows.map(([time, ashare, hyperliquid, basis]) => ({
      time,
      date: time.slice(0, 10),
      ashare,
      hyperliquid,
      basis,
    }));
    const cutoff = payload.meta.research_cutoff;
    const state = { range: 'full', rows: allRows, hover: -1, plot: null };

    const css = (name, fallback) => getComputedStyle(document.body).getPropertyValue(name).trim() || fallback;
    const compactDate = (value) => {
      const [, month, day] = value.split('-');
      return `${month}/${day}`;
    };
    const visibleRows = () => {
      if (state.range === 'research') return allRows.filter((row) => row.time <= cutoff);
      if (state.range === 'oos') return allRows.filter((row) => row.time > cutoff);
      return allRows;
    };

    const draw = () => {
      state.rows = visibleRows();
      const width = Math.max(320, stage.clientWidth);
      const height = Math.max(360, stage.clientHeight);
      const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      const context = canvas.getContext('2d');
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, width, height);

      const colors = {
        ink: css('--ink', '#20232a'),
        muted: css('--muted', '#69707c'),
        line: css('--line', '#e4e6ea'),
        bg: css('--bg', '#ffffff'),
        accent: css('--accent', '#315cc7'),
        ashare: '#315cc7',
        hyperliquid: '#e88925',
        basis: '#16847a',
      };
      const plot = {
        left: width < 520 ? 44 : 52,
        right: width - 12,
        priceTop: 18,
        priceBottom: Math.round(height * .57),
        basisTop: Math.round(height * .68),
        basisBottom: height - 34,
      };
      plot.width = plot.right - plot.left;
      state.plot = plot;
      const rows = state.rows;
      if (!rows.length) return;
      const xAt = (index) => plot.left + (rows.length === 1 ? 0 : index / (rows.length - 1)) * plot.width;

      const prices = rows.flatMap((row) => [row.ashare, row.hyperliquid]);
      let priceMin = Math.min(...prices);
      let priceMax = Math.max(...prices);
      const pricePad = Math.max(.5, (priceMax - priceMin) * .08);
      priceMin -= pricePad;
      priceMax += pricePad;
      let basisMin = Math.min(0, ...rows.map((row) => row.basis));
      let basisMax = Math.max(0, ...rows.map((row) => row.basis));
      const basisPad = Math.max(.3, (basisMax - basisMin) * .08);
      basisMin -= basisPad;
      basisMax += basisPad;
      const yPrice = (value) => plot.priceBottom - ((value - priceMin) / (priceMax - priceMin)) * (plot.priceBottom - plot.priceTop);
      const yBasis = (value) => plot.basisBottom - ((value - basisMin) / (basisMax - basisMin)) * (plot.basisBottom - plot.basisTop);

      context.font = '10px Inter, ui-sans-serif, sans-serif';
      context.textBaseline = 'middle';
      context.lineWidth = 1;
      const gridPanel = (top, bottom, min, max, formatter) => {
        for (let step = 0; step <= 4; step += 1) {
          const y = top + ((bottom - top) * step) / 4;
          const value = max - ((max - min) * step) / 4;
          context.strokeStyle = colors.line;
          context.beginPath();
          context.moveTo(plot.left, y);
          context.lineTo(plot.right, y);
          context.stroke();
          context.fillStyle = colors.muted;
          context.textAlign = 'right';
          context.fillText(formatter(value), plot.left - 7, y);
        }
      };
      gridPanel(plot.priceTop, plot.priceBottom, priceMin, priceMax, (value) => value.toFixed(1));
      gridPanel(plot.basisTop, plot.basisBottom, basisMin, basisMax, (value) => `${value.toFixed(1)}%`);

      context.save();
      context.fillStyle = colors.muted;
      context.font = '600 10px Inter, ui-sans-serif, sans-serif';
      context.textAlign = 'left';
      context.fillText('PRICE (CNY)', plot.left, 7);
      context.fillText('BASIS (%)', plot.left, plot.basisTop - 12);
      context.restore();

      const drawSeries = (key, yScale, color) => {
        context.strokeStyle = color;
        context.lineWidth = 1.45;
        context.lineJoin = 'round';
        context.lineCap = 'round';
        context.beginPath();
        rows.forEach((row, index) => {
          const x = xAt(index);
          const y = yScale(row[key]);
          if (index === 0 || row.date !== rows[index - 1].date) context.moveTo(x, y);
          else context.lineTo(x, y);
        });
        context.stroke();
      };
      drawSeries('ashare', yPrice, colors.ashare);
      drawSeries('hyperliquid', yPrice, colors.hyperliquid);
      drawSeries('basis', yBasis, colors.basis);

      const zeroY = yBasis(0);
      context.save();
      context.strokeStyle = colors.muted;
      context.setLineDash([4, 4]);
      context.beginPath();
      context.moveTo(plot.left, zeroY);
      context.lineTo(plot.right, zeroY);
      context.stroke();
      context.restore();

      const cutoffIndex = rows.findIndex((row) => row.time >= cutoff);
      if (cutoffIndex >= 0 && cutoffIndex < rows.length && state.range !== 'oos') {
        const cutoffX = xAt(cutoffIndex);
        context.save();
        context.strokeStyle = colors.accent;
        context.setLineDash([5, 4]);
        context.beginPath();
        context.moveTo(cutoffX, plot.priceTop);
        context.lineTo(cutoffX, plot.basisBottom);
        context.stroke();
        context.fillStyle = colors.accent;
        context.font = '600 9px Inter, ui-sans-serif, sans-serif';
        context.textAlign = cutoffX > width * .78 ? 'right' : 'left';
        context.fillText('RESEARCH CUTOFF', cutoffX + (cutoffX > width * .78 ? -5 : 5), plot.priceTop + 8);
        context.restore();
      }

      const tickCount = width < 520 ? 4 : 6;
      context.fillStyle = colors.muted;
      context.font = '10px Inter, ui-sans-serif, sans-serif';
      context.textAlign = 'center';
      for (let tick = 0; tick < tickCount; tick += 1) {
        const index = Math.round((rows.length - 1) * tick / (tickCount - 1));
        context.fillText(compactDate(rows[index].date), xAt(index), height - 14);
      }

      if (state.hover >= 0 && state.hover < rows.length) {
        const x = xAt(state.hover);
        context.save();
        context.strokeStyle = colors.muted;
        context.setLineDash([3, 3]);
        context.beginPath();
        context.moveTo(x, plot.priceTop);
        context.lineTo(x, plot.basisBottom);
        context.stroke();
        [['ashare', yPrice, colors.ashare], ['hyperliquid', yPrice, colors.hyperliquid], ['basis', yBasis, colors.basis]].forEach(([key, scale, color]) => {
          context.fillStyle = color;
          context.beginPath();
          context.arc(x, scale(rows[state.hover][key]), 3, 0, Math.PI * 2);
          context.fill();
        });
        context.restore();
      }
    };

    const showTooltip = (event) => {
      const plot = state.plot;
      if (!plot || !state.rows.length) return;
      const bounds = canvas.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      if (x < plot.left || x > plot.right || y < plot.priceTop || y > plot.basisBottom) {
        state.hover = -1;
        tooltip.hidden = true;
        draw();
        return;
      }
      state.hover = Math.max(0, Math.min(state.rows.length - 1, Math.round(((x - plot.left) / plot.width) * (state.rows.length - 1))));
      const row = state.rows[state.hover];
      tooltip.innerHTML = `<strong>${row.time} Beijing</strong><span>A-share <b>¥${row.ashare.toFixed(2)}</b></span><span>Hyperliquid <b>¥${row.hyperliquid.toFixed(2)}</b></span><span>Basis <b>${row.basis >= 0 ? '+' : ''}${row.basis.toFixed(2)}%</b></span>`;
      tooltip.hidden = false;
      const left = Math.min(stage.clientWidth - 176, Math.max(4, x + 13));
      const top = Math.min(stage.clientHeight - 100, Math.max(4, y - 42));
      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${top}px`;
      draw();
    };
    canvas.addEventListener('pointermove', showTooltip);
    canvas.addEventListener('pointerleave', () => {
      state.hover = -1;
      tooltip.hidden = true;
      draw();
    });
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        state.range = button.dataset.chartRange;
        state.hover = -1;
        tooltip.hidden = true;
        buttons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
        draw();
      });
    });
    new ResizeObserver(draw).observe(stage);
    new MutationObserver(draw).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    draw();
  } catch (error) {
    console.warn('The CXMT interactive chart could not be loaded.', error);
    stage.replaceChildren(Object.assign(document.createElement('p'), {
      className: 'muted',
      textContent: 'Interactive data temporarily unavailable.',
    }));
  }
};

initCxmtInteractiveChart();
