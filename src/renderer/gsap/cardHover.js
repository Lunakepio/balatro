import gsap from "gsap";

const duration = 0.2;
export const cardHover = (target) => {
  gsap.to(target, {
    z: 0.5,
    duration: duration,
    ease: "power1.inOut",
    repeat: 0,
  });
};

export const cardHoverOut = (targetPosition, targetRotation) => {

  gsap.to(targetPosition, {
    z: 0,
    duration: duration,
    ease: "power1.inOut",
    repeat: 0,
  });
  gsap.to(targetRotation, {
    y: 0,
    x: 0,
    z: 0,
    duration: duration,
    ease: "power1.inOut",
    repeat: 0,
  });
};

