document.addEventListener("DOMContentLoaded", function () {
  const toggler = document.querySelector('.navbar-toggler');
  const togglerIcon = toggler?.querySelector('.navbar-toggler-icon');
  const collapseMenu = document.getElementById('navbarNav');

  if (!toggler || !collapseMenu || !togglerIcon) return;

  // Toggle icon to X when navbar is shown
  collapseMenu.addEventListener('show.bs.collapse', function () {
    togglerIcon.classList.add('open');
  });

  // Revert icon when navbar is hidden
  collapseMenu.addEventListener('hide.bs.collapse', function () {
    togglerIcon.classList.remove('open');
  });

  // Click outside to close navbar
  document.addEventListener('click', function (e) {
    const isClickInside = collapseMenu.contains(e.target) || toggler.contains(e.target);
    const isShown = collapseMenu.classList.contains('show');
    if (!isClickInside && isShown) {
      const collapseInstance = bootstrap.Collapse.getInstance(collapseMenu);
      if (collapseInstance) {
        collapseInstance.hide();
      }
    }
  });
});