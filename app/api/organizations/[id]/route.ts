import { serverService } from "@/lib/server";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
  const data = await serverService.organizations.findFirst({
    where: { id: params.id },
  });
  return NextResponse.json(data);
}

export async function DELETE(_, { params }) {
  const data = await serverService.organizations.delete?.({
    id: params.id,
  });
  return NextResponse.json(data);
}
