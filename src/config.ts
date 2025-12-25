export const RoleHierarchy: Record<string, string[]> = {
  super_admin: ["admin"],
  admin: ["manager"],
  manager: ["proof_reader", "editor", "sales_manager"],
  sales_manager: ["user"],
  proof_reader: ["user"],
  editor: ["user"],
  premium_user: ["user"],
  user: [],
} as const;

export const RoleBasedPermissions: Record<string, string[]> = {
  super_admin: [],
  admin: ["user:delete", "product:delete"],
  manager: ["user:create", "user:update"],
  proof_reader: ["product:update"],
  editor: ["product:create", "product:update"],
  premium_user: ["product:read", "premium:review"],
  user: ["product:read"],
} as const;
