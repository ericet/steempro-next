import MainWrapper from "@/components/wrappers/MainWrapper";
import usePathnameServer from "@/libs/hooks/usePathnameServer";
import React from "react";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MainWrapper>
      <div className=" flex flex-col">{children}</div>
    </MainWrapper>
  );
}

export async function generateMetadata() {
  const { category, tag } = await usePathnameServer();
  // const capCat = category.charAt(0).toUpperCase() + category.slice(1);
  const pageTitle = `Latest #${tag} ${category} topics on the Internet`;
  const pageDescription = `Explore the latest ${category} discussions and topics related to #${tag} on the internet. Stay updated with the most recent conversations and insights.`;

  const keywords = [
    `${tag} ${category}`,
    `latest ${category} topics`,
    `#${tag} ${category} discussions`,
    `${category} insights`,
    `trending ${category} topics`,
    `${category} conversations`,
    `#${tag} discussions`,
    `${tag} ${category} updates`,
    `${tag} ${category} news`,
  ];

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: keywords.join(", "),
  };
}
