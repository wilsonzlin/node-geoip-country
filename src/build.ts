import { readdir, readFile, writeFile } from "fs/promises";
import { join } from "path";
import { IpPrefixTrie } from "./trie";

(async () => {
  const files = await readdir(join(__dirname, "data", "ipv4"));
  const trie = new IpPrefixTrie();
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
      trie.add(line, country);
    }
  }
  await writeFile(join(__dirname, "data.json"), JSON.stringify(trie.root));
})().catch(console.error);
