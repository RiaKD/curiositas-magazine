document.addEventListener('DOMContentLoaded', function() {
  const tagButtons = document.querySelectorAll('.game-tag-btn[data-tag]');
  const articleTiles = document.querySelectorAll('.game-article-tile');
  let activeTags = new Set();

  function updateArticles() {
    articleTiles.forEach(tile => {
      const tags = tile.getAttribute('data-tags').split(',');
      // Show if all active tags are present in this article's tags
      const show = [...activeTags].every(tag => tags.includes(tag));
      tile.style.display = (activeTags.size === 0 || show) ? '' : 'none';
    });
  }

  tagButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const tag = btn.getAttribute('data-tag');
      if (tag === 'all') {
        activeTags.clear();
        tagButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      } else {
        document.querySelector('.game-tag-btn[data-tag="all"]').classList.remove('active');
        btn.classList.toggle('active');
        if (btn.classList.contains('active')) {
          activeTags.add(tag);
        } else {
          activeTags.delete(tag);
        }
        // If no tags are active, activate "All"
        if (activeTags.size === 0) {
          document.querySelector('.game-tag-btn[data-tag="all"]').classList.add('active');
        }
      }
      updateArticles();
    });
  });
}); 