import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5173,
    host: true, // Libera na rede local
    strictPort: true, // Garante que se a porta estiver ocupada, ele avisa em vez de trocar
  },
  preview: {
    port: 5173,
    host: true,
    strictPort: true,
  }
});