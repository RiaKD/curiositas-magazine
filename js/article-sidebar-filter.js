document.addEventListener('DOMContentLoaded', function() {
  const tagButtons = document.querySelectorAll('.article-tiles-sidebar .game-tag-btn');
  const articleTiles = document.querySelectorAll('.article-tiles-sidebar .game-article-tile');

  tagButtons.forEach(button => {
    button.addEventListener('click', function() {
      const selectedTag = this.getAttribute('data-tag');
      
      // Update active button
      tagButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Filter articles
      articleTiles.forEach(tile => {
        const tileTags = tile.getAttribute('data-tags');
        
        if (selectedTag === 'all' || tileTags.includes(selectedTag)) {
          tile.style.display = 'flex';
        } else {
          tile.style.display = 'none';
        }
      });
    });
  });
}); 