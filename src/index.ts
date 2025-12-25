import { PermissionManager } from "./PermissionManager";

export const RoleHierarchy: { [key: string]: string[] } = {
  super_admin: ["admin"],
  admin: ["manager"],
  manager: ["proof_reader", "editor", "sales_manager"],
  sales_manager: ["user"],
  proof_reader: ["user"],
  editor: ["user"],
  user: [],
} as const;

export const Permissions: Record<string, string[]> = {
  superAdmin: [],
  admin: ["user:delete", "product:delete"],
  manager: ["user:create", "user:update"],
  proof_reader: ["product:update"],
  editor: ["product:create", "product:update"],
  user: ["product:read"],
} as const;

const user = {
  id: "123",
  name: "Joy das",
  roles: ["user", "premium_user"],
  permissions: ["product:read", "premium:review"],
};

new PermissionManager(user);
