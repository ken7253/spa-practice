# 開発環境

## ディレクトリ構成について

```txt
root
┣ netlify // netlify functionsのファイル
┣ public  // 静的なアセットファイルの格納先
┗ src     // 各種ソースコード
  ┣ assets      // コンポーネントやページなどから参照するファイルを格納
  ┣ components  // コンポーネントファイルを格納
  ┣ hooks       // 自作hooksを格納
  ┗ types       // フロントエンド側の型定義ファイルを格納
```

## 環境変数ファイル

このリポジトリで開発を始める際には`.env`ファイルを作成する必要があります。  
ルート直下のディレクトリに`.env`ファイルを作成して下記の内容を追加してください。

```env
API_KEY=<RESAS-APIのトークン>
VITE_API_HOST=http://localhost:8888/
VITE_VIEW_HOST=*
```
