# Science Club Information System

A responsive, cross-platform website for the Gov. Felicisimo T. San Luis Integrated Senior High School Science Club.

## 🎯 Project Overview

This is a modern, fully responsive information system designed for a school science club. The website adapts seamlessly to any screen size, from desktop computers to mobile devices, making it accessible through web browsers and mobile device developer tools (webview).

### School Information
- **School Name**: Gov. Felicisimo T. San Luis Integrated Senior High School
- **Department**: Science Department
- **Purpose**: Science Club Information System

## ✨ Features

### 4 Main Pages

1. **Homepage (index.html)**
   - Hero section with school branding
   - Science club overview and mission
   - Featured activities and benefits
   - Latest news preview
   - Call-to-action for membership

2. **News & Updates (news.html)**
   - Dynamic news feed with filtering
   - Search functionality
   - Featured articles
   - Event announcements
   - Newsletter subscription

3. **Join Us / Application (application.html)**
   - Comprehensive membership application form
   - Multi-step form with validation
   - Student information collection
   - Parent/guardian consent
   - FAQ section

4. **About Us (about.html)**
   - Club mission and vision
   - Core values
   - Club officers and advisers
   - Achievements timeline
   - Contact information

## 🎨 Design Features

### Cross-Platform Responsive Design
- **Desktop**: Full-featured layout with side-by-side content
- **Tablet**: Optimized grid layouts that adapt to medium screens
- **Mobile**: Stack layouts with touch-friendly navigation
- **Developer Tools Ready**: Looks great in browser DevTools mobile view

### Modern UI/UX
- Clean, professional design
- Smooth animations and transitions
- Interactive elements
- Accessible color scheme
- Custom SVG icons and illustrations
- Gradient accents

### Key Technologies
- **HTML5**: Semantic markup
- **CSS3**: Modern layouts with Flexbox and Grid
- **JavaScript**: Interactive functionality
- **Responsive Design**: Mobile-first approach
- **No Dependencies**: Pure vanilla code, no frameworks required

## 📱 Responsive Breakpoints

```css
- Desktop: 1024px and above
- Tablet: 768px - 1023px
- Mobile: 320px - 767px
```

## 🚀 Getting Started

### Installation

1. Download or clone the project files
2. No build process required - just open in a browser!

### Running the Website

#### Method 1: Direct File Opening
```
Simply open index.html in your web browser
```

#### Method 2: Local Server (Recommended)
Using Python:
```bash
# Python 3
cd science-club-website
python -m http.server 8000
```

Then open: `http://localhost:8000`

Using Node.js (with http-server):
```bash
npx http-server science-club-website -p 8000
```

#### Method 3: VS Code Live Server
1. Install "Live Server" extension in VS Code
2. Right-click on index.html
3. Select "Open with Live Server"

### Testing Mobile View

**In Chrome DevTools:**
1. Press F12 or right-click → Inspect
2. Click the device toolbar icon (Ctrl+Shift+M)
3. Select a device or set custom dimensions
4. Test all responsive breakpoints

**In Firefox:**
1. Press F12 → Responsive Design Mode (Ctrl+Shift+M)
2. Choose device or custom size
3. Test touch interactions

## 📂 Project Structure

```
science-club-website/
├── index.html              # Homepage
├── news.html               # News & Updates page
├── application.html        # Membership application
├── about.html              # About the club
├── css/
│   └── styles.css         # Main stylesheet (responsive)
├── js/
│   └── main.js            # JavaScript functionality
├── images/                 # Image assets folder
├── assets/                 # Additional assets
└── README.md              # This file
```

## 🎨 Customization Guide

### Colors
Edit CSS variables in `css/styles.css`:

```css
:root {
    --primary-color: #4F46E5;    /* Main brand color */
    --secondary-color: #06B6D4;  /* Accent color */
    --accent-color: #8B5CF6;     /* Highlight color */
}
```

### Content
- Update school name in all HTML files
- Modify club information in about.html
- Add real news articles in news.html
- Customize form fields in application.html

### Images
- Place images in the `images/` folder
- Update image paths in HTML files
- Recommended sizes:
  - Hero images: 1200x600px
  - News thumbnails: 600x400px
  - Profile photos: 400x400px

## 🔧 Features & Functionality

### Interactive Elements

1. **Mobile Navigation**
   - Hamburger menu on mobile devices
   - Smooth slide-in animation
   - Click outside to close

2. **News Filtering**
   - Filter by category (Events, Achievements, Workshops, etc.)
   - Live search functionality
   - Animated transitions

3. **Form Validation**
   - Real-time field validation
   - Email format checking
   - Phone number validation
   - Required field indicators
   - Character count for text areas

4. **FAQ Accordion**
   - Expandable/collapsible sections
   - Smooth animations
   - Only one open at a time

5. **Scroll Animations**
   - Fade-in effects on scroll
   - Staggered animations
   - Smooth scroll to anchors

6. **Back to Top Button**
   - Appears after scrolling down
   - Smooth scroll to top
   - Fixed position

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📊 Performance

- **Lightweight**: No external libraries
- **Fast Loading**: Optimized CSS and JavaScript
- **SEO Friendly**: Semantic HTML structure
- **Accessible**: ARIA labels and keyboard navigation

## 🔒 Form Data Handling

**Current Implementation:**
- Forms log data to browser console
- Success messages displayed to user
- No actual server submission

**To Connect to Backend:**

```javascript
// In js/main.js, modify form handlers:

function sendToServer(data) {
    fetch('/api/submit-application', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);
        // Show success message
    })
    .catch(error => {
        console.error('Error:', error);
        // Show error message
    });
}
```

## 🎓 Educational Use

This project demonstrates:
- Modern HTML5 semantic structure
- CSS Grid and Flexbox layouts
- Responsive design techniques
- Form validation and handling
- DOM manipulation with vanilla JavaScript
- Event handling and delegation
- CSS animations and transitions
- Mobile-first development

## 📝 License

This project is created for educational purposes for Gov. Felicisimo T. San Luis Integrated Senior High School.

## 🤝 Contributing

To improve this website:

1. Test on multiple devices
2. Report bugs or issues
3. Suggest new features
4. Improve accessibility
5. Optimize performance

## 📧 Contact

For questions or support regarding this website:
- Email: scienceclub@gftslis.edu.ph
- School Website: [School website URL]

## 🔮 Future Enhancements

Potential additions:
- [ ] Admin dashboard for content management
- [ ] Member login portal
- [ ] Photo gallery with lightbox
- [ ] Event calendar integration
- [ ] Online payment for membership fees
- [ ] Real-time notifications
- [ ] Social media feed integration
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] PWA (Progressive Web App) capabilities

## 🙏 Acknowledgments

- Font: Inter & Space Grotesk (Google Fonts)
- Icons: Custom SVG illustrations
- Design inspiration: Modern education platforms

---

**Version**: 1.0.0  
**Last Updated**: November 25, 2026  
**Developed for**: Gov. Felicisimo T. San Luis Integrated Senior High School Science Club
