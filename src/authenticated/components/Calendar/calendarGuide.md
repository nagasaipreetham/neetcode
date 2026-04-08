# RangeCalendar – HeroUI v3 Component Guide

Composable date range picker with month grid, navigation, and year picker support built on React Aria RangeCalendar.

---

## Import

```tsx
import { RangeCalendar } from '@heroui/react';
```

---

## Basic Usage

```tsx
"use client";
import {RangeCalendar} from "@heroui/react";

export function Basic() {
  return (
    <RangeCalendar aria-label="Trip dates" firstDayOfWeek="mon">
      <RangeCalendar.Header>
        <RangeCalendar.Heading />
        <RangeCalendar.NavButton slot="previous" />
        <RangeCalendar.NavButton slot="next" />
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
  );
}
```

---

## Year Picker

`RangeCalendar.YearPickerTrigger`, `RangeCalendar.YearPickerGrid`, and their body/cell subcomponents provide an integrated year navigation pattern.

```tsx
"use client";
import {RangeCalendar} from "@heroui/react";

export function YearPicker() {
  return (
    <RangeCalendar aria-label="Trip dates">
      <RangeCalendar.Header>
        <RangeCalendar.YearPickerTrigger>
          <RangeCalendar.YearPickerTriggerHeading />
          <RangeCalendar.YearPickerTriggerIndicator />
        </RangeCalendar.YearPickerTrigger>
        <RangeCalendar.NavButton slot="previous" />
        <RangeCalendar.NavButton slot="next" />
      </RangeCalendar.Header>
      <RangeCalendar.Grid>
        <RangeCalendar.GridHeader>
          {(day) => <RangeCalendar.HeaderCell>{day}</RangeCalendar.HeaderCell>}
        </RangeCalendar.GridHeader>
        <RangeCalendar.GridBody>
          {(date) => <RangeCalendar.Cell date={date} />}
        </RangeCalendar.GridBody>
      </RangeCalendar.Grid>
      <RangeCalendar.YearPickerGrid>
        <RangeCalendar.YearPickerGridBody>
          {({year}) => <RangeCalendar.YearPickerCell year={year} />}
        </RangeCalendar.YearPickerGridBody>
      </RangeCalendar.YearPickerGrid>
    </RangeCalendar>
  );
}
```

---

## Default Value

```tsx
import {RangeCalendar} from "@heroui/react";
import {parseDate} from "@internationalized/date";

export function DefaultValue() {
  return (
    <RangeCalendar
      aria-label="Trip dates"
      defaultValue={{end: parseDate("2025-02-12"), start: parseDate("2025-02-03")}}
      firstDayOfWeek="mon"
    >
      ...
    </RangeCalendar>
  );
}
```

---

## Controlled

```tsx
import type {DateValue} from "@internationalized/date";
import {RangeCalendar} from "@heroui/react";
import {useState} from "react";

type DateRange = { start: DateValue; end: DateValue; };

export function Controlled() {
  const [value, setValue] = useState<DateRange | null>(null);
  return (
    <RangeCalendar
      aria-label="Trip dates"
      firstDayOfWeek="mon"
      value={value}
      onChange={setValue}
    >
      ...
    </RangeCalendar>
  );
}
```

---

## Min and Max Dates

```tsx
import {getLocalTimeZone, today} from "@internationalized/date";
const now = today(getLocalTimeZone());
// minValue={now} maxValue={now.add({months: 3})}
```

---

## Unavailable Dates

Use `isDateUnavailable` to block dates such as weekends, holidays, or booked slots.

```tsx
const isDateUnavailable = (date: DateValue) => {
  return blockedRanges.some(([start, end]) =>
    date.compare(start) >= 0 && date.compare(end) <= 0
  );
};
// <RangeCalendar isDateUnavailable={isDateUnavailable} ... />
```

---

## Cell Indicators

Customize cells with `RangeCalendar.CellIndicator` for event metadata.

```tsx
{(date) => (
  <RangeCalendar.Cell date={date}>
    {({formattedDate}) => (
      <>
        {formattedDate}
        {datesWithEvents.includes(date.day) && <RangeCalendar.CellIndicator />}
      </>
    )}
  </RangeCalendar.Cell>
)}
```

---

## Styling with Plain CSS (our project pattern)

Since we use Vanilla CSS (no Tailwind), style the component by targeting HeroUI's data attributes and class names through a wrapper:

```css
/* .auth-calendar is a wrapper div we add around the component */
.auth-calendar .range-calendar {
  background: var(--auth-nav-bg);
  border-radius: 12px;
  padding: 1rem;
}

.auth-calendar .range-calendar__cell-button[data-selected="true"] {
  background: var(--auth-accent-bg);
  color: var(--auth-accent-text);
}

.auth-calendar .range-calendar__cell-button[data-today="true"] {
  border: 1px solid #3b82f6;
}
```

---

## Interactive Data Attributes

| Attribute | Meaning |
|---|---|
| `[data-selected="true"]` | Date is selected |
| `[data-selection-start="true"]` | Start of selection range |
| `[data-selection-end="true"]` | End of selection range |
| `[data-selection-in-range="true"]` | Inside selected range |
| `[data-today="true"]` | Today's date |
| `[data-unavailable="true"]` | Date is unavailable |
| `[data-outside-month="true"]` | Belongs to adjacent month |
| `[data-focus-visible="true"]` | Keyboard-focused |
| `[data-disabled="true"]` | Disabled date |

---

## API Reference – RangeCalendar Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `RangeValue<DateValue> \| null` | - | Controlled selected range |
| `defaultValue` | `RangeValue<DateValue> \| null` | - | Initial selected range (uncontrolled) |
| `onChange` | `(value) => void` | - | Called when selection changes |
| `focusedValue` | `DateValue` | - | Controlled focused date |
| `onFocusChange` | `(value) => void` | - | Called when focused date changes |
| `minValue` | `DateValue` | `1900-01-01` | Earliest selectable date |
| `maxValue` | `DateValue` | `2099-12-31` | Latest selectable date |
| `isDateUnavailable` | `(date) => boolean` | - | Mark dates unavailable |
| `allowsNonContiguousRanges` | `boolean` | `false` | Allow ranges spanning unavailable dates |
| `isDisabled` | `boolean` | `false` | Disables interaction |
| `isReadOnly` | `boolean` | `false` | Read-only mode |
| `isInvalid` | `boolean` | `false` | Marks calendar as invalid |
| `visibleDuration` | `{months?: number}` | `{months: 1}` | Number of visible months |

---

## Composition Parts Reference

| Component | Description |
|---|---|
| `RangeCalendar.Header` | Header row (nav + heading) |
| `RangeCalendar.Heading` | Current month/year label |
| `RangeCalendar.NavButton` | Prev/next navigation (`slot="previous"`, `slot="next"`) |
| `RangeCalendar.Grid` | Day grid for one month |
| `RangeCalendar.GridHeader` | Weekday label row |
| `RangeCalendar.GridBody` | Date cell body |
| `RangeCalendar.HeaderCell` | Weekday label cell |
| `RangeCalendar.Cell` | Individual date cell |
| `RangeCalendar.CellIndicator` | Dot indicator for event metadata |
| `RangeCalendar.YearPickerTrigger` | Toggle to open year picker |
| `RangeCalendar.YearPickerGrid` | Year selection grid |
| `RangeCalendar.YearPickerGridBody` | Year grid body renderer |
| `RangeCalendar.YearPickerCell` | Individual year option |

---

## Related packages

- [`@internationalized/date`](https://react-aria.adobe.com/internationalized/date/) — date types and utilities
- [`I18nProvider`](https://react-aria.adobe.com/I18nProvider) — override locale for subtree
- [`useLocale`](https://react-aria.adobe.com/useLocale) — read current locale

---

## Related Components

- **Calendar** – Single date selection calendar grid
- **DateField** – Date input field with labels and validation
- **DatePicker** – Composable date picker with popover calendar
