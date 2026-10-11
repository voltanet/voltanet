import { ActionIcon } from "@mantine/core";
import { Iconify } from "@/components/iconify";
import { useSyncBlockList } from "../hooks";

export type $SyncBlockList = { id: string };

export const SyncBlockList = ({ id }: $SyncBlockList) => {
  const { isPending, mutate } = useSyncBlockList(id);

  return (
    <ActionIcon variant="default" onClick={() => void mutate()} loading={isPending}>
      <Iconify icon="@vite:solar:refresh-bold" />
    </ActionIcon>
  );
};
