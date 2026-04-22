// ── PARTICLES ──────────────────────────────────────────────
const canvas=document.getElementById('particles');
const ctx=canvas.getContext('2d');
let W,H,particles=[],mouse={x:null,y:null};
function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight;}
resize();
window.addEventListener('resize',()=>{resize();initParticles();});
window.addEventListener('mousemove',e=>{mouse.x=e.clientX;mouse.y=e.clientY;});
window.addEventListener('mouseleave',()=>{mouse.x=null;mouse.y=null;});
class Particle{constructor(){this.reset();}reset(){this.x=Math.random()*W;this.y=Math.random()*H;this.r=Math.random()*1.8+.4;this.vx=(Math.random()-.5)*.35;this.vy=(Math.random()-.5)*.35;this.alpha=Math.random()*.55+.1;const c=Math.random();if(c<.45)this.color='168,85,247';else if(c<.7)this.color='6,182,212';else this.color='226,232,240';}update(){this.x+=this.vx;this.y+=this.vy;if(this.x<0||this.x>W||this.y<0||this.y>H)this.reset();if(mouse.x!==null){const dx=this.x-mouse.x,dy=this.y-mouse.y;const dist=Math.sqrt(dx*dx+dy*dy);if(dist<100){const force=(100-dist)/100;this.x+=(dx/dist)*force*1.8;this.y+=(dy/dist)*force*1.8;}}}draw(){ctx.beginPath();ctx.arc(this.x,this.y,this.r,0,Math.PI*2);ctx.fillStyle=`rgba(${this.color},${this.alpha})`;ctx.fill();}}
function initParticles(){const count=Math.floor((W*H)/9000);particles=Array.from({length:count},()=>new Particle());}
initParticles();
function connectParticles(){const max=120;for(let i=0;i<particles.length;i++){for(let j=i+1;j<particles.length;j++){const dx=particles[i].x-particles[j].x,dy=particles[i].y-particles[j].y;const dist=Math.sqrt(dx*dx+dy*dy);if(dist<max){const alpha=(1-dist/max)*.18;ctx.beginPath();ctx.moveTo(particles[i].x,particles[i].y);ctx.lineTo(particles[j].x,particles[j].y);ctx.strokeStyle=`rgba(124,58,237,${alpha})`;ctx.lineWidth=.6;ctx.stroke();}}}}
function loop(){ctx.clearRect(0,0,W,H);particles.forEach(p=>{p.update();p.draw();});connectParticles();requestAnimationFrame(loop);}
loop();

// ── SCROLL REVEAL ─────────────────────────────────────────
const reveals=document.querySelectorAll('.reveal');
const obs=new IntersectionObserver(entries=>{entries.forEach((e,i)=>{if(e.isIntersecting){setTimeout(()=>e.target.classList.add('visible'),i*80);obs.unobserve(e.target);}});},{threshold:.12});
reveals.forEach(el=>obs.observe(el));

// ── NAV ACTIVE ────────────────────────────────────────────
const sections=document.querySelectorAll('section[id]');
const navLinks=document.querySelectorAll('.nav-links a');
window.addEventListener('scroll',()=>{let cur='';sections.forEach(s=>{if(window.scrollY>=s.offsetTop-120)cur=s.id;});navLinks.forEach(a=>{a.classList.remove('active');if(a.getAttribute('href')==='#'+cur)a.classList.add('active');});});

// ── COUNTER ANIMATION ─────────────────────────────────────
const counters=document.querySelectorAll('.num[data-target]');
const counterObs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){const el=e.target;const target=+el.dataset.target;const suffix=target>=1000?'+':'';let cur=0;const step=target/60;const tick=()=>{cur+=step;if(cur<target){el.textContent=Math.floor(cur).toLocaleString()+suffix;requestAnimationFrame(tick);}else{el.textContent=target.toLocaleString()+suffix;}};tick();counterObs.unobserve(el);}});},{threshold:.5});
counters.forEach(c=>counterObs.observe(c));

// ── PROJECT MODAL ─────────────────────────────────────────
const projects={
  medworld:{emoji:'🛍️',title:'Med World',desc:'A full-featured e-commerce platform for selling medicines online. Users can upload prescriptions, browse by categories, add to cart, and pay securely via Razorpay. Includes admin dashboard for managing inventory, orders, and users.',tags:['Angular','Spring Boot','Razorpay','MySQL','REST API'],demo:'#',code:'https://github.com/shreeshail66'},
  food:{emoji:'🍔',title:'Food Redistribution Platform',desc:'A social-impact platform connecting food donors (restaurants, events, individuals) with NGOs and people in need. Uses a hashing-based geolocation clustering algorithm for optimal matching. Features real-time push notifications and an admin analytics dashboard.',tags:['Django','Python','Hashing Algo','WebSockets','PostgreSQL'],demo:'#',code:'https://github.com/shreeshail66'},
  movie:{emoji:'🎬',title:'Movie Ticket Reservation',desc:'A complete movie ticket booking system where users can browse movies, select seats on an interactive seat map, and book tickets. Includes a separate admin panel for managing movies, shows, theatres, and bookings. Built with Ajax for smooth UX.',tags:['Django','Ajax','jQuery','SQLite','Admin Panel'],demo:'#',code:'https://github.com/shreeshail66'}
};
function openModal(key){
  const p=projects[key];
  document.getElementById('modal-emoji').textContent=p.emoji;
  document.getElementById('modal-title').textContent=p.title;
  document.getElementById('modal-desc').textContent=p.desc;
  document.getElementById('modal-tags').innerHTML=p.tags.map(t=>`<span class="tag">${t}</span>`).join('');
  document.getElementById('modal-links').innerHTML=`<a href="${p.demo}" class="btn btn-primary" style="font-size:.82rem;padding:.55rem 1.3rem;">🚀 Live Demo</a><a href="${p.code}" class="btn btn-outline" target="_blank" style="font-size:.82rem;padding:.55rem 1.3rem;">💻 View Code</a>`;
  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeModal(e,force){if(force||e.target===document.getElementById('modal-overlay')){document.getElementById('modal-overlay').classList.remove('open');document.body.style.overflow='';}}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal(null,true);});

// ── CHAR COUNT ────────────────────────────────────────────
const msgTA=document.getElementById('inp-msg');
const charCountEl=document.getElementById('char-count');
msgTA.addEventListener('input',()=>{
  const len=msgTA.value.length;
  charCountEl.textContent=len;
  charCountEl.style.color=len>900?'#f87171':len>700?'#fb923c':'var(--muted)';
});

// ── CONFETTI ──────────────────────────────────────────────
const confStyle=document.createElement('style');
confStyle.textContent=`@keyframes confFly{0%{opacity:0;transform:translateY(50px) scale(0) rotate(0deg);}40%{opacity:1;}100%{opacity:0;transform:translateY(-100px) scale(1) rotate(540deg) translateX(40px);}}`;
document.head.appendChild(confStyle);

function spawnConfetti(){
  const wrap=document.getElementById('confetti-wrap');
  wrap.innerHTML='';
  const colors=['#7c3aed','#a855f7','#06b6d4','#f0abfc','#67e8f9','#c4b5fd','#fff','#fde68a'];
  for(let i=0;i<55;i++){
    const el=document.createElement('div');
    el.style.cssText=`position:absolute;left:${Math.random()*100}%;top:${Math.random()*100}%;width:${4+Math.random()*8}px;height:${4+Math.random()*8}px;background:${colors[Math.floor(Math.random()*colors.length)]};border-radius:${Math.random()>.5?'50%':'2px'};opacity:0;animation:confFly ${0.7+Math.random()*1.2}s ease ${Math.random()*.5}s both;`;
    wrap.appendChild(el);
  }
}

// ── TOAST ─────────────────────────────────────────────────
function showToast(msg){
  const t=document.getElementById('toast');
  document.getElementById('toast-msg').textContent=msg;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),4000);
}

// ── FORM SUBMIT ──────────────────────────────────────────
document.getElementById('contact-form').addEventListener('submit',async function(e){
  e.preventDefault();
  const name=document.getElementById('inp-name').value.trim();
  const email=document.getElementById('inp-email').value.trim();
  const msg=document.getElementById('inp-msg').value.trim();
  if(!name||!email||!msg){showToast('Please fill in all required fields!');return;}

  const btn=document.getElementById('btn-submit');
  const btnText=document.getElementById('btn-text');
  const spinner=document.getElementById('spinner');
  btn.disabled=true;
  spinner.style.display='block';
  btnText.textContent='Sending…';

  try{
    const formData=new FormData(this);
    const res=await fetch('https://api.web3forms.com/submit',{method:'POST',body:formData});
    const data=await res.json();
    if(data.success){
      document.getElementById('success-name').textContent=name;
      spawnConfetti();
      document.getElementById('success-overlay').classList.add('show');
      this.reset();
      charCountEl.textContent='0';
    }else{
      throw new Error(data.message||'Failed');
    }
  }catch(err){
    showToast('Oops! Something went wrong. Please try again.');
  }finally{
    btn.disabled=false;
    spinner.style.display='none';
    btnText.textContent='✉️ Send Message';
  }
});

// ── RESET ─────────────────────────────────────────────────
document.getElementById('btn-reset').addEventListener('click',()=>{
  document.getElementById('success-overlay').classList.remove('show');
  document.getElementById('confetti-wrap').innerHTML='';
});

