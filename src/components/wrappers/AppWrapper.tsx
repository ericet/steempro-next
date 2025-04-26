"use client";

import {
  WitnessAccount,
  DefaultNotificationFilters,
} from "@/libs/constants/AppConstants";
import {
  fetchSds,
  useAppDispatch,
  useAppSelector,
} from "@/libs/constants/AppFunctions";
import { addCommonDataHandler } from "@/libs/redux/reducers/CommonReducer";
import { saveLoginHandler } from "@/libs/redux/reducers/LoginReducer";
import { saveSteemGlobals } from "@/libs/redux/reducers/SteemGlobalReducer";
import { getUnreadChatCount } from "@/libs/steem/mysql";
import { getAccountExt } from "@/libs/steem/sds";
import { useSession } from "next-auth/react";
import { useRouter } from "next13-progressbar";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";

const defFilter = DefaultNotificationFilters;
const filter = {
  mention: {
    exclude: defFilter.mention.status,
    minSP: defFilter.mention.minSp,
    minReputation: defFilter.mention.minRep,
  },
  vote: {
    exclude: defFilter.vote.status,
    minVoteAmount: defFilter.vote.minVote,
    minReputation: defFilter.vote.minRep,
    minSP: defFilter.vote.minSp,
  },
  follow: {
    exclude: defFilter.follow.status,
    minSP: defFilter.follow.minSp,
    minReputation: defFilter.follow.minRep,
  },
  resteem: {
    exclude: defFilter.resteem.status,
    minSP: defFilter.resteem.minSp,
    minReputation: defFilter.resteem.minRep,
  },
  reply: {
    exclude: defFilter.reply.status,
    minSP: defFilter.reply.minSp,
    minReputation: defFilter.reply.minRep,
  },
};

let isPinged = false;

export default function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const [username, setUsername] = useState<string | undefined | null>(
    session?.user?.name
  );
  const dispatch = useAppDispatch();
  const router = useRouter();
  const loginInfo = useAppSelector((state) => state.loginReducer.value);

  function pingForWitnessVote() {
    if (!isPinged) {
      toast(`Vote for witness (${WitnessAccount})`, {
        action: {
          label: "Vote",
          onClick: () => {
            router.push("/witnesses");
          },
        },
        closeButton: false,
        duration: 10000,
      });
      isPinged = true;
    }
  }

  // gettting login user from session
  useEffect(() => {
    if (status === "authenticated" && session.user?.name)
      setUsername(session.user.name);

    // let timeout;
    // if (status === 'unauthenticated')
    //     timeout = setTimeout(() => {
    //         pingForWitnessVote();
    //     }, 5000);

    // return () => clearTimeout(timeout);
  }, [status]);

  useEffect(() => {
    if (!!session?.user?.name) {
      if (session.user.name !== username) {
        setUsername(session.user.name);
      }
    }
  }, [session?.user?.name, username]);

  const URL = `/notifications_api/getFilteredUnreadCount/${
    loginInfo?.name
  }/${JSON.stringify(filter)}`;

  const { data: globalData, isValidating: isValidatingGlobal } = useSWR(
    `/steem_requests_api/getSteemProps`,
    fetchSds<SteemProps>,
    {
      shouldRetryOnError: true,
      refreshInterval: 600000, // 10 minutes
      errorRetryInterval: 5000,
    }
  );

  const { data: accountData, isValidating: isValidatingAccount } = useSWR(
    username ? [username, "null"] : null, // Pass both account and observer
    ([account, observer]) => getAccountExt(account, observer), // Destructure the array to pass arguments properly
    {
      shouldRetryOnError: true,
      refreshInterval: 300000,
      errorRetryInterval: 3000,
    }
  );

  const { data: unreadDataChat } = useSWR(
    !!loginInfo?.name && `unread-chat-${loginInfo.name}`,
    () => getUnreadChatCount(loginInfo.name),
    {
      shouldRetryOnError: true,
      refreshInterval: 310000,
      errorRetryInterval: 20000,
    }
  );

  const { data: unreadData } = useSWR(
    !!loginInfo?.name && URL,
    fetchSds<number>,
    {
      shouldRetryOnError: true,
      refreshInterval: 300000,
      errorRetryInterval: 10000,
    }
  );

  useEffect(() => {
    dispatch(
      addCommonDataHandler({
        isLoadingAccount: isValidatingAccount || isValidatingGlobal,
      })
    );
  }, [isValidatingAccount, isValidatingGlobal]);

  // saving the fetched data in redux state
  useEffect(() => {
    if (accountData) {
      dispatch(
        saveLoginHandler({
          ...accountData,
          unread_count:
            loginInfo?.name === username ? loginInfo?.unread_count ?? 0 : 0,
        })
      );
      // if (!accountData.witness_votes.includes(WitnessAccount))
      //     pingForWitnessVote();
    }
    if (unreadDataChat) {
      dispatch(
        saveLoginHandler({
          ...accountData,
          unread_count_chat: unreadDataChat,
        })
      );
    }
    if (globalData) dispatch(saveSteemGlobals(globalData));
  }, [globalData, accountData, unreadDataChat]);

  useEffect(() => {
    if (unreadData) {
      dispatch(
        saveLoginHandler({ ...loginInfo, unread_count: unreadData ?? 0 })
      );
    }
  }, [unreadData]);

  return <div>{children}</div>;
}
