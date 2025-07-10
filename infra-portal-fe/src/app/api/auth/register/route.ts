import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import argon2 from "argon2";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { email, password, name, orgName, authCode } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Missing email" }, { status: 400 });
    }

    if (!password) {
      return NextResponse.json({ error: "Missing password" }, { status: 400 });
    }

    const db = await getDb();

    const existingUser = await db.collection("ida_users").findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await argon2.hash(password);
    const apiKey = crypto.randomBytes(32).toString("hex");

    const user = {
      _id: new ObjectId(),
      email,
      password: hashedPassword,
      name,
      orgName,
      createdAt: new Date(),
      apiKey,
    };

    await db.collection("ida_users").insertOne(user);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
