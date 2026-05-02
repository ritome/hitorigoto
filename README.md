# ワタシノヒトリゴト

ヒトノワスタジオが作る、自分のための小さな記録帳。

## 何ができるか

- ✓ 今日のタスクと予定の管理（繰り返しタスク対応）
- ♡ 排便と生理の記録（次回生理予測つき）
- 💭 今日のヒトリゴト（4タグでメモ）
- 📅 カレンダーで全部まとめて振り返り
- 💾 JSONバックアップ（iCloud Drive / Google Drive対応）
- 📱 PWA対応（ホーム画面に追加してアプリ化）

## ファイル構成

```
hitorigoto/
├── index.html              ← アプリ本体
├── manifest.json           ← PWA設定
├── sw.js                   ← Service Worker
├── icon.svg                ← アイコン元データ（編集用）
├── icon-maskable.svg       ← マスカブルアイコン元データ
├── icon-192.png            ← Android標準アイコン
├── icon-512.png            ← Android高解像度
├── icon-180.png            ← Apple Touch Icon
└── icon-maskable-512.png   ← Android適応アイコン
```

## デプロイ手順（GitHub Pages）

1. GitHubで新しいリポジトリを作成（公開・プライベートどちらでもOK）
2. このフォルダ内のファイルを全部アップロード（または `git push`）
3. リポジトリの Settings → Pages へ
4. Source を `Deploy from a branch` にして、Branch を `main` / `/ (root)` に設定
5. 数分後に `https://[ユーザー名].github.io/[リポジトリ名]/` でアクセス可能

## 知人への共有方法

URLを送るだけ。受け取った側は：
1. URLを開く
2. ChromeまたはSafariで「ホーム画面に追加」
3. アイコンをタップでアプリのように起動

## 設計思想

- **データは端末内のみ**（外部送信なし）
- **書かなくていい**（プレッシャーゼロ）
- **続けやすさ最優先**

## 技術メモ

- 単一HTML（依存ライブラリなし）
- localStorageでデータ管理
- Service Workerでオフライン動作
- Vanilla JavaScript（フレームワークなし）

## バージョン更新時の手順

`sw.js` の `CACHE_VERSION` を `'hitorigoto-v2'` のように変えて push すると、
ユーザーが次にアプリを開いたとき自動で新バージョンに更新されます。

---

ヒトノワスタジオ
