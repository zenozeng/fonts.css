fs = require 'fs'
yaml = require 'js-yaml'
_ = require 'underscore'

families =
  黑体: "hei"
  楷体: "kai"
  宋体: "song"
  仿宋: "fang-song"
  明体: "ming"

weights = 
  "Regular": "regular"
  "Ultra Light": "ultra-light"
  "Extra Light": "extra-light"
  "Light": "light"
  "Medium": "medium"
  "Bold": "bold"
  "Extra Bold": "extra-bold"
  "Ultra Bold": "ultra-bold"
  "Heavy": "heavy"

task "build", ->
  fs.readFile 'fonts.yml', {encoding: 'UTF-8'}, (err, data) ->
    throw err if err
    # Parse YAML
    fonts = yaml.load data
    # fill property with defaults
    fonts = fonts.map (elem) -> _.defaults elem, {weight: "Regular"}
    # Collect fonts
    collections = []
    for family in _.keys(families)
      for weight in _.keys(weights)
        results = fonts.filter (font) -> font.family is family and font.weight is weight
        platform = results.map (elem) -> elem.platform
        alias = _.flatten(results.map (elem) -> elem.alias)
        if weight is "Regular" 
          className = "font-#{families[family]}"
        else
          className = "font-#{families[family]}-#{weights[weight]}"
        collection =
          fonts: alias
          names: results.map (elem) -> elem.name
          header: if weight? then "#{family} <span>#{weight}</span>" else family
          class: className
          css: "font-family: \"#{alias.join('\", \"')}\";"
          notes: _.compact(results.map (elem) -> elem.note)
          # 要 float right，所以倒序一下
          platform: _.compact(_.uniq(_.flatten(platform)))
        collections.push collection
    # filter empty collections
    collections = collections.filter (collection) -> collection.fonts.length > 0

    # generate fonts.css
    console.log "Generating fonts.css"
    header = "/*!\n
 *  Fonts.css -- Cross-platform Chinese fonts solution\n
 * \n
 *  Copyright (C) 2013 Zeno Zeng\n
 *  Released under the MIT license\n
 * \n
 *  Github: https://github.com/zenozeng/fonts.css\n
 */\n"
    css = collections.map (collection) -> ".#{collection.class} {#{collection.css}}"
    fs.writeFile 'fonts.css', header+css.join("\n"), (err) -> throw err if err

    # generate index.html
    console.log "Generating index.html"
    forkongithub = "<style>#forkongithub a{background:#000;color:#fff;text-decoration:none;font-family:arial, sans-serif;text-align:center;font-weight:bold;padding:5px 40px;font-size:1rem;line-height:2rem;position:relative;transition:0.5s;}#forkongithub a:hover{background:#555;color:#fff;}#forkongithub a::before,#forkongithub a::after{content:\"\";width:100%;display:block;position:absolute;top:1px;left:0;height:1px;background:#fff;}#forkongithub a::after{bottom:1px;top:auto;}@media screen and (min-width:800px){#forkongithub{position:absolute;display:block;top:0;right:0;width:200px;overflow:hidden;height:200px;}#forkongithub a{width:200px;position:absolute;top:60px;right:-60px;transform:rotate(45deg);-webkit-transform:rotate(45deg);box-shadow:0 0 8px rgba(0,0,0,0.8);}}</style><span id=\"forkongithub\"><a href=\"https://github.com/zenozeng/fonts.css\">Fork me on GitHub</a></span>"
    collections = collections.map (collection) ->
      if collection.notes.length > 0
        notes = "<div class=\"notes\"><li>#{collection.notes.join('</li><li>')}</li></div>"
      else
        notes = ''
      # 要 float right，所以倒序一下
      platform = collection.platform.reverse().map (platform) ->
        if platform is "MS Office*"
          "<li class=\"warning\"><a href=\"http://office.microsoft.com/en-us/products/microsoft-software-license-agreement-FX103576343.aspx\" title=\"注意微软 Office 的授权协议不允许将其附带的字体用在 Office 之外的显示，这样可能会造成用户在无意识中构成侵权。应优先调用 Windows 系统默认自带的字体以避免让用户侵权。\">#{platform}</a></li>"
        else
          "<li>#{platform}</li>"

      "\n     <div class=\"collection\">\n
        <div class=\"tags\">#{platform.join('')}</div>\n
        <h2 class=\"font-hei-regular\">#{collection.header}</h2>\n
        <div class=\"text #{collection.class}\">\n
          <ul>\n
            <li class=\"size24\">故天将降大任于是人也必先苦其心智劳其筋骨饿其体肤空乏其身行弗乱其所为所以动心忍性曾益其所不能<li>\n
            <li class=\"size18\">故天将降大任于是人也必先苦其心智劳其筋骨饿其体肤空乏其身行弗乱其所为所以动心忍性曾益其所不能<li>\n
            <li class=\"size16\">故天将降大任于是人也必先苦其心智劳其筋骨饿其体肤空乏其身行弗乱其所为所以动心忍性曾益其所不能<li>\n
            <li class=\"size14\">故天将降大任于是人也必先苦其心智劳其筋骨饿其体肤空乏其身行弗乱其所为所以动心忍性曾益其所不能<li>\n
            <li class=\"size12\">故天将降大任于是人也必先苦其心智劳其筋骨饿其体肤空乏其身行弗乱其所为所以动心忍性曾益其所不能<li>\n
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
  <article>#{collections.join('')}</article>\n
</body>"
    fs.writeFile 'index.html', html, (err) -> throw err if err
