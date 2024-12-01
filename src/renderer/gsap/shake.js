import gsap from "gsap";

export const shake = (target) => {
    const tl = gsap.timeline();
    const rotationZ = 0.1;
    const duration = 0.05
    tl.to(target, {
      z: rotationZ,
      duration: duration,
      ease: "expo.inOut",
      repeat: 0,
      yoyo: true,
    });
    tl.to(target, {
      z: -rotationZ,
      duration: duration,
      ease: "power1.inOut",
      repeat: 0,
      yoyo: true,
      onComplete: () => {
        gsap.to(target, {
          x: 0,
          y: 0,
          z: 0,
          duration: duration,
          ease: "expo.inOut",
          repeat:0,
          yoyo: true,
        });
      },
    });

};