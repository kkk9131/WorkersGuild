# Workers Guild モバイルアプリ要件定義書 v2.0

## 1. プロジェクト概要

### 1.1 アプリケーション名

**Workers Guild** - ゲーミフィケーションタスク管理アプリ

### 1.2 目的とビジョン

- **目的**: 建設業界の足場職人チームおよび個人開発者向けの、タスク管理・スキル育成・収益管理を統合したモバイルアプリケーション
- **ビジョン**: ゲーム要素により日常業務を楽しく効率化し、チームワークと個人の成長を促進する

### 1.3 主要ステークホルダー

- **Primary**: 5人規模の建設チーム（リーダー + メンバー4名）
- **Secondary**: 個人開発者/フリーランサー
- **Future**: 最大20人規模のチーム対応

### 1.4 プラットフォーム

- iOS（iPhone 12以降推奨）
- Android（API Level 24以降）
- PWA（Progressive Web App）対応

## 2. 機能要件

### 2.1 認証・権限管理

#### 2.1.1 認証方式

- **Primary**: Email + パスワード認証
- **Secondary**: バイオメトリクス認証（Face ID/Touch ID/指紋）
- **OTP**: 初回ログイン時の確認コード

#### 2.1.2 ユーザーロール

| ロール         | 権限           | 機能アクセス                            |
| -------------- | -------------- | --------------------------------------- |
| **Individual** | 個人利用       | 個人タスク、スキル、収益管理            |
| **Leader**     | チーム管理者   | 全機能 + チーム管理、メンバー招待       |
| **Member**     | チームメンバー | 個人機能 + ギルド参加、チームタスク閲覧 |

### 2.2 コア機能

#### 2.2.1 タスク管理

- **カンバンボード**: To-Do → Doing → Review → Done
- **タスク属性**:
  - タイトル、説明、期限
  - 優先度（Low/Medium/High/Critical）
  - レアリティ（Common/Rare/Epic/Legendary）
  - 獲得EXP（10-100ポイント）
  - 添付ファイル（画像、PDF）
  - サブタスク（チェックリスト）
- **操作**:
  - ドラッグ&ドロップでステータス変更
  - スワイプで完了（右スワイプ）/削除（左スワイプ）
  - 長押しで詳細表示

#### 2.2.2 ゲーミフィケーション

- **レベルシステム**:
  - 初期レベル: 1
  - 最大レベル: 100
  - レベルアップ式: `次レベル必要EXP = 現在レベル × 100`
- **スキル育成**:
  - 5つのステータス（各0-100）:
    - Communication（コミュニケーション）
    - Leadership（リーダーシップ）
    - Safety（安全意識）
    - Technical（技術力）
    - Stamina（体力/持久力）
  - トレーニング効果:
    - Low: +2ポイント
    - Medium: +3ポイント
    - High: +4ポイント
- **進化システム**:
  - Stage 1: 初心者（平均スキル < 65）
  - Stage 2: 中級者（平均スキル 65-74）
  - Stage 3: 上級者（平均スキル 75-84）
  - Stage 4: マスター（平均スキル ≥ 85）

#### 2.2.3 収益管理

- **売上入力**:
  - 手動入力/OCRスキャン
  - カテゴリ分類
  - 月次/週次/日次集計
- **経費管理**:
  - レシートOCR読み取り
  - カテゴリ別分類（材料費、人件費、交通費等）
  - 承認ワークフロー（リーダーのみ）
- **利益率表示**:
  - リアルタイム計算
  - 目標値との比較
  - グラフ表示（円グラフ、折れ線グラフ）

#### 2.2.4 チーム機能

- **ギルド（チーム共有スペース）**:
  - チーム共通タスクボード
  - チャット機能
  - ファイル共有
  - チーム統計ダッシュボード
- **メンバー管理**（リーダーのみ）:
  - 招待コード発行
  - 権限設定
  - パフォーマンス確認
- **チーム目標**:
  - 月間/週間目標設定
  - 進捗トラッキング
  - 達成報酬（ボーナスEXP）

### 2.3 デュアルテーマシステム

#### 2.3.1 ゲームテーマ

- **視覚効果**:
  - グラデーション背景
  - ネオンカラー
  - グロー効果
  - パーティクルアニメーション
- **サウンド**:
  - タスク完了音
  - レベルアップファンファーレ
  - コイン獲得音
- **アニメーション**:
  - バウンス効果
  - パララックススクロール
  - 3Dトランジション

#### 2.3.2 ビジネステーマ

- **視覚効果**:
  - フラットデザイン
  - モノクロームカラー
  - 最小限のアニメーション
- **サウンド**: オプション（デフォルトOFF）
- **レイアウト**: 情報密度重視

### 2.4 AI機能

#### 2.4.1 タスク推奨

- 過去のタスク履歴から次のタスクを提案
- 優先度の自動判定
- 最適な担当者の推奨（チーム利用時）

#### 2.4.2 トレーニング生成

- パーソナライズされたトレーニング内容
- 弱点スキルの重点強化提案
- 進捗に応じた難易度調整

#### 2.4.3 チーム編成最適化

- スキルバランスを考慮したチーム提案
- タスクに応じた最適メンバー配置

## 3. 非機能要件

### 3.1 パフォーマンス

- **起動時間**: コールドスタート3秒以内
- **FPS**: 低スペックデバイスで50fps以上
- **メモリ使用量**: 最大200MB
- **バッテリー**: バックグラウンド時の最小消費

### 3.2 セキュリティ

- **認証**: Supabase Auth（JWT）
- **データ保護**:
  - RLS（Row Level Security）完全実装
  - 機密情報のSecureStore保存
  - 通信の暗号化（TLS 1.3）
- **プライバシー**:
  - GDPR準拠
  - 個人情報の最小収集原則

### 3.3 可用性・信頼性

- **稼働率**: 99.5%以上
- **オフライン対応**:
  - ローカルキャッシュで基本操作可能
  - 自動同期（オンライン復帰時）
- **データバックアップ**: 日次自動バックアップ

### 3.4 使いやすさ

- **アクセシビリティ**: WCAG 2.1 AA準拠
- **多言語対応**: 日本語/英語（初期リリース）
- **レスポンシブ**: 各種画面サイズ対応

### 3.5 保守性・拡張性

- **コード品質**:
  - TypeScript厳格モード
  - ESLint/Prettier統一
  - 単体テストカバレッジ80%以上
- **モジュール設計**:
  - 機能ごとの独立性
  - 共通コンポーネント化
- **ドキュメント**:
  - API仕様書完備
  - コンポーネントカタログ

## 4. 技術仕様

### 4.1 推奨技術スタック概要

```typescript
// 完全な技術スタック構成
{
  "frontend": "Expo React Native",
  "backend": "Supabase (PostgreSQL)",
  "state": "Zustand + React Query",
  "ui": "NativeWind + Custom Components",
  "animations": "Reanimated 3 + Skia",
  "ai": "OpenAI GPT-4o + Vision API",
  "deployment": "EAS Build/Update",
  "monitoring": "Sentry + Analytics"
}
```

### 4.2 フロントエンド技術スタック

#### 4.2.1 コアフレームワーク

| 技術             | バージョン | 理由                                  | 代替案           |
| ---------------- | ---------- | ------------------------------------- | ---------------- |
| **Expo SDK**     | 53.x       | 📱 クロスプラットフォーム開発の効率化 | React Native CLI |
| **React Native** | 0.79.5     | 🚀 ネイティブパフォーマンス           | Flutter, Ionic   |
| **TypeScript**   | 5.8.x      | 🛡️ 型安全性とコード品質向上           | JavaScript       |
| **Expo Router**  | v3         | 🧭 ファイルベースルーティング         | React Navigation |

#### 4.2.2 UI・スタイリング

| 技術                     | バージョン | 理由                                | 設定                 |
| ------------------------ | ---------- | ----------------------------------- | -------------------- |
| **NativeWind**           | 4.1.x      | 🎨 Tailwind CSSをReact Nativeで使用 | `tailwind.config.js` |
| **Tailwind CSS**         | 3.4.x      | ⚡ ユーティリティファーストCSS      | デュアルテーマ対応   |
| **React Native SVG**     | 15.11.x    | 🖼️ ベクター画像・アイコン表示       | アイコンシステム     |
| **Expo Linear Gradient** | 14.1.x     | 🌈 グラデーション背景               | ゲームテーマ用       |

#### 4.2.3 状態管理・データフェッチ

| 技術                  | バージョン | 理由                              | 用途                 |
| --------------------- | ---------- | --------------------------------- | -------------------- |
| **Zustand**           | 5.0.x      | 🏪 軽量でシンプルな状態管理       | グローバル状態       |
| **React Query v5**    | 5.x        | 🔄 サーバー状態管理・キャッシング | API データ           |
| **AsyncStorage**      | 2.1.x      | 💾 ローカルデータ永続化           | 設定・キャッシュ     |
| **Expo Secure Store** | Built-in   | 🔒 機密情報の安全な保存           | トークン・パスワード |

#### 4.2.4 アニメーション・グラフィック

| 技術                        | バージョン | 理由                              | 特徴       |
| --------------------------- | ---------- | --------------------------------- | ---------- |
| **React Native Reanimated** | 3.17.x     | ⚡ 高パフォーマンスアニメーション | 60fps保証  |
| **React Native Skia**       | Latest     | 🎮 2D グラフィック・カスタム描画  | ゲーム要素 |
| **Expo Three**              | Optional   | 🌐 軽量3Dグラフィック             | 進化演出   |
| **Lottie React Native**     | Optional   | 🎬 ベクターアニメーション         | 複雑な演出 |

### 4.3 バックエンド技術スタック

#### 4.3.1 BaaS プラットフォーム

| 技術                         | 理由                        | 機能                   | 代替案                |
| ---------------------------- | --------------------------- | ---------------------- | --------------------- |
| **Supabase**                 | 🛠️ 包括的なBaaS、PostgreSQL | 認証・DB・リアルタイム | Firebase, AWS Amplify |
| **PostgreSQL**               | 🐘 高性能リレーショナルDB   | メインデータ保存       | MongoDB, MySQL        |
| **Row Level Security (RLS)** | 🔐 データアクセス制御       | セキュリティ強化       | カスタム認可          |
| **Edge Functions**           | ⚡ サーバーレス処理         | AI処理・通知           | Vercel Functions      |

#### 4.3.2 AI・機械学習

| 技術                  | バージョン | 用途                    | コスト             |
| --------------------- | ---------- | ----------------------- | ------------------ |
| **OpenAI GPT-4o**     | Latest     | 🤖 テキスト生成・推奨   | $0.03/1K tokens    |
| **OpenAI Vision API** | Latest     | 👁️ OCR・画像解析        | $0.01/image        |
| **pgvector**          | Extension  | 🔍 ベクトル検索・類似度 | DB拡張             |
| **LangChain**         | Optional   | 🔗 AI パイプライン構築  | 複雑なワークフロー |

#### 4.3.3 ファイル・メディア管理

| 技術                     | 用途                | 容量  | 特徴               |
| ------------------------ | ------------------- | ----- | ------------------ |
| **Supabase Storage**     | 📁 ファイル管理     | 1GB〜 | CDN付き            |
| **Expo Image Picker**    | 📷 画像選択・撮影   | -     | カメラ・ギャラリー |
| **Expo Document Picker** | 📄 ドキュメント選択 | -     | PDF・Office対応    |

### 4.4 ネイティブ機能・デバイス統合

#### 4.4.1 認証・セキュリティ

| 技術                          | 機能                    | 対応OS      | 設定                    |
| ----------------------------- | ----------------------- | ----------- | ----------------------- |
| **Expo Local Authentication** | 👆 バイオメトリクス認証 | iOS/Android | Face ID, Touch ID, 指紋 |
| **Expo Crypto**               | 🔐 暗号化処理           | All         | パスワードハッシュ化    |
| **Expo Application**          | 📱 アプリ情報取得       | All         | バージョン管理          |

#### 4.4.2 通知・コミュニケーション

| 技術                   | 機能                  | プラットフォーム | 制限         |
| ---------------------- | --------------------- | ---------------- | ------------ |
| **Expo Notifications** | 🔔 プッシュ通知       | iOS/Android/Web  | APNs/FCM     |
| **Expo Haptics**       | 📳 触覚フィードバック | iOS/Android      | タスク完了時 |
| **Expo AV**            | 🔊 音声再生           | All              | 効果音・BGM  |

#### 4.4.3 カメラ・センサー

| 技術                       | 機能              | 用途              | 権限   |
| -------------------------- | ----------------- | ----------------- | ------ |
| **Expo Camera**            | 📸 カメラ撮影     | OCR・プロフィール | CAMERA |
| **Expo Image Manipulator** | ✂️ 画像編集       | リサイズ・圧縮    | -      |
| **Expo Barcode Scanner**   | 📊 バーコード読取 | 将来機能          | CAMERA |

### 4.5 開発・テスト・デプロイ

#### 4.5.1 開発ツール

| 技術                       | 用途              | 設定ファイル      | 特徴             |
| -------------------------- | ----------------- | ----------------- | ---------------- |
| **Expo Development Build** | 🔧 開発環境       | `app.json`        | ホットリロード   |
| **Metro Bundler**          | 📦 バンドラー     | `metro.config.js` | Fast Refresh     |
| **Flipper**                | 🐛 デバッグツール | Optional          | ネットワーク監視 |

#### 4.5.2 コード品質

| 技術            | 用途                        | 設定ファイル   | ルール          |
| --------------- | --------------------------- | -------------- | --------------- |
| **ESLint**      | 📝 静的解析                 | `.eslintrc.js` | Airbnb + Custom |
| **Prettier**    | 🎨 コードフォーマット       | `.prettierrc`  | 統一スタイル    |
| **Husky**       | 🐕 Git フック               | `.husky/`      | Pre-commit      |
| **lint-staged** | ⚡ ステージングファイル対象 | `package.json` | 効率化          |

#### 4.5.3 テストフレームワーク

| 技術                             | レベル         | カバレッジ目標 | 設定              |
| -------------------------------- | -------------- | -------------- | ----------------- |
| **Jest**                         | 単体テスト     | 80%以上        | `jest.config.js`  |
| **React Native Testing Library** | コンポーネント | 90%以上        | レンダリング      |
| **Detox**                        | E2E テスト     | 主要フロー     | `detox.config.js` |
| **Maestro**                      | UIテスト       | 代替案         | YAML設定          |

#### 4.5.4 ビルド・デプロイ

| 技術               | 用途                | プラットフォーム     | 特徴           |
| ------------------ | ------------------- | -------------------- | -------------- |
| **EAS Build**      | 📱 アプリビルド     | iOS/Android          | クラウドビルド |
| **EAS Update**     | 🔄 OTA アップデート | All                  | 即座に更新     |
| **EAS Submit**     | 🚀 ストア申請       | App Store/Play Store | 自動化         |
| **GitHub Actions** | 🤖 CI/CD            | All                  | 自動テスト     |

### 4.6 監視・分析・運用

#### 4.6.1 エラー監視

| 技術                          | 機能                  | プラン   | 統合             |
| ----------------------------- | --------------------- | -------- | ---------------- |
| **Sentry**                    | 🚨 エラートラッキング | 無料〜   | React Native SDK |
| **Expo Application Insights** | 📊 パフォーマンス監視 | Built-in | 自動収集         |
| **Flipper**                   | 🔍 開発時デバッグ     | 無料     | 開発環境のみ     |

#### 4.6.2 ユーザー分析

| 技術                   | 機能                    | GDPR対応 | 実装     |
| ---------------------- | ----------------------- | -------- | -------- |
| **Expo Analytics**     | 📈 使用状況分析         | Yes      | Built-in |
| **Mixpanel**           | 🎯 イベントトラッキング | Yes      | SDK統合  |
| **Google Analytics 4** | 📊 Web分析互換          | Yes      | Firebase |

### 4.7 パッケージ管理・バージョン管理

#### 4.7.1 依存関係管理

```json
{
  "packageManager": "npm 10.x",
  "nodeVersion": "18.x LTS",
  "expoVersion": "53.x",
  "lockfile": "package-lock.json",
  "security": "npm audit + Snyk"
}
```

#### 4.7.2 バージョニング戦略

```
- セマンティックバージョニング (1.0.0)
- Git Flow ブランチ戦略
- 自動バージョンアップ (EAS)
- リリースノート自動生成
```

### 4.8 推奨開発環境

#### 4.8.1 必須ツール

| ツール       | バージョン | 用途                     | インストール   |
| ------------ | ---------- | ------------------------ | -------------- |
| **Node.js**  | 18.x LTS   | 🌍 JavaScript ランタイム | nvm/brew       |
| **npm**      | 10.x       | 📦 パッケージ管理        | Node.js付属    |
| **Git**      | 2.40+      | 📝 バージョン管理        | brew/winget    |
| **Expo CLI** | Latest     | 🛠️ Expo ツール           | npm install -g |

#### 4.8.2 エディタ・IDE

| エディタ       | 拡張機能                   | 設定          | 利点               |
| -------------- | -------------------------- | ------------- | ------------------ |
| **VS Code**    | React Native Tools, ESLint | settings.json | 無料・軽量         |
| **WebStorm**   | Built-in RN support        | -             | 高機能・有料       |
| **Vim/Neovim** | coc-rn, copilot            | init.vim      | 高速・カスタマイズ |

#### 4.8.3 デバイス・シミュレータ

| プラットフォーム | ツール                  | 要件   | 特徴             |
| ---------------- | ----------------------- | ------ | ---------------- |
| **iOS**          | Xcode Simulator         | macOS  | App Store 申請   |
| **Android**      | Android Studio Emulator | All OS | Google Play 申請 |
| **Web**          | Browser DevTools        | All OS | プロトタイプ     |
| **物理デバイス** | Expo Go App             | -      | 実機テスト       |

### 4.9 パフォーマンス最適化技術

#### 4.9.1 レンダリング最適化

```typescript
// React.memo でコンポーネント最適化
const TaskCard = React.memo(({ task }) => {
  return <Card>{task.title}</Card>;
});

// useMemo でコンピューテッド値最適化
const expProgress = useMemo(() =>
  calculateExpProgress(currentExp, levelExp), [currentExp, levelExp]
);

// useCallback でイベントハンドラー最適化
const handleTaskComplete = useCallback((taskId) => {
  completeTask(taskId);
}, [completeTask]);
```

#### 4.9.2 アニメーション最適化

```typescript
// Reanimated 3 worklet 使用
const animatedStyle = useAnimatedStyle(() => {
  return {
    transform: [{ scale: withSpring(isPressed.value ? 0.95 : 1) }],
  };
});

// 60fps 保証設定
const config = {
  duration: 300,
  easing: Easing.out(Easing.quad),
};
```

#### 4.9.3 メモリ管理

```typescript
// 画像の遅延読み込み
<ExpoImage
  source={{ uri: imageUrl }}
  placeholder={require('./placeholder.png')}
  contentFit="cover"
  transition={200}
/>

// 無限スクロールでのメモリ効率
<FlatList
  data={tasks}
  renderItem={renderTaskCard}
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  windowSize={5}
/>
```

### 4.10 セキュリティ技術スタック

#### 4.10.1 認証セキュリティ

```typescript
// Supabase Auth + JWT
const supabase = createClient(url, anonKey, {
  auth: {
    storage: ExpoSecureStore,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// バイオメトリクス認証
await LocalAuthentication.authenticateAsync({
  promptMessage: 'ログインに生体認証を使用',
  fallbackLabel: 'パスワードを使用',
  disableDeviceFallback: false,
});
```

#### 4.10.2 データ暗号化

```typescript
// 機密データの保存
await SecureStore.setItemAsync('auth_token', token, {
  requireAuthentication: true,
  authenticationPrompt: 'トークンアクセスに認証が必要',
});

// 通信の暗号化
const apiClient = axios.create({
  baseURL: SUPABASE_URL,
  headers: {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${token}`,
  },
  timeout: 10000,
});
```

この推奨技術スタックにより、現代的で保守性が高く、パフォーマンスに優れたWorkers Guildアプリケーションを構築できます。

## 5. 画面構成

### 5.1 認証フロー

1. **スプラッシュ画面**
2. **ログイン画面**
3. **OTP確認画面**
4. **オンボーディング**（初回のみ）

### 5.2 メイン画面構成

```
┌─────────────────────────────────┐
│  Header (40px)                  │
│  ├─ Menu ☰                      │
│  ├─ Date/Title                  │
│  └─ Bell 🔔 | EXP Bar           │
├─────────────────────────────────┤
│                                 │
│  Content Area                   │
│  (Dynamic based on tab)         │
│                                 │
├─────────────────────────────────┤
│  Bottom Tab (56px)              │
│  ├─ Home                        │
│  ├─ Tasks                       │
│  ├─ Skills                      │
│  ├─ Profit                      │
│  └─ Menu                        │
└─────────────────────────────────┘
```

### 5.3 各画面詳細

#### 5.3.1 ホーム（ダッシュボード）

- **個人モード**: 個人統計、今日のタスク、スキル概要
- **リーダーモード**: チーム統計、メンバー状況、チーム目標
- **メンバーモード**: 個人統計、チームタスク、ギルド情報

#### 5.3.2 タスクボード

- 4列カンバン表示
- フィルター/ソート機能
- クイック追加FAB
- バッチ操作モード

#### 5.3.3 スキル管理

- レーダーチャート/バーグラフ切替
- 進化ステージ表示
- AIトレーニング提案
- 履歴グラフ

#### 5.3.4 収益管理

- 利益率ゲージ
- 売上/経費カード
- カテゴリ別円グラフ
- 期間比較グラフ

#### 5.3.5 設定メニュー

- アカウント管理
- テーマ切替
- 通知設定
- データ同期
- ヘルプ/サポート

## 6. データモデル

### 6.1 主要エンティティ

```typescript
// ユーザー
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
  created_at: Date;
  updated_at: Date;
}

// タスク
interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'doing' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'critical';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  exp_reward: number;
  due_date?: Date;
  assigned_to?: string;
  created_by: string;
  team_id?: string;
  subtasks?: Subtask[];
  attachments?: Attachment[];
}

// スキル
interface Skills {
  communication: number;
  leadership: number;
  safety: number;
  technical: number;
  stamina: number;
}

// チーム
interface Team {
  id: string;
  name: string;
  leader_id: string;
  member_ids: string[];
  invite_code: string;
  goals: TeamGoal[];
  created_at: Date;
}
```

## 7. API仕様概要

### 7.1 認証API

- `POST /auth/login` - ログイン
- `POST /auth/logout` - ログアウト
- `POST /auth/verify-otp` - OTP確認
- `POST /auth/refresh` - トークン更新

### 7.2 ユーザーAPI

- `GET /users/me` - 自分の情報取得
- `PATCH /users/me` - プロフィール更新
- `POST /users/me/skills/train` - スキルトレーニング

### 7.3 タスクAPI

- `GET /tasks` - タスク一覧
- `POST /tasks` - タスク作成
- `PATCH /tasks/:id` - タスク更新
- `DELETE /tasks/:id` - タスク削除
- `POST /tasks/:id/complete` - タスク完了

### 7.4 チームAPI

- `POST /teams` - チーム作成
- `GET /teams/:id` - チーム情報
- `POST /teams/join` - チーム参加
- `POST /teams/:id/invite` - 招待コード発行

## 8. 開発フェーズ

### Phase 1: 基盤構築（2週間）

- [ ] プロジェクト初期設定
- [ ] 認証システム実装
- [ ] 基本ナビゲーション
- [ ] デュアルテーマシステム

### Phase 2: コア機能（3週間）

- [ ] タスク管理CRUD
- [ ] レベル/EXPシステム
- [ ] スキル管理
- [ ] 基本的なアニメーション

### Phase 3: チーム機能（2週間）

- [ ] チーム作成/参加
- [ ] ギルド機能
- [ ] リアルタイム同期
- [ ] 権限管理

### Phase 4: 高度な機能（3週間）

- [ ] AI統合
- [ ] OCR機能
- [ ] 収益管理詳細
- [ ] プッシュ通知

### Phase 5: 品質向上（2週間）

- [ ] パフォーマンス最適化
- [ ] テスト実装
- [ ] バグ修正
- [ ] ドキュメント整備

## 9. リスクと対策

### 9.1 技術的リスク

| リスク                 | 影響         | 対策                               |
| ---------------------- | ------------ | ---------------------------------- |
| パフォーマンス低下     | UX悪化       | 事前プロファイリング、段階的最適化 |
| オフライン同期の複雑性 | データ不整合 | 楽観的更新、競合解決ロジック       |
| プラットフォーム差異   | 開発工数増   | Expo統一API使用                    |

### 9.2 ビジネスリスク

| リスク                 | 影響       | 対策                                   |
| ---------------------- | ---------- | -------------------------------------- |
| ユーザー定着率低下     | 収益減     | オンボーディング改善、定期アップデート |
| 建設現場での使いづらさ | 採用率低下 | 現場テスト、UIの継続改善               |

## 10. 成功指標（KPI）

### 10.1 ユーザーエンゲージメント

- **DAU/MAU比率**: 60%以上
- **平均セッション時間**: 5分以上
- **タスク完了率**: 70%以上

### 10.2 パフォーマンス指標

- **クラッシュフリー率**: 99.5%以上
- **平均応答時間**: 200ms以下
- **アプリサイズ**: 50MB以下

### 10.3 ビジネス指標

- **ユーザー継続率（30日）**: 40%以上
- **NPS（ネットプロモータースコア）**: 50以上
- **ストアレビュー**: 4.0以上

## 11. 将来の拡張計画

### 11.1 機能拡張

- Apple Watch/WearOS対応
- 音声入力/コマンド
- AR機能（現場での視覚化）
- 他システム連携（会計ソフト等）

### 11.2 市場拡張

- 多言語対応（中国語、ベトナム語等）
- 業界特化版（飲食、小売等）
- エンタープライズ版（大規模チーム対応）

## 12. 参考資料

- [Expo SDK 53 ドキュメント](https://docs.expo.dev/)
- [Supabase ドキュメント](https://supabase.com/docs)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [NativeWind](https://www.nativewind.dev/)
