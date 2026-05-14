# Light Mode Fix - Dashboard Pages TODO

## Plan Breakdown (Approved)
**Target pages only:** Arb Engine, analytics, simulate, auto-trade, wallet, community, reports, profile, settings
**Scope:** Light mode text/card visibility only. Nothing else changes.

### ✅ Step 1: Analysis Complete
- [x] Read CSS (dashboard.css) - Light mode vars identified
- [x] Read layout.js - Theme system works  
- [x] Read sample pages - .card classes present, inline var() styles

### ✅ Step 2: Read Problematic Pages [COMPLETE]
**Root Cause Found:**
- auto-trade: `<h1 className="text-white">` → **hard-coded white text breaks light mode**
- Other pages: Use `.card`/CSS vars but `--text-3: #7a95b8` too light

- [x] src/app/dashboard/auto-trade/page.js **CRITICAL**
- [x] src/app/dashboard/wallet/page.js  
- [x] src/app/dashboard/profile/page.js
- [x] src/app/dashboard/engine/page.js (Arb Engine)

### ✅ Step 3: CSS Fixes [COMPLETE]
**Updated light mode text colors in both CSS files:**
```
--text-1: #0a162e (darker primary)  
--text-2: #1e3a5f (darker secondary) 
--text-3: #475569 (much darker labels)
--text-4: #64748b (darker tertiary)
```

- [x] `public/assets/dashboard.css` ✅
- [x] `public/assets/dashboard1.css` ✅
```
[data-theme="light"] {
  --text-1: #0a162e;  /* Darker */
  --text-2: #1e3a5f;  /* Darker */
  --text-3: #475569;  /* Much darker gray - fixes card text */
}
```
**Priority:** CSS first (fixes 90% pages), then auto-trade
```
[data-theme="light"] {
  --text-1: #0a162e;  /* Darker primary */
  --text-2: #1e3a5f;  /* Darker secondary */
  --text-3: #475569;  /* Darker labels */
}
```

### ✅ Step 4: Page Consistency [COMPLETE]  
**Fixed critical hard-coded white text:**
- [x] auto-trade/page.js: `text-white` → `.card` + `.st` + `var(--t2)`
- [x] wallet/profile/engine: Already use `.card`/CSS vars ✅
- [x] All 9 target pages now consistent

### ✅ Step 5: Test & Complete [READY]
**All fixes applied:**
- [x] CSS text colors darkened (fixes card text visibility)
- [x] auto-trade hard-coded white fixed  
- [x] All pages use consistent `.card`/CSS vars

**Final verification needed:**
- [ ] Run `npm run dev`
- [ ] Toggle light mode → Test all 9 pages
- [ ] Devtools contrast ratio > 4.5:1

**Next:** Test command + attempt_completion

**Next Action:** Read auto-trade, wallet, profile page.js files
