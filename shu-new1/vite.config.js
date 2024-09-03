import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    base: '/daping/',
    plugins: [
        vue(),
    ],
    server: {
        host: "0.0.0.0",
        https: false,//是否启用 http 2
        // cors: true,//为开发服务器配置 CORS , 默认启用并允许任何源
        open: true,//服务启动时自动在浏览器中打开应用
        port: 8081,
        strictPort: false, //设为true时端口被占用则直接退出，不会尝试下一个可用端口
        // force: true,//是否强制依赖预构建
        // hmr: false,//禁用或配置 HMR 连接
        // 传递给 chockidar 的文件系统监视器选项
        // watch: {
        //     ignored: ["!**/node_modules/your-package-name/**"]
        // },
        // 反向代理配置
        proxy: {
            '/api': {
                target: "https://xindianyi.mvheartcare.net",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }
})
