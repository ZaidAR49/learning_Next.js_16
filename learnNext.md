# Next.js Professional Learning Notes

---

## 1. Component Directives
* **Server (Default):** All components in `app/` render on the server. Best for SEO, security, and smaller bundles. You don't need to specify anything for a component to be a Server Component.
* **`'use client'`:** Opts into the Client Bundle. Required for interactivity (hooks like `useState`, `useEffect`, browser events like `onClick`).
* **`'use server'`:** Marks functions as **Server Actions** to run backend code directly from the client.
* **`'use cache'` (Experimental):** Caches the specific output of a component or function for instant re-use.

## 2. Advanced Routing & Layouts
* **Folder-based Routing:** Every standard folder in `app/` is a unique URL segment.
* **Dynamic Routes `[slug]`:** Square brackets create variable paths (e.g., `/book/[id]`). You can access these via the `params` prop.
* **Route Groups `(folder)`:** Parentheses organize files without changing the URL path (e.g., `(auth)/login` resolves to `/login`).
* **Root Layout:** The mandatory global shell (`html`, `body`). Kept in `app/layout.tsx`. Do not modify unless adding global providers or metadata.
* **Nested Layouts:** Sub-folder layouts that wrap specific segments and preserve state during navigation.

## 3. Special Files & Hierarchy
* **`page.ts` / `page.tsx`:** The unique UI of a route. Makes the route publicly accessible.
* **`route.ts` / `route.js`:** Reserved for API Route Handlers. Must use uppercase HTTP methods (GET, POST, DELETE). Note: You cannot have a `route.js` and `page.js` at the exact same route segment level.
* **`loading.ts` / `loading.tsx`:** Automatic Suspense boundary to show loading states while data is fetching.
* **`error.ts` / `error.tsx`:** Fallback UI that appears automatically when a runtime error occurs. Must be a Client Component (`'use client'`).
* **`not-found.ts` / `not-found.tsx`:** Renders when the `notFound()` function is called or if a route doesn't exist.
* **Nearest-File Rule:** Next.js always uses the special file (`layout`, `error`, `loading`) closest to the route.

## 4. Modern Data Fetching & Caching
* **Direct Fetch:** Use `async/await` directly in Server Components (no more `useEffect` boilerplate).
* **`fetch` API Extended:** Next.js extends the native `fetch` API to allow configuring caching and revalidation logic.
* **`cacheLife`:** Sets the expiration duration (Default: 15 mins; can be extended to `hours` or `days`).
* **`cacheTag`:** Labels data (e.g., `'books'`) to group it for bulk cache clearing.
* **Revalidation:** Use `revalidatePath('/url')` for specific pages or `revalidateTag('label')` for app-wide updates when data mutates.

## 5. Metadata (SEO)
* **Static:** `export const metadata = { title: '...', description: '...' }` for pages with fixed content.
* **Dynamic:** `export async function generateMetadata({ params }) { ... }` for data-driven pages (e.g., dynamic book titles from a database).

## 6. Performance & Debugging
* **Turbopack:** Run `next dev --turbo` for near-instant development builds and fast Fast Refresh.
* **React Compiler:** Auto-memoizes components via `next.config.js` to prevent unnecessary re-renders (in newer React/Next versions).
* **Console Logs:** Server logs appear in the Terminal. **Note:** In Dev Mode, server logs also mirror to the Browser Console for easier debugging.

## 7. Built-in Optimizations
* **Image Optimization (`<Image />` from `next/image`):** Automatically resizes, optimizes formats (like WebP/AVIF), and lazy loads images. Prevents Cumulative Layout Shift (CLS).
* **Font Optimization (`next/font`):** Eliminates layout shift by self-hosting fonts automatically and preloading the optimal font files.
* **Script Optimization (`<Script />` from `next/script`):** Controls the loading strategy of third-party scripts (e.g., `strategy="lazyOnload"` or `strategy="afterInteractive"`).
* **Link Prefetching (`<Link />` from `next/link`):** Automatically prefetches pages in the background when the link becomes visible in the viewport, making navigation feel instant.

## 8. Server Actions & Mutations
* **Server Actions** allow you to define asynchronous functions that can be called directly from Client Components (e.g., form submissions).
* Greatly simplifies data mutation by avoiding the need to manually write intermediary API routes for simple operations.
* Often combined with `revalidatePath` to refresh the UI immediately after the mutation completes.

## 9. Streaming & Suspense
* **Streaming:** Next.js App Router natively supports streaming responses. This means UI can be sent to the client progressively.
* **`<Suspense>`:** Use React's Suspense boundary to wrap slow-loading components. Next.js will stream the fallback UI (like a spinner or skeleton loader) immediately while the specific component fetches its data on the server in the background.
