# www.tounick.com

## README
+ ``CSS``和``html``目录已添加到``.gitignore``文件
+ 这两个目录的内容由gulp自动生成，请勿直接编辑

## 如果``.gitignore``不起作用
+ 用下面两个命令清除git缓存
```
git rm -rf --cached .
git add .
```

## Utility
+ [精灵图生成](http://spritepad.wearekiss.com/)
+ 文件引用参考template.html


## Using Modules
### 调用back_to_top
```
@@include('./component/back_top.html')
<link rel="stylesheet" href="../css/m_back_top.css">
```


## Style Guideline
+ [SMACSS](https://smacss.com/)
+ [CSS代码规范](http://codeguide.bootcss.com/#css-syntax)
+ [模块](https://smacss.com/book/type-module)
+ [状态](https://smacss.com/book/type-state)


## Notes
+ Menu和sidebar改成微软雅黑
+ 新增加animate.less动画库
+ [Animate.CSS官方文档](https://daneden.github.io/animate.css/)
+ [浏览器兼容测试在线测试](http://fts.aliyun.com/index.htm?spm=0.0.0.0.QoflZT)

## Convention
+ 动画库和组件的引用方式用less的import，不能直接写在html头部
