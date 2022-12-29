import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import linaria from '@linaria/vite';
import { VitePluginFonts } from 'vite-plugin-fonts';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        linaria({
            babelOptions: { presets: ['@babel/preset-typescript'] },
        }),
        preact(),
        VitePluginFonts({
            google: {
                families: ['Fira Code'],
            },
        }),
    ],
});
