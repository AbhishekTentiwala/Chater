# Discord Clone - Next.js 15

A real-time chat application inspired by Discord, built with Next.js 15, React 19, and modern web technologies.

## Tech Stack

- **Framework**: Next.js 15 (App Router) with Turbopack
- **Language**: TypeScript 5
- **Authentication**: Clerk
- **Database**: PostgreSQL + Prisma ORM
- **Real-time**: Socket.io (client + server)
- **Voice/Video**: LiveKit
- **File Upload**: UploadThing
- **UI**: Radix UI primitives + Tailwind CSS 4 + class-variance-authority
- **State Management**: Zustand + TanStack Query
- **Forms**: React Hook Form + Zod validation

## Prerequisites

Before you begin, ensure you have accounts for:

1. **PostgreSQL Database** - [Neon](https://neon.tech), [Supabase](https://supabase.com), or local PostgreSQL
2. **Clerk** - Authentication provider - [clerk.com](https://clerk.com)
3. **UploadThing** - File uploads - [uploadthing.com](https://uploadthing.com)
4. **LiveKit** - Voice/Video calls - [livekit.io](https://livekit.io) (or self-hosted)
5. **Node.js** 18+ and npm/yarn/pnpm

## Quick Start

### 1. Clone & Install

```bash
git clone <repository-url>
cd Chater
npm install
```

### 2. Environment Setup

Copy the example environment file and fill in your values:

```bash
cp .env.example .env
```

### 3. Configure Environment Variables

| Variable | Description | Where to Get |
|----------|-------------|--------------|
| `DATABASE_URL` | PostgreSQL connection string | Neon/Supabase dashboard → Connection Pooling URL |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk public key | Clerk Dashboard → API Keys |
| `CLERK_SECRET_KEY` | Clerk secret key | Clerk Dashboard → API Keys |
| `UPLOADTHING_TOKEN` | UploadThing API token | UploadThing Dashboard → API Keys |
| `NEXT_PUBLIC_LIVEKIT_URL` | LiveKit WebSocket URL | LiveKit Cloud → Project → URL |
| `LIVEKIT_API_KEY` | LiveKit API key | LiveKit Cloud → Project → API Keys |
| `LIVEKIT_API_SECRET` | LiveKit API secret | LiveKit Cloud → Project → API Keys |
| `NEXT_PUBLIC_SITE_URL` | Your deployed site URL | `http://localhost:3000` for dev |

**Example `.env`:**
```env
DATABASE_URL="postgresql://user:password@ep-xxx.us-east-1.aws.neon.tech/dbname?sslmode=require"

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_xxxxx"
CLERK_SECRET_KEY="sk_test_xxxxx"

UPLOADTHING_TOKEN="sk_live_xxxxx"

NEXT_PUBLIC_LIVEKIT_URL="wss://your-project.livekit.cloud"
LIVEKIT_API_KEY="APIxxxxxx"
LIVEKIT_API_SECRET="xxxxxxxxxxxxxxxx"

NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### 4. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database (development)
npx prisma db push

# Or run migrations (production)
npx prisma migrate deploy

# Optional: Open Prisma Studio to view data
npx prisma studio
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Service Configuration Details

### Clerk Setup
1. Create a Clerk application at [clerk.com](https://clerk.com)
2. Enable **Email/Password** and **Social providers** (Google, GitHub, etc.)
3. Configure **Redirect URLs**:
   - Sign in: `/sign-in`
   - Sign up: `/sign-up`
   - After sign in/up: `/` (home)
4. Copy keys to `.env`

### UploadThing Setup
1. Create an app at [uploadthing.com](https://uploadthing.com)
2. Configure file types (images, videos, documents)
3. Set max file size (default: 4MB for free tier)
4. Copy token to `.env`

### LiveKit Setup (Voice/Video)
1. Create a project at [LiveKit Cloud](https://cloud.livekit.io) or self-host
2. Enable **Room Creation** API
3. Configure **TURN/STUN** servers for NAT traversal
4. Copy credentials to `.env`

**Note**: Voice/Video calls require LiveKit. Text chat works without it.

### PostgreSQL Database
**Recommended**: [Neon](https://neon.tech) (serverless, free tier)
- Create project → Copy connection string
- Enable **Connection Pooling** for serverless environments
- Use pooled connection string for `DATABASE_URL`

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npx prisma generate` | Generate Prisma Client |
| `npx prisma db push` | Push schema changes (dev) |
| `npx prisma migrate dev` | Create & run migration (dev) |
| `npx prisma migrate deploy` | Run migrations (prod) |
| `npx prisma studio` | Open database GUI |

## Project Structure

```
Chater/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth routes (sign-in, sign-up)
│   ├── (main)/                   # Main app (servers, channels, DMs)
│   ├── (setup)/                  # Initial profile setup
│   ├── (invite)/                 # Server invite handling
│   ├── api/                      # API routes
│   │   ├── channels/             # Channel CRUD
│   │   ├── direct-messages/      # DM endpoints
│   │   ├── livekit/              # LiveKit token generation
│   │   ├── members/              # Server member management
│   │   ├── messages/             # Channel messages
│   │   ├── servers/              # Server CRUD
│   │   └── uploadthing/          # File upload endpoints
│   └── layout.tsx                # Root layout with providers
├── components/
│   ├── chat/                     # Chat components (messages, input, header)
│   ├── modals/                   # Dialog modals (create/edit/delete)
│   ├── navigation/               # Sidebar navigation
│   ├── provider/                 # Context providers (modal, socket, query, theme)
│   ├── sever/                    # Server/channel/member components
│   └── ui/                       # Reusable UI primitives (Radix-based)
├── hooks/                        # Custom React hooks
├── lib/                          # Utilities & server-side helpers
├── prisma/
│   └── schema.prisma             # Database schema
├── public/                       # Static assets
└── types.ts                      # Global TypeScript types
```

## Database Schema Overview

```
Profile (User) 1:N Server (owned)
Profile 1:N Member (server membership)
Server 1:N Channel (text/audio/video)
Server 1:N Member
Channel 1:N Message
Member 1:N Message
Member 1:N DirectMessage
Conversation (2 Members) 1:N DirectMessage
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub/GitLab/Bitbucket
2. Import project in [Vercel Dashboard](https://vercel.com/dashboard)
3. Add all environment variables from `.env`
4. **Important**: Set `NEXT_PUBLIC_SITE_URL` to your Vercel deployment URL
5. Deploy

**Build Command**: `npm run build` (auto-detected)
**Output Directory**: `.next` (auto-detected)

### Docker

```dockerfile
# Dockerfile
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=base /app/public ./public
COPY --from=base /app/.next/standalone ./
COPY --from=base /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
```

```bash
# Build
docker build -t discord-clone .

# Run
docker run -p 3000:3000 --env-file .env discord-clone
```

**Note**: Add `output: 'standalone'` to `next.config.ts` for Docker.

## Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URL` uses pooled connection string for serverless
- Check SSL mode: `?sslmode=require` for Neon/Supabase
- Run `npx prisma db push` to verify connection

### Clerk Authentication Errors
- Ensure redirect URLs match your deployment domain
- Check that `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` are from same app
- Verify middleware.ts protects correct routes

### File Upload Fails
- Confirm `UPLOADTHING_TOKEN` is valid
- Check UploadThing dashboard for upload limits
- Verify file type/size restrictions in UploadThing config

### LiveKit Voice/Video Not Working
- Ensure `NEXT_PUBLIC_LIVEKIT_URL` uses `wss://` protocol
- Verify API key/secret have room creation permissions
- Check browser console for WebRTC/ICE errors
- TURN server required for production NAT traversal

### Socket.io Real-time Issues
- In production, Socket.io may need separate server or Vercel WebSocket support
- Check `pages/api/socket/` for server implementation
- For scaling, consider Redis adapter

### Build Failures
```bash
# Clear cache and reinstall
rm -rf node_modules .next package-lock.json
npm install
npm run build
```

### Prisma Issues
```bash
# Reset database (development only)
npx prisma migrate reset

# Regenerate client after schema changes
npx prisma generate
```

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues and feature requests, please open a GitHub issue.