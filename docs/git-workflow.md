# Git ワークフロー - Workers Guild

## 概要
このドキュメントでは、Workers Guildプロジェクトで使用するGitワークフローのベストプラクティスを説明します。

## ブランチ戦略

### メインブランチ
- **`main`** - 本番環境にデプロイ可能な安定版コード
- **`develop`** - 開発中の機能を統合するブランチ

### 機能ブランチ
- **`feature/[機能名]`** - 新機能開発用
- **`bugfix/[バグ名]`** - バグ修正用
- **`hotfix/[修正名]`** - 緊急修正用

## コミットメッセージ規約

### フォーマット
```
<type>(<scope>): <subject>

<body>

<footer>
```

### タイプ
- **feat**: 新機能
- **fix**: バグ修正
- **docs**: ドキュメント更新
- **style**: コードフォーマット（機能に影響しない変更）
- **refactor**: リファクタリング
- **test**: テスト追加・修正
- **chore**: ビルドプロセスやツール変更

### 例
```
feat(auth): implement user profile creation with RLS policies

- Add Supabase migration files for user_profiles table
- Implement Row Level Security policies
- Create automatic profile creation triggers
- Add comprehensive tests for database security

Closes #123
```

## ワークフロー手順

### 1. 新機能開発の開始
```bash
# 最新のdevelopブランチを取得
git checkout develop
git pull origin develop

# 新しい機能ブランチを作成
git checkout -b feature/authentication-core

# 作業を開始
```

### 2. 開発中のコミット
```bash
# 変更をステージング
git add .

# コミット（規約に従ったメッセージ）
git commit -m "feat(auth): add user profile database schema"

# 定期的にプッシュ
git push origin feature/authentication-core
```

### 3. プルリクエストの作成
```bash
# 最新のdevelopと同期
git checkout develop
git pull origin develop
git checkout feature/authentication-core
git rebase develop

# 最終プッシュ
git push origin feature/authentication-core --force-with-lease
```

### 4. マージ後のクリーンアップ
```bash
# developに戻る
git checkout develop
git pull origin develop

# 機能ブランチを削除
git branch -d feature/authentication-core
git push origin --delete feature/authentication-core
```

## プルリクエストガイドライン

### タイトル
- 明確で簡潔な説明
- 例: `feat(auth): implement user authentication with Supabase`

### 説明テンプレート
```markdown
## 概要
この変更の目的と内容を簡潔に説明

## 変更内容
- [ ] 新機能の追加
- [ ] バグ修正
- [ ] ドキュメント更新
- [ ] テスト追加

## テスト
- [ ] 単体テスト追加/更新
- [ ] 統合テスト実行
- [ ] 手動テスト完了

## チェックリスト
- [ ] コードレビュー完了
- [ ] テスト通過
- [ ] ドキュメント更新
- [ ] 破壊的変更の確認

## 関連Issue
Closes #[issue番号]
```

## リリース管理

### バージョニング（Semantic Versioning）
- **MAJOR.MINOR.PATCH** (例: 1.2.3)
- **MAJOR**: 破壊的変更
- **MINOR**: 新機能追加（後方互換性あり）
- **PATCH**: バグ修正

### リリースブランチ
```bash
# リリースブランチ作成
git checkout develop
git checkout -b release/v1.2.0

# バージョン更新
npm version minor

# リリース準備完了後
git checkout main
git merge release/v1.2.0
git tag v1.2.0
git push origin main --tags

# developにもマージ
git checkout develop
git merge release/v1.2.0
```

## 緊急修正（Hotfix）

```bash
# mainから緊急修正ブランチ作成
git checkout main
git checkout -b hotfix/critical-security-fix

# 修正作業
git add .
git commit -m "fix(security): patch critical vulnerability"

# mainとdevelopの両方にマージ
git checkout main
git merge hotfix/critical-security-fix
git tag v1.2.1
git push origin main --tags

git checkout develop
git merge hotfix/critical-security-fix
git push origin develop
```

## 便利なGitコマンド

### 履歴確認
```bash
# グラフィカルなログ表示
git log --oneline --graph --all

# 特定ファイルの変更履歴
git log --follow -- path/to/file

# 差分確認
git diff HEAD~1
```

### ブランチ管理
```bash
# リモートブランチと同期
git remote prune origin

# マージ済みブランチの確認
git branch --merged

# 未マージブランチの確認
git branch --no-merged
```

### 便利なエイリアス
```bash
# .gitconfigに追加
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual '!gitk'
```

## CI/CD統合

### GitHub Actions
- プルリクエスト時の自動テスト実行
- コードカバレッジ測定
- 自動デプロイメント

### 品質チェック
- ESLint/Prettier実行
- TypeScript型チェック
- テストカバレッジ閾値チェック

## トラブルシューティング

### よくある問題

1. **マージコンフリクト**
```bash
git status
git add <解決したファイル>
git commit
```

2. **間違ったコミットの取り消し**
```bash
# 最後のコミットを取り消し（変更は保持）
git reset --soft HEAD~1

# 最後のコミットを完全に取り消し
git reset --hard HEAD~1
```

3. **プッシュの取り消し**
```bash
# 危険：共有ブランチでは使用禁止
git push origin +HEAD~1:branch-name
```

## セキュリティ考慮事項

- 機密情報（API キー、パスワード）をコミットしない
- `.gitignore`を適切に設定
- 環境変数を使用
- 定期的な依存関係の更新

## チーム協力

- 定期的なコードレビュー
- ペアプログラミングの活用
- 技術的負債の管理
- ドキュメントの継続的更新