import { RoleBasedPermissions, RoleHierarchy } from "./config";

export interface PermissionContext {
  roles: string[];
  permissions: string[];
}

export class PermissionManager {
  private readonly cachedRoleHierarchy: Map<string, Set<string>> = new Map();
  private readonly cachedRolePermissions: Map<string, Set<string>> = new Map();

  constructor(
    private readonly context: PermissionContext = { roles: [], permissions: [] }
  ) {
    Object.keys(RoleHierarchy).forEach((role) => {
      this.cachedRoleHierarchy.set(role, this.computeRoleHierarchy(role));
    });
    Object.keys(RoleBasedPermissions).forEach((role) => {
      this.cachedRolePermissions.set(role, this.computeRolePermissions(role));
    });
    console.log(this.cachedRolePermissions);
  }

  hasPermission(permission: string): boolean {
    if (this.context.permissions.includes(permission)) {
      return true;
    }
    return false;
  }

  private computeRoleHierarchy(
    role: string,
    visited: Set<string> = new Set<string>()
  ) {
    const result = new Set<string>();
    if (visited.has(role)) {
      return result;
    }

    visited.add(role);

    const inheritedRoles = RoleHierarchy[role] || [];
    inheritedRoles.forEach((inheritedRole) => {
      result.add(inheritedRole);
      const inheritedRoleHierarchy = this.computeRoleHierarchy(
        inheritedRole,
        visited
      );
      inheritedRoleHierarchy.forEach((r) => result.add(r));
    });
    return result;
  }

  private computeRolePermissions(
    role: string,
    visited: Set<string> = new Set<string>()
  ) {
    const result = new Set<string>();
    if (visited.has(role)) {
      return result;
    }

    visited.add(role);

    RoleBasedPermissions[role]?.forEach((permission) => result.add(permission));
    const hierarchySet = this.cachedRoleHierarchy.get(role);

    hierarchySet?.forEach((inheritedRole) => {
      RoleBasedPermissions[inheritedRole]?.forEach((permission) =>
        result.add(permission)
      );
    });
    return result;
  }
}
