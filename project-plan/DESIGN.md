
# Design System & UI/UX

## Design Philosophy
- **Minimalism**: Clean, uncluttered interface focusing on content
- **Emotional Connection**: Colors and imagery that evoke positive feelings
- **Accessibility**: Inclusive design for all users
- **Mobile-First**: Optimized for touch interactions and small screens

## Color Palette

### Primary Gradients
- **Sunrise**: `from-orange-400 via-pink-500 to-purple-600`
- **Ocean**: `from-blue-400 via-cyan-500 to-teal-600`
- **Forest**: `from-green-400 via-emerald-500 to-teal-600`
- **Sunset**: `from-purple-400 via-pink-500 to-red-500`

### Neutral Colors
- **Background**: `#fafafa` (light gray)
- **Text Primary**: `#1a1a1a` (near black)
- **Text Secondary**: `#6b7280` (gray-500)
- **Card Background**: `rgba(255, 255, 255, 0.9)` (semi-transparent white)

## Typography
- **Primary Font**: System fonts for performance (font-sans)
- **Quote Text**: Large, readable serif or elegant sans-serif
- **Body Text**: Clean, modern sans-serif
- **Sizes**: Responsive scaling from mobile to desktop

## Layout Patterns

### Mobile Layout (Primary)
```
┌─────────────────┐
│     Header      │
├─────────────────┤
│                 │
│   Quote Card    │
│   (Full width)  │
│                 │
├─────────────────┤
│  Action Buttons │
└─────────────────┘
```

### Desktop Layout
```
┌─────────────────────┐
│       Header        │
├─────────────────────┤
│                     │
│    Centered Quote   │
│    Card (Max-width) │
│                     │
├─────────────────────┤
│   Action Buttons    │
└─────────────────────┘
```

## Interactive Elements
- **Buttons**: Rounded, with hover/tap states
- **Cards**: Subtle shadows, rounded corners
- **Animations**: Smooth transitions (200-300ms)
- **Touch Targets**: Minimum 44px for mobile accessibility

## Responsive Breakpoints
- **Mobile**: 0px - 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: 1024px+

## Accessibility
- High contrast ratios (WCAG AA compliant)
- Focus indicators for keyboard navigation
- Screen reader friendly markup
- Touch-friendly button sizes
- Alternative text for images
