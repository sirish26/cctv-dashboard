import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const incidentId = Number(id);
  if (isNaN(incidentId)) {
    return NextResponse.json({ error: 'Invalid incident ID' }, { status: 400 });
  }
  await prisma.incident.update({
    where: { id: incidentId },
    data: { resolved: true },
  });

  return NextResponse.json({ success: true });
}