项目名称：完善版对象类型 `贪吃蛇`

# 零 源码使用教程
## 0.1 开发
源文件存储在 `src` 目录中
## 0.2 使用
npm run build==进行构建

npm run start==监听运行开发

# 一 snake.js单独使用
## 1.1 html中引入

```html

<script src="./snake.js"></script>
<script>
  let snakeGame = window.SnakeGame('选择器')
</script>
```

## 1.2 SnakeGame的功能

1. SnakeGame.help()可以获取帮助文档

```text
SnakeGame是一个封装后的贪吃蛇游戏,是提供操作DOM来进行游戏
1. 通过let snakeGame = new window.SnakeGame('选择器')绑定到一个DOM元素中
2. snakeGame函数: start()启动函数
3. snakeGame函数: pause()暂停函数
4. snakeGame函数: reset()重置游戏
5. snakeGame函数: theme(number)游戏主题(0,1,2)三个主题
```

# 二 注意事项
PS:项目打包结果并未做低版本浏览器适配