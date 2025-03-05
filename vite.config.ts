import { UserConfigExport, loadEnv } from "vite";

import vue from "@vitejs/plugin-vue";

import path from "path";

import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

// https://vite.dev/config/
// { command }: ConfigEnv

export default (params: {
  command: string;
  mode: string;
  isSsrBuild: boolean;
  isPreview: boolean;
}): UserConfigExport => {
  console.log("cmd: ", params.command);
  console.log("mode: ", params.mode);

  const env = loadEnv(params.mode, `${process.cwd()}/etc`);
  console.log(env);

  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        // 指定symbolId格式
        symbolId: "icon-[dir]-[name]",
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
      sourcemap: true,
      outDir: "dist",
    },
    server: {
      port: 7999,
      strictPort: true,
      // https: false,
      proxy: {
        [env.VITE_API_PREFIX]: {
          target: env.VITE_API_SERVER,
          changeOrigin: true,
          rewrite: (path) =>
            path.replace(new RegExp(`^${env.VITE_API_PREFIX}`), ""),
        },
      },
    },
  };
};
