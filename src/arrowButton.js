import gsap from 'gsap';

export function initializeArrowAnimations() {
  const arrows = document.querySelectorAll('.arrow-forward, .arrow-backward');

  arrows.forEach((arrow) => {
    const isForward = arrow.classList.contains('arrow-forward');
    const arrowEmbed = arrow.querySelector('.arrow-embed.ab');
    const svgPaths = Array.from(arrow.querySelectorAll(isForward ? '.forward path' : '.backward path'))
                          .filter((el) => el instanceof SVGPathElement); // Ensure only path elements

    let hoverStartTime = 0;
    let drawTimeline = null;

    arrow.addEventListener('mouseenter', () => {
      if (svgPaths.length === 0) return; // Prevent errors if no paths found

      hoverStartTime = Date.now(); // Capture when hover started

      drawTimeline = gsap.timeline();
      gsap.to(arrowEmbed, { opacity: 0.3, duration: 0.3 });

      svgPaths.forEach((path, index) => {
        if (path instanceof SVGPathElement) {
          const length = path.getTotalLength();
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length, opacity: 1 });

          drawTimeline.to(
            path,
            {
              strokeDashoffset: 0, // Draw path forward
              duration: 0.5,
              delay: index * 0.1,
              ease: 'power2.out',
            },
            0
          );
        }
      });
    });

    arrow.addEventListener('mouseleave', () => {
      if (svgPaths.length === 0) return;

      const hoverDuration = Date.now() - hoverStartTime;
      const leaveTimeline = gsap.timeline();

      if (hoverDuration < 150 && drawTimeline && drawTimeline.progress() > 0) {
        // If hover was too short, reverse the current drawing animation
        drawTimeline.reverse();
      } else {
        // Ensure the paths are SVGPathElements before applying animation
        svgPaths.forEach((path, index) => {
          if (path instanceof SVGPathElement) {
            const length = path.getTotalLength();
            leaveTimeline.to(
              path,
              {
                strokeDashoffset: length, // Retract path properly
                duration: 0.5,
                delay: index * 0.1,
                ease: 'power2.in',
              },
              0
            );
          }
        });

        leaveTimeline.to(arrowEmbed, { opacity: 1, duration: 0.3 }, '-=0.2');
      }
    });
  });
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', initializeArrowAnimations);
