import { readFile } from "fs/promises";
import { join } from "path";
import { NodeGeoipCountryClient } from "./client";

test(
  "correctly identifies countries",
  async () => {
    const data = JSON.parse(
      await readFile(join(__dirname, "data.json"), "utf8")
    );
    const client = new NodeGeoipCountryClient(data);
    for (const [ip, expected] of [
      ["203.36.190.11", "au"],
      ["161.148.164.31", "br"],
      ["205.193.215.159", "ca"],
      ["121.204.246.195", "cn"],
      ["91.236.122.136", "de"],
      ["213.121.43.137", "gb"],
      ["164.100.61.151", "in"],
      ["146.171.248.36", "nz"],
      ["95.173.136.168", "ru"],
      ["78.93.235.233", "sa"],
      ["8.8.8.8", "us"],
      ["163.195.1.225", "za"],
    ] as const) {
      expect(client.lookUp(ip)).toStrictEqual(expected);
    }
  },
  1000 * 60 * 10
);
