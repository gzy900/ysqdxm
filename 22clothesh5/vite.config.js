import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/clothesh5/',
    plugins: [
        vue(),
        createSvgIconsPlugin({
            // 指定要缓存的文件夹
            iconDirs: [path.resolve(process.cwd(), 'src/assets/icon')],
            // 指定symbolId格式
            symbolId: '[name]'
        }),
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
            '/ecgoneapi': {
                // target: "https://baoxinyi.mvheartcare.net",
                target: "https://baoxinyi.maillife.cn",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/ecgoneapi/, ''),
                bypass(req, res, options) {
                    const proxyURL = options.target + options.rewrite(req.url)
                    console.log('proxyURL4', proxyURL)
                    console.log(proxyURL)
                    req.headers['x-req-proxyURL'] = proxyURL
                    res.setHeader('x-req-proxyURL', proxyURL)
                }
            },
            '/api': {
                target: "https://xindianyi.mvheartcare.net",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
                bypass(req, res, options) {
                    const proxyURL = options.target + options.rewrite(req.url)
                    console.log('proxyURL3', proxyURL)
                    console.log(proxyURL)
                    req.headers['x-req-proxyURL'] = proxyURL
                    res.setHeader('x-req-proxyURL', proxyURL)
                },

            },
        }
    }
})
