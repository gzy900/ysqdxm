<!--
 * @Athour: kumozheng
 * @Date: 2021-08-31 20:54:09
 * @LastEditors: kumozheng
 * @LastEditTime: 2021-08-31 21:11:21
 * @Description: 
 * @FilePath: /RenderDemo copy/assets/Assets/ReadMe.md
-->


真机预览：
 1. 构建工程 重新构建 选择3D 2D场景
 2. Engine拷贝到项目的minigame/assets目录下 （from roam）
 3. RenderEngineDemo 构建含puppet的引擎: npm run watch-game -- --outdir=./
 4. 第3步产出物在 RenderEngineDemo/game/WAEngine.js 替换第二步Engine/game/WAEngine.js
 5. 替换game.js中的 'canvas= ... GameGlobal.engine...' 为 'GameGlobal.engine = require('./Engine/initEngine')(
  GameGlobal.canvas ? GameGlobal.canvas : (GameGlobal.canvas = wx.createCanvas()),
  globalSetting);' 删掉第一条语句
 6. 工具上点真机预览