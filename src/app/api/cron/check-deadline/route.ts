import { NextResponse, type NextRequest } from "next/server";
import { NotificationService } from "~/server/services/notificationService";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const now = new Date();
  const year = searchParams.get("year") ? Number(searchParams.get("year")) : now.getFullYear();
  const month = searchParams.get("month") ? Number(searchParams.get("month")) : now.getMonth() + 1;
  const week = searchParams.get("week") ? Number(searchParams.get("week")) : 1;

  const result = await NotificationService.processMissedReportNotifications(year, month, week);

  return NextResponse.json(result);
}

