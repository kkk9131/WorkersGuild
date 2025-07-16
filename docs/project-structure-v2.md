# Workers Guild v2.0 - 改善版ディレクトリ構成

## 1. プロジェクト全体構成

```
Workers_Guild-app/
├── docs/                           # ドキュメント
│   ├── requirements-v2.md          # 要件定義書 v2.0
│   ├── project-structure-v2.md     # 本ファイル
│   ├── api-database-design.md      # API・DB設計書
│   ├── implementation-guide.md     # 実装ガイド
│   ├── user-flows-and-specifications.md # ユーザーフロー
│   ├── roadmap.md                  # 開発ロードマップ
│   └── CLAUDE.md                   # AI開発アシスタント設定
├── mobile/                         # Expo React Nativeアプリ
├── supabase/                       # バックエンド設定（新規）
├── design/                         # デザインファイル（新規）
├── scripts/                        # 開発用スクリプト（新規）
├── .github/                        # GitHub Actions
├── README.md
├── .gitignore
└── package.json                    # ルートパッケージ管理
```

## 2. モバイルアプリ詳細構成（mobile/）

```
mobile/
├── app/                            # Expo Router v3 ページ定義
│   ├── (auth)/                     # 認証関連画面
│   │   ├── _layout.tsx            # 認証レイアウト
│   │   ├── login.tsx              # ログイン画面
│   │   ├── signup.tsx             # サインアップ画面
│   │   ├── verify-otp.tsx         # OTP確認画面
│   │   └── onboarding.tsx         # オンボーディング
│   ├── (tabs)/                     # メインタブナビゲーション
│   │   ├── _layout.tsx            # タブレイアウト
│   │   ├── index.tsx              # ホーム（ダッシュボード）
│   │   ├── personal.tsx           # 個人モード専用画面
│   │   ├── team.tsx               # チームリーダー専用画面
│   │   ├── member.tsx             # チームメンバー専用画面
│   │   ├── tasks.tsx              # タスクボード
│   │   ├── skills.tsx             # スキル管理
│   │   ├── profit.tsx             # 収益管理
│   │   ├── guild.tsx              # ギルド（チーム共有）
│   │   ├── roadmap.tsx            # ロードマップ
│   │   ├── revenue.tsx            # 売上詳細
│   │   └── settings.tsx           # 設定
│   ├── modals/                     # モーダル画面
│   │   ├── level-up.tsx           # レベルアップ演出
│   │   ├── task-detail.tsx        # タスク詳細
│   │   ├── skill-training.tsx     # スキルトレーニング
│   │   ├── add-expense.tsx        # 経費追加
│   │   ├── team-invite.tsx        # チーム招待
│   │   └── camera-ocr.tsx         # OCRカメラ
│   ├── team/                       # チーム関連サブページ
│   │   ├── manage.tsx             # チーム管理
│   │   ├── members.tsx            # メンバー一覧
│   │   ├── goals.tsx              # チーム目標
│   │   └── analytics.tsx          # チーム分析
│   ├── _layout.tsx                 # ルートレイアウト
│   ├── +not-found.tsx             # 404ページ
│   └── +html.tsx                  # HTML テンプレート（Web用）
├── components/                     # 再利用可能なコンポーネント
│   ├── common/                     # 汎用コンポーネント
│   │   ├── Button.tsx             # カスタムボタン
│   │   ├── Input.tsx              # フォーム入力
│   │   ├── Card.tsx               # カード表示
│   │   ├── Modal.tsx              # モーダルベース
│   │   ├── Toast.tsx              # トースト通知
│   │   ├── Loading.tsx            # ローディング表示
│   │   ├── EmptyState.tsx         # 空状態表示
│   │   ├── ErrorBoundary.tsx      # エラーハンドリング
│   │   └── SafeAreaWrapper.tsx    # セーフエリア対応
│   ├── navigation/                 # ナビゲーション関連
│   │   ├── TabBar.tsx             # カスタムタブバー
│   │   ├── Header.tsx             # ヘッダーコンポーネント
│   │   ├── DrawerMenu.tsx         # ドロワーメニュー
│   │   └── BackButton.tsx         # 戻るボタン
│   ├── auth/                       # 認証関連コンポーネント
│   │   ├── LoginForm.tsx          # ログインフォーム
│   │   ├── OTPInput.tsx           # OTP入力フィールド
│   │   ├── BiometricAuth.tsx      # バイオメトリクス認証
│   │   └── AuthGuard.tsx          # 認証ガード
│   ├── tasks/                      # タスク関連コンポーネント
│   │   ├── TaskCard.tsx           # タスクカード
│   │   ├── TaskBoard.tsx          # カンバンボード
│   │   ├── TaskForm.tsx           # タスク作成/編集フォーム
│   │   ├── TaskFilter.tsx         # タスクフィルター
│   │   ├── TaskSort.tsx           # タスクソート
│   │   ├── SubtaskList.tsx        # サブタスク一覧
│   │   ├── AttachmentUpload.tsx   # ファイルアップロード
│   │   └── TaskStats.tsx          # タスク統計
│   ├── gamification/               # ゲーミフィケーション
│   │   ├── ExpBar.tsx             # EXPバー
│   │   ├── LevelBadge.tsx         # レベル表示
│   │   ├── LevelUpAnimation.tsx   # レベルアップアニメーション
│   │   ├── ParticleSystem.tsx     # パーティクル効果
│   │   ├── ConfettiEffect.tsx     # コンフェッティ演出
│   │   ├── CoinBurst.tsx          # コイン演出
│   │   ├── EvolutionStage.tsx     # 進化ステージ表示
│   │   └── AchievementBadge.tsx   # 実績バッジ
│   ├── skills/                     # スキル関連コンポーネント
│   │   ├── RadarChart.tsx         # スキルレーダーチャート
│   │   ├── SkillBar.tsx           # スキルバー
│   │   ├── SkillProgress.tsx      # スキル進捗
│   │   ├── TrainingCard.tsx       # トレーニングカード
│   │   ├── SkillHistory.tsx       # スキル履歴
│   │   └── EvolutionTree.tsx      # 進化ツリー
│   ├── profit/                     # 収益関連コンポーネント
│   │   ├── ProfitGauge.tsx        # 利益率ゲージ
│   │   ├── SalesCard.tsx          # 売上カード
│   │   ├── ExpenseCard.tsx        # 経費カード
│   │   ├── CategoryChart.tsx      # カテゴリ円グラフ
│   │   ├── TrendChart.tsx         # トレンドグラフ
│   │   ├── OCRScanner.tsx         # OCRスキャナー
│   │   └── ReceiptCapture.tsx     # レシート撮影
│   ├── team/                       # チーム関連コンポーネント
│   │   ├── TeamCard.tsx           # チームカード
│   │   ├── MemberCard.tsx         # メンバーカード
│   │   ├── TeamStats.tsx          # チーム統計
│   │   ├── InviteCode.tsx         # 招待コード
│   │   ├── RoleSelector.tsx       # ロール選択
│   │   ├── TeamChat.tsx           # チームチャット
│   │   ├── GoalProgress.tsx       # 目標進捗
│   │   └── LeaderBoard.tsx        # リーダーボード
│   ├── themes/                     # テーマ関連コンポーネント
│   │   ├── ThemeProvider.tsx      # テーマプロバイダー
│   │   ├── ThemeToggle.tsx        # テーマ切り替え
│   │   ├── GameThemeWrapper.tsx   # ゲームテーマラッパー
│   │   ├── BusinessThemeWrapper.tsx # ビジネステーマラッパー
│   │   └── DynamicBackground.tsx  # 動的背景
│   └── forms/                      # フォーム関連コンポーネント
│       ├── FormField.tsx          # フォームフィールド
│       ├── DatePicker.tsx         # 日付選択
│       ├── ImagePicker.tsx        # 画像選択
│       ├── FileUpload.tsx         # ファイルアップロード
│       ├── MultiSelect.tsx        # 複数選択
│       └── ValidationMessage.tsx   # バリデーションメッセージ
├── hooks/                          # カスタムフック
│   ├── auth/                       # 認証関連フック
│   │   ├── useAuth.ts             # 認証状態管理
│   │   ├── useLogin.ts            # ログイン処理
│   │   ├── useLogout.ts           # ログアウト処理
│   │   ├── useBiometric.ts        # バイオメトリクス
│   │   └── usePermissions.ts      # 権限管理
│   ├── data/                       # データ関連フック
│   │   ├── useUser.ts             # ユーザー情報
│   │   ├── useTasks.ts            # タスクデータ
│   │   ├── useSkills.ts           # スキルデータ
│   │   ├── useProfit.ts           # 収益データ
│   │   ├── useTeam.ts             # チームデータ
│   │   └── useRealtime.ts         # リアルタイム同期
│   ├── gamification/               # ゲーミフィケーション関連
│   │   ├── useExp.ts              # EXP管理
│   │   ├── useLevelUp.ts          # レベルアップ処理
│   │   ├── useSkillTraining.ts    # スキルトレーニング
│   │   ├── useAchievements.ts     # 実績管理
│   │   └── useRewards.ts          # 報酬システム
│   ├── ui/                         # UI関連フック
│   │   ├── useTheme.ts            # テーマ管理
│   │   ├── useAnimation.ts        # アニメーション
│   │   ├── useToast.ts            # トースト通知
│   │   ├── useModal.ts            # モーダル管理
│   │   ├── useKeyboard.ts         # キーボード対応
│   │   └── useOrientation.ts      # 画面向き
│   ├── device/                     # デバイス機能関連
│   │   ├── useCamera.ts           # カメラ機能
│   │   ├── useHaptics.ts          # 触覚フィードバック
│   │   ├── useSounds.ts           # サウンド管理
│   │   ├── useNotifications.ts    # 通知管理
│   │   ├── useStorage.ts          # ストレージ管理
│   │   └── useOffline.ts          # オフライン対応
│   └── utils/                      # ユーティリティフック
│       ├── useDebounce.ts         # デバウンス処理
│       ├── useInterval.ts         # インターバル処理
│       ├── usePrevious.ts         # 前の値記憶
│       ├── useLocalStorage.ts     # ローカルストレージ
│       └── useClipboard.ts        # クリップボード
├── lib/                           # ライブラリとユーティリティ
│   ├── api/                       # API関連
│   │   ├── client.ts              # APIクライアント設定
│   │   ├── auth.ts                # 認証API
│   │   ├── users.ts               # ユーザーAPI
│   │   ├── tasks.ts               # タスクAPI
│   │   ├── skills.ts              # スキルAPI
│   │   ├── teams.ts               # チームAPI
│   │   ├── profit.ts              # 収益API
│   │   ├── ai.ts                  # AI機能API
│   │   └── types.ts               # API型定義
│   ├── database/                  # データベース関連
│   │   ├── supabase.ts            # Supabaseクライアント
│   │   ├── queries.ts             # クエリ関数
│   │   ├── mutations.ts           # ミューテーション関数
│   │   ├── realtime.ts            # リアルタイム機能
│   │   └── migrations.ts          # ローカルDB移行
│   ├── storage/                   # ストレージ関連
│   │   ├── secure.ts              # セキュアストレージ
│   │   ├── cache.ts               # キャッシュ管理
│   │   ├── files.ts               # ファイル管理
│   │   └── sync.ts                # 同期機能
│   ├── ai/                        # AI機能
│   │   ├── openai.ts              # OpenAI統合
│   │   ├── prompts.ts             # プロンプトテンプレート
│   │   ├── training.ts            # トレーニング生成
│   │   ├── recommendations.ts     # 推奨機能
│   │   └── ocr.ts                 # OCR機能
│   ├── theme/                     # テーマシステム
│   │   ├── tokens.ts              # デザイントークン
│   │   ├── game.ts                # ゲームテーマ定義
│   │   ├── business.ts            # ビジネステーマ定義
│   │   ├── animations.ts          # アニメーション設定
│   │   └── sounds.ts              # サウンド設定
│   ├── utils/                     # ユーティリティ関数
│   │   ├── format.ts              # フォーマット関数
│   │   ├── validation.ts          # バリデーション
│   │   ├── encryption.ts          # 暗号化処理
│   │   ├── device.ts              # デバイス情報
│   │   ├── date.ts                # 日付処理
│   │   ├── currency.ts            # 通貨処理
│   │   ├── permissions.ts         # 権限チェック
│   │   └── constants.ts           # 定数定義
│   ├── notifications/             # 通知システム
│   │   ├── push.ts                # プッシュ通知
│   │   ├── local.ts               # ローカル通知
│   │   ├── templates.ts           # 通知テンプレート
│   │   └── schedule.ts            # 通知スケジュール
│   └── analytics/                 # 分析・監視
│       ├── events.ts              # イベントトラッキング
│       ├── performance.ts         # パフォーマンス監視
│       ├── errors.ts              # エラートラッキング
│       └── usage.ts               # 使用状況分析
├── stores/                        # 状態管理（Zustand）
│   ├── auth.ts                    # 認証状態
│   ├── user.ts                    # ユーザー状態
│   ├── tasks.ts                   # タスク状態
│   ├── skills.ts                  # スキル状態
│   ├── profit.ts                  # 収益状態
│   ├── team.ts                    # チーム状態
│   ├── ui.ts                      # UI状態
│   ├── theme.ts                   # テーマ状態
│   ├── notifications.ts           # 通知状態
│   └── offline.ts                 # オフライン状態
├── types/                         # TypeScript型定義
│   ├── auth.ts                    # 認証関連型
│   ├── user.ts                    # ユーザー関連型
│   ├── task.ts                    # タスク関連型
│   ├── skill.ts                   # スキル関連型
│   ├── profit.ts                  # 収益関連型
│   ├── team.ts                    # チーム関連型
│   ├── gamification.ts            # ゲーミフィケーション型
│   ├── navigation.ts              # ナビゲーション型
│   ├── api.ts                     # API レスポンス型
│   └── global.ts                  # グローバル型
├── assets/                        # 静的アセット
│   ├── images/                    # 画像ファイル
│   │   ├── icons/                 # アプリアイコン
│   │   ├── illustrations/         # イラスト
│   │   ├── avatars/               # アバター画像
│   │   ├── backgrounds/           # 背景画像
│   │   └── badges/                # バッジ画像
│   ├── animations/                # アニメーションファイル
│   │   ├── lottie/                # Lottieアニメーション
│   │   └── gif/                   # GIFアニメーション
│   ├── sounds/                    # 音声ファイル
│   │   ├── effects/               # 効果音
│   │   ├── notifications/         # 通知音
│   │   └── music/                 # BGM
│   ├── fonts/                     # フォントファイル
│   └── videos/                    # 動画ファイル
├── constants/                     # 定数定義
│   ├── theme.ts                   # テーマ定数
│   ├── dimensions.ts              # 画面サイズ定数
│   ├── api.ts                     # API定数
│   ├── gamification.ts            # ゲーミフィケーション定数
│   └── features.ts                # 機能フラグ
├── locales/                       # 多言語対応
│   ├── ja/                        # 日本語
│   │   ├── common.json            # 共通翻訳
│   │   ├── auth.json              # 認証関連
│   │   ├── tasks.json             # タスク関連
│   │   └── skills.json            # スキル関連
│   └── en/                        # 英語
│       ├── common.json
│       ├── auth.json
│       ├── tasks.json
│       └── skills.json
├── tests/                         # テストファイル
│   ├── __mocks__/                 # モックファイル
│   ├── components/                # コンポーネントテスト
│   ├── hooks/                     # フックテスト
│   ├── stores/                    # ストアテスト
│   ├── utils/                     # ユーティリティテスト
│   ├── integration/               # 統合テスト
│   ├── e2e/                       # E2Eテスト（Detox）
│   └── setup.ts                   # テスト設定
├── docs/                          # アプリ固有ドキュメント
│   ├── components.md              # コンポーネントドキュメント
│   ├── api.md                     # API利用ガイド
│   ├── deployment.md              # デプロイメントガイド
│   └── testing.md                 # テストガイド
├── android/                       # Androidネイティブコード
├── ios/                           # iOSネイティブコード
├── web/                           # Web固有設定
├── package.json                   # 依存関係
├── app.json                       # Expo設定
├── metro.config.js               # Metro bundler設定
├── babel.config.js               # Babel設定
├── tailwind.config.js            # TailwindCSS設定
├── tsconfig.json                 # TypeScript設定
├── jest.config.js                # Jest設定
├── .eslintrc.js                  # ESLint設定
├── .prettierrc                   # Prettier設定
├── eas.json                      # EAS Build設定
└── .env.example                  # 環境変数テンプレート
```

## 3. バックエンド構成（supabase/）

```
supabase/
├── migrations/                    # データベース移行
│   ├── 20241201000001_initial_setup.sql
│   ├── 20241201000002_auth_tables.sql
│   ├── 20241201000003_tasks_tables.sql
│   ├── 20241201000004_skills_tables.sql
│   ├── 20241201000005_teams_tables.sql
│   ├── 20241201000006_profit_tables.sql
│   ├── 20241201000007_notifications_tables.sql
│   └── 20241201000008_ai_tables.sql
├── functions/                     # Edge Functions
│   ├── ai-training/              # AIトレーニング生成
│   │   └── index.ts
│   ├── ai-recommendations/       # AI推奨機能
│   │   └── index.ts
│   ├── ocr-processing/           # OCR処理
│   │   └── index.ts
│   ├── push-notifications/       # プッシュ通知
│   │   └── index.ts
│   ├── team-analytics/           # チーム分析
│   │   └── index.ts
│   ├── exp-calculation/          # EXP計算
│   │   └── index.ts
│   └── shared/                   # 共有ユーティリティ
│       ├── database.ts
│       ├── auth.ts
│       └── types.ts
├── seed/                         # テストデータ
│   ├── users.sql
│   ├── tasks.sql
│   ├── skills.sql
│   └── teams.sql
├── policies/                     # RLS（Row Level Security）ポリシー
│   ├── users.sql
│   ├── tasks.sql
│   ├── teams.sql
│   └── profit.sql
├── config.toml                   # Supabase設定
└── .env.example                  # 環境変数テンプレート
```

## 4. デザインシステム（design/）

```
design/
├── tokens/                       # デザイントークン
│   ├── colors.json               # カラーパレット
│   ├── typography.json           # タイポグラフィ
│   ├── spacing.json              # スペーシング
│   ├── shadows.json              # シャドウ定義
│   └── animations.json           # アニメーション設定
├── components/                   # コンポーネント仕様
│   ├── buttons.figma             # ボタンコンポーネント
│   ├── cards.figma               # カードコンポーネント
│   ├── forms.figma               # フォームコンポーネント
│   └── navigation.figma          # ナビゲーション
├── screens/                      # 画面デザイン
│   ├── auth/
│   ├── dashboard/
│   ├── tasks/
│   ├── skills/
│   ├── profit/
│   └── settings/
├── prototypes/                   # プロトタイプ
│   ├── user-flow.figma           # ユーザーフロー
│   └── interactions.figma        # インタラクション
├── assets/                       # デザインアセット
│   ├── icons/                    # アイコンセット
│   ├── illustrations/            # イラスト
│   └── mockups/                  # モックアップ
└── brand/                        # ブランドガイド
    ├── logo.svg                  # ロゴデータ
    ├── brand-guidelines.pdf      # ブランドガイドライン
    └── style-guide.pdf           # スタイルガイド
```

## 5. 開発ツール・スクリプト（scripts/）

```
scripts/
├── setup/                        # セットアップスクリプト
│   ├── install-dependencies.sh   # 依存関係インストール
│   ├── setup-env.sh              # 環境設定
│   ├── init-supabase.sh          # Supabaseセットアップ
│   └── configure-ide.sh          # IDE設定
├── development/                  # 開発用スクリプト
│   ├── start-dev.sh              # 開発サーバー起動
│   ├── reset-database.sh         # DB リセット
│   ├── seed-data.sh              # テストデータ投入
│   ├── clear-cache.sh            # キャッシュクリア
│   └── generate-icons.sh         # アイコン生成
├── build/                        # ビルド用スクリプト
│   ├── build-android.sh          # Android ビルド
│   ├── build-ios.sh              # iOS ビルド
│   ├── build-web.sh              # Web ビルド
│   └── optimize-assets.sh        # アセット最適化
├── deploy/                       # デプロイ用スクリプト
│   ├── deploy-staging.sh         # ステージング環境
│   ├── deploy-production.sh      # 本番環境
│   ├── update-ota.sh             # OTA アップデート
│   └── rollback.sh               # ロールバック
├── maintenance/                  # メンテナンス用
│   ├── backup-database.sh        # DBバックアップ
│   ├── cleanup-storage.sh        # ストレージクリーンアップ
│   ├── update-dependencies.sh    # 依存関係更新
│   └── security-audit.sh         # セキュリティ監査
└── testing/                      # テスト用スクリプト
    ├── run-unit-tests.sh         # 単体テスト実行
    ├── run-integration-tests.sh  # 統合テスト実行
    ├── run-e2e-tests.sh          # E2Eテスト実行
    ├── coverage-report.sh        # カバレッジレポート
    └── performance-test.sh       # パフォーマンステスト
```

## 6. CI/CD設定（.github/）

```
.github/
├── workflows/                    # GitHub Actions
│   ├── ci.yml                    # 継続的インテグレーション
│   ├── build-android.yml         # Android ビルド
│   ├── build-ios.yml             # iOS ビルド
│   ├── deploy-staging.yml        # ステージング自動デプロイ
│   ├── deploy-production.yml     # 本番デプロイ
│   ├── code-quality.yml          # コード品質チェック
│   ├── security-scan.yml         # セキュリティスキャン
│   └── dependency-update.yml     # 依存関係自動更新
├── ISSUE_TEMPLATE/               # Issue テンプレート
│   ├── bug_report.md
│   ├── feature_request.md
│   └── performance_issue.md
├── PULL_REQUEST_TEMPLATE.md      # PR テンプレート
└── dependabot.yml                # Dependabot 設定
```

## 7. 設定ファイル詳細

### 7.1 主要設定ファイル

| ファイル             | 目的             | 説明                           |
| -------------------- | ---------------- | ------------------------------ |
| `package.json`       | 依存関係管理     | npm パッケージとスクリプト定義 |
| `app.json`           | Expo 設定        | アプリメタデータ、ビルド設定   |
| `eas.json`           | EAS Build/Update | ビルド・更新設定               |
| `metro.config.js`    | バンドラー設定   | React Native メトロ設定        |
| `tailwind.config.js` | スタイル設定     | NativeWind / Tailwind 設定     |
| `tsconfig.json`      | TypeScript設定   | 型チェック、コンパイル設定     |

### 7.2 環境変数管理

```
.env.local                        # ローカル開発環境
.env.staging                      # ステージング環境
.env.production                   # 本番環境
.env.example                      # 環境変数テンプレート

# 必要な環境変数
EXPO_PUBLIC_SUPABASE_URL=         # Supabase URL
EXPO_PUBLIC_SUPABASE_ANON_KEY=    # Supabase匿名キー
SUPABASE_SERVICE_ROLE_KEY=        # Supabaseサービスロールキー
OPENAI_API_KEY=                   # OpenAI APIキー
SENTRY_DSN=                       # Sentry DSN（エラートラッキング）
```

## 8. 開発フロー

### 8.1 新機能開発手順

1. **計画**: 要件定義書・ディレクトリ構成確認
2. **設計**: コンポーネント設計・API設計
3. **実装**: TDD（テスト駆動開発）で実装
4. **テスト**: 単体・統合・E2Eテスト実行
5. **レビュー**: コードレビュー・デザインレビュー
6. **デプロイ**: ステージング→本番デプロイ

### 8.2 命名規則

- **ファイル**: kebab-case (`task-card.tsx`)
- **コンポーネント**: PascalCase (`TaskCard`)
- **フック**: camelCase with "use" prefix (`useAuth`)
- **定数**: SCREAMING_SNAKE_CASE (`MAX_TASKS_PER_USER`)
- **型**: PascalCase (`UserRole`, `TaskStatus`)

### 8.3 コミット規則

```
feat: 新機能追加
fix: バグ修正
docs: ドキュメント更新
style: スタイル変更（フォーマット等）
refactor: リファクタリング
test: テスト追加・修正
chore: その他メンテナンス

例:
feat(tasks): タスクカードのドラッグ&ドロップ機能追加
fix(auth): ログイン時の認証エラーハンドリング修正
```

## 9. パフォーマンス最適化指針

### 9.1 コード分割

- **画面レベル**: React.lazy() による遅延ローディング
- **コンポーネントレベル**: 条件付きレンダリングの最適化
- **バンドルレベル**: Metro bundler の最適化設定

### 9.2 リソース最適化

- **画像**: WebP形式、適切なサイズ変換、遅延読み込み
- **フォント**: サブセット化、プリロード
- **アニメーション**: React Native Reanimated の worklet 使用

### 9.3 状態管理最適化

- **メモ化**: React.memo、useMemo、useCallback の適切な使用
- **ストア分割**: 機能別 Zustand ストアで不要な再レンダリング防止
- **リアルタイム**: 必要な時のみ Supabase Realtime 接続

## 10. セキュリティ考慮事項

### 10.1 認証・認可

- JWT トークンの安全な管理
- バイオメトリクス認証の実装
- セッション管理とタイムアウト

### 10.2 データ保護

- 機密情報の Secure Store 保存
- 通信の暗号化（TLS 1.3）
- RLS ポリシーによるデータアクセス制御

### 10.3 アプリセキュリティ

- コード難読化（本番ビルド時）
- 証明書ピンニング
- 動的解析対策

## 11. 品質保証

### 11.1 テスト戦略

- **単体テスト**: Jest + React Native Testing Library（カバレッジ 80%以上）
- **統合テスト**: API 統合テスト
- **E2Eテスト**: Detox によるユーザーシナリオテスト
- **パフォーマンステスト**: 低スペックデバイスでの動作確認

### 11.2 コード品質

- **ESLint**: 静的解析とコード規約チェック
- **Prettier**: コードフォーマット統一
- **TypeScript**: 厳格な型チェック
- **SonarQube**: コード品質継続監視

### 11.3 ユーザビリティ

- **アクセシビリティ**: WCAG 2.1 AA 準拠
- **パフォーマンス**: 低スペックデバイスでの動作保証
- **国際化**: 多言語対応の基盤整備

このディレクトリ構成により、スケーラブルで保守性の高いWorkers Guildアプリケーションの開発が可能になります。
