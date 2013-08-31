$.get 'fonts.yml', (fonts) ->
  $.get 'config.yml', (config) ->
    collections = []
    for family in families
      for weight in weights
        results = fonts.filter (font) -> font.family is family and font.weight is weight
        text = if weight? then "#{family}（#{weight}）" else family
        fontsArray = results.map (elem) -> elem.name
        platform = results.map (elem) -> elem.platform
        platform = platform.filter (elem) -> elem?
        collection =
          fonts: _.flatten(fontsArray)
          platform: _.uniq(_.flatten(platform))
          cnames: results.map (elem) -> elem.cname
          text: text
        collections.push collection
    # filter empty results
    collections = collections.filter (collection) -> collection.fonts.length > 0
    # gen html
    html = collections.map (collection) ->
      styles = collection.fonts.map (elem) -> "'#{elem}'"
      css = collection.fonts.map (elem) -> "\"#{elem}\""
      tags = collection.platform.map (tag) -> "<li>#{tag}</li>"

      "<div class=\"collection\">
        <div class=\"tags\">
          #{tags.join('')}
        </div>
        <div class=\"text\" style=\"font-family: #{styles.join(', ')}\">
          <h2>#{collection.text}</h2>
          <ul>
            <li class=\"size18\">故天将降大任于是人也必先苦其心智劳其筋骨饿其体肤空乏其身行弗乱其所为所以动心忍性曾益其所不能。<li>
            <li class=\"size16\">故天将降大任于是人也必先苦其心智劳其筋骨饿其体肤空乏其身行弗乱其所为所以动心忍性曾益其所不能。<li>
            <li class=\"size14\">故天将降大任于是人也必先苦其心智劳其筋骨饿其体肤空乏其身行弗乱其所为所以动心忍性曾益其所不能。<li>
            <li class=\"size12\">故天将降大任于是人也必先苦其心智劳其筋骨饿其体肤空乏其身行弗乱其所为所以动心忍性曾益其所不能。<li>
          </ul>
        </div>
        <div class=\"name\">
          #{collection.cnames.join('，')}
        </div>
        <div class=\"css\">
          font-family: #{css.join(', ')};
        </div>
      </div>"
    $('article').html html  
