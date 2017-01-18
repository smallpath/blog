export default function (fullPath) {
  let screen = window.screen
  let encode = encodeURIComponent
  let params = {
    dt: encode(document.title),
    dr: encode(fullPath),
    ul: navigator.language || navigator.browserLanguage || '',
    sd: screen.colorDepth + '-bit',
    sr: screen.width + 'x' + screen.height,
    dpr: window.devicePixelRatio || window.webkitDevicePixelRatio || window.mozDevicePixelRatio || 1,
    dp: encode(fullPath),
    z: +new Date()
  }

  let queryArr = []
  for (let i in params) {
    queryArr.push(i + '=' + encodeURIComponent(params[i]))
  }
  let queryString = '?' + queryArr.join('&')
  window.ga_image = new window.Image()
  window.ga_image.src = '/_.gif' + queryString
}
