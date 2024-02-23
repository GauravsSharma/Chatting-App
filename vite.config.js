import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Change the port if needed
    host: '0.0.0.0', // Allow external access
  },
  build: {
    outDir: 'dist', // Specify the output directory for the build
  },
  optimizeDeps: {
    include: ['react', 'react-dom'], // Specify dependencies to be optimized
  },
  // Add more configurations as needed
});
