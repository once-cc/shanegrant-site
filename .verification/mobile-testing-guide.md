# Mobile Testing Guide — iOS Safari & Chrome

**Objective:** Validate mobile stability fixes across iOS devices  
**Target:** iOS Safari 17+ and iOS Chrome (WebKit)

---

## 🧪 Quick Test Protocol (5 minutes)

### **1. Open Site on iPhone**
- Open `https://shanegrant.nz` (or localhost via network)
- Wait for full page load

### **2. Primary Scroll Test**
**Fast Scroll:**
- Flick scroll rapidly from top → bottom
- ✅ **Expected:** Smooth momentum, no reset to top
- ❌ **Fail:** Page jumps to top mid-scroll

**Slow Scroll:**
- Scroll slowly through entire page
- ✅ **Expected:** Butter smooth, no jank
- ❌ **Fail:** Stuttering or layout flash

### **3. Critical Section Test**

**Honours Section (Previous Failure Point):**
1. Scroll to "Commendations" section
2. Continue scrolling past it into Contact section
3. ✅ **Expected:** Seamless transition, no reset
4. ❌ **Fail:** Page resets to top, white flash, or loop

**Footer Scroll (Primary Fix):**
1. Scroll to bottom of page
2. Footer should enter viewport naturally (not sticky)
3. ✅ **Expected:** Footer slides in from bottom, stays in place
4. ❌ **Fail:** Footer appears suddenly, or layout jumps

### **4. Bounce Test**
- Scroll to top, pull down (rubber band effect)
- Scroll to bottom, pull up
- ✅ **Expected:** Natural iOS bounce, no glitches
- ❌ **Fail:** Scroll position resets after bounce

### **5. Interaction Test**
- Tap "Download CV" button → modal opens
- Close modal → scroll position preserved
- ✅ **Expected:** No scroll jump when modal closes
- ❌ **Fail:** Page jumps to top

---

## 🔍 Detailed Testing (15 minutes)

### **Device Rotation Test**
1. Portrait mode: Scroll to middle of page
2. Rotate to landscape
3. Rotate back to portrait
4. ✅ **Expected:** Scroll position preserved, no layout shift
5. ❌ **Fail:** Page resets or content jumps

### **Background/Foreground Test**
1. Scroll to Honours section
2. Switch to another app (home screen)
3. Return to Safari
4. ✅ **Expected:** Same scroll position maintained
5. ❌ **Fail:** Page reset to top

### **ServiceRecord Animation Test**
1. Scroll slowly through "Defence Record" section
2. Observe card animations and timeline progression
3. ✅ **Expected:** Smooth animations, no scroll stutter
4. ❌ **Fail:** Jank or choppy timeline animation

### **Contact Form Test**
1. Scroll to Contact section
2. Fill out form (don't submit)
3. Scroll up and down while form has content
4. ✅ **Expected:** Smooth scroll, form state preserved
5. ❌ **Fail:** Form clears or layout shifts

---

## 🚨 Known Good Behaviors (Should Still Work)

### **Desktop Sticky Footer (> 1024px)**
- On desktop/tablet landscape, footer should remain sticky
- Test on iPad Pro landscape or desktop browser

### **Header Sticky**
- Header should remain sticky on ALL devices
- Scroll down → header stays at top

### **Modal Scroll**
- CV modal and ServiceRecord modals scroll independently
- Body scroll locked when modal open

---

## 🐛 Debugging Steps (If Issues Found)

### **Issue: Scroll Still Resets**

**Check 1: CSS Compiled Correctly**
1. Open Safari Developer Tools (desktop)
2. Inspect `<section>` element containing footer
3. Verify: `position: static` on mobile, `position: sticky` on desktop

**Check 2: Media Query Active**
1. Safari Dev Tools → Responsive Design Mode
2. Set to iPhone 14 Pro (390px width)
3. Inspect footer `<section>` → computed styles
4. Should NOT show `position: sticky`

**Check 3: Console Errors**
1. Safari → Develop → [Your iPhone] → Web Inspector
2. Check Console for errors
3. Look for: CSS parse errors, React warnings

---

### **Issue: Scroll Jank/Stutter**

**Check 1: Compositing Layers**
1. Desktop Safari → Develop → Show Compositing Borders
2. Scroll through ServiceRecord section
3. Ideal: Minimal red borders (composited layers)
4. Bad: Many red borders = over-compositing

**Check 2: Paint Flashing**
1. Desktop Safari → Web Inspector → Timelines
2. Enable "Paint Flashing"
3. Scroll page
4. Ideal: Minimal green flashes
5. Bad: Constant flashing = repaint loops

---

### **Issue: Footer Layout Jump**

**Check: Min-Height Values**
1. Inspect footer container
2. Mobile (< 1024px): Should be `min-height: 18rem`
3. Desktop (>= 1024px): Should be `min-height: 30rem` or `35rem`

**Check: Padding Calculation**
1. Footer should flow naturally on mobile
2. No artificial spacing above footer on small screens

---

## 📊 Expected Performance Metrics

### **Before Optimization:**
- **Scroll FPS:** ~30-45 fps (choppy)
- **Compositing Layers:** 15-20
- **Layout Thrashing:** Frequent on mobile

### **After Optimization:**
- **Scroll FPS:** ~60 fps (smooth)
- **Compositing Layers:** 8-10
- **Layout Thrashing:** None

### **How to Measure:**

**iOS Safari:**
1. Settings → Safari → Advanced → Web Inspector (ON)
2. Mac Safari → Develop → [Your iPhone] → Web Inspector
3. Timelines → Record while scrolling
4. Check "CPU Usage" and "Frame Rate"

---

## ✅ Success Criteria

### **Must Pass (Critical):**
- [ ] No scroll reset loops on iOS Safari
- [ ] Footer scrolls naturally into view on mobile
- [ ] No layout jumps when scrolling past Honours
- [ ] Smooth scroll from top to bottom (60fps)
- [ ] Desktop sticky footer still works

### **Should Pass (Important):**
- [ ] ServiceRecord animations smooth (no jank)
- [ ] Modal open/close preserves scroll position
- [ ] Bounce behavior natural (no glitches)
- [ ] Contact form interaction smooth

### **Nice to Have:**
- [ ] Rotation preserves scroll position
- [ ] Background/foreground stable
- [ ] Pinch zoom doesn't break layout

---

## 🎯 Quick Pass/Fail Decision

**PASS ✅ if:**
- Fast scroll from top → bottom → no reset
- Honours section scroll → no loop
- Footer enters naturally on mobile
- Desktop experience unchanged

**FAIL ❌ if:**
- Any scroll reset to top occurs
- Footer "jumps" into view
- White flash / reflow during scroll
- Desktop sticky broken

---

## 📝 Reporting Results

### **If Test Passes:**
```
✅ Mobile stability confirmed
- iOS Safari: [version]
- iOS Chrome: [version]
- Device: [iPhone model]
- No scroll loops detected
- Footer behavior correct
- ServiceRecord smooth
```

### **If Test Fails:**
```
❌ Issue detected
- Section: [Honours / Footer / ServiceRecord]
- Behavior: [describe glitch]
- Reproducibility: [always / sometimes]
- Video/Screenshot: [attach if possible]
```

---

## 🚀 Remote Debugging Setup (Advanced)

### **Enable Remote Debugging:**

**On iPhone:**
1. Settings → Safari → Advanced
2. Enable "Web Inspector"

**On Mac:**
1. Safari → Preferences → Advanced
2. Enable "Show Develop menu"
3. Connect iPhone via cable
4. Safari → Develop → [Your iPhone] → [shanegrant.nz]

**Now you have:**
- Full console access
- DOM inspector
- Network tab
- Performance timeline
- Paint flashing visualization

---

**Ready to test!** 🧪📱

Start with the **Quick Test Protocol** (5 mins).  
If any failures occur, proceed to **Detailed Testing** and **Debugging Steps**.
