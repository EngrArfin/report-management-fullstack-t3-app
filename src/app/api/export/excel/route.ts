import { NextResponse, type NextRequest } from "next/server";
import { ExportService } from "~/server/services/exportService";
import { formatMonthYear } from "~/server/services/deadlineService";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const year = searchParams.get("year") ? Number(searchParams.get("year")) : undefined;
  const month = searchParams.get("month") ? Number(searchParams.get("month")) : undefined;
  const weekParam = searchParams.get("week");
  const week = weekParam === "all" || !weekParam ? "all" : Number(weekParam);
  const zone = searchParams.get("zone") ?? undefined;
  const status = searchParams.get("status") ?? undefined;
  const userId = searchParams.get("userId") ?? undefined;
  const fromDate = searchParams.get("fromDate") ?? undefined;
  const toDate = searchParams.get("toDate") ?? undefined;

  const data = await ExportService.getExportData({
    year,
    month,
    week,
    zone,
    status,
    userId,
    fromDate,
    toDate,
  });

  const csv = ExportService.generateCsv(data);

  const titleMonth = year && month ? formatMonthYear(year, month).replace(/\s+/g, "_") : "All_Months";
  const filename = `OM_Report_${titleMonth}_${week === "all" ? "AllWeeks" : `Week${week}`}.csv`;

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}

