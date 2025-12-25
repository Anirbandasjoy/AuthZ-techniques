import { RoleHierarchy } from "./index";

export interface PermissionContext {
  roles: string[];
  permissions: string[];
}

export class PermissionManager {
  private readonly cachedRoleHierarchy: Map<string, Set<string>> = new Map();
  private readonly cachedRolePermissions: Map<string, Set<string>> = new Map();

  constructor() {
    Object.keys(RoleHierarchy).forEach((role) => {
      this.cachedRoleHierarchy.set(role, this.computeRoleHierarchy(role));
    });
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
  }
}
