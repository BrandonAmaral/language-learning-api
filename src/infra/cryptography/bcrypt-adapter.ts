import { Hasher, HasherComparer } from '@/data/contracts';

import bcrypt from 'bcrypt';

export class BcryptAdapter implements Hasher, HasherComparer {
  constructor(private readonly salt: number) {}

  async hash(plaintext: string): Promise<string> {
    return bcrypt.hash(plaintext, this.salt);
  }

  async compare(plaintext: string, digest: string): Promise<boolean> {
    return bcrypt.compare(plaintext, digest);
  }
}
