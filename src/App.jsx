import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════
   KRISHNENDU — AI Developer Portfolio
   Premium dark futuristic single-file React app
═══════════════════════════════════════════════ */

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

*{margin:0;padding:0;box-sizing:border-box;}
:root{
  --p:#7C3AED;--b:#06B6D4;--bg:#0B0B0B;--bg2:#0f0f17;
  --glass:rgba(255,255,255,0.04);--border:rgba(255,255,255,0.08);
  --text:#e8e8f0;--muted:#6b6b8a;
}
html{scroll-behavior:smooth;}
body{background:var(--bg);color:var(--text);font-family:'DM Sans',sans-serif;overflow-x:hidden;cursor:none;}

/* CURSOR */
#cursor{position:fixed;width:12px;height:12px;background:var(--b);border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:transform 0.1s,width 0.3s,height 0.3s,background 0.3s;mix-blend-mode:screen;}
#cursor-ring{position:fixed;width:40px;height:40px;border:1px solid rgba(124,58,237,0.5);border-radius:50%;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);transition:transform 0.15s ease-out,width 0.3s,height 0.3s,border-color 0.3s;}
body:has(a:hover,button:hover) #cursor{width:20px;height:20px;background:var(--p);}
body:has(a:hover,button:hover) #cursor-ring{width:60px;height:60px;border-color:rgba(124,58,237,0.8);}

/* SCROLLBAR */
::-webkit-scrollbar{width:4px;}
::-webkit-scrollbar-track{background:var(--bg);}
::-webkit-scrollbar-thumb{background:linear-gradient(var(--p),var(--b));border-radius:99px;}

/* KEYFRAMES */
@keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-20px);}}
@keyframes pulse-glow{0%,100%{box-shadow:0 0 20px rgba(124,58,237,0.3);}50%{box-shadow:0 0 60px rgba(124,58,237,0.7),0 0 100px rgba(6,182,212,0.3);}}
@keyframes spin-slow{to{transform:rotate(360deg);}}
@keyframes gradient-shift{0%{background-position:0% 50%;}50%{background-position:100% 50%;}100%{background-position:0% 50%;}}
@keyframes reveal-up{from{opacity:0;transform:translateY(60px);}to{opacity:1;transform:translateY(0);}}
@keyframes reveal-left{from{opacity:0;transform:translateX(-60px);}to{opacity:1;transform:translateX(0);}}
@keyframes blink{0%,100%{opacity:1;}50%{opacity:0;}}
@keyframes particle{0%{transform:translateY(0) translateX(0) scale(1);opacity:0.6;}100%{transform:translateY(-100vh) translateX(var(--dx)) scale(0);opacity:0;}}
@keyframes shimmer{0%{background-position:-200% 0;}100%{background-position:200% 0;}}
@keyframes scale-in{from{opacity:0;transform:scale(0.8);}to{opacity:1;transform:scale(1);}}
@keyframes loader-fill{from{width:0%;}to{width:100%;}}
@keyframes fade-out{0%{opacity:1;}100%{opacity:0;pointer-events:none;}}

/* LOADER */
.loader{position:fixed;inset:0;background:var(--bg);z-index:10000;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:24px;}
.loader.done{animation:fade-out 0.6s 0.2s forwards;}
.loader-name{font-family:'Syne',sans-serif;font-size:2rem;font-weight:800;background:linear-gradient(135deg,var(--p),var(--b));-webkit-background-clip:text;-webkit-text-fill-color:transparent;letter-spacing:0.1em;}
.loader-bar-wrap{width:200px;height:2px;background:rgba(255,255,255,0.1);border-radius:99px;overflow:hidden;}
.loader-bar{height:100%;background:linear-gradient(90deg,var(--p),var(--b));animation:loader-fill 1.8s ease forwards;}
.loader-text{font-size:0.75rem;color:var(--muted);letter-spacing:0.2em;text-transform:uppercase;}

/* PARTICLES */
.particles{position:fixed;inset:0;pointer-events:none;overflow:hidden;z-index:0;}
.particle{position:absolute;bottom:-10px;width:2px;height:2px;border-radius:50%;animation:particle linear infinite;}

/* NOISE OVERLAY */
.noise{position:fixed;inset:0;pointer-events:none;z-index:1;opacity:0.03;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");}

/* NAV */
nav{position:fixed;top:0;left:0;right:0;z-index:100;transition:all 0.3s;}
nav.scrolled{background:rgba(11,11,11,0.85);backdrop-filter:blur(20px);border-bottom:1px solid var(--border);}
.nav-inner{max-width:1200px;margin:0 auto;padding:20px 40px;display:flex;align-items:center;justify-content:space-between;}
.nav-logo{font-family:'Syne',sans-serif;font-weight:800;font-size:1.25rem;background:linear-gradient(135deg,var(--p),var(--b));-webkit-background-clip:text;-webkit-text-fill-color:transparent;cursor:pointer;}
.nav-links{display:flex;gap:32px;list-style:none;}
.nav-links a{text-decoration:none;color:var(--muted);font-size:0.875rem;font-weight:500;letter-spacing:0.05em;transition:color 0.3s;position:relative;}
.nav-links a::after{content:'';position:absolute;bottom:-4px;left:0;width:0;height:1px;background:linear-gradient(90deg,var(--p),var(--b));transition:width 0.3s;}
.nav-links a:hover{color:white;}
.nav-links a:hover::after{width:100%;}
.nav-cta{background:linear-gradient(135deg,var(--p),var(--b));color:white;border:none;padding:10px 24px;border-radius:99px;font-size:0.8rem;font-weight:500;cursor:pointer;font-family:'DM Sans',sans-serif;transition:opacity 0.3s,transform 0.3s;}
.nav-cta:hover{opacity:0.85;transform:scale(1.05);}

/* SECTIONS */
section{position:relative;z-index:2;}
.container{max-width:1200px;margin:0 auto;padding:0 40px;}

/* HERO */
.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;}
.hero-bg{position:absolute;inset:0;background:radial-gradient(ellipse 80% 60% at 50% 0%,rgba(124,58,237,0.15) 0%,transparent 70%),radial-gradient(ellipse 60% 40% at 80% 80%,rgba(6,182,212,0.08) 0%,transparent 60%);}
.hero-orb{position:absolute;border-radius:50%;filter:blur(80px);pointer-events:none;}
.orb1{width:600px;height:600px;background:rgba(124,58,237,0.12);top:-200px;left:-200px;animation:float 8s ease-in-out infinite;}
.orb2{width:400px;height:400px;background:rgba(6,182,212,0.08);bottom:-100px;right:-100px;animation:float 10s ease-in-out infinite reverse;}
.hero-content{text-align:center;position:relative;z-index:3;}
.hero-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(124,58,237,0.1);border:1px solid rgba(124,58,237,0.3);border-radius:99px;padding:6px 16px;font-size:0.75rem;color:rgba(124,58,237,0.9);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:32px;}
.hero-badge-dot{width:6px;height:6px;background:var(--p);border-radius:50%;animation:pulse-glow 2s infinite;}
.hero-greeting{font-family:'Syne',sans-serif;font-size:clamp(3rem,8vw,7rem);font-weight:800;line-height:1;margin-bottom:8px;animation:reveal-up 0.8s ease forwards;}
.hero-greeting span{background:linear-gradient(135deg,#fff 0%,rgba(255,255,255,0.6) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
.hero-name{font-family:'Syne',sans-serif;font-size:clamp(3rem,8vw,7rem);font-weight:800;line-height:1;margin-bottom:24px;background:linear-gradient(135deg,var(--p) 0%,var(--b) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-size:200% 200%;animation:gradient-shift 4s ease infinite,reveal-up 0.8s 0.1s ease both;}
.hero-sub{font-size:clamp(1rem,2.5vw,1.35rem);color:var(--muted);margin-bottom:48px;font-weight:300;animation:reveal-up 0.8s 0.2s ease both;max-width:520px;margin-left:auto;margin-right:auto;line-height:1.6;}
.hero-sub .highlight{color:var(--b);}
.hero-ctas{display:flex;gap:16px;justify-content:center;flex-wrap:wrap;animation:reveal-up 0.8s 0.35s ease both;}
.btn-primary{background:linear-gradient(135deg,var(--p),var(--b));color:white;border:none;padding:14px 32px;border-radius:99px;font-size:0.9rem;font-weight:500;cursor:pointer;font-family:'DM Sans',sans-serif;transition:transform 0.3s,box-shadow 0.3s;animation:pulse-glow 3s infinite;}
.btn-primary:hover{transform:translateY(-3px) scale(1.03);box-shadow:0 20px 60px rgba(124,58,237,0.4);}
.btn-secondary{background:transparent;color:white;border:1px solid rgba(255,255,255,0.2);padding:14px 32px;border-radius:99px;font-size:0.9rem;font-weight:500;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.3s;backdrop-filter:blur(10px);}
.btn-secondary:hover{border-color:var(--p);background:rgba(124,58,237,0.1);transform:translateY(-3px);}
.hero-scroll{position:absolute;bottom:40px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:8px;color:var(--muted);font-size:0.7rem;letter-spacing:0.15em;text-transform:uppercase;animation:reveal-up 0.8s 0.6s ease both;}
.scroll-line{width:1px;height:50px;background:linear-gradient(var(--p),transparent);animation:float 2s infinite;}
.hero-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(124,58,237,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.05) 1px,transparent 1px);background-size:60px 60px;mask-image:radial-gradient(ellipse at center,black 0%,transparent 70%);}

/* ABOUT */
.about{padding:120px 0;}
.section-label{font-size:0.7rem;letter-spacing:0.25em;text-transform:uppercase;color:var(--p);margin-bottom:16px;font-weight:500;}
.section-title{font-family:'Syne',sans-serif;font-size:clamp(2rem,5vw,3.5rem);font-weight:800;line-height:1.1;margin-bottom:24px;}
.about-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;}
.about-text p{color:var(--muted);font-size:1.05rem;line-height:1.8;margin-bottom:16px;}
.about-text p strong{color:white;}
.about-stats{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:32px;}
.stat-card{background:var(--glass);border:1px solid var(--border);border-radius:16px;padding:20px;transition:border-color 0.3s,transform 0.3s;}
.stat-card:hover{border-color:rgba(124,58,237,0.4);transform:translateY(-4px);}
.stat-num{font-family:'Syne',sans-serif;font-size:2rem;font-weight:800;background:linear-gradient(135deg,var(--p),var(--b));-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
.stat-label{font-size:0.8rem;color:var(--muted);margin-top:4px;}
.about-visual{position:relative;display:flex;align-items:center;justify-content:center;}
.about-orb-wrap{position:relative;width:320px;height:320px;}
.about-orb-inner{width:100%;height:100%;border-radius:50%;background:linear-gradient(135deg,rgba(124,58,237,0.2),rgba(6,182,212,0.1));border:1px solid rgba(124,58,237,0.2);display:flex;align-items:center;justify-content:center;animation:float 6s ease-in-out infinite;}
.about-orb-ring{position:absolute;inset:-20px;border-radius:50%;border:1px solid rgba(124,58,237,0.1);animation:spin-slow 20s linear infinite;}
.about-orb-ring2{position:absolute;inset:-50px;border-radius:50%;border:1px dashed rgba(6,182,212,0.07);animation:spin-slow 35s linear infinite reverse;}
.about-emoji{font-size:5rem;}

/* SKILLS */
.skills{padding:80px 0 120px;}
.skills-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;margin-top:60px;}
.skill-card{background:var(--glass);border:1px solid var(--border);border-radius:20px;padding:28px 32px;display:flex;align-items:center;gap:20px;cursor:default;transition:all 0.4s;position:relative;overflow:hidden;}
.skill-card::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(124,58,237,0.08),rgba(6,182,212,0.04));opacity:0;transition:opacity 0.4s;}
.skill-card:hover{border-color:rgba(124,58,237,0.5);transform:translateY(-6px);box-shadow:0 20px 60px rgba(124,58,237,0.15);}
.skill-card:hover::before{opacity:1;}
.skill-icon{width:52px;height:52px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:1.6rem;flex-shrink:0;}
.skill-info h3{font-family:'Syne',sans-serif;font-weight:700;font-size:1.05rem;margin-bottom:4px;}
.skill-info p{font-size:0.8rem;color:var(--muted);line-height:1.5;}
.skill-bar-wrap{height:3px;background:rgba(255,255,255,0.06);border-radius:99px;margin-top:12px;overflow:hidden;}
.skill-bar{height:100%;border-radius:99px;background:linear-gradient(90deg,var(--p),var(--b));transform-origin:left;transition:transform 1.2s cubic-bezier(0.25,1,0.5,1);}

/* PROJECTS */
.projects{padding:80px 0 120px;}
.projects-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:60px;}
.project-card{background:var(--glass);border:1px solid var(--border);border-radius:24px;overflow:hidden;cursor:pointer;transition:all 0.4s;position:relative;group;}
.project-card::after{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(124,58,237,0.1),rgba(6,182,212,0.05));opacity:0;transition:opacity 0.4s;}
.project-card:hover{border-color:rgba(124,58,237,0.5);transform:translateY(-10px);box-shadow:0 30px 80px rgba(124,58,237,0.2);}
.project-card:hover::after{opacity:1;}
.project-visual{height:180px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;}
.project-emoji{font-size:4rem;transition:transform 0.4s;}
.project-card:hover .project-emoji{transform:scale(1.2) rotate(5deg);}
.project-body{padding:24px;}
.project-tag{display:inline-block;background:rgba(124,58,237,0.15);border:1px solid rgba(124,58,237,0.25);color:rgba(124,58,237,0.9);font-size:0.7rem;padding:3px 10px;border-radius:99px;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:12px;}
.project-title{font-family:'Syne',sans-serif;font-weight:700;font-size:1.15rem;margin-bottom:8px;}
.project-desc{font-size:0.85rem;color:var(--muted);line-height:1.6;margin-bottom:20px;}
.project-links{display:flex;gap:10px;}
.proj-btn{flex:1;text-align:center;padding:8px;border-radius:10px;font-size:0.75rem;font-weight:500;cursor:pointer;text-decoration:none;transition:all 0.3s;}
.proj-btn-outline{background:transparent;border:1px solid var(--border);color:var(--muted);}
.proj-btn-outline:hover{border-color:var(--p);color:white;}
.proj-btn-fill{background:linear-gradient(135deg,var(--p),var(--b));border:none;color:white;}
.proj-btn-fill:hover{opacity:0.85;transform:scale(1.02);}

/* TIMELINE */
.timeline{padding:80px 0 120px;}
.timeline-list{margin-top:60px;position:relative;}
.timeline-list::before{content:'';position:absolute;left:50%;top:0;bottom:0;width:1px;background:linear-gradient(var(--p),var(--b),transparent);transform:translateX(-50%);}
.timeline-item{display:grid;grid-template-columns:1fr 60px 1fr;gap:0;margin-bottom:60px;align-items:start;}
.timeline-item:nth-child(even) .timeline-content{grid-column:3;}
.timeline-item:nth-child(even) .timeline-spacer{grid-column:1;}
.timeline-dot{grid-column:2;width:14px;height:14px;background:linear-gradient(135deg,var(--p),var(--b));border-radius:50%;margin:0 auto;margin-top:8px;box-shadow:0 0 20px rgba(124,58,237,0.5);}
.timeline-content{background:var(--glass);border:1px solid var(--border);border-radius:20px;padding:24px;transition:all 0.3s;}
.timeline-content:hover{border-color:rgba(124,58,237,0.4);transform:translateY(-4px);}
.timeline-year{font-size:0.7rem;color:var(--p);letter-spacing:0.15em;text-transform:uppercase;margin-bottom:8px;}
.timeline-content h3{font-family:'Syne',sans-serif;font-weight:700;font-size:1rem;margin-bottom:6px;}
.timeline-content p{font-size:0.85rem;color:var(--muted);line-height:1.6;}

/* CONTACT */
.contact{padding:80px 0 120px;}
.contact-wrap{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:start;margin-top:60px;}
.contact-form{display:flex;flex-direction:column;gap:16px;}
.form-group{display:flex;flex-direction:column;gap:8px;}
.form-group label{font-size:0.8rem;color:var(--muted);letter-spacing:0.05em;}
.form-input{background:var(--glass);border:1px solid var(--border);border-radius:12px;padding:14px 18px;color:white;font-size:0.9rem;font-family:'DM Sans',sans-serif;outline:none;transition:border-color 0.3s,box-shadow 0.3s;resize:none;}
.form-input:focus{border-color:rgba(124,58,237,0.5);box-shadow:0 0 0 3px rgba(124,58,237,0.1);}
.form-input::placeholder{color:var(--muted);}
.form-submit{background:linear-gradient(135deg,var(--p),var(--b));color:white;border:none;padding:14px;border-radius:12px;font-size:0.9rem;font-weight:500;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.3s;margin-top:8px;}
.form-submit:hover{opacity:0.9;transform:translateY(-2px);box-shadow:0 10px 40px rgba(124,58,237,0.3);}
.contact-info{display:flex;flex-direction:column;gap:24px;}
.contact-info h3{font-family:'Syne',sans-serif;font-size:1.8rem;font-weight:800;line-height:1.2;}
.contact-info p{color:var(--muted);line-height:1.7;}
.socials{display:flex;gap:12px;margin-top:8px;}
.social-btn{display:flex;align-items:center;gap:8px;background:var(--glass);border:1px solid var(--border);border-radius:12px;padding:10px 18px;color:var(--muted);font-size:0.85rem;text-decoration:none;transition:all 0.3s;cursor:pointer;}
.social-btn:hover{border-color:var(--p);color:white;background:rgba(124,58,237,0.1);transform:translateY(-3px);}

/* FOOTER */
footer{border-top:1px solid var(--border);padding:32px 40px;text-align:center;color:var(--muted);font-size:0.8rem;position:relative;z-index:2;}

/* REVEAL ANIMATION */
.reveal{opacity:0;transform:translateY(40px);transition:opacity 0.8s cubic-bezier(0.25,1,0.5,1),transform 0.8s cubic-bezier(0.25,1,0.5,1);}
.reveal.visible{opacity:1;transform:translateY(0);}
.reveal-left{opacity:0;transform:translateX(-40px);transition:opacity 0.8s cubic-bezier(0.25,1,0.5,1),transform 0.8s cubic-bezier(0.25,1,0.5,1);}
.reveal-left.visible{opacity:1;transform:translateX(0);}
.reveal-right{opacity:0;transform:translateX(40px);transition:opacity 0.8s cubic-bezier(0.25,1,0.5,1),transform 0.8s cubic-bezier(0.25,1,0.5,1);}
.reveal-right.visible{opacity:1;transform:translateX(0);}
.delay-1{transition-delay:0.1s !important;}
.delay-2{transition-delay:0.2s !important;}
.delay-3{transition-delay:0.3s !important;}
.delay-4{transition-delay:0.4s !important;}
.delay-5{transition-delay:0.5s !important;}

/* RESPONSIVE */
@media(max-width:900px){
  .about-grid,.contact-wrap{grid-template-columns:1fr;gap:48px;}
  .about-visual{display:none;}
  .projects-grid{grid-template-columns:1fr;}
  .skills-grid{grid-template-columns:1fr;}
  .timeline-list::before{left:20px;}
  .timeline-item{grid-template-columns:40px 1fr;gap:16px;}
  .timeline-dot{grid-column:1;margin:8px 0 0 8px;}
  .timeline-content{grid-column:2 !important;}
  .timeline-spacer{display:none;}
  .nav-links{display:none;}
  .nav-inner{padding:16px 24px;}
  .container{padding:0 24px;}
}
`;

// ── CURSOR ────────────────────────────────────────
function Cursor() {
  const cursorRef = useRef(null);
  const ringRef   = useRef(null);
  useEffect(() => {
    const move = e => {
      if (cursorRef.current)  { cursorRef.current.style.left  = e.clientX + "px"; cursorRef.current.style.top  = e.clientY + "px"; }
      if (ringRef.current)    { ringRef.current.style.left    = e.clientX + "px"; ringRef.current.style.top    = e.clientY + "px"; }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (<>
    <div id="cursor" ref={cursorRef}/>
    <div id="cursor-ring" ref={ringRef}/>
  </>);
}

// ── PARTICLES ────────────────────────────────────
function Particles() {
  const particles = Array.from({length:20}, (_,i) => ({
    id:i,
    left: `${Math.random()*100}%`,
    delay: `${Math.random()*8}s`,
    duration: `${6 + Math.random()*10}s`,
    size: `${1 + Math.random()*2}px`,
    color: Math.random() > 0.5 ? "#7C3AED" : "#06B6D4",
    dx: `${(Math.random()-0.5)*200}px`,
  }));
  return (
    <div className="particles">
      {particles.map(p => (
        <div key={p.id} className="particle" style={{
          left:p.left, width:p.size, height:p.size,
          background:p.color, animationDuration:p.duration,
          animationDelay:p.delay, "--dx":p.dx, opacity:0.4,
        }}/>
      ))}
    </div>
  );
}

// ── LOADER ────────────────────────────────────────
function Loader({onDone}) {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => { setDone(true); setTimeout(onDone, 800); }, 2000);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className={`loader ${done ? "done" : ""}`}>
      <div className="loader-name">KRISHNENDU</div>
      <div className="loader-bar-wrap"><div className="loader-bar"/></div>
      <div className="loader-text">Initializing Portfolio</div>
    </div>
  );
}

// ── NAVBAR ────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const scroll = id => document.getElementById(id)?.scrollIntoView({behavior:"smooth"});
  return (
    <nav className={scrolled ? "scrolled" : ""}>
      <div className="nav-inner">
        <div className="nav-logo" onClick={() => window.scrollTo({top:0,behavior:"smooth"})}>K.</div>
        <ul className="nav-links">
          {["about","skills","projects","timeline","contact"].map(s => (
            <li key={s}><a href={`#${s}`} onClick={e=>{e.preventDefault();scroll(s);}}>
              {s.charAt(0).toUpperCase()+s.slice(1)}
            </a></li>
          ))}
        </ul>
        <button className="nav-cta" onClick={() => scroll("contact")}>Let's Talk</button>
      </div>
    </nav>
  );
}

// ── TYPED TEXT ────────────────────────────────────
function Typed({texts}) {
  const [ti, setTi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  const [display, setDisplay] = useState("");
  useEffect(() => {
    const cur = texts[ti];
    let t;
    if (!del) {
      if (ci < cur.length) { t = setTimeout(() => { setDisplay(cur.slice(0,ci+1)); setCi(ci+1); }, 60); }
      else { t = setTimeout(() => setDel(true), 2000); }
    } else {
      if (ci > 0) { t = setTimeout(() => { setDisplay(cur.slice(0,ci-1)); setCi(ci-1); }, 30); }
      else { setDel(false); setTi((ti+1)%texts.length); }
    }
    return () => clearTimeout(t);
  }, [ci, del, ti]);
  return (
    <span style={{color:"var(--b)"}}>
      {display}<span style={{animation:"blink 1s infinite",color:"var(--p)"}}>|</span>
    </span>
  );
}

// ── REVEAL HOOK ───────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal,.reveal-left,.reveal-right");
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, {threshold:0.15});
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ── SKILL BAR HOOK ────────────────────────────────
function useSkillBars() {
  useEffect(() => {
    const bars = document.querySelectorAll(".skill-bar");
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const w = e.target.getAttribute("data-w");
          e.target.style.width = w;
        }
      });
    }, {threshold:0.5});
    bars.forEach(b => { b.style.width = "0%"; obs.observe(b); });
    return () => obs.disconnect();
  }, []);
}

// ═══════════════════════════════════════════════
// SECTIONS
// ═══════════════════════════════════════════════

function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-grid"/>
      <div className="hero-bg"/>
      <div className="hero-orb orb1"/>
      <div className="hero-orb orb2"/>
      <div className="hero-content container" style={{textAlign:"center"}}>
        <div className="hero-badge">
          <span className="hero-badge-dot"/>&nbsp;Available for projects
        </div>
        <div className="hero-greeting"><span>Hi, I'm</span></div>
        <div className="hero-name">Krishnendu</div>
        <p className="hero-sub">
          I build <Typed texts={["AI-powered experiences.","intelligent systems.","the future with code.","real-world AI solutions."]}/><br/>
          <span className="highlight">AI Developer</span> · FastAPI · OpenAI · Python
        </p>
        <div className="hero-ctas">
          <button className="btn-primary" onClick={() => document.getElementById("projects")?.scrollIntoView({behavior:"smooth"})}>
            View My Work ↓
          </button>
          <button className="btn-secondary" onClick={() => document.getElementById("contact")?.scrollIntoView({behavior:"smooth"})}>
            Contact Me
          </button>
        </div>
      </div>
      <div className="hero-scroll">
        <div className="scroll-line"/>
        <span>Scroll</span>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-grid">
          <div>
            <p className="section-label reveal">About Me</p>
            <h2 className="section-title reveal delay-1">Turning Ideas Into<br/><span style={{background:"linear-gradient(135deg,var(--p),var(--b))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>AI Realities</span></h2>
            <div className="about-text reveal delay-2">
              <p>I'm an <strong>AI Developer & Innovator</strong> based in India, passionate about building intelligent systems that solve real-world problems. I specialize in turning complex AI concepts into production-ready applications.</p>
              <p>From fraud detection platforms to <strong>3D video generation</strong> and eco-friendly startups — I build things that matter. My stack revolves around <strong>Python, FastAPI, and OpenAI</strong> to create scalable AI-powered backends.</p>
              <p>Currently focused on <strong>AI automation, LLM applications</strong>, and exploring the intersection of AI with real-world impact.</p>
            </div>
            <div className="about-stats reveal delay-3">
              {[["3+","Projects Built"],["2+","Years Building AI"],["1","AI Startup"],["∞","Curiosity"]].map(([n,l]) => (
                <div className="stat-card" key={l}>
                  <div className="stat-num">{n}</div>
                  <div className="stat-label">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="about-visual reveal-right">
            <div className="about-orb-wrap">
              <div className="about-orb-ring"/>
              <div className="about-orb-ring2"/>
              <div className="about-orb-inner">
                <div style={{textAlign:"center"}}>
                  <div className="about-emoji">🤖</div>
                  <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,marginTop:8,fontSize:"1.1rem"}}>AI Developer</div>
                  <div style={{fontSize:"0.8rem",color:"var(--muted)",marginTop:4}}>& Innovator</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const skills = [
    {icon:"🐍",name:"Python",desc:"Core language for AI, automation, data processing & backend systems.",level:92,color:"rgba(124,58,237,0.15)"},
    {icon:"⚡",name:"FastAPI",desc:"High-performance async APIs for AI backends. REST, WebSockets, JWT.",level:85,color:"rgba(6,182,212,0.12)"},
    {icon:"🧠",name:"Artificial Intelligence",desc:"LLMs, RAG pipelines, sentiment analysis, fraud detection, NLP.",level:88,color:"rgba(124,58,237,0.15)"},
    {icon:"🔮",name:"OpenAI API",desc:"GPT models, embeddings, function calling, fine-tuning & prompt engineering.",level:90,color:"rgba(6,182,212,0.12)"},
  ];
  return (
    <section className="skills" id="skills">
      <div className="container">
        <p className="section-label reveal">What I Know</p>
        <h2 className="section-title reveal delay-1">Core <span style={{background:"linear-gradient(135deg,var(--p),var(--b))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Skills</span></h2>
        <div className="skills-grid">
          {skills.map((s,i) => (
            <div className={`skill-card reveal delay-${i+1}`} key={s.name}>
              <div className="skill-icon" style={{background:s.color,fontSize:"1.8rem"}}>{s.icon}</div>
              <div className="skill-info" style={{flex:1}}>
                <h3>{s.name}</h3>
                <p>{s.desc}</p>
                <div className="skill-bar-wrap">
                  <div className="skill-bar" data-w={`${s.level}%`} style={{width:"0%"}}/>
                </div>
              </div>
              <div style={{fontSize:"0.85rem",fontWeight:600,color:"var(--p)",minWidth:36,textAlign:"right"}}>{s.level}%</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const projects = [
    {
      emoji:"🤖", tag:"AI Platform", bg:"linear-gradient(135deg,rgba(124,58,237,0.15),rgba(6,182,212,0.08))",
      title:"ARIA", desc:"AI-powered complaint intelligence dashboard for Union Bank of India. Detects fraud, analyzes sentiment, and auto-resolves complaints using Claude AI.",
      github:"#", demo:"#",
    },
    {
      emoji:"🎬", tag:"Computer Vision", bg:"linear-gradient(135deg,rgba(6,182,212,0.15),rgba(124,58,237,0.08))",
      title:"3D Video Generator", desc:"Depth-based AI system that converts ordinary videos into immersive 3D visuals using computer vision and depth estimation models.",
      github:"#", demo:"#",
    },
    {
      emoji:"🌿", tag:"Startup · Co-Founder", bg:"linear-gradient(135deg,rgba(34,197,94,0.12),rgba(124,58,237,0.08))",
      title:"Lacteo Krafts", desc:"Handmade eco-friendly product startup. Built brand identity, e-commerce presence, and sustainable supply chain from the ground up.",
      github:null, demo:"#",
    },
  ];
  return (
    <section className="projects" id="projects">
      <div className="container">
        <p className="section-label reveal">What I've Built</p>
        <h2 className="section-title reveal delay-1">Featured <span style={{background:"linear-gradient(135deg,var(--p),var(--b))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Projects</span></h2>
        <div className="projects-grid">
          {projects.map((p,i) => (
            <div className={`project-card reveal delay-${i+1}`} key={p.title}>
              <div className="project-visual" style={{background:p.bg}}>
                <div className="project-emoji">{p.emoji}</div>
                <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,transparent 60%,rgba(11,11,11,0.8))"}}/>
              </div>
              <div className="project-body">
                <div className="project-tag">{p.tag}</div>
                <div className="project-title">{p.title}</div>
                <div className="project-desc">{p.desc}</div>
                <div className="project-links">
                  {p.github && <a href={p.github} className="proj-btn proj-btn-outline" target="_blank" rel="noreferrer">GitHub ↗</a>}
                  <a href={p.demo} className="proj-btn proj-btn-fill" target="_blank" rel="noreferrer">Live Demo ↗</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  const events = [
    {year:"2023",title:"Started AI Development Journey",desc:"Began learning Python and AI fundamentals. Built first automation scripts and explored machine learning concepts.",side:"left"},
    {year:"2023",title:"Co-Founded Lacteo Krafts",desc:"Launched an eco-friendly handmade products startup. Managed brand, product development, and online presence.",side:"right"},
    {year:"2024",title:"Mastered FastAPI & OpenAI",desc:"Deepened expertise in building production AI backends. Integrated LLMs into real-world applications.",side:"left"},
    {year:"2025",title:"Built ARIA for Union Bank",desc:"Developed full-stack AI complaint intelligence platform. Featured at hackathon. Live on Vercel.",side:"right"},
    {year:"2025",title:"3D Video Generator",desc:"Created a depth-based AI system converting 2D video to immersive 3D using computer vision.",side:"left"},
  ];
  return (
    <section className="timeline" id="timeline">
      <div className="container">
        <p className="section-label reveal">My Journey</p>
        <h2 className="section-title reveal delay-1">Experience &amp; <span style={{background:"linear-gradient(135deg,var(--p),var(--b))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Milestones</span></h2>
        <div className="timeline-list">
          {events.map((e,i) => (
            <div className="timeline-item" key={i}>
              {e.side === "left" ? (
                <>
                  <div className={`timeline-content reveal-left delay-${(i%3)+1}`}>
                    <div className="timeline-year">{e.year}</div>
                    <h3>{e.title}</h3>
                    <p>{e.desc}</p>
                  </div>
                  <div className="timeline-dot"/>
                  <div className="timeline-spacer"/>
                </>
              ) : (
                <>
                  <div className="timeline-spacer"/>
                  <div className="timeline-dot"/>
                  <div className={`timeline-content reveal-right delay-${(i%3)+1}`}>
                    <div className="timeline-year">{e.year}</div>
                    <h3>{e.title}</h3>
                    <p>{e.desc}</p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({name:"",email:"",message:""});
  const handle = e => { e.preventDefault(); setSent(true); };
  return (
    <section className="contact" id="contact">
      <div className="container">
        <p className="section-label reveal">Get In Touch</p>
        <h2 className="section-title reveal delay-1">Let's <span style={{background:"linear-gradient(135deg,var(--p),var(--b))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Collaborate</span></h2>
        <div className="contact-wrap">
          <div className="reveal-left">
            <div className="contact-info">
              <h3>Have an idea?<br/>Let's build it<br/><span style={{background:"linear-gradient(135deg,var(--p),var(--b))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>with AI.</span></h3>
              <p>I'm always open to discussing AI projects, freelance opportunities, or just a great conversation about building the future with intelligent systems.</p>
              <div style={{display:"flex",flexDirection:"column",gap:12}}>
                <div style={{display:"flex",alignItems:"center",gap:10,color:"var(--muted)",fontSize:"0.9rem"}}>
                  <span>📧</span><span>krishnendu@example.com</span>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:10,color:"var(--muted)",fontSize:"0.9rem"}}>
                  <span>📍</span><span>India</span>
                </div>
              </div>
              <div className="socials">
                <a href="https://github.com/MrKrishnenduMalick" target="_blank" rel="noreferrer" className="social-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  GitHub
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div className="reveal-right">
            {sent ? (
              <div style={{background:"var(--glass)",border:"1px solid rgba(34,197,94,0.3)",borderRadius:20,padding:40,textAlign:"center"}}>
                <div style={{fontSize:"3rem",marginBottom:16}}>🚀</div>
                <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:"1.3rem",marginBottom:8}}>Message Sent!</h3>
                <p style={{color:"var(--muted)",fontSize:"0.9rem"}}>Thanks for reaching out. I'll get back to you soon.</p>
                <button className="form-submit" style={{marginTop:20,width:"auto",padding:"10px 24px"}} onClick={()=>setSent(false)}>Send Another</button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handle}>
                <div className="form-group">
                  <label>Your Name</label>
                  <input className="form-input" type="text" placeholder="Krishnendu" required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input className="form-input" type="email" placeholder="hello@example.com" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea className="form-input" rows={5} placeholder="Tell me about your project..." required value={form.message} onChange={e=>setForm({...form,message:e.target.value})}/>
                </div>
                <button type="submit" className="form-submit">Send Message →</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════
// ROOT
// ═══════════════════════════════════════════════
export default function App() {
  const [loaded, setLoaded] = useState(false);
  useReveal();
  useSkillBars();
  return (
    <>
      <style>{STYLES}</style>
      {!loaded && <Loader onDone={() => setLoaded(true)}/>}
      <Cursor/>
      <Particles/>
      <div className="noise"/>
      <Nav/>
      <main>
        <Hero/>
        <About/>
        <Skills/>
        <Projects/>
        <Timeline/>
        <Contact/>
      </main>
      <footer>
        <p style={{fontFamily:"'Syne',sans-serif",fontWeight:700,marginBottom:8}}>
          <span style={{background:"linear-gradient(135deg,var(--p),var(--b))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Krishnendu</span>
        </p>
        <p>AI Developer & Innovator · Built with React + Vite · {new Date().getFullYear()}</p>
      </footer>
    </>
  );
}
