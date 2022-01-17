
(function() {

  let deltaScroll = 0;
  let previousScrollY = 0;

   
  function getTranslation(element, attribute = 'translateX') {
    var style = window.getComputedStyle(element);
    var matrix = new WebKitCSSMatrix(style.transform);
    if(attribute == 'translateX') 
      return matrix.m41;
    if(attribute == 'translateY') 
      return matrix.m42;
    if(attribute == 'scale') 
      return matrix.d;
  }

  // Collect cards
  const cards = [
    {id: 'box1', element: document.getElementById('box1')},
    {id: 'box2', element: document.getElementById('box2')}, 
    {id: 'box3', element: document.getElementById('box3')}, 
    {id: 'box4', element: document.getElementById('box4')}, 
    {id: 'box5', element: document.getElementById('box5')}, 
    {id: 'box6', element: document.getElementById('box6')}, 
    {id: 'box7', element: document.getElementById('box7')}, 
    {id: 'box8', element: document.getElementById('box8')},
    {id: 'box9', element: document.getElementById('box9')}
  ];

  // Set initial data
  cards.forEach(box => {
    getTranslation(box.element)
    box.initialData = {
      translateX: getTranslation(box.element, 'translateX'),
      translateY: getTranslation(box.element, 'translateY'),
      scale: getTranslation(box.element, 'scale'),
      opacity: box.element.style.opacity
    };
  });


  // Scroll event
  document.addEventListener('scroll', function() {
    adjustBasedOnScroll();
  });

  // Adjustment function
  const adjustBasedOnScroll = () => {
    
    // Get delta scroll
    deltaScroll = window.scrollY - previousScrollY;
    
    const referenceBox = document.getElementById('mosaic-container');
    
    // Reference top
    const maxDistanceFromTop = 610;
    const toleranceTop = 30;

    var fact = Math.max(0, Math.min(
      maxDistanceFromTop, 
      referenceBox.getBoundingClientRect().top - toleranceTop
      ) / maxDistanceFromTop);

      console.log(referenceBox.getBoundingClientRect().top - toleranceTop, maxDistanceFromTop);
    // Adjust all cards
    if(fact != 0) {
      cards.forEach(box => {
          const translateX =  box.initialData.translateX < 0 
            ? Math.min(0, box.initialData.translateX * fact) 
            : Math.max(0, box.initialData.translateX * fact);
          const sideBoxesTranslateY = box.initialData.translateY < 0 
            ? Math.min(0, box.initialData.translateY * fact) 
            : Math.max(0, box.initialData.translateY * fact);
          const scaling = Math.max(1, box.initialData.scale * fact);
          const opacity = box.id != 'box5' ? 1 - (1 * fact) : 1;
          box.element.style.transform = `translateX(${translateX}px) translateY(${sideBoxesTranslateY}px) scale(${scaling})`;
          //if(box.id == 'box5')
          //box.element.style.boxShadow = `0px 0px ${30 - 30 * fact}px ${10 - 10 * fact}px rgb(58, 58, 58)`
          box.element.style.opacity = `${opacity}`;
      });
    } else {
      
    }

    previousScrollY = window.scrollY;
  }

  adjustBasedOnScroll();

})();