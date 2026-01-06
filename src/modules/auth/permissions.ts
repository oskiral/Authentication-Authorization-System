export const PERMISSIONS = {
  USER: 1 << 0,        // 0001
  MODERATOR: 1 << 1,   // 0010
  ADMIN: 1 << 2,       // 0100
} as const;