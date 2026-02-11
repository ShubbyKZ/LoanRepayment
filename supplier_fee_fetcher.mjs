#!/usr/bin/env node
import fs from "node:fs/promises";

async function main() {
  const configPath = process.argv[2] || "supplier-config.sample.json";
  const raw = await fs.readFile(configPath, "utf8");
  const configs = JSON.parse(raw);

  const results = [];

  for (const supplier of configs) {
    const entry = {
      name: supplier.name,
      url: supplier.url,
      matchedValue: null,
      matchedPattern: null,
      status: "ok",
      message: "",
    };

    try {
      const response = await fetch(supplier.url, {
        headers: {
          "user-agent": "Mozilla/5.0 (compatible; MortgageModelBot/1.0)",
          accept: "text/html",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const html = await response.text();

      for (const patternText of supplier.patterns || []) {
        const regex = new RegExp(patternText, "i");
        const match = html.match(regex);
        if (match && match[1]) {
          entry.matchedValue = match[1];
          entry.matchedPattern = patternText;
          break;
        }
      }

      if (!entry.matchedValue) {
        entry.status = "no_match";
        entry.message =
          "No price match found. Adjust regex or inspect if page needs JS rendering/login.";
      }
    } catch (error) {
      entry.status = "error";
      entry.message = error.message;
    }

    results.push(entry);
  }

  console.table(
    results.map((r) => ({
      Supplier: r.name,
      Price: r.matchedValue || "-",
      Status: r.status,
      URL: r.url,
      Note: r.message || "",
    })),
  );

  await fs.writeFile("supplier-fees-output.json", JSON.stringify(results, null, 2), "utf8");
  console.log("Saved results to supplier-fees-output.json");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
