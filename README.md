# Tim Watts Art - Links Page

A Next.js landing page for Tim Watts' social media links, hosted at www.timwatts.art/links and deployed on Vercel.

## Features

- Modern, responsive design with Tailwind CSS
- Dark theme with gradient background
- Social media links with icons
- Optimized for deployment on Vercel
- TypeScript support
- ESLint configuration

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

4. Open [http://localhost:3000/links](http://localhost:3000/links) in your browser.

### Building for Production

```bash
npm run build
```

The build outputs static files that can be deployed to any static hosting service.

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
