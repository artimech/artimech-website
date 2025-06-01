# Artimech Website 🚀

**Intelligent Engineering. We build AI/ML systems that work.**

Modern Next.js website for Artimech - an AI/ML engineering studio based in San Francisco, specializing in complex engineering challenges for data-intensive enterprises.

## 🌟 Features

- **Modern Tech Stack**: Next.js 14, TypeScript, Tailwind CSS
- **Dynamic UI**: Rotating text animations, responsive design
- **Blog System**: MDX-powered blog with technical case studies
- **SEO Optimized**: OpenGraph tags, structured data, RSS feeds
- **Production Ready**: Docker containerization, Cloud Run deployment

## 🎨 Design

- **Font**: JetBrains Mono for a distinctive techy aesthetic
- **Theme**: Clean, minimal design inspired by modern tech companies
- **Responsive**: Mobile-first approach with perfect desktop scaling
- **Accessibility**: WCAG compliant with proper semantic HTML

## 📝 Content

### Blog Posts
- **Scaling ML inference for real-time recommendations** - Performance optimization case study
- **The art of minimal AI architectures** - Philosophy on simple, effective AI systems  
- **From prototype to production in 30 days** - Computer vision deployment success story

### About Section
Comprehensive overview of Artimech's services including:
- Large Language Models (LLMs) fine-tuning
- Vision model development
- MLOps and infrastructure
- Enterprise AI solutions for legal tech, finance, and more

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Visit [http://localhost:3000](http://localhost:3000) to see the site.

## 🌐 Deployment

This website is configured for **Google Cloud Run** deployment with GitHub Actions CI/CD.

### Live URL
- **Production**: TBD (will be available after deployment)
- **Repository**: [github.com/sdntsng/artimech-website](https://github.com/sdntsng/artimech-website)

### Deploy to Cloud Run

1. **Prerequisites**: Google Cloud project with billing enabled
2. **Setup**: Follow the detailed guide in [DEPLOYMENT.md](./DEPLOYMENT.md)
3. **Configure**: Add GitHub secrets for GCP credentials
4. **Deploy**: Push to `main` branch triggers automatic deployment

## 📁 Project Structure

```
├── app/                    # Next.js 14 app directory
│   ├── blog/              # Blog system with MDX posts
│   ├── components/        # Reusable React components
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Homepage with dynamic content
├── .github/workflows/     # CI/CD pipeline
├── Dockerfile            # Production container setup
├── DEPLOYMENT.md         # Detailed deployment guide
└── next.config.js        # Next.js configuration
```

## 🛠 Technology Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Content**: MDX for blog posts with frontmatter
- **Analytics**: Vercel Analytics & Speed Insights
- **Deployment**: Docker + Google Cloud Run
- **CI/CD**: GitHub Actions

## 🔧 Configuration

### Environment Variables
- `NODE_ENV`: production/development
- `NEXT_TELEMETRY_DISABLED`: Disable Next.js telemetry

### Docker
- Multi-stage build for optimized production images
- Standalone output for minimal container size
- Non-root user for security

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for performance
- **Bundle Size**: Minimal with code splitting
- **Images**: Optimized with Next.js Image component

## 🔒 Security

- **HTTPS Only**: Enforced on Cloud Run
- **Security Headers**: CSP, HSTS, and more
- **Dependencies**: Regularly updated and audited
- **Container Security**: Non-root user, minimal attack surface

## 📈 Analytics & Monitoring

- **Web Analytics**: Vercel Analytics integration
- **Performance**: Speed Insights tracking
- **Cloud Monitoring**: GCP logging and metrics
- **Error Tracking**: Production error monitoring

## 🤝 Contributing

This is the official Artimech website. For updates:

1. Create feature branch from `main`
2. Make changes and test locally
3. Submit pull request for review
4. Automatic deployment on merge to `main`

## 📧 Contact

- **Website**: [artimech.com](https://artimech.com) (coming soon)
- **Email**: hello@artimech.com
- **Location**: San Francisco, CA

---

**Built with ❤️ by Artimech - Where AI meets engineering excellence.**
