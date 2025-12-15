---
name: Issue19-batch1-action-plan
overview: "Action plan to implement all UI/content/UX improvements listed in GitHub Issue #19 for the FireBootCamp site, spanning navbar, sections (skills/video/tabs/pricing/testimonials/mentors/CTAs/FAQ), and footer link hygiene."
todos:
  - id: nav-update
    content: Update header nav labels and add Mentors anchor in content/global/index.json; add id="mentors" to mentors section.
    status: completed
  - id: skills-borders
    content: Refactor fbc-skills borders to consistent single-stroke dividers across breakpoints.
    status: completed
  - id: video-inline-embed
    content: Remove Watch button, open SSWTV link in new tab, replace lightbox with inline YouTube embed in fbc-video.
    status: completed
  - id: tabs-images
    content: Replace repeated fbcTabs images in home.mdx and add distinct assets under public/uploads/what-to-expect/.
    status: completed
  - id: cert-cta-copy-spacing
    content: Update certification CTA button copy and spacing in fbc-certification + home.mdx.
    status: completed
  - id: pricing-order-feature
    content: Reorder pricing plans (100→9000→12000), rename Scholarship, remove 'Includes' label, add featured styling for Full Tuition, update CTA labels.
    status: completed
  - id: testimonials-add
    content: Add 1–2 testimonials (Eddie, Josh) in home.mdx and add images.
    status: completed
  - id: mentors-layout
    content: Improve mentors imagery and adjust mentors section layout/typography for hierarchy/readability.
    status: completed
  - id: join-ssw-team
    content: Update join-the-team CTA (title, SSW-related content, white background separation, external jobs link opens new tab).
    status: completed
  - id: faq-typography
    content: Increase FAQ question heading size (not just bold).
    status: completed
  - id: mailing-list-cta
    content: Apply certification CTA improvements (copy clarity + spacing) to fbc-cta-banner and content.
    status: completed
  - id: footer-links
    content: Remove SSW Internship link and verify/update footer links + social URLs in global config.
    status: completed
---

## Scope mapping (Issue #19 → code/content)

- **Global nav + footer link data (labels/URLs)**: [`content/global/index.json`](content/global/index.json), schema in [`tina/collection/global.ts`](tina/collection/global.ts)
- **Navbar rendering + anchor scroll behavior**: [`components/layout/nav/header.tsx`](components/layout/nav/header.tsx)
- **Footer rendering (social links, link columns)**: [`components/layout/nav/footer.tsx`](components/layout/nav/footer.tsx)
- **Skills/Tech section**: [`components/blocks/fbc-skills.tsx`](components/blocks/fbc-skills.tsx)
- **Video preview section**: [`components/blocks/fbc-video.tsx`](components/blocks/fbc-video.tsx)
- **“Accelerate your developer path” tabs**: [`components/blocks/fbc-tabs.tsx`](components/blocks/fbc-tabs.tsx) + page content [`content/pages/home.mdx`](content/pages/home.mdx)
- **Certification CTA**: [`components/blocks/fbc-certification.tsx`](components/blocks/fbc-certification.tsx) + content in [`content/pages/home.mdx`](content/pages/home.mdx)
- **Pricing section**: [`components/blocks/fbc-pricing.tsx`](components/blocks/fbc-pricing.tsx) + content in [`content/pages/home.mdx`](content/pages/home.mdx)
- **Testimonials**: [`components/blocks/fbc-testimonial-slider.tsx`](components/blocks/fbc-testimonial-slider.tsx) + content in [`content/pages/home.mdx`](content/pages/home.mdx)
- **Mentors + Join the Team**: [`components/blocks/fbc-team.tsx`](components/blocks/fbc-team.tsx) + content/images in [`content/pages/home.mdx`](content/pages/home.mdx), [`public/uploads/team/`](public/uploads/team/)
- **FAQs**: [`components/blocks/fbc-faq.tsx`](components/blocks/fbc-faq.tsx)
- **Mailing list signup CTA**: [`components/blocks/fbc-cta-banner.tsx`](components/blocks/fbc-cta-banner.tsx) + content in [`content/pages/home.mdx`](content/pages/home.mdx)

---

## Implementation order (low-risk first, then layout changes)

### 1) Navbar (Issue: rename “Program” → “The Program”, add “Mentors” anchor)

- Update `content/global/index.json`:
- Change header.nav label from `Program` → `The Program`
- Add a new nav item `{ "href": "#mentors", "label": "Mentors" }` (use the confirmed `#mentors` anchor)
- Update mentors section to be linkable:
- Add `id="mentors"` to the mentors/Team section wrapper in `components/blocks/fbc-team.tsx`
- Verify:
- Desktop nav and mobile nav both scroll correctly (header offset is already handled in `components/layout/nav/header.tsx` for `href` starting with `#`).

### 2) Skills / Tech section (Issue: border stroke rendering + consistent visuals)

- Refactor `components/blocks/fbc-skills.tsx` grid borders:
- Replace the current mix of `border-black/15` and conditional per-cell borders with a single consistent divider strategy (e.g. container `border` + `divide-x`/`divide-y`, or consistent `border-scheme-1-border` on all strokes).
- Ensure breakpoints (1 col, 2 col, 4 col) produce clean 1px lines with no double-borders.
- Verify:
- Check at sm/md/lg that vertical and horizontal strokes align and remain crisp.

### 3) Video preview section (Issue: remove Watch button, open SSWTV link new tab, embed YouTube directly)

- Update `components/blocks/fbc-video.tsx`:
- Remove the Watch button UI (stop rendering `data.watchLabel`, and consider removing `watchLabel` from Tina schema defaults).
- Ensure the secondary link (SSWTV) uses `target="_blank" rel="noopener noreferrer"`.
- Replace `HeroVideoDialog` lightbox usage with a direct responsive embed (iframe) using `data.videoUrl` (already a YouTube embed URL in `content/pages/home.mdx`).
- Optional schema tidy:
- Remove or deprecate `watchLabel` field from `fbcVideoBlockSchema` if no longer used.
- Verify:
- Video renders inline, plays as expected, no modal/lightbox.
- “More at SSWTV” opens a new tab.

### 4) “Accelerate your developer path” Section (Issue: replace repeated images)

- Update `content/pages/home.mdx` for the `fbcTabs` block:
- Replace the repeated `image: /uploads/what-to-expect/image (5).png` with 3 distinct images.
- Add/replace assets under `public/uploads/what-to-expect/` (new filenames without spaces are preferred for long-term hygiene).
- Verify:
- Each tab shows a different image; images render without layout shift.

### 5) Certification CTA section (Issue: clearer CTA copy, paragraph padding ~0.5rem consistent)

- Update `components/blocks/fbc-certification.tsx`:
- Adjust spacing around the paragraph(s) (description/disclaimer) to add ~0.5rem equivalent padding/margin consistent with the CTA banner styling.
- Update button label default/copy to clearly communicate the action (change from “Commit” to something like “Get certified” / “Get certification details”).
- Update `content/pages/home.mdx` values for the `fbcCertification` block to match final copy.
- Verify:
- Visual spacing matches the Mailing List CTA (see step 11) and reads clearly.

### 6) Pricing section (Issue: order, remove “Includes”, emphasize Full Tuition, clarify button labels, rename Scholarship)

- Content changes in `content/pages/home.mdx`:
- Reorder plans to **$100 Trial → $9,000 Scholarship → $12,000 Full Tuition**.
- Rename `Scholarship Price` → `Scholarship`.
- Update each plan’s `ctaLabel` to be specific (e.g. “Book a trial day”, “Apply for scholarship”, “Apply for full tuition” or similar).
- Component changes in `components/blocks/fbc-pricing.tsx`:
- Remove the hardcoded “Includes” label (currently a `<p>Includes</p>`).
- Add visual emphasis for Full Tuition:
- Recommended: add an optional boolean field on each plan in schema (e.g. `isFeatured`) and style the card when true (border/highlight).
- Set `isFeatured: true` for Full Tuition in `content/pages/home.mdx`.
- Verify:
- Cards display left→right cheapest→most expensive at lg.
- Full Tuition is visually distinguished.
- Button labels match new intent.

### 7) Testimonials section (Issue: add 1–2 testimonials)

- Update `content/pages/home.mdx` under `fbcTestimonialSlider`:
- Add entries for Eddie and Josh (quote/role/image).
- Add any missing images under `public/uploads/testimonials/`.
- Verify:
- Slider dots reflect the new count and transitions still work.

### 8) Mentors section (Issue: improve imagery + explore alternative layout)

- Content:
- Replace mentor images in `content/pages/home.mdx` to use higher-quality photos from `public/uploads/team/` (or add better photos there).
- Component/layout exploration in `components/blocks/fbc-team.tsx`:
- Add `id="mentors"` to section wrapper (required for navbar).
- Improve hierarchy/readability:
- Option A (low risk): keep grid, but adjust typography and spacing; clamp bio; emphasize name/role.
- Option B (more impactful): featured lead mentor (large card) + smaller grid for others.
- Choose A unless design review indicates B is required.
- Verify:
- Mentors section reads well on mobile and desktop; images are consistent aspect/crop.

### 9) “Join the Team” section (Issue: SSW-related, heading update, background separation, CTA opens jobs new tab)

- This appears to be the CTA block inside `FbcTeam`.
- Update `content/pages/home.mdx` for the `fbcTeam` CTA:
- `ctaTitle`: “Join the SSW Team”
- `ctaDescription`: explicitly about SSW (not generic)
- `ctaLink`: use confirmed `https://www.ssw.com.au/employment`
- Update `components/blocks/fbc-team.tsx`:
- Ensure CTA button uses `target="_blank" rel="noopener noreferrer"` for external link.
- Update CTA container styling to have clearer separation (e.g. white background card on the section background).
- Verify:
- CTA looks visually distinct and opens SSW Employment in a new tab.

### 10) FAQs (Issue: question headings larger, not just bold)

- Update `components/blocks/fbc-faq.tsx`:
- Increase the question typography size (and optionally switch to `font-oswald` for headings) while keeping good wrapping.
- Verify:
- Accordion remains accessible and readable; headings are clearly larger than answers.

### 11) Mailing list signup (Issue: same improvements as Certification CTA)

- Update `components/blocks/fbc-cta-banner.tsx` + `content/pages/home.mdx`:
- Make the CTA button copy explicit (avoid “Commit”).
- Match spacing/padding (add ~0.5rem consistent spacing between input/button and disclaimer, and/or between title/description).
- Verify:
- Visual rhythm matches Certification CTA section.

### 12) Footer (Issue: verify social links, review footer links, remove SSW Internship)

- Update `content/global/index.json`:
- Remove the “SSW Internship” link from `footer.linkColumns`.
- Review/replace internal `/courses/*` and `/internship` style links with correct SSW URLs (or remove if not relevant).
- Verify/update `footer.social` URLs (Instagram/YouTube/Twitter especially) to working official SSW profiles.
- Verify:
- All footer links navigate correctly.
- Social icons open in new tabs already (handled in `components/layout/nav/footer.tsx`).

---

## Test/verification checklist (run after all edits)

- Manual smoke test on homepage:
- Navbar anchors scroll with correct offset: `#program`, `#mentors`, `#pricing`, `#faqs`.
- Skills grid borders crisp at md/lg.
- Video inline embed works; SSWTV opens new tab.
- Tabs show distinct images.
- Pricing order and featured styling correct.
- Testimonials include new entries.
- Mentors visuals + new layout improvements OK.
- Join-the-team CTA opens `https://www.ssw.com.au/employment` in new tab.
- FAQ question typography clearly larger.
- Footer: no Internship link; all links/socials valid.