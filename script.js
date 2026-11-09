const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
// hero slides (swap each .scene for a real photo: background:url() center/cover)
const SL=[['Admissions 2026/2027','Life Long <i>Learners</i>','A Nigerian–British education that helps every child become capable, confident and creative.','Begin an Enquiry','#enquire',['#028c42','#014a22','#f5070a']],
['From Early Years to Secondary','One school. <i>Every</i> stage.','Joyful foundations, rigorous primary teaching and a secondary programme that prepares students for what comes next.','Explore Academics','#academics',['#037a3a','#013a1a','#ffffff']],
['Recognised Excellence','Named among the nation’s <i>best</i>.','In 2021 the FCT Administration reported Blooming Heritage as the third-best private primary school in the country.','Read Our Story','#news',['#028c42','#014a22','#f5070a']],
['Beyond the Classroom','Twelve clubs. Endless <i>curiosity</i>.','Debate, coding, music, chess, journalism, drama and more, so every pupil finds their spark.','Discover Student Life','#life',['#046b34','#02341a','#ffffff']]];
const sc=(c,k)=>`<svg viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="g${k}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c[0]}"/><stop offset="1" stop-color="${c[1]}"/></linearGradient></defs><rect width="1200" height="700" fill="url(#g${k})"/><circle cx="${850+k*60}" cy="190" r="${90+k*10}" fill="${c[2]}" opacity=".28"/><g fill="none" stroke="${c[2]}" stroke-opacity=".3" stroke-width="2">${[0,1,2,3,4,5,6].map(i=>`<path d="M${520+i*95} 700V${380-k*10}a38 38 0 0 1 76 0V700"/>`).join('')}</g><path d="M0 620Q300 520 600 600T1200 560V700H0Z" fill="#012814" opacity=".6"/></svg>`;
const H=$('#hero');
H.innerHTML=SL.map((s,i)=>`<div class="sl" role="group" aria-label="${i+1} of ${SL.length}"><div class="scene">${sc(s[5],i)}</div><div class="wrap cp"><div class="cap">${s[0]}</div><h1>${s[1]}</h1><p>${s[2]}</p><div><a class="btn" href="${s[4]}" style="background:var(--r);border-color:var(--r);color:#fff">${s[3]}</a></div></div></div>`).join('')+
`<div class="ctl"><div class="wrap"><div class="bars">${SL.map((s,i)=>`<button class="bar" aria-label="Slide ${i+1}"><i></i><span>${s[0]}</span></button>`).join('')}</div><span class="sp"></span><button class="ar" id="pv" aria-label="Previous">←</button><button class="ar" id="nx" aria-label="Next">→</button></div></div>`;
let cur=0,tm;const T=7000;H.style.setProperty('--t',T+'ms');
function go(n){cur=(n+SL.length)%SL.length;$$('.sl').forEach((e,i)=>e.classList.toggle('on',i===cur));$$('.bar').forEach((b,i)=>{b.classList.remove('on');if(i===cur){void b.offsetWidth;b.classList.add('on')}});clearTimeout(tm);if(!RM&&!H.classList.contains('p'))tm=setTimeout(()=>go(cur+1),T)}
$('#nx').onclick=()=>go(cur+1);$('#pv').onclick=()=>go(cur-1);$$('.bar').forEach((b,i)=>b.onclick=()=>go(i));
// FIX: hover-pause only on devices that really hover; on touch screens a tap
// fires mouseenter and the slider would stay paused forever.
if(matchMedia('(hover:hover)').matches){H.onmouseenter=()=>{H.classList.add('p');clearTimeout(tm)};H.onmouseleave=()=>{H.classList.remove('p');go(cur)}}
let x0;H.addEventListener('touchstart',e=>x0=e.touches[0].clientX,{passive:true});H.addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-x0;if(Math.abs(d)>50)go(cur+(d<0?1:-1))});
addEventListener('keydown',e=>{if(e.key==='ArrowRight')go(cur+1);if(e.key==='ArrowLeft')go(cur-1)});go(0);
// header, menu, top button
addEventListener('scroll',()=>{$('#hd').classList.toggle('s',scrollY>10);$('#up').classList.toggle('v',scrollY>700)},{passive:true});
$('#up').onclick=()=>scrollTo({top:0});
$('#bg').onclick=()=>$('#nv').classList.toggle('o');$$('#nv a').forEach(a=>a.onclick=()=>$('#nv').classList.remove('o'));
// reveal + counters
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;e.target.classList.add('in');e.target.querySelectorAll('[data-c]').forEach(c=>{const to=+c.dataset.c,t0=performance.now();(function f(t){const k=Math.min(1,(t-t0)/1700),v=Math.round(to*(1-Math.pow(1-k,4)));c.textContent=to>=5000?v.toLocaleString():v;if(k<1)requestAnimationFrame(f)})(t0)});io.unobserve(e.target)}),{threshold:.2});
const rv=()=>$$('[data-r]:not(.in)').forEach(e=>io.observe(e));
// academics
const ST=[['Early Years','Where wonder begins','Play-led discovery builds language, number sense, confidence and the habit of asking why.',['Play-based learning','Early language and literacy','Social and emotional growth']],
['Nursery','Strong foundations','Structured routines, early reading and creative exploration prepare each child for formal learning.',['Phonics and early reading','Early numeracy','Music, art and movement']],
['Primary','Curious, capable, confident','A blended Nigerian–British curriculum, supported by clubs, coding and leadership opportunities.',['Core subjects','Coding and robotics','Clubs and leadership']],
['Secondary','Ready for what’s next','Rigorous subject teaching, debate, journalism and leadership prepare students for external examinations and beyond.',['Junior Secondary programme','Debate and public speaking','Examination preparation']]];
ST.forEach((s,i)=>{const b=document.createElement('button');b.className='tab';b.setAttribute('role','tab');b.textContent=s[0];b.onclick=()=>pick(i);$('#tabs').appendChild(b)});
function pick(i){$$('.tab').forEach((b,j)=>b.setAttribute('aria-selected',i===j));const s=ST[i];$('#pn').innerHTML=`<div class="pn"><div><h3>${s[1]}</h3><p>${s[2]}</p></div><ul>${s[3].map(x=>`<li>${x}</li>`).join('')}</ul></div>`}pick(0);
// news
[['2025','Schools debate','Our secondary section takes part in the ICPC-backed schools debate for International Anti-Corruption Day.'],['2023','Ayo L’áyo Club','An after-school programme built on the traditional African board game Ayo Olopon is documented.'],['2021','FCTA recognition','The FCT Minister acknowledges the school’s place among the nation’s top private primary schools.'],['2026','New session','The 2026/2027 session opens, with teaching and early years roles advertised.']].forEach((n,i)=>{const d=document.createElement('div');d.className='card';d.dataset.r='';d.style.setProperty('--d',i*.1+'s');d.innerHTML=`<div class="im">${sc(['#028c42','#014a22','#ffffff'],i+4).replace('viewBox="0 0 1200 700"','viewBox="0 200 1200 300"')}</div><div class="t"><div class="cap">${n[0]}</div><h4>${n[1]}</h4><p>${n[2]}</p></div>`;$('#cards').appendChild(d)});
['Sports','JET Club','Arts & Crafts','Music & Choir','Debate Club','Coding & Robotics','Drama','Environmental Club','Journalism','Chess Club','Volunteering','Dance'].forEach(a=>{const p=document.createElement('span');p.className='pill';p.textContent=a;$('#pills').appendChild(p)});
[['Library','5,000+ books reported'],['Science laboratory','Hands-on discovery'],['ICT &amp; language labs','Technology and languages'],['Multipurpose hall','Assemblies and events'],['Music room','Choir and instruments'],['Sports facilities','Indoor and outdoor'],['Playground','Safe space to play'],['Security','On-campus security']].forEach(f=>{const d=document.createElement('div');d.innerHTML=`<b>${f[0]}</b><span>${f[1]}</span>`;$('#fac').appendChild(d)});
rv();
// form
$('#f').onsubmit=e=>{e.preventDefault();let ok=true;['n','e','m'].forEach(id=>{const i=$('#'+id),v=i.value.trim(),good=v&&(id!=='e'||/^\S+@\S+\.\S+$/.test(v));i.parentElement.classList.toggle('bad',!good);if(!good)ok=false});if(!ok)return;
$('#ok').style.display='block';location.href='mailto:bloomingheritagesecsch@gmail.com?subject='+encodeURIComponent('Admissions enquiry: '+$('#s').value)+'&body='+encodeURIComponent(`Name: ${$('#n').value}\nEmail: ${$('#e').value}\nStage: ${$('#s').value}\n\n${$('#m').value}`)};
