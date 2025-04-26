import { serverService } from "@/lib/server";
import { NextResponse ,NextRequest} from "next/server";

export async function GET(req: NextRequest) {

  const searchParams = Object.fromEntries(req.nextUrl.searchParams);
  console.log({searchParams})
  const data = await serverService.students.findMany({ where: searchParams });
  return NextResponse.json(data);
}

export async function POST(req) {
  const body = await req.json();
  const data = await serverService.students.create?.(body);
  return NextResponse.json(data);
}

export async function PUT(req) {
  const body = await req.json();
  const data = await serverService.students.update?.(body);
  return NextResponse.json(data);
}

export async function DELETE(req) {
  const body = await req.json();
  const data = await serverService.students.delete?.(body);
  return NextResponse.json(data);
}
