import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(_: Request, { params }: { params: { id: string } }) {
  const updated = await prisma.incident.update({
    where: { id: Number(params.id) },
    data: { resolved: true },
  });
  return NextResponse.json(updated);
}
