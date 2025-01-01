import { useEffect, useRef } from "react";
import CallToAction from "./CallToAction";
import "./css/homemain.css";

export default function HomeMain() {
  const imagesRef = useRef(null);

  useEffect(() => {
    let currentImage = 1;
    let intervalId;

    const changeImage = () => {
      const images = document.querySelectorAll('.images img');

      currentImage++;
      if (currentImage > images.length) {
        currentImage = 1;
      }

      images.forEach((img, index) => {
        if (index + 1 === currentImage) {
          img.style.opacity = 1;
          img.style.transform = 'translateX(0) scale(1) translateZ(100px)'; 
        } else if (index + 1 === currentImage - 1 || index + 1 === currentImage + 2) {
          img.style.opacity = 0.5;
          img.style.transform = 'translateX(-350px) scale(0.8) translateZ(-100px)'; 
        } else {
          img.style.opacity = 0.5;
          img.style.transform = 'translateX(350px) scale(0.8) translateZ(-100px)'; 
        }
      });
    };

    intervalId = setInterval(changeImage, 1500); 

    const images = document.querySelectorAll('.images img');
    images.forEach((img, index) => {
      if (index === 0) {
        img.style.opacity = 1;
        img.style.transform = 'translateX(0) scale(1) translateZ(100px)';
      } else {
        img.style.opacity = 0.2;
        img.style.transform = 'translateX(-350px) scale(0.8) translateZ(-100px)';
      }
    });

    return () => {
      clearInterval(intervalId); 
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