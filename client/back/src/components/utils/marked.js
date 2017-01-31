import marked from 'marked'
import hljs from 'highlight.js'

marked.setOptions({
  highlight: function (code, lang) {
    if (hljs.getLanguage(lang)) {
      return hljs.highlight(lang, code).value
    } else {
      return hljs.highlightAuto(code).value
    }
  }
})

const Marked = text => {
  var tok = marked.lexer(text)
  text = marked.parser(tok).replace(/<pre>/ig, '<pre class="hljs">')
  return text
}

export default Marked
