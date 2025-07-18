# Workers Guild - Project Structure

## Architecture Overview
The project follows a feature-based architecture with clear separation of concerns using Expo Router for file-based routing.

## Directory Structure

### `/app` - Expo Router Pages
- **File-based routing**: Each file becomes a route
- **Layout files**: `_layout.tsx` files define nested layouts
- **Route groups**: Parentheses `()` create route groups without affecting URL
- **Auth routes**: `/app/auth/` for authentication screens
- **Tab routes**: `/app/tabs/` for main application tabs

### `/components` - Reusable Components
- **`/common`**: Shared components across the app (ThemedButton, ThemedText, etc.)
- **`/ui`**: Basic UI building blocks (Button, Card, Input, etc.)
- **`/game`**: Gamification-specific components
- **Index files**: Each folder exports components via `index.ts`

### `/stores` - Zustand State Management
- **Feature-based stores**: Separate stores for auth, tasks, game state
- **Persistence**: Uses AsyncStorage for state persistence
- **Store composition**: Individual stores can be composed together

### `/lib` - Libraries and Utilities
- **`supabase.ts`**: Database client configuration
- **`profileUtils.ts`**: User profile management utilities
- **Feature-specific utilities**: Organized by functionality

### `/hooks` - Custom React Hooks
- **`useAuth.ts`**: Authentication state and actions
- **`useTheme.ts`**: Theme management
- **Feature-specific hooks**: Encapsulate complex logic

### `/types` - TypeScript Definitions
- **`database.ts`**: Supabase database types
- **`index.ts`**: Shared type exports
- **Feature-specific types**: Organized by domain

## Naming Conventions

### Files and Folders
- **Components**: PascalCase (`TaskCard.tsx`)
- **Hooks**: camelCase with "use" prefix (`useAuth.ts`)
- **Stores**: camelCase with "Store" suffix (`authStore.ts`)
- **Utilities**: camelCase (`profileUtils.ts`)
- **Types**: camelCase (`database.ts`)

### Code Conventions
- **Components**: PascalCase (`TaskCard`)
- **Functions**: camelCase (`fetchProfile`)
- **Constants**: SCREAMING_SNAKE_CASE (`MAX_LEVEL`)
- **Types/Interfaces**: PascalCase (`UserProfile`)

## Import Patterns

### Path Aliases
Use TypeScript path mapping for clean imports:
```typescript
import { Button } from '@/components/ui'
import { useAuth } from '@/hooks'
import { supabase } from '@/lib/supabase'
import type { UserProfile } from '@/types'
```

### Component Exports
Components should be exported via index files:
```typescript
// components/ui/index.ts
export { Button } from './Button'
export { Card } from './Card'
export { Input } from './Input'
```

## State Management Patterns

### Store Structure
Each store follows a consistent pattern:
```typescript
interface State {
  // Data properties
}

interface Actions {
  // Action methods
}

export const useStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      // Implementation
    }),
    {
      name: 'store-name',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
```

### Component Integration
Components should use stores through custom hooks when possible:
```typescript
const { user, signIn, signOut } = useAuthStore()
```

## File Organization Principles

1. **Feature-based grouping**: Related functionality stays together
2. **Consistent naming**: Follow established conventions
3. **Clear exports**: Use index files for clean imports
4. **Type safety**: Leverage TypeScript for better DX
5. **Separation of concerns**: Keep business logic in stores/hooks