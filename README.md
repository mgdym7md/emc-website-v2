# EMC Website v2

Premium Egyptian Stone website built with Next.js 14, featuring a 3D Kitchen Visualizer and Strapi CMS.

## Features

- **Modern Next.js 14** - App Router, Server Components, TypeScript
- **3D Kitchen Visualizer** - Interactive customizer with React Three Fiber
- **Strapi CMS** - Headless CMS for content management
- **Internationalization** - English and Arabic support with RTL
- **Theme Toggle** - Dark and light mode
- **Responsive Design** - Tailwind CSS with mobile-first approach

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 3. Set Up Strapi CMS (Optional)

See [strapi/README.md](./strapi/README.md) for detailed setup instructions.

```bash
cd strapi
npx create-strapi-app@latest . --quickstart
```

## Project Structure

```
emc-website-v2/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx            # Homepage
│   │   ├── layout.tsx          # Root layout
│   │   ├── globals.css         # Global styles
│   │   └── customizer/         # 3D Visualizer page
│   ├── components/
│   │   ├── layout/             # Navbar, Footer
│   │   ├── sections/           # Hero, About, Products, Services, Contact
│   │   ├── providers/          # Theme, Language providers
│   │   └── customizer/         # 3D kitchen components
│   └── lib/
│       └── strapi.ts           # CMS API helpers
├── strapi/                     # Strapi CMS configuration
├── public/                     # Static assets
└── package.json
```

## 3D Kitchen Visualizer

The visualizer allows customers to:
- View a realistic 3D kitchen scene
- Click on surfaces (countertop, island, backsplash, floor)
- Apply different marble/granite materials
- Switch between camera views
- Take screenshots of their design
- Share their configuration

### Surfaces

| Surface | Description |
|---------|-------------|
| Countertop | Main kitchen counter along back wall |
| Island | Central kitchen island with waterfall edge |
| Backsplash | Wall behind the countertop |
| Floor | Kitchen flooring |

## CMS Content Types

### Products
- Name, type (marble/granite/other), description, image, specifications

### Services
- Title, description, icon, order

### About (Single Type)
- Title, subtitle, description, stats, images

### Contact (Single Type)
- Location, phone, email, social links

## Environment Variables

```env
# .env.local
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your-api-token
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run strapi:dev` | Start Strapi development |

## Technologies

- **Framework**: Next.js 14 (App Router)
- **3D Graphics**: Three.js, React Three Fiber, Drei
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **CMS**: Strapi (headless)
- **Language**: TypeScript

## License

Private - EMC Engineering Marble Contractors
