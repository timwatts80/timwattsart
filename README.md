# Tim Watts Art - Portfolio Website

A contemporary Next.js portfolio website for Tim Watts Art, featuring a professional gallery and social media links page.

## Site Structure

- **Homepage** (`/`) - Contemporary art portfolio with mosaic hero, gallery, and email signup
- **Links Page** (`/links`) - Social media links and contact information
- **Gallery** - Artwork showcase with preorder functionality and SOLD OUT flags

## Features

### Portfolio Homepage
- Contemporary black and white design
- Mosaic artwork hero section
- Gallery with SOLD OUT overlay flags
- Preorder functionality for prints
- Email newsletter signup
- Responsive navigation

### Links Page  
- Modern, responsive design with Tailwind CSS
- Dark theme with gradient background
- Social media links with icons
- Artist signature branding

### Technical Features
- TypeScript support
- Tailwind CSS styling
- Static export for Vercel deployment
- SEO optimized
- Mobile responsive design

## Development

### Prerequisites

- Node.js 20.1.0 or higher
- npm

### Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/timwatts80/timwattsart.git
   cd timwattsart
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) for the portfolio or [http://localhost:3000/links](http://localhost:3000/links) for social links.

### Building for Production

```bash
npm run build
```

The build outputs static files that can be deployed to any static hosting service.

## Adding Your Artwork

To add your own artwork images:

1. Place artwork images in `/public/artwork/` directory
2. Update the `galleryPieces` array in `/src/app/page.tsx` with your image paths and details
3. Update availability and preorder status as needed

Example artwork object:
```javascript
{
  id: 1,
  title: 'Your Artwork Title',
  size: '24" x 36"',
  medium: 'Your Medium',
  price: '$450',
  available: true,
  preorder: true,
  src: '/artwork/your-image.jpg'
}
```

## Deployment

This project is configured for deployment on Vercel with the following settings:

- Base path: `/links`
- Static export enabled
- Image optimization disabled (for static export)

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set the build command to `npm run build`
3. Set the output directory to `out`
4. Deploy!

## Project Structure

```
timwattsart/
├── src/
│   └── app/
│       ├── globals.css      # Global styles with Tailwind
│       ├── layout.tsx       # Root layout component
│       └── page.tsx         # Main links page
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Project dependencies
```

## Social Links

The links page includes:
- Instagram (@timwatts.art)
- Twitter (@timwattsart)
- Portfolio (timwatts.art)
- LinkedIn (linkedin.com/in/timwatts)

## Customization

To update the social links, edit the `socialLinks` array in `src/app/page.tsx`.

## License

© 2024 Tim Watts. All rights reserved.
