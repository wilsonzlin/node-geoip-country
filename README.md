# node-geoip-country

Look up the country associated with an IPv4 address.

## Usage

Add the client library to your Node.js module:

```bash
npm i node-geoip-country
```

The client can be used like so:

```ts
import { NodeGeoipCountryClient } from "node-geoip-country";

const client = new NodeGeoipCountryClient(data);
const countryIso2Code = client.lookUp("8.8.8.8");
```

## Data

The data is built and stored separately from the library, to avoid tying library and data versions and allow different datasets.

This repo will generate data based on [herrbischoff/country-ip-blocks](https://github.com/herrbischoff/country-ip-blocks) and upload it to https://wilsonl.in/node-geoip-country/data.json every hour. To use it, simply fetch and parse as JSON, then provide to the client constructor.

To build or use custom data, the structure should match the `IpPrefixTrieNode` type:

```ts
export type IpPrefixTrieNode = [IpPrefixTrieNode?, IpPrefixTrieNode?, string?];
```

It's a bit string trie data structure, represented as a JSON-compact array, where the first element represents any `0` child, the second represents any `1` child, and the third represents the node's value (i.e. country) if available.

During lookup, an IPv4 address is converted into a 32-digit bit string and the longest match is used as the result.
