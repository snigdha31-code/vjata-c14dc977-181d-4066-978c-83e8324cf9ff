import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from './audit-log.entity';

@Injectable()
export class AuditLogService {
  constructor(
    @InjectRepository(AuditLog)
    private auditRepo: Repository<AuditLog>,
  ) {}

  log(user: any, action: string) {
    const entry = this.auditRepo.create({
      userEmail: user.email,
      role: user.role,
      action,
    });

    return this.auditRepo.save(entry);
  }

  findAll() {
    return this.auditRepo.find({ order: { timestamp: 'DESC' } });
  }
}
