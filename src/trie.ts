// Use compact array representation for compact data.json.
export type IpPrefixTrieNode = [IpPrefixTrieNode?, IpPrefixTrieNode?, string?];

const getIpAddrBits = (addr: string) =>
  addr
    .split(".")
    .flatMap((p) =>
      [...Number.parseInt(p, 10).toString(2).padStart(8, "0")].map((c) =>
        c == "0" ? 0 : 1
      )
    );

export const trieAdd = (
  root: IpPrefixTrieNode,
  cidr: string,
  country: string
) => {
  if (!/^(\d{1,3}\.){3}\d{1,3}\/\d{1,2}$/.test(cidr)) {
    throw new SyntaxError(`Invalid CIDR: ${cidr}`);
  }
  const [addr, len] = cidr.split("/");
  const binStr = getIpAddrBits(addr).slice(0, +len);
  let cur = root;
  for (const bit of binStr) {
    cur = cur[bit] ??= [];
  }
  if (cur[2] !== undefined && cur[2] !== country) {
    console.warn(
      `Conflict for ${cidr}: ${cur[2]} will be replaced with ${country}`
    );
  }
  cur[2] = country;
};

export const trieCheck = (
  root: IpPrefixTrieNode,
  ip: string
): string | undefined => {
  const bits = getIpAddrBits(ip);
  let m: string | undefined = undefined;
  let cur: IpPrefixTrieNode | undefined = root;
  for (const bit of bits) {
    cur = cur[bit] as IpPrefixTrieNode | undefined;
    if (!cur) {
      break;
    }
    if (cur[2] != undefined) {
      m = cur[2];
    }
  }
  return m;
};
