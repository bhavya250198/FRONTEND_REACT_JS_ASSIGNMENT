import React, { useEffect, useRef } from 'react';


const TableauVisualization = () => {
  const ref = useRef(null);
 
  
    debugger;
    useEffect(() => {
      window.navigator.geolocation.getCurrentPosition(
          (newPos) => setPosition(newPos),
          console.error
        );
    }, []);
    
  useEffect(() => {
    const initTableau = () => {
      const vizUrl = 'http://public.tableau.com/views/RegionalSampleWorkbook/Storms'; // Replace with your Tableau visualization URL
      debugger;
      // const containerDiv = document.getElementById('tableauViz'); // Replace 'tableauViz' with your container element ID
      const {tableau} = window;
      const options = {
        hideTabs: true,
        width: '100%',
        height: '800px',
      };
     
       const viz = new window.tableau.Viz(ref.current, vizUrl, options);
    };
    
    const script = document.createElement('script');
    script.src = 'https://public.tableau.com/javascripts/api/tableau-2.min.js';
    // script.addEventListener('load', initTableau);
    document.body.appendChild(script);
    debugger;
    initTableau();
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return( 
    <div>
  <div ref={ref}></div>
  </div>); // Replace 'tableauViz' with your container element ID
};

export default TableauVisualization;
