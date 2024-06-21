import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { svgBuilder } from "./src/plugins/svgBuilder";
import path from "path";

function resolve(url: string): string {
  return path.resolve(__dirname, url);
}

// Wrap configuration in a function to use async code
export default ({ mode }) => {
  // Use loadEnv to load the environment variables
  const env = loadEnv(mode, process.cwd(), '');

  return defineConfig({
    base: env.VITE_BASE_URL || '/puppychat/', 
    server: {
      host: "0.0.0.0",
      // hmr: {
      //   port: 443,
      //   protocol: "wss",
      // },
    },
    plugins: [vue(), svgBuilder("./src/assets/imgs/")],
    build: {
      minify: "terser",
      terserOptions: {
        compress: {
          // drop_console: true,
          drop_debugger: true
        }
      }
    },
    resolve: {
      alias: {
        "@": resolve("./src")
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          additionalData: "@import '@/assets/theme.less';"
        }
      }
    },
    define: {
      // Use loaded environment variables
      'process.env.BASE_URL': JSON.stringify(env.VITE_API_BASE_URL),
    }
  });
};
