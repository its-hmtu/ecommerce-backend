import { plainToClass, ClassConstructor } from 'class-transformer';

export function toDto<T, V>(cls: ClassConstructor<T>, obj: V): T {
  return plainToClass(cls, obj, {
    excludeExtraneousValues: true,
  });
}
