export class PermissionDto {
  resourceId: string;
  // quien puede editar, puede ver
  action: 'write' | 'read' | 'edit' | 'delete';
  type: 'denied' | 'allowed';
}
