import gsap from "gsap";

const duration = 0.2;

const scaleTarget = 1.15;
export const cardHover = (targetScale) => {
  gsap.to(targetScale, {
    z: scaleTarget,
    y: scaleTarget,
    x: scaleTarget,
    duration: duration,
    ease: "power1.inOut",
    repeat: 0,
  });
};

export const cardHoverOut = (targetScale) => {
  gsap.to(targetScale, {
    y: 1,
    x: 1,
    z: 1,
    duration: duration,
    ease: "power1.inOut",
    repeat: 0,
  });
};

