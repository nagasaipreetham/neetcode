import { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './StreakCalendar.css';

/* ── Fake streak data ── */
const STREAK_RANGES = [
  [new Date(2025,10, 2), new Date(2025,10,25)],
  [new Date(2025,10,27), new Date(2025,11,20)],
  [new Date(2025,11,22), new Date(2026, 0,31)],
  [new Date(2026, 1, 3), new Date(2026, 2,15)],
  [new Date(2026, 2,17), new Date(2026, 3, 7)],
];
const BREAK_DAYS = [
  new Date(2025,10,26), new Date(2025,11,21),
  new Date(2026, 1, 1), new Date(2026, 1, 2),
  new Date(2026, 2,16), new Date(2026, 3, 8),
];
const JOINED = new Date(2025,10,2);

function sd(a,b){return a.getFullYear()===b.getFullYear()&&a.getMonth()===b.getMonth()&&a.getDate()===b.getDate();}
function norm(d){return new Date(d.getFullYear(),d.getMonth(),d.getDate());}
function inR(d,s,e){const dn=norm(d);return dn>=norm(s)&&dn<=norm(e);}

function getStatus(date, today) {
  const d = norm(date), t = norm(today);
  if (d > t) return 'future';
  if (d < norm(JOINED)) return 'before';
  for (const bd of BREAK_DAYS) if (sd(d,norm(bd))) return 'break';
  for (const [s,e] of STREAK_RANGES) {
    if (inR(d,s,e)) {
      const isS=sd(d,norm(s)), isE=sd(d,norm(e));
      const isT=sd(d,t);
      if (isS && isE) return isT ? 'today-only' : 'streak-only';
      if (isS)        return isT ? 'today-start' : 'streak-start';
      if (isE)        return isT ? 'today-end'   : 'streak-end';
      return isT ? 'today-mid' : 'streak-mid';
    }
  }
  if (sd(d,t)) return 'today-pending';
  return 'normal';
}

function useCountdown() {
  const [v,setV] = useState('');
  useEffect(()=>{
    const tick=()=>{
      const now=new Date(), mid=new Date(now); mid.setHours(24,0,0,0);
      const diff=mid-now;
      setV(`${String(Math.floor(diff/3600000)).padStart(2,'0')}:${String(Math.floor((diff%3600000)/60000)).padStart(2,'0')}:${String(Math.floor((diff%60000)/1000)).padStart(2,'0')}`);
    };
    tick(); const id=setInterval(tick,1000); return ()=>clearInterval(id);
  },[]);
  return v;
}

const MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

export default function StreakCalendar() {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year,  setYear]  = useState(today.getFullYear());
  const countdown = useCountdown();

  const cells = useMemo(() => {
    const first = new Date(year,month,1);
    let dow = first.getDay(); dow = dow===0?6:dow-1;
    const last  = new Date(year,month+1,0).getDate();
    const days  = [];
    for(let i=0;i<dow;i++)       days.push({date:new Date(year,month,-dow+i+1),outside:true});
    for(let i=1;i<=last;i++)     days.push({date:new Date(year,month,i),outside:false});
    const rem=42-days.length;
    for(let i=1;i<=rem;i++)      days.push({date:new Date(year,month+1,i),outside:true});
    return days;
  },[month,year]);

  const prev=()=>{ if(month===0){setMonth(11);setYear(y=>y-1);}else setMonth(m=>m-1); };
  const next=()=>{ if(month===11){setMonth(0);setYear(y=>y+1);}else setMonth(m=>m+1); };

  return (
    <div className="sc">
      <div className="sc-header">
        <span className="sc-month">{MONTHS[month]} {year}</span>
        <span className="sc-countdown">{countdown} left</span>
        <div className="sc-nav">
          <button className="sc-nav-btn" onClick={prev}><ChevronLeft  size={13}/></button>
          <button className="sc-nav-btn" onClick={next}><ChevronRight size={13}/></button>
        </div>
      </div>

      <div className="sc-day-row">
        {DAYS.map(d=><span key={d} className="sc-day-lbl">{d}</span>)}
      </div>

      <div className="sc-grid">
        {cells.map((cell,i)=>{
          const status = cell.outside ? 'outside' : getStatus(cell.date, today);
          return (
            <div key={i} className={`sc-cell ${status}`}>
              <span className="sc-num">{cell.date.getDate()}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
