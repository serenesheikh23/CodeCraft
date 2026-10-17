# Code Craft - Modern Digital Agency Website

A modern, dark-themed personal agency website built with Next.js 14, TypeScript, Tailwind CSS, and Prisma.

## Features

- **Modern Dark Theme**: Custom color scheme with glassmorphism effects
- **Smooth Animations**: Framer Motion powered animations and transitions
- **Admin Panel**: Full CMS with authentication (NextAuth.js)
- **Database**: SQLite with Prisma ORM
- **Contact Form**: Email integration with Resend
- **Responsive Design**: Mobile-first approach
- **TypeScript**: Full type safety

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite + Prisma ORM
- **Authentication**: NextAuth.js (Credentials Provider)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Email**: Resend
- **Validation**: Zod (via NextAuth)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Set up database
npm run db:push
npm run db:seed

# Start development server
npm run dev
```

### Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key"
RESEND_API_KEY="your-resend-api-key"
NEXTAUTH_URL="http://localhost:3000"
```

## Project Structure

```
src/
├── app/
│   ├── api/           # API routes
│   │   ├── auth/      # NextAuth endpoints
│   │   ├── contact/   # Contact form
│   │   ├── services/  # Services CRUD
│   │   └── addons/    # Add-ons CRUD
│   ├── admin/         # Admin panel pages
│   │   ├── dashboard/ # Dashboard with CRUD
│   │   └── login/     # Login page
│   ├── globals.css    # Global styles
│   ├── layout.tsx     # Root layout
│   └── page.tsx       # Home page
├── components/        # React components
├── lib/               # Utility functions
│   ├── auth.ts        # NextAuth config
│   ├── prisma.ts      # Prisma client
│   └── utils.ts       # Helper functions
├── middleware.ts      # Auth middleware
└── prisma/
    ├── schema.prisma  # Database schema
    └── seed.ts        # Seed script
```

## Admin Panel

Access the admin panel at `/admin/login`

**Default credentials:**
- Email: `admin@codecraft.com`
- Password: `XYZ123abc333!!!`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push schema to database
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Docker

```bash
docker build -t code-craft .
docker run -p 3000:3000 code-craft
```

## License

MIT