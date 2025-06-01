# Artimech Landing Page

A minimal, modern landing page for artimech.com - an AI/ML Engineering Studio.

## Design Philosophy

This landing page embodies an extremely minimal and modern design aesthetic that appears "low effort" yet sophisticated. The design prioritizes:

- **Minimalism**: Clean, uncluttered layout with abundant whitespace
- **Typography-focused**: Uses Crimson Pro (serif) as the primary font with JetBrains Mono for technical accents
- **Monochrome palette**: Primarily uses shades of gray, black, and white
- **Subtle interactions**: Gentle hover effects and transitions
- **Mobile-first**: Fully responsive design for all screen sizes
- **Minimal branding**: Company name appears only in the About section, maintaining a clean aesthetic

## Site Structure

### Main Pages
1. **Home (/)**: Main landing page with hero, services, about, and featured blog posts
2. **Blog (/blog)**: Complete blog index listing all posts

### Blog Posts
3. **Scaling ML Inference** (/blog/scaling-ml-inference-real-time-recommendations): Case study on reducing latency and costs for e-commerce recommendations
4. **Minimal AI Architectures** (/blog/art-minimal-ai-architectures): Thoughts on why simpler models outperform complex ones in production
5. **Prototype to Production** (/blog/prototype-production-30-days): Case study on rapid deployment of computer vision for manufacturing quality control

All blog posts feature:
- Realistic, detailed content based on actual AI/ML engineering challenges
- Consistent minimal design aesthetic
- Proper navigation between posts and sections
- Technical depth appropriate for the target audience

## Features

- **Clean Navigation**: Minimal header with logo and blog link only
- **Modern Link Styling**: No traditional blue underlines; links have subtle hover effects with color transitions
- **Responsive Design**: Optimized for all screen sizes
- **Static Export Ready**: Configured for deployment to any static hosting service
- **Minimal Branding**: Company name referenced only in About section as "Artificial Mechanics"

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **Static Export** - Configured for deployment to any static hosting service

## Getting Started

### Development

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
npm run build
```

Creates an optimized production build with static export in the `out` folder.

### Deployment

The site is configured for static export and can be deployed to:
- Vercel
- Netlify  
- GitHub Pages
- Any static hosting service

Simply upload the contents of the `out` folder after running `npm run build`.

## Project Structure

```
src/
  app/
    layout.tsx                                        # Root layout with metadata
    page.tsx                                         # Main landing page
    globals.css                                      # Global styles and fonts
    blog/
      page.tsx                                       # Blog index page
      scaling-ml-inference-real-time-recommendations/
        page.tsx                                     # Case study: ML inference optimization
      art-minimal-ai-architectures/
        page.tsx                                     # Thoughts: Simple vs complex models
      prototype-production-30-days/
        page.tsx                                     # Case study: Rapid CV deployment
public/
  logo.png                                           # Company logo
next.config.ts                                       # Next.js configuration
cursorrules.md                                       # Design guidelines
```

## Content Strategy

The blog posts demonstrate expertise through:
- **Technical depth**: Realistic scenarios with specific metrics and constraints
- **Practical insights**: Actionable lessons learned from real projects
- **Minimal presentation**: Content-focused design without unnecessary embellishment
- **Professional tone**: Confident but not boastful, technical but accessible

## Design Guidelines

Refer to `cursorrules.md` for detailed design guidelines and content strategy that informed this implementation.
