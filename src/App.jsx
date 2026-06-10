import { useState, useEffect, useRef } from "react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

// Logo replaced with inline SVG — no external image needed

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
    sun:        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" style={s}><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
    chart:      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" style={s}><rect x="2" y="12" width="4" height="10" rx="1"/><rect x="9" y="7" width="4" height="15" rx="1"/><rect x="16" y="3" width="4" height="19" rx="1"/></svg>,
    list:       <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" style={s}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="3" cy="6" r="1" fill={color}/><circle cx="3" cy="12" r="1" fill={color}/><circle cx="3" cy="18" r="1" fill={color}/></svg>,
    euro:       <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" style={s}><path d="M17 6a6 6 0 1 0 0 12"/><line x1="3" y1="10" x2="13" y2="10"/><line x1="3" y1="14" x2="13" y2="14"/></svg>,
    shield:     <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" style={s}><path d="M12 2L3 7v6c0 5 4 9 9 10 5-1 9-5 9-10V7z"/></svg>,
    box:        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" style={s}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
    alert:      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" style={s}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    truck:      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" style={s}><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 5v4h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
    folder:     <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" style={s}><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>,
    flame:      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" style={s}><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>,
    savings:    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" style={s}><path d="M12 2v20M17 5H9.5a3.5 3.5 0 1 0 0 7h5a3.5 3.5 0 1 1 0 7H6"/></svg>,
    check:      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" style={s}><polyline points="20 6 9 17 4 12"/></svg>,
    cross:      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" style={s}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    warning:    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" style={s}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
    user:       <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" style={s}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    chat:       <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" style={s}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    upload:     <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" style={s}><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>,
    file:       <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" style={s}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
    wrench:     <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" style={s}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
    calendar:   <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" style={s}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    lock:       <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" style={s}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
    trending:   <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" style={s}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
    menu:       <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" style={s}><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
    close:      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" style={s}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    dot:        <svg viewBox="0 0 24 24" style={s}><circle cx="12" cy="12" r="5" fill={color}/></svg>,
    arrow:      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" style={s}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  };
  return paths[name] || null;
};

// Recreated from brand — dark circle, amber script, tagline
const JLogo = ({ size = 80 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="bgGrad" cx="40%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#2A2016"/>
        <stop offset="100%" stopColor="#0D0B09"/>
      </radialGradient>
      <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E8830A"/>
        <stop offset="50%" stopColor="#F5A623"/>
        <stop offset="100%" stopColor="#D97706"/>
      </linearGradient>
      <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#E8830A"/>
        <stop offset="100%" stopColor="#F5A623"/>
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>

    {/* Outer glow ring */}
    <circle cx="100" cy="100" r="96" fill="none" stroke="#E8830A" strokeWidth="0.5" opacity="0.3"/>

    {/* Main circle background */}
    <circle cx="100" cy="100" r="90" fill="url(#bgGrad)"/>

    {/* Metallic border ring */}
    <circle cx="100" cy="100" r="90" fill="none" stroke="url(#ringGrad)" strokeWidth="2.5"/>
    <circle cx="100" cy="100" r="84" fill="none" stroke="#3A2A0A" strokeWidth="0.8" opacity="0.6"/>

    {/* Inner highlight arc - top left */}
    <path d="M 30 70 A 75 75 0 0 1 90 18" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="8" strokeLinecap="round"/>

    {/* Script text - Jenecherú */}
    <text
      x="100" y="112"
      textAnchor="middle"
      fontFamily="Georgia, 'Times New Roman', serif"
      fontStyle="italic"
      fontWeight="700"
      fontSize="36"
      fill="url(#textGrad)"
      filter="url(#glow)"
      letterSpacing="1"
    >Jenecherú</text>

    {/* Decorative underline swash */}
    <path d="M 48 120 Q 100 128 152 120" fill="none" stroke="#E8830A" strokeWidth="0.8" opacity="0.5"/>

    {/* Tagline */}
    <text
      x="100" y="140"
      textAnchor="middle"
      fontFamily="Arial, sans-serif"
      fontWeight="500"
      fontSize="9"
      fill="#B8A88A"
      letterSpacing="2"
    >EL FUEGO QUE NUNCA SE APAGA</text>
  </svg>
);

const TECHNICIANS = [
  { id:1,  name:"Mauricio Acosta",       pin:"7854", jobsAssigned:7, jobsCompleted:0, status:"SIN INICIAR" },
  { id:2,  name:"Gonzalo Fernández",     pin:"7516", jobsAssigned:7, jobsCompleted:0, status:"SIN INICIAR" },
  { id:3,  name:"Bayron Guzmán",         pin:"5589", jobsAssigned:7, jobsCompleted:0, status:"SIN INICIAR" },
  { id:4,  name:"Daniel I. Ordóñez",     pin:"2852", jobsAssigned:7, jobsCompleted:0, status:"SIN INICIAR" },
  { id:5,  name:"Daniel Ordóñez López",  pin:"5692", jobsAssigned:7, jobsCompleted:0, status:"SIN INICIAR" },
  { id:6,  name:"Oscar Pacheco",         pin:"4535", jobsAssigned:7, jobsCompleted:0, status:"SIN INICIAR" },
  { id:7,  name:"Ariel Saavedra",        pin:"6465", jobsAssigned:7, jobsCompleted:0, status:"SIN INICIAR" },
  { id:8,  name:"Edson Guzmán",          pin:"0639", jobsAssigned:7, jobsCompleted:0, status:"SIN INICIAR" },
  { id:9,  name:"Jhon Medina",           pin:"1054", jobsAssigned:7, jobsCompleted:0, status:"SIN INICIAR" },
  { id:10, name:"Diego Torrez",          pin:"2776", jobsAssigned:7, jobsCompleted:0, status:"SIN INICIAR" },
  { id:11, name:"David Rondón",          pin:"9187", jobsAssigned:7, jobsCompleted:0, status:"SIN INICIAR" },
  { id:12, name:"Elver Rondón",          pin:"2915", jobsAssigned:7, jobsCompleted:0, status:"SIN INICIAR" },
  { id:13, name:"Alexis Rincón",         pin:"3874", jobsAssigned:7, jobsCompleted:0, status:"SIN INICIAR" },
  { id:14, name:"Nicolás Godoy",         pin:"8152", jobsAssigned:7, jobsCompleted:0, status:"SIN INICIAR" },
  { id:15, name:"Carlos Benítez",        pin:"8579", jobsAssigned:7, jobsCompleted:0, status:"SIN INICIAR" },
  { id:16, name:"Harley Salvatierra",    pin:"3990", jobsAssigned:7, jobsCompleted:0, status:"SIN INICIAR" },
  { id:17, name:"Tuvshinbileg B.",       pin:"6348", jobsAssigned:7, jobsCompleted:0, status:"SIN INICIAR" },
  { id:18, name:"Javed Saleem",          pin:"4846", jobsAssigned:7, jobsCompleted:0, status:"SIN INICIAR" },
  { id:19, name:"Leonardo Ocampo",       pin:"8135", jobsAssigned:7, jobsCompleted:0, status:"SIN INICIAR" },
];

const STOCK_ITEMS = [
  { id:1,  name:"Cortadora de fibra",          category:"Herramienta", quantity:0, minimum:2, status:"CRÍTICO" },
  { id:2,  name:"Fusionadora",                 category:"Herramienta", quantity:0, minimum:2, status:"CRÍTICO" },
  { id:3,  name:"Láser",                       category:"Herramienta", quantity:0, minimum:2, status:"CRÍTICO" },
  { id:4,  name:"GPON",                        category:"Herramienta", quantity:0, minimum:2, status:"CRÍTICO" },
  { id:5,  name:"Broca larga y pequeña",       category:"Herramienta", quantity:0, minimum:5, status:"CRÍTICO" },
  { id:6,  name:"Crimpadora RJ45",             category:"Herramienta", quantity:0, minimum:2, status:"CRÍTICO" },
  { id:7,  name:"Dymo",                        category:"Herramienta", quantity:0, minimum:2, status:"CRÍTICO" },
  { id:8,  name:"Grapadora",                   category:"Herramienta", quantity:0, minimum:2, status:"CRÍTICO" },
  { id:9,  name:"Guía pasacables",             category:"Herramienta", quantity:0, minimum:2, status:"CRÍTICO" },
  { id:10, name:"Peladora de fibra",           category:"Herramienta", quantity:0, minimum:2, status:"CRÍTICO" },
  { id:11, name:"Tijeras eléctricas",          category:"Herramienta", quantity:0, minimum:2, status:"CRÍTICO" },
  { id:12, name:"Taladro",                     category:"Herramienta", quantity:0, minimum:2, status:"CRÍTICO" },
  { id:13, name:"Alicates",                    category:"Herramienta", quantity:0, minimum:5, status:"CRÍTICO" },
  { id:14, name:"Destornillador pala/estrella",category:"Herramienta", quantity:0, minimum:5, status:"CRÍTICO" },
  { id:15, name:"Sonda ZTE/Corning/Huawei/3M", category:"Herramienta", quantity:0, minimum:2, status:"CRÍTICO" },
  { id:16, name:"Escalera exterior",           category:"Herramienta", quantity:0, minimum:2, status:"CRÍTICO" },
  { id:17, name:"Escalera interior",           category:"Herramienta", quantity:0, minimum:2, status:"CRÍTICO" },
  { id:18, name:"Extintor",                    category:"EPI",         quantity:0, minimum:1, status:"CRÍTICO" },
  { id:19, name:"Botiquín",                    category:"EPI",         quantity:0, minimum:1, status:"CRÍTICO" },
  { id:20, name:"Casco con barbuquejo",        category:"EPI",         quantity:0, minimum:5, status:"CRÍTICO" },
  { id:21, name:"Gafas de seguridad",          category:"EPI",         quantity:0, minimum:5, status:"CRÍTICO" },
  { id:22, name:"Guantes",                     category:"EPI",         quantity:0, minimum:10,status:"CRÍTICO" },
  { id:23, name:"Chaleco reflectante",         category:"EPI",         quantity:0, minimum:10,status:"CRÍTICO" },
  { id:24, name:"Conos reflectantes",          category:"EPI",         quantity:0, minimum:5, status:"CRÍTICO" },
  { id:25, name:"Cinturón portaherramientas",  category:"EPI",         quantity:0, minimum:5, status:"CRÍTICO" },
  { id:26, name:"Arnés",                       category:"EPI",         quantity:0, minimum:2, status:"CRÍTICO" },
];

const FINES = [
  { id:1, ref:"MUL-001", description:"Incumplimiento plazo instalación", received:"10/05/2026", amount:320, due:"20/05/2026", daysLeft:4,  status:"PENDIENTE" },
  { id:2, ref:"MUL-002", description:"Documentación incompleta",         received:"02/04/2026", amount:180, due:"15/04/2026", daysLeft:0,  status:"PAGADA" },
  { id:3, ref:"MUL-003", description:"Retraso en reporte mensual",       received:"12/05/2026", amount:250, due:"26/05/2026", daysLeft:10, status:"PENDIENTE" },
];

const VEHICLES = [
  { id:1, plate:"S9472AN",  model:"Seat 1999",          status:"ACTIVO", technician:"Bayron Guzmán",       itv:"01/12/2026", insurance:"19/01/2027", lastOil:"—", lastService:"—" },
  { id:2, plate:"1304BLH",  model:"Peugeot 2001",       status:"ACTIVO", technician:"Oscar Pacheco",        itv:"24/09/2026", insurance:"27/06/2026", lastOil:"—", lastService:"—" },
  { id:3, plate:"B6287UT",  model:"Ford Focus 1998",    status:"ACTIVO", technician:"Alexis Rincón",        itv:"19/05/2026", insurance:"13/11/2026", lastOil:"—", lastService:"—" },
  { id:4, plate:"1983CPF",  model:"Renault Megane 2002",status:"ACTIVO", technician:"Ariel Saavedra",       itv:"23/01/2027", insurance:"19/01/2027", lastOil:"—", lastService:"—" },
  { id:5, plate:"4722MCV",  model:"Mercedes Benz 2000", status:"ACTIVO", technician:"Carlos Benítez",       itv:"07/01/2027", insurance:"13/11/2026", lastOil:"—", lastService:"—" },
  { id:6, plate:"6630GJN",  model:"Peugeot 2008",       status:"ACTIVO", technician:"Tuvshinbileg B.",      itv:"09/03/2027", insurance:"26/09/2026", lastOil:"—", lastService:"—" },
  { id:7, plate:"1549MTP",  model:"Omoda 2024",         status:"ACTIVO", technician:"Daniel Ordóñez López", itv:"16/08/2028", insurance:"22/10/2026", lastOil:"—", lastService:"—" },
];

const GUARANTEES = [
  { id:1, ref:"JOB-1041", orden:"ORD-88421", technician:"Diego",  clientName:"Antonio García",   phone:"612 345 678", address:"Calle Mayor 12, 3ºB, Bilbao",       completed:"05/05/2026", expires:"20/05/2026", daysLeft:4, status:"ACTIVA" },
  { id:2, ref:"JOB-1038", orden:"ORD-88398", technician:"Bones",  clientName:"María López",       phone:"634 567 890", address:"Av. Autonomía 45, 1ºA, Bilbao",    completed:"03/05/2026", expires:"18/05/2026", daysLeft:2, status:"EN RIESGO" },
  { id:3, ref:"JOB-1035", orden:"ORD-88375", technician:"John",   clientName:"Pedro Martínez",    phone:"645 678 901", address:"C/ Licenciado Poza 8, Bilbao",      completed:"01/05/2026", expires:"16/05/2026", daysLeft:0, status:"VENCIDA" },
  { id:4, ref:"JOB-1029", orden:"ORD-88312", technician:"Carlos", clientName:"Lucía Fernández",   phone:"656 789 012", address:"Calle Autonomía 78, 4ºC, Bilbao",  completed:"10/05/2026", expires:"25/05/2026", daysLeft:9, status:"ACTIVA" },
  { id:5, ref:"JOB-1022", orden:"ORD-88290", technician:"Miguel", clientName:"Roberto Sánchez",   phone:"667 890 123", address:"Gran Vía 22, 2ºD, Bilbao",         completed:"08/05/2026", expires:"23/05/2026", daysLeft:7, status:"ACTIVA" },
];

const INVOICES = [
  { id:1, supplier:"Electro Componentes SL", date:"10/05/2026", amount:1240.00, category:"Material",           file:"factura_electro_mayo.pdf" },
  { id:2, supplier:"Renting Flota SA",        date:"01/05/2026", amount:3600.00, category:"Vehículos",          file:"renting_mayo.pdf" },
  { id:3, supplier:"EPI Seguridad",           date:"28/04/2026", amount:480.50,  category:"EPI",               file:"epi_abril.pdf" },
  { id:4, supplier:"Telefónica Empresas",     date:"15/04/2026", amount:890.00,  category:"Telecomunicaciones", file:"telefonica_abril.pdf" },
];

const PRODUCTION_DATA = TECHNICIANS.map(t => {
  const m = Math.floor(Math.random()*30+60);
  const a = Math.floor(Math.random()*20+20);
  return { ...t, mantenimiento:m, altas:a, total:m+a, expected:160, diff:(m+a)-160 };
});
// Referencia base: cómo era el negocio ANTES de la aplicación
const ROI_BENCHMARK = {
  ordersLostPerTechPerMonth: 7,    
  pricePerOrder: 26.70,            
  fineDoubleRisk: true,            
  avgDiasSinTrabajoPorMes: 4,      
  avgDailyCostPerTech: 120,        
  avgMonthlyGarageCost: 1400,      
  numTechnicians: 19,              
};


const INITIAL_ROI_EVENTS = [
  { id:1, type:"guarantee_protected", date:"05/05/2026", ref:"JOB-1041", technician:"Diego",  value:26.70,  note:"Garantía completada a tiempo" },
  { id:2, type:"guarantee_protected", date:"08/05/2026", ref:"JOB-1022", technician:"Miguel", value:26.70,  note:"Garantía completada a tiempo" },
  { id:3, type:"fine_paid_on_time",   date:"10/05/2026", ref:"MUL-001",  amount:320,   saving:320,   note:"Multa pagada — se evitó duplicación" },
  { id:4, type:"dia_sin_trabajo_evitado",  date:"09/05/2026", technician:"John",   value:120,  note:"Stock repuesto antes de agotarse" },
  { id:5, type:"production_recovered",date:"01/05/2026", month:"Mayo",   ordersRecovered:5, value:133.50, note:"5 órdenes menos perdidas que el mes anterior" },
];

// Chart data
const WEEKLY_JOBS = [
  {day:"Lun", completados:41, asignados:55},
  {day:"Mar", completados:53, asignados:60},
  {day:"Mié", completados:48, asignados:58},
  {day:"Jue", completados:61, asignados:65},
  {day:"Vie", completados:57, asignados:62},
  {day:"Sáb", completados:32, asignados:40},
  {day:"Hoy", completados:43, asignados:79},
];

const MONTHLY_TREND = [
  {month:"Ene", produccion:142, esperado:154, perdida:3180},
  {month:"Feb", produccion:148, esperado:154, perdida:1605},
  {month:"Mar", produccion:139, esperado:154, perdida:4005},
  {month:"Abr", produccion:151, esperado:154, perdida:801},
  {month:"May", produccion:144, esperado:154, perdida:2670},
];

const TOP_PERFORMERS = TECHNICIANS.slice(0,6).map(t=>({
  name:t.name,
  pct:Math.round((t.jobsCompleted/t.jobsAssigned)*100),
  completed:t.jobsCompleted,
})).sort((a,b)=>b.pct-a.pct);

const STATUS_PIE = [
  {name:"En ruta",     value:TECHNICIANS.filter(t=>t.status==="EN RUTA").length,     color:B.amber},
  {name:"Completado",  value:TECHNICIANS.filter(t=>t.status==="COMPLETADO").length,  color:B.green},
  {name:"Sin iniciar", value:TECHNICIANS.filter(t=>t.status==="SIN INICIAR").length, color:B.gray},
];

// Business context for AI
const BUSINESS_CONTEXT = `
Eres el asistente de inteligencia artificial de Jenecherú IA, una aplicación de gestión de operaciones para una empresa de telecomunicaciones subcontratista en Erandio, Vizcaya (Bilbao), España. Razón social: JENECHERU TELECOMUNICACIONES SL. El propietario se llama Daniel. Trabajan con Vodafone, Orange, Euskaltel, Más Móvil y Alarmas Segurma. La empresa facturadora principal es Zener (ZENER ALARMAS S.L., ZENER PLUS SL, ZENER COMUNICACIONES S.A.U.). Cobran a 60 días mediante confirming.

DATOS ACTUALES DEL NEGOCIO:
- 12 técnicos activos hoy
- Trabajos asignados hoy: 79 en total
- Trabajos completados hoy: 43 (54%)
- Técnicos en ruta: ${TECHNICIANS.filter(t=>t.status==="EN RUTA").length}
- Técnicos completados: ${TECHNICIANS.filter(t=>t.status==="COMPLETADO").length}
- Técnicos sin iniciar: ${TECHNICIANS.filter(t=>t.status==="SIN INICIAR").length}

STOCK:
- Artículos en estado CRÍTICO: ${STOCK_ITEMS.filter(s=>s.status==="CRÍTICO").map(s=>s.name).join(", ")}
- Artículos en estado BAJO: ${STOCK_ITEMS.filter(s=>s.status==="BAJO").map(s=>s.name).join(", ")}

MULTAS:
- Multas pendientes: ${FINES.filter(f=>f.status==="PENDIENTE").length}
- Importe total pendiente: €${FINES.filter(f=>f.status==="PENDIENTE").reduce((a,f)=>a+f.amount,0)}
- Multa más urgente vence en ${FINES.filter(f=>f.status==="PENDIENTE").sort((a,b)=>a.daysLeft-b.daysLeft)[0]?.daysLeft} días

GARANTÍAS:
- Garantías activas: ${GUARANTEES.filter(g=>g.status==="ACTIVA").length}
- Garantías en riesgo: ${GUARANTEES.filter(g=>g.status==="EN RIESGO").length}
- Garantías vencidas: ${GUARANTEES.filter(g=>g.status==="VENCIDA").length}

VEHÍCULOS:
- Total vehículos: ${VEHICLES.length}
- En taller ahora mismo: ${VEHICLES.filter(v=>v.status==="EN TALLER").map(v=>v.plate).join(", ")}

PRODUCCIÓN MENSUAL (media):
- Cada técnico debería completar 154 trabajos al mes
- La media real del último mes: 144
- Discrepancia estimada con la empresa: 10-15 órdenes por técnico
- Pérdida mensual estimada: entre €4,806 y €7,209
- Pérdida anual estimada: entre €57,000 y €86,000

TÉCNICO MÁS PRODUCTIVO HOY: ${TOP_PERFORMERS[0]?.name} (${TOP_PERFORMERS[0]?.pct}%)
TÉCNICO CON MENOS PRODUCCIÓN HOY: ${TECHNICIANS.find(t=>t.status==="SIN INICIAR")?.name || "N/A"}

Responde siempre en español, de forma concisa y útil. Cuando des datos numéricos, sé específico. Si Daniel pregunta sobre acciones a tomar, da recomendaciones concretas basadas en los datos. Máximo 3-4 frases por respuesta a menos que se pida más detalle.
`;

function Badge({ status }) {
  const m = {
    "EN RUTA":["#E8830A","#E8830A25"],"COMPLETADO":["#22C55E","#22C55E25"],
    "SIN INICIAR":["#78716C","#78716C25"],"EN TALLER":["#F5A623","#F5A62325"],
    "ACTIVO":["#22C55E","#22C55E25"],"FUERA DE SERVICIO":["#EF4444","#EF444425"],
    "PENDIENTE":["#F5A623","#F5A62325"],"PAGADA":["#22C55E","#22C55E25"],
    "VENCIDA":["#EF4444","#EF444425"],"ACTIVA":["#22C55E","#22C55E25"],
    "EN RIESGO":["#F5A623","#F5A62325"],"CRÍTICO":["#EF4444","#EF444425"],
    "BAJO":["#F5A623","#F5A62325"],"OK":["#22C55E","#22C55E25"],
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

function ChartTooltip({ active, payload, label }) {
  if(!active||!payload?.length) return null;
  return (
    <div style={{background:B.bgAccent,border:`1px solid ${B.border}`,borderRadius:8,padding:"8px 12px",fontSize:12}}>
      <div style={{color:B.amber,fontWeight:600,marginBottom:4}}>{label}</div>
      {payload.map((p,i)=>(
        <div key={i} style={{color:p.color,marginBottom:2}}>{p.name}: <strong>{p.value}</strong></div>
      ))}
    </div>
  );
}

// Chart renderer — parses Claude's JSON chart responses and renders them
function Briefing({ setScreen, isMobile }) {
  const today = new Date().toLocaleDateString("es-ES",{weekday:"long",year:"numeric",month:"long",day:"numeric"});
  const totalY  = TECHNICIANS.reduce((a,t)=>a+t.jobsCompleted,0);
  const totalA  = TECHNICIANS.reduce((a,t)=>a+t.jobsAssigned,0);
  const pct     = totalA>0?Math.round(totalY/totalA*100):0;
  const critS   = STOCK_ITEMS.filter(s=>s.status==="CRÍTICO").length;
  const lowS    = STOCK_ITEMS.filter(s=>s.status==="BAJO").length;
  const finesU  = FINES.filter(f=>f.status==="PENDIENTE"&&f.daysLeft<=7).length;
  const guarE   = GUARANTEES.filter(g=>g.daysLeft<=5&&g.status!=="VENCIDA").length;
  const tallerV = VEHICLES.filter(v=>v.status==="EN TALLER").length;
  const hasAlerts = critS+lowS+finesU+guarE+tallerV > 0;

  const alertRow=(color,icon,title,sub,screen)=>(
    <div onClick={()=>setScreen(screen)} style={{background:color+"15",border:`1px solid ${color}35`,borderRadius:10,padding:"12px 14px",display:"flex",alignItems:"center",gap:12,marginBottom:8,cursor:"pointer"}}>
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
      {/* Hero greeting */}
      <div style={{background:"linear-gradient(135deg,#2C1A06,#1C1208)",border:`1px solid ${B.borderAcc}`,borderRadius:12,padding:isMobile?"16px":"20px",marginBottom:16}}>
        <div style={{fontSize:11,color:B.creamDim,marginBottom:4}}>{today}</div>
        <div style={{fontSize:isMobile?20:24,fontWeight:800,color:B.cream,fontFamily:"Georgia,serif",fontStyle:"italic"}}>Buenos días, Daniel.</div>
        <div style={{fontSize:13,color:B.creamDim,marginTop:6}}>
          {totalA>0
            ? <>Hoy tienes <strong style={{color:B.amber}}>{totalA} trabajos asignados</strong> — {totalY} completados ({pct}%).</>
            : <>Bienvenido a Jenecherú IA. Los datos aparecerán cuando los técnicos empiecen a registrar trabajos.</>
          }
        </div>
      </div>

      {/* 4 KPI cards */}
      <StatGrid stats={[
        {label:"Completados hoy",      value:totalY,   color:B.amber},
        {label:"% Productividad",      value:`${pct}%`, color:pct>=70?B.green:B.gold},
        {label:"Alertas activas",      value:critS+lowS+finesU+guarE+tallerV, color:(critS+lowS+finesU+guarE+tallerV)>0?B.red:B.green},
        {label:"Técnicos activos",     value:TECHNICIANS.length, color:B.gold},
      ]}/>

      {/* Alerts */}
      {hasAlerts && (
        <div style={{marginBottom:20}}>
          <div style={{fontSize:11,fontWeight:600,color:B.amber,textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Alertas activas</div>
          {critS>0   && alertRow(B.red,  "box",    `${critS} artículo(s) en nivel CRÍTICO`,     "Técnicos pueden quedarse sin herramientas", "stock")}
          {lowS>0    && alertRow(B.gold, "alert",  `${lowS} artículo(s) con stock BAJO`,        "Pedir antes de que se agote",              "stock")}
          {finesU>0  && alertRow(B.red,  "euro",   `${finesU} multa(s) vencen en 7 días`,       "Se doblan si no se pagan a tiempo",        "multas")}
          {guarE>0   && alertRow(B.gold, "shield", `${guarE} garantía(s) vencen pronto`,        "Pierdes el cobro si otro va antes",        "garantias")}
          {tallerV>0 && alertRow(B.amber,"truck",  `${tallerV} vehículo(s) en taller`,          "Técnico sin furgoneta disponible",         "flota")}
        </div>
      )}

      {!hasAlerts && (
        <div style={{background:B.green+"10",border:`1px solid ${B.green}30`,borderRadius:10,padding:"14px 16px",marginBottom:20,display:"flex",alignItems:"center",gap:12}}>
          <Icon name="check" size={18} color={B.green}/>
          <div style={{fontSize:13,color:B.green,fontWeight:600}}>Todo en orden — sin alertas activas hoy.</div>
        </div>
      )}

      {/* Quick access */}
      <div style={{fontSize:11,fontWeight:600,color:B.amber,textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Acceso rápido</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:20}}>
        {[
          {icon:"chart",  label:"Seguimiento en vivo", screen:"tracker",     sub:`${TECHNICIANS.filter(t=>t.status==="EN RUTA").length} técnicos en ruta`},
          {icon:"shield", label:"Garantías",            screen:"garantias",   sub:`${GUARANTEES.filter(g=>g.status==="ACTIVA").length} activas`},
          {icon:"alert",  label:"Multas",               screen:"multas",      sub:`${FINES.filter(f=>f.status==="PENDIENTE").length} pendientes`},
          {icon:"savings",label:"Ahorros",              screen:"roi",         sub:"Ver dashboard"},
        ].map(item=>(
          <div key={item.screen} onClick={()=>setScreen(item.screen)}
            style={{background:B.bgMid,border:`1px solid ${B.border}`,borderRadius:10,padding:"14px",cursor:"pointer",display:"flex",alignItems:"center",gap:12}}>
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

function Tracker({ isMobile }) {
  const total=TECHNICIANS.reduce((a,t)=>a+t.jobsAssigned,0);
  const done =TECHNICIANS.reduce((a,t)=>a+t.jobsCompleted,0);
  const pct  =Math.round(done/total*100);
  return (
    <div>
      <StatGrid stats={[
        {label:"Asignados hoy",value:total,color:B.amber},
        {label:"Completados",value:done,color:B.green},
        {label:"Pendientes",value:total-done,color:B.gold},
        {label:"% Completado",value:`${pct}%`,color:pct>=80?B.green:pct>=50?B.gold:B.red},
      ]}/>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <div style={{fontSize:11,fontWeight:600,color:B.amber,textTransform:"uppercase",letterSpacing:1}}>Seguimiento en vivo</div>
        <span style={{fontSize:11,color:B.green,background:B.green+"20",padding:"3px 10px",borderRadius:20,fontWeight:600}}>En tiempo real</span>
      </div>
      {TECHNICIANS.map((t,i)=>(
        <div key={t.id} style={{background:i%2===0?B.bgMid:B.bgAccent,border:`1px solid ${B.border}`,borderRadius:10,padding:"12px 14px",marginBottom:8}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <span style={{fontWeight:700,color:B.gold,fontSize:15}}>{t.name}</span>
            <Badge status={t.status}/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
            {[["Asignados",t.jobsAssigned,B.cream],["Completados",t.jobsCompleted,B.green],["Pendientes",t.jobsAssigned-t.jobsCompleted,t.jobsAssigned-t.jobsCompleted>3?B.red:B.gold]].map(([l,v,c])=>(
              <div key={l} style={{background:B.bg,borderRadius:8,padding:"8px",textAlign:"center",border:`1px solid ${B.border}`}}>
                <div style={{fontSize:18,fontWeight:800,color:c}}>{v}</div>
                <div style={{fontSize:10,color:B.creamDim,marginTop:2}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div style={{background:B.bgAccent,border:`1px solid ${B.borderAcc}`,borderRadius:10,padding:"12px 14px",marginTop:4}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,textAlign:"center"}}>
          {[["Total",total,B.amber],["Completado",done,B.green],["Pendiente",total-done,B.gold]].map(([l,v,c])=>(
            <div key={l}><div style={{fontSize:22,fontWeight:800,color:c}}>{v}</div><div style={{fontSize:11,color:B.creamDim}}>{l}</div></div>
          ))}
        </div>
        <div style={{textAlign:"center",marginTop:8,fontSize:13,fontWeight:700,color:B.amber}}>{pct}% completado</div>
      </div>
    </div>
  );
}

function Production({ isMobile }) {
  const [period,setPeriod]=useState("mensual");
  return (
    <div>
      <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}>
        {["diario","semanal","mensual"].map(p=>(
          <button key={p} onClick={()=>setPeriod(p)} style={{padding:"9px 16px",borderRadius:8,border:`1px solid ${period===p?B.amber:B.border}`,background:period===p?B.amber:"transparent",color:period===p?B.bg:B.cream,fontWeight:600,fontSize:13,cursor:"pointer",flex:1}}>{p.charAt(0).toUpperCase()+p.slice(1)}</button>
        ))}
      </div>
      {PRODUCTION_DATA.map((t,i)=>(
        <div key={t.id} style={{background:i%2===0?B.bgMid:B.bgAccent,border:`1px solid ${B.border}`,borderRadius:10,padding:"12px 14px",marginBottom:8}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <span style={{fontWeight:700,color:B.gold,fontSize:15}}>{t.name}</span>
            <span style={{fontWeight:700,fontSize:14,color:t.diff>=0?B.green:B.red}}>{t.diff>=0?"+":""}{t.diff}</span>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6}}>
            {[["Mant.",t.mantenimiento,B.cream],["Altas",t.altas,B.cream],["Total",t.total,B.amber]].map(([l,v,c])=>(
              <div key={l} style={{background:B.bg,borderRadius:8,padding:"8px",textAlign:"center",border:`1px solid ${B.border}`}}>
                <div style={{fontSize:17,fontWeight:800,color:c}}>{v}</div>
                <div style={{fontSize:10,color:B.creamDim,marginTop:1}}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{marginTop:8,fontSize:11,color:B.creamDim,textAlign:"right"}}>Esperado: {t.expected}</div>
        </div>
      ))}
    </div>
  );
}

function Reconciliation() {
  const [uploaded,setUploaded]=useState(false);
  const recon=TECHNICIANS.slice(0,8).map(t=>({name:t.name,logged:Math.floor(Math.random()*10+140),paid:Math.floor(Math.random()*10+130)})).map(r=>({...r,diff:r.logged-r.paid,lost:(r.logged-r.paid)*26.70}));
  const totalLost=recon.reduce((a,r)=>a+r.lost,0);
  return !uploaded?(
    <div style={{background:B.bgMid,border:`1px solid ${B.border}`,borderRadius:12,padding:40,textAlign:"center"}}>
      <div style={{marginBottom:16}}><Icon name="folder" size={40} color={B.amber}/></div>
      <div style={{fontSize:18,fontWeight:700,color:B.amber,fontFamily:"Georgia,serif",fontStyle:"italic",marginBottom:8}}>Subir Excel de la empresa</div>
      <div style={{fontSize:13,color:B.creamDim,marginBottom:24,lineHeight:1.6}}>Sube el Excel que te manda la compañía al final de mes.</div>
      <button style={{padding:"12px 24px",borderRadius:10,border:"none",background:B.amber,color:B.bg,fontWeight:700,fontSize:14,cursor:"pointer",width:"100%"}} onClick={()=>setUploaded(true)}>Seleccionar archivo Excel</button>
    </div>
  ):(
    <div>
      <div style={{background:B.red+"15",border:`1px solid ${B.red}30`,borderRadius:10,padding:16,marginBottom:16}}>
        <div style={{fontWeight:700,color:B.red,fontSize:15,marginBottom:4}}> Discrepancia total este mes</div>
        <div style={{fontSize:32,fontWeight:800,color:B.red}}>−€{totalLost.toFixed(0)}</div>
        <div style={{fontSize:12,color:B.creamDim,marginTop:2}}>órdenes no cobradas × €26.70</div>
      </div>
      {recon.map((r,i)=>(
        <div key={i} style={{background:r.diff>0?B.red+"10":i%2===0?B.bgMid:B.bgAccent,border:`1px solid ${r.diff>0?B.red+"40":B.border}`,borderRadius:10,padding:"12px 14px",marginBottom:8}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
            <span style={{fontWeight:700,color:B.gold,fontSize:14}}>{r.name}</span>
            <span style={{fontWeight:700,color:r.diff>0?B.red:B.green}}>{r.diff>0?`−€${r.lost.toFixed(0)}`:"✓ Sin pérdida"}</span>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6}}>
            {[["Registrado",r.logged,B.cream],["Pagado",r.paid,B.cream],["Diff",r.diff>0?`-${r.diff}`:r.diff,r.diff>0?B.red:B.green]].map(([l,v,c])=>(
              <div key={l} style={{background:B.bg,borderRadius:8,padding:"8px",textAlign:"center",border:`1px solid ${B.border}`}}>
                <div style={{fontSize:16,fontWeight:800,color:c}}>{v}</div>
                <div style={{fontSize:10,color:B.creamDim,marginTop:1}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <button style={{width:"100%",padding:"10px",borderRadius:8,border:`1px solid ${B.border}`,background:"transparent",color:B.creamDim,fontSize:13,cursor:"pointer",marginTop:4}} onClick={()=>setUploaded(false)}>↩ Subir otro archivo</button>
    </div>
  );
}

function Guarantees({ roiEvents=[], addRoiEvent=()=>{} }) {
  const [guarantees, setGuarantees] = useState(GUARANTEES);
  const exp = guarantees.filter(g=>g.daysLeft<=5&&g.status!=="VENCIDA"&&g.status!=="CUMPLIDA").length;

  const markFulfilled = (g) => {
    setGuarantees(prev=>prev.map(x=>x.id===g.id?{...x,status:"CUMPLIDA"}:x));
    addRoiEvent({
      id:Date.now(), type:"guarantee_protected",
      date:new Date().toLocaleDateString("es-ES"),
      ref:g.ref, technician:g.technician, value:ROI_BENCHMARK.pricePerOrder,
      note:`Garantía ${g.ref} cumplida — €${ROI_BENCHMARK.pricePerOrder} protegidos`
    });
  };

  const markLost = (g) => {
    setGuarantees(prev=>prev.map(x=>x.id===g.id?{...x,status:"PERDIDA"}:x));
    addRoiEvent({
      id:Date.now(), type:"guarantee_lost",
      date:new Date().toLocaleDateString("es-ES"),
      ref:g.ref, technician:g.technician, value:-ROI_BENCHMARK.pricePerOrder,
      note:`Garantía ${g.ref} perdida — €${ROI_BENCHMARK.pricePerOrder} no cobrados`
    });
  };

  return (
    <div>
      {exp>0&&(
        <div style={{background:B.gold+"15",border:`1px solid ${B.gold}40`,borderRadius:10,padding:"12px 14px",marginBottom:16,display:"flex",gap:10,alignItems:"flex-start"}}>
          <span style={{width:8,height:8,borderRadius:"50%",background:B.gold,display:"inline-block",flexShrink:0,marginTop:4}}/>
          <div style={{fontWeight:600,color:B.gold,fontSize:13}}>{exp} garantía(s) vencen en los próximos 5 días — confirma si se cumplieron o se perdieron.</div>
        </div>
      )}
      {guarantees.map((g,i)=>(
        <div key={g.id} style={{background:g.status==="CUMPLIDA"?B.green+"10":g.status==="PERDIDA"?B.red+"10":g.daysLeft<=3?B.red+"10":i%2===0?B.bgMid:B.bgAccent,border:`1px solid ${g.status==="CUMPLIDA"?B.green+"40":g.status==="PERDIDA"?B.red+"40":g.daysLeft<=3?B.red+"40":g.status==="EN RIESGO"?B.gold+"50":B.border}`,borderRadius:12,padding:"14px 16px",marginBottom:10}}>
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
                <div style={{fontSize:14,fontWeight:700,color:B.cream,marginTop:1}}>{g.clientName||g.client}</div>
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
            {[["Vence",g.expires,B.creamDim],["Días",g.daysLeft<=0?"VENCIDA":`${g.daysLeft} días`,g.daysLeft<=3?B.red:g.daysLeft<=7?B.gold:B.green],["Valor",`€${ROI_BENCHMARK.pricePerOrder}`,B.amber]].map(([l,v,c])=>(
              <div key={l} style={{background:B.bgAccent,borderRadius:8,padding:"8px",textAlign:"center",border:`1px solid ${B.border}`}}>
                <div style={{fontSize:12,fontWeight:700,color:c}}>{v}</div>
                <div style={{fontSize:10,color:B.creamDim,marginTop:2}}>{l}</div>
              </div>
            ))}
          </div>
          {g.status!=="CUMPLIDA"&&g.status!=="PERDIDA"&&(
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              <button onClick={()=>markFulfilled(g)} style={{padding:"11px",borderRadius:10,border:"none",background:B.green,color:"#fff",fontWeight:700,fontSize:13,cursor:"pointer"}}>
                Garantía cumplida
              </button>
              <button onClick={()=>markLost(g)} style={{padding:"11px",borderRadius:10,border:`1px solid ${B.red}`,background:"transparent",color:B.red,fontWeight:700,fontSize:13,cursor:"pointer"}}>
                Garantía perdida
              </button>
            </div>
          )}
          {g.status==="CUMPLIDA"&&<div style={{textAlign:"center",color:B.green,fontWeight:700,fontSize:13,padding:"8px",background:B.green+"15",borderRadius:8}}>✓ Garantía cumplida — €{ROI_BENCHMARK.pricePerOrder} registrados como cobrados</div>}
          {g.status==="PERDIDA"&&<div style={{textAlign:"center",color:B.red,fontWeight:700,fontSize:13,padding:"8px",background:B.red+"15",borderRadius:8}}>Garantía perdida — €{ROI_BENCHMARK.pricePerOrder} no cobrados</div>}
        </div>
      ))}
    </div>
  );
}

function Stock() {
  const [items,setItems]=useState(STOCK_ITEMS);
  const [show,setShow]=useState(false);
  const [form,setForm]=useState({name:"",category:"Herramienta",quantity:"",minimum:""});
  const sf=(k,v)=>setForm(p=>({...p,[k]:v}));
  const updateQty=(id,val)=>setItems(items.map(i=>i.id===id?{...i,quantity:parseInt(val)||0,status:(parseInt(val)||0)<=0?"CRÍTICO":(parseInt(val)||0)<=i.minimum?"BAJO":"OK"}:i));
  const addItem=()=>{
    if(!form.name.trim()||!form.quantity||!form.minimum){alert("Rellena todos los campos.");return;}
    const qty=parseInt(form.quantity)||0; const min=parseInt(form.minimum)||0;
    const status=qty<=0?"CRÍTICO":qty<=min?"BAJO":"OK";
    setItems(p=>[...p,{id:Date.now(),name:form.name,category:form.category,quantity:qty,minimum:min,status}]);
    setForm({name:"",category:"Herramienta",quantity:"",minimum:""});
    setShow(false);
  };
  return (
    <div>
      {show&&(
        <Modal title="Nuevo artículo de stock" onClose={()=>setShow(false)}>
          <FormField label="Nombre del artículo *"><input style={inputStyle} value={form.name} onChange={e=>sf("name",e.target.value)} placeholder="Ej: Fusionadora, Guantes EPI, Cable fibra..."/></FormField>
          <FormField label="Categoría *">
            <select style={selectStyle} value={form.category} onChange={e=>sf("category",e.target.value)}>
              <option>Herramienta</option>
              <option>Material</option>
              <option>EPI</option>
            </select>
          </FormField>
          <FormField label="Cantidad actual *"><input style={inputStyle} type="number" value={form.quantity} onChange={e=>sf("quantity",e.target.value)} placeholder="¿Cuántos hay ahora mismo?"/></FormField>
          <FormField label="Cantidad mínima *"><input style={inputStyle} type="number" value={form.minimum} onChange={e=>sf("minimum",e.target.value)} placeholder="Por debajo de este número se activa la alerta"/></FormField>
          <button onClick={addItem} style={{width:"100%",padding:"15px",borderRadius:10,border:"none",background:B.amber,color:B.bg,fontWeight:800,fontSize:16,cursor:"pointer",marginTop:4}}>Guardar artículo</button>
        </Modal>
      )}
      <div style={{display:"flex",justifyContent:"flex-end",marginBottom:12}}>
        <button onClick={()=>setShow(true)} style={{padding:"11px 22px",borderRadius:10,border:"none",cursor:"pointer",fontSize:14,fontWeight:700,color:B.bg,background:B.amber,boxShadow:`0 4px 16px ${B.amber}40`}}>+ Añadir artículo</button>
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

function Fines({ roiEvents=[], addRoiEvent=()=>{} }) {
  const [fines,setFines]=useState(FINES);
  const [show,setShow]=useState(false);
  const [form,setForm]=useState({ref:"",description:"",received:"",amount:"",due:""});
  const sf=(k,v)=>setForm(p=>({...p,[k]:v}));

  const markPaidOnTime=(id)=>{
    const fine = fines.find(f=>f.id===id);
    setFines(fines.map(f=>f.id===id?{...f,status:"PAGADA",paidOnTime:true}:f));
    addRoiEvent({
      id:Date.now(), type:"fine_paid_on_time",
      date:new Date().toLocaleDateString("es-ES"),
      ref:fine.ref, amount:fine.amount, saving:fine.amount,
      note:`${fine.ref} pagada a tiempo — se evitó duplicación de €${fine.amount}`
    });
  };

  const markDoubled=(id)=>{
    const fine = fines.find(f=>f.id===id);
    setFines(fines.map(f=>f.id===id?{...f,status:"VENCIDA",doubled:true}:f));
    addRoiEvent({
      id:Date.now(), type:"fine_doubled",
      date:new Date().toLocaleDateString("es-ES"),
      ref:fine.ref, amount:fine.amount, saving:-fine.amount,
      note:`${fine.ref} se dobló — coste adicional de €${fine.amount}`
    });
  };

  const addFine=()=>{
    if(!form.ref.trim()||!form.description.trim()||!form.amount||!form.due.trim()){alert("Rellena todos los campos obligatorios.");return;}
    const parts=form.due.split("/"); const dueDate=new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    const days=Math.round((dueDate-new Date())/(1000*60*60*24));
    const rec=form.received.trim()||new Date().toLocaleDateString("es-ES");
    setFines(p=>[...p,{id:Date.now(),ref:form.ref,description:form.description,received:rec,amount:parseFloat(form.amount),due:form.due,daysLeft:days,status:"PENDIENTE"}]);
    setForm({ref:"",description:"",received:"",amount:"",due:""});
    setShow(false);
  };

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
        <button onClick={()=>setShow(true)} style={{padding:"11px 22px",borderRadius:10,border:"none",cursor:"pointer",fontSize:14,fontWeight:700,color:B.bg,background:B.amber,boxShadow:`0 4px 16px ${B.amber}40`}}>+ Añadir multa</button>
      </div>
      <StatGrid stats={[{label:"Pendientes",value:fines.filter(f=>f.status==="PENDIENTE").length,color:B.gold},{label:"Urgentes (<7 días)",value:fines.filter(f=>f.status==="PENDIENTE"&&f.daysLeft<=7).length,color:B.red},{label:"Total pendiente",value:`€${fines.filter(f=>f.status==="PENDIENTE").reduce((a,f)=>a+f.amount,0)}`,color:B.amber},{label:"Pagadas a tiempo",value:fines.filter(f=>f.paidOnTime).length,color:B.green}]}/>
      {fines.map((f,i)=>(
        <div key={f.id} style={{background:f.status==="PENDIENTE"&&f.daysLeft<=7?B.red+"10":f.paidOnTime?B.green+"08":i%2===0?B.bgMid:B.bgAccent,border:`1px solid ${f.status==="PENDIENTE"&&f.daysLeft<=7?B.red+"40":f.paidOnTime?B.green+"40":B.border}`,borderRadius:10,padding:"12px 14px",marginBottom:8}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
            <div><div style={{fontWeight:700,color:B.amber,fontSize:14}}>{f.ref}</div><div style={{fontSize:12,color:B.creamDim,marginTop:2}}>{f.description}</div></div>
            <Badge status={f.status}/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginBottom:f.status==="PENDIENTE"?10:6}}>
            {[["Importe",`€${f.amount}`,B.cream],["Vence",f.due,B.creamDim],["Días",f.status==="PAGADA"?"—":f.daysLeft<=0?"VENCIDA":`${f.daysLeft}d`,f.status==="PAGADA"?B.green:f.daysLeft<=7?B.red:B.gold]].map(([l,v,c])=>(
              <div key={l} style={{background:B.bg,borderRadius:8,padding:"7px",textAlign:"center",border:`1px solid ${B.border}`}}><div style={{fontSize:13,fontWeight:700,color:c}}>{v}</div><div style={{fontSize:10,color:B.creamDim,marginTop:1}}>{l}</div></div>
            ))}
          </div>
          {f.status==="PENDIENTE"&&(
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              <button onClick={()=>markPaidOnTime(f.id)} style={{padding:"11px",borderRadius:10,border:"none",background:B.green,color:"#fff",fontWeight:700,fontSize:12,cursor:"pointer"}}>Pagada a tiempo</button>
              <button onClick={()=>markDoubled(f.id)} style={{padding:"11px",borderRadius:10,border:`1px solid ${B.red}`,background:"transparent",color:B.red,fontWeight:700,fontSize:12,cursor:"pointer"}}>Se ha doblado</button>
            </div>
          )}
          {f.paidOnTime&&<div style={{textAlign:"center",color:B.green,fontWeight:600,fontSize:12,padding:"6px",background:B.green+"15",borderRadius:8}}>Pagada a tiempo — ahorro de €{f.amount} registrado</div>}
          {f.doubled&&<div style={{textAlign:"center",color:B.red,fontWeight:600,fontSize:12,padding:"6px",background:B.red+"15",borderRadius:8}}>⚠ Doblada — coste adicional de €{f.amount}</div>}
        </div>
      ))}
    </div>
  );
}
function Fleet() {
  const [vehicles,setVehicles]=useState(VEHICLES);
  const [show,setShow]=useState(false);
  const [form,setForm]=useState({plate:"",model:"",technician:"",status:"ACTIVO",itv:"",insurance:"",lastOil:"",lastService:""});
  const sf=(k,v)=>setForm(p=>({...p,[k]:v}));
  const addVehicle=()=>{
    if(!form.plate.trim()||!form.model.trim()){alert("Matrícula y modelo son obligatorios.");return;}
    setVehicles(p=>[...p,{id:Date.now(),...form}]);
    setForm({plate:"",model:"",technician:"",status:"ACTIVO",itv:"",insurance:"",lastOil:"",lastService:""});
    setShow(false);
  };
  const changeStatus=(id,status)=>setVehicles(vehicles.map(v=>v.id===id?{...v,status}:v));
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
          <FormField label="Último cambio de aceite (DD/MM/AAAA)"><input style={inputStyle} value={form.lastOil} onChange={e=>sf("lastOil",e.target.value)} placeholder="Ej: 10/01/2026"/></FormField>
          <FormField label="Último servicio general (DD/MM/AAAA)"><input style={inputStyle} value={form.lastService} onChange={e=>sf("lastService",e.target.value)} placeholder="Ej: 10/01/2026"/></FormField>
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
              <select value={v.status} onChange={e=>changeStatus(v.id,e.target.value)}
                style={{background:B.bgAccent,border:`1px solid ${B.border}`,borderRadius:6,padding:"4px 8px",color:B.cream,fontSize:11,fontFamily:"inherit",cursor:"pointer"}}>
                <option>ACTIVO</option><option>EN TALLER</option><option>FUERA DE SERVICIO</option>
              </select>
            </div>
            <div style={{fontSize:12,color:B.creamDim,marginBottom:10}}>Técnico: <strong style={{color:B.cream}}>{v.technician||"—"}</strong></div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              {[["ITV",v.itv||"—"],["Seguro",v.insurance||"—"],["Aceite",v.lastOil||"—"],["Servicio",v.lastService||"—"]].map(([l,d])=>(
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

function Invoices() {
  const [invoices,setInvoices]=useState(INVOICES);
  const [search,setSearch]=useState("");
  const [show,setShow]=useState(false);
  const [form,setForm]=useState({supplier:"",date:"",amount:"",category:"Material",file:""});
  const sf=(k,v)=>setForm(p=>({...p,[k]:v}));
  const filtered=invoices.filter(i=>i.supplier.toLowerCase().includes(search.toLowerCase()));
  const addInvoice=()=>{
    if(!form.supplier.trim()||!form.amount){alert("Proveedor e importe son obligatorios.");return;}
    const date=form.date.trim()||new Date().toLocaleDateString("es-ES");
    setInvoices(p=>[...p,{id:Date.now(),supplier:form.supplier,date,amount:parseFloat(form.amount),category:form.category,file:form.file||"adjunto.pdf"}]);
    setForm({supplier:"",date:"",amount:"",category:"Material",file:""});
    setShow(false);
  };
  return (
    <div>
      {show&&(
        <Modal title="Nueva factura" onClose={()=>setShow(false)}>
          <FormField label="Proveedor *"><input style={inputStyle} value={form.supplier} onChange={e=>sf("supplier",e.target.value)} placeholder="Ej: Electro Componentes SL"/></FormField>
          <FormField label="Importe (€) *"><input style={inputStyle} type="number" value={form.amount} onChange={e=>sf("amount",e.target.value)} placeholder="Ej: 1240.50"/></FormField>
          <FormField label="Categoría *">
            <select style={selectStyle} value={form.category} onChange={e=>sf("category",e.target.value)}>
              <option>Material</option><option>EPI</option><option>Vehículos</option><option>Telecomunicaciones</option><option>Herramientas</option><option>Otros</option>
            </select>
          </FormField>
          <FormField label="Fecha (DD/MM/AAAA)"><input style={inputStyle} value={form.date} onChange={e=>sf("date",e.target.value)} placeholder="Déjalo en blanco para usar hoy"/></FormField>
          <FormField label="Nombre del archivo"><input style={inputStyle} value={form.file} onChange={e=>sf("file",e.target.value)} placeholder="Ej: factura_mayo_2026.pdf"/></FormField>
          <button onClick={addInvoice} style={{width:"100%",padding:"15px",borderRadius:10,border:"none",background:B.amber,color:B.bg,fontWeight:800,fontSize:16,cursor:"pointer",marginTop:4}}>Guardar factura</button>
        </Modal>
      )}
      <div style={{display:"flex",gap:10,marginBottom:16,flexWrap:"wrap"}}>
        <input placeholder="Buscar proveedor..." value={search} onChange={e=>setSearch(e.target.value)} style={{flex:1,padding:"12px 14px",borderRadius:10,border:`1px solid ${B.border}`,background:B.bgAccent,color:B.cream,fontSize:14,outline:"none",fontFamily:"inherit",minWidth:180}}/>
        <button onClick={()=>setShow(true)} style={{padding:"11px 22px",borderRadius:10,border:"none",cursor:"pointer",fontSize:14,fontWeight:700,color:B.bg,background:B.amber,flexShrink:0}}>+ Añadir factura</button>
      </div>
      {filtered.map((inv,i)=>(
        <div key={inv.id} style={{background:i%2===0?B.bgMid:B.bgAccent,border:`1px solid ${B.border}`,borderRadius:10,padding:"12px 14px",marginBottom:8}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}><div style={{fontWeight:700,color:B.gold,fontSize:14,flex:1,marginRight:8}}>{inv.supplier}</div><div style={{fontWeight:700,color:B.cream,fontSize:14,flexShrink:0}}>€{inv.amount.toFixed(2)}</div></div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{fontSize:12,color:B.creamDim}}>{inv.date}</div><span style={{background:B.amber+"25",color:B.amber,padding:"3px 10px",borderRadius:100,fontSize:11,fontWeight:600}}>{inv.category}</span></div>
          <button style={{marginTop:10,width:"100%",padding:"9px",borderRadius:8,border:`1px solid ${B.border}`,background:"transparent",color:B.creamDim,fontSize:12,cursor:"pointer"}}>📄 {inv.file}</button>
        </div>
      ))}
    </div>
  );
}

function JobLog() {
  const [type,setType]=useState(null);
  const [outcome,setOutcome]=useState(null);
  const [ref,setRef]=useState("");
  const [notes,setNotes]=useState("");
  const [done,setDone]=useState(false);

  const submit=()=>{
    if(!type||!outcome||!ref.trim()){alert("Por favor rellena todos los campos.");return;}
    setDone(true);
    setTimeout(()=>{setType(null);setOutcome(null);setRef("");setNotes("");setDone(false);},2500);
  };

  if(done) return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"60vh",textAlign:"center",padding:20}}>
      <div style={{fontSize:48,marginBottom:20,color:B.amber,fontFamily:"Georgia,serif",fontStyle:"italic"}}>✓</div>
      <div style={{fontSize:24,fontWeight:800,color:B.green,fontFamily:"Georgia,serif",fontStyle:"italic"}}>¡Trabajo registrado!</div>
      <div style={{fontSize:14,color:B.creamDim,marginTop:8}}>Preparando siguiente formulario...</div>
    </div>
  );

  const lbl=(text)=><div style={{fontSize:12,fontWeight:600,color:B.amber,marginBottom:10,textTransform:"uppercase",letterSpacing:0.8}}>{text}</div>;

  return (
    <div style={{maxWidth:480,margin:"0 auto"}}>
      {/* Tipo */}
      <div style={{background:B.bgMid,border:`1px solid ${B.border}`,borderRadius:12,padding:16,marginBottom:12}}>
        {lbl("Tipo de trabajo *")}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          {["Alta","Reutilizada","Averías","Alarmas"].map(t=>(
            <button key={t} onClick={()=>setType(t)} style={{
              padding:"18px 10px",borderRadius:12,border:`2px solid ${type===t?B.amber:B.border}`,
              background:type===t?B.amber+"25":B.bgAccent,fontWeight:700,fontSize:14,
              color:type===t?B.amber:B.creamDim,cursor:"pointer",transition:"all 0.15s",
            }}>{t}</button>
          ))}
        </div>
      </div>

      {/* Referencia */}
      <div style={{background:B.bgMid,border:`1px solid ${B.border}`,borderRadius:12,padding:16,marginBottom:12}}>
        {lbl("Referencia del cliente *")}
        <input value={ref} onChange={e=>setRef(e.target.value)} placeholder="Número de orden o referencia"
          style={{width:"100%",padding:"14px",borderRadius:10,border:`1px solid ${B.border}`,background:B.bgAccent,color:B.cream,fontSize:16,outline:"none",fontFamily:"inherit",boxSizing:"border-box"}}/>
      </div>

      {/* Resultado */}
      <div style={{background:B.bgMid,border:`1px solid ${B.border}`,borderRadius:12,padding:16,marginBottom:12}}>
        {lbl("Resultado *")}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
          {[["COMPLETADO",B.green],["CANCELADO",B.red],["PENDIENTE",B.gold]].map(([o,c])=>(
            <button key={o} onClick={()=>setOutcome(o)} style={{
              padding:"16px 6px",borderRadius:12,border:`2px solid ${outcome===o?c:B.border}`,
              background:outcome===o?c+"25":B.bgAccent,fontWeight:700,fontSize:12,
              color:outcome===o?c:B.creamDim,cursor:"pointer",transition:"all 0.15s",
            }}>{o}</button>
          ))}
        </div>
      </div>

      {/* Notas */}
      <div style={{background:B.bgMid,border:`1px solid ${B.border}`,borderRadius:12,padding:16,marginBottom:16}}>
        {lbl("Notas (opcional)")}
        <textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Añade cualquier observación..."
          style={{width:"100%",padding:"12px",borderRadius:10,border:`1px solid ${B.border}`,background:B.bgAccent,color:B.cream,fontSize:14,outline:"none",fontFamily:"inherit",minHeight:90,resize:"none",boxSizing:"border-box"}}/>
      </div>

      <button onClick={submit} style={{width:"100%",padding:"18px",borderRadius:12,border:"none",background:B.amber,color:B.bg,fontWeight:800,fontSize:17,cursor:"pointer"}}>
        Enviar trabajo
      </button>
    </div>
  );
}

function ROIDashboard({ roiEvents = [] }) {
  const B2 = B; // alias

  // Calculate savings from events
  const guaranteesProtected = roiEvents.filter(e=>e.type==="guarantee_protected");
  const guaranteesLost      = roiEvents.filter(e=>e.type==="guarantee_lost");
  const finesSaved          = roiEvents.filter(e=>e.type==="fine_paid_on_time");
  const finesDoubled        = roiEvents.filter(e=>e.type==="fine_doubled");
  const diasSinTrabajoPrevented   = roiEvents.filter(e=>e.type==="dia_sin_trabajo_evitado");
  const productionRecovered = roiEvents.filter(e=>e.type==="production_recovered");

  const guaranteeSaving     = guaranteesProtected.reduce((a,e)=>a+(e.value||0),0);
  const fineSaving          = finesSaved.reduce((a,e)=>a+(e.saving||0),0);
  const fineExtra           = finesDoubled.reduce((a,e)=>a+Math.abs(e.saving||0),0);
  const diasSinTrabajoSaving          = diasSinTrabajoPrevented.reduce((a,e)=>a+(e.value||0),0);
  const prodSaving          = productionRecovered.reduce((a,e)=>a+(e.value||0),0);
  const totalSaving         = guaranteeSaving + fineSaving + diasSinTrabajoSaving + prodSaving;
  const totalLost           = guaranteesLost.reduce((a,e)=>a+Math.abs(e.value||0),0) + fineExtra;
  const netSaving           = totalSaving - totalLost;

  // Referencia base monthly loss (before app)
  const benchmarkMonthly    = ROI_BENCHMARK.ordersLostPerTechPerMonth * ROI_BENCHMARK.numTechnicians * ROI_BENCHMARK.pricePerOrder;

  // Monthly breakdown for chart
  const months = ["Ene","Feb","Mar","Abr","May","Jun"];
  const monthlyData = months.map((m,i) => ({
    month: m,
    sinApp: benchmarkMonthly,
    conApp: i < 2 ? benchmarkMonthly : Math.max(0, benchmarkMonthly - (prodSaving/Math.max(productionRecovered.length,1)) * (i-1)),
    ahorro: i < 2 ? 0 : (prodSaving/Math.max(productionRecovered.length,1)) * (i-1),
  }));

  // Events by type for pie chart
  const eventBreakdown = [
    { name:"Garantías protegidas", value:guaranteesProtected.length,   color:B.green },
    { name:"Multas a tiempo",       value:finesSaved.length,            color:B.amber },
    { name:"Días sin trabajo evitados",    value:diasSinTrabajoPrevented.length,     color:B.blue  },
    { name:"Producción recuperada", value:productionRecovered.length,   color:B.gold  },
  ].filter(e=>e.value>0);

  const CustomTooltip = ({ active, payload, label }) => {
    if(!active||!payload?.length) return null;
    return (
      <div style={{background:B.bgAccent,border:`1px solid ${B.border}`,borderRadius:8,padding:"8px 12px",fontSize:12}}>
        {label&&<div style={{color:B.amber,fontWeight:600,marginBottom:4}}>{label}</div>}
        {payload.map((p,i)=>(
          <div key={i} style={{color:p.color||B.cream,marginBottom:2}}>{p.name}: <strong>€{Number(p.value).toLocaleString()}</strong></div>
        ))}
      </div>
    );
  };

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
      {/* Hero saving banner */}
      <div style={{background:`linear-gradient(135deg,#1A2E0A,#0D1A06)`,border:`1px solid ${B.green}40`,borderRadius:14,padding:20,marginBottom:20,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
        <div>
          <div style={{fontSize:13,color:B.green,fontWeight:600,textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>💰 Ahorro total registrado</div>
          <div style={{fontSize:42,fontWeight:800,color:B.green,letterSpacing:-2,lineHeight:1}}>€{netSaving.toLocaleString()}</div>
          <div style={{fontSize:13,color:"rgba(255,255,255,0.5)",marginTop:6}}>Desde que Jenecherú IA está en marcha</div>
        </div>
        <div style={{textAlign:"right"}}>
          <div style={{fontSize:12,color:B.creamDim,marginBottom:4}}>Sin la app, perderías mensualmente:</div>
          <div style={{fontSize:24,fontWeight:800,color:B.red}}>€{benchmarkMonthly.toLocaleString()}</div>
          <div style={{fontSize:11,color:B.creamDim,marginTop:2}}>15 órdenes × 18 técnicos × €26.70</div>
        </div>
      </div>

      {/* Saving cards grid */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:20}}>
        <SavingCard icon="shield" label="Garantías protegidas"  value={guaranteeSaving} sub={`${guaranteesProtected.length} garantías cumplidas`} color={B.green}/>
        <SavingCard icon="alert" label="Multas evitadas"       value={fineSaving}      sub={`${finesSaved.length} pagadas a tiempo`}            color={B.amber}/>
        <SavingCard icon="wrench" label="Días sin trabajo evitados"    value={diasSinTrabajoSaving}      sub={`${diasSinTrabajoPrevented.length} eventos de stock`}      color={B.blue}/>
        <SavingCard icon="list" label="Producción recuperada" value={prodSaving}      sub={`vs benchmark de 15 órdenes perdidas`}               color={B.gold}/>
      </div>

      {/* Chart 1 — Monthly: sin app vs con app */}
      <div style={{background:B.bgMid,border:`1px solid ${B.border}`,borderRadius:12,padding:16,marginBottom:16}}>
        <div style={{fontSize:13,fontWeight:700,color:B.gold,marginBottom:4,fontFamily:"Georgia,serif",fontStyle:"italic"}}>Pérdida mensual: sin app vs con app</div>
        <div style={{fontSize:11,color:B.creamDim,marginBottom:14}}>Cuánto se perdía antes vs cuánto se pierde ahora</div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={monthlyData} barGap={4}>
            <XAxis dataKey="month" tick={{fill:B.creamDim,fontSize:11}} axisLine={false} tickLine={false}/>
            <YAxis hide/>
            <Tooltip content={<CustomTooltip/>}/>
            <Bar dataKey="sinApp"  name="Sin aplicación"  fill={B.red+"80"}   radius={[4,4,0,0]}/>
            <Bar dataKey="conApp"  name="Con aplicación"  fill={B.amber}      radius={[4,4,0,0]}/>
          </BarChart>
        </ResponsiveContainer>
        <div style={{display:"flex",gap:16,justifyContent:"center",marginTop:8}}>
          {[["Sin aplicación",B.red+"80"],["Con aplicación",B.amber]].map(([l,c])=>(
            <div key={l} style={{display:"flex",alignItems:"center",gap:6,fontSize:11,color:B.creamDim}}>
              <div style={{width:10,height:10,borderRadius:2,background:c,flexShrink:0}}/>
              {l}
            </div>
          ))}
        </div>
      </div>

      {/* Chart 2 — Ahorro acumulado area */}
      <div style={{background:B.bgMid,border:`1px solid ${B.border}`,borderRadius:12,padding:16,marginBottom:16}}>
        <div style={{fontSize:13,fontWeight:700,color:B.gold,marginBottom:4,fontFamily:"Georgia,serif",fontStyle:"italic"}}>Ahorro acumulado mes a mes</div>
        <div style={{fontSize:11,color:B.creamDim,marginBottom:14}}>Cuánto dinero real ha recuperado la aplicación</div>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={monthlyData}>
            <defs>
              <linearGradient id="savGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={B.green} stopOpacity={0.35}/>
                <stop offset="95%" stopColor={B.green} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="month" tick={{fill:B.creamDim,fontSize:11}} axisLine={false} tickLine={false}/>
            <YAxis hide/>
            <Tooltip content={<CustomTooltip/>}/>
            <Area type="monotone" dataKey="ahorro" name="Ahorro €" stroke={B.green} fill="url(#savGrad)" strokeWidth={2.5}/>
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Chart 3 — Breakdown pie */}
      {eventBreakdown.length > 0 && (
        <div style={{background:B.bgMid,border:`1px solid ${B.border}`,borderRadius:12,padding:16,marginBottom:16}}>
          <div style={{fontSize:13,fontWeight:700,color:B.gold,marginBottom:4,fontFamily:"Georgia,serif",fontStyle:"italic"}}>De dónde viene el ahorro</div>
          <div style={{fontSize:11,color:B.creamDim,marginBottom:14}}>Distribución por tipo de evento registrado</div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={eventBreakdown} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" paddingAngle={4}>
                {eventBreakdown.map((e,i)=><Cell key={i} fill={e.color}/>)}
              </Pie>
              <Tooltip content={<CustomTooltip/>}/>
            </PieChart>
          </ResponsiveContainer>
          <div style={{display:"flex",flexWrap:"wrap",gap:10,justifyContent:"center",marginTop:8}}>
            {eventBreakdown.map((e,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:6,fontSize:11,color:B.creamDim}}>
                <div style={{width:8,height:8,borderRadius:"50%",background:e.color,flexShrink:0}}/>
                {e.name}: <strong style={{color:e.color}}>{e.value}</strong>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Event log */}
      <div style={{background:B.bgMid,border:`1px solid ${B.border}`,borderRadius:12,padding:16}}>
        <div style={{fontSize:13,fontWeight:700,color:B.gold,marginBottom:14,fontFamily:"Georgia,serif",fontStyle:"italic"}}>📋 Registro de eventos de ahorro</div>
        {roiEvents.length===0&&<div style={{textAlign:"center",color:B.creamDim,fontSize:13,padding:"20px 0"}}>Los eventos aparecerán aquí cuando confirmes garantías, multas y stock.</div>}
        {[...roiEvents].reverse().map((e,i)=>(
          <div key={e.id} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:`1px solid ${B.border}`}}>
            <span style={{fontSize:18,flexShrink:0}}>
              {"·"}
            </span>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:13,color:B.cream,fontWeight:500}}>{e.note}</div>
              <div style={{fontSize:11,color:B.creamDim,marginTop:2}}>{e.date}</div>
            </div>
            <div style={{fontWeight:700,fontSize:14,color:e.value>=0?B.green:B.red,flexShrink:0}}>
              {e.value>=0?"+":"-"}€{Math.abs(e.value||e.saving||0).toFixed(2)}
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
  {id:"facturas",    icon:"folder",  label:"Facturas"},
  {id:"roi",         icon:"savings", label:"Ahorros"},
  {id:"joblog",      icon:"flame",   label:"Registrar trabajo"},
];
const TITLES={
  briefing:"Resumen del Día", tracker:"Seguimiento en Vivo", produccion:"Panel de Producción",
  conciliacion:"Conciliación de Pagos", garantias:"Control de Garantías", stock:"Inventario y Stock",
  multas:"Control de Multas", flota:"Gestión de Flota", facturas:"Archivo de Facturas",
  roi:"Ahorros", joblog:"Registrar Trabajo",
};
const BOTTOM_TABS=[
  {id:"briefing",icon:"sun",    label:"Inicio"},
  {id:"tracker", icon:"chart",  label:"Seguimiento"},
  {id:"stock",   icon:"box",    label:"Inventario"},
  {id:"roi",     icon:"savings",label:"Ahorros"},
];

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
        if (next === selected.pin) {
          onLogin("technician", selected);
        } else {
          setError("PIN incorrecto. Inténtalo de nuevo.");
          setPin("");
        }
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
              <div>
                <div style={{fontSize:16,fontWeight:700,color:B.amber,fontFamily:"Georgia,serif",fontStyle:"italic"}}>¿Quién eres?</div>
                <div style={{fontSize:12,color:B.creamDim}}>Selecciona tu nombre</div>
              </div>
            </div>
            <div style={{maxHeight:420,overflowY:"auto",display:"flex",flexDirection:"column",gap:8}}>
              {TECHNICIANS.map(t => (
                <button key={t.id} onClick={()=>setSelected(t)} style={{
                  padding:"14px 16px",borderRadius:10,border:`1px solid ${B.border}`,
                  background:B.bgAccent,cursor:"pointer",textAlign:"left",
                  display:"flex",alignItems:"center",gap:12,transition:"all 0.1s",
                }}>
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
              <div>
                <div style={{fontSize:16,fontWeight:700,color:B.amber,fontFamily:"Georgia,serif",fontStyle:"italic"}}>{selected.name}</div>
                <div style={{fontSize:12,color:B.creamDim}}>Introduce tu PIN de 4 dígitos</div>
              </div>
            </div>

            {/* PIN dots */}
            <div style={{display:"flex",justifyContent:"center",gap:16,marginBottom:24}}>
              {[0,1,2,3].map(i => (
                <div key={i} style={{width:18,height:18,borderRadius:"50%",background:i<pin.length?B.amber:B.bgAccent,border:`2px solid ${i<pin.length?B.amber:B.border}`,transition:"all 0.15s"}}/>
              ))}
            </div>

            {error && <div style={{textAlign:"center",color:B.red,fontSize:13,marginBottom:16,fontWeight:600}}>{error}</div>}

            {/* PIN pad */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
              {["1","2","3","4","5","6","7","8","9","","0","X"].map(k => (
                k === "" ? <div key="empty"/> :
                <button key={k} onClick={()=>handlePad(k)} style={{
                  padding:"18px",borderRadius:12,border:`1px solid ${B.border}`,
                  background:k==="X"?B.bgAccent:B.bgAccent,
                  color:k==="X"?B.creamDim:B.cream,
                  fontSize:k==="X"?18:22,fontWeight:600,cursor:"pointer",
                  fontFamily:"inherit",transition:"all 0.1s",
                }}>{k === "X" ? "⌫" : k}</button>
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

  if (mode === "technician") {
    return <TechnicianLogin onLogin={onLogin} onBack={()=>setMode(null)}/>;
  }

  const submit=()=>{
    if((email==="daniel@jenecheru.es"||email==="jenecherutelecomunicaciones@gmail.com")&&pass==="jenecheru2026"){onLogin("owner");return;}
    if((email==="secretaria@jenecheru.es"||email==="jenecheruteleco@gmail.com")&&pass==="jenecheru2026"){onLogin("secretary");return;}
    setErr("Email o contraseña incorrectos.");
  };

  return (
    <div style={{minHeight:"100vh",background:B.bg,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Sans',sans-serif",padding:20}}>
      <div style={{background:B.bgMid,border:`1px solid ${B.border}`,borderRadius:20,padding:32,width:"100%",maxWidth:400,boxShadow:"0 24px 80px rgba(0,0,0,0.6)"}}>
        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{display:"flex",justifyContent:"center",marginLeft:"-20px",marginBottom:16}}>
            <JLogo size={110}/>
          </div>
          <div style={{fontFamily:"Georgia,serif",fontSize:24,fontWeight:700,fontStyle:"italic",color:B.amber}}>Jenecherú IA</div>
          <div style={{fontSize:11,color:B.creamDim,letterSpacing:"0.15em",textTransform:"uppercase",marginTop:4}}>El fuego que nunca se apaga</div>
        </div>

        {/* Technician button - big and prominent */}
        <button onClick={()=>setMode("technician")} style={{
          width:"100%",padding:"16px",borderRadius:12,border:`2px solid ${B.amber}`,
          background:B.amber+"15",color:B.amber,fontWeight:800,fontSize:16,
          cursor:"pointer",marginBottom:20,fontFamily:"inherit",
          display:"flex",alignItems:"center",justifyContent:"center",gap:10,
        }}>
          <Icon name="flame" size={20} color={B.amber}/>
          Soy técnico
        </button>

        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
          <div style={{flex:1,height:1,background:B.border}}/>
          <span style={{fontSize:12,color:B.creamDim}}>o accede con email</span>
          <div style={{flex:1,height:1,background:B.border}}/>
        </div>

        <div style={{marginBottom:14}}>
          <div style={{fontSize:11,fontWeight:600,color:B.amber,marginBottom:6,textTransform:"uppercase",letterSpacing:0.8}}>Email</div>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="tu@email.com" autoCapitalize="none"
            style={{width:"100%",padding:"14px",borderRadius:10,border:`1px solid ${B.border}`,background:B.bgAccent,color:B.cream,fontSize:16,outline:"none",fontFamily:"inherit",boxSizing:"border-box"}}
            onKeyDown={e=>e.key==="Enter"&&submit()}/>
        </div>
        <div style={{marginBottom:20}}>
          <div style={{fontSize:11,fontWeight:600,color:B.amber,marginBottom:6,textTransform:"uppercase",letterSpacing:0.8}}>Contraseña</div>
          <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="••••••••"
            style={{width:"100%",padding:"14px",borderRadius:10,border:`1px solid ${B.border}`,background:B.bgAccent,color:B.cream,fontSize:16,outline:"none",fontFamily:"inherit",boxSizing:"border-box"}}
            onKeyDown={e=>e.key==="Enter"&&submit()}/>
        </div>
        {err&&<div style={{background:B.red+"15",color:B.red,padding:"10px 14px",borderRadius:8,fontSize:13,marginBottom:16,border:`1px solid ${B.red}30`}}>{err}</div>}
        <button onClick={submit} style={{width:"100%",padding:"14px",borderRadius:10,border:"none",background:B.bgAccent,color:B.creamDim,fontWeight:700,fontSize:15,cursor:"pointer",border:`1px solid ${B.border}`}}>Entrar</button>
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
          <div><div style={{fontFamily:"Georgia,serif",fontSize:15,fontWeight:700,fontStyle:"italic",color:B.amber}}>Jenecherú IA</div><div style={{fontSize:9,color:B.creamDim,letterSpacing:"0.1em",textTransform:"uppercase",marginTop:1}}>El fuego que nunca se apaga</div></div>
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
  const [role,setRole]=useState(null);
  const [screen,setScreen]=useState("briefing");
  const [menuOpen,setMenuOpen]=useState(false);
  const [roiEvents,setRoiEvents]=useState(INITIAL_ROI_EVENTS);
  const addRoiEvent=(event)=>setRoiEvents(prev=>[...prev,event]);
  const isMobile=useIsMobile();

  if(!role) return <Login onLogin={(r,tech)=>{setRole(r);setScreen(r==="technician"?"joblog":"briefing");}}/>;

  const visibleNav=role==="technician"?NAV.filter(n=>n.id==="joblog"):role==="secretary"?NAV.filter(n=>n.id!=="conciliacion"&&n.id!=="roi"):NAV;

  const renderScreen=()=>{
    const p={isMobile,setScreen,roiEvents,addRoiEvent};
    switch(screen){
      case "briefing":    return <Briefing {...p}/>;
      case "tracker":     return <Tracker {...p}/>;
      case "produccion":  return <Production {...p}/>;
      case "conciliacion":return <Reconciliation {...p}/>;
      case "garantias":   return <Guarantees {...p}/>;
      case "stock":       return <Stock {...p}/>;
      case "multas":      return <Fines {...p}/>;
      case "flota":       return <Fleet {...p}/>;
      case "facturas":    return <Invoices {...p}/>;
      case "roi":         return <ROIDashboard roiEvents={roiEvents}/>;
      case "joblog":      return <JobLog {...p}/>;
      default:            return <Briefing {...p}/>;
    }
  };

  if(isMobile) return (
    <div style={{display:"flex",flexDirection:"column",height:"100vh",background:B.bg,fontFamily:"'DM Sans',sans-serif",color:B.cream}}>
      {menuOpen&&<MobileMenu screen={screen} setScreen={setScreen} role={role} onClose={()=>setMenuOpen(false)} onLogout={()=>{setRole(null);setMenuOpen(false);}}/>}
      <div style={{background:B.bgMid,borderBottom:`1px solid ${B.border}`,padding:"12px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0,position:"sticky",top:0,zIndex:100}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <JLogo size={30}/>
          <div style={{fontFamily:"Georgia,serif",fontSize:16,fontWeight:700,fontStyle:"italic",color:B.amber}}>Jenecherú IA</div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{fontSize:12,color:B.creamDim,maxWidth:120,textAlign:"right",lineHeight:1.3}}>{TITLES[screen]}</div>
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
          <div><div style={{fontFamily:"Georgia,serif",fontSize:16,fontWeight:700,fontStyle:"italic",color:B.amber,lineHeight:1.2}}>Jenecherú IA</div><div style={{fontSize:9,color:B.creamDim,letterSpacing:"0.12em",textTransform:"uppercase",marginTop:2}}>El fuego que nunca se apaga</div></div>
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
          <button onClick={()=>setRole(null)} style={{width:"100%",padding:"7px",borderRadius:8,border:`1px solid ${B.border}`,background:"transparent",color:B.creamDim,fontSize:12,cursor:"pointer"}}>Cerrar sesión</button>
        </div>
      </div>
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        <div style={{background:B.bgMid,borderBottom:`1px solid ${B.border}`,padding:"14px 28px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
          <div style={{fontSize:17,fontWeight:700,color:B.cream,fontFamily:"Georgia,serif",fontStyle:"italic"}}>{TITLES[screen]}</div>
          <div style={{fontSize:12,color:B.creamDim}}>{new Date().toLocaleDateString("es-ES",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}</div>
        </div>
        <div style={{flex:1,overflow:"auto",padding:24}}>{renderScreen()}</div>
      </div>
    </div>
  );
}
