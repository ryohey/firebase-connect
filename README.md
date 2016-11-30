# firebase-connect

## observer

- props を引数に取る関数
- コンポーネントの props が更新される度に呼ばれる
- fetch が実行できるときに Object を返す
- Object は { query: String, fetch: Function }
- fetch は callback 関数を引数に取るデータを取得する関数で、キャンセルを行う関数を返す
