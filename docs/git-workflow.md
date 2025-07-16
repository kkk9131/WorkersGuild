# Git ワークフローとブランチ戦略

## ブランチ戦略

Workers Guild プロジェクトでは、以下のGit Flowベースのブランチ戦略を採用します。

### 主要ブランチ

1. **main** (本番環境)
   - 常に本番環境にデプロイ可能な状態を維持
   - 直接のコミットは禁止
   - releaseブランチからのマージのみ許可

2. **develop** (開発環境)
   - 開発の中心となるブランチ
   - featureブランチはここから派生し、ここにマージ
   - 常にビルド可能な状態を維持

### サポートブランチ

3. **feature/** (機能開発)
   - 命名規則: `feature/[issue-number]-[brief-description]`
   - 例: `feature/123-add-user-authentication`
   - developから派生し、developにマージ

4. **release/** (リリース準備)
   - 命名規則: `release/v[version-number]`
   - 例: `release/v1.0.0`
   - developから派生し、mainとdevelopにマージ

5. **hotfix/** (緊急修正)
   - 命名規則: `hotfix/[issue-number]-[brief-description]`
   - 例: `hotfix/456-fix-critical-bug`
   - mainから派生し、mainとdevelopにマージ

## コミットメッセージ規約

### フォーマット

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type (必須)

- **feat**: 新機能
- **fix**: バグ修正
- **docs**: ドキュメントのみの変更
- **style**: コードの意味に影響を与えない変更（空白、フォーマット等）
- **refactor**: バグ修正や機能追加を伴わないコード変更
- **perf**: パフォーマンス改善
- **test**: テストの追加や修正
- **chore**: ビルドプロセスやツールの変更

### Scope (オプション)

影響を受けるモジュールやコンポーネント名

- auth
- task
- user
- team
- ui
- api

### 例

```
feat(auth): バイオメトリクス認証を追加

Face IDとTouch IDによる認証機能を実装しました。
Expo Local Authenticationを使用しています。

Closes #123
```

## ワークフロー

### 1. 新機能開発

```bash
# developブランチから新しいfeatureブランチを作成
git checkout develop
git pull origin develop
git checkout -b feature/123-new-feature

# 作業とコミット
git add .
git commit -m "feat(module): 新機能の説明"

# リモートにプッシュ
git push origin feature/123-new-feature

# Pull Requestを作成してdevelopにマージ
```

### 2. リリース準備

```bash
# developからreleaseブランチを作成
git checkout develop
git checkout -b release/v1.0.0

# バージョン番号の更新やリリースノートの作成
# バグ修正があれば実施

# mainとdevelopにマージ
git checkout main
git merge --no-ff release/v1.0.0
git tag v1.0.0

git checkout develop
git merge --no-ff release/v1.0.0
```

### 3. 緊急修正

```bash
# mainからhotfixブランチを作成
git checkout main
git checkout -b hotfix/456-critical-fix

# 修正を実施
git commit -m "fix: 緊急バグの修正"

# mainとdevelopにマージ
git checkout main
git merge --no-ff hotfix/456-critical-fix
git tag v1.0.1

git checkout develop
git merge --no-ff hotfix/456-critical-fix
```

## プルリクエストのルール

1. **レビュー必須**: 最低1名のレビューと承認が必要
2. **CI/CDパス**: すべてのテストとビルドが成功している必要
3. **コンフリクト解消**: マージ前にコンフリクトを解消
4. **スクワッシュマージ**: featureブランチはスクワッシュマージを推奨

## 保護ルール

### mainブランチ

- 直接プッシュ禁止
- Pull Request必須
- レビュー承認必須
- CI/CDパス必須

### developブランチ

- 直接プッシュ禁止
- Pull Request必須
- CI/CDパス必須
