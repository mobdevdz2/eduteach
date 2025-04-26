import { serverService } from "@/lib/server";
import { NextResponse } from "next/server";

export async function GET(req) {
  const searchParams = Object.fromEntries(req.nextUrl.searchParams);
  const data = await serverService.lessonPlans.findMany({ where: searchParams });
  return NextResponse.json(data);
}

export async function POST(req) {
  const body = await req.json();
  const data = await serverService.lessonPlans.create?.(body);
  return NextResponse.json(data);
}

export async function PUT(req) {
  const body = await req.json();
  const data = await serverService.lessonPlans.update?.(body);
  return NextResponse.json(data);
}

export async function DELETE(req) {
  const body = await req.json();
  const data = await serverService.lessonPlans.delete?.(body);
  return NextResponse.json(data);
}
