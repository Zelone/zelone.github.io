# HTML Template Usage Guide

This guide explains how to use the `template.html` file to create new project documentation pages for your portfolio website.

## 🎯 Template Purpose

The `template.html` file is designed for creating professional project documentation pages that maintain consistency with your portfolio's design and functionality.

## 📋 How to Use

### Step 1: Copy the Template
```bash
cp template.html your-project-name.html
```

### Step 2: Replace All Placeholders

The template contains placeholders in square brackets `[PLACEHOLDER]` that you need to replace with actual content:

#### Meta Information
- `[PAGE_TITLE]` → "My Awesome Project"
- `[PAGE_DESCRIPTION]` → "A brief description for SEO"
- `[PAGE_KEYWORDS]` → "javascript, web development, api"
- `[CURRENT_PAGE]` → "Project Name"

#### Project Header
- `[PROJECT_TITLE]` → "My Awesome Project"
- `[PROJECT_SUBTITLE]` → "A modern web application for managing tasks"
- `[GITHUB_URL]` → "https://github.com/zelone/project-name"
- `[LIVE_DEMO_URL]` → "https://zelone.github.io/project-name"

#### Project Metadata
- `[TECHNOLOGY_STACK]` → "React, Node.js, MongoDB"
- `[PROJECT_STATUS]` → "Active Development" / "Completed" / "Maintenance"
- `[LICENSE_TYPE]` → "MIT License"
- `[VERSION]` → "v1.2.0"

#### Content Sections
- `[PROJECT_OVERVIEW_TEXT]` → Detailed project description
- `[FEATURE_1]`, `[FEATURE_2]`, etc. → List of features
- `[UPCOMING_FEATURE]` → Features in development
- `[REPOSITORY_URL]` → Full git clone URL
- `[PROJECT_DIRECTORY]` → Folder name after cloning
- `[INSTALL_COMMAND]` → "npm install" / "pip install -r requirements.txt"
- `[USAGE_INSTRUCTIONS]` → How to use the project
- `[USAGE_EXAMPLE_CODE]` → Code examples
- `[ARCHITECTURE_DESCRIPTION]` → Technical architecture explanation
- `[FRONTEND_TECH_1]`, `[BACKEND_TECH_1]` → Technology lists

#### Sidebar Links
- `[DOCUMENTATION_URL]` → Link to docs
- `[ISSUES_URL]` → GitHub issues URL
- `[STAR_COUNT]`, `[FORK_COUNT]` → GitHub statistics
- `[RELATED_PROJECT_1]`, `[RELATED_PROJECT_2]` → Related projects

## 🔧 Example Replacement

### Before:
```html
<title>[PAGE_TITLE] - Jitesh Jhawar | Zelone Portfolio</title>
<meta name="description" content="[PAGE_DESCRIPTION]">
```

### After:
```html
<title>Task Manager Pro - Jitesh Jhawar | Zelone Portfolio</title>
<meta name="description" content="A modern task management application built with React and Node.js">
```

## 📁 Template Structure

### Main Sections:
1. **Hero Section** - Project title, subtitle, and action buttons
2. **Project Meta** - Technology, status, license, version info
3. **Overview** - Detailed project description
4. **Features** - List of current and upcoming features
5. **Getting Started** - Installation and usage instructions
6. **Screenshots** - Visual demonstrations
7. **Technical Details** - Architecture and technology breakdown
8. **Contributing** - How others can contribute

### Sidebar Sections:
1. **Quick Links** - GitHub, demo, docs, issues
2. **Project Stats** - Stars, forks, etc.
3. **Related Projects** - Links to similar projects

## 🎨 Customization Options

### Custom Styles
Add page-specific styles in the `<style>` section:

```css
.custom-feature {
    background: var(--gradient);
    padding: 1rem;
    border-radius: var(--border-radius);
}
```

### Custom JavaScript
Add page-specific functionality:

```javascript
// Add any page-specific JavaScript here
document.addEventListener('DOMContentLoaded', function() {
    // Your custom code
});
```

## 📸 Adding Screenshots

Replace the demo section placeholder with actual images:

```html
<!-- Replace the placeholder section with: -->
<img src="images/screenshot1.png" class="img-fluid rounded mb-3" alt="Main interface">
<img src="images/demo.gif" class="img-fluid rounded mb-3" alt="Feature demonstration">
```

## 🔗 Navigation Integration

The template automatically integrates with your existing navigation system. The dropdown menu will be populated by the `script.js` file.

## ✅ Pre-built Features

The template includes:
- ✅ Responsive design
- ✅ SEO optimization
- ✅ Accessibility features
- ✅ Breadcrumb navigation
- ✅ Social sharing ready
- ✅ Print-friendly layout
- ✅ Modern card-based design
- ✅ Professional typography

## 📋 Quick Checklist

When creating a new project page:

- [ ] Copy template.html to new filename
- [ ] Replace all `[PLACEHOLDER]` text
- [ ] Add actual screenshots/images
- [ ] Test all links work correctly
- [ ] Verify responsive design
- [ ] Check SEO meta tags
- [ ] Validate HTML markup
- [ ] Test accessibility features

## 🚀 Example Projects

Here are some example project types this template works well for:

### Web Applications
- Dashboard applications
- E-commerce sites
- Social media platforms
- Content management systems

### Tools & Utilities
- CLI tools
- Browser extensions
- Development utilities
- API clients

### Libraries & Frameworks
- JavaScript libraries
- CSS frameworks
- Component libraries
- Development tools

## 💡 Tips for Success

1. **Keep it concise** - Focus on key features and benefits
2. **Use visuals** - Screenshots and GIFs make projects more engaging
3. **Include live demos** - Let people interact with your work
4. **Write clear instructions** - Make it easy for others to use your project
5. **Keep it updated** - Maintain current information and working links

## 🔮 Advanced Features

### Dynamic Content
You can enhance the template with dynamic features:

```javascript
// Fetch GitHub stats dynamically
fetch('https://api.github.com/repos/zelone/project-name')
  .then(response => response.json())
  .then(data => {
    document.getElementById('star-count').textContent = data.stargazers_count;
    document.getElementById('fork-count').textContent = data.forks_count;
  });
```

### Interactive Demos
Embed live demos or code playgrounds:

```html
<iframe src="https://codepen.io/zelone/embed/xyz" 
        width="100%" height="400" frameborder="0">
</iframe>
```

---

## 📞 Need Help?

If you need assistance with the template:

1. Check the existing project pages for examples
2. Review the main `styles.css` for available CSS classes
3. Look at `script.js` for JavaScript functionality
4. Create an issue on the main repository

Happy documenting! 🎉
