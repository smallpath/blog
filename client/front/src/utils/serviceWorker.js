export default function (state) {
  const key = `${state.siteInfo.siteUrl}::hash`
  const appHash = window.localStorage.getItem(key)
  if ('serviceWorker' in navigator && appHash !== state.appHash) {
    navigator.serviceWorker.register('/service-worker.js')
    window.localStorage.setItem(key, state.appHash)
  }
}
