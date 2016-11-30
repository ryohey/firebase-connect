import firebase from "firebase"

function buildTemplate(template, params) {
  return template
    .split("/")
    .map(t => {
      const m = t.match(/:(.+)/)
      if (m) {
        return params[m[1]]
      }
      return t
    })
    .join("/")
}

function isValidParams(obj) {
  return Object.values(params).filter(v => v !== undefined).length === 0
}

///  パスを作るテンプレート文字列を引数に取り、observer を返す関数
export const observe = (template, propsToParams) => props => {
  const params = propsToParams(props)
  if (!isValidParams(params)) {
    return
  }
  const query = buildTemplate(template, params)
  return {
    query,
    fetch: callback => 
      firebase
        .database()
        .ref(query)
        .on("value", snap => {
          callback(snap.val)
        })
  }
}

export const observeAuth = () => () => {
  return {
    query: "",
    fetch: callback => 
      firebase.auth().onAuthStateChanged(user => {
        callback(user)
      })
  }
}
