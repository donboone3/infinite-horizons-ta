# Infinite Horizons Talent Acquisition - Codebase Guidelines

## Command Reference

### Local Development
```bash
# Run the local development server (with Hot Module Replacement)
npm run dev

# Build the production bundle
npm run build

# Preview the production build locally
npm run preview

# Run ESLint validation check
npm run lint
```

## Styling System & Tokens

We use a custom, premium **Vanilla CSS** design system (defined in [src/index.css](file:///c:/Users/donbo/OneDrive/Desktop/Cowork%20OS/Chris%20-%20Rec/infinite-horizons-ta/src/index.css)) utilizing CSS variables, responsive design grids, and glassmorphism cards. Do not install Tailwind or other utility libraries without explicit approval.

### Primary Color Variables (Logo Extracted)
- **Primary Electric Blue**: `--color-primary: #023def;` (Used for primary highlights, main CTA buttons, badges)
- **Secondary Amber Gold**: `--color-secondary: #fec311;` (Used for secondary accents, stats numbers, tags)
- **Neutral Dark Base**: `--bg-dark: #070a13;` ( Obsidian app background)
- **Neutral Light Base**: `--bg-light: #f8fafc;` (Clean slate background)

### Common Classes
- `.container`: Sets standard max-width (1200px) and padding alignment.
- `.glass-card`: Premium semi-transparent layout card with custom HSL borders, shadows, hover transitions, and glowing backdrops.
- `.btn-primary` / `.btn-secondary` / `.btn-accent`: Custom stylized button blocks with micro-hover interactions.
- `.gradient-text`: Fades text beautifully from white to amber gold (dark theme) or blue to indigo (light theme).

### Theme Support
Theme is controlled by adding the class `.light-theme` to the `document.body` or parent elements. Variables automatically switch values based on the active class list.
