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

export function GetUserModules(userPermissions: number[]) {
  const modules: TModules[] = [
    {
      moduleID: 10,
      moduleName: 'Dashboard',
      path: '/',
    },
    {
      moduleID: 11,
      moduleName: 'Population',
      path: '/population',
    },
    {
      moduleID: 12,
      moduleName: 'Health',
      path: '/health',
    },
    {
      moduleID: 13,
      moduleName: 'Economy',
      path: '/economy',
    },
    {
      moduleID: 14,
      moduleName: 'Growth',
      path: '/growth',
    },
    {
      moduleID: 15,
      moduleName: 'Reports',
      path: '/reports',
    },
  ];
  console.log({ userPermissions });
  const userPermissionsSet =
    userPermissions && userPermissions.length
      ? new Set([10, ...userPermissions.map((p) => p as number)])
      : new Set([10]);
  return modules.filter((m) => userPermissionsSet.has(m.moduleID));
}
