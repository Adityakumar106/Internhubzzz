# InternHub

A comprehensive platform connecting clients with talented interns guided by experienced team leads to deliver exceptional projects while providing meaningful learning opportunities.

## 🚀 Features

### For Clients
- Submit and track project progress
- Direct communication with team leads
- Real-time progress analytics
- Rate and review final deliverables

### For Interns
- Apply for relevant project modules
- Submit work and receive feedback
- Earn badges and certificates
- Access learning resources and mentorship

### For Team Leads
- Assign and manage project tasks
- Review and approve submissions
- Chat with interns and clients
- Track team progress and analytics

### For Admins
- Complete platform oversight
- User management and approval
- Project monitoring and assignment
- Analytics and reporting

## 🛠️ Tech Stack

- **Frontend**: Next.js 13, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/internhub.git
cd internhub
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Set up Supabase

1. Create a new Supabase project
2. Run the migrations in the `supabase/migrations` folder
3. Update your environment variables

### 5. Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
internhub/
├── app/                    # Next.js 13 app directory
│   ├── admin/             # Admin portal pages
│   ├── about/             # About page
│   ├── blog/              # Blog pages
│   ├── contact/           # Contact page
│   ├── how-it-works/      # How it works page
│   ├── login/             # Login page
│   ├── register/          # Registration page
│   └── page.tsx           # Home page
├── components/            # Reusable React components
│   ├── ui/               # shadcn/ui components
│   ├── Hero.tsx          # Hero section
│   ├── Features.tsx      # Features section
│   ├── Navigation.tsx    # Navigation component
│   └── Footer.tsx        # Footer component
├── lib/                  # Utility libraries
│   ├── api/             # API layer
│   ├── auth.ts          # Authentication service
│   ├── supabase.ts      # Supabase client
│   └── utils.ts         # Utility functions
├── supabase/            # Supabase configuration
│   └── migrations/      # Database migrations
└── public/              # Static assets
```

## 🗄️ Database Schema

The application uses the following main tables:

- **profiles**: User information and roles
- **projects**: Client projects
- **tasks**: Individual project tasks
- **applications**: Intern applications for tasks
- **submissions**: Work submissions from interns
- **reviews**: Feedback and ratings
- **notifications**: System notifications
- **messages**: Chat functionality

## 🔐 Authentication & Authorization

The app uses Supabase Auth with role-based access control:

- **Client**: Can create projects and communicate with team leads
- **Intern**: Can apply for tasks and submit work
- **Team Lead**: Can manage projects and review submissions
- **Admin**: Full platform access and management

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Deploy to Netlify

1. Build the project: `npm run build`
2. Deploy the `out` folder to Netlify
3. Add environment variables in Netlify dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you have any questions or need help, please:

1. Check the [documentation](docs/)
2. Open an [issue](https://github.com/yourusername/internhub/issues)
3. Contact us at hello@internhub.com

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Supabase](https://supabase.com/) for the backend infrastructure
- [Tailwind CSS](https://tailwindcss.com/) for the styling system
- [shadcn/ui](https://ui.shadcn.com/) for the component library
- [Lucide](https://lucide.dev/) for the beautiful icons

---

Made with ❤️ by the InternHub team