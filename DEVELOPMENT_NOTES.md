# Development Notes & Important Warnings

## ⚠️ CRITICAL: Dev Server Behavior

**NEVER ask user to refresh browser when dev server is running**

**Problem**: Refreshing the browser while `npm run dev` is running causes the dev server to stop and show "ERR_CONNECTION_REFUSED"

**Solution**: Always restart the dev server programmatically instead of asking user to refresh

**Commands to use:**
```bash
# Always restart dev server instead of refresh
npm run dev
```

**Never say:**
- "Try refreshing the browser"  
- "Press Cmd+R or Ctrl+R"
- "Refresh to see changes"

**Always do:**
- Restart dev server with `npm run dev`
- Let Vite's hot reload handle changes automatically
- Open browser programmatically with `--open` flag

## Dev Server Management

**Correct approach:**
1. Make changes to code
2. Vite hot reload shows changes automatically
3. If changes don't appear, restart dev server
4. Never ask user to manually refresh

**Package.json config:**
- `"dev": "vite --open"` - Automatically opens browser
- Browser will open at http://localhost:5173/
- Hot reload handles most changes automatically

## Troubleshooting

**If styles don't load:**
1. Check PostCSS configuration
2. Check Tailwind configuration  
3. Restart dev server (don't refresh browser)
4. Verify CSS imports in index.css

**If server won't start:**
1. Check for port conflicts
2. Clear node_modules if needed
3. Restart dev server

This note ensures we never break the dev server by asking for manual browser refresh.