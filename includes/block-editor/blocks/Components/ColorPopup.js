import React, { useState,useRef, useEffect } from 'react';

import {
	PanelRow,
    ColorPicker, 
 } from '@wordpress/components';

 const ColorPopup = ({ label ,value, onChange, PropertyName  }) => {
   const [popupVisible, setPopupVisible] = useState(false);
   const [popupDirection, setPopupDirection] = useState("down");
   const popupRef = useRef(null);
 
   useEffect(() => {
     const handleClickOutsidePopup = (event) => {
       if (
         popupRef.current &&
         !popupRef.current.contains(event.target) &&
         event.target.className !== "k2-ib-dot"
       ) {
         closePopup();
       }
     };
 
     document.addEventListener("click", handleClickOutsidePopup);
 
     return () => {
       document.removeEventListener("click", handleClickOutsidePopup);
     };
   }, []);
 
   const togglePopup = () => {
     setPopupVisible((prevVisible) => !prevVisible);
   };
 
   const closePopup = () => {
     setPopupVisible(false);
   };
 
   useEffect(() => {
     if (popupRef.current) {
       const rect = popupRef.current.getBoundingClientRect();
       if (rect.top < window.innerHeight - rect.bottom) {
         setPopupDirection("down");
       } else {
         setPopupDirection("up");
       }
     }
   }, [popupVisible]);

   const inlineStyles = {
    [PropertyName]: value.value
  };
  
   return (
     <PanelRow>
       <p>
         <strong>{label}</strong>
       </p>
       <div className="k2-ib-popup" ref={popupRef}>
         <span
           style={inlineStyles}
           className="k2-ib-dot"
           onClick={togglePopup}
         ></span>
         {popupVisible && (
           <span className={`k2-ib-popup-text ${popupDirection}`}>
             <div>
               <ColorPicker value={value} onChange={(color) => onChange(color)} />
             </div>
           </span>
         )}
       </div>
     </PanelRow>
   );
 };
 
 export default ColorPopup;