# Shabdansh Prajapati — Portfolio

A modern, interview-ready portfolio website showcasing full-stack development and UI/UX design work. Built with static HTML/CSS/JS using Bootstrap 5 for optimal performance and compatibility across all hosting platforms.

## 🚀 Features

- **Modern Design**: Clean, professional interface with Pixelhack-style animations
- **Responsive**: Fully responsive design that works on all devices
- **Interactive Elements**: 
  - Animated hero section with typewriter effect
  - Hover-triggered project info panels with blurred backdrop
  - Marquee services section that pauses on hover/focus
  - Interactive contact form with AJAX submission and spam protection
  - Live preview demo for Pixelhack project with Canvas API
- **Accessibility**: WCAG AA compliant with keyboard navigation and screen reader support
- **SEO Optimized**: Proper meta tags, Open Graph, Twitter Cards, and semantic HTML
- **Performance**: Optimized images, minimal dependencies, and efficient animations

## 📁 Project Structure

\`\`\`
shabdansh-portfolio/
├── index.html              # Main portfolio page
├── projects.html           # Detailed projects showcase
├── assets/
│   ├── css/
│   │   └── main.css       # Custom styles + Bootstrap integration
│   ├── js/
│   │   └── main.js        # Interactive functionality & Canvas demo
│   ├── images/            # Optimized project screenshots and assets
│   └── Shabdansh_Resume.pdf # Resume download
├── flask-backend/         # Optional contact form backend
│   ├── app.py            # Flask application with SMTP
│   └── requirements.txt  # Python dependencies
├── forms/                 # Serverless function alternative
│   └── contact_handler.py # Netlify/Vercel compatible handler
├── manifest.json         # PWA manifest
├── favicon.ico          # Site favicon
└── README.md           # This file
\`\`\`

## 🛠️ Local Development

### Static Site (Recommended)

1. **Simple HTTP Server** (Python):
   \`\`\`bash
   python -m http.server 8000
   \`\`\`
   Visit: `http://localhost:8000`

2. **Node.js HTTP Server**:
   \`\`\`bash
   npx http-server -p 8000
   \`\`\`

3. **Live Server** (VS Code Extension):
   - Install "Live Server" extension
   - Right-click `index.html` → "Open with Live Server"

### Contact Form Backend (Optional)

The contact form can work with multiple backend options:

#### Option 1: Flask Backend (Traditional)

1. **Setup Python Environment**:
   \`\`\`bash
   cd flask-backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   \`\`\`

2. **Configure Environment Variables**:
   Create a `.env` file in the `flask-backend` directory:
   \`\`\`env
   SMTP_SERVER=smtp.gmail.com
   SMTP_PORT=587
   EMAIL_ADDRESS=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   RECIPIENT_EMAIL=shabdansh@example.com
   \`\`\`

3. **Run Flask Server**:
   \`\`\`bash
   python app.py
   \`\`\`
   Backend runs on: `http://localhost:5000`

#### Option 2: Serverless Functions (Recommended for Static Hosting)

The `forms/contact_handler.py` works with:
- **Netlify Functions**: Deploy to `/.netlify/functions/contact`
- **Vercel API Routes**: Deploy to `/api/contact`

## 📝 Customization Guide

### Replace Placeholder Content

1. **Personal Information** (`index.html`):
   - Update hero section text and social links
   - Replace email address in contact section
   - Update footer copyright information

2. **About Section** (`index.html`):
   - Replace the about text with your personal story (500-700 words recommended)
   - Update statistics (projects completed, years experience, etc.)

3. **Projects** (`index.html` & `projects.html`):
   - Replace project descriptions and features
   - Update technology tags for all 8 projects:
     - PSNotes, Shared Box, Attendance Marker, Encrypted Chat
     - Expense Tracker, Vision Board, Ksyap Solution, Pixelhack Demo
   - Add real demo and source code links
   - Replace project screenshots in `/assets/images/`

4. **Resume** (`assets/Shabdansh_Resume.pdf`):
   - Replace with your actual resume file

5. **Images** (`assets/images/`):
   - Replace `hero-avatar.jpg` with your professional photo (300x300px recommended)
   - Update all project screenshots (1200x800px recommended)
   - Replace `og-image.jpg` for social media previews (1200x630px)

6. **Contact Information**:
   - Update social media links in both HTML files
   - Configure email settings in backend
   - Update contact email addresses

### Styling Customization

Edit `assets/css/main.css` to customize:
- **Color scheme**: CSS variables at the top of the file
- **Typography**: Font families and sizes
- **Animations**: Timing and easing functions
- **Layout**: Spacing and responsive breakpoints

### Interactive Features

- **Typewriter Effect**: Modify text array in `main.js`
- **Marquee Services**: Update service items in HTML
- **Project Hovers**: Customize overlay effects in CSS
- **Pixelhack Demo**: Enhance Canvas animation in `main.js`

## 🚀 Deployment

### Static Hosting (Recommended)

#### Netlify
1. **Connect Repository**:
   - Connect your GitHub repository to Netlify
   - Build command: (leave empty)
   - Publish directory: `/` (root)

2. **Environment Variables** (for contact form):
   \`\`\`
   SMTP_SERVER=smtp.gmail.com
   SMTP_PORT=587
   EMAIL_ADDRESS=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   RECIPIENT_EMAIL=shabdansh@example.com
   \`\`\`

3. **Functions** (optional):
   - Copy `forms/contact_handler.py` to `netlify/functions/contact.py`
   - Install Python runtime in Netlify settings

#### Vercel
1. **Import Repository**:
   - Import your GitHub repository
   - Framework preset: Other
   - Build command: (leave empty)
   - Output directory: (leave empty)

2. **Environment Variables**:
   - Add the same environment variables as above in Project Settings

3. **API Routes** (optional):
   - Copy `forms/contact_handler.py` to `api/contact.py`
   - Vercel automatically handles Python functions

#### GitHub Pages
1. **Repository Setup**:
   - Push code to GitHub repository
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: main, folder: / (root)

2. **Note**: GitHub Pages doesn't support server-side functions
   - Contact form will need external service (Formspree, Netlify Forms, etc.)

### Full-Stack Deployment (with Flask Backend)

#### Heroku
1. **Prepare Flask App**:
   \`\`\`bash
   cd flask-backend
   echo "web: gunicorn app:app" > Procfile
   pip freeze > requirements.txt
   \`\`\`

2. **Deploy**:
   - Create Heroku app
   - Set environment variables
   - Deploy flask-backend folder
   - Update `main.js` with Heroku API URL

3. **Static Frontend**:
   - Deploy main site to Netlify/Vercel
   - Update contact form endpoint to Heroku URL

#### Railway
1. **Backend Deployment**:
   - Connect flask-backend folder to Railway
   - Configure environment variables
   - Deploy and get API URL

2. **Frontend Update**:
   - Update contact form endpoint in `main.js`
   - Deploy static site to preferred platform

## 🔧 Technical Details

- **Framework**: Static HTML5 with Bootstrap 5.3.2
- **Styling**: Custom CSS with CSS Grid, Flexbox, and CSS Variables
- **JavaScript**: Vanilla ES6+ with Canvas API (no external dependencies)
- **Icons**: Bootstrap Icons 1.11.1
- **Fonts**: Inter font family with system font fallbacks
- **Backend**: Optional Flask API or serverless functions
- **Performance**: 
  - Optimized images with proper alt text
  - Minimal JavaScript with debounced scroll handlers
  - Efficient CSS with reduced motion support
  - Preloaded critical images

## 🎨 Design Features

### Pixelhack-Style Elements
- **Animated Hero**: Gradient background with typewriter effect
- **Marquee Services**: Horizontal scrolling with hover pause
- **Hover Panels**: Project cards with blurred backdrop overlays
- **Interactive Demo**: Canvas-based particle system
- **Micro-animations**: Smooth transitions and hover effects

### Accessibility Features
- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Reader**: Proper ARIA labels and semantic HTML
- **High Contrast**: Support for high contrast mode
- **Reduced Motion**: Respects user's motion preferences
- **Focus Management**: Visible focus indicators

## 📋 Pre-Launch Checklist

Before going live, update these files:

### Content
- [ ] `index.html` - Hero text, about section, social links
- [ ] `projects.html` - All 8 project descriptions and links
- [ ] Meta descriptions and Open Graph tags
- [ ] Contact email addresses throughout

### Assets
- [ ] `assets/images/hero-avatar.jpg` - Your professional photo
- [ ] `assets/images/*-screenshot.jpg` - Real project screenshots (8 projects)
- [ ] `assets/images/og-image.jpg` - Social media preview image
- [ ] `assets/Shabdansh_Resume.pdf` - Your actual resume
- [ ] `favicon.ico` - Custom favicon

### Configuration
- [ ] `flask-backend/.env` or environment variables - Email configuration
- [ ] `manifest.json` - App name and description
- [ ] Social media links (GitHub, LinkedIn, Email)
- [ ] Demo and source code URLs for all projects

### Testing
- [ ] Test contact form submission
- [ ] Verify all images load correctly
- [ ] Check responsive design on mobile
- [ ] Test keyboard navigation
- [ ] Validate HTML and check console for errors

## 🐛 Troubleshooting

### Common Issues

1. **Contact Form Not Working**:
   - Check browser console for JavaScript errors
   - Verify backend is running (Flask or serverless function)
   - Confirm environment variables are set correctly

2. **Images Not Loading**:
   - Verify file paths are correct (case-sensitive)
   - Check that images exist in `/assets/images/`
   - Ensure proper file extensions (.jpg, .png, .gif)

3. **Animations Not Working**:
   - Check if user has reduced motion enabled
   - Verify JavaScript is enabled in browser
   - Look for console errors in developer tools

4. **Mobile Layout Issues**:
   - Test on actual devices, not just browser dev tools
   - Check viewport meta tag is present
   - Verify Bootstrap CSS is loading correctly

### Performance Optimization

- **Images**: Use WebP format where supported
- **CSS**: Minify for production
- **JavaScript**: Consider code splitting for larger features
- **Fonts**: Use font-display: swap for better loading

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built by Shabdansh** - A modern, interview-ready portfolio template for developers and designers.

### Version History
- **v1.0**: Initial release with basic portfolio structure
- **v1.1**: Added Pixelhack-style interactive elements
- **v1.2**: Enhanced accessibility and SEO optimization
- **v1.3**: Added serverless function support and deployment guides
