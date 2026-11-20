import { PageShell } from "@/components/page-shell";
import { StateView } from "@/components/state-view";
import { ScheduleList } from "@/components/schedule-list";
import { parseDemoState, workshops } from "@/lib/workshops";

export default async function SchedulePage({ searchParams }: { searchParams: Promise<{ state?: string | string[] }> }) {
  const query = await searchParams;
  return <PageShell route="schedule">
    <StateView route="schedule" state={parseDemoState(query.state)}><ScheduleList items={workshops} /></StateView>
  </PageShell>;
}
