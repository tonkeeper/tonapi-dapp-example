import { Address } from "@ton/core";

export const isValidAddress = (address: string): boolean => {
  return Address.isFriendly(address) || Address.isRaw(address);
}