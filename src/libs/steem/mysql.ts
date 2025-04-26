import { supabase } from "../supabase";

export async function getChatLastRead(username: string) {
  if (!username) return "";
  const { data, error } = await supabase.rpc("notifs_last_read", { username });

  if (error) {
    return "";
  }
  return data as string;
}

export async function getUnreadChatCount(username: string): Promise<number> {
  const { data } = await supabase.rpc("get_unread_count", {
    username: username,
  });

  return data ?? 0;
}

export async function getUnreadChats(
  username: string,
  from: number,
  to: number
): Promise<ChatNotification[]> {
  const { data } = await supabase.rpc("get_unread_chats", {
    username: username,
    from_limit: from,
    to_limit: to,
  });

  return (data ?? []) as ChatNotification[];
}
