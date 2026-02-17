import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export async function POST(req) {
  const { email, language, country } = await req.json();

  try {
    await notion.pages.create({
      parent: { database_id: process.env.NOTION_DATABASE_ID },
      properties: {
        Email: {
          title: [{ text: { content: email } }],
        },
        Language: {
          rich_text: [{ text: { content: language } }],
        },
        Country: {
          rich_text: [{ text: { content: country } }],
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Notion failed" }, { status: 500 });
  }
}
