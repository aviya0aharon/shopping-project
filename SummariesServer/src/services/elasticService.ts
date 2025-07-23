import { config } from "dotenv";
import { Client } from "@elastic/elasticsearch";
import { Summary } from "../types/summary.js";

config();

const client = new Client({ node: process.env.ELASTIC_NODE! });
const index = process.env.ELASTIC_INDEX || "summaries";

export async function saveSummary(summary: Summary) {
  console.log(summary);

  return await client.index({
    index,
    document: summary,
  });
}
