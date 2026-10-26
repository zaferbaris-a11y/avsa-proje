#!/usr/bin/env python3
"""adres-sablonu.csv doldurulunca src/data/stays.ts içine streetAddress ve geo ekler.
Kullanım:  python3 scripts/adres-uygula.py
Yalnızca dolu hücreler işlenir; boş bırakılanlar değişmez. lat/lng ondalık nokta ile yazılmalı (40.49638)."""
import csv, re, sys
P = "src/data/stays.ts"
s = open(P, encoding="utf-8").read()
for r in csv.DictReader(open("scripts/adres-sablonu.csv", encoding="utf-8")):
    slug = r["slug"]
    i = s.find(f'slug: "{slug}"')
    if i < 0:
        print("bulunamadı:", slug); continue
    j = s.find('slug: "', i + 10); j = len(s) if j < 0 else j
    blk = s[i:j]
    if r["streetAddress"].strip():
        sa = r["streetAddress"].strip().replace('"', '\\"')
        if "streetAddress:" in blk:
            blk = re.sub(r'streetAddress: "[^"]*"', f'streetAddress: "{sa}"', blk)
        else:
            blk = re.sub(r'(\n    addressText: "[^"]*",)', rf'\1\n    streetAddress: "{sa}",', blk, count=1)
    if r["lat"].strip() and r["lng"].strip():
        lat, lng = float(r["lat"]), float(r["lng"])
        geo = f"geo: {{ lat: {lat}, lng: {lng} }},"
        if "geo:" in blk:
            blk = re.sub(r"geo: \{[^}]*\},", geo, blk)
        else:
            blk = re.sub(r'(\n    addressText: "[^"]*",)', rf"\1\n    {geo}", blk, count=1)
    s = s[:i] + blk + s[j:]
open(P, "w", encoding="utf-8").write(s)
print("tamam")
