import faker from 'faker';

import { Hasher, HasherComparer, Encrypter, Decrypter } from '@/data/contracts';

export class HasherSpy implements Hasher {
  plaintext: string;
  digest = faker.datatype.uuid();

  async hash(plaintext: string): Promise<string> {
    this.plaintext = plaintext;
    return this.digest;
  }
}

export class HasherComparerSpy implements HasherComparer {
  plaintext: string | undefined;
  digest: string | undefined;
  isValid = true;

  async compare(plaintext: string, digest: string): Promise<boolean> {
    this.plaintext = plaintext;
    this.digest = digest;
    return this.isValid;
  }
}

export class EncrypterSpy implements Encrypter {
  plaintext: string | undefined;
  ciphertext = faker.datatype.uuid();

  async encrypt(plaintext: string): Promise<string> {
    this.plaintext = plaintext;
    return this.ciphertext;
  }
}

export class DecrypterSpy implements Decrypter {
  plaintext = faker.internet.password();
  ciphertext: string;

  async decrypt(ciphertext: string): Promise<string> {
    this.ciphertext = ciphertext;
    return this.plaintext;
  }
}
