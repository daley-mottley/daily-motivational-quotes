# Palette's Journal - CRITICAL LEARNINGS ONLY

## 2024-07-25 - Icon color overridden by parent Button style

**Learning:** When styling icon-only buttons, text color utility classes (e.g., `text-white`) on the parent `<Button>` component can override the `fill` or `stroke` color of the child SVG icon due to CSS specificity. In this project, a `FavoriteButton`'s heart icon failed to turn red on click because the parent `<Button variant="ghost">` had a default text color that took precedence over the icon's `fill="currentColor"` and a `className="text-red-500"` on the icon itself.

**Action:** To fix this, I removed the conflicting text color classes from the parent `<Button>` component in `QuoteCard.tsx`. This allowed the icon's own color and fill properties to be applied correctly, ensuring its visual state updates as expected on user interaction. When creating icon buttons in the future, I will inspect the parent `Button` component for conflicting typography styles.
