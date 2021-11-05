import faker from 'faker';

import { Hasher } from '@/data/contracts';

export class HasherSpy implements Hasher {
  plaintext: string;
  digest = faker.datatype.uuid();

  async hash(plaintext: string): Promise<string> {
    this.plaintext = plaintext;
    return this.digest;
  }
}
