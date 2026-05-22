import { useEffect, useRef, useState } from 'react';

export default function InteractiveNetwork() {
  const canvasRef = useRef(null);
  const [activeTheme, setActiveTheme] = useState('dark');

  // Sync theme changes based on body class list to adjust canvas line colors
  useEffect(() => {
    const checkTheme = () => {
      const isLight = document.body.classList.contains('light-theme');
      setActiveTheme(isLight ? 'light' : 'dark');
    };

    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;

    canvas.width = width;
    canvas.height = height;

    const particles = [];
    const particleCount = 45;
    const connectionDistance = 100;
    const mouse = { x: null, y: null, radius: 120 };

    // Initialize network nodes with brand-colored styling
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2.5 + 1.5,
        color: Math.random() > 0.35 ? 'primary' : 'secondary'
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    // Spawn a burst of candidate nodes on canvas click
    const handleCanvasClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      
      for (let i = 0; i < 8; i++) {
        particles.push({
          x: clickX,
          y: clickY,
          vx: (Math.random() - 0.5) * 2.5,
          vy: (Math.random() - 0.5) * 2.5,
          radius: Math.random() * 2 + 1.5,
          color: 'secondary',
          life: 120 // Fade out after 120 frames
        });
      }
      
      // Keep nodes list capped to preserve performance
      if (particles.length > 85) {
        particles.splice(particleCount, particles.length - particleCount);
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('click', handleCanvasClick);

    // Resolve color styling dynamically based on light/dark mode
    const getColors = () => {
      const isDark = activeTheme === 'dark';
      return {
        primaryColor: isDark ? 'rgba(2, 61, 239, 0.5)' : 'rgba(2, 61, 239, 0.4)',
        secondaryColor: isDark ? 'rgba(254, 195, 17, 0.75)' : 'rgba(254, 195, 17, 0.6)',
        linePrimary: isDark ? 'rgba(2, 61, 239, 0.15)' : 'rgba(2, 61, 239, 0.1)',
        lineSecondary: isDark ? 'rgba(254, 195, 17, 0.25)' : 'rgba(254, 195, 17, 0.18)'
      };
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      const colors = getColors();

      // Update positions and render particle network
      particles.forEach((p, idx) => {
        // Handle limits and wall bounce
        if (p.x < 0 || p.x > width) p.vx = -p.vx;
        if (p.y < 0 || p.y > height) p.vy = -p.vy;
        
        p.x += p.vx;
        p.y += p.vy;

        // Smooth mouse attraction (magnetic effect)
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            // Attract primary nodes, push secondary nodes slightly for variance
            const multiplier = p.color === 'primary' ? 0.35 : -0.15;
            p.x += (dx / dist) * force * multiplier;
            p.y += (dy / dist) * force * multiplier;
          }
        }

        // Render nodes
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color === 'secondary' ? colors.secondaryColor : colors.primaryColor;
        ctx.fill();

        // Connect nodes to neighboring nodes within connecting limits
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            
            const alpha = (1 - (dist / connectionDistance)) * 0.3;
            ctx.strokeStyle = (p.color === 'secondary' || p2.color === 'secondary')
              ? `rgba(254, 195, 17, ${alpha * 1.2})`
              : `rgba(2, 61, 239, ${alpha})`;
              
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Draw mouse dynamic connections
        if (mouse.x !== null && mouse.y !== null) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < mouse.radius) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            const alpha = (1 - (dist / mouse.radius)) * 0.4;
            ctx.strokeStyle = p.color === 'secondary'
              ? `rgba(254, 195, 17, ${alpha})`
              : `rgba(2, 61, 239, ${alpha})`;
            ctx.lineWidth = 1.0;
            ctx.stroke();
          }
        }

        // Decrease life of burst particles
        if (p.life !== undefined) {
          p.life -= 1;
          if (p.life <= 0) {
            particles.splice(idx, 1);
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
        canvas.removeEventListener('click', handleCanvasClick);
      }
    };
  }, [activeTheme]);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '400px',
      maxHeight: '60vh',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      border: '1px solid var(--border-color)',
      backgroundColor: 'rgba(15, 22, 42, 0.4)',
      boxShadow: 'var(--shadow-lg), var(--shadow-glow)',
      transition: 'border-color var(--transition-normal), background-color var(--transition-normal)'
    }}>
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          cursor: 'crosshair'
        }}
      />
      <div style={{
        position: 'absolute',
        bottom: '12px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '0.7rem',
        color: 'var(--text-muted)',
        pointerEvents: 'none',
        textTransform: 'uppercase',
        letterSpacing: '1.5px',
        fontWeight: '700',
        backgroundColor: activeTheme === 'dark' ? 'rgba(7, 10, 19, 0.75)' : 'rgba(248, 250, 252, 0.85)',
        padding: '0.3rem 0.8rem',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-sm)',
        transition: 'color var(--transition-normal), background-color var(--transition-normal)',
        whiteSpace: 'nowrap'
      }}>
        ⚡ Move mouse to connect nodes • Click to spawn talent
      </div>
    </div>
  );
}
