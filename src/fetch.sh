#!/usr/bin/env bash

set -Euxo pipefail

shopt -s nullglob

pushd "$(dirname "$0")" >/dev/null

rm -rf data
mkdir data
# Other potential sources (will require different processing code):
# - http://www.ipdeny.com/ipblocks/data/aggregated/
# - https://db-ip.com/db/download/ip-to-country-lite
curl -fLSs 'https://github.com/herrbischoff/country-ip-blocks/archive/master.tar.gz' | tar -zxf - -C data --strip-components 1

popd >/dev/null
