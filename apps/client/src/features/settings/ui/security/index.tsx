import { SimpleGrid } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { auth } from "@/features/auth";
import { SessionCard } from "./session-card";
import { SessionSkeleton } from "./session-skeleton";

export const SecuritySettings = () => {
  const { data: session } = auth.useSession();
  const { data, isLoading, error } = useQuery({
    queryKey: ["sessions"],
    enabled: !!session,
    queryFn: async () => {
      const { error, data } = await auth.listSessions();
      if (error) throw error;
      return data;
    },
  });

  if (!session) return null;
  if (error) throw error;

  const sessions = data
    ?.filter((item) => item.id !== session.session.id)
    .map((item) => <SessionCard key={item.id} session={item} />);

  return (
    <SimpleGrid type="container" cols={{ base: 1, "600px": 2 }}>
      {isLoading && [...Array(4)].map((_, index) => <SessionSkeleton key={index} />)}
      <SessionCard key={session.session.id} session={session.session} isCurrent />
      {sessions}
    </SimpleGrid>
  );
};
