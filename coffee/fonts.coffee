$.get 'fonts.yml', (fonts) ->
  $.get 'config.yml', (config) ->
    # parse fonts
    doc = jsyaml.load fonts
    fonts = []
    for cname, font of doc
      font.cname = cname
      fonts.push font
    # parse config
    config = jsyaml.load config
    # start
    families = config.families
    weights = config.weights
    collections = []
    weights.unshift undefined
    for family in families
      for weight in weights
        results = fonts.filter (font) -> font.family is family and font.weight is weight
        text = if weight? then "#{family}（#{weight}）" else family
        fontsArray = results.map (elem) -> elem.name
        collection =
          fonts: _.flatten(fontsArray)
          cnames: results.map (elem) -> elem.cname
          text: text
        collections.push collection
    # filter empty results
    collections = collections.filter (collection) -> collection.fonts.length > 0
    # gen html
    html = collections.map (collection) ->
      collection.fonts = collection.fonts.map (elem) -> "\"#{elem}\""
      "<div class=\"collection\">
        <div class=\"text\">
          #{collection.text}
        </div>
        <div class=\"name\">
          #{collection.cnames.join('，')}
        </div>
        <div class=\"css\">
          font-family: #{collection.fonts.join(', ')};
        </div>
      </div>"
    $('article').html html  
