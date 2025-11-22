# Testing Instructions: Raster Image Detection

## What Was Fixed

The colorization system now automatically detects when a Mesa logo contains embedded raster (PNG) images and displays a warning instead of failing silently or producing confusing results.

## How to Test

### Prerequisites

Make sure the local web server is running:

```bash
cd /Users/005ote/Documents/Github-Others/Eroica-Brandbook/brandbook
python3 -m http.server 8080
```

Then open: **http://localhost:8080/brandbook/index.html#mesa-family**

---

### Test Case 1: Raster Logo Detection

**Steps:**

1. Navigate to the "Mesa Logo Family" section
2. Click on **Logo 1** (should be selected by default)
3. Try to select a color swatch

**Expected Result:**

✅ A **yellow warning banner** appears above the preview with text like:
```
⚠️ Raster Image Detected

This logo contains a raster (PNG/JPG) image embedded in the SVG container,
which cannot be recolored dynamically.

Solution: Please export this logo as a true vector SVG from your design
software (Illustrator, Figma, etc.) with "Convert to Paths" enabled.
```

✅ **Color swatches** become semi-transparent (opacity: 0.3) and don't work
✅ **Color picker** is disabled (grayed out)
✅ **Download buttons** are disabled

---

### Test Case 2: Vector Logo Works Correctly

**Steps:**

1. Click on **Logo 2** (one of the vector logos)
2. Select different color swatches

**Expected Result:**

✅ Warning banner **disappears** or is hidden
✅ Color swatches are **fully opaque and functional**
✅ Logo **changes color** when you click swatches
✅ Color picker **works** and updates logo color in real-time
✅ Download buttons are **enabled**

---

### Test Case 3: Switching Between Logo Types

**Steps:**

1. Start with **Logo 2** (vector)
2. Change its color to **Heroic Gold** (#C5A059)
3. Verify the logo changes color ✓
4. Switch to **Logo 1** (raster)
5. Observe the warning appears and controls are disabled
6. Switch back to **Logo 2** (vector)
7. Try changing colors again

**Expected Result:**

✅ Warning appears/disappears appropriately
✅ Controls enable/disable smoothly
✅ No JavaScript errors in console
✅ Color changes work on vector logos
✅ Color changes are blocked on raster logos

---

### Test Case 4: All Logo Types

Test each logo to verify detection is accurate:

| Logo # | Type | Should Allow Colorization? |
|--------|------|----------------------------|
| 1 | Raster | ❌ NO - Shows warning |
| 2 | Vector | ✅ YES - Works perfectly |
| 3 | Raster | ❌ NO - Shows warning |
| 4 | Raster | ❌ NO - Shows warning |
| 5 | Raster | ❌ NO - Shows warning |
| 6 | Raster | ❌ NO - Shows warning |
| 7 | Vector | ✅ YES - Works perfectly |
| 8 | Vector | ✅ YES - Works perfectly |
| 9 | Vector | ✅ YES - Works perfectly |
| 10 | Raster | ❌ NO - Shows warning |
| 11 | Raster | ❌ NO - Shows warning |
| 12 | Raster | ❌ NO - Shows warning |

---

## Browser Console Check

Open Developer Tools (F12 or Cmd+Option+I) → Console tab

### What You Should SEE:
- No JavaScript errors
- Clean execution

### What You Should NOT see:
- ❌ "Error loading SVG"
- ❌ "TypeError" or "ReferenceError"
- ❌ "Failed to fetch"

---

## Verification Checklist

After testing, confirm:

- [ ] Raster logos (1, 3, 4, 5, 6, 10, 11, 12) show warning and disable controls
- [ ] Vector logos (2, 7, 8, 9) allow full colorization
- [ ] Warning appears/disappears when switching logo types
- [ ] No JavaScript errors in console
- [ ] Color customization works perfectly on vector logos
- [ ] Download buttons are disabled for raster, enabled for vector
- [ ] User experience is clear and not confusing

---

## What To Do If Tests Fail

### Issue: Warning doesn't appear for raster logos
**Solution:** 
1. Check browser console for errors
2. Verify `applyMesaColor()` function in `app.js` contains detection logic
3. Clear browser cache (Cmd+Shift+R / Ctrl+Shift+R)

### Issue: Warning appears for ALL logos (including vector)
**Solution:**
1. Check that vector logos (2, 7, 8, 9) don't contain `<image>` tags
2. Verify detection logic: `svg.querySelectorAll('image[*|href^="data:image"]')`

### Issue: Colors still don't work on vector logos
**Solution:**
1. This is a separate issue from raster detection
2. Check that `applyMesaColor()` proceeds past the raster check
3. Verify SVG structure of the specific logo

---

## Success Criteria

✅ **Clear Communication:** Users immediately understand why some logos can't be recolored  
✅ **No Confusion:** Controls are disabled when they won't work  
✅ **Professional UX:** Warning provides actionable solution  
✅ **Graceful Degradation:** Raster logos can still be viewed, just not recolored  
✅ **No Errors:** System doesn't crash or throw errors for any logo type  

---

**Implementation Status:** ✅ Complete - Ready for testing
**Next Action:** Follow test cases above and verify results


