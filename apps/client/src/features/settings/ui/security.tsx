import {
  Badge,
  Button,
  Card,
  Group,
  LoadingOverlay,
  Modal,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { auth, type Session } from "@/features/auth";
import { useNotify } from "@/hooks/use-notify";

export const SecuritySettings = () => {
  const { data: session, isPending: isSessionPending } = auth.useSession();
  const { data, isPending, error } = useQuery({
    queryKey: ["sessions"],
    queryFn: async () => {
      const { error, data } = await auth.listSessions();
      if (error) throw error;
      return data;
    },
  });

  if (isSessionPending) return <LoadingOverlay visible />;
  if (!session) return null;

  if (isPending) return <LoadingOverlay visible />;
  if (error) throw error;
  if (!data) return;

  const sessions = data
    .filter((item) => item.id !== session.session.id)
    .map((item) => <SessionCard key={item.id} session={item} />);

  return (
    <SimpleGrid type="container" cols={{ base: 1, "540px": 2, "750px": 3 }}>
      <SessionCard key={session.session.id} session={session.session} isCurrent />
      {sessions}
    </SimpleGrid>
  );
};

const SessionCard = ({ session, isCurrent }: { session: Session; isCurrent?: boolean }) => {
  return (
    <Card component={Stack}>
      <Group>
        <Text fw="bold">Session ({session.id.slice(0, 8).toLowerCase()})</Text>
        {isCurrent && <Badge color="green">Current</Badge>}
      </Group>
      <Text>IP Address: {session.ipAddress || "N/A"}</Text>
      <Text>Since: {dayjs(session.createdAt).format("DD MMM, hh:mm A")}</Text>
      <Text>Expires: {dayjs(session.expiresAt).format("DD MMM, hh:mm A")}</Text>
      <RevokeButton token={session.token} />
    </Card>
  );
};

const RevokeButton = ({ token }: { token: string }) => {
  const notify = useNotify();
  const queryClient = useQueryClient();
  const [opened, { open, close }] = useDisclosure(false);

  const { mutate, isPending } = useMutation({
    mutationFn: () => auth.revokeSession({ token }),
    onError: (error) => notify.error(error.message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
      notify.success("Session revoked successfully");
    },
  });

  return (
    <>
      <Button onClick={open} variant="filled" color="red">
        Revoke
      </Button>
      <Modal opened={opened} onClose={close} title="Confirm">
        <Stack>
          <Text>Are you sure you want to revoke this session?</Text>
          <Group>
            <Button onClick={close}>No</Button>
            <Button loading={isPending} onClick={() => mutate()} color="red" variant="filled">
              Yes
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
};
