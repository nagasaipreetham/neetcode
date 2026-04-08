import { useState, useEffect } from 'react';
import { RangeCalendar } from '@heroui/react';
import { parseDate, today, getLocalTimeZone } from '@internationalized/date';
import './AuthCalendar.css';

/* User's join date — change this when auth is implemented */
const JOINED_DATE = parseDate('2025-11-02');

function useCountdown() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      const diff = midnight - now;
      const h = String(Math.floor(diff / 3600000)).padStart(2, '0');
      const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
      const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
      setTime(`${h}:${m}:${s}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function AuthCalendar() {
  const countdown = useCountdown();
  /* Fixed range: joined → today. isReadOnly prevents changing selection,
     but React Aria still allows month navigation.                        */
  const value = { start: JOINED_DATE, end: today(getLocalTimeZone()) };

  return (
    <div className="auth-calendar">
      <RangeCalendar
        aria-label="Activity since joining"
        firstDayOfWeek="mon"
        value={value}
        isReadOnly
      >
        <RangeCalendar.Header>
          <RangeCalendar.Heading />
          <span className="cal-countdown">{countdown} left</span>
          <div className="cal-nav-group">
            <RangeCalendar.NavButton slot="previous" />
            <RangeCalendar.NavButton slot="next" />
          </div>
        </RangeCalendar.Header>
        <RangeCalendar.Grid>
          <RangeCalendar.GridHeader>
            {(day) => <RangeCalendar.HeaderCell>{day}</RangeCalendar.HeaderCell>}
          </RangeCalendar.GridHeader>
          <RangeCalendar.GridBody>
            {(date) => <RangeCalendar.Cell date={date} />}
          </RangeCalendar.GridBody>
        </RangeCalendar.Grid>
      </RangeCalendar>
    </div>
  );
}
