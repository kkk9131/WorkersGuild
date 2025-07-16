# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

Workers Guild は建設業界の足場職人チーム向けのゲーミフィケーションタスク管理モバイルアプリケーションです。

### アーキテクチャ

- **フロントエンド**: Expo React Native (SDK 53.x)
- **バックエンド**: Supabase (PostgreSQL + Edge Functions)
- **状態管理**: Zustand + React Query
- **UI フレームワーク**: NativeWind (Tailwind CSS for React Native)
- **アニメーション**: React Native Reanimated 3 + Skia
- **AI機能**: OpenAI GPT-4o + Vision API

### 主要ディレクトリ構成（計画）

```
mobile/                    # Expo React Nativeアプリ
├── app/                   # Expo Router v3 ページ定義
├── components/            # 再利用可能なコンポーネント
├── hooks/                 # カスタムフック
├── lib/                   # ライブラリとユーティリティ
├── stores/                # Zustand状態管理
└── types/                 # TypeScript型定義

supabase/                  # バックエンド設定
├── migrations/            # データベース移行
├── functions/             # Edge Functions
└── policies/              # RLSポリシー
```

## 開発コマンド

### 基本コマンド（実装後に利用可能）

```bash
# 開発サーバー起動
npm run start

# iOS シミュレーター
npm run ios

# Android エミュレーター
npm run android

# Webブラウザ
npm run web

# 型チェック
npm run type-check

# リンター実行
npm run lint

# テスト実行
npm run test

# Supabaseローカル開発
supabase start
supabase stop
```

## 重要な設計原則

### デュアルテーマシステム

- **ゲームテーマ**: RPG風のファンタジー配色、グロー効果、パーティクル
- **ビジネステーマ**: プロフェッショナルなダークテーマ、ミニマルデザイン

### 役割ベースアクセス制御

- **Individual**: 個人利用者
- **Leader**: チーム管理者（全機能アクセス）
- **Member**: チームメンバー（制限付きアクセス）

### ゲーミフィケーション要素

- レベルシステム（1-100）
- 5つのスキルステータス（各0-100）
- 進化システム（4段階）
- EXP報酬（タスク完了時）

## 技術スタック詳細

### 認証・セキュリティ

- Supabase Auth（JWT）
- Expo Local Authentication（バイオメトリクス）
- Row Level Security（RLS）

### パフォーマンス最適化

- React.memo、useMemo、useCallback の活用
- Reanimated 3 worklet 使用
- 画像の遅延読み込み
- FlatList最適化

### 状態管理パターン

- Zustand でグローバル状態管理
- AsyncStorage で永続化
- 楽観的更新パターン

## コーディング規約

### 命名規則

- **ファイル**: kebab-case (`task-card.tsx`)
- **コンポーネント**: PascalCase (`TaskCard`)
- **フック**: camelCase with "use" prefix (`useAuth`)
- **定数**: SCREAMING_SNAKE_CASE (`MAX_TASKS_PER_USER`)
- **型**: PascalCase (`UserRole`, `TaskStatus`)

### TypeScript設定

- 厳格モード有効
- 型安全性を最優先
- interface使用推奨

### テスト要件

- 単体テスト: Jest + React Native Testing Library
- カバレッジ目標: 80%以上
- E2Eテスト: Detox

## データモデル（主要エンティティ）

### User

```typescript
interface User {
  id: string;
  email: string;
  name: string;
  role: 'individual' | 'leader' | 'member';
  level: number;
  exp: number;
  skills: Skills;
  evolution_stage: 1 | 2 | 3 | 4;
  team_id?: string;
}
```

### Task

```typescript
interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'doing' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'critical';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  exp_reward: number;
  assigned_to?: string;
  team_id?: string;
}
```

## 開発フェーズ

### Phase 1: 基盤構築

- プロジェクト初期設定（Expo + NativeWind）
- 認証システム実装
- 基本ナビゲーション（Expo Router）
- デュアルテーマシステム

### Phase 2: コア機能

- タスク管理CRUD
- レベル/EXPシステム
- スキル管理
- 基本的なアニメーション

### Phase 3: チーム機能

- チーム作成/参加
- ギルド機能
- リアルタイム同期
- 権限管理

### Phase 4: 高度な機能

- AI統合（OpenAI）
- OCR機能
- 収益管理詳細
- プッシュ通知

## 重要な注意事項

### セキュリティ

- 機密情報はExpo SecureStoreに保存
- API通信はHTTPS必須
- RLSポリシーでデータアクセス制御

### パフォーマンス

- 低スペックデバイスで50fps以上維持
- バッテリー効率を考慮
- メモリ使用量は最大200MB

### アクセシビリティ

- WCAG 2.1 AA準拠
- スクリーンリーダー対応
- カラーコントラスト比4.5:1以上

## 開発環境

### 必須ツール

- Node.js 18.x LTS
- Expo CLI Latest
- Android Studio（Android開発時）
- Xcode（iOS開発時、macOSのみ）

### 推奨エディタ拡張

- React Native Tools
- ESLint
- Prettier
- TypeScript Hero

このプロジェクトは現在設計・計画段階であり、実装はこれから開始する予定です。
