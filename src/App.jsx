import { useState, useEffect } from "react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

async function sb(table, method="GET", body=null, filter="") {
  const url = `${SUPABASE_URL}/rest/v1/${table}${filter}`;
  const headers = {
    "apikey": SUPABASE_KEY,
    "Authorization": `Bearer ${SUPABASE_KEY}`,
    "Content-Type": "application/json",
    "Prefer": method==="POST" ? "return=representation" : "return=minimal",
  };
  const res = await fetch(url, { method, headers, body: body ? JSON.stringify(body) : null });
  if (method === "GET") return res.json();
  if (method === "POST") return res.json();
  return res.ok;
}

const B = {
  bg:"#141210", bgMid:"#1C1712", bgLight:"#241E16", bgAccent:"#2C2218",
  amber:"#E8830A", amberHov:"#F5970C", gold:"#F5A623", cream:"#F5DEB3",
  creamDim:"#B8A88A", border:"#3A2E1E", borderAcc:"#5C3D0A",
  white:"#FFFFFF", green:"#22C55E", red:"#EF4444", blue:"#60A5FA", gray:"#78716C",
};

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return isMobile;
}

const Icon = ({ name, size=16, color="currentColor", style={} }) => {
  const s = { width:size, height:size, display:"inline-block", flexShrink:0, ...style };
  const paths = {
    sun:     <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" style={s}><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
    chart:   <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" style={s}><rect x="2" y="12" width="4" height="10" rx="1"/><rect x="9" y="7" width="4" height="15" rx="1"/><rect x="16" y="3" width="4" height="19" rx="1"/></svg>,
    list:    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" style={s}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="3" cy="6" r="1" fill={color}/><circle cx="3" cy="12" r="1" fill={color}/><circle cx="3" cy="18" r="1" fill={color}/></svg>,
    euro:    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" style={s}><path d="M17 6a6 6 0 1 0 0 12"/><line x1="3" y1="10" x2="13" y2="10"/><line x1="3" y1="14" x2="13" y2="14"/></svg>,
    shield:  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" style={s}><path d="M12 2L3 7v6c0 5 4 9 9 10 5-1 9-5 9-10V7z"/></svg>,
    box:     <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" style={s}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
    alert:   <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" style={s}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    truck:   <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" style={s}><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 5v4h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
    folder:  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" style={s}><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>,
    flame:   <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" style={s}><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>,
    savings: <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" style={s}><path d="M12 2v20M17 5H9.5a3.5 3.5 0 1 0 0 7h5a3.5 3.5 0 1 1 0 7H6"/></svg>,
    check:   <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" style={s}><polyline points="20 6 9 17 4 12"/></svg>,
    wrench:  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" style={s}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
    menu:    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" style={s}><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
    arrow:   <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" style={s}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  };
  return paths[name] || null;
};

const JLogo = ({ size = 80 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="jbg" cx="40%" cy="35%" r="65%"><stop offset="0%" stopColor="#2A2016"/><stop offset="100%" stopColor="#0D0B09"/></radialGradient>
      <linearGradient id="jrg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#E8830A"/><stop offset="50%" stopColor="#F5A623"/><stop offset="100%" stopColor="#D97706"/></linearGradient>
      <linearGradient id="jtg" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#E8830A"/><stop offset="100%" stopColor="#F5A623"/></linearGradient>
      <clipPath id="jcp"><circle cx="100" cy="100" r="86"/></clipPath>
    </defs>
    <circle cx="100" cy="100" r="96" fill="none" stroke="#E8830A" strokeWidth="0.5" opacity="0.3"/>
    <circle cx="100" cy="100" r="90" fill="url(#jbg)"/>
    <circle cx="100" cy="100" r="90" fill="none" stroke="url(#jrg)" strokeWidth="2.5"/>
    <circle cx="100" cy="100" r="84" fill="none" stroke="#3A2A0A" strokeWidth="0.8" opacity="0.6"/>
    <g clipPath="url(#jcp)">
      <text x="100" y="106" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontWeight="700" fontSize="30" fill="url(#jtg)" letterSpacing="1">Jenecherú</text>
      <path d="M 52 114 Q 100 120 148 114" fill="none" stroke="#E8830A" strokeWidth="0.8" opacity="0.5"/>
      <text x="100" y="132" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="500" fontSize="8" fill="#B8A88A" letterSpacing="2">EL FUEGO QUE NUNCA SE APAGA</text>
    </g>
  </svg>
);

const TECHNICIANS = [
  { id:1,  name:"Mauricio Acosta",       pin:"7854" },
  { id:2,  name:"Gonzalo Fernández",     pin:"7516" },
  { id:3,  name:"Bayron Guzmán",         pin:"5589" },
  { id:4,  name:"Daniel I. Ordóñez",     pin:"2852" },
  { id:5,  name:"Daniel Ordóñez López",  pin:"5692" },
  { id:6,  name:"Oscar Pacheco",         pin:"4535" },
  { id:7,  name:"Ariel Saavedra",        pin:"6465" },
  { id:8,  name:"Edson Guzmán",          pin:"0639" },
  { id:9,  name:"Jhon Medina",           pin:"1054" },
  { id:10, name:"Diego Torrez",          pin:"2776" },
  { id:11, name:"David Rondón",          pin:"9187" },
  { id:12, name:"Elver Rondón",          pin:"2915" },
  { id:13, name:"Alexis Rincón",         pin:"3874" },
  { id:14, name:"Nicolás Godoy",         pin:"8152" },
  { id:15, name:"Carlos Benítez",        pin:"8579" },
  { id:16, name:"Harley Salvatierra",    pin:"3990" },
  { id:17, name:"Tuvshinbileg B.",       pin:"6348" },
  { id:18, name:"Javed Saleem",          pin:"4846" },
  { id:19, name:"Leonardo Ocampo",       pin:"8135" },
];

const ROI_BENCHMARK = { ordersLostPerTechPerMonth:7, pricePerOrder:26.70, numTechnicians:19 };

function Badge({ status }) {
  const m = {
    "EN RUTA":["#E8830A","#E8830A25"],"COMPLETADO":["#22C55E","#22C55E25"],
    "SIN INICIAR":["#78716C","#78716C25"],"EN TALLER":["#F5A623","#F5A62325"],
    "ACTIVO":["#22C55E","#22C55E25"],"FUERA DE SERVICIO":["#EF4444","#EF444425"],
    "PENDIENTE":["#F5A623","#F5A62325"],"PAGADA":["#22C55E","#22C55E25"],
    "VENCIDA":["#EF4444","#EF444425"],"ACTIVA":["#22C55E","#22C55E25"],
    "EN RIESGO":["#F5A623","#F5A62325"],"CRÍTICO":["#EF4444","#EF444425"],
    "BAJO":["#F5A623","#F5A62325"],"OK":["#22C55E","#22C55E25"],
    "CUMPLIDA":["#22C55E","#22C55E25"],"PERDIDA":["#EF4444","#EF444425"],
  };
  const [c,bg]=m[status]||["#78716C","#78716C25"];
  return <span style={{display:"inline-flex",alignItems:"center",padding:"3px 10px",borderRadius:100,fontSize:11,fontWeight:600,color:c,background:bg}}>{status}</span>;
}

const inputStyle = {width:"100%",padding:"12px 14px",borderRadius:10,border:"1px solid #3A2E1E",background:"#2C2218",color:"#F5DEB3",fontSize:15,outline:"none",fontFamily:"inherit",boxSizing:"border-box"};
const selectStyle = {width:"100%",padding:"12px 14px",borderRadius:10,border:"1px solid #3A2E1E",background:"#2C2218",color:"#F5DEB3",fontSize:15,outline:"none",fontFamily:"inherit",boxSizing:"border-box"};

function FormField({ label, children }) {
  return (
    <div style={{marginBottom:14}}>
      <div style={{fontSize:11,fontWeight:600,color:"#E8830A",marginBottom:6,textTransform:"uppercase",letterSpacing:0.8}}>{label}</div>
      {children}
    </div>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div style={{position:"fixed",inset:0,zIndex:300,display:"flex",alignItems:"flex-end",justifyContent:"center",background:"rgba(0,0,0,0.75)"}}>
      <div style={{background:"#1C1712",border:"1px solid #3A2E1E",borderRadius:"16px 16px 0 0",width:"100%",maxWidth:520,maxHeight:"92vh",overflowY:"auto",padding:24,boxShadow:"0 -8px 40px rgba(0,0,0,0.6)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <div style={{fontSize:17,fontWeight:700,color:"#E8830A",fontFamily:"Georgia,serif",fontStyle:"italic"}}>{title}</div>
          <button onClick={onClose} style={{background:"#2C2218",border:"1px solid #3A2E1E",borderRadius:8,padding:"7px 14px",color:"#B8A88A",cursor:"pointer",fontSize:13,fontFamily:"inherit"}}>Cerrar</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function StatGrid({ stats }) {
  return (
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
      {stats.map((k,i)=>(
        <div key={i} style={{background:B.bgMid,borderRadius:10,border:`1px solid ${B.border}`,padding:16,borderTop:`3px solid ${k.color}`}}>
          <div style={{fontSize:28,fontWeight:800,color:k.color,letterSpacing:-1,lineHeight:1}}>{k.value}</div>
          <div style={{fontSize:11,color:B.creamDim,marginTop:4,fontWeight:500}}>{k.label}</div>
        </div>
      ))}
    </div>
  );
}

function Loader() {
  return <div style={{textAlign:"center",padding:40,color:B.creamDim,fontSize:14}}>Cargando...</div>;
}

function Briefing({ setScreen, isMobile, stock, fines, guarantees, vehicles }) {
  const today = new Date().toLocaleDateString("es-ES",{weekday:"long",year:"numeric",month:"long",day:"numeric"});
  const critS   = stock.filter(s=>s.status==="CRÍTICO").length;
  const lowS    = stock.filter(s=>s.status==="BAJO").length;
  const finesU  = fines.filter(f=>f.status==="PENDIENTE"&&f.days_left<=7).length;
  const guarE   = guarantees.filter(g=>g.days_left<=5&&g.status!=="VENCIDA"&&g.status!=="CUMPLIDA").length;
  const tallerV = vehicles.filter(v=>v.status==="EN TALLER").length;
  const hasAlerts = critS+lowS+finesU+guarE+tallerV > 0;

  const alertRow=(color,icon,title,sub,scr)=>(
    <div onClick={()=>setScreen(scr)} style={{background:color+"15",border:`1px solid ${color}35`,borderRadius:10,padding:"12px 14px",display:"flex",alignItems:"center",gap:12,marginBottom:8,cursor:"pointer"}}>
      <Icon name={icon} size={18} color={color} style={{flexShrink:0}}/>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontWeight:600,color,fontSize:13}}>{title}</div>
        <div style={{fontSize:12,color:B.creamDim,marginTop:2}}>{sub}</div>
      </div>
      <Icon name="arrow" size={14} color={B.amber}/>
    </div>
  );

  return (
    <div>
      <div style={{background:"linear-gradient(135deg,#2C1A06,#1C1208)",border:`1px solid ${B.borderAcc}`,borderRadius:12,padding:isMobile?"16px":"20px",marginBottom:16}}>
        <div style={{fontSize:11,color:B.creamDim,marginBottom:4}}>{today}</div>
        <div style={{fontSize:isMobile?20:24,fontWeight:800,color:B.cream,fontFamily:"Georgia,serif",fontStyle:"italic"}}>Buenos días, Daniel.</div>
        <div style={{fontSize:13,color:B.creamDim,marginTop:6}}>Bienvenido a Jenecherú. Aquí tienes el resumen del día.</div>
      </div>
      <StatGrid stats={[
        {label:"Alertas stock",        value:critS+lowS,  color:(critS+lowS)>0?B.red:B.green},
        {label:"Multas urgentes",      value:finesU,      color:finesU>0?B.red:B.green},
        {label:"Garantías por vencer", value:guarE,       color:guarE>0?B.gold:B.green},
        {label:"Vehículos en taller",  value:tallerV,     color:tallerV>0?B.gold:B.green},
      ]}/>
      {hasAlerts && (
        <div style={{marginBottom:20}}>
          <div style={{fontSize:11,fontWeight:600,color:B.amber,textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Alertas activas</div>
          {critS>0   && alertRow(B.red,  "box",    `${critS} artículo(s) en nivel CRÍTICO`,    "Técnicos pueden quedarse sin herramientas","stock")}
          {lowS>0    && alertRow(B.gold, "alert",  `${lowS} artículo(s) con stock BAJO`,       "Pedir antes de que se agote","stock")}
          {finesU>0  && alertRow(B.red,  "euro",   `${finesU} multa(s) vencen en 7 días`,      "Se doblan si no se pagan a tiempo","multas")}
          {guarE>0   && alertRow(B.gold, "shield", `${guarE} garantía(s) vencen pronto`,       "Pierdes el cobro si otro va antes","garantias")}
          {tallerV>0 && alertRow(B.amber,"truck",  `${tallerV} vehículo(s) en taller`,         "Técnico sin furgoneta disponible","flota")}
        </div>
      )}
      {!hasAlerts && (
        <div style={{background:B.green+"10",border:`1px solid ${B.green}30`,borderRadius:10,padding:"14px 16px",marginBottom:20,display:"flex",alignItems:"center",gap:12}}>
          <Icon name="check" size={18} color={B.green}/>
          <div style={{fontSize:13,color:B.green,fontWeight:600}}>Todo en orden — sin alertas activas hoy.</div>
        </div>
      )}
      <div style={{fontSize:11,fontWeight:600,color:B.amber,textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Acceso rápido</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        {[
          {icon:"shield", label:"Garantías",  scr:"garantias", sub:`${guarantees.filter(g=>g.status==="ACTIVA").length} activas`},
          {icon:"alert",  label:"Multas",     scr:"multas",    sub:`${fines.filter(f=>f.status==="PENDIENTE").length} pendientes`},
          {icon:"box",    label:"Inventario", scr:"stock",     sub:`${critS} críticos`},
          {icon:"savings",label:"Ahorros",    scr:"roi",       sub:"Ver dashboard"},
        ].map(item=>(
          <div key={item.scr} onClick={()=>setScreen(item.scr)} style={{background:B.bgMid,border:`1px solid ${B.border}`,borderRadius:10,padding:"14px",cursor:"pointer",display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:36,height:36,borderRadius:8,background:B.amber+"15",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <Icon name={item.icon} size={18} color={B.amber}/>
            </div>
            <div>
              <div style={{fontSize:13,fontWeight:600,color:B.cream}}>{item.label}</div>
              <div style={{fontSize:11,color:B.creamDim,marginTop:2}}>{item.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Tracker() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sb("job_logs","GET",null,"?order=logged_at.desc&limit=200").then(data=>{
      setLogs(Array.isArray(data)?data:[]);
      setLoading(false);
    });
  }, []);

  if(loading) return <Loader/>;

  const techStats = TECHNICIANS.map(t => {
    const myLogs = logs.filter(l=>l.technician_name===t.name);
    return { ...t, completados:myLogs.filter(l=>l.outcome==="COMPLETADO").length, total:myLogs.length };
  });

  const totalCompletados = techStats.reduce((a,t)=>a+t.completados,0);

  return (
    <div>
      <StatGrid stats={[
        {label:"Trabajos registrados",value:logs.length,color:B.amber},
        {label:"Completados",value:totalCompletados,color:B.green},
        {label:"Técnicos",value:TECHNICIANS.length,color:B.gold},
        {label:"% Completado",value:logs.length>0?`${Math.round(totalCompletados/logs.length*100)}%`:"—",color:B.blue},
      ]}/>
      {TECHNICIANS.map((t,i)=>{
        const s=techStats.find(x=>x.id===t.id)||{completados:0,total:0};
        return (
          <div key={t.id} style={{background:i%2===0?B.bgMid:B.bgAccent,border:`1px solid ${B.border}`,borderRadius:10,padding:"12px 14px",marginBottom:8}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <span style={{fontWeight:700,color:B.gold,fontSize:15}}>{t.name}</span>
              <span style={{fontSize:12,color:B.creamDim}}>{s.total} registros</span>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              {[["Completados",s.completados,B.green],["Total",s.total,B.amber]].map(([l,v,c])=>(
                <div key={l} style={{background:B.bg,borderRadius:8,padding:"8px",textAlign:"center",border:`1px solid ${B.border}`}}>
                  <div style={{fontSize:18,fontWeight:800,color:c}}>{v}</div>
                  <div style={{fontSize:10,color:B.creamDim,marginTop:2}}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Production() {
  const [period,setPeriod]=useState("mensual");
  const [logs,setLogs]=useState([]);
  const [loading,setLoading]=useState(true);

  // Date helpers
  const getRange = () => {
    const now = new Date();
    const pad = n => String(n).padStart(2,"0");
    const fmt = d => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;

    if(period==="diario"){
      const start = fmt(now)+"T00:00:00";
      const end   = fmt(now)+"T23:59:59";
      return {start,end,label:"Hoy"};
    }
    if(period==="semanal"){
      const day = now.getDay(); // 0=Sun
      const diff = day===0?-6:1-day; // back to Monday
      const mon = new Date(now); mon.setDate(now.getDate()+diff);
      const fri = new Date(mon); fri.setDate(mon.getDate()+4);
      return {start:fmt(mon)+"T00:00:00",end:fmt(fri)+"T23:59:59",label:`Semana ${fmt(mon).slice(8)}–${fmt(fri).slice(8)}/${fmt(fri).slice(5,7)}`};
    }
    // mensual
    const start = `${now.getFullYear()}-${pad(now.getMonth()+1)}-01T00:00:00`;
    const lastDay = new Date(now.getFullYear(),now.getMonth()+1,0).getDate();
    const end   = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(lastDay)}T23:59:59`;
    return {start,end,label:now.toLocaleDateString("es-ES",{month:"long",year:"numeric"})};
  };

  useEffect(()=>{
    setLoading(true);
    const {start,end} = getRange();
    sb("job_logs","GET",null,`?logged_at=gte.${start}&logged_at=lte.${end}&order=logged_at.desc`).then(data=>{
      setLogs(Array.isArray(data)?data:[]);
      setLoading(false);
    });
  },[period]);

  const {label} = getRange();

  const techStats = TECHNICIANS.map(t=>{
    const mine = logs.filter(l=>l.technician_name===t.name);
    const completados = mine.filter(l=>l.outcome==="COMPLETADO").length;
    const altas       = mine.filter(l=>l.job_type==="Alta").length;
    const total       = mine.length;
    return {...t, completados, altas, total};
  });

  const totalJobs = techStats.reduce((a,t)=>a+t.total,0);
  const totalComp = techStats.reduce((a,t)=>a+t.completados,0);

  return (
    <div>
      <div style={{display:"flex",gap:8,marginBottom:12}}>
        {["diario","semanal","mensual"].map(p=>(
          <button key={p} onClick={()=>setPeriod(p)} style={{padding:"9px 16px",borderRadius:8,border:`1px solid ${period===p?B.amber:B.border}`,background:period===p?B.amber:"transparent",color:period===p?B.bg:B.cream,fontWeight:600,fontSize:13,cursor:"pointer",flex:1}}>{p.charAt(0).toUpperCase()+p.slice(1)}</button>
        ))}
      </div>

      <div style={{fontSize:11,color:B.creamDim,marginBottom:12,textAlign:"center"}}>{label}</div>

      <StatGrid stats={[
        {label:"Trabajos registrados",value:totalJobs,color:B.amber},
        {label:"Completados",value:totalComp,color:B.green},
        {label:"Técnicos",value:TECHNICIANS.length,color:B.gold},
        {label:"% Completado",value:totalJobs>0?`${Math.round(totalComp/totalJobs*100)}%`:"—",color:B.blue},
      ]}/>

      {loading && <Loader/>}

      {!loading && totalJobs===0 && (
        <div style={{textAlign:"center",padding:"30px 0",color:B.creamDim,fontSize:13}}>
          No hay trabajos registrados para este período.
        </div>
      )}

      {!loading && techStats.filter(t=>t.total>0).map((t,i)=>(
        <div key={t.id} style={{background:i%2===0?B.bgMid:B.bgAccent,border:`1px solid ${B.border}`,borderRadius:10,padding:"12px 14px",marginBottom:8}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <span style={{fontWeight:700,color:B.gold,fontSize:15}}>{t.name}</span>
            <span style={{fontSize:12,color:B.creamDim}}>{t.total} registros</span>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6}}>
            {[["Completados",t.completados,B.green],["Altas",t.altas,B.cream],["Total",t.total,B.amber]].map(([l,v,c])=>(
              <div key={l} style={{background:B.bg,borderRadius:8,padding:"8px",textAlign:"center",border:`1px solid ${B.border}`}}>
                <div style={{fontSize:17,fontWeight:800,color:c}}>{v}</div>
                <div style={{fontSize:10,color:B.creamDim,marginTop:1}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {!loading && totalJobs>0 && techStats.filter(t=>t.total===0).length>0 && (
        <div style={{fontSize:11,color:B.creamDim,textAlign:"center",marginTop:8}}>
          {techStats.filter(t=>t.total===0).length} técnico(s) sin registros en este período
        </div>
      )}
    </div>
  );
}

// Load SheetJS for Excel parsing
function useSheetJS() {
  const [ready, setReady] = useState(!!window.XLSX);
  useEffect(()=>{
    if(window.XLSX){setReady(true);return;}
    const s=document.createElement("script");
    s.src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
    s.onload=()=>setReady(true);
    document.head.appendChild(s);
  },[]);
  return ready;
}

// Normalize a reference string for comparison — strips /1 /2 suffix, spaces, uppercase
function normalizeRef(r) {
  return String(r||"").trim().toUpperCase().replace(/\s+/g,"").replace(/\/\d+$/,"");
}

// Levenshtein similarity 0-1
function similarity(a, b) {
  a = normalizeRef(a); b = normalizeRef(b);
  if(a===b) return 1;
  if(!a||!b) return 0;
  const la=a.length, lb=b.length;
  const dp=Array.from({length:lb+1},(_,i)=>i);
  for(let j=1;j<=la;j++){
    let prev=j;
    for(let i=1;i<=lb;i++){
      const val=a[j-1]===b[i-1]?dp[i-1]:Math.min(dp[i-1],dp[i],prev)+1;
      dp[i-1]=prev; prev=val;
    }
    dp[lb]=prev;
  }
  return 1-(dp[lb]/Math.max(la,lb));
}

// Parse Zener Excel file — reads ANEXO1 sheet, column A=ref, B=tecnico, I=importe
// Spanish month name to month number
const MESES = {enero:1,febrero:2,marzo:3,abril:4,mayo:5,junio:6,julio:7,agosto:8,septiembre:9,octubre:10,noviembre:11,diciembre:12};

// Convert column letter to index (A=0, B=1...)
function colToIdx(col) {
  let n=0;
  for(let i=0;i<col.length;i++) n=n*26+(col.charCodeAt(i)-64);
  return n-1;
}

// Get cell value from SheetJS worksheet by address
function cellVal(ws, addr) {
  const c = ws[addr];
  if(!c) return "";
  return c.v !== undefined ? String(c.v) : "";
}

async function parseZenerExcel(file) {
  return new Promise((resolve,reject)=>{
    const reader=new FileReader();
    reader.onload=(e)=>{
      try {
        const data=new Uint8Array(e.target.result);
        if(!window.XLSX) throw new Error("XLSX not loaded");
        const wb=window.XLSX.read(data,{type:"array",cellText:true});
        const sheetName = wb.SheetNames.includes("ANEXO1") ? "ANEXO1" : wb.SheetNames[0];
        const ws = wb.Sheets[sheetName];

        // Get sheet range
        const range = window.XLSX.utils.decode_range(ws["!ref"]||"A1:Z1000");
        const minRow = range.s.r; // 0-based
        const maxRow = range.e.r;
        const minCol = range.s.c;
        const maxCol = range.e.c;

        // Extract month/year from first 15 rows
        let zenerMonth=null, zenerYear=null;
        for(let r=minRow;r<Math.min(minRow+15,maxRow);r++){
          for(let c=minCol;c<=maxCol;c++){
            const addr = window.XLSX.utils.encode_cell({r,c});
            const val = cellVal(ws, addr).toLowerCase().trim();
            if(MESES[val]) zenerMonth=val;
            const ym = cellVal(ws,addr).match(/20\d\d/);
            if(ym) zenerYear=parseInt(ym[0]);
          }
        }
        if(!zenerYear){ const fy=file.name.match(/20\d\d/); if(fy) zenerYear=parseInt(fy[0]); }
        if(!zenerYear) zenerYear=new Date().getFullYear();

        // Find header row — find row where column A contains "ORDEN" or "PEDIDO"
        const clean = s => String(s).toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^A-Z0-9]/g,"");
        let headerRow=-1;
        for(let r=minRow;r<=maxRow;r++){
          for(let c=minCol;c<=maxCol;c++){
            const v = clean(cellVal(ws, window.XLSX.utils.encode_cell({r,c})));
            if(v.includes("ORDEN")||v.includes("TECNICO")){
              headerRow=r; break;
            }
          }
          if(headerRow>=0) break;
        }
        if(headerRow<0) throw new Error("No se encontró la cabecera");

        // Find column indices from header row — stop overwriting once found
        let colRef=-1, colTec=-1, colImporte=-1, colFecha=-1;
        for(let c=minCol;c<=maxCol;c++){
          const v = clean(cellVal(ws, window.XLSX.utils.encode_cell({r:headerRow,c})));
          if(colRef<0 && (v.includes("ORDEN")||v.includes("PEDIDO")||v.includes("PRESUPUESTO"))) colRef=c;
          if(colTec<0 && v.includes("TECNICO")) colTec=c;
          if(colImporte<0 && v.includes("IMPORTETOTAL")) colImporte=c;
          if(colFecha<0 && v.includes("FECHA")) colFecha=c;
        }
        // Hard fallbacks — column indices (0-based): A=0,B=1,C=2,I=8
        if(colRef<0) colRef=0;
        if(colTec<0) colTec=1;
        if(colFecha<0) colFecha=2;
        if(colImporte<0) colImporte=8;

        // Parse data rows
        const orders=[];
        for(let r=headerRow+1;r<=maxRow;r++){
          let ref=cellVal(ws, window.XLSX.utils.encode_cell({r,c:colRef})).trim();
          if(!ref||ref.length<3||!/\d/.test(ref)) continue;
          if(/^\d+$/.test(ref)&&ref.length>=7) ref=ref+"/1";
          const tecnico=cellVal(ws, window.XLSX.utils.encode_cell({r,c:colTec})).trim().replace(/\xa0/g," ").replace(/\s+/g," ");
          const impStr=cellVal(ws, window.XLSX.utils.encode_cell({r,c:colImporte})).replace(",",".");
          const importe=parseFloat(impStr)||0;
          const fecha=cellVal(ws, window.XLSX.utils.encode_cell({r,c:colFecha})).trim();
          orders.push({ref,tecnico,importe,fecha,isGarantia:importe<0,isPositive:importe>0});
        }

        resolve({orders,zenerMonth,zenerYear});
      } catch(err){ reject(err); }
    };
    reader.onerror=reject;
    reader.readAsArrayBuffer(file);
  });
}

// Match technician name from Zener (full caps) to our technician list
function matchTechnician(zenerName) {
  if(!zenerName) return null;
  const zn = zenerName.toUpperCase().replace(/\xa0/g," ").replace(/\s+/g," ").trim();
  let best=null, bestScore=0;
  TECHNICIANS.forEach(t=>{
    const tn = t.name.toUpperCase();
    const sc = similarity(zn, tn);
    if(sc>bestScore){ bestScore=sc; best=t; }
  });
  return bestScore>0.5 ? best : null;
}

function Reconciliation() {
  const xlsxReady = useSheetJS();
  const [step, setStep] = useState("upload"); // upload | results | history | historyDetail
  const [results, setResults] = useState(null);
  const [filter, setFilter] = useState("all");
  const [parsing, setParsing] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const loadHistory = async () => {
    setHistoryLoading(true);
    const data = await sb("reconciliations","GET",null,"?order=uploaded_at.desc");
    setHistory(Array.isArray(data)?data:[]);
    setHistoryLoading(false);
  };

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if(!file) return;
    if(!window.XLSX){ setError("Cargando librería Excel, espera un momento e inténtalo de nuevo."); return; }
    setParsing(true); setError("");
    try {
      const {orders: zenerOrders, zenerMonth, zenerYear} = await parseZenerExcel(file);
      if(zenerOrders.length===0){ setError("No se encontraron órdenes en el archivo."); setParsing(false); return; }

      // Build date range for the Zener month
      const monthNum = zenerMonth ? MESES[zenerMonth] : new Date().getMonth()+1;
      const year = zenerYear || new Date().getFullYear();
      const pad = n => String(n).padStart(2,"0");
      const lastDay = new Date(year, monthNum, 0).getDate();
      const dateStart = `${year}-${pad(monthNum)}-01T00:00:00`;
      const dateEnd   = `${year}-${pad(monthNum)}-${pad(lastDay)}T23:59:59`;

      // Fetch ONLY job_logs from that month
      const logs = await sb("job_logs","GET",null,`?logged_at=gte.${dateStart}&logged_at=lte.${dateEnd}&order=logged_at.desc`);
      const jobLogs = Array.isArray(logs)?logs:[];

      const monthLabel = zenerMonth
        ? `${zenerMonth.charAt(0).toUpperCase()+zenerMonth.slice(1)} ${year}`
        : new Date().toLocaleDateString("es-ES",{month:"long",year:"numeric"});

      const res = runMatching(zenerOrders, jobLogs);
      await sb("reconciliations","POST",{
        month: monthLabel,
        total_zener: res.paidOrders.length,
        total_matched: res.matched.length,
        total_maybe: res.maybe.length,
        total_missing: res.missing.length,
        total_unmatched: res.unmatched.length,
        total_garantia: res.garantiaAdjustments.length,
        total_certificado: res.paidOrders.reduce((a,o)=>a+o.importe,0),
        total_garantia_value: res.garantiaAdjustments.reduce((a,o)=>a+o.importe,0),
        results: res,
      });
      setResults(res);
      setStep("results");
    } catch(err) {
      setError(`Error al procesar el archivo: ${err.message}`);
    }
    setParsing(false);
  };

  const runMatching = (zenerOrders, jobLogs) => {
    const MATCH_EXACT = 1.0;
    const MATCH_MAYBE = 0.75;
    const paidOrders = zenerOrders.filter(o=>o.isPositive);
    const garantiaAdjustments = zenerOrders.filter(o=>o.isGarantia);
    const matched=[], missing=[], maybe=[], unmatched=[];
    const usedLogIds=new Set();

    paidOrders.forEach(zOrder=>{
      let bestScore=0, bestLog=null;
      jobLogs.forEach(log=>{
        if(!log.reference) return;
        const sc=similarity(zOrder.ref, log.reference);
        if(sc>bestScore){ bestScore=sc; bestLog=log; }
      });
      if(bestScore>=MATCH_EXACT && bestLog){
        usedLogIds.add(bestLog.id);
        const matchedTech = matchTechnician(zOrder.tecnico);
        const techMatch = matchedTech && bestLog.technician_name===matchedTech.name;
        matched.push({zOrder, log:bestLog, score:bestScore, techMatch, matchedTech});
      } else if(bestScore>=MATCH_MAYBE && bestLog){
        usedLogIds.add(bestLog.id);
        maybe.push({zOrder, log:bestLog, score:bestScore});
      } else {
        missing.push({zOrder});
      }
    });
    jobLogs.forEach(log=>{
      if(!usedLogIds.has(log.id) && log.reference) unmatched.push({log});
    });
    return { matched, missing, maybe, unmatched, garantiaAdjustments, paidOrders, jobLogs };
  };

  const reset = () => { setStep("upload"); setResults(null); setFilter("all"); setError(""); };

  // History list screen
  if(step==="history") return (
    <div>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
        <button onClick={()=>setStep("upload")} style={{background:"transparent",border:"none",cursor:"pointer",color:B.creamDim,fontSize:18,padding:4}}>←</button>
        <div style={{fontSize:16,fontWeight:700,color:B.amber,fontFamily:"Georgia,serif",fontStyle:"italic"}}>Historial de conciliaciones</div>
      </div>
      {historyLoading&&<Loader/>}
      {!historyLoading&&history.length===0&&(
        <div style={{textAlign:"center",padding:"30px 0",color:B.creamDim,fontSize:13}}>No hay conciliaciones guardadas todavía.</div>
      )}
      {history.map((h,i)=>(
        <div key={h.id} onClick={()=>{setSelectedMonth(h);setStep("historyDetail");}} style={{background:i%2===0?B.bgMid:B.bgAccent,border:`1px solid ${B.border}`,borderRadius:10,padding:"14px 16px",marginBottom:8,cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{fontWeight:700,color:B.amber,fontSize:15,textTransform:"capitalize"}}>{h.month}</div>
            <div style={{fontSize:11,color:B.creamDim,marginTop:3}}>{new Date(h.uploaded_at).toLocaleDateString("es-ES")} · {h.total_zener} órdenes</div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:13,fontWeight:700,color:h.total_missing>0?B.red:B.green}}>
              {h.total_missing>0?`${h.total_missing} sin registrar`:"Todo registrado"}
            </div>
            <div style={{fontSize:11,color:B.creamDim,marginTop:2}}>€{Number(h.total_certificado).toFixed(2)}</div>
          </div>
        </div>
      ))}
    </div>
  );

  // History detail screen
  if(step==="historyDetail"&&selectedMonth) {
    const r = selectedMonth.results;
    return (
      <div>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
          <button onClick={()=>setStep("history")} style={{background:"transparent",border:"none",cursor:"pointer",color:B.creamDim,fontSize:18,padding:4}}>←</button>
          <div style={{fontSize:16,fontWeight:700,color:B.amber,fontFamily:"Georgia,serif",fontStyle:"italic",textTransform:"capitalize"}}>{selectedMonth.month}</div>
        </div>
        <ReconciliationResults results={r} filter={filter} setFilter={setFilter} onReset={()=>setStep("history")} resetLabel="← Volver al historial"/>
      </div>
    );
  }

  if(step==="upload") return (
    <div>
      <div style={{background:B.bgMid,border:`1px solid ${B.border}`,borderRadius:12,padding:32,textAlign:"center",marginBottom:12}}>
        <div style={{marginBottom:16}}><Icon name="euro" size={40} color={B.amber}/></div>
        <div style={{fontSize:18,fontWeight:700,color:B.amber,fontFamily:"Georgia,serif",fontStyle:"italic",marginBottom:8}}>Conciliación con Zener</div>
        <div style={{fontSize:13,color:B.creamDim,marginBottom:6,lineHeight:1.6}}>Sube el Excel de certificación de Zener.</div>
        <div style={{fontSize:12,color:B.creamDim,marginBottom:24,lineHeight:1.6}}>El sistema cruzará las referencias con los trabajos registrados y te mostrará qué está confirmado, qué falta, y qué revisar.</div>
        {error&&<div style={{background:B.red+"15",color:B.red,padding:"10px 14px",borderRadius:8,fontSize:13,marginBottom:16,border:`1px solid ${B.red}30`,textAlign:"left"}}>{error}</div>}
        {!xlsxReady&&<div style={{fontSize:12,color:B.creamDim,marginBottom:12}}>Cargando librería Excel...</div>}
        <label style={{display:"block",padding:"14px 24px",borderRadius:10,border:"none",background:parsing||!xlsxReady?B.gray:B.amber,color:B.bg,fontWeight:700,fontSize:14,cursor:parsing||!xlsxReady?"not-allowed":"pointer",width:"100%",boxSizing:"border-box"}}>
          {parsing?"Analizando archivo...":"Seleccionar Excel de Zener"}
          <input type="file" accept=".xlsx,.xls,.csv" onChange={handleFile} style={{display:"none"}} disabled={parsing||!xlsxReady}/>
        </label>
      </div>
      <button onClick={()=>{loadHistory();setStep("history");}} style={{width:"100%",padding:"13px",borderRadius:10,border:`1px solid ${B.border}`,background:B.bgMid,color:B.creamDim,fontSize:14,cursor:"pointer",fontFamily:"inherit",fontWeight:500}}>
        Ver historial de conciliaciones
      </button>
    </div>
  );

  if(!results) return <Loader/>;
  return <ReconciliationResults results={results} filter={filter} setFilter={setFilter} onReset={reset} resetLabel="↩ Subir otro archivo"/>;
}

function ReconciliationResults({ results, filter, setFilter, onReset, resetLabel }) {
  const { matched, missing, maybe, unmatched, garantiaAdjustments, paidOrders } = results;
  const totalPaid = paidOrders.length;
  const totalMatched = matched.length;
  const totalMissing = missing.length;
  const totalMaybe = maybe.length;
  const totalUnmatched = unmatched.length;
  const totalGarantia = garantiaAdjustments.length;
  const missingValue = missing.reduce((a,m)=>a+(m.zOrder?.importe||0),0);
  const unmatchedValue = unmatched.length * 26.70;
  const garantiaValue = garantiaAdjustments.reduce((a,g)=>a+(g.zOrder?.importe||0),0);
  const totalCertificado = paidOrders.reduce((a,o)=>a+(o.importe||0),0);

  const tabs=[
    {id:"all",       label:`Todo (${totalPaid})`,               color:B.cream},
    {id:"matched",   label:`✅ Confirmado (${totalMatched})`,    color:B.green},
    {id:"maybe",     label:`⚠️ Revisar (${totalMaybe})`,         color:B.gold},
    {id:"missing",   label:`❌ Sin registrar (${totalMissing})`,  color:B.red},
    {id:"unmatched", label:`🔵 Ref. no encontrada (${totalUnmatched})`, color:B.blue},
    {id:"garantia",  label:`🔄 Garantías (${totalGarantia})`,    color:B.creamDim},
  ];

  const visibleItems = () => {
    if(filter==="matched")   return matched.map(r=>({...r,type:"matched"}));
    if(filter==="maybe")     return maybe.map(r=>({...r,type:"maybe"}));
    if(filter==="missing")   return missing.map(r=>({...r,type:"missing"}));
    if(filter==="unmatched") return unmatched.map(r=>({...r,type:"unmatched"}));
    if(filter==="garantia")  return garantiaAdjustments.map(r=>({...r,type:"garantia"}));
    return [
      ...matched.map(r=>({...r,type:"matched"})),
      ...maybe.map(r=>({...r,type:"maybe"})),
      ...missing.map(r=>({...r,type:"missing"})),
      ...unmatched.map(r=>({...r,type:"unmatched"})),
    ];
  };

  const typeStyle={
    matched:  {bg:B.green+"10",  border:B.green+"40",  label:"CONFIRMADO",       color:B.green},
    maybe:    {bg:B.gold+"10",   border:B.gold+"40",   label:"REVISAR",          color:B.gold},
    missing:  {bg:B.red+"10",    border:B.red+"40",    label:"SIN REGISTRAR",    color:B.red},
    unmatched:{bg:B.blue+"10",   border:B.blue+"40",   label:"REF. NO ENCONTRADA",color:B.blue},
    garantia: {bg:B.gray+"20",   border:B.gray+"40",   label:"GARANTÍA",         color:B.creamDim},
  };

  return (
    <div>
      <div style={{background:"linear-gradient(135deg,#1A2E0A,#0D1A06)",border:`1px solid ${B.green}40`,borderRadius:12,padding:16,marginBottom:16,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
        <div>
          <div style={{fontSize:11,color:B.green,fontWeight:600,textTransform:"uppercase",letterSpacing:1,marginBottom:2}}>Total certificado Zener</div>
          <div style={{fontSize:32,fontWeight:800,color:B.green,letterSpacing:-1}}>€{totalCertificado.toLocaleString("es-ES",{minimumFractionDigits:2})}</div>
        </div>
        <div style={{textAlign:"right"}}>
          <div style={{fontSize:11,color:B.creamDim,marginBottom:2}}>Ajustes garantías</div>
          <div style={{fontSize:20,fontWeight:700,color:B.red}}>€{garantiaValue.toLocaleString("es-ES",{minimumFractionDigits:2})}</div>
        </div>
      </div>

      <StatGrid stats={[
        {label:"Órdenes Zener",  value:totalPaid,    color:B.amber},
        {label:"Confirmados",    value:totalMatched, color:B.green},
        {label:"Sin registrar",  value:totalMissing, color:B.red},
        {label:"A revisar",      value:totalMaybe,   color:B.gold},
      ]}/>

      {(totalMissing>0||totalUnmatched>0)&&(
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
          {totalMissing>0&&(
            <div style={{background:B.red+"10",border:`1px solid ${B.red}30`,borderRadius:10,padding:14}}>
              <div style={{fontSize:11,color:B.red,fontWeight:600,textTransform:"uppercase",letterSpacing:0.8,marginBottom:4}}>Posible pérdida</div>
              <div style={{fontSize:22,fontWeight:800,color:B.red}}>€{missingValue.toFixed(2)}</div>
              <div style={{fontSize:11,color:B.creamDim,marginTop:2}}>{totalMissing} trabajos sin registro</div>
            </div>
          )}
          {totalUnmatched>0&&(
            <div style={{background:B.blue+"10",border:`1px solid ${B.blue}30`,borderRadius:10,padding:14}}>
              <div style={{fontSize:11,color:B.blue,fontWeight:600,textTransform:"uppercase",letterSpacing:0.8,marginBottom:4}}>Ref. no encontrada</div>
              <div style={{fontSize:22,fontWeight:800,color:B.blue}}>€{unmatchedValue.toFixed(2)}</div>
              <div style={{fontSize:11,color:B.creamDim,marginTop:2}}>{totalUnmatched} registros sin match en Zener</div>
            </div>
          )}
        </div>
      )}

      <div style={{display:"flex",gap:6,marginBottom:14,overflowX:"auto",paddingBottom:4}}>
        {tabs.map(t=>(
          <button key={t.id} onClick={()=>setFilter(t.id)} style={{padding:"7px 12px",borderRadius:8,border:`1px solid ${filter===t.id?t.color:B.border}`,background:filter===t.id?t.color+"20":"transparent",color:filter===t.id?t.color:B.creamDim,fontWeight:600,fontSize:11,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>{t.label}</button>
        ))}
      </div>

      {visibleItems().map((item,i)=>{
        const s=typeStyle[item.type];
        const zRef=item.zOrder?.ref||"—";
        const zTec=item.zOrder?.tecnico||"—";
        const zImp=item.zOrder?.importe;
        const zFecha=item.zOrder?.fecha||"—";
        return (
          <div key={i} style={{background:s.bg,border:`1px solid ${s.border}`,borderRadius:10,padding:"12px 14px",marginBottom:8}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <span style={{fontWeight:800,color:s.color,fontSize:12,background:s.color+"20",padding:"2px 10px",borderRadius:20}}>{s.label}</span>
              {zImp!==undefined&&<span style={{fontWeight:700,fontSize:14,color:zImp<0?B.red:B.cream}}>€{Math.abs(zImp).toFixed(2)}</span>}
            </div>
            {item.zOrder&&(
              <div style={{background:B.bg,border:`1px solid ${B.border}`,borderRadius:8,padding:"10px 12px",marginBottom:8}}>
                <div style={{fontSize:10,color:B.amber,fontWeight:600,textTransform:"uppercase",letterSpacing:0.8,marginBottom:6}}>📋 Zener</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
                  <div><div style={{fontSize:10,color:B.creamDim}}>Nº Orden</div><div style={{fontSize:14,fontWeight:800,color:B.cream,marginTop:1}}>{zRef}</div></div>
                  <div><div style={{fontSize:10,color:B.creamDim}}>Fecha</div><div style={{fontSize:12,fontWeight:600,color:B.creamDim,marginTop:1}}>{zFecha.replace(/^[a-záéíóú]+-/i,"")}</div></div>
                  <div style={{gridColumn:"1/-1"}}><div style={{fontSize:10,color:B.creamDim}}>Técnico en Zener</div><div style={{fontSize:12,fontWeight:600,color:B.gold,marginTop:1}}>{zTec}</div></div>
                </div>
              </div>
            )}
            {item.log&&(
              <div style={{background:B.bg,border:`1px solid ${B.border}`,borderRadius:8,padding:"10px 12px",marginBottom:6}}>
                <div style={{fontSize:10,color:B.green,fontWeight:600,textTransform:"uppercase",letterSpacing:0.8,marginBottom:6}}>📱 Registrado en app</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
                  <div><div style={{fontSize:10,color:B.creamDim}}>Referencia</div><div style={{fontSize:14,fontWeight:800,color:B.cream,marginTop:1}}>{item.log.reference}</div></div>
                  <div><div style={{fontSize:10,color:B.creamDim}}>Técnico</div><div style={{fontSize:12,fontWeight:600,color:B.gold,marginTop:1}}>{item.log.technician_name}</div></div>
                </div>
              </div>
            )}
            {item.type==="maybe"&&<div style={{fontSize:11,color:B.gold,background:B.gold+"10",padding:"6px 10px",borderRadius:6,marginTop:6}}>Similitud {Math.round(item.score*100)}% — verifica que es el mismo trabajo</div>}
            {item.type==="matched"&&item.techMatch===false&&<div style={{fontSize:11,color:B.gold,background:B.gold+"10",padding:"6px 10px",borderRadius:6,marginTop:6}}>⚠️ Referencia coincide pero técnico distinto — Zener: {item.matchedTech?.name||zTec}</div>}
            {item.type==="missing"&&<div style={{fontSize:11,color:B.red,background:B.red+"10",padding:"6px 10px",borderRadius:6,marginTop:6}}>Zener lo tiene registrado pero ningún técnico lo registró en la app.</div>}
            {item.type==="unmatched"&&<div style={{fontSize:11,color:B.blue,background:B.blue+"10",padding:"6px 10px",borderRadius:6,marginTop:6}}>El técnico registró esta referencia pero no aparece en el informe de Zener. Pedir explicación al técnico.</div>}
            {item.type==="garantia"&&<div style={{fontSize:11,color:B.creamDim,background:B.gray+"15",padding:"6px 10px",borderRadius:6,marginTop:6}}>Ajuste de garantía — {zImp<0?"deducción de":"abono de"} €{Math.abs(zImp||0).toFixed(2)}</div>}
          </div>
        );
      })}

      <button onClick={onReset} style={{width:"100%",padding:"10px",borderRadius:8,border:`1px solid ${B.border}`,background:"transparent",color:B.creamDim,fontSize:13,cursor:"pointer",marginTop:8}}>{resetLabel}</button>
    </div>
  );
}

function Guarantees() {
  const [guarantees, setGuarantees] = useState([]);  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    sb("guarantees","GET",null,"?order=days_left.asc").then(data=>{
      setGuarantees(Array.isArray(data)?data:[]);
      setLoading(false);
    });
  },[]);

  const markFulfilled = async (g) => {
    await sb("guarantees","PATCH",{status:"CUMPLIDA"},`?id=eq.${g.id}`);
    setGuarantees(prev=>prev.map(x=>x.id===g.id?{...x,status:"CUMPLIDA"}:x));
    await sb("roi_events","POST",{type:"guarantee_protected",date:new Date().toLocaleDateString("es-ES"),ref:g.ref,technician:g.technician,value:ROI_BENCHMARK.pricePerOrder,note:`Garantía ${g.ref} cumplida — €${ROI_BENCHMARK.pricePerOrder} protegidos`});
  };

  const markLost = async (g) => {
    await sb("guarantees","PATCH",{status:"PERDIDA"},`?id=eq.${g.id}`);
    setGuarantees(prev=>prev.map(x=>x.id===g.id?{...x,status:"PERDIDA"}:x));
    await sb("roi_events","POST",{type:"guarantee_lost",date:new Date().toLocaleDateString("es-ES"),ref:g.ref,technician:g.technician,value:-ROI_BENCHMARK.pricePerOrder,note:`Garantía ${g.ref} perdida — €${ROI_BENCHMARK.pricePerOrder} no cobrados`});
  };

  if(loading) return <Loader/>;
  const exp = guarantees.filter(g=>g.days_left<=5&&g.status!=="VENCIDA"&&g.status!=="CUMPLIDA").length;

  return (
    <div>
      {exp>0&&(
        <div style={{background:B.gold+"15",border:`1px solid ${B.gold}40`,borderRadius:10,padding:"12px 14px",marginBottom:16,display:"flex",gap:10,alignItems:"flex-start"}}>
          <span style={{width:8,height:8,borderRadius:"50%",background:B.gold,display:"inline-block",flexShrink:0,marginTop:4}}/>
          <div style={{fontWeight:600,color:B.gold,fontSize:13}}>{exp} garantía(s) vencen en los próximos 5 días.</div>
        </div>
      )}
      {guarantees.map((g,i)=>(
        <div key={g.id} style={{background:g.status==="CUMPLIDA"?B.green+"10":g.status==="PERDIDA"?B.red+"10":g.days_left<=3?B.red+"10":i%2===0?B.bgMid:B.bgAccent,border:`1px solid ${g.status==="CUMPLIDA"?B.green+"40":g.status==="PERDIDA"?B.red+"40":g.days_left<=3?B.red+"40":g.status==="EN RIESGO"?B.gold+"50":B.border}`,borderRadius:12,padding:"14px 16px",marginBottom:10}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontWeight:800,color:B.amber,fontSize:15}}>{g.ref}</span>
              <span style={{fontSize:11,color:B.creamDim,background:B.bgAccent,padding:"2px 8px",borderRadius:20,border:`1px solid ${B.border}`}}>{g.orden||"—"}</span>
            </div>
            <Badge status={g.status}/>
          </div>
          <div style={{fontSize:12,color:B.creamDim,marginBottom:10}}>Técnico: <strong style={{color:B.gold}}>{g.technician}</strong></div>
          <div style={{background:B.bg,border:`1px solid ${B.border}`,borderRadius:10,padding:"10px 12px",marginBottom:10}}>
            <div style={{fontSize:11,fontWeight:600,color:B.amber,textTransform:"uppercase",letterSpacing:0.8,marginBottom:8}}>📋 Datos del cliente</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
              <div style={{gridColumn:"1/-1"}}>
                <div style={{fontSize:10,color:B.creamDim}}>Nombre</div>
                <div style={{fontSize:14,fontWeight:700,color:B.cream,marginTop:1}}>{g.client_name||"—"}</div>
              </div>
              <div>
                <div style={{fontSize:10,color:B.creamDim}}>📞 Teléfono</div>
                <div style={{fontSize:13,fontWeight:600,color:B.gold,marginTop:1}}>{g.phone||"—"}</div>
              </div>
              <div>
                <div style={{fontSize:10,color:B.creamDim}}>Completado</div>
                <div style={{fontSize:13,fontWeight:600,color:B.creamDim,marginTop:1}}>{g.completed}</div>
              </div>
              <div style={{gridColumn:"1/-1"}}>
                <div style={{fontSize:10,color:B.creamDim}}>📍 Dirección</div>
                <div style={{fontSize:12,fontWeight:500,color:B.cream,marginTop:1}}>{g.address||"—"}</div>
              </div>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginBottom:10}}>
            {[["Vence",g.expires,B.creamDim],["Días",g.days_left<=0?"VENCIDA":`${g.days_left} días`,g.days_left<=3?B.red:g.days_left<=7?B.gold:B.green],["Valor",`€${ROI_BENCHMARK.pricePerOrder}`,B.amber]].map(([l,v,c])=>(
              <div key={l} style={{background:B.bgAccent,borderRadius:8,padding:"8px",textAlign:"center",border:`1px solid ${B.border}`}}>
                <div style={{fontSize:12,fontWeight:700,color:c}}>{v}</div>
                <div style={{fontSize:10,color:B.creamDim,marginTop:2}}>{l}</div>
              </div>
            ))}
          </div>
          {g.status!=="CUMPLIDA"&&g.status!=="PERDIDA"&&(
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              <button onClick={()=>markFulfilled(g)} style={{padding:"11px",borderRadius:10,border:"none",background:B.green,color:"#fff",fontWeight:700,fontSize:13,cursor:"pointer"}}>Garantía cumplida</button>
              <button onClick={()=>markLost(g)} style={{padding:"11px",borderRadius:10,border:`1px solid ${B.red}`,background:"transparent",color:B.red,fontWeight:700,fontSize:13,cursor:"pointer"}}>Garantía perdida</button>
            </div>
          )}
          {g.status==="CUMPLIDA"&&<div style={{textAlign:"center",color:B.green,fontWeight:700,fontSize:13,padding:"8px",background:B.green+"15",borderRadius:8}}>✓ Garantía cumplida — €{ROI_BENCHMARK.pricePerOrder} registrados</div>}
          {g.status==="PERDIDA"&&<div style={{textAlign:"center",color:B.red,fontWeight:700,fontSize:13,padding:"8px",background:B.red+"15",borderRadius:8}}>Garantía perdida</div>}
        </div>
      ))}
    </div>
  );
}

function Stock() {
  const [items,setItems]=useState([]);
  const [loading,setLoading]=useState(true);
  const [show,setShow]=useState(false);
  const [form,setForm]=useState({name:"",category:"Herramienta",quantity:"",minimum:""});
  const sf=(k,v)=>setForm(p=>({...p,[k]:v}));

  useEffect(()=>{
    sb("stock","GET",null,"?order=name.asc").then(data=>{
      setItems(Array.isArray(data)?data:[]);
      setLoading(false);
    });
  },[]);

  const updateQty=async(id,val)=>{
    const qty=parseInt(val)||0;
    const item=items.find(i=>i.id===id);
    const status=qty<=0?"CRÍTICO":qty<=item.minimum?"BAJO":"OK";
    await sb("stock","PATCH",{quantity:qty,status},`?id=eq.${id}`);
    setItems(items.map(i=>i.id===id?{...i,quantity:qty,status}:i));
  };

  const addItem=async()=>{
    if(!form.name.trim()||!form.quantity||!form.minimum){alert("Rellena todos los campos.");return;}
    const qty=parseInt(form.quantity)||0; const min=parseInt(form.minimum)||0;
    const status=qty<=0?"CRÍTICO":qty<=min?"BAJO":"OK";
    const newItem={name:form.name,category:form.category,quantity:qty,minimum:min,status};
    const result=await sb("stock","POST",newItem);
    if(Array.isArray(result)&&result[0]) setItems(p=>[...p,result[0]]);
    else setItems(p=>[...p,{...newItem,id:Date.now()}]);
    setForm({name:"",category:"Herramienta",quantity:"",minimum:""});
    setShow(false);
  };

  if(loading) return <Loader/>;

  return (
    <div>
      {show&&(
        <Modal title="Nuevo artículo de stock" onClose={()=>setShow(false)}>
          <FormField label="Nombre del artículo *"><input style={inputStyle} value={form.name} onChange={e=>sf("name",e.target.value)} placeholder="Ej: Fusionadora, Guantes EPI..."/></FormField>
          <FormField label="Categoría *">
            <select style={selectStyle} value={form.category} onChange={e=>sf("category",e.target.value)}>
              <option>Herramienta</option><option>Material</option><option>EPI</option>
            </select>
          </FormField>
          <FormField label="Cantidad actual *"><input style={inputStyle} type="number" value={form.quantity} onChange={e=>sf("quantity",e.target.value)} placeholder="¿Cuántos hay ahora mismo?"/></FormField>
          <FormField label="Cantidad mínima *"><input style={inputStyle} type="number" value={form.minimum} onChange={e=>sf("minimum",e.target.value)} placeholder="Por debajo de este número se activa la alerta"/></FormField>
          <button onClick={addItem} style={{width:"100%",padding:"15px",borderRadius:10,border:"none",background:B.amber,color:B.bg,fontWeight:800,fontSize:16,cursor:"pointer",marginTop:4}}>Guardar artículo</button>
        </Modal>
      )}
      <div style={{display:"flex",justifyContent:"flex-end",marginBottom:12}}>
        <button onClick={()=>setShow(true)} style={{padding:"11px 22px",borderRadius:10,border:"none",cursor:"pointer",fontSize:14,fontWeight:700,color:B.bg,background:B.amber}}>+ Añadir artículo</button>
      </div>
      <StatGrid stats={[{label:"Total",value:items.length,color:B.amber},{label:"Bajo",value:items.filter(i=>i.status==="BAJO").length,color:B.gold},{label:"Crítico",value:items.filter(i=>i.status==="CRÍTICO").length,color:B.red},{label:"OK",value:items.filter(i=>i.status==="OK").length,color:B.green}]}/>
      {items.map((item,i)=>(
        <div key={item.id} style={{background:item.status==="CRÍTICO"?B.red+"10":item.status==="BAJO"?B.gold+"10":i%2===0?B.bgMid:B.bgAccent,border:`1px solid ${item.status==="CRÍTICO"?B.red+"40":item.status==="BAJO"?B.gold+"40":B.border}`,borderRadius:10,padding:"12px 14px",marginBottom:8}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}><span style={{fontWeight:700,color:B.gold,fontSize:14}}>{item.name}</span><Badge status={item.status}/></div>
          <div style={{fontSize:12,color:B.creamDim,marginBottom:10}}>{item.category} · Mínimo: {item.minimum}</div>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:12,color:B.creamDim}}>Cantidad:</span>
            <input type="number" value={item.quantity} onChange={e=>updateQty(item.id,e.target.value)} style={{padding:"8px 12px",borderRadius:8,border:`1px solid ${B.border}`,background:B.bgAccent,color:B.cream,fontSize:14,fontWeight:700,width:80,textAlign:"center",outline:"none",fontFamily:"inherit"}}/>
          </div>
        </div>
      ))}
    </div>
  );
}

function Fines() {
  const [fines,setFines]=useState([]);
  const [loading,setLoading]=useState(true);
  const [show,setShow]=useState(false);
  const [form,setForm]=useState({ref:"",description:"",received:"",amount:"",due:""});
  const sf=(k,v)=>setForm(p=>({...p,[k]:v}));

  useEffect(()=>{
    sb("fines","GET",null,"?order=days_left.asc").then(data=>{
      setFines(Array.isArray(data)?data:[]);
      setLoading(false);
    });
  },[]);

  const markPaidOnTime=async(id)=>{
    const fine=fines.find(f=>f.id===id);
    await sb("fines","PATCH",{status:"PAGADA",paid_on_time:true},`?id=eq.${id}`);
    setFines(fines.map(f=>f.id===id?{...f,status:"PAGADA",paid_on_time:true}:f));
    await sb("roi_events","POST",{type:"fine_paid_on_time",date:new Date().toLocaleDateString("es-ES"),ref:fine.ref,amount:fine.amount,saving:fine.amount,note:`${fine.ref} pagada a tiempo — ahorro de €${fine.amount}`});
  };

  const markDoubled=async(id)=>{
    const fine=fines.find(f=>f.id===id);
    await sb("fines","PATCH",{status:"VENCIDA",doubled:true},`?id=eq.${id}`);
    setFines(fines.map(f=>f.id===id?{...f,status:"VENCIDA",doubled:true}:f));
    await sb("roi_events","POST",{type:"fine_doubled",date:new Date().toLocaleDateString("es-ES"),ref:fine.ref,amount:fine.amount,saving:-fine.amount,note:`${fine.ref} se dobló — coste adicional de €${fine.amount}`});
  };

  const addFine=async()=>{
    if(!form.ref.trim()||!form.description.trim()||!form.amount||!form.due.trim()){alert("Rellena todos los campos obligatorios.");return;}
    const parts=form.due.split("/"); const dueDate=new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    const days=Math.round((dueDate-new Date())/(1000*60*60*24));
    const rec=form.received.trim()||new Date().toLocaleDateString("es-ES");
    const newFine={ref:form.ref,description:form.description,received:rec,amount:parseFloat(form.amount),due:form.due,days_left:days,status:"PENDIENTE"};
    const result=await sb("fines","POST",newFine);
    if(Array.isArray(result)&&result[0]) setFines(p=>[...p,result[0]]);
    else setFines(p=>[...p,{...newFine,id:Date.now()}]);
    setForm({ref:"",description:"",received:"",amount:"",due:""});
    setShow(false);
  };

  if(loading) return <Loader/>;

  return (
    <div>
      {show&&(
        <Modal title="Nueva multa" onClose={()=>setShow(false)}>
          <FormField label="Referencia *"><input style={inputStyle} value={form.ref} onChange={e=>sf("ref",e.target.value)} placeholder="Ej: MUL-2026-004"/></FormField>
          <FormField label="Descripción *"><input style={inputStyle} value={form.description} onChange={e=>sf("description",e.target.value)} placeholder="Ej: Retraso en instalación"/></FormField>
          <FormField label="Importe en € *"><input style={inputStyle} type="number" value={form.amount} onChange={e=>sf("amount",e.target.value)} placeholder="Ej: 320"/></FormField>
          <FormField label="Fecha límite de pago * (DD/MM/AAAA)"><input style={inputStyle} value={form.due} onChange={e=>sf("due",e.target.value)} placeholder="Ej: 30/06/2026"/></FormField>
          <FormField label="Fecha recibida (DD/MM/AAAA)"><input style={inputStyle} value={form.received} onChange={e=>sf("received",e.target.value)} placeholder="Déjalo en blanco para usar hoy"/></FormField>
          <button onClick={addFine} style={{width:"100%",padding:"15px",borderRadius:10,border:"none",background:B.amber,color:B.bg,fontWeight:800,fontSize:16,cursor:"pointer",marginTop:4}}>Guardar multa</button>
        </Modal>
      )}
      <div style={{display:"flex",justifyContent:"flex-end",marginBottom:12}}>
        <button onClick={()=>setShow(true)} style={{padding:"11px 22px",borderRadius:10,border:"none",cursor:"pointer",fontSize:14,fontWeight:700,color:B.bg,background:B.amber}}>+ Añadir multa</button>
      </div>
      <StatGrid stats={[{label:"Pendientes",value:fines.filter(f=>f.status==="PENDIENTE").length,color:B.gold},{label:"Urgentes (<7d)",value:fines.filter(f=>f.status==="PENDIENTE"&&f.days_left<=7).length,color:B.red},{label:"Total pendiente",value:`€${fines.filter(f=>f.status==="PENDIENTE").reduce((a,f)=>a+f.amount,0)}`,color:B.amber},{label:"Pagadas a tiempo",value:fines.filter(f=>f.paid_on_time).length,color:B.green}]}/>
      {fines.map((f,i)=>(
        <div key={f.id} style={{background:f.status==="PENDIENTE"&&f.days_left<=7?B.red+"10":f.paid_on_time?B.green+"08":i%2===0?B.bgMid:B.bgAccent,border:`1px solid ${f.status==="PENDIENTE"&&f.days_left<=7?B.red+"40":f.paid_on_time?B.green+"40":B.border}`,borderRadius:10,padding:"12px 14px",marginBottom:8}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
            <div><div style={{fontWeight:700,color:B.amber,fontSize:14}}>{f.ref}</div><div style={{fontSize:12,color:B.creamDim,marginTop:2}}>{f.description}</div></div>
            <Badge status={f.status}/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginBottom:f.status==="PENDIENTE"?10:6}}>
            {[["Importe",`€${f.amount}`,B.cream],["Vence",f.due,B.creamDim],["Días",f.status==="PAGADA"?"—":f.days_left<=0?"VENCIDA":`${f.days_left}d`,f.status==="PAGADA"?B.green:f.days_left<=7?B.red:B.gold]].map(([l,v,c])=>(
              <div key={l} style={{background:B.bg,borderRadius:8,padding:"7px",textAlign:"center",border:`1px solid ${B.border}`}}><div style={{fontSize:13,fontWeight:700,color:c}}>{v}</div><div style={{fontSize:10,color:B.creamDim,marginTop:1}}>{l}</div></div>
            ))}
          </div>
          {f.status==="PENDIENTE"&&(
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              <button onClick={()=>markPaidOnTime(f.id)} style={{padding:"11px",borderRadius:10,border:"none",background:B.green,color:"#fff",fontWeight:700,fontSize:12,cursor:"pointer"}}>Pagada a tiempo</button>
              <button onClick={()=>markDoubled(f.id)} style={{padding:"11px",borderRadius:10,border:`1px solid ${B.red}`,background:"transparent",color:B.red,fontWeight:700,fontSize:12,cursor:"pointer"}}>Se ha doblado</button>
            </div>
          )}
          {f.paid_on_time&&<div style={{textAlign:"center",color:B.green,fontWeight:600,fontSize:12,padding:"6px",background:B.green+"15",borderRadius:8}}>Pagada a tiempo — ahorro de €{f.amount} registrado</div>}
          {f.doubled&&<div style={{textAlign:"center",color:B.red,fontWeight:600,fontSize:12,padding:"6px",background:B.red+"15",borderRadius:8}}>⚠ Doblada — coste adicional de €{f.amount}</div>}
        </div>
      ))}
    </div>
  );
}

function Fleet() {
  const [vehicles,setVehicles]=useState([]);
  const [loading,setLoading]=useState(true);
  const [show,setShow]=useState(false);
  const [form,setForm]=useState({plate:"",model:"",technician:"",status:"ACTIVO",itv:"",insurance:"",last_oil:"",last_service:""});
  const sf=(k,v)=>setForm(p=>({...p,[k]:v}));

  useEffect(()=>{
    sb("vehicles","GET",null,"?order=plate.asc").then(data=>{
      setVehicles(Array.isArray(data)?data:[]);
      setLoading(false);
    });
  },[]);

  const addVehicle=async()=>{
    if(!form.plate.trim()||!form.model.trim()){alert("Matrícula y modelo son obligatorios.");return;}
    const result=await sb("vehicles","POST",form);
    if(Array.isArray(result)&&result[0]) setVehicles(p=>[...p,result[0]]);
    else setVehicles(p=>[...p,{...form,id:Date.now()}]);
    setForm({plate:"",model:"",technician:"",status:"ACTIVO",itv:"",insurance:"",last_oil:"",last_service:""});
    setShow(false);
  };

  const changeStatus=async(id,status)=>{
    await sb("vehicles","PATCH",{status},`?id=eq.${id}`);
    setVehicles(vehicles.map(v=>v.id===id?{...v,status}:v));
  };

  if(loading) return <Loader/>;

  return (
    <div>
      {show&&(
        <Modal title="Nuevo vehículo" onClose={()=>setShow(false)}>
          <FormField label="Matrícula *"><input style={inputStyle} value={form.plate} onChange={e=>sf("plate",e.target.value)} placeholder="Ej: 5432 BCD"/></FormField>
          <FormField label="Marca y modelo *"><input style={inputStyle} value={form.model} onChange={e=>sf("model",e.target.value)} placeholder="Ej: Ford Transit 2022"/></FormField>
          <FormField label="Técnico asignado"><input style={inputStyle} value={form.technician} onChange={e=>sf("technician",e.target.value)} placeholder="Ej: Diego"/></FormField>
          <FormField label="Estado">
            <select style={selectStyle} value={form.status} onChange={e=>sf("status",e.target.value)}>
              <option>ACTIVO</option><option>EN TALLER</option><option>FUERA DE SERVICIO</option>
            </select>
          </FormField>
          <FormField label="Próxima ITV (DD/MM/AAAA)"><input style={inputStyle} value={form.itv} onChange={e=>sf("itv",e.target.value)} placeholder="Ej: 15/08/2026"/></FormField>
          <FormField label="Vencimiento seguro (DD/MM/AAAA)"><input style={inputStyle} value={form.insurance} onChange={e=>sf("insurance",e.target.value)} placeholder="Ej: 01/09/2026"/></FormField>
          <FormField label="Último cambio de aceite (DD/MM/AAAA)"><input style={inputStyle} value={form.last_oil} onChange={e=>sf("last_oil",e.target.value)} placeholder="Ej: 10/01/2026"/></FormField>
          <FormField label="Último servicio general (DD/MM/AAAA)"><input style={inputStyle} value={form.last_service} onChange={e=>sf("last_service",e.target.value)} placeholder="Ej: 10/01/2026"/></FormField>
          <button onClick={addVehicle} style={{width:"100%",padding:"15px",borderRadius:10,border:"none",background:B.amber,color:B.bg,fontWeight:800,fontSize:16,cursor:"pointer",marginTop:4}}>Guardar vehículo</button>
        </Modal>
      )}
      <StatGrid stats={[{label:"Total",value:vehicles.length,color:B.amber},{label:"Activos",value:vehicles.filter(v=>v.status==="ACTIVO").length,color:B.green},{label:"En taller",value:vehicles.filter(v=>v.status==="EN TALLER").length,color:B.gold},{label:"Inactivos",value:vehicles.filter(v=>v.status==="FUERA DE SERVICIO").length,color:B.red}]}/>
      <div style={{display:"flex",justifyContent:"flex-end",marginBottom:12}}>
        <button onClick={()=>setShow(true)} style={{padding:"11px 22px",borderRadius:10,border:"none",cursor:"pointer",fontSize:14,fontWeight:700,color:B.bg,background:B.amber}}>+ Añadir vehículo</button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        {vehicles.map(v=>(
          <div key={v.id} style={{background:B.bgMid,border:`1px solid ${B.border}`,borderTop:`3px solid ${v.status==="ACTIVO"?B.green:v.status==="EN TALLER"?B.gold:B.red}`,borderRadius:10,padding:"12px 14px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
              <div><div style={{fontSize:17,fontWeight:800,color:B.amber,fontFamily:"Georgia,serif"}}>{v.plate}</div><div style={{fontSize:12,color:B.creamDim}}>{v.model}</div></div>
              <select value={v.status} onChange={e=>changeStatus(v.id,e.target.value)} style={{background:B.bgAccent,border:`1px solid ${B.border}`,borderRadius:6,padding:"4px 8px",color:B.cream,fontSize:11,fontFamily:"inherit",cursor:"pointer"}}>
                <option>ACTIVO</option><option>EN TALLER</option><option>FUERA DE SERVICIO</option>
              </select>
            </div>
            <div style={{fontSize:12,color:B.creamDim,marginBottom:10}}>Técnico: <strong style={{color:B.cream}}>{v.technician||"—"}</strong></div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              {[["ITV",v.itv||"—"],["Seguro",v.insurance||"—"],["Aceite",v.last_oil||"—"],["Servicio",v.last_service||"—"]].map(([l,d])=>(
                <div key={l} style={{background:B.bgAccent,borderRadius:8,padding:"8px 10px",border:`1px solid ${B.border}`}}>
                  <div style={{fontSize:11,color:B.creamDim}}>{l}</div>
                  <div style={{fontSize:12,fontWeight:600,color:B.cream,marginTop:2}}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



function JobLog({ currentTech }) {
  const [type,setType]=useState(null);
  const [outcome,setOutcome]=useState(null);
  const [ref,setRef]=useState("");
  const [notes,setNotes]=useState("");
  const [saving,setSaving]=useState(false);
  const [done,setDone]=useState(false);

  const submit=async()=>{
    if(!type||!outcome||!ref.trim()){alert("Por favor rellena todos los campos.");return;}
    setSaving(true);
    await sb("job_logs","POST",{technician_name:currentTech?.name||"Desconocido",job_type:type,reference:ref,outcome,notes});
    setSaving(false);
    setDone(true);
    setTimeout(()=>{setType(null);setOutcome(null);setRef("");setNotes("");setDone(false);},2500);
  };

  if(done) return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"60vh",textAlign:"center",padding:20}}>
      <div style={{fontSize:48,marginBottom:20,color:B.amber}}>✓</div>
      <div style={{fontSize:24,fontWeight:800,color:B.green,fontFamily:"Georgia,serif",fontStyle:"italic"}}>¡Trabajo registrado!</div>
      <div style={{fontSize:14,color:B.creamDim,marginTop:8}}>Guardado. Preparando siguiente formulario...</div>
    </div>
  );

  const lbl=(text)=><div style={{fontSize:12,fontWeight:600,color:B.amber,marginBottom:10,textTransform:"uppercase",letterSpacing:0.8}}>{text}</div>;

  return (
    <div style={{maxWidth:480,margin:"0 auto"}}>
      {currentTech&&<div style={{background:B.amber+"15",border:`1px solid ${B.amber}30`,borderRadius:10,padding:"10px 14px",marginBottom:16,fontSize:13,color:B.amber,fontWeight:600}}>👤 {currentTech.name}</div>}
      <div style={{background:B.bgMid,border:`1px solid ${B.border}`,borderRadius:12,padding:16,marginBottom:12}}>
        {lbl("Tipo de trabajo *")}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          {["Alta","Reutilizada","Averías","Alarmas"].map(t=>(
            <button key={t} onClick={()=>setType(t)} style={{padding:"18px 10px",borderRadius:12,border:`2px solid ${type===t?B.amber:B.border}`,background:type===t?B.amber+"25":B.bgAccent,fontWeight:700,fontSize:14,color:type===t?B.amber:B.creamDim,cursor:"pointer",transition:"all 0.15s"}}>{t}</button>
          ))}
        </div>
      </div>
      <div style={{background:B.bgMid,border:`1px solid ${B.border}`,borderRadius:12,padding:16,marginBottom:12}}>
        {lbl("Referencia del cliente *")}
        <input value={ref} onChange={e=>setRef(e.target.value)} placeholder="Número de orden o referencia" style={{width:"100%",padding:"14px",borderRadius:10,border:`1px solid ${B.border}`,background:B.bgAccent,color:B.cream,fontSize:16,outline:"none",fontFamily:"inherit",boxSizing:"border-box"}}/>
      </div>
      <div style={{background:B.bgMid,border:`1px solid ${B.border}`,borderRadius:12,padding:16,marginBottom:12}}>
        {lbl("Resultado *")}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
          {[["COMPLETADO",B.green],["CANCELADO",B.red],["PENDIENTE",B.gold]].map(([o,c])=>(
            <button key={o} onClick={()=>setOutcome(o)} style={{padding:"16px 6px",borderRadius:12,border:`2px solid ${outcome===o?c:B.border}`,background:outcome===o?c+"25":B.bgAccent,fontWeight:700,fontSize:12,color:outcome===o?c:B.creamDim,cursor:"pointer",transition:"all 0.15s"}}>{o}</button>
          ))}
        </div>
      </div>
      <div style={{background:B.bgMid,border:`1px solid ${B.border}`,borderRadius:12,padding:16,marginBottom:16}}>
        {lbl("Notas (opcional)")}
        <textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Añade cualquier observación..." style={{width:"100%",padding:"12px",borderRadius:10,border:`1px solid ${B.border}`,background:B.bgAccent,color:B.cream,fontSize:14,outline:"none",fontFamily:"inherit",minHeight:90,resize:"none",boxSizing:"border-box"}}/>
      </div>
      <button onClick={submit} disabled={saving} style={{width:"100%",padding:"18px",borderRadius:12,border:"none",background:saving?B.gray:B.amber,color:B.bg,fontWeight:800,fontSize:17,cursor:saving?"not-allowed":"pointer"}}>
        {saving?"Guardando...":"Enviar trabajo"}
      </button>
    </div>
  );
}

function ROIDashboard() {
  const [roiEvents,setRoiEvents]=useState([]);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    sb("roi_events","GET",null,"?order=created_at.desc").then(data=>{
      setRoiEvents(Array.isArray(data)?data:[]);
      setLoading(false);
    });
  },[]);

  if(loading) return <Loader/>;

  const guaranteesProtected = roiEvents.filter(e=>e.type==="guarantee_protected");
  const guaranteesLost      = roiEvents.filter(e=>e.type==="guarantee_lost");
  const finesSaved          = roiEvents.filter(e=>e.type==="fine_paid_on_time");
  const finesDoubled        = roiEvents.filter(e=>e.type==="fine_doubled");
  const diasPrevented       = roiEvents.filter(e=>e.type==="dia_sin_trabajo_evitado");
  const prodRecovered       = roiEvents.filter(e=>e.type==="production_recovered");

  const guaranteeSaving = guaranteesProtected.reduce((a,e)=>a+(e.value||0),0);
  const fineSaving      = finesSaved.reduce((a,e)=>a+(e.saving||0),0);
  const fineExtra       = finesDoubled.reduce((a,e)=>a+Math.abs(e.saving||0),0);
  const diasSaving      = diasPrevented.reduce((a,e)=>a+(e.value||0),0);
  const prodSaving      = prodRecovered.reduce((a,e)=>a+(e.value||0),0);
  const totalSaving     = guaranteeSaving + fineSaving + diasSaving + prodSaving;
  const totalLost       = guaranteesLost.reduce((a,e)=>a+Math.abs(e.value||0),0) + fineExtra;
  const netSaving       = totalSaving - totalLost;
  const benchmarkMonthly = ROI_BENCHMARK.ordersLostPerTechPerMonth * ROI_BENCHMARK.numTechnicians * ROI_BENCHMARK.pricePerOrder;

  const SavingCard = ({ label, value, sub, color, icon }) => (
    <div style={{background:B.bgMid,borderRadius:12,border:`1px solid ${B.border}`,padding:16,borderTop:`3px solid ${color}`}}>
      <div style={{marginBottom:10}}><Icon name={icon} size={18} color={color}/></div>
      <div style={{fontSize:26,fontWeight:800,color,letterSpacing:-1,lineHeight:1}}>€{value.toLocaleString()}</div>
      <div style={{fontSize:12,fontWeight:600,color:B.cream,marginTop:4}}>{label}</div>
      {sub&&<div style={{fontSize:11,color:B.creamDim,marginTop:2}}>{sub}</div>}
    </div>
  );

  return (
    <div>
      <div style={{background:`linear-gradient(135deg,#1A2E0A,#0D1A06)`,border:`1px solid ${B.green}40`,borderRadius:14,padding:20,marginBottom:20,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
        <div>
          <div style={{fontSize:13,color:B.green,fontWeight:600,textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>💰 Ahorro total registrado</div>
          <div style={{fontSize:42,fontWeight:800,color:B.green,letterSpacing:-2,lineHeight:1}}>€{netSaving.toLocaleString()}</div>
          <div style={{fontSize:13,color:"rgba(255,255,255,0.5)",marginTop:6}}>Desde que Jenecherú está en marcha</div>
        </div>
        <div style={{textAlign:"right"}}>
          <div style={{fontSize:12,color:B.creamDim,marginBottom:4}}>Sin la app, perderías mensualmente:</div>
          <div style={{fontSize:24,fontWeight:800,color:B.red}}>€{benchmarkMonthly.toLocaleString()}</div>
          <div style={{fontSize:11,color:B.creamDim,marginTop:2}}>{ROI_BENCHMARK.ordersLostPerTechPerMonth} órdenes × {ROI_BENCHMARK.numTechnicians} técnicos × €{ROI_BENCHMARK.pricePerOrder}</div>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:20}}>
        <SavingCard icon="shield" label="Garantías protegidas" value={guaranteeSaving} sub={`${guaranteesProtected.length} cumplidas`} color={B.green}/>
        <SavingCard icon="alert"  label="Multas evitadas"      value={fineSaving}      sub={`${finesSaved.length} pagadas a tiempo`} color={B.amber}/>
        <SavingCard icon="wrench" label="Días sin trabajo"     value={diasSaving}      sub={`${diasPrevented.length} eventos`} color={B.blue}/>
        <SavingCard icon="list"   label="Producción"           value={prodSaving}      sub="vs benchmark" color={B.gold}/>
      </div>
      <div style={{background:B.bgMid,border:`1px solid ${B.border}`,borderRadius:12,padding:16}}>
        <div style={{fontSize:13,fontWeight:700,color:B.gold,marginBottom:14,fontFamily:"Georgia,serif",fontStyle:"italic"}}>📋 Registro de eventos</div>
        {roiEvents.length===0&&<div style={{textAlign:"center",color:B.creamDim,fontSize:13,padding:"20px 0"}}>Los eventos aparecerán aquí cuando confirmes garantías y multas.</div>}
        {roiEvents.map((e,i)=>(
          <div key={e.id||i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:`1px solid ${B.border}`}}>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:13,color:B.cream,fontWeight:500}}>{e.note}</div>
              <div style={{fontSize:11,color:B.creamDim,marginTop:2}}>{e.date}</div>
            </div>
            <div style={{fontWeight:700,fontSize:14,color:(e.value||e.saving||0)>=0?B.green:B.red,flexShrink:0}}>
              {(e.value||e.saving||0)>=0?"+":"-"}€{Math.abs(e.value||e.saving||0).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const NAV=[
  {id:"briefing",    icon:"sun",     label:"Buenos Días"},
  {id:"tracker",     icon:"chart",   label:"Seguimiento en Vivo"},
  {id:"produccion",  icon:"list",    label:"Producción"},
  {id:"conciliacion",icon:"euro",    label:"Conciliación"},
  {id:"garantias",   icon:"shield",  label:"Garantías"},
  {id:"stock",       icon:"box",     label:"Inventario"},
  {id:"multas",      icon:"alert",   label:"Multas"},
  {id:"flota",       icon:"truck",   label:"Flota"},
  {id:"roi",         icon:"savings", label:"Ahorros"},
  {id:"joblog",      icon:"flame",   label:"Registrar trabajo"},
];
const TITLES={briefing:"Resumen del Día",tracker:"Seguimiento en Vivo",produccion:"Panel de Producción",conciliacion:"Conciliación de Pagos",garantias:"Control de Garantías",stock:"Inventario y Stock",multas:"Control de Multas",flota:"Gestión de Flota",roi:"Ahorros",joblog:"Registrar Trabajo"};
const BOTTOM_TABS=[{id:"briefing",icon:"sun",label:"Inicio"},{id:"garantias",icon:"shield",label:"Garantías"},{id:"stock",icon:"box",label:"Inventario"},{id:"roi",icon:"savings",label:"Ahorros"}];

const TiloMark = ({ size = 120 }) => (
  <svg width={size} height={size * 0.4} viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="tiloGold" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#C9A84C"/><stop offset="100%" stopColor="#9A7A2E"/></linearGradient></defs>
    <rect x="60" y="2" width="80" height="10" rx="1" fill="url(#tiloGold)"/>
    <rect x="95" y="2" width="10" height="38" rx="1" fill="url(#tiloGold)"/>
    <text x="100" y="60" textAnchor="middle" fontFamily="Georgia, serif" fontSize="14" fontWeight="400" fill="#C9A84C" letterSpacing="6">TILO STUDIO</text>
    <line x1="30" y1="64" x2="68" y2="64" stroke="#9A7A2E" strokeWidth="0.8"/>
    <line x1="132" y1="64" x2="170" y2="64" stroke="#9A7A2E" strokeWidth="0.8"/>
  </svg>
);

function TechnicianLogin({ onLogin, onBack }) {
  const [selected, setSelected] = useState(null);
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const handlePad = (val) => {
    if (val === "X") { setPin(p => p.slice(0,-1)); setError(""); return; }
    if (pin.length >= 4) return;
    const next = pin + val;
    setPin(next);
    setError("");
    if (next.length === 4) {
      setTimeout(() => {
        if (next === selected.pin) { onLogin("technician", selected); }
        else { setError("PIN incorrecto. Inténtalo de nuevo."); setPin(""); }
      }, 200);
    }
  };

  return (
    <div style={{minHeight:"100vh",background:B.bg,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Sans',sans-serif",padding:20}}>
      <div style={{background:B.bgMid,border:`1px solid ${B.border}`,borderRadius:20,padding:28,width:"100%",maxWidth:400,boxShadow:"0 24px 80px rgba(0,0,0,0.6)"}}>
        {!selected ? (
          <>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
              <button onClick={onBack} style={{background:"transparent",border:"none",cursor:"pointer",color:B.creamDim,fontSize:18,padding:4}}>←</button>
              <div><div style={{fontSize:16,fontWeight:700,color:B.amber,fontFamily:"Georgia,serif",fontStyle:"italic"}}>¿Quién eres?</div><div style={{fontSize:12,color:B.creamDim}}>Selecciona tu nombre</div></div>
            </div>
            <div style={{maxHeight:420,overflowY:"auto",display:"flex",flexDirection:"column",gap:8}}>
              {TECHNICIANS.map(t => (
                <button key={t.id} onClick={()=>setSelected(t)} style={{padding:"14px 16px",borderRadius:10,border:`1px solid ${B.border}`,background:B.bgAccent,cursor:"pointer",textAlign:"left",display:"flex",alignItems:"center",gap:12}}>
                  <div style={{width:36,height:36,borderRadius:"50%",background:B.amber+"20",border:`1px solid ${B.amber}40`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <span style={{fontSize:13,fontWeight:700,color:B.amber}}>{t.name.charAt(0)}</span>
                  </div>
                  <span style={{fontSize:14,fontWeight:600,color:B.cream}}>{t.name}</span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
              <button onClick={()=>{setSelected(null);setPin("");setError("");}} style={{background:"transparent",border:"none",cursor:"pointer",color:B.creamDim,fontSize:18,padding:4}}>←</button>
              <div><div style={{fontSize:16,fontWeight:700,color:B.amber,fontFamily:"Georgia,serif",fontStyle:"italic"}}>{selected.name}</div><div style={{fontSize:12,color:B.creamDim}}>Introduce tu PIN de 4 dígitos</div></div>
            </div>
            <div style={{display:"flex",justifyContent:"center",gap:16,marginBottom:24}}>
              {[0,1,2,3].map(i => (<div key={i} style={{width:18,height:18,borderRadius:"50%",background:i<pin.length?B.amber:B.bgAccent,border:`2px solid ${i<pin.length?B.amber:B.border}`,transition:"all 0.15s"}}/>))}
            </div>
            {error && <div style={{textAlign:"center",color:B.red,fontSize:13,marginBottom:16,fontWeight:600}}>{error}</div>}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
              {["1","2","3","4","5","6","7","8","9","","0","X"].map(k => (
                k === "" ? <div key="empty"/> :
                <button key={k} onClick={()=>handlePad(k)} style={{padding:"18px",borderRadius:12,border:`1px solid ${B.border}`,background:B.bgAccent,color:k==="X"?B.creamDim:B.cream,fontSize:k==="X"?18:22,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>{k === "X" ? "⌫" : k}</button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Login({onLogin}){
  const [mode, setMode] = useState(null);
  const [email,setEmail]=useState("");
  const [pass,setPass]=useState("");
  const [err,setErr]=useState("");

  if (mode === "technician") return <TechnicianLogin onLogin={onLogin} onBack={()=>setMode(null)}/>;

  const submit=()=>{
    if((email==="daniel@jenecheru.es"||email==="jenecherutelecomunicaciones@gmail.com")&&pass==="jenecheru2026"){onLogin("owner");return;}
    if((email==="secretaria@jenecheru.es"||email==="jenecheruteleco@gmail.com")&&pass==="jenecheru2026"){onLogin("secretary");return;}
    setErr("Credenciales incorrectas.");
  };

  return (
    <div style={{minHeight:"100vh",background:B.bg,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Sans',sans-serif",padding:20}}>
      <div style={{background:B.bgMid,border:`1px solid ${B.border}`,borderRadius:20,padding:32,width:"100%",maxWidth:400,boxShadow:"0 24px 80px rgba(0,0,0,0.6)"}}>
        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{display:"flex",justifyContent:"center",marginLeft:"-20px",marginBottom:16}}><JLogo size={110}/></div>
          <div style={{fontFamily:"Georgia,serif",fontSize:24,fontWeight:700,fontStyle:"italic",color:B.amber}}>Jenecherú</div>
          <div style={{fontSize:11,color:B.creamDim,letterSpacing:"0.15em",textTransform:"uppercase",marginTop:4}}>El fuego que nunca se apaga</div>
        </div>
        <button onClick={()=>setMode("technician")} style={{width:"100%",padding:"16px",borderRadius:12,border:`2px solid ${B.amber}`,background:B.amber+"15",color:B.amber,fontWeight:800,fontSize:16,cursor:"pointer",marginBottom:20,fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
          <Icon name="flame" size={20} color={B.amber}/> Soy técnico
        </button>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
          <div style={{flex:1,height:1,background:B.border}}/><span style={{fontSize:12,color:B.creamDim}}>o</span><div style={{flex:1,height:1,background:B.border}}/>
        </div>
        <div style={{marginBottom:14}}>
          <div style={{fontSize:11,fontWeight:600,color:B.amber,marginBottom:6,textTransform:"uppercase",letterSpacing:0.8}}>Email</div>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="tu@email.com" autoCapitalize="none" style={{width:"100%",padding:"14px",borderRadius:10,border:`1px solid ${B.border}`,background:B.bgAccent,color:B.cream,fontSize:16,outline:"none",fontFamily:"inherit",boxSizing:"border-box"}} onKeyDown={e=>e.key==="Enter"&&submit()}/>
        </div>
        <div style={{marginBottom:20}}>
          <div style={{fontSize:11,fontWeight:600,color:B.amber,marginBottom:6,textTransform:"uppercase",letterSpacing:0.8}}>Contraseña</div>
          <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="••••••••" style={{width:"100%",padding:"14px",borderRadius:10,border:`1px solid ${B.border}`,background:B.bgAccent,color:B.cream,fontSize:16,outline:"none",fontFamily:"inherit",boxSizing:"border-box"}} onKeyDown={e=>e.key==="Enter"&&submit()}/>
        </div>
        {err&&<div style={{background:B.red+"15",color:B.red,padding:"10px 14px",borderRadius:8,fontSize:13,marginBottom:16,border:`1px solid ${B.red}30`}}>{err}</div>}
        <button onClick={submit} style={{width:"100%",padding:"14px",borderRadius:10,border:`1px solid ${B.border}`,background:B.bgAccent,color:B.creamDim,fontWeight:700,fontSize:15,cursor:"pointer"}}>Entrar</button>
        <div style={{textAlign:"center",marginTop:28,paddingTop:20,borderTop:`1px solid ${B.border}`}}>
          <TiloMark size={120}/>
          <div style={{fontSize:10,color:"#555",marginTop:8,letterSpacing:"0.05em"}}>© 2026 Tilo Studio. Todos los derechos reservados.</div>
        </div>
      </div>
    </div>
  );
}

function MobileMenu({screen,setScreen,role,onClose,onLogout}){
  const visibleNav=role==="technician"?NAV.filter(n=>n.id==="joblog"):role==="secretary"?NAV.filter(n=>n.id!=="conciliacion"&&n.id!=="roi"):NAV;
  return (
    <div style={{position:"fixed",inset:0,zIndex:200,display:"flex"}}>
      <div style={{flex:1,background:"rgba(0,0,0,0.6)"}} onClick={onClose}/>
      <div style={{width:260,background:B.bgMid,borderLeft:`1px solid ${B.border}`,display:"flex",flexDirection:"column",overflowY:"auto"}}>
        <div style={{padding:"20px 18px 16px",borderBottom:`1px solid ${B.border}`,display:"flex",alignItems:"center",gap:12}}>
          <JLogo size={38}/>
          <div><div style={{fontFamily:"Georgia,serif",fontSize:15,fontWeight:700,fontStyle:"italic",color:B.amber}}>Jenecherú</div><div style={{fontSize:9,color:B.creamDim,letterSpacing:"0.1em",textTransform:"uppercase",marginTop:1}}>El fuego que nunca se apaga</div></div>
        </div>
        <nav style={{flex:1,padding:"8px 0"}}>
          {visibleNav.map(item=>(
            <div key={item.id} style={{display:"flex",alignItems:"center",gap:10,padding:"12px 18px",cursor:"pointer",color:screen===item.id?B.amber:B.creamDim,background:screen===item.id?B.amber+"18":"transparent",borderLeft:`3px solid ${screen===item.id?B.amber:"transparent"}`,fontSize:14,fontWeight:screen===item.id?600:400}} onClick={()=>{setScreen(item.id);onClose();}}>
              <Icon name={item.icon} size={18} color={screen===item.id?B.amber:B.creamDim}/><span>{item.label}</span>
            </div>
          ))}
        </nav>
        <div style={{padding:"16px 18px",borderTop:`1px solid ${B.border}`}}>
          <div style={{fontSize:11,color:B.creamDim,marginBottom:3}}>Sesión activa</div>
          <div style={{fontSize:13,color:B.amber,fontWeight:600,marginBottom:10}}>{role==="owner"?"Daniel (Propietario)":role==="secretary"?"Secretaria":"Técnico"}</div>
          <button onClick={onLogout} style={{width:"100%",padding:"10px",borderRadius:8,border:`1px solid ${B.border}`,background:"transparent",color:B.creamDim,fontSize:13,cursor:"pointer"}}>Cerrar sesión</button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [role,setRole]=useState(()=>sessionStorage.getItem("jr_role")||null);
  const [currentTech,setCurrentTech]=useState(()=>{
    const t=sessionStorage.getItem("jr_tech");
    return t?JSON.parse(t):null;
  });
  const [screen,setScreen]=useState(()=>sessionStorage.getItem("jr_screen")||"briefing");
  const [menuOpen,setMenuOpen]=useState(false);
  const [stock,setStock]=useState([]);
  const [fines,setFines]=useState([]);
  const [guarantees,setGuarantees]=useState([]);
  const [vehicles,setVehicles]=useState([]);
  const isMobile=useIsMobile();

  const handleLogin=(r,tech)=>{
    sessionStorage.setItem("jr_role",r);
    sessionStorage.setItem("jr_tech",tech?JSON.stringify(tech):"");
    const sc=r==="technician"?"joblog":"briefing";
    sessionStorage.setItem("jr_screen",sc);
    setRole(r); setCurrentTech(tech||null); setScreen(sc);
  };

  const handleLogout=()=>{
    sessionStorage.removeItem("jr_role");
    sessionStorage.removeItem("jr_tech");
    sessionStorage.removeItem("jr_screen");
    setRole(null); setCurrentTech(null);
  };

  // Save screen to sessionStorage whenever it changes
  useEffect(()=>{ if(screen) sessionStorage.setItem("jr_screen",screen); },[screen]);

  useEffect(()=>{
    if(role&&role!=="technician"){
      sb("stock","GET",null,"?order=name.asc").then(d=>setStock(Array.isArray(d)?d:[]));
      sb("fines","GET",null,"?order=days_left.asc").then(d=>setFines(Array.isArray(d)?d:[]));
      sb("guarantees","GET",null,"?order=days_left.asc").then(d=>setGuarantees(Array.isArray(d)?d:[]));
      sb("vehicles","GET",null,"?order=plate.asc").then(d=>setVehicles(Array.isArray(d)?d:[]));
    }
  },[role]);

  if(!role) return <Login onLogin={handleLogin}/>;

  const visibleNav=role==="technician"?NAV.filter(n=>n.id==="joblog"):role==="secretary"?NAV.filter(n=>n.id!=="conciliacion"&&n.id!=="roi"):NAV;

  const renderScreen=()=>{
    const p={isMobile,setScreen,stock,fines,guarantees,vehicles};
    switch(screen){
      case "briefing":    return <Briefing {...p}/>;
      case "tracker":     return <Tracker/>;
      case "produccion":  return <Production/>;
      case "conciliacion":return <Reconciliation/>;
      case "garantias":   return <Guarantees/>;
      case "stock":       return <Stock/>;
      case "multas":      return <Fines/>;
      case "flota":       return <Fleet/>;
      case "roi":         return <ROIDashboard/>;
      case "joblog":      return <JobLog currentTech={currentTech}/>;
      default:            return <Briefing {...p}/>;
    }
  };

  if(isMobile) return (
    <div style={{display:"flex",flexDirection:"column",height:"100vh",background:B.bg,fontFamily:"'DM Sans',sans-serif",color:B.cream}}>
      {menuOpen&&<MobileMenu screen={screen} setScreen={setScreen} role={role} onClose={()=>setMenuOpen(false)} onLogout={()=>{handleLogout();setMenuOpen(false);}}/>}
      <div style={{background:B.bgMid,borderBottom:`1px solid ${B.border}`,padding:"12px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0,position:"sticky",top:0,zIndex:100}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <JLogo size={30}/>
          <div style={{fontFamily:"Georgia,serif",fontSize:16,fontWeight:700,fontStyle:"italic",color:B.amber}}>Jenecherú</div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{fontSize:12,color:B.creamDim,maxWidth:120,textAlign:"right",lineHeight:1.3}}>{TITLES[screen]}</div>
          <button onClick={()=>window.location.reload()} style={{background:B.bgAccent,border:`1px solid ${B.border}`,borderRadius:8,padding:"8px 10px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}} title="Actualizar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={B.creamDim} strokeWidth="1.5" strokeLinecap="round"><path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/></svg>
          </button>
          <button onClick={()=>setMenuOpen(true)} style={{background:B.bgAccent,border:`1px solid ${B.border}`,borderRadius:8,padding:"8px 10px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><Icon name="menu" size={18} color={B.cream}/></button>
        </div>
      </div>
      <div style={{flex:1,overflow:"auto",padding:"16px 14px",paddingBottom:80}}>{renderScreen()}</div>
      {role!=="technician"&&(
        <div style={{position:"fixed",bottom:0,left:0,right:0,background:B.bgMid,borderTop:`1px solid ${B.border}`,display:"flex",zIndex:100,paddingBottom:"env(safe-area-inset-bottom)"}}>
          {BOTTOM_TABS.map(tab=>(
            <button key={tab.id} onClick={()=>setScreen(tab.id)} style={{flex:1,padding:"10px 4px",background:"transparent",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,borderTop:`2px solid ${screen===tab.id?B.amber:"transparent"}`}}>
              <Icon name={tab.icon} size={20} color={screen===tab.id?B.amber:B.creamDim}/>
              <span style={{fontSize:10,fontWeight:600,color:screen===tab.id?B.amber:B.creamDim}}>{tab.label}</span>
            </button>
          ))}
          <button onClick={()=>setMenuOpen(true)} style={{flex:1,padding:"10px 4px",background:"transparent",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,borderTop:"2px solid transparent"}}>
            <Icon name="menu" size={20} color={B.creamDim}/>
            <span style={{fontSize:10,fontWeight:600,color:B.creamDim}}>Más</span>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div style={{display:"flex",height:"100vh",fontFamily:"'DM Sans',sans-serif",background:B.bg,overflow:"hidden",color:B.cream}}>
      <div style={{width:248,background:B.bgMid,display:"flex",flexDirection:"column",flexShrink:0,overflow:"auto",borderRight:`1px solid ${B.border}`}}>
        <div style={{padding:"20px 18px 16px",borderBottom:`1px solid ${B.border}`,display:"flex",alignItems:"center",gap:12}}>
          <JLogo size={42}/>
          <div><div style={{fontFamily:"Georgia,serif",fontSize:16,fontWeight:700,fontStyle:"italic",color:B.amber,lineHeight:1.2}}>Jenecherú</div><div style={{fontSize:9,color:B.creamDim,letterSpacing:"0.12em",textTransform:"uppercase",marginTop:2}}>El fuego que nunca se apaga</div></div>
        </div>
        <nav style={{padding:"10px 0",flex:1}}>
          {visibleNav.map(item=>(
            <div key={item.id} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 18px",cursor:"pointer",color:screen===item.id?B.amber:B.creamDim,background:screen===item.id?B.amber+"18":"transparent",borderLeft:`3px solid ${screen===item.id?B.amber:"transparent"}`,fontSize:13,fontWeight:screen===item.id?600:400,transition:"all 0.15s",userSelect:"none"}} onClick={()=>setScreen(item.id)}>
              <Icon name={item.icon} size={16} color={screen===item.id?B.amber:B.creamDim}/><span>{item.label}</span>
            </div>
          ))}
        </nav>
        <div style={{padding:"16px 18px",borderTop:`1px solid ${B.border}`}}>
          <div style={{fontSize:11,color:B.creamDim,marginBottom:3}}>Sesión activa</div>
          <div style={{fontSize:13,color:B.amber,fontWeight:600,marginBottom:10}}>{role==="owner"?"Daniel (Propietario)":role==="secretary"?"Secretaria":"Técnico"}</div>
          <button onClick={handleLogout} style={{width:"100%",padding:"7px",borderRadius:8,border:`1px solid ${B.border}`,background:"transparent",color:B.creamDim,fontSize:12,cursor:"pointer"}}>Cerrar sesión</button>
        </div>
      </div>
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        <div style={{background:B.bgMid,borderBottom:`1px solid ${B.border}`,padding:"14px 28px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
          <div style={{fontSize:17,fontWeight:700,color:B.cream,fontFamily:"Georgia,serif",fontStyle:"italic"}}>{TITLES[screen]}</div>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <button onClick={()=>window.location.reload()} style={{background:B.bgAccent,border:`1px solid ${B.border}`,borderRadius:8,padding:"7px 12px",cursor:"pointer",display:"flex",alignItems:"center",gap:6,color:B.creamDim,fontSize:12,fontFamily:"inherit"}} title="Actualizar">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={B.creamDim} strokeWidth="1.5" strokeLinecap="round"><path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/></svg>
              Actualizar
            </button>
            <div style={{fontSize:12,color:B.creamDim}}>{new Date().toLocaleDateString("es-ES",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}</div>
          </div>
        </div>
        <div style={{flex:1,overflow:"auto",padding:24}}>{renderScreen()}</div>
      </div>
    </div>
  );
}
