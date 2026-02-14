# Accolade Scaling Adjustment — Summary

**Date:** 2026-02-14  
**Objective:** Reduce accolade visual size in CV Modal and Honours section only, preserving Hero and Footer presentation

---

## ✅ Changes Implemented

### **1. CVDownloadModal.tsx (Line 202)**

**Before:**
```tsx
className="h-14 w-auto object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.15)] opacity-92 scale-98"
```

**After:**
```tsx
className="h-11 w-auto object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.15)] opacity-92 scale-98"
```

**Change:** `h-14` → `h-11` (56px → 44px)  
**Reduction:** ~21% smaller

---

### **2. Honours.tsx Personnel Profile Card (Line 62)**

**Before:**
```tsx
className="h-16 w-auto object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
```

**After:**
```tsx
className="h-12 w-auto object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
```

**Change:** `h-16` → `h-12` (64px → 48px)  
**Reduction:** ~25% smaller

---

## ✅ Verification — No Cascade to Hero or Footer

### **Hero Section (UNCHANGED)**

**Mobile accolades (Line 103):**
```tsx
<div key={accolade.id} className="relative group w-14 sm:w-16">
  <img className="w-full h-auto grayscale opacity-60 ..." />
</div>
```

**Desktop accolades (Line 177):**
```tsx
<div key={accolade.id} className="relative group w-16 md:w-20">
  <img className="w-full h-auto grayscale opacity-60 ..." />
</div>
```

✅ **Status:** Fully preserved (w-14 sm:w-16, w-16 md:w-20)

---

### **Footer Section (UNCHANGED)**

**Accolades (Line 95):**
```tsx
<img
  className="h-11 w-11 md:h-12 md:w-12 opacity-90 hover:opacity-100 ..."
/>
```

✅ **Status:** Fully preserved (h-11 w-11 md:h-12 md:w-12)

---

## 📐 Size Comparison

| Location | Before | After | Reduction |
|----------|--------|-------|-----------|
| **CVDownloadModal** | 56px (h-14) | 44px (h-11) | ~21% |
| **Honours Card** | 64px (h-16) | 48px (h-12) | ~25% |
| **Hero Mobile** | w-14 sm:w-16 | **UNCHANGED** | 0% |
| **Hero Desktop** | w-16 md:w-20 | **UNCHANGED** | 0% |
| **Footer** | h-11 md:h-12 | **UNCHANGED** | 0% |

---

## 🎯 Implementation Strategy

### **Surgical Approach**
- Direct className modification in specific components
- No shared utility classes created (not needed for 2 instances)
- No global CSS changes
- No impact on transform/hover/animation logic

### **Constraints Satisfied**
✅ Scoped strictly to CVDownloadModal and Honours Personnel Profile card  
✅ Hero and Footer accolades untouched  
✅ No shared class modification  
✅ Aspect ratio maintained (width: auto)  
✅ Floating/overlap styling preserved  
✅ No layout shift or stacking-context regression  

---

## 👁️ Visual Impact

### **Before:**
- CVDownloadModal: Accolades somewhat large, competing visually with card content
- Honours Card: Accolades very prominent, potentially overpowering text

### **After:**
- CVDownloadModal: More refined, balanced proportion within modal layout
- Honours Card: Better visual hierarchy, accolades complement rather than dominate

### **Preserved:**
- Hero: Accolades remain visually consistent (carousel context)
- Footer: Accolades remain balanced with footer layout

---

## ✅ Result

**Objective Achieved:**
- ✅ Accolades refined in CV Modal and Honours section
- ✅ No regression in Hero or Footer presentation
- ✅ No cascade to global accolade usage
- ✅ Surgical, localized adjustment

**Status:** Complete and verified 🎯
