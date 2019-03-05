export enum CryptoType {
  METADATA, // Store group key in the document metadata and share with new members
  KEY_AGREEMENT_BD, // A new group key is generated at each join/leave members. Key never transits between members.
  NONE, // No encyption group key
}
