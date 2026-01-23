# Changelog - Version 440 to Current

**Date:** January 23, 2026  
**Focus:** Live Chart Visual Effects & Stroke Rendering

---

## 🎨 LiveChartWithStates Component

### **1. Smooth Glow Effect Transitions**
- **Main Shadow Layer**: Added smooth 0.8s fade-in transition for bottom shadow under bg-gradient
- **Running Shadow Container**: Fixed instant appearance - now fades in over 1.2s with box-shadow transition
- **Neon Border Trim**: Added smooth transitions for blur filter (1.2s) and box-shadow (1.2s)
- **Sweep Gradient Effect**: Changed from conditional render to opacity-based animation (1.5s fade)
- **Outer Drop-Shadow**: Verified existing 1.5s transition working correctly

**Impact:** All 5 glow/shadow/blur layers now fade in smoothly when chart expands (idle → opened/live), instead of appearing instantly.

---

### **2. Stroke Width Consistency Fix**
- **Problem**: Chart line stroke appeared distorted/scaled during state transitions
- **Solution**: Added `vectorEffect="non-scaling-stroke"` to path element
- **Result**: Stroke maintains exactly 3px width across all states (idle, opened, live)

**Impact:** Chart line renders with consistent pixel-perfect stroke width regardless of SVG scaling or state changes.

---

### **3. Max-Height Constraint System (Not Full Fill)**
- **Problem**: Live chart previously expanded to fill all available vertical space, causing layout issues on small screens
- **Solution**: Implemented responsive `max-height` constraints with viewport-based calculations
- **How It Works**:
  - **Idle State**: Fixed `height: 256px` (never changes)
  - **Expanded State (opened/live)**: Uses `max-height` instead of `height: 100%`
    - Large screens (>850px): Fixed `364px` (256px + 108px trading panel)
    - Medium screens (≤850px): `max-height: calc(100vh - reserved_space)` with `flex: 1 1 auto`
    - Small screens (≤740px): Progressively tighter constraints (296px-332px reserved)
    - iPhone SE (≤670px): Ultra-compact with button height reduced to 88px
  - **Reserved Space Calculation**: 
    - Header (~100px) + Buttons (108px/88px) + History (~135px) + Gaps (32px) = 296px-332px
    - Chart gets `100vh - reserved_space`, ensuring all UI elements remain visible
  - **Min-Height Safeguards**: Prevents chart from collapsing too small (240px-300px minimum)

**Impact:** Chart expands elegantly but never overflows or hides critical UI elements (buttons, history). Maintains perfect spacing across all device sizes from iPhone SE to large displays.

---

## 📊 Summary

**Total Components Modified:** 1  
**Total Changes:** 7 visual effect fixes + 1 layout system

**Visual Quality Improvements:**
- ✅ Smooth professional fade-in for all glow effects (0.8-1.5s)
- ✅ Consistent 3px stroke rendering across all chart states
- ✅ Eliminated visual "popping" during chart expansion animations

---

**Previous Version:** 440 (Ultra-compact iPhone SE optimizations)  
**Current Version:** 440.1 (Visual effects refinement)
