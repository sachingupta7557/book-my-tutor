import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{port:5174}
})

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import path from 'path'

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 5174,
//     fs: {
//       allow: ['.'] // Only allow access to current folder (admin/)
//     }
//   },
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, './src') // Optional: alias for imports like "@/components/..."
//     }
//   }
// })

