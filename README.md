# Fonts.css -- 跨平台中文字体解决方案

一直以来跨平台的中文字体 CSS 设置都是一件让人很头疼的事情，这个库打包了一些常见字体的名字，希望能覆盖 Windows、Mac 以及 Linux 的常见字体，方便引用。在 font-family 直接支持宋、楷、黑和仿宋之前，我觉得这样一种解决方案依然还是必要的。

## Demo & Doc

http://zenozeng.github.io/fonts.css/

## Usage

```html
<head>
    <link rel="stylesheet" type="text/css" href="fonts.css" />
</head>
<body>
    <p class="font-kai">
        故天将降大任于是人也必先苦其心智劳其筋骨饿其体肤空乏其身行弗乱其所为所以动心忍性曾益其所不能
    </p>
</body>
```

# Contribute

Fork 这个项目然后修改 fonts.yml。
如果你要自己编译可以npm安装 coffee-script, js-yaml 然后运行 cake build。
如果不的话，可以直接 pull request 回来，由我来编译。

# Known Issues

## 关于 MS Office 自带的华文字体

我现在的观点是，作为一个库我应该直接面向 API，
既然系统的字体列表里有华文字体，那么就应该被认为是可用的。
再加上华文字体是 Mac 下默认就提供的字体，所以我调整了华文字体在列表里头的顺序。

# License

Copyright (C) 2013-2015 Zeno Zeng

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

# Footnote

- [不同版本的 Office 提供的字体](http://office.microsoft.com/zh-cn/powerpoint-help/HA010282644.aspx)

- [Microsoft Software License Agreement](http://office.microsoft.com/en-us/products/microsoft-software-license-agreement-FX103576343.aspx)

- [WPS Office Linux版最终用户协议](http://community.wps.cn/wiki/WPS_Office_Linux%E7%89%88%E6%9C%80%E7%BB%88%E7%94%A8%E6%88%B7%E5%8D%8F%E8%AE%AE)

- [如何保证网页的字体在各平台都尽量显示为最高质量的黑体？](http://www.zhihu.com/question/19911793)

- [Web 中文字体应用指南](http://ruby-china.org/topics/14005)

- [Helvetica](http://zh.wikipedia.org/wiki/Helvetica)

- [Linux Font Equivalents to Popular Web Typefaces](https://mondaybynoon.com/linux-font-equivalents-to-popular-web-typefaces/)

- [Fonts supplied with Windows XP](http://www.microsoft.com/typography/fonts/winxp.htm)

- [Mac OS X v10.6: Fonts list](http://support.apple.com/kb/ht5154)
