# A/B Test Line Chart - Interactive Analytics Dashboard

An interactive line chart application for visualizing A/B test conversion rate statistics, built with React, TypeScript, and Recharts.

🔗 **[Live Demo](https://yourusername.github.io/ab-test-line-chart/)** _(Update with your GitHub username)_

---

## 📊 Features Implemented

### Core Requirements ✅

- ✅ **Conversion Rate Visualization** - Display conversion rates as percentages for all variations
- ✅ **Interactive Tooltips** - Show detailed data on hover with vertical line indicator
- ✅ **Variation Selector** - Toggle visibility of different test variations (minimum 1 required)
- ✅ **Dynamic Axes** - Automatically adapt X and Y axes based on visible data
- ✅ **Day/Week View** - Switch between daily and weekly aggregated data
- ✅ **Responsive Design** - Optimized for screens 671px - 1300px

### Bonus Features ✅

- ✅ **Line Style Selector** - Choose between Line, Smooth, and Area chart styles
- ✅ **Modern UI** - Clean, gradient-based design with smooth animations
- ✅ **Component Architecture** - Modular, reusable components with CSS Modules

### Additional Enhancements ✅

- ✅ **TypeScript** - Full type safety throughout the application
- ✅ **Custom Hooks** - Optimized data processing with React hooks
- ✅ **Utility Functions** - Clean separation of business logic
- ✅ **GitHub Actions** - Automated deployment workflow
- ✅ **Dark/Light Theme** - Toggle between light and dark modes with localStorage persistence
- ✅ **Export to PNG** - Download chart as high-quality PNG image (2x scale)
- ✅ **Fullscreen Mode** - Expand chart to fullscreen with vendor-prefixed API support
- ✅ **Zoom Controls** - Interactive slider to zoom and pan through data

---

## 🛠️ Technology Stack

- **Framework**: React 19.2.0 with TypeScript
- **Charts**: Recharts (responsive charting library)
- **Styling**: CSS Modules for component-scoped styles
- **Build Tool**: Vite 7.2.4
- **Export**: html2canvas for PNG chart export
- **Deployment**: GitHub Pages with GitHub Actions

---

## 📁 Project Structure

```
ab-test-line-chart/
├── .github/
│   └── workflows/
│       └── deploy.yml                    # GitHub Actions deployment
├── public/                               # Static assets
├── src/
│   ├── components/                      # React components (organized in folders)
│   │   ├── button/
│   │   │   ├── button.tsx
│   │   │   └── button.module.css
│   │   ├── chart/
│   │   │   ├── chart.tsx
│   │   │   └── chart.module.css
│   │   ├── export-button/               # Export chart to PNG
│   │   │   ├── export-button.tsx
│   │   │   └── export-button.module.css
│   │   ├── fullscreen-button/           # Fullscreen mode
│   │   │   ├── fullscreen-button.tsx
│   │   │   └── fullscreen-button.module.css
│   │   ├── line-style-selector/
│   │   │   ├── line-style-selector.tsx
│   │   │   └── line-style-selector.module.css
│   │   ├── theme-toggle/                # Dark/Light theme toggle
│   │   │   ├── theme-toggle.tsx
│   │   │   └── theme-toggle.module.css
│   │   ├── time-range-selector/
│   │   │   ├── time-range-selector.tsx
│   │   │   └── time-range-selector.module.css
│   │   ├── variation-selector/
│   │   │   ├── variation-selector.tsx
│   │   │   └── variation-selector.module.css
│   │   ├── zoom-controls/
│   │   │   ├── zoom-controls.tsx
│   │   │   └── zoom-controls.module.css
│   │   └── index.ts                    # Central component exports
│   ├── hooks/                           # Custom React hooks
│   │   └── use-chart-data.ts            # Data processing hook
│   ├── types/                           # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/                           # Utility functions
│   │   └── chart-utils.ts               # Data processing & formatting
│   ├── data/
│   │   └── data.json                    # A/B test data
│   ├── assets/                          # Images and static files
│   ├── styles/                          # Global styles (if any)
│   ├── App.tsx                          # Main application component
│   ├── App.css                          # App-level styles with theme variables
│   ├── main.tsx
│   └── index.css                        # Global styles and CSS variables
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── eslint.config.js
└── README.md
```

---

## 🚀 Local Setup Instructions

### Prerequisites

- Node.js (v20 or higher)
- npm (v10 or higher)

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/surushTodzhibekov/ab-test-line-chart.git
   cd ab-test-line-chart
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

---

## 📦 Deployment to GitHub Pages

### Automatic Deployment (Recommended)

The project includes a GitHub Actions workflow that automatically deploys on push to main branch.

**Setup Steps:**

1. **Enable GitHub Pages**

   - Go to repository Settings → Pages
   - Source: Select "GitHub Actions"

2. **Push to main branch**

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

3. **Wait for deployment**
   - Check Actions tab for deployment status
   - Site will be live at `https://yourusername.github.io/ab-test-line-chart/`

### Manual Deployment

```bash
npm run deploy
```

**Note**: Update the `base` property in `vite.config.ts` with your repository name if different.

---

## 💡 How It Works

### Data Processing Flow

1. **Raw Data**: JSON file with daily visits and conversions per variation
2. **Time Aggregation**: Data can be viewed daily or aggregated by week
3. **Conversion Calculation**: `(conversions / visits) × 100`
4. **Dynamic Filtering**: Y-axis automatically adjusts to visible data range
5. **Rendering**: Recharts displays the processed data with interactive features

### Key Components

- **VariationSelector**: Multi-select checkboxes (minimum 1 required)
- **TimeRangeSelector**: Toggle between Day and Week views
- **LineStyleSelector**: Choose visualization style (Line/Smooth/Area)
- **Chart**: Recharts LineChart with custom tooltip and dynamic axes
- **ThemeToggle**: Light/dark mode toggle with localStorage persistence and CSS variables
- **ExportButton**: Export chart to PNG using html2canvas (2x scale, auto-dated filename)
- **FullscreenButton**: Enter/exit fullscreen with vendor-prefixed API support
- **ZoomControls**: Interactive slider to zoom and pan through chart data
- **useChartData Hook**: Optimized data processing with useMemo

---

## 🎨 Design Considerations

- **Responsive**: Adapts to screen sizes 671px - 1300px
- **Accessibility**: Semantic HTML, keyboard navigation support, ARIA labels
- **Performance**: Memoized calculations, efficient re-renders, optimized hooks
- **Theme Support**: 7+ CSS variables for light/dark mode with smooth transitions
- **User Experience**:
  - Prevents deselecting the last variation
  - Clear visual feedback on interactions
  - Smooth transitions and animations
  - High-quality PNG exports with 2x scale
  - Cross-browser fullscreen support (webkit, moz, ms prefixes)

---

## 📝 License

MIT

---

## 👤 Author

Your Name - [GitHub Profile](https://github.com/surushTodzhibekov)

---

## 🙏 Acknowledgments

- Design mockup provided in assignment
- Data structure from `data.json` specification
