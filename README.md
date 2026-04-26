# 🐱🦉 The Kitty & The Owl — Story Website

A scroll-driven, animated story website built with React.

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Start the dev server
```bash
npm start
```

The app will open at **http://localhost:3000**

### 3. Build for production
```bash
npm run build
```

---

## Project Structure

```
src/
  App.js       ← All scenes and React components
  index.css    ← All styles, animations, and CSS variables
  index.js     ← React entry point

public/
  index.html   ← HTML shell with Google Fonts
```

## Adding New Scenes

To add the next chapter of the story, in `App.js`:

1. Add a new `bgClass` in `index.css` (e.g. `scene-s7`)
2. Add the scene ID to the `sceneIds` array
3. Copy a `<Scene>` block and fill in your new content

---

Happy scrolling! ✨
