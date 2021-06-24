import { IpPrefixTrie, IpPrefixTrieNode } from "./trie";

export class NodeGeoipCountryClient {
  private readonly trie: IpPrefixTrie;

  constructor(data: IpPrefixTrieNode) {
    this.trie = new IpPrefixTrie(data);
  }

  lookUp(ip: string): string | undefined {
    return this.trie.check(ip);
  }
}
