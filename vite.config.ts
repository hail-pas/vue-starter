import { UserConfigExport } from "vite";

import vue from "@vitejs/plugin-vue";

import path from 'path'

import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

// https://vite.dev/config/
// { command }: ConfigEnv

export default (): UserConfigExport => {
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    envDir: "./etc",
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/variables.scss" as *;`,
        },
      },
    },
    build: {
      sourcemap: true
    }
  }
};
