import { IpPrefixTrieNode, trieCheck } from "./trie";

export class NodeGeoipCountryClient {
  private readonly trie: IpPrefixTrieNode;

  constructor(data: IpPrefixTrieNode) {
    this.trie = data;
  }

  lookUp(ip: string): string | undefined {
    return trieCheck(this.trie, ip);
  }
}
