export const USER_TYPES = Object.freeze({
    SUPER_ADMIN: 'super_admin',
    ADMIN: 'admin',
    MODERATOR: 'moderator',
    KASALO: 'kasalo',
    GUEST: 'guest',
} as const);

export const USER_STATUSES = Object.freeze({
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    SUSPENDED: 'suspended',
} as const);