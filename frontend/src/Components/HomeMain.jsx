import { useEffect, useRef } from "react";
import CallToAction from "./CallToAction";
import "./css/homemain.css";

export default function HomeMain() {
  const imagesRef = useRef(null); 

  useEffect(() => {
    let currentImage = 1;
    let isScrollingImages = false; // Flag to track if scrolling images

    const handleScroll = (e) => {
      if (isScrollingImages) {
        e.preventDefault(); // Prevent default page scroll

        const images = document.querySelectorAll('.images img');
        const containerWidth = imagesRef.current.offsetWidth; 

        // Calculate scroll amount and direction
        let scrollAmount = e.deltaY * 0.5; // Adjust sensitivity
        if (scrollAmount > containerWidth / 3) { 
          scrollAmount = containerWidth / 3;
        } else if (scrollAmount < -containerWidth / 3) {
          scrollAmount = -containerWidth / 3;
        }

        // Update currentImage based on scroll direction
        if (scrollAmount > 0) {
          currentImage++;
          if (currentImage > images.length) {
            currentImage = 1;
          }
        } else if (scrollAmount < 0) {
          currentImage--;
          if (currentImage < 1) {
            currentImage = images.length;
          }
        }

        // Apply transformations based on currentImage
        images.forEach((img, index) => {
            if (index + 1 === currentImage) {
                img.style.opacity = 1;
                img.style.transform = 'translateX(0) scale(1) translateZ(100px)'; // Bring to front
            } else if (index + 1 === currentImage - 1 || index + 1 === currentImage + 2) {
                img.style.opacity = 0.5;
                img.style.transform = 'translateX(-350px) scale(0.8) translateZ(-100px)'; // Push to back
            } else {
                img.style.opacity = 0.5;
                img.style.transform = 'translateX(350px) scale(0.8) translateZ(-100px)'; // Push to back
            }
        });
      }
    };

    const handleMouseOver = () => {
      isScrollingImages = true; 
    };

    const handleMouseOut = () => {
      isScrollingImages = false; 
    };

    const imagesContainer = imagesRef.current;
    imagesContainer.addEventListener('wheel', handleScroll, { passive: false });
    imagesContainer.addEventListener('mouseover', handleMouseOver);
    imagesContainer.addEventListener('mouseout', handleMouseOut);

    const images = document.querySelectorAll('.images img');
    images.forEach((img, index) => {
      if (index === 0) {
        img.style.opacity = 1;
        img.style.transform = 'translateX(0) scale(1) translateZ(100px)';
      } else {
        img.style.opacity = 0.5;
        img.style.transform = 'translateX(-350px) scale(0.8) translateZ(-100px)';
      }
    });
    
    return () => {
      imagesContainer.removeEventListener('wheel', handleScroll);
      imagesContainer.removeEventListener('mouseover', handleMouseOver);
      imagesContainer.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);
    return (
        <div className="home-main">
            <div className="main-text">
                <h1>Simplify your Portfolio Creation</h1>
                <p>Build Stunning, professional portfolios in minutes with our beautifully designed Web Presence portfolio templates</p>
                <div className="cta">
                    <CallToAction />
                </div>
            </div>
            <div className="images" ref={imagesRef}>
                <img src="/minimalandmodernpreview.png" alt="preview image" />
                <img src="blackandwhitepreview.png" alt="preview image" />
                <img src="/sleekfoliopreview.png" alt="preview image" />
            </div>
        </div>
    )
}