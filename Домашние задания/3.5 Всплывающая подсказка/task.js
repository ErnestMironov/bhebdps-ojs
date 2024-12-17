document.addEventListener('DOMContentLoaded', () => {
  const TOOLTIP_CONFIG = {
    spacing: {
      gap: 5,
      viewportPadding: 5,
    },
    positions: {
      top: 'top',
      bottom: 'bottom',
      left: 'left',
      right: 'right'
    },
    defaultPosition: 'top'
  };

  const container = document.querySelector('body');
  const tooltip = document.querySelector('.tooltip');
  let currentTooltip = null;

  container.addEventListener('click', (event) => {
    const target = event.target.closest('.has-tooltip');

    if (!target) return;

    event.preventDefault();

    const tooltipText = target.getAttribute('title');
    const position = target.dataset.position || TOOLTIP_CONFIG.defaultPosition;

    if (currentTooltip === target) {
      tooltip.classList.toggle('tooltip_active');
      if (!tooltip.classList.contains('tooltip_active')) {
        currentTooltip = null;
      }
      return;
    }

    if (!tooltipText) return;

    tooltip.textContent = tooltipText;
    tooltip.classList.add('tooltip_active');
    currentTooltip = target;

    const targetRect = target.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();

    let left, top;

    switch (position) {
      case TOOLTIP_CONFIG.positions.bottom:
        left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
        top = targetRect.bottom + TOOLTIP_CONFIG.spacing.gap;
        break;
      case TOOLTIP_CONFIG.positions.left:
        left = targetRect.left - tooltipRect.width - TOOLTIP_CONFIG.spacing.gap;
        top = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
        break;
      case TOOLTIP_CONFIG.positions.right:
        left = targetRect.right + TOOLTIP_CONFIG.spacing.gap;
        top = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
        break;
      case TOOLTIP_CONFIG.positions.top:
      default:
        left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
        top = targetRect.top - tooltipRect.height - TOOLTIP_CONFIG.spacing.gap;
        break;
    }

    const { viewportPadding } = TOOLTIP_CONFIG.spacing;

    left = Math.max(viewportPadding, Math.min(left, window.innerWidth - tooltipRect.width - viewportPadding));
    top = Math.max(viewportPadding, Math.min(top, window.innerHeight - tooltipRect.height - viewportPadding));

    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.has-tooltip') && !event.target.closest('.tooltip')) {
      tooltip.classList.remove('tooltip_active');
      currentTooltip = null;
    }
  });
});
