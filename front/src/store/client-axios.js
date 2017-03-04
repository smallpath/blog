function get(url, cb) {
  let xhr
  try {
    xhr = new window.XMLHttpRequest()
  } catch (e) {
    try {
      xhr = new window.ActiveXObject('Msxml2.XMLHTTP')
    } catch (e) {
      return cb(new Error('XHR: not supported'))
    }
  }

  xhr.onreadystatechange = function() {
    if (xhr.readyState !== 4) return
    cb(xhr.status !== 200 ? new Error('XHR: server response status is ' + xhr.status) : false, xhr.responseText)
  }

  xhr.open('GET', url, true)
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.send()
}

export default {
  get: (target, { params: query }) => {
    const suffix = Object.keys(query).map(name => {
      return `${name}=${JSON.stringify(query[name])}`
    }).join('&')
    const url = `${target}?${suffix}`
    return new Promise((resolve, reject) => {
      get(url, (err, data) => {
        if (err) reject(err)
        try {
          const json = JSON.parse(data)
          resolve({ data: json })
        } catch (err) {
          reject(err)
        }
      })
    })
  }
}
