# PWA Testing Guide for Axonik.ai

## Quick Testing Steps

### 1. Build the Production Version
```bash
npm run build
npm run preview
```

### 2. Test in Chrome/Edge DevTools

#### A. Check Service Worker
1. Open `http://localhost:4173` (or your preview URL)
2. Press `F12` to open DevTools
3. Go to **Application** tab
4. Click **Service Workers** in the left sidebar
   - Should show: "activated and is running"
   - Status: "activated"

#### B. Test Offline Mode
1. In DevTools → **Application** tab
2. Click **Service Workers** → Check "Offline" checkbox
3. Refresh the page (F5)
4. The app should still work! ✅
5. Try navigating between pages
6. Uncheck "Offline" to go back online

#### C. Check Manifest
1. DevTools → **Application** tab
2. Click **Manifest** in left sidebar
3. Should show:
   - App name: "Axonik.ai - Medical AI Assistant"
   - Icons: 192x192 and 512x512
   - Theme color: #2563eb
   - Display: standalone

#### D. Test Installation
1. Look for install icon in address bar (or menu)
2. Click "Install Axonik.ai"
3. App opens in standalone window (no browser UI)
4. Check Start Menu / Applications folder for the app

### 3. Test on Mobile Devices

#### iOS (Safari)
1. Open the app in Safari
2. Tap **Share** button (square with arrow)
3. Tap **Add to Home Screen**
4. App appears on home screen
5. Tap to open - runs in standalone mode

#### Android (Chrome)
1. Open the app in Chrome
2. Tap menu (3 dots) → **Install app** or **Add to Home screen**
3. App appears on home screen
4. Tap to open - runs in standalone mode

### 4. Test PWA Features

#### Offline Functionality
- ✅ App loads without internet
- ✅ Navigation works offline
- ✅ Cached resources load instantly
- ✅ Service worker handles requests

#### App Shortcuts
1. Right-click installed app icon
2. Should see shortcuts:
   - "Chat Assistant"
   - "OCR Test"
3. Click shortcut → opens directly to that page

#### Standalone Mode
- No browser address bar
- No browser tabs
- App-like experience
- Custom theme color in status bar

### 5. Network Throttling Test
1. DevTools → **Network** tab
2. Throttle dropdown → Select "Offline" or "Slow 3G"
3. Test app performance
4. Should still work with cached resources

### 6. Clear Cache & Re-test
1. DevTools → **Application** tab
2. **Storage** → Click "Clear site data"
3. Refresh page
4. Service worker should re-register
5. Cache should rebuild

## Troubleshooting

### Service Worker Not Registering?
- Make sure you're using `npm run preview` (not `npm run dev`)
- Check browser console for errors
- Verify HTTPS (required for production PWAs)

### Offline Not Working?
- Check Service Worker is activated
- Verify cache is populated (Application → Cache Storage)
- Check Network tab for failed requests

### Installation Not Available?
- Must be served over HTTPS (or localhost)
- Manifest must be valid
- Icons must be accessible
- Service worker must be registered

## Production Deployment

For full PWA functionality in production:
1. Deploy to hosting with HTTPS (Vercel, Netlify, etc.)
2. Test installation on real devices
3. Test offline functionality
4. Verify all features work

