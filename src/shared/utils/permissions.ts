import type { TModules } from '@shared/types/common';

export function GetPermissions(): object {
  return {
    DASHBOARD: 11,
    POPULATION: 12,
    HEALTH: 13,
    ECONOMY: 14,
    REPORTS: 15,
    NATIONPULSE_UX: 100,
    POPULATION_HEALTH_UX: 200,
    GOVERNMENT_ECONOMY_UX: 300,
    DOWNLOAD_REPORTS_UX: 400,
  };
}

export const modules = [
  {
    moduleIndex: 1,
    moduleID: 11,
    moduleName: 'Dashboard',
    path: '/',
    permissionID: 100,
    permissionIndex: 1,
  },
  {
    moduleIndex: 2,
    moduleID: 12,
    moduleName: 'Population',
    path: '/population',
    permissionID: 200,
    permissionIndex: 2,
  },
  {
    moduleIndex: 3,
    moduleID: 13,
    moduleName: 'Health',
    path: '/health',
    permissionID: 200,
    permissionIndex: 2,
  },
  {
    moduleIndex: 4,
    moduleID: 14,
    moduleName: 'Economy',
    path: '/economy',
    permissionID: 300,
    permissionIndex: 4,
  },
  {
    moduleIndex: 7,
    moduleID: 16,
    moduleName: 'Growth',
    path: '/growth',
    permissionID: 300,
    permissionIndex: 4,
  },
  {
    moduleIndex: 5,
    moduleID: 15,
    moduleName: 'Reports',
    path: '/reports',
    permissionID: 400,
    permissionIndex: 6,
  },
  {
    moduleIndex: 6,
    moduleID: 50,
    moduleName: 'Permissions',
    path: '/permissions',
    permissionID: 99,
    permissionIndex: 7,
  },
];

export function HasPermissions(path: string) {
  const mod = modules.find((m: TModules) => m.path === path);
  return !!mod; // if module is not registered, treat as public
}

export function GetUserModules(userPermissions: number[]) {
  // console.log({ userPermissions });
  const base = 11;
  const perms =
    userPermissions && userPermissions.length ? userPermissions : [];
  const userPermissionsSet = new Set([base, ...perms.map((p) => Number(p))]);
  return modules
    .filter((m) => m.moduleID != 16)
    .filter((m) => userPermissionsSet.has(m.moduleID));
}

export function UserHasAccess(path: string, userPermissions?: number[] | null) {
  const mod = modules.find((m: TModules) => m.path === path);
  if (!mod) return true; // unknown routes treated as public
  const perms =
    userPermissions && userPermissions.length ? userPermissions : [];
  const userPermissionsSet = new Set([11, ...perms.map((p) => Number(p))]);
  return userPermissionsSet.has(mod.moduleID);
}
