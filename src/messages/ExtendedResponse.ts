import type { BerReader } from 'asn1';

import type { ProtocolOperationValues } from '../ProtocolOperation';
import { ProtocolOperation } from '../ProtocolOperation';

import type { MessageResponseOptions } from './MessageResponse';
import { MessageResponse } from './MessageResponse';

export interface ExtendedResponseOptions extends MessageResponseOptions {
  oid?: string;
  value?: string;
}

export const ExtendedResponseProtocolOperations = {
  oid: 0x8a,
  value: 0x8b,
};

export class ExtendedResponse extends MessageResponse {
  public protocolOperation: ProtocolOperationValues;

  public oid?: string;

  public value?: string;

  public constructor(options: ExtendedResponseOptions) {
    super(options);
    this.protocolOperation = ProtocolOperation.LDAP_RES_EXTENSION;
    this.oid = options.oid;
    this.value = options.value;
  }

  public override parseMessage(reader: BerReader): void {
    super.parseMessage(reader);

    if (reader.peek() === ExtendedResponseProtocolOperations.oid) {
      this.oid = reader.readString(ExtendedResponseProtocolOperations.oid) ?? '';
    }

    if (reader.peek() === ExtendedResponseProtocolOperations.value) {
      this.value = reader.readString(ExtendedResponseProtocolOperations.value) ?? undefined;
    }
  }
}
