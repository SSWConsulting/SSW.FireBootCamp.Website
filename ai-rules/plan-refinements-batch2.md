# FireBootCamp Website – UI, Content & UX Improvements (Batch 2)

Implementation plan for [GitHub Issue #27](https://github.com/SSWConsulting/SSW.FireBootCamp.Website/issues/27)

## Overview

This plan implements visual refinements, interaction improvements, and layout updates across navigation, CTAs, pricing, and content sections to improve visual polish, hierarchy, and consistency.

## Implementation Steps

### Step 1: Navbar Improvements

**Files:** `components/layout/nav/header.tsx`, `public/uploads/fbc_logo-dm.svg` (may need asset cleanup)

**Changes:**
- Remove white specs/artefacts from logo (may require SVG cleanup or CSS filter)
- Increase logo size from `h-8` to `h-10` or `h-12` (responsive scaling)
- Add navbar footnote linking to Agenda section (`#program`)

**TypeScript considerations:**
- No new types needed
- Ensure anchor link uses smooth scroll behavior (already implemented)

**Accessibility:**
- Maintain `aria-label` on logo link
- Ensure footnote link is keyboard accessible

---

### Step 2: Button Block-Style Drop Shadow

**Files:** `components/ui/button.tsx`, `styles.css`

**Changes:**
- Add block-style drop shadow utility class to `styles.css`
- Apply block-style shadow to all button variants
- Shadow should be playful and friendly (offset shadow, not soft blur)

**Implementation:**
- Create new CSS custom property: `--shadow-block` with offset shadow (e.g., `4px 4px 0px rgba(0,0,0,0.1)`)
- Add `.shadow-block` utility class
- Update button variants to include block shadow

**TypeScript considerations:**
- No type changes needed

**Accessibility:**
- Ensure shadow doesn't reduce focus visibility
- Maintain existing focus-visible styles

---

### Step 3: Input Minimum Height Update

**Files:** `components/blocks/fbc-certification.tsx`, `components/blocks/fbc-cta-banner.tsx`, any other input components

**Changes:**
- Increase minimum height from current (`h-10 md:h-12`) to `min-h-[51px]` to account for drop shadow
- Ensure consistent height across all email inputs

**Files affected:**
- `components/blocks/fbc-certification.tsx` (line 43)
- `components/blocks/fbc-cta-banner.tsx` (line 35)

**TypeScript considerations:**
- No type changes needed

**Accessibility:**
- Maintain proper label association (`htmlFor`/`id` if labels are added)
- Ensure touch target size meets WCAG 2.2 (44x44px minimum)

---

### Step 4: Agenda Section (Tabs) Interactivity

**Files:** `components/blocks/fbc-tabs.tsx`

**Changes:**
- Make agenda draggable with pointer events (swipe/drag navigation)
- Add navigation buttons (prev/next arrows)
- Add progress indicators (dots or bar showing current tab)

**Implementation approach:**
- Use React hooks for drag/swipe detection (`useState`, `useRef`, `useEffect`)
- Add touch event handlers for mobile drag
- Add left/right arrow buttons for navigation
- Add progress dots below tabs showing active tab index

**TypeScript considerations:**
- Add state types for drag position, current index
- Ensure proper typing for touch/mouse events

**Accessibility:**
- Add `aria-label` to navigation buttons
- Ensure keyboard navigation (arrow keys) works
- Add `aria-live` region for screen readers on tab change
- Progress indicators should be `aria-hidden="true"` (decorative)

**Dependencies:**
- May need to install drag/swipe library (e.g., `react-swipeable`) or implement custom solution

---

### Step 5: Certification CTA Layout Restructure

**Files:** `components/blocks/fbc-certification.tsx`

**Changes:**
- Move badge graphic to right-hand side (currently left)
- Move copywriting and form input to left-hand side
- Increase badge graphic size by ~20% (from `max-w-[300px] md:max-w-[400px] lg:w-[526px]` to approximately `max-w-[360px] md:max-w-[480px] lg:w-[631px]`)

**Layout changes:**
- Reverse flex direction: `flex-col lg:flex-row-reverse`
- Adjust max-widths and spacing accordingly

**TypeScript considerations:**
- No type changes needed

**Accessibility:**
- Maintain image `alt` text
- Ensure form remains accessible with proper label association

---

### Step 6: Pricing Card Styling Updates

**Files:** `components/blocks/fbc-pricing.tsx`, `styles.css`

**Changes:**
- Update pricing layout as per latest design (verify current layout matches requirements)
- For `isFeatured` pricing card:
  - Replace faded red drop shadow (`shadow-[0px_0px_0px_6px_rgba(204,65,65,0.22)]`) with **2px solid red outline** on left and right sides
  - Add block-style **red** drop shadow (similar to button shadow but in red)
- Apply block-style **grey** drop shadow to non-featured cards (aligned with secondary buttons)

**Implementation:**
- Create red block shadow utility: `--shadow-block-red`
- Create grey block shadow utility: `--shadow-block-grey`
- Update `PricingCard` component styling
- Add border-left and border-right for featured cards: `border-l-2 border-r-2 border-red`

**TypeScript considerations:**
- No type changes needed (using existing `isFeatured` boolean)

**Accessibility:**
- Ensure featured card is clearly indicated to screen readers (consider `aria-label` or `role="region"`)
- Maintain focus states on CTA buttons

---

### Step 7: Team Section Enhancements

**Files:** `components/blocks/fbc-team.tsx`, `content/pages/home.mdx` (for image paths)

**Changes:**
- Increase social button size and clickable area (from `size-6` to `size-8` or larger)
- Fix missing team images (verify image paths in content files)

**Implementation:**
- Update `SocialLink` component icon size
- Increase padding/clickable area (min 44x44px for touch targets)
- Verify team member image paths in `content/pages/home.mdx`
- Check if images exist in `public/uploads/team/` directory

**TypeScript considerations:**
- No type changes needed

**Accessibility:**
- Ensure social links have descriptive `aria-label` (e.g., "Visit [Name]'s LinkedIn profile")
- Maintain keyboard navigation
- Ensure sufficient contrast on hover states

---

### Step 8: Mailing CTA Banner Layout & SophieBot

**Files:** `components/blocks/fbc-cta-banner.tsx`, `tina/collection/page.ts` (if adding SophieBot field), `public/uploads/` (for SophieBot asset)

**Changes:**
- Adjust layout: move all copy to left side, stacked vertically
- Add **SophieBot** character to right-hand side of banner

**Layout changes:**
- Restructure flex layout: left column (copy + form), right column (SophieBot image)
- Stack title, description, form vertically on left
- Add SophieBot image on right (responsive: hide on mobile if needed)

**TinaCMS considerations:**
- Add optional `sophieBotImage` field to `fbcCtaBannerBlockSchema` if image should be editable
- Or use static path if image is fixed

**TypeScript considerations:**
- Add `sophieBotImage?: string` to `PageBlocksFbcCtaBanner` type (if making editable)
- Or use static import if fixed asset

**Accessibility:**
- Add `alt` text for SophieBot image (decorative: `alt=""` or descriptive if meaningful)
- Ensure form remains accessible

**Asset requirements:**
- SophieBot character image needs to be added to `public/uploads/` directory
- Verify image format and optimization

---

## Testing & Validation

### Manual Testing Checklist
- [ ] Navbar logo displays correctly without artefacts, correct size, footnote link works
- [ ] All buttons have block-style drop shadow
- [ ] All inputs have minimum 51px height
- [ ] Agenda section is draggable on mobile, navigation buttons work, progress indicators update
- [ ] Certification CTA has correct layout (badge right, copy left), badge is 20% larger
- [ ] Featured pricing card has red outline (left/right) and red block shadow; non-featured have grey block shadow
- [ ] Team section social buttons are larger, all images display correctly
- [ ] Mailing CTA banner has correct layout, SophieBot displays on right side

### Accessibility Testing
- [ ] Keyboard navigation works for all interactive elements
- [ ] Screen reader announces tab changes in agenda section
- [ ] All images have appropriate alt text
- [ ] Touch targets meet 44x44px minimum
- [ ] Focus states are visible with new shadows

### Browser Testing
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## Dependencies & Considerations

### Potential Dependencies
- May need drag/swipe library for agenda section (e.g., `react-swipeable` or `framer-motion`)
- SophieBot asset needs to be provided/created

### Design System Alignment
- Block-style shadows should be consistent across buttons, pricing cards, and other elements
- Red color: `#cc4141` (from `--color-red`)
- Grey shadow should match secondary button styling

### Performance Considerations
- Drag/swipe handlers should be debounced/throttled
- Image optimization for SophieBot and team images
- Ensure no layout shift (CLS) when images load

---

## Files Summary

**Components to modify:**
- `components/layout/nav/header.tsx`
- `components/ui/button.tsx`
- `components/blocks/fbc-certification.tsx`
- `components/blocks/fbc-cta-banner.tsx`
- `components/blocks/fbc-tabs.tsx`
- `components/blocks/fbc-pricing.tsx`
- `components/blocks/fbc-team.tsx`

**Styles to modify:**
- `styles.css`

**Content/Assets:**
- `public/uploads/fbc_logo-dm.svg` (may need cleanup)
- `public/uploads/` (SophieBot image - to be added)
- `content/pages/home.mdx` (verify team image paths)

**TinaCMS Schema (if needed):**
- `tina/collection/page.ts` (if adding SophieBot field to CTA banner)

---

## Implementation Todos

1. **Navbar Improvements** - Update navbar: remove logo artefacts, increase logo size, add Agenda footnote link
2. **Button Block Shadow** - Add block-style drop shadow to all button variants in button component and styles.css
3. **Input Height Update** - Increase input minimum height to 51px in certification and CTA banner components (depends on button-block-shadow)
4. **Agenda Interactivity** - Make agenda section draggable, add navigation buttons and progress indicators
5. **Certification Layout** - Restructure certification CTA: move badge to right, copy to left, increase badge size 20%
6. **Pricing Styling** - Update pricing cards: add red outline and block shadow for featured, grey block shadow for non-featured (depends on button-block-shadow)
7. **Team Enhancements** - Increase social button size/clickable area and fix missing team images
8. **CTA Banner SophieBot** - Update mailing CTA banner layout (stack copy left) and add SophieBot character on right

