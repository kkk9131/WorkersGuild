# GitHub プッシュワークフロー - Workers Guild

## 現在の状況
- ブランチ: `feature/phase2-authentication-database-setup`
- 実装完了: データベースセットアップとセキュリティ実装
- 状態: コミット済み、プッシュ準備完了

## 推奨プッシュワークフロー

### 1. 事前チェック
```bash
# 現在の状態確認
git status
git log --oneline -3

# テスト実行（プッシュ前の品質確認）
npm run test
npm run lint
npm run type-check
```

### 2. リモートとの同期確認
```bash
# リモートの最新状態を確認
git fetch origin

# mainブランチとの差分確認
git log --oneline main..HEAD
```

### 3. プッシュ実行
```bash
# 機能ブランチをプッシュ
git push origin feature/phase2-authentication-database-setup

# 初回プッシュの場合（上流ブランチ設定）
git push -u origin feature/phase2-authentication-database-setup
```

### 4. プルリクエスト作成
GitHub上で以下の内容でプルリクエストを作成：

#### タイトル
```
feat(database): Phase 2 - Database setup with RLS policies
```

#### 説明
```markdown
## 概要
Phase 2認証システムのデータベース基盤を実装しました。Supabaseを使用したユーザープロファイル管理とセキュリティポリシーを含みます。

## 実装内容
- ✅ Supabaseマイグレーションファイル（3ファイル）
- ✅ Row Level Security (RLS) ポリシー
- ✅ 自動プロファイル作成トリガー
- ✅ 包括的なテストスイート
- ✅ データベースユーティリティ
- ✅ TypeScript型定義更新

## 技術詳細

### データベーススキーマ
- **user_profiles テーブル**: ゲーミフィケーション要素を含むユーザープロファイル
- **制約**: レベル1-100、スキル0-100、有効なロール
- **インデックス**: パフォーマンス最適化のための複数インデックス

### セキュリティ機能
- **RLS ポリシー**: ユーザーは自分のデータのみアクセス可能
- **自動プロファイル作成**: 新規ユーザー登録時の自動処理
- **データ検証**: データベースレベルでの制約

### テスト
- **マイグレーション構造テスト**: SQL構文と内容の検証
- **RLS ポリシーテスト**: セキュリティポリシーの動作確認
- **Jest設定**: データベーステスト環境

## ファイル変更
- `supabase/migrations/`: 3つのマイグレーションファイル
- `__tests__/database/`: データベーステストファイル
- `lib/database-utils.ts`: データベースユーティリティ
- `scripts/run-migrations.ts`: マイグレーション実行スクリプト
- `types/database.ts`: TypeScript型定義更新
- `package.json`: テスト関連スクリプト追加
- `jest.config.js`: Jest設定

## テスト結果
```bash
npm run test -- __tests__/database/migration-structure.test.ts
# ✅ 6 tests passed
```

## 要件対応
- ✅ 5.1: RLS ポリシーによるデータアクセス制御
- ✅ 5.2: 認証・認可の検証
- ✅ 5.3: マイグレーションと制約によるデータ整合性
- ✅ 5.4: ロールベース権限システム準備
- ✅ 5.5: 暗号化とセキュリティ対策

## 次のステップ
このPRマージ後、次のタスクに進行可能：
- タスク2: 強化された認証ストア実装
- タスク3: プロファイル管理機能
- タスク4: 認証フロー統合

## チェックリスト
- [x] コード実装完了
- [x] テスト追加・実行
- [x] ドキュメント更新
- [x] 型定義更新
- [x] セキュリティ考慮
- [ ] コードレビュー
- [ ] CI/CD パス確認

Closes #[issue番号]
Implements task 1 of Phase 2 authentication core
```

## 5. マージ後の作業

### プルリクエストがマージされた後
```bash
# mainブランチに切り替え
git checkout main

# 最新の変更を取得
git pull origin main

# 機能ブランチを削除（ローカル）
git branch -d feature/phase2-authentication-database-setup

# 機能ブランチを削除（リモート）
git push origin --delete feature/phase2-authentication-database-setup
```

### 次の作業準備
```bash
# 新しい機能ブランチを作成
git checkout -b feature/phase2-authentication-store

# または developブランチがある場合
git checkout develop
git pull origin develop
git checkout -b feature/phase2-authentication-store
```

## 品質チェックリスト

### プッシュ前の確認事項
- [ ] すべてのテストが通過
- [ ] ESLint/Prettier チェック通過
- [ ] TypeScript型チェック通過
- [ ] 機密情報が含まれていない
- [ ] コミットメッセージが規約に準拠
- [ ] 関連ドキュメントが更新済み

### プルリクエスト作成時
- [ ] 明確なタイトルと説明
- [ ] 変更内容の詳細説明
- [ ] テスト結果の記載
- [ ] 破壊的変更の有無確認
- [ ] 関連Issueのリンク

## 緊急時の対応

### プッシュを取り消したい場合
```bash
# 最後のコミットを取り消し（変更は保持）
git reset --soft HEAD~1

# 強制プッシュ（注意：共有ブランチでは危険）
git push origin feature/branch-name --force-with-lease
```

### コンフリクト解決
```bash
# リモートの最新を取得
git fetch origin

# mainとマージ
git merge origin/main

# コンフリクト解決後
git add .
git commit -m "resolve merge conflicts"
git push origin feature/branch-name
```

## 自動化の推奨

### GitHub Actions設定
- プルリクエスト時の自動テスト
- コードカバレッジ測定
- 自動デプロイメント（staging環境）

### プリコミットフック
```bash
# husky設定例
npm install --save-dev husky
npx husky install
npx husky add .husky/pre-commit "npm run lint && npm run test"
```

## セキュリティ考慮事項

### 機密情報の保護
- `.env`ファイルは`.gitignore`に含める
- APIキーやパスワードをコミットしない
- 環境変数を適切に使用

### ブランチ保護
- mainブランチの直接プッシュを禁止
- プルリクエスト必須設定
- レビュー必須設定
- ステータスチェック必須設定

これらのワークフローに従って、安全で効率的なGitHub運用を行いましょう。