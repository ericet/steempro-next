import { getAccountExt } from "@/libs/steem/sds";
import { getResizedAvatar } from "@/libs/utils/parseImage";
import usePathnameServer from "@/libs/hooks/usePathnameServer";
import { auth } from "@/auth";
import { Metadata } from "next";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

export async function generateMetadata(): Promise<Metadata> {
  let { category, username } = await usePathnameServer();
  if (!category) {
    category = "blog";
  }
  const session = await auth();

  const result = await getAccountExt(username, session?.user?.name || "null");
  const { name, about, website } =
    JSON.parse(result.posting_json_metadata || "{}")?.profile ?? {};

  const capCat = category.charAt(0).toUpperCase() + category.slice(1);
  const pageTitle = !!name
    ? `${name} (@${username}) - ${capCat} on the Decentralized Web`
    : `@${username} - ${capCat} on the Decentralized Web`;
  const pageDescription = about || "";

  const keywords = [
    `steempro @${username}`,
    `${category} by ${username}`,
    `${username} SteemPro`,
    `decentralized web ${category}`,
    `steem ${category}`,
    `steem ${username}`,
    `blockchain blogging`,
    `crypto social media`,
    `${username} ${category} content`,
    `SteemPro platform`,
  ];

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: keywords.join(", "),
    openGraph: {
      images: [getResizedAvatar(username, "medium")],
    },
    twitter: {
      images: [getResizedAvatar(username, "medium")],
    },
  };
}
