import { CasbinRule } from 'typeorm-adapter';
import { CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity('casbin_rule')
export class CasbinRuleEntity extends CasbinRule {
  /*@CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;*/
}
