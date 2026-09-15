// Mobile Submission Dropdowns Functionality
console.log('=== MOBILE SUBMISSION DROPDOWNS SCRIPT LOADED ===');

document.addEventListener('DOMContentLoaded', function() {
  console.log('=== DOM LOADED - INITIALIZING DROPDOWNS ===');
  
  const mobileDropdowns = document.querySelectorAll('.mobile-submission-dropdown');
  console.log('Found mobile dropdowns:', mobileDropdowns.length);
  
  if (mobileDropdowns.length === 0) {
    console.error('❌ No mobile submission dropdowns found!');
    console.log('Available elements with "dropdown" in class:', document.querySelectorAll('[class*="dropdown"]'));
    return;
  }
  
  mobileDropdowns.forEach((dropdown, index) => {
    console.log(`=== SETTING UP DROPDOWN ${index + 1} ===`);
    console.log('Dropdown element:', dropdown);
    
    const btn = dropdown.querySelector('.dropdown-btn');
    const content = dropdown.querySelector('.dropdown-content');
    const arrow = dropdown.querySelector('.dropdown-arrow');
    
    console.log(`Dropdown ${index + 1} elements:`, { 
      btn: !!btn, 
      content: !!content, 
      arrow: !!arrow,
      btnElement: btn,
      contentElement: content,
      arrowElement: arrow
    });
    
    if (btn && content) {
      console.log(`✅ Adding click listener to dropdown ${index + 1}`);
      
      // Test if button is clickable
      btn.style.cursor = 'pointer';
      
      btn.addEventListener('click', function(e) {
        console.log(`🎯 DROPDOWN ${index + 1} CLICKED!`);
        e.preventDefault();
        e.stopPropagation();
        
        const isActive = dropdown.classList.contains('active');
        console.log(`Dropdown ${index + 1} active state:`, isActive);
        
        // Close all other dropdowns
        mobileDropdowns.forEach((other, otherIndex) => {
          if (other !== dropdown) {
            console.log(`🔒 Closing dropdown ${otherIndex + 1}`);
            other.classList.remove('active');
            const otherArrow = other.querySelector('.dropdown-arrow');
            if (otherArrow) {
              otherArrow.style.transform = 'rotate(0deg)';
            }
          }
        });
        
        // Toggle current dropdown
        if (!isActive) {
          console.log(`🔓 Opening dropdown ${index + 1}`);
          dropdown.classList.add('active');
          if (arrow) {
            arrow.style.transform = 'rotate(180deg)';
          }
        } else {
          console.log(`🔒 Closing dropdown ${index + 1}`);
          dropdown.classList.remove('active');
          if (arrow) {
            arrow.style.transform = 'rotate(0deg)';
          }
        }
      });
      
      console.log(`✅ Click listener added to dropdown ${index + 1}`);
    } else {
      console.error(`❌ Dropdown ${index + 1} missing elements:`, { btn: !!btn, content: !!content });
    }
  });
  
  console.log('=== DROPDOWN INITIALIZATION COMPLETE ===');
});

// Fallback: if DOMContentLoaded already fired, run immediately
if (document.readyState === 'loading') {
  console.log('⏳ DOM still loading, waiting for DOMContentLoaded');
} else {
  console.log('⚡ DOM already loaded, running immediately');
  // Trigger the initialization manually
  const event = new Event('DOMContentLoaded');
  document.dispatchEvent(event);
}
