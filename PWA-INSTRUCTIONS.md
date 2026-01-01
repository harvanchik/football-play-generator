# PWA Installation Instructions

## iOS (Safari)

1. Open Safari and navigate to the app URL
2. Tap the Share button (square with arrow pointing up)
3. Scroll down and tap "Add to Home Screen"
4. Name the app (e.g., "Penalty Gen")
5. Tap "Add"
6. The app will now appear on your home screen as a standalone app

## Features

- **Standalone Mode**: When launched from the home screen, the app runs in full screen without browser UI
- **Offline Support**: The app caches resources for offline use via service worker
- **Optimized Viewport**: Content fits within the visible screen area, accounting for browser chrome and safe areas
- **iOS Safe Areas**: Properly handles iPhone notch and home indicator

## Technical Details

### Files Added

- `manifest.json` - PWA manifest file
- `service-worker.js` - Offline caching and resource management
- Updated `index.html` with:
  - iOS-specific meta tags
  - Apple touch icons
  - Service worker registration
  - Dynamic viewport height calculation
  - Safe area padding support

### CSS Enhancements

- Custom `min-h-screen-safe` class for proper mobile viewport handling
- Support for iOS safe area insets
- Dynamic `--vh` CSS variable that updates on resize/orientation change

## Browser Support

- iOS Safari 11.3+
- Chrome (Android) 67+
- Firefox 58+
- Edge 79+

## Development

After making changes to the source files, rebuild using:

```bash
npm run prod
```

Then copy the updated files to the `docs` folder for GitHub Pages deployment.
