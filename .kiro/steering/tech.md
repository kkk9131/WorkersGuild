# Workers Guild - Technology Stack

## Frontend Framework
- **React Native**: Expo SDK 53.x for cross-platform mobile development
- **TypeScript**: Strict type checking enabled for code safety
- **Expo Router**: File-based routing system for navigation

## UI & Styling
- **NativeWind**: Tailwind CSS for React Native styling
- **Custom Design System**: Dual theme support (Game theme + Business theme)
- **Color System**: Comprehensive color palette including rarity colors, status colors, and theme-specific colors

## State Management
- **Zustand**: Lightweight state management with persistence
- **React Query (@tanstack/react-query)**: Server state management and caching
- **AsyncStorage**: Local data persistence

## Backend & Database
- **Supabase**: PostgreSQL database with real-time subscriptions
- **Row Level Security (RLS)**: Database-level security policies
- **Supabase Auth**: User authentication and session management
- **Expo SecureStore**: Secure storage for sensitive data

## Development Tools
- **ESLint + Prettier**: Code quality and formatting
- **TypeScript**: Strict configuration with path mapping
- **Metro**: React Native bundler

## Common Commands

### Development
```bash
# Start development server
npm start

# Platform-specific development
npm run android
npm run ios
npm run web

# Type checking
npm run type-check

# Code quality
npm run lint
npm run lint:fix
npm run format
npm run format:check
```

### Path Aliases
The project uses TypeScript path mapping for clean imports:
- `@/*` - Root directory
- `@/components/*` - Components directory
- `@/hooks/*` - Custom hooks
- `@/lib/*` - Libraries and utilities
- `@/stores/*` - Zustand stores
- `@/types/*` - Type definitions
- `@/assets/*` - Static assets

## Key Dependencies
- **@supabase/supabase-js**: Backend integration
- **zustand**: State management
- **@tanstack/react-query**: Server state
- **expo-router**: Navigation
- **react-native-reanimated**: Animations
- **expo-local-authentication**: Biometric auth
- **expo-secure-store**: Secure storage