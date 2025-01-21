import { UserConfigExport, ConfigEnv } from "vite";

import { viteMockServe } from 'vite-plugin-mock'
import vue from "@vitejs/plugin-vue";

import path from 'path'

import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

// https://vite.dev/config/
export default ({ command }: ConfigEnv): UserConfigExport => {
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        // default
        enable: command === 'serve',
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
          additionalData: `@use "@/assets/styles/variables.scss" as *;`,
        },
      },
    },
  }
};
