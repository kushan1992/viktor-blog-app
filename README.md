# VIKTOR Blog App

A VIKTOR blog listing app built with **React**, **TypeScript**, **Vite**, **React Query**, and **Tailwind CSS**.  
Features:

- Paginated blog posts
- Search with debounced input
- Category filtering
- Sorting (e.g. `publication_date:DESC`)
- Responsive grid layout
- Caching & background updates via React Query

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/) or [yarn](https://yarnpkg.com/)

---

## Installation

```bash
# Clone the repo
git clone https://github.com/kushan1992/viktor-blog-app
cd viktor-blog-app

# Install dependencies
npm install
# or
pnpm install
# or
yarn install


```

## Environment Variables

- Create a .env file in the root of the project:

```bash
cp .env-example .env

```

- Edit .env and update the API URL:

`VITE_API_URL=http://localhost:3001/api`

## Warning: Your backend must support:

GET /blogposts with pagination (\_start, \_limit)
x-total-count header
Search: ?q=...
Filter: ?category=...

# Script

```bash

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

```

<h3>Open http://localhost:5173 to view the app.</h3>
