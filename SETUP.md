# Portfolio Website Setup Guide

## EmailJS Configuration for Contact Form

To enable the contact form functionality, you need to set up EmailJS. Follow these steps:

### 1. Create EmailJS Account
1. Go to [EmailJS](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Create Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down your **Service ID**

### 3. Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template structure:

```
Subject: New Contact Form Message: {{subject}}

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
Reply to: {{reply_to}}
```

4. Save the template and note down your **Template ID**

### 4. Get Your Public Key
1. Go to "Account" > "General"
2. Find your **Public Key**

### 5. Update Configuration
1. Open `emailjs-config.js`
2. Replace the placeholder values:

```javascript
const EMAILJS_CONFIG = {
    PUBLIC_KEY: "your_actual_public_key_here",
    SERVICE_ID: "your_actual_service_id_here", 
    TEMPLATE_ID: "your_actual_template_id_here"
};
```

### 6. Test the Contact Form
1. Open your website
2. Fill out the contact form
3. Submit the form
4. Check your email inbox for the message

## Alternative Setup (Without EmailJS)

If you prefer not to use EmailJS, you can:

1. **Use a backend service** like Netlify Forms, Formspree, or create your own server
2. **Use mailto links** - the form will open the user's default email client
3. **Display contact information only** - remove the form and show email/phone directly

## File Structure

```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # Main JavaScript
├── emailjs-config.js   # EmailJS configuration
├── SETUP.md           # This setup guide
└── README.md          # Project documentation
```

## Customization

### Colors
The website uses CSS custom properties for easy color customization. Edit these in `styles.css`:

```css
:root {
    --primary-color: #6366f1;      /* Main brand color */
    --secondary-color: #8b5cf6;    /* Secondary brand color */
    --accent-color: #06b6d4;       /* Accent color */
    --bg-primary: #0a0a0a;         /* Main background */
    --bg-secondary: #111111;       /* Section backgrounds */
}
```

### Content
- Update personal information in `index.html`
- Replace placeholder project images with actual screenshots
- Modify project descriptions and links
- Update social media links

### Adding Real Profile Image
Replace the profile placeholder in the hero section:

1. Add your profile image to the project folder
2. Update the `.profile-placeholder` in `styles.css`:

```css
.profile-placeholder {
    background-image: url('your-profile-image.jpg');
    background-size: cover;
    background-position: center;
}
```

## Deployment

### GitHub Pages
1. Push your code to a GitHub repository
2. Go to repository Settings > Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://username.github.io/repository-name`

### Netlify
1. Connect your GitHub repository to Netlify
2. Deploy automatically on every push
3. Custom domain support available

### Vercel
1. Import your GitHub repository
2. Deploy with zero configuration
3. Automatic deployments on git push

## Browser Support

The website supports all modern browsers:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Performance Tips

1. **Optimize images**: Use WebP format for better compression
2. **Minify CSS/JS**: Use build tools for production
3. **Enable caching**: Configure proper cache headers
4. **Use CDN**: For faster global loading

## Troubleshooting

### Contact Form Not Working
1. Check browser console for errors
2. Verify EmailJS credentials are correct
3. Ensure EmailJS service is active
4. Check email template configuration

### Styling Issues
1. Clear browser cache
2. Check for CSS syntax errors
3. Verify all CSS files are loading
4. Test in different browsers

### Mobile Responsiveness
1. Test on actual devices
2. Use browser dev tools mobile view
3. Check viewport meta tag is present
4. Verify touch interactions work

## Support

If you need help with setup or customization:
1. Check the browser console for errors
2. Verify all configuration steps were followed
3. Test individual components separately
4. Contact for technical support if needed

## License

This portfolio template is free to use and modify for personal and commercial projects.