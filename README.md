# Fonts.css -- 跨平台中文字体解决方案

一直以来跨平台的中文字体 CSS 设置都是一件让人很头疼的事情，这个库打包了一些常见字体的名字，希望能覆盖 Windows、Mac 以及 Linux 的常见字体，方便引用。


## Demo & Doc

http://zenozeng.github.io/fonts.css/

## Usage

```html
<head>
    <link rel="stylesheet" type="text/css" href="fonts.css" />
</head>
<body>
    <p class="font-kai-normal">
        故天将降大任于是人也必先苦其心智劳其筋骨饿其体肤空乏其身行弗乱其所为所以动心忍性曾益其所不能
    </p>
</body>
```

# Contribute

Fork 这个项目然后修改 fonts.yml。
如果你要自己编译可以npm安装 coffee-script, js-yaml 然后运行 cake build。
如果不的话，可以直接 pull request 回来，由我来编译。

# License

Copyright (c) 2013 Zeno Zeng

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
