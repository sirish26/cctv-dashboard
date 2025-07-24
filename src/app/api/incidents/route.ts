import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const resolvedParam = searchParams.get('resolved');

  let where: { resolved?: boolean } = {};
  if (resolvedParam === 'true') {
    where.resolved = true;
  } else {
    where.resolved = false;
  }

  const incidents = await prisma.incident.findMany({
    where,
    include: { camera: true },
    orderBy: { tsStart: 'desc' },
  });

  return NextResponse.json(incidents);
}