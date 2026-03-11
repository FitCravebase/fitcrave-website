import { useState, useEffect, useRef, useCallback } from "react";

// POLYFILL FOR WINDOW.STORAGE
if (typeof window !== 'undefined' && !window.storage) {
  window.storage = {
    get: async (k) => { const v = localStorage.getItem(k); return v ? { value: v } : null; },
    set: async (k, v) => localStorage.setItem(k, v)
  };
}



const L={bg:"#FAFAF8",bg2:"#F0EDE6",bg3:"#FFF",tx:"#0F0F0F",tx2:"#3D3D3D",tx3:"#888",ac:"#6D28D9",ac2:"#8B5CF6",acS:"#EDE9FE",bd:"#DDD9D2",gls:"rgba(250,250,248,.85)",sh2:"0 12px 64px rgba(109,40,217,.14)",ok:"#059669",okB:"#ECFDF5",warn:"#D97706"};
const D={bg:"#07070B",bg2:"#0D0D15",bg3:"#14141E",tx:"#F0F0F5",tx2:"#9898B0",tx3:"#55556B",ac:"#A78BFA",ac2:"#C4B5FD",acS:"rgba(167,139,250,.1)",bd:"#1E1E32",gls:"rgba(7,7,11,.82)",sh2:"0 12px 64px rgba(167,139,250,.1)",ok:"#34D399",okB:"rgba(52,211,153,.08)",warn:"#FBBF24"};

function Rv({children,delay,y}){const ref=useRef(null);const[v,setV]=useState(false);
useEffect(()=>{const el=ref.current;if(!el)return;const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)setV(true)},{threshold:.08});o.observe(el);return()=>o.disconnect()},[]);
return <div ref={ref} style={{opacity:v?1:0,transform:v?"none":`translateY(${y||36}px)`,transition:`all .9s cubic-bezier(.16,1,.3,1) ${delay||0}s`}}>{children}</div>}

function Counter({end,suffix}){const[val,setVal]=useState(0);const ref=useRef(null);const[on,setOn]=useState(false);
useEffect(()=>{const el=ref.current;if(!el)return;const o=new IntersectionObserver(([e])=>{if(e.isIntersecting&&!on)setOn(true)},{threshold:.3});o.observe(el);return()=>o.disconnect()},[on]);
useEffect(()=>{if(!on)return;const s=Date.now();const tick=()=>{const p=Math.min((Date.now()-s)/2000,1);setVal(Math.round((1-Math.pow(1-p,3))*end));if(p<1)requestAnimationFrame(tick)};tick()},[on,end]);
return <span ref={ref}>{val.toLocaleString()}{suffix||""}</span>}

function Tilt({children,style,glow}){const ref=useRef(null);const[tf,setTf]=useState("");const[hov,setHov]=useState(false);
const onM=useCallback(e=>{const el=ref.current;if(!el)return;const rc=el.getBoundingClientRect(),x=(e.clientX-rc.left)/rc.width-.5,y=(e.clientY-rc.top)/rc.height-.5;setTf(`perspective(900px) rotateY(${x*8}deg) rotateX(${-y*8}deg) scale(1.02)`);setHov(true)},[]);
return <div ref={ref} onMouseMove={onM} onMouseLeave={()=>{setTf("");setHov(false)}} style={{transform:tf||"none",transition:"transform .5s cubic-bezier(.16,1,.3,1), box-shadow .4s",boxShadow:hov?`0 0 30px ${glow}, 0 0 60px ${glow}`:"none",...(style||{})}}>{children}</div>}

function Avatar({src,initials,size,acG}){
if(src)return <img src={src} alt="" style={{width:size,height:size,borderRadius:"50%",objectFit:"cover",flexShrink:0}}/>;
return <div style={{width:size,height:size,borderRadius:"50%",background:acG,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontFamily:"'Instrument Serif',serif",fontStyle:"italic",fontSize:size*.38,flexShrink:0}}>{initials}</div>}

const I={
br:()=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2a5 5 0 014.85 3.78A4 4 0 0120 9.5a4 4 0 01-1.41 3.05A4.5 4.5 0 0116 21H8a4.5 4.5 0 01-2.59-8.45A4 4 0 014 9.5a4 4 0 013.15-3.72A5 5 0 0112 2z"/></svg>,
fk:()=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 2v7a2 2 0 002 2h4a2 2 0 002-2V2M7 2v20M21 15V2a5 5 0 00-5 5v6a2 2 0 002 2h3v7"/></svg>,
tg:()=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
zp:()=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
sh:()=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
us:()=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/></svg>,
tr:()=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
sc:()=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2"/><rect x="7" y="7" width="10" height="10" rx="1"/></svg>,
ar:()=><svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="1" y1="7" x2="11" y2="7"/><polyline points="7 3 11 7 7 11"/></svg>,
trophy:()=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 9H4.5a2.5 2.5 0 010-5H6M18 9h1.5a2.5 2.5 0 000-5H18M4 22h16M10 14.66V17a1 1 0 01-.97 1.21C7.85 18.75 7 20 7 22M14 14.66V17a1 1 0 00.97 1.21C16.15 18.75 17 20 17 22M18 2H6v7a6 6 0 1012 0V2z"/></svg>,
flame:()=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1-2-.2-4 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 002.5 2.5z"/></svg>,
};

export default function App(){
const[mode,setMode]=useState("dark");const[scrolled,setScrolled]=useState(false);const[email,setEmail]=useState("");const[uname,setUname]=useState("");const[goal,setGoal]=useState("");const[submitted,setSubmitted]=useState(false);const[loading,setLoading]=useState(false);const[openFaq,setOpenFaq]=useState(null);const[mobNav,setMobNav]=useState(false);const[heroIn,setHeroIn]=useState(false);const[showAdmin,setShowAdmin]=useState(false);const[adminAuth,setAdminAuth]=useState(false);const[adminPwd,setAdminPwd]=useState("");const[adminTab,setAdminTab]=useState("founder");const[wlCount,setWlCount]=useState(0);const[wl,setWl]=useState([]);const[team,setTeam]=useState([]);
const[founder,setFounder]=useState({name:"Charan Teja",role:"FOUNDER & CEO",education:"IIT Kharagpur · Dual Degree · Ocean Engineering",bio:"\"I built FitCrave because I lived the problem. Every app tracked — none executed. So I'm building the system that turns discipline into identity.\"",initials:"CT",photo:""});
const[settings,setSettings]=useState({appLaunched:false,downloadUrl:"",announcement:""});
const[form,setForm]=useState({name:"",role:"",education:"",bio:"",initials:"",photo:""});const[editIdx,setEditIdx]=useState(null);const[annText,setAnnText]=useState("");const[dlUrl,setDlUrl]=useState("");

const t=mode==="dark"?D:L;const SF="'Instrument Serif',Georgia,serif";const SS="'Syne',system-ui,sans-serif";const SM="'JetBrains Mono',monospace";
const acG=mode==="dark"?"linear-gradient(135deg,#C4B5FD,#A78BFA 40%,#7C3AED)":"linear-gradient(135deg,#6D28D9,#7C3AED 40%,#A78BFA)";
const acT={background:acG,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"};
const acGlow=mode==="dark"?{filter:"drop-shadow(0 0 24px rgba(167,139,250,.5))"}:{filter:"drop-shadow(0 0 18px rgba(109,40,217,.35))"};
const W={maxWidth:1200,margin:"0 auto",padding:"0 32px"};const vld=email.includes("@")&&email.includes(".");
const ib=Icon=><div style={{width:40,height:40,borderRadius:11,background:t.acS,display:"flex",alignItems:"center",justifyContent:"center",color:t.ac,flexShrink:0}}><Icon/></div>;
const inpS={width:"100%",padding:"14px 16px",borderRadius:11,border:`1.5px solid ${t.bd}`,background:t.bg,color:t.tx,fontSize:".9rem",outline:"none",fontFamily:SS};
const lblS={fontFamily:SM,fontSize:".6rem",fontWeight:700,color:t.tx3,letterSpacing:".1em",display:"block",marginBottom:7};

useEffect(()=>{setTimeout(()=>setHeroIn(true),300)},[]);
useEffect(()=>{const fn=()=>setScrolled(scrollY>50);addEventListener("scroll",fn,{passive:true});return()=>removeEventListener("scroll",fn)},[]);
useEffect(()=>{(async()=>{try{const r=await window.storage.get("fc_wl");if(r){const d=JSON.parse(r.value);setWl(d);setWlCount(d.length)}}catch(e){}try{const r=await window.storage.get("fc_team");if(r)setTeam(JSON.parse(r.value))}catch(e){}try{const r=await window.storage.get("fc_founder");if(r)setFounder(JSON.parse(r.value))}catch(e){}try{const r=await window.storage.get("fc_settings");if(r){const s=JSON.parse(r.value);setSettings(s);setAnnText(s.announcement||"");setDlUrl(s.downloadUrl||"")}}catch(e){}})()},[showAdmin]);
useEffect(()=>{const fn=e=>{if(e.ctrlKey&&e.shiftKey&&e.key==="A"){e.preventDefault();setShowAdmin(v=>!v)}};addEventListener("keydown",fn);return()=>removeEventListener("keydown",fn)},[]);

const saveWl=async entry=>{try{let l=[];try{const r=await window.storage.get("fc_wl");if(r)l=JSON.parse(r.value)}catch(e){}l.push({...entry,id:Date.now(),ts:new Date().toISOString()});await window.storage.set("fc_wl",JSON.stringify(l));setWl(l);setWlCount(l.length)}catch(e){}};
const go=id=>{document.getElementById(id)?.scrollIntoView({behavior:"smooth"});setMobNav(false)};
const doSubmit=async()=>{if(!vld)return;setLoading(true);await saveWl({email,name:uname||"—",goal:goal||"—"});setTimeout(()=>{setSubmitted(true);setLoading(false)},1200)};
const handlePhoto=cb=>{const inp=document.createElement("input");inp.type="file";inp.accept="image/*";inp.onchange=e=>{const f=e.target.files?.[0];if(!f)return;if(f.size>500000){alert("Max 500KB");return}const r=new FileReader();r.onload=ev=>cb(ev.target.result);r.readAsDataURL(f)};inp.click()};
const exportCSV=()=>{const csv="Email,Name,Goal,Date\n"+wl.map(r=>`${r.email},${r.name},${r.goal},${r.ts}`).join("\n");const b=new Blob([csv],{type:"text/csv"});const u=URL.createObjectURL(b);const a=document.createElement("a");a.href=u;a.download="fitcrave-waitlist.csv";a.click()};

const navItems=[{l:"Problem",id:"problem"},{l:"System",id:"solution"},{l:"Community",id:"community"},{l:"FAQ",id:"faq"}];
const heroCTA=settings.appLaunched?{text:"Download Now",action:()=>{if(settings.downloadUrl)window.open(settings.downloadUrl,"_blank")}}:{text:"Join the Waitlist",action:()=>go("waitlist")};
const allMembers=[founder,...team];const marquee=[...allMembers,...allMembers];

// Generate CSS particles
const particles=Array.from({length:40},(_,i)=>({
  left:`${Math.random()*100}%`,top:`${Math.random()*100}%`,
  size:2+Math.random()*3,delay:Math.random()*8,dur:4+Math.random()*6,
  opacity:.1+Math.random()*.25
}));

return (
  <div style={{fontFamily:SS,background:t.bg,color:t.tx,minHeight:"100vh",overflowX:"hidden"}}>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet"/>
<style>{`*{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth;-webkit-font-smoothing:antialiased}body{overflow-x:hidden}::selection{background:${t.ac}22}input::placeholder{color:${t.tx3}}
@keyframes float{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-20px) scale(1.1)}}
@keyframes pulse2{0%,100%{opacity:.3}50%{opacity:.9}}
@keyframes scaleIn{from{opacity:0;transform:scale(.92)}to{opacity:1;transform:scale(1)}}
@keyframes teamScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes mTick{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes orbF{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
.na{color:${t.tx2};text-decoration:none;font-size:.78rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;transition:color .25s}.na:hover{color:${t.ac}}
.mb{transition:all .35s}.mb:hover{transform:translateY(-2px);box-shadow:${t.sh2}}
@media(max-width:860px){.dn{display:none!important}.mt{display:flex!important}.hf{flex-direction:column!important;text-align:center!important}.hf>div:first-child{align-items:center!important}.g3{grid-template-columns:1fr!important}.g2{grid-template-columns:1fr!important}.id2x2{grid-template-columns:1fr!important}.hh{font-size:clamp(2.2rem,7.5vw,3rem)!important}.sh{font-size:clamp(1.6rem,5.5vw,2.4rem)!important}.hv{max-width:320px!important;margin:0 auto!important}}
@media(min-width:861px){.mt{display:none!important}.mm{display:none!important}}`}</style>

{/* ADMIN */}
{showAdmin&&<div style={{position:"fixed",inset:0,zIndex:10000,background:"rgba(0,0,0,.88)",backdropFilter:"blur(20px)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={()=>setShowAdmin(false)}>
<div onClick={e=>e.stopPropagation()} style={{background:t.bg3,border:`1px solid ${t.bd}`,borderRadius:20,padding:28,maxWidth:800,width:"100%",maxHeight:"85vh",overflow:"auto"}}>
{!adminAuth?<div style={{textAlign:"center",padding:40}}>
<h3 style={{fontWeight:700,marginBottom:16}}>Admin Access</h3>
<input type="password" value={adminPwd} onChange={e=>setAdminPwd(e.target.value)} placeholder="Password" style={{...inpS,maxWidth:300,margin:"0 auto",display:"block",textAlign:"center",marginBottom:12}} onKeyDown={e=>{if(e.key==="Enter"&&adminPwd==="fitcrave2025")setAdminAuth(true)}}/>
<button onClick={()=>{if(adminPwd==="fitcrave2025")setAdminAuth(true)}} style={{background:t.ac,color:"#fff",border:"none",borderRadius:8,padding:"10px 32px",fontWeight:700,cursor:"pointer"}}>Login</button>
<p style={{fontSize:".6rem",color:t.tx3,marginTop:12,fontFamily:SM}}>Ctrl+Shift+A to toggle</p>
</div>:<div>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:20}}><h3 style={{fontWeight:700}}>Admin</h3><button onClick={()=>setShowAdmin(false)} style={{background:"none",border:`1px solid ${t.bd}`,borderRadius:8,width:36,height:36,cursor:"pointer",color:t.tx,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button></div>
<div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
{["founder","team","waitlist","settings"].map(tab=><button key={tab} onClick={()=>setAdminTab(tab)} style={{background:adminTab===tab?t.ac:"transparent",color:adminTab===tab?"#fff":t.tx2,border:`1px solid ${adminTab===tab?t.ac:t.bd}`,borderRadius:8,padding:"8px 16px",fontSize:".72rem",fontWeight:700,cursor:"pointer",fontFamily:SM,textTransform:"capitalize"}}>{tab}{tab==="team"?` (${team.length})`:tab==="waitlist"?` (${wl.length})`:""}</button>)}
</div>

{adminTab==="founder"&&<div style={{background:t.bg2,borderRadius:12,padding:20,border:`1px solid ${t.bd}`}}>
<h4 style={{fontSize:".82rem",fontWeight:700,marginBottom:14}}>Edit Founder</h4>
<div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
<Avatar src={founder.photo} initials={founder.initials} size={44} acG={acG}/>
<button onClick={()=>handlePhoto(src=>setFounder({...founder,photo:src}))} style={{background:t.acS,color:t.ac,border:"none",borderRadius:8,padding:"6px 14px",fontSize:".7rem",fontWeight:700,cursor:"pointer",fontFamily:SM}}>{founder.photo?"Change":"Upload"} Photo</button>
{founder.photo&&<button onClick={()=>setFounder({...founder,photo:""})} style={{background:"none",border:`1px solid ${t.bd}`,borderRadius:8,padding:"6px 12px",fontSize:".65rem",cursor:"pointer",color:t.tx3}}>Remove</button>}
</div>
<input value={founder.name} onChange={e=>setFounder({...founder,name:e.target.value})} placeholder="Name" style={{...inpS,marginBottom:10}}/>
<input value={founder.role} onChange={e=>setFounder({...founder,role:e.target.value})} placeholder="Role" style={{...inpS,marginBottom:10}}/>
<input value={founder.education} onChange={e=>setFounder({...founder,education:e.target.value})} placeholder="Education" style={{...inpS,marginBottom:10}}/>
<input value={founder.bio} onChange={e=>setFounder({...founder,bio:e.target.value})} placeholder="Bio" style={{...inpS,marginBottom:10}}/>
<button onClick={async()=>await window.storage.set("fc_founder",JSON.stringify(founder))} style={{background:t.ac,color:"#fff",border:"none",borderRadius:8,padding:"8px 20px",fontSize:".75rem",fontWeight:700,cursor:"pointer",fontFamily:SM}}>Save</button>
</div>}

{adminTab==="team"&&<div>
<div style={{background:t.bg2,borderRadius:12,padding:20,border:`1px solid ${t.bd}`,marginBottom:16}}>
<h4 style={{fontSize:".82rem",fontWeight:700,marginBottom:14}}>{editIdx!==null?"Edit":"Add"} Member</h4>
<div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
<Avatar src={form.photo} initials={form.initials||"?"} size={40} acG={acG}/>
<button onClick={()=>handlePhoto(src=>setForm({...form,photo:src}))} style={{background:t.acS,color:t.ac,border:"none",borderRadius:8,padding:"6px 14px",fontSize:".7rem",fontWeight:700,cursor:"pointer",fontFamily:SM}}>Upload Photo</button>
</div>
<input placeholder="Name *" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} style={{...inpS,marginBottom:10}}/>
<input placeholder="Role" value={form.role} onChange={e=>setForm({...form,role:e.target.value})} style={{...inpS,marginBottom:10}}/>
<input placeholder="Education" value={form.education} onChange={e=>setForm({...form,education:e.target.value})} style={{...inpS,marginBottom:10}}/>
<input placeholder="Bio" value={form.bio} onChange={e=>setForm({...form,bio:e.target.value})} style={{...inpS,marginBottom:10}}/>
<button onClick={async()=>{if(!form.name)return;const m={...form,id:Date.now(),initials:form.initials||form.name.split(" ").map(w=>w[0]).join("").toUpperCase().slice(0,2)};let nt;if(editIdx!==null){nt=team.map((x,i)=>i===editIdx?{...x,...m}:x);setEditIdx(null)}else{nt=[...team,m]}await window.storage.set("fc_team",JSON.stringify(nt));setTeam(nt);setForm({name:"",role:"",education:"",bio:"",initials:"",photo:""})}} style={{background:t.ac,color:"#fff",border:"none",borderRadius:8,padding:"8px 20px",fontSize:".75rem",fontWeight:700,cursor:"pointer",fontFamily:SM}}>{editIdx!==null?"Update":"Add"}</button>
{editIdx!==null&&<button onClick={()=>{setEditIdx(null);setForm({name:"",role:"",education:"",bio:"",initials:"",photo:""})}} style={{background:"none",border:`1px solid ${t.bd}`,borderRadius:8,padding:"8px 16px",fontSize:".72rem",cursor:"pointer",color:t.tx3,marginLeft:8}}>Cancel</button>}
</div>
{team.map((m,i)=><div key={m.id||i} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",background:t.bg2,borderRadius:12,border:`1px solid ${t.bd}`,marginBottom:8}}>
<Avatar src={m.photo} initials={m.initials} size={36} acG={acG}/>
<div style={{flex:1}}><div style={{fontSize:".82rem",fontWeight:700}}>{m.name}</div><div style={{fontSize:".62rem",color:t.ac,fontFamily:SM}}>{m.role}</div></div>
<button onClick={()=>{setEditIdx(i);setForm({name:m.name,role:m.role||"",education:m.education||"",bio:m.bio||"",initials:m.initials||"",photo:m.photo||""})}} style={{background:"none",border:"none",cursor:"pointer",color:t.tx3,fontSize:".72rem"}}>Edit</button>
<button onClick={async()=>{const nt=team.filter((_,idx)=>idx!==i);await window.storage.set("fc_team",JSON.stringify(nt));setTeam(nt)}} style={{background:"none",border:"none",cursor:"pointer",color:"#EF4444",fontSize:".72rem"}}>Del</button>
</div>)}
</div>}

{adminTab==="waitlist"&&<div>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:16}}><p style={{fontFamily:SM,fontSize:".72rem",color:t.tx3}}>{wl.length} signups</p><button onClick={exportCSV} style={{background:t.acS,color:t.ac,border:"none",borderRadius:8,padding:"6px 14px",fontSize:".72rem",fontWeight:700,cursor:"pointer",fontFamily:SM}}>Export CSV</button></div>
{wl.length===0?<p style={{color:t.tx3,textAlign:"center",padding:30}}>No signups yet.</p>:
<div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontSize:".72rem",fontFamily:SM}}><thead><tr style={{background:t.bg2}}>{["#","Email","Name","Goal","Date"].map(h=><th key={h} style={{padding:"8px 10px",textAlign:"left",fontWeight:700,color:t.tx3}}>{h}</th>)}</tr></thead><tbody>{wl.map((r,i)=><tr key={i} style={{borderTop:`1px solid ${t.bd}`}}><td style={{padding:"8px 10px",color:t.tx3}}>{i+1}</td><td style={{padding:"8px 10px",color:t.ac,fontWeight:600}}>{r.email}</td><td style={{padding:"8px 10px"}}>{r.name}</td><td style={{padding:"8px 10px"}}>{r.goal}</td><td style={{padding:"8px 10px",color:t.tx3}}>{new Date(r.ts).toLocaleDateString()}</td></tr>)}</tbody></table></div>}
</div>}

{adminTab==="settings"&&<div>
<h4 style={{fontSize:".85rem",fontWeight:700,marginBottom:12}}>App Launch</h4>
<div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
<div onClick={()=>{const ns={...settings,appLaunched:!settings.appLaunched};setSettings(ns);window.storage.set("fc_settings",JSON.stringify(ns))}} style={{width:44,height:24,borderRadius:12,background:settings.appLaunched?t.ok:t.bd,position:"relative",cursor:"pointer"}}><div style={{width:18,height:18,borderRadius:"50%",background:"#fff",position:"absolute",top:3,left:settings.appLaunched?23:3,transition:"left .3s"}}/></div>
<span style={{fontSize:".82rem",fontWeight:600}}>App launched</span></div>
<label style={lblS}>DOWNLOAD URL</label>
<div style={{display:"flex",gap:8,marginBottom:24}}><input value={dlUrl} onChange={e=>setDlUrl(e.target.value)} placeholder="https://play.google.com/..." style={{...inpS,flex:1}}/><button onClick={()=>{const ns={...settings,downloadUrl:dlUrl};setSettings(ns);window.storage.set("fc_settings",JSON.stringify(ns))}} style={{background:t.ac,color:"#fff",border:"none",borderRadius:8,padding:"0 18px",fontSize:".72rem",fontWeight:700,cursor:"pointer",fontFamily:SM}}>Save</button></div>
<h4 style={{fontSize:".85rem",fontWeight:700,marginBottom:8}}>Announcement</h4>
<div style={{display:"flex",gap:8}}><input value={annText} onChange={e=>setAnnText(e.target.value)} placeholder="e.g. FitCrave is live!" style={{...inpS,flex:1}}/><button onClick={()=>{const ns={...settings,announcement:annText};setSettings(ns);window.storage.set("fc_settings",JSON.stringify(ns))}} style={{background:t.ac,color:"#fff",border:"none",borderRadius:8,padding:"0 18px",fontSize:".72rem",fontWeight:700,cursor:"pointer",fontFamily:SM}}>Save</button></div>
</div>}
</div>}
</div></div>}

{settings.announcement&&<div style={{background:acG,color:"#fff",textAlign:"center",padding:"10px 20px",fontSize:".78rem",fontWeight:600,zIndex:1001,position:"relative"}}>{settings.announcement}</div>}

{/* NAV */}
<nav style={{position:"fixed",top:settings.announcement?38:0,left:0,right:0,zIndex:1000,background:scrolled?t.gls:"transparent",backdropFilter:scrolled?"blur(24px) saturate(180%)":"none",borderBottom:scrolled?`1px solid ${t.bd}`:"1px solid transparent",transition:"all .4s"}}>
<div style={{...W,display:"flex",alignItems:"center",justifyContent:"space-between",height:68}}>
<div onClick={()=>scrollTo({top:0,behavior:"smooth"})} style={{display:"flex",alignItems:"center",gap:12,cursor:"pointer"}}>
<div style={{width:34,height:34,borderRadius:9,background:acG,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 16px rgba(139,92,246,.4)"}}><svg width="20" height="20" viewBox="0 0 32 32" fill="none"><path d="M4 20 L9 20 L12 12 L15 24 L18 8 L21 18 L24 14 L28 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M25 11 L28 14 L25 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
<span style={{fontFamily:SF,fontSize:"1.3rem"}}>Fit<span style={{fontStyle:"italic"}}>Crave</span></span>
</div>
<div className="dn" style={{display:"flex",alignItems:"center",gap:34}}>
{navItems.map(n=><a key={n.id} className="na" onClick={()=>go(n.id)}>{n.l}</a>)}
<button onClick={()=>setMode(m=>m==="dark"?"light":"dark")} style={{background:"none",border:`1.5px solid ${t.bd}`,borderRadius:9,width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:t.tx2,fontSize:".95rem"}}>{mode==="dark"?"☀":"☾"}</button>
<button className="mb" onClick={heroCTA.action} style={{background:acG,color:"#fff",border:"none",borderRadius:9,padding:"9px 22px",fontSize:".8rem",fontWeight:700,cursor:"pointer"}}>{settings.appLaunched?"Download":"Early Access"}</button>
</div>
<div className="mt" style={{display:"flex",alignItems:"center",gap:10}}>
<button onClick={()=>setMode(m=>m==="dark"?"light":"dark")} style={{background:"none",border:"none",color:t.tx2,cursor:"pointer",fontSize:"1rem"}}>{mode==="dark"?"☀":"☾"}</button>
<button onClick={()=>setMobNav(!mobNav)} style={{background:"none",border:`1.5px solid ${t.bd}`,borderRadius:8,width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:t.tx}}>{mobNav?"✕":"☰"}</button>
</div></div>
{mobNav&&<div className="mm" style={{background:t.gls,backdropFilter:"blur(24px)",padding:"12px 32px 24px",borderTop:`1px solid ${t.bd}`}}>
{navItems.map(n=><a key={n.id} onClick={()=>go(n.id)} style={{display:"block",padding:"14px 0",color:t.tx2,fontSize:".9rem",fontWeight:600,cursor:"pointer",borderBottom:`1px solid ${t.bd}`}}>{n.l}</a>)}
<button onClick={heroCTA.action} style={{width:"100%",marginTop:16,background:acG,color:"#fff",border:"none",borderRadius:12,padding:14,fontSize:".9rem",fontWeight:700,cursor:"pointer"}}>{heroCTA.text}</button>
</div>}</nav>

{/* HERO */}
<section style={{minHeight:"100vh",display:"flex",alignItems:"center",paddingTop:settings.announcement?140:100,paddingBottom:50,position:"relative",overflow:"hidden"}}>
{/* FloatingOrbs — gradient blur circles */}
<div style={{position:"absolute",top:"-8%",left:"-10%",width:420,height:420,borderRadius:"50%",background:`radial-gradient(circle,${t.ac}30,${t.ac}05)`,filter:"blur(80px)",opacity:.6,animation:"orbF 8s ease-in-out infinite",pointerEvents:"none"}} />
<div style={{position:"absolute",bottom:"5%",right:"-8%",width:350,height:350,borderRadius:"50%",background:`radial-gradient(circle,${t.ac2}25,${t.ac2}03)`,filter:"blur(70px)",opacity:.5,animation:"orbF 10s ease-in-out 2s infinite",pointerEvents:"none"}} />
<div style={{position:"absolute",top:"40%",left:"50%",width:250,height:250,borderRadius:"50%",background:`radial-gradient(circle,${t.ac}18,transparent)`,filter:"blur(60px)",opacity:.4,animation:"orbF 7s ease-in-out 1s infinite",pointerEvents:"none"}} />
{particles.map((p,i)=> <div key={i} style={{position:"absolute",left:p.left,top:p.top,width:p.size,height:p.size,borderRadius:"50%",background:t.ac,opacity:p.opacity,animation:`float ${p.dur}s ease-in-out ${p.delay}s infinite`,pointerEvents:"none"}} />)}
<div style={{...W,position:"relative",zIndex:2,width:"100%"}}><div className="hf" style={{display:"flex",gap:56,alignItems:"center"}}>
<div style={{flex:"1 1 55%",display:"flex",flexDirection:"column",alignItems:"flex-start",gap:28}}>
<div style={{opacity:heroIn?1:0,transform:heroIn?"none":"translateY(20px)",transition:"all .7s .2s",display:"inline-flex",alignItems:"center",gap:8,border:`1px solid ${t.ac}25`,borderRadius:100,padding:"7px 18px 7px 12px",background:`${t.ac}08`}}><span style={{width:6,height:6,borderRadius:"50%",background:t.ok,boxShadow:`0 0 8px ${t.ok}`,animation:"pulse2 2s ease infinite"}}/><span style={{fontSize:".7rem",fontWeight:700,color:t.ac,fontFamily:SM,letterSpacing:".06em",textTransform:"uppercase"}}>{settings.appLaunched?"Now Live":"Early Access"}{wlCount>0?` · ${wlCount}+ joined`:""}</span></div>
<h1 className="hh" style={{opacity:heroIn?1:0,transform:heroIn?"none":"translateY(40px)",transition:"all .9s .35s",fontSize:"clamp(2.8rem,4.8vw,4.5rem)",lineHeight:1.04,letterSpacing:"-.045em"}}><span style={{fontFamily:SS,fontWeight:800}}>Stop tracking.</span><br/><span key={"ht"+mode} style={{fontFamily:SF,fontStyle:"italic",...acT,...acGlow,display:"inline-block"}}>Start transforming.</span></h1>
<p style={{opacity:heroIn?1:0,transform:heroIn?"none":"translateY(24px)",transition:"all .8s .5s",fontSize:"1.08rem",lineHeight:1.75,color:t.tx2,maxWidth:480}}>AI plans your nutrition. Programs your workouts. Scores your health. And <em style={{fontFamily:SF,color:t.tx,fontStyle:"italic"}}>delivers macro-perfect meals to your door</em>.</p>
<div style={{opacity:heroIn?1:0,transform:heroIn?"none":"translateY(20px)",transition:"all .8s .65s",display:"flex",gap:14,flexWrap:"wrap"}}>
<button className="mb" onClick={heroCTA.action} style={{background:acG,color:"#fff",border:"none",borderRadius:13,padding:"15px 34px",fontSize:".93rem",fontWeight:700,cursor:"pointer",fontFamily:SS,display:"flex",alignItems:"center",gap:10,boxShadow:`0 2px 20px ${t.ac}30`}}>{heroCTA.text} {I.ar()}</button>
<button className="mb" onClick={()=>go("how")} style={{background:"transparent",color:t.tx,border:`1.5px solid ${t.bd}`,borderRadius:13,padding:"15px 26px",fontSize:".93rem",fontWeight:600,cursor:"pointer",fontFamily:SS}}>How It Works</button></div>
</div>
<div className="hv" style={{flex:"1 1 40%",display:"flex",justifyContent:"center",opacity:heroIn?1:0,transform:heroIn?"none":"translateY(40px) scale(.96)",transition:"all 1s .55s"}}><div style={{width:"100%",maxWidth:340,borderRadius:22,background:t.bg3,border:`1px solid ${t.bd}`,boxShadow:t.sh2,padding:"24px 20px",display:"flex",flexDirection:"column",gap:13}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:34,height:34,borderRadius:9,background:acG,display:"flex",alignItems:"center",justifyContent:"center"}}><svg width="20" height="20" viewBox="0 0 32 32" fill="none"><path d="M4 20 L9 20 L12 12 L15 24 L18 8 L21 18 L24 14 L28 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M25 11 L28 14 L25 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div><div><div style={{fontSize:".85rem",fontWeight:700}}>FitCrave</div><div style={{fontSize:".58rem",color:t.tx3,fontFamily:SM}}>Health Execution OS</div></div></div><span style={{fontSize:".56rem",fontFamily:SM,color:t.ok,fontWeight:600,background:t.okB,padding:"3px 9px",borderRadius:5}}>LIVE</span></div>
<div style={{background:t.bg2,borderRadius:15,padding:"16px 14px",border:`1px solid ${t.bd}`}}><div style={{fontSize:".56rem",fontFamily:SM,fontWeight:700,color:t.tx3,letterSpacing:".12em",marginBottom:8}}>HEALTH SCORE</div><div style={{display:"flex",alignItems:"baseline",gap:8}}><span key={"sc"+mode} style={{fontSize:"2.8rem",fontWeight:800,fontFamily:SM,lineHeight:1,...acT}}>78</span><span style={{fontSize:".78rem",fontWeight:700,color:t.ok}}>+4</span></div><div style={{marginTop:10,height:4,borderRadius:2,background:t.bd,overflow:"hidden"}}><div style={{width:"78%",height:"100%",borderRadius:2,background:acG}}/></div></div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:7}}>{[{l:"Protein",v:"126g",p:90,c:"#8B5CF6"},{l:"Calories",v:"1,840",p:87,c:"#06B6D4"},{l:"Water",v:"2.4L",p:80,c:"#10B981"}].map((m,i)=><div key={i} style={{background:t.bg2,borderRadius:11,padding:"9px 7px",border:`1px solid ${t.bd}`,textAlign:"center"}}><div style={{fontSize:".5rem",fontFamily:SM,color:t.tx3,fontWeight:600}}>{m.l.toUpperCase()}</div><div style={{fontSize:".95rem",fontWeight:800,marginTop:2,fontFamily:SM}}>{m.v}</div><div style={{marginTop:4,height:2.5,borderRadius:2,background:t.bd,overflow:"hidden"}}><div style={{width:`${m.p}%`,height:"100%",borderRadius:2,background:m.c}}/></div></div>)}</div>
</div></div></div></div></section>

{/* STATS */}
<div style={{borderTop:`1px solid ${t.bd}`,borderBottom:`1px solid ${t.bd}`,padding:"36px 0",background:t.bg2}}>
<div style={{...W,display:"flex",justifyContent:"center",gap:48,flexWrap:"wrap",textAlign:"center"}}>
{[{end:540,suf:"M+",label:"Indians seeking health"},{end:43,suf:"M+",label:"College students"},{end:260,suf:"M+",label:"Working professionals"},{end:50,suf:"M+",label:"Active gym-goers"},{sp:"ZERO",label:"Own plan-to-plate"}].map((s,i)=><Rv key={i} delay={i*.06}><div style={{minWidth:100}}><div style={{fontSize:"1.5rem",fontWeight:800,fontFamily:SM,color:t.ac}}>{s.sp||<Counter end={s.end} suffix={s.suf}/>}</div><div style={{fontSize:".56rem",fontFamily:SM,color:t.tx3,marginTop:5}}>{s.label}</div></div></Rv>)}
</div></div>

{/* MARQUEE TICKER */}
<div style={{overflow:"hidden",padding:"18px 0",borderBottom:`1px solid ${t.bd}`,background:t.bg}}>
<div style={{display:"flex",width:"max-content",animation:"mTick 35s linear infinite"}}>
{[...Array(2)].map((_,rep) => <div key={rep} style={{display:"flex",alignItems:"center",whiteSpace:"nowrap"}}>
{["AI-Powered Nutrition","Macro-Perfect Meal Delivery","9-Dimension Health Score","Dark Kitchen Network","MealSnap Food Recognition","Menu Intelligence (Mess + Restaurant)","Dynamic Workout Programming","Bet Challenges with Real Stakes","National Leaderboard System","Identity Transformation Engine","Auto-Logged Delivery","₹299/mo Pro Plan","Community Challenges","Team vs Team Battles"].map((item,i) => <span key={i} style={{display:"inline-flex",alignItems:"center",gap:20,paddingRight:20}}>
<span style={{fontFamily:SM,fontSize:".68rem",fontWeight:600,color:t.ac,letterSpacing:".04em"}}>{item}</span>
<span style={{color:t.tx3,fontSize:".5rem"}}>◆</span>
</span>)}
</div>)}
</div>
</div>

{/* PROBLEM */}
<section id="problem" style={{padding:"120px 0"}}><div style={W}><Rv><div style={{maxWidth:680,marginBottom:60}}><span style={{fontFamily:SM,fontSize:".66rem",fontWeight:700,color:t.ac,letterSpacing:".14em",textTransform:"uppercase"}}>( 01 ) The Problem</span><h2 className="sh" style={{fontSize:"clamp(2rem,4vw,3rem)",lineHeight:1.08,letterSpacing:"-.04em",marginTop:20}}><span style={{fontFamily:SS,fontWeight:800}}>Fitness sells </span><span key={"p1"+mode} style={{fontFamily:SF,fontStyle:"italic",...acT}}>information.</span><br/><span style={{fontFamily:SS,fontWeight:800}}>You need </span><span key={"p2"+mode} style={{fontFamily:SF,fontStyle:"italic",...acT}}>execution.</span></h2></div></Rv>
<div className="g3" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>{[{n:"01",Ic:I.sc,tt:"Manual Tracking Fails",d:"73% abandon trackers in 2 weeks.",w:"MyFitnessPal"},{n:"02",Ic:I.tg,tt:"Plans Without Execution",d:"Plans nobody follows. Knowing ≠ doing.",w:"Diet Plans"},{n:"03",Ic:I.fk,tt:"Unhealthy by Default",d:"Delivery apps optimize for cravings.",w:"Swiggy/Zomato"},{n:"04",Ic:I.us,tt:"Coaching Doesn't Scale",d:"₹10K+/month. 540M+ priced out.",w:"Trainers"},{n:"05",Ic:I.zp,tt:"Trackers, Not Engines",d:"Records past. Never decides future.",w:"All Apps"},{n:"06",Ic:I.sh,tt:"India Gets Ignored",d:"Global apps miss Indian food.",w:"Western Apps"}].map((p,i)=><Rv key={i} delay={i*.05}><Tilt glow={`${t.ac}08`} style={{background:t.bg3,border:`1px solid ${t.bd}`,borderRadius:16,padding:"28px 22px",height:"100%"}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}><span style={{fontFamily:SM,fontSize:"1.8rem",fontWeight:700,color:`${t.ac}20`}}>{p.n}</span>{ib(p.Ic)}</div><h4 style={{fontSize:".95rem",fontWeight:700,marginBottom:8}}>{p.tt}</h4><p style={{fontSize:".82rem",color:t.tx2,lineHeight:1.65}}>{p.d}</p><div style={{marginTop:14,paddingTop:12,borderTop:`1px solid ${t.bd}`,fontSize:".6rem",fontFamily:SM,color:t.tx3}}>FAILS → {p.w}</div></Tilt></Rv>)}</div></div></section>

{/* SOLUTION */}
<section id="solution" style={{padding:"120px 0",background:t.bg2}}><div style={W}><Rv><div style={{maxWidth:680,marginBottom:60}}><span style={{fontFamily:SM,fontSize:".66rem",fontWeight:700,color:t.ac,letterSpacing:".14em",textTransform:"uppercase"}}>( 02 ) The System</span><h2 className="sh" style={{fontSize:"clamp(2rem,4vw,3rem)",lineHeight:1.08,letterSpacing:"-.04em",marginTop:20}}><span style={{fontFamily:SS,fontWeight:800}}>Two layers. </span><span key={"s1"+mode} style={{fontFamily:SF,fontStyle:"italic",...acT}}>One closed loop.</span></h2></div></Rv>
<div className="g2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18}}>{[{label:"SERVICE LAYER",Ic:I.br,title:"AI Health Intelligence",items:["Personalized macro & meal plans","AI food recognition","Dynamic workout programming","9-dimension health score","Menu AI (mess/canteen/restaurant)","Behavioral nudges"]},{label:"MANUFACTURING LAYER",Ic:I.fk,title:"Food Infrastructure",items:["Macro-standardized meals","Dark kitchen network","One-tap ordering","Auto-logged on delivery","₹139/meal, 20g+ protein","Partner → owned scale"]}].map((l,li)=><Rv key={li} delay={li*.1}><div style={{background:t.bg3,border:`1px solid ${t.bd}`,borderRadius:20,padding:"36px 28px",height:"100%"}}>{ib(l.Ic)}<span style={{fontFamily:SM,fontSize:".58rem",fontWeight:700,color:t.ac,letterSpacing:".14em",display:"block",margin:"14px 0 10px"}}>{l.label}</span><h3 style={{fontFamily:SF,fontSize:"1.45rem",fontStyle:"italic",lineHeight:1.25,marginBottom:20}}>{l.title}</h3>{l.items.map((item,ii)=><div key={ii} style={{display:"flex",gap:9,marginBottom:11}}><span style={{color:t.ac,fontSize:".65rem",flexShrink:0}}>▸</span><span style={{fontSize:".83rem",color:t.tx2,lineHeight:1.6}}>{item}</span></div>)}</div></Rv>)}</div></div></section>

{/* HOW IT WORKS */}
<section id="how" style={{padding:"120px 0"}}><div style={W}><Rv><div style={{maxWidth:580,marginBottom:60}}><span style={{fontFamily:SM,fontSize:".66rem",fontWeight:700,color:t.ac,letterSpacing:".14em",textTransform:"uppercase"}}>( 03 ) How It Works</span><h2 className="sh" style={{fontSize:"clamp(2rem,4vw,3rem)",lineHeight:1.08,letterSpacing:"-.04em",marginTop:20}}><span style={{fontFamily:SS,fontWeight:800}}>Six steps. </span><span key={"h1"+mode} style={{fontFamily:SF,fontStyle:"italic",...acT}}>One transformed life.</span></h2></div></Rv>
<div className="g3" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>{[{n:"01",Ic:I.tg,tt:"Set goals",d:"90-second onboard feeds AI."},{n:"02",Ic:I.br,tt:"AI builds system",d:"Personalized macros, meals, workouts."},{n:"03",Ic:I.zp,tt:"Execute",d:"One-tap meals. Log any menu."},{n:"04",Ic:I.sc,tt:"Auto-track",d:"Delivered meals auto-log. 9D score."},{n:"05",Ic:I.tr,tt:"AI adapts",d:"Weekly adjustments. No plateaus."},{n:"06",Ic:I.sh,tt:"Transform",d:"Streaks, leaderboards. You change."}].map((s,i)=><Rv key={i} delay={i*.06}><Tilt glow={`${t.ac}06`} style={{background:t.bg3,border:`1px solid ${t.bd}`,borderRadius:16,padding:"28px 22px",height:"100%"}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:16}}><span style={{fontFamily:SM,fontSize:".68rem",fontWeight:700,color:t.ac,background:t.acS,padding:"4px 11px",borderRadius:7}}>STEP {s.n}</span>{ib(s.Ic)}</div><h4 style={{fontFamily:SF,fontSize:"1.1rem",fontStyle:"italic",marginBottom:8}}>{s.tt}</h4><p style={{fontSize:".82rem",color:t.tx2,lineHeight:1.65}}>{s.d}</p></Tilt></Rv>)}</div></div></section>

{/* COMMUNITY */}
<section id="community" style={{padding:"120px 0",background:t.bg2}}><div style={W}>
<Rv><div style={{maxWidth:680,marginBottom:60}}><span style={{fontFamily:SM,fontSize:".66rem",fontWeight:700,color:t.ac,letterSpacing:".14em",textTransform:"uppercase"}}>( 04 ) Community</span><h2 className="sh" style={{fontSize:"clamp(2rem,4vw,3rem)",lineHeight:1.08,letterSpacing:"-.04em",marginTop:20}}><span style={{fontFamily:SS,fontWeight:800}}>Discipline is </span><span key={"cm"+mode} style={{fontFamily:SF,fontStyle:"italic",...acT}}>contagious.</span></h2></div></Rv>
<Rv delay={.08}><div style={{background:t.bg3,border:`1px solid ${t.bd}`,borderRadius:18,padding:"32px 28px",marginBottom:18}}>
<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>{ib(I.tr)}<h3 style={{fontSize:".95rem",fontWeight:700}}>The Identity Shift</h3></div>
<div style={{height:4,borderRadius:2,background:`linear-gradient(90deg,${t.tx3},${t.warn},${t.ac},${t.ok})`,marginBottom:20}}/>
<div className="id2x2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
{[{week:"Week 1",title:"Explorer",desc:"Trying the app. Features drive curiosity.",color:t.tx3},{week:"Week 2–3",title:"Tracker",desc:"Streaks begin. Score becomes personal.",color:t.warn},{week:"Month 1–2",title:"Consistent",desc:"Leaderboard rank matters. Streak is sacred.",color:t.ac},{week:"Month 3+",title:"Identity",desc:"FitCrave is a trait, not a tool.",color:t.ok}].map((s,i)=><div key={i} style={{background:t.bg2,borderRadius:12,padding:"20px 18px",border:`1px solid ${t.bd}`,borderTop:`3px solid ${s.color}`}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}><span style={{fontFamily:SM,fontSize:".55rem",fontWeight:700,color:s.color}}>{s.week.toUpperCase()}</span><div style={{width:10,height:10,borderRadius:"50%",background:s.color}}/></div><h4 style={{fontFamily:SF,fontStyle:"italic",fontSize:"1rem",marginBottom:6}}>{s.title}</h4><p style={{fontSize:".75rem",color:t.tx2,lineHeight:1.5}}>{s.desc}</p></div>)}</div></div></Rv>
<div className="g3" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
{[{Ic:I.trophy,title:"Bet Challenges",desc:"Pool money. Hit goal or lose stake.",tag:"STAKES"},{Ic:I.flame,title:"Transformation Battles",desc:"30/60-day competitions. Public leaderboard.",tag:"LONG-TERM"},{Ic:I.us,title:"Team vs Team",desc:"Hostel vs hostel. IIT KGP vs IIT Bombay.",tag:"TEAMS"}].map((ch,i)=><Rv key={i} delay={i*.06}><Tilt glow={`${t.ac}06`} style={{background:t.bg3,border:`1px solid ${t.bd}`,borderRadius:16,padding:"28px 22px",height:"100%"}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}>{ib(ch.Ic)}<span style={{fontFamily:SM,fontSize:".52rem",fontWeight:700,color:t.ac,background:t.acS,padding:"3px 10px",borderRadius:5}}>{ch.tag}</span></div><h4 style={{fontFamily:SF,fontStyle:"italic",fontSize:"1.05rem",marginBottom:8}}>{ch.title}</h4><p style={{fontSize:".8rem",color:t.tx2,lineHeight:1.65}}>{ch.desc}</p></Tilt></Rv>)}
</div></div></section>

{/* TEAM */}
<section style={{padding:"100px 0"}}><div style={W}><Rv><div style={{maxWidth:680,marginBottom:40}}><span style={{fontFamily:SM,fontSize:".66rem",fontWeight:700,color:t.ac,letterSpacing:".14em",textTransform:"uppercase"}}>( 05 ) The Team</span><h2 className="sh" style={{fontSize:"clamp(1.8rem,3.5vw,2.4rem)",lineHeight:1.08,letterSpacing:"-.03em",marginTop:20}}><span style={{fontFamily:SS,fontWeight:800}}>Built by </span><span key={"tm"+mode} style={{fontFamily:SF,fontStyle:"italic",...acT}}>people who live the problem.</span></h2></div></Rv></div>
<div style={{overflow:"hidden",padding:"8px 0"}}><div style={{display:"flex",gap:20,width:"max-content",animation:`teamScroll ${Math.max(allMembers.length*10,20)}s linear infinite`}}>
{marquee.map((m,i)=><div key={i} style={{minWidth:300,maxWidth:340,background:t.bg3,border:`1px solid ${t.bd}`,borderRadius:18,padding:"32px 26px",flexShrink:0}}>
<div style={{display:"flex",alignItems:"center",gap:14,marginBottom:16}}><Avatar src={m.photo} initials={m.initials} size={52} acG={acG}/><div><div style={{fontSize:".95rem",fontWeight:700}}>{m.name}</div><div style={{fontFamily:SM,fontSize:".65rem",color:t.ac,fontWeight:600}}>{m.role}</div>{m.education&&<div style={{fontFamily:SM,fontSize:".58rem",color:t.tx3}}>{m.education}</div>}</div></div>
{m.bio&&<p style={{fontFamily:SF,fontStyle:"italic",fontSize:".88rem",lineHeight:1.65,color:t.tx2}}>{m.bio}</p>}
</div>)}</div></div></section>

{/* FAQ */}
<section id="faq" style={{padding:"100px 0",background:t.bg2}}><div style={{...W,maxWidth:720}}>
<Rv><div style={{marginBottom:48}}><span style={{fontFamily:SM,fontSize:".66rem",fontWeight:700,color:t.ac,letterSpacing:".14em",textTransform:"uppercase"}}>( 06 ) FAQ</span><h2 className="sh" style={{fontSize:"clamp(1.8rem,3.5vw,2.4rem)",lineHeight:1.12,letterSpacing:"-.03em",marginTop:20}}><span style={{fontFamily:SF,fontStyle:"italic"}}>Questions.</span> <span style={{fontFamily:SS,fontWeight:800}}>Answers.</span></h2></div></Rv>
<Rv delay={.1}><div>{[{q:"What is FitCrave?",a:"AI health execution system. Nutrition, workouts, 9D scoring, meal delivery, community — all integrated."},{q:"Different from HealthifyMe?",a:"They record. We decide, deliver, and compete. Closed loop nobody else has."},{q:"Deliver meals?",a:"Yes. Dark kitchens, AI-designed meals, auto-logged."},{q:"Menu intelligence?",a:"Reads mess, canteen, restaurant menus. Tells you what to eat."},{q:"Bet challenges?",a:"Pool money. Hit goal = split pot. Miss = lose stake."},{q:"Who is this for?",a:"Students, professionals, gym-goers. Campus-first, expanding nationally."},{q:"Price?",a:"₹299/month. Founding members get lifetime pricing."}].map((f,i)=><div key={i} onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{padding:"18px 0",borderBottom:`1px solid ${t.bd}`,cursor:"pointer"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:16}}><h4 style={{fontSize:".9rem",fontWeight:600}}>{f.q}</h4><span style={{width:26,height:26,borderRadius:7,flexShrink:0,border:`1.5px solid ${openFaq===i?t.ac:t.bd}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:".8rem",color:openFaq===i?t.ac:t.tx3,transition:"all .3s",transform:openFaq===i?"rotate(45deg)":"none"}}>+</span></div><div style={{maxHeight:openFaq===i?220:0,overflow:"hidden",transition:"max-height .5s cubic-bezier(.16,1,.3,1)"}}><p style={{fontSize:".82rem",color:t.tx2,lineHeight:1.7,paddingTop:12,paddingRight:40}}>{f.a}</p></div></div>)}</div></Rv></div></section>

{/* WAITLIST */}
<section id="waitlist" style={{padding:"120px 0",position:"relative",overflow:"hidden"}}><div style={{position:"absolute",top:"40%",left:"45%",width:400,height:400,borderRadius:"50%",background:`${t.ac}08`,filter:"blur(120px)",pointerEvents:"none"}}/>
<div style={{...W,maxWidth:600,position:"relative"}}><Rv><div style={{textAlign:"center",marginBottom:44}}><h2 className="sh" style={{fontSize:"clamp(2rem,4.5vw,3rem)",lineHeight:1.08,letterSpacing:"-.04em"}}><span style={{fontFamily:SS,fontWeight:800}}>Be first.</span><br/><span key={"c1"+mode} style={{fontFamily:SF,fontStyle:"italic",...acT}}>Transform first.</span></h2><p style={{fontSize:".93rem",color:t.tx2,lineHeight:1.75,marginTop:14}}><strong style={{color:t.tx}}>Lifetime pricing</strong> for founding members.</p>{wlCount>0&&<p style={{fontFamily:SM,fontSize:".68rem",color:t.ac,fontWeight:600,marginTop:10}}>{wlCount}+ joined · Limited spots</p>}</div></Rv>
<Rv delay={.12}>{!submitted?<div style={{background:t.bg3,border:`1px solid ${t.bd}`,borderRadius:20,padding:"36px 30px",boxShadow:t.sh2}}>
<div style={{marginBottom:16}}><label style={lblS}>EMAIL *</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@email.com" style={inpS}/></div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}><div><label style={lblS}>NAME</label><input type="text" value={uname} onChange={e=>setUname(e.target.value)} placeholder="Your name" style={inpS}/></div><div><label style={lblS}>GOAL</label><select value={goal} onChange={e=>setGoal(e.target.value)} style={{...inpS,color:goal?t.tx:t.tx3,cursor:"pointer"}}><option value="">Select goal</option><option value="Fat Loss">Fat Loss</option><option value="Muscle Gain">Muscle Gain</option><option value="Stay Healthy">Stay Healthy</option><option value="Build Discipline">Build Discipline</option></select></div></div>
<button className="mb" onClick={doSubmit} disabled={loading||!vld} style={{width:"100%",padding:16,borderRadius:13,background:vld?acG:t.bd,color:vld?"#fff":t.tx3,border:"none",fontSize:".93rem",fontWeight:700,cursor:vld?"pointer":"not-allowed",fontFamily:SS,display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>{loading?"Joining...":  <span style={{display:"flex",alignItems:"center",gap:10}}>Join the Waitlist {I.ar()}</span>}</button>
</div>:<div style={{background:t.bg3,border:`1px solid ${t.ok}25`,borderRadius:20,padding:"52px 30px",textAlign:"center",animation:"scaleIn .5s"}}><div style={{width:60,height:60,borderRadius:"50%",background:t.okB,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 18px",color:t.ok}}>{I.sh()}</div><h3 style={{fontFamily:SF,fontStyle:"italic",fontSize:"1.5rem",marginBottom:8}}>You're in.</h3><p style={{fontSize:".88rem",color:t.tx2,maxWidth:380,margin:"0 auto"}}>Early access coming to your inbox.</p></div>}</Rv></div></section>

{/* FOOTER */}
<footer style={{padding:"44px 0 32px",borderTop:`1px solid ${t.bd}`,background:t.bg2}}><div style={{...W,display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:20}}>
<div><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}><div style={{width:26,height:26,borderRadius:7,background:acG,display:"flex",alignItems:"center",justifyContent:"center"}}><svg width="15" height="15" viewBox="0 0 32 32" fill="none"><path d="M4 20 L9 20 L12 12 L15 24 L18 8 L21 18 L24 14 L28 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M25 11 L28 14 L25 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div><span style={{fontFamily:SF,fontSize:"1.05rem"}}>Fit<span style={{fontStyle:"italic"}}>Crave</span></span></div><p style={{fontFamily:SM,fontSize:".6rem",color:t.tx3,marginBottom:4}}>India's first AI health execution system.</p><p style={{fontFamily:SM,fontSize:".55rem",color:t.tx3}}>charan@fitcrave.co</p></div>
<div style={{textAlign:"right"}}><p style={{fontFamily:SM,fontSize:".6rem",color:t.tx3}}>© {new Date().getFullYear()} FitCrave Pvt. Ltd.</p><p style={{fontFamily:SM,fontSize:".55rem",color:t.tx3,marginTop:3}}>Built at IIT Kharagpur, India</p></div>
</div></footer>
</div>)}
