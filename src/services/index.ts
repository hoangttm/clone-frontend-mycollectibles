// API instance
export { default as api, healthCheck } from './api';

// Auth service
export { default as authService } from './authService';
export type {
  LoginRequest,
  LoginResponse,
  RegisterStartRequest,
  RegisterStartResponse,
  RegisterVerifyRequest,
  RegisterVerifyResponse,
  RegisterCompleteRequest,
  RegisterCompleteResponse,
  PasswordResetStartRequest,
  PasswordResetStartResponse,
  PasswordResetVerifyRequest,
  PasswordResetVerifyResponse,
  PasswordResetCompleteRequest,
  PasswordResetCompleteResponse,
  MeResponse,
  ApiError,
  SocialProvider,
  SocialLoginWebRequest,
  SocialLoginWithTokenRequest,
  SocialLoginRedirectResponse,
  SocialLoginUserResponse,
  SocialLoginResponse,
} from './authService';

// Cards service
export { default as cardsService } from './cardsService';
export type {
  Card,
  CardRarity,
  CardVisibility,
  CardOwnerType,
  CardAttachment,
  CardListParams,
  CardListResponse,
  CreateCardRequest,
  UpdateCardRequest,
  CardDetailsResponse,
  CardPriceRequest,
  CardVisibilityRequest,
  CardReviewTransaction,
  CardReviewResponse,
} from './cardsService';

// Pods service
export { default as podsService } from './podsService';
export type {
  Pod,
  PodType,
  PodStatus,
  PodVisibility,
  PodAttachment,
  PodListParams,
  PodListResponse,
  CreatePodRequest,
  UpdatePodRequest,
  PodDetailsResponse,
  PodBalanceResponse,
  PodVisibilityRequest,
} from './podsService';

// Explore service
export { default as exploreService } from './exploreService';
export type {
  ExploreCard,
  ExplorePod,
  ExploreParams,
  ExploreFeaturedResponse,
  ExplorePodsResponse,
} from './exploreService';

// Watchlist service
export { default as watchlistService } from './watchlistService';
export type {
  WatchlistItem,
  WatchlistItemType,
  WatchlistSortBy,
  WatchlistParams,
  WatchlistResponse,
  AddCardToWatchlistRequest,
  AddPodToWatchlistRequest,
  AddToWatchlistRequest,
} from './watchlistService';

// Ledger service
export { default as ledgerService } from './ledgerService';
export type {
  LedgerEntry,
  LedgerOwnerType,
  LedgerSortBy,
  LedgerListParams,
  LedgerListResponse,
  BalanceParams,
  BalanceResponse,
} from './ledgerService';

// Transactions service
export { default as transactionsService } from './transactionsService';
export type {
  Transaction,
  TransactionStatus,
  TransactionType,
  TransactionListParams,
  TransactionListResponse,
  BuyAssetRequest,
  SellAssetRequest,
  SubscriptionRequest,
  SubscriptionInKindRequest,
  RedemptionRequest,
  RedemptionInKindRequest,
  DepositRequest,
  WithdrawalRequest,
  ReversalRequest,
  ApproveRejectRequest,
} from './transactionsService';

// Storage service
export { default as storageService } from './storageService';
export type { UploadCategory, UploadResponse } from './storageService';

// Users service
export { default as usersService } from './usersService';
export type {
  PortfolioCard,
  PortfolioPod,
  PortfolioChartPoint,
  PortfolioSummary,
  PortfolioHoldings,
  PortfolioPieChart,
  PortfolioLineChart,
  PortfolioResponse,
  PortfolioPeriod,
} from './usersService';

// Pod Units service
export { default as podUnitsService } from './podUnitsService';
export type {
  PodUnit,
  PodUnitWithDetails,
  PodUnitsListParams,
  PodUnitsListResponse,
} from './podUnitsService';
