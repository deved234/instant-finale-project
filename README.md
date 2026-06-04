# LuxeRetail

A modern luxury e-commerce storefront built with React, featuring product browsing, cart drawer, multi-step checkout, user authentication, and a member profile with order history.

## Live stack

| Layer | Technology |
|--------|------------|
| UI | React 19, Vite 8, Tailwind CSS 4 |
| Routing | React Router 7 |
| State | Zustand (persisted cart, auth, orders, wishlist) |
| Data | [MockAPI](https://mockapi.io) — products & users |
| Forms | Formik + Yup |

## Getting started

### Prerequisites

- Node.js 18+
- [pnpm](https://pnpm.io) (recommended) or npm

### Install & run

```bash
pnpm install
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173).

### Build for production

```bash
pnpm build
pnpm preview
```

## API endpoints

Base URL: `https://6a1f9defe96c1d13b5860ddd.mockapi.io`

| Resource | Endpoints |
|----------|-----------|
| Products | `GET /products`, `GET /products/:id` |
| Users | `GET /users`, `POST /users`, `PUT /users/:id` |

User accounts are stored on MockAPI. After login, session data (`id`, `name`, `email`, `address`) is kept in `localStorage` under `auth-storage` so reloads stay signed in.

**Order history** is saved on each user record as an `orders` array (same [users API](https://6a1f9defe96c1d13b5860ddd.mockapi.io/users)). When you complete checkout, the order is appended via `PUT /users/:id`. Profile loads orders from the API on visit.

## Promo codes

Use these codes at checkout (Cart → Review step):

| Code | Discount |
|------|----------|
| **LUXE10** | 10% off the entire order |
| **SAVE50** | $50 off when subtotal is $200+ |

Free shipping applies when the order subtotal is **$150** or more (after discounts).

## Main features

- **Shop** — search, sort, product grid
- **Categories** — browse by category
- **Cart drawer** — quick view; full checkout on `/cart`
- **Checkout** — cart review → shipping → payment → confirmation
- **Auth** — register & login against MockAPI `/users`
- **Profile** — address book (synced to API), membership tier, order history (synced to API)
- **Wishlist** — saved products with local persistence
- **Dark mode** — toggle in the navbar

## Project structure

```
src/
├── api/          axios, products, users
├── constants/    shared promo copy
├── components/   layout, ProductCard, Toast, CartDrawer
├── hooks/        useProducts
├── pages/        route screens
├── router/       routes + ProtectedRoute
└── store/        Zustand stores
```

## Environment variables (optional)

Create `.env` in the project root:

```env
VITE_API_URL=https://6a1f9defe96c1d13b5860ddd.mockapi.io
```

Then point `src/api/axios.js` at `import.meta.env.VITE_API_URL` when you add env support.

## Deploy

Works on [Vercel](https://vercel.com), [Netlify](https://netlify.com), or any static host:

1. Connect the Git repository
2. Build command: `pnpm build`
3. Output directory: `dist`

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build |
| `pnpm preview` | Preview production build |
| `pnpm lint` | Run ESLint |

## License

Private / educational project.
