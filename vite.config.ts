import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import linaria from '@linaria/vite';
import { VitePluginFonts } from 'vite-plugin-fonts';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        tsconfigPaths(),
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
