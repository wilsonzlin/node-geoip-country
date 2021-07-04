import { readdir, readFile, writeFile } from "fs/promises";
import { join } from "path";
import { IpPrefixTrieNode, trieAdd } from "./trie";

(async () => {
  const files = await readdir(join(__dirname, "data", "ipv4"));
  const trie: IpPrefixTrieNode = [];
  for (const file of files) {
    if (!file.endsWith(".cidr")) {
      continue;
    }
    const country = file.slice(0, -5);
    const data = await readFile(join(__dirname, "data", "ipv4", file), "utf8");
    for (const line of data.split("\n")) {
      if (!line) {
        continue;
      }
      trieAdd(trie, line, country);
    }
  }
  await writeFile(join(__dirname, "data.json"), JSON.stringify(trie));
})().catch(console.error);
