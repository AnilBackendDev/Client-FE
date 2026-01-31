# Company-FE

**QuickOnboardAI Company Frontend Application**

A comprehensive enterprise web application for company administrators, HR teams, talent acquisition professionals, and leadership to manage hiring, employee onboarding, and strategic initiatives.

---

## 🚀 Features

### 👤 User Roles

#### 1. **Admin Portal**
- Company onboarding and management
- User account creation and management
- Leadership dashboard access
- System configuration

#### 2. **Talent Acquisition (TA)**
- Job posting and management
- Candidate pipeline tracking
- Interview scheduling
- Applicant tracking system (ATS)
- Analytics and reporting

#### 3. **HR Management**
- Employee directory
- New hire onboarding workflows
- Compliance tracking
- Performance management
- Event management

#### 4. **CEO Dashboard**
- Company KPIs and metrics
- Department performance overview
- Strategic initiative tracking
- Executive alerts and notifications

#### 5. **CTO Dashboard**
- Technical KPIs
- Engineering team metrics
- Technical initiative tracking
- System health monitoring

#### 6. **Recruiter Management**
- Recruiter onboarding
- Dashboard and analytics

---

## 🛠️ Tech Stack

- **Framework**: React 18.3.1
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **UI Components**: shadcn/ui (Radix UI)
- **Routing**: React Router v6
- **State Management**: React Query (TanStack Query)
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **Backend**: Supabase
- **Authentication**: Supabase Auth

---

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn or bun
- Supabase account (for backend)

---

## 🔧 Installation

1. **Navigate to the project**
```bash
cd /Users/credr/Desktop/QuickOnboardAI/Company-FE
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_BASE_URL=your_backend_api_url
```

4. **Run the development server**
```bash
npm run dev
```

The application will start at `http://localhost:5174`

---

## 📁 Project Structure

```
Company-FE/
├── public/               # Static assets
├── src/
│   ├── assets/          # Images, fonts, etc.
│   ├── components/      # Reusable components
│   │   ├── ui/         # shadcn/ui components
│   │   └── common/     # Shared components
│   ├── contexts/        # React contexts
│   ├── hooks/           # Custom React hooks
│   ├── integrations/    # External service integrations
│   │   └── supabase/   # Supabase client
│   ├── lib/             # Utility functions
│   ├── pages/           # Page components
│   │   ├── admin/      # Admin pages
│   │   ├── company/    # Company pages (TA, HR, etc.)
│   │   └── recruiter/  # Recruiter pages
│   ├── types/           # TypeScript type definitions
│   ├── App.tsx          # Main app component with routing
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles
├── .env                 # Environment variables
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── tailwind.config.ts   # TailwindCSS configuration
```

---

## 🎯 Available Routes

### Admin Routes
| Route | Description |
|-------|-------------|
| `/admin/login` | Admin login |
| `/admin` | Admin dashboard |
| `/admin/onboard-company` | Company onboarding |
| `/admin/leadership` | Leadership dashboard |

### Company Routes
| Route | Description |
|-------|-------------|
| `/company/login` | Unified company login |
| `/hrms/login` | HRMS login |
| `/ta/login` | TA login |
| `/ceo/login` | CEO login |
| `/cto/login` | CTO login |
| `/company/dashboard` | Company dashboard |
| `/company/onboard-user` | User onboarding |
| `/company/ta-dashboard` | TA dashboard |
| `/company/hr-dashboard` | HR dashboard |
| `/company/leadership-dashboard` | CEO/CTO dashboard |

### Recruiter Routes
| Route | Description |
|-------|-------------|
| `/recruiter/dashboard` | Recruiter dashboard |
| `/recruiter/onboard` | Recruiter onboarding |

---

## 🔨 Build for Production

```bash
npm run build
```

The production build will be in the `dist/` folder.

---

## 🧪 Linting

```bash
npm run lint
```

---

## 🌐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `VITE_API_BASE_URL` | Backend API base URL | Yes |

---

## 🎨 Design System

### Role-Based Color Schemes

- **TA Dashboard**: Emerald/Teal gradient
  - Primary: `from-emerald-500 to-teal-600`
  - Background: `from-emerald-50 via-teal-50 to-cyan-50`

- **HR Dashboard**: Amber/Orange gradient
  - Primary: `from-amber-500 to-orange-600`
  - Background: `from-amber-50 via-orange-50 to-yellow-50`

- **CEO Dashboard**: Gold/Amber with dark theme
  - Primary: `from-yellow-400 to-amber-500`
  - Background: `from-slate-900 via-indigo-900 to-purple-900`

- **CTO Dashboard**: Blue/Cyan with dark theme
  - Primary: `from-blue-500 to-cyan-500`
  - Background: `from-slate-900 via-blue-900 to-slate-900`

### UI Components
- Glassmorphism effects
- Modern gradients
- Smooth animations
- Tab-based navigation
- Modal dialogs
- Toast notifications

---

## 🔐 Authentication

### Demo Credentials

#### Admin
- **Company ID**: ADMIN001
- **Email**: admin@quickonboardai.com
- **Password**: admin123

#### TA (Talent Acquisition)
- **Company ID**: COMP001
- **Email**: ta@techcorp.com
- **Password**: ta123

#### HR
- **Company ID**: COMP001
- **Email**: hr@techcorp.com
- **Password**: hr123

#### CEO
- **Company ID**: COMP001
- **Email**: ceo@techcorp.com
- **Password**: ceo123

#### CTO
- **Company ID**: COMP001
- **Email**: cto@techcorp.com
- **Password**: cto123

---

## 📝 Key Features by Role

### Admin
- ✅ Onboard new companies
- ✅ Generate company credentials
- ✅ Manage user accounts
- ✅ View company statistics
- ✅ Access leadership dashboards

### TA (Talent Acquisition)
- ✅ Post and manage job openings
- ✅ Track candidate pipeline
- ✅ Schedule interviews
- ✅ View candidate profiles
- ✅ Generate hiring reports

### HR
- ✅ Employee directory management
- ✅ New hire onboarding workflows
- ✅ Compliance tracking
- ✅ Event management
- ✅ Performance monitoring

### CEO
- ✅ Company KPI dashboard
- ✅ Department performance metrics
- ✅ Strategic initiative tracking
- ✅ Financial metrics
- ✅ Executive alerts

### CTO
- ✅ Technical KPI dashboard
- ✅ Engineering team metrics
- ✅ Code quality monitoring
- ✅ System health tracking
- ✅ Technical initiative management

---

## 📱 Responsive Design

The application is fully responsive and works on:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Large screens (1440px+)

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Deploy the dist/ folder
```

---

## 📝 Documentation

- [Role Functionality Guide](../Candidate-Client-FE/ROLE_FUNCTIONALITY_GUIDE.md)
- [Unified Login System](../Candidate-Client-FE/UNIFIED_LOGIN_SYSTEM.md)
- [Authentication Architecture](../Candidate-Client-FE/AUTHENTICATION_ARCHITECTURE.md) (if exists)

---

## 🤝 Contributing

This is a private repository for QuickOnboardAI. For contributions:

1. Create a feature branch
2. Make your changes
3. Submit a pull request
4. Wait for code review

---

## 📄 License

Private and Proprietary - QuickOnboardAI © 2026

---

## 👥 Support

For support, contact the development team or create an issue in the repository.

---

**Version**: 1.0.0  
**Last Updated**: January 31, 2026
# Client-FE
