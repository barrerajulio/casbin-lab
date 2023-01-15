import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class PermissionDto {
  @IsString()
  @IsNotEmpty()
  resourceId: string;

  @IsString()
  @IsEnum(['GET', 'POST', 'PUT', 'DELETE'])
  @IsNotEmpty()
  action: 'GET' | 'POST' | 'PUT' | 'DELETE';

  @IsString()
  @IsEnum(['deny', 'allow'])
  @IsNotEmpty()
  effect: 'deny' | 'allow';
}
