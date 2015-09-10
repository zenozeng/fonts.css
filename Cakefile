fs = require 'fs'
yaml = require 'js-yaml'
_ = require 'underscore'

readFileSync = (file) -> fs.readFileSync file, {encoding: 'UTF-8'}

template =
  header: readFileSync 'template/header.css'

fonts =
  cn: readFileSync 'fonts.yml'
  en: readFileSync 'fonts.en.yml'

# parse fonts
for key, value of fonts
  fonts[key] = yaml.load value

families =
  黑体: "hei"
  楷体: "kai"
  宋体: "song"
  仿宋: "fang-song"
  明体: "ming"

genericFontFamilies =
  黑体: "sans-serif"
  楷体: "serif"
  宋体: "serif"
  仿宋: "serif"
  明体: "serif"

task "build", ->
    # Collect fonts
    collections = []
    for family in _.keys(families)
      results = fonts.cn.filter (font) -> font.family is family
      platform = results.map (elem) -> elem.platform
      enResults = fonts.en.filter (font) -> font.family is family
      results = enResults.concat results
      alias = _.flatten(results.map (elem) -> elem.alias)
      alias.push genericFontFamilies[family]
      alias = alias.map (elem) ->
        if (elem.indexOf(' ') > -1) or (elem.indexOf('\\') > -1)
          ['"', elem, '"'].join ''
        else
          elem
      names = results.map (elem) -> "<span data-fonts='#{elem.alias}' data-name='#{elem.name}'><a href='#' onclick='return false;' title='#{elem.platform}'>#{elem.name}</a></span>"
      collection =
        fonts: alias
        names: names
        header: family
        class: "font-#{families[family]}"
        css: "font-family: #{alias.join(', ')};"
        notes: _.compact(results.map (elem) -> elem.note)
        # 要 float right，所以倒序一下
        platform: _.compact(_.uniq(_.flatten(platform)))
      collections.push collection
    # filter empty collections
    collections = collections.filter (collection) -> collection.fonts.length > 0

    # generate fonts.css
    console.log "Generating fonts.css"
    css = collections.map (collection) -> ".#{collection.class} {#{collection.css}}"
    fs.writeFile 'fonts.css', template.header+css.join("\n"), (err) -> throw err if err

    # generate fonts.less
    console.log "Generating fonts.less"
    css = collections.map (collection) ->
      ".#{collection.class}() {\n  font-family: #{collection.fonts.join(', ')};\n}"
    fs.writeFile 'fonts.less', template.header+css.join("\n"), (err) -> throw err if err

    # generate fonts.styl
    console.log "Generating fonts.styl"
    css = collections.map (collection) ->
      "#{collection.class}()\n  font-family #{collection.fonts.join(', ')}"
    fs.writeFile 'fonts.styl', template.header+css.join("\n"), (err) -> throw err if err

    # generate index.html
    console.log "Generating index.html"
    forkongithub = "<style>#forkongithub a{background:#000;color:#fff;text-decoration:none;font-family:arial, sans-serif;text-align:center;font-weight:bold;padding:5px 40px;font-size:1rem;line-height:2rem;position:relative;transition:0.5s;}#forkongithub a:hover{background:#555;color:#fff;}#forkongithub a::before,#forkongithub a::after{content:\"\";width:100%;display:block;position:absolute;top:1px;left:0;height:1px;background:#fff;}#forkongithub a::after{bottom:1px;top:auto;}@media screen and (min-width:800px){#forkongithub{position:absolute;display:block;top:0;right:0;width:200px;overflow:hidden;height:200px;}#forkongithub a{width:200px;position:absolute;top:60px;right:-60px;transform:rotate(45deg);-webkit-transform:rotate(45deg);box-shadow:0 0 8px rgba(0,0,0,0.8);}}</style><span id=\"forkongithub\"><a href=\"https://github.com/zenozeng/fonts.css\">Fork me on GitHub</a></span>"
    collections = collections.map (collection) ->
      if collection.notes.length > 0
        notes = "<div class=\"notes\"><li>#{collection.notes.join('</li><li>')}</li></div>"
      else
        notes = ''
      showPlatform = ["Windows", "Mac", "Linux"].filter (platform) ->
        collection.platform.indexOf(platform) > -1
      platform = showPlatform.map (platform) -> "<li>#{platform}</li>"

      "\n     <div class=\"collection\">\n
        <div class=\"tags\">#{platform.join('')}</div>\n
        <h2 class=\"font-hei-regular\">#{collection.header}</h2>\n
        <div class=\"text #{collection.class}\">\n
          <ul>\n
            <li class=\"size24\">我能吞下玻璃而不伤身体，The quick brown fox jumps over the lazy dog.</li>\n
            <li class=\"size18\">我能吞下玻璃而不伤身体，The quick brown fox jumps over the lazy dog.</li>\n
            <li class=\"size16\">我能吞下玻璃而不伤身体，The quick brown fox jumps over the lazy dog.</li>\n
            <li class=\"size14\">我能吞下玻璃而不伤身体，The quick brown fox jumps over the lazy dog.</li>\n
            <li class=\"size12\">我能吞下玻璃而不伤身体，The quick brown fox jumps over the lazy dog.</li>\n
          </ul>\n
        </div>\n
        <div class=\"class\">.#{collection.class}</div>\n
        <div class=\"css\">#{collection.names.join('，')}</div>\n
        <div class=\"css\">#{_.escape(collection.css)}</div>\n
        #{notes}
      </div>\n"
    html = "<!doctype HTML>\n
<head>\n
  <meta charset=\"UTF-8\">\n
  <link rel=\"stylesheet\" type=\"text/css\" href=\"fonts.css\" />\n
  <link rel=\"stylesheet\" type=\"text/css\" href=\"styles.css\" />\n
</head>\n
<body class=\"font-hei-regular\">\n
  #{forkongithub}
  <header>Fonts.css -- 跨平台中文字体解决方案</header>\n
  <div id='notes'>
    Note: 下滑线标注的为本地存在的字体，关于测试字体的方法，可以看我<a href='https://github.com/zenozeng/font-detect.js'>这个 Repo</a>
  </div>
  <article>#{collections.join('')}</article>\n
  <script src='js/font-detect.js'></script>
  <script src='js/main.js'></script>
</body>"
    fs.writeFile 'index.html', html, (err) -> throw err if err
