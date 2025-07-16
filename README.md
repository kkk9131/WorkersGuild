# Workers Guild

建設業界の足場職人チーム向けのゲーミフィケーションタスク管理モバイルアプリケーション

## 🎯 プロジェクト概要

Workers Guildは、足場職人の作業効率向上とチームワーク強化を目的としたモバイルアプリです。RPG要素を取り入れたゲーミフィケーションにより、日々のタスク管理を楽しく効率的に行えます。

## ✨ 主な機能

### 🎮 ゲーミフィケーション要素
- **レベルシステム**: 1-100レベルの成長システム
- **5つのスキル**: 筋力・敏捷性・知性・持久力・カリスマ
- **進化システム**: 4段階の進化（レベル1, 25, 50, 75で進化）
- **EXP報酬**: タスクの希少度に応じた経験値獲得
- **ストリーク機能**: 連続作業日数の記録

### 📋 タスク管理
- **4段階ステータス**: todo → doing → review → done
- **優先度設定**: low, medium, high, urgent
- **希少度システム**: common, rare, epic, legendary
- **チーム・ギルド連携**: チーム内でのタスク共有

### 👥 チーム機能
- **チーム作成・参加**: 招待コードでの簡単参加
- **役割管理**: individual, leader, member
- **ギルドシステム**: 大規模グループでの協力

### 🔐 認証・セキュリティ
- **Supabase Auth**: 安全なユーザー認証
- **Row Level Security**: データベースレベルでのセキュリティ
- **Expo SecureStore**: 機密情報の安全な保存

## 🛠 技術スタック

### フロントエンド
- **React Native**: Expo SDK 53.x
- **TypeScript**: 型安全な開発
- **NativeWind**: Tailwind CSS for React Native
- **Expo Router**: ファイルベースルーティング
- **Zustand**: 軽量状態管理
- **React Query**: サーバー状態管理

### バックエンド
- **Supabase**: PostgreSQL + Edge Functions
- **Row Level Security**: データベースセキュリティ
- **Real-time subscriptions**: リアルタイム同期

### 開発ツール
- **ESLint + Prettier**: コード品質管理
- **TypeScript**: 型チェック
- **Git**: バージョン管理

## 🚀 セットアップ

### 前提条件
- Node.js 18.x LTS
- npm または yarn
- Expo CLI
- iOS Simulator または Android Emulator

### インストール

1. リポジトリのクローン
```bash
git clone https://github.com/[username]/workers-guild.git
cd workers-guild
```

2. 依存関係のインストール
```bash
npm install
```

3. 環境変数の設定
```bash
cp .env.example .env
# .envファイルにSupabaseの設定を追加
```

4. アプリの起動
```bash
npm start
```

## 📱 使用方法

### 初回セットアップ
1. アプリを起動
2. アカウントを作成
3. プロフィールを設定
4. チームまたはギルドに参加

### タスク管理
1. 新しいタスクを作成
2. 優先度と希少度を設定
3. タスクを進行（todo → doing → review → done）
4. 完了時にEXPを獲得

### レベルアップ
- タスク完了でEXPを獲得
- レベルアップでスキルポイント獲得
- 特定レベルで進化

## 🏗 プロジェクト構造

```
workers-guild/
├── app/                    # Expo Router ページ
│   ├── auth/              # 認証関連画面
│   ├── tabs/              # メインタブ画面
│   └── _layout.tsx        # ルートレイアウト
├── components/            # 再利用可能コンポーネント
│   ├── common/           # 共通コンポーネント
│   ├── game/             # ゲーム関連コンポーネント
│   └── ui/               # UIコンポーネント
├── stores/               # Zustand状態管理
│   ├── authStore.ts      # 認証状態
│   ├── taskStore.ts      # タスク状態
│   └── gameStore.ts      # ゲーム状態
├── lib/                  # ライブラリ設定
│   └── supabase.ts       # Supabase設定
├── types/                # TypeScript型定義
│   └── database.ts       # データベース型
├── hooks/                # カスタムフック
│   └── useAuth.ts        # 認証フック
└── docs/                 # ドキュメント
    ├── roadmap.md        # 開発ロードマップ
    └── requirements-v2.md # 要件定義
```

## 🗄 データベース設計

### 主要テーブル
- **user_profiles**: ユーザー情報、レベル、スキル
- **tasks**: タスク情報、ステータス、希少度
- **teams**: チーム情報
- **team_members**: チームメンバー関係
- **guilds**: ギルド情報
- **guild_members**: ギルドメンバー関係

## 🎨 デザインシステム

### テーマ
- **ゲームテーマ**: RPG風ファンタジーデザイン
- **ビジネステーマ**: プロフェッショナルダークテーマ

### カラーパレット
- プライマリ: ブルー系
- セカンダリ: グレー系
- アクセント: ゴールド系（レア要素）

## 🚧 開発ロードマップ

### Phase 1: 基盤構築 ✅
- プロジェクト初期設定
- 開発環境構築
- デュアルテーマシステム

### Phase 2: 認証とコア機能 ✅
- Supabaseバックエンド設定
- 認証システム実装
- 基本ナビゲーション
- ユーザープロフィール

### Phase 3: タスク管理とゲーミフィケーション 🚧
- タスクCRUD機能
- ゲーミフィケーション要素
- UI/UXコンポーネント

### Phase 4: チーム機能とリアルタイム同期
- チーム・ギルド機能
- リアルタイム同期

### Phase 5: 高度な機能とAI統合
- AI機能統合
- OCR機能
- 収益管理

### Phase 6: 最適化とテスト
- パフォーマンス最適化
- テスト実装
- アクセシビリティ対応

### Phase 7: デプロイとリリース
- 本番環境構築
- アプリストア対応
- 監視・分析

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細は[LICENSE](LICENSE)ファイルを参照してください。

## 📞 サポート

質問や問題がある場合は、[Issues](https://github.com/[username]/workers-guild/issues)で報告してください。

---

**Workers Guild** - 足場職人のための次世代タスク管理アプリ 🏗️⚡