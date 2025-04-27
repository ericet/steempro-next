import MainWrapper from "@/components/wrappers/MainWrapper";
import React from "react";
import HomeCarousel from "@/components/carousal/HomeCarousal";
import usePathnameServer from "@/libs/hooks/usePathnameServer";

export default async function Layout({
  children,
  start,
}: Readonly<{
  children: React.ReactNode;
  start: React.ReactNode;
}>) {
  return (
    <MainWrapper topContent={<HomeCarousel />}>
      <div className=" flex flex-col">{children}</div>
    </MainWrapper>
  );
}

export async function generateMetadata() {
  let { category } = await usePathnameServer();
  if (!category) category = "trending";

  const capCat = category.charAt(0).toUpperCase() + category.slice(1);
  const pageTitle = `${capCat} topics`;
  const pageDescription = `Explore ${category} discussions on a user-owned social network. ${capCat} topics cover a wide range of interests and perspectives, providing valuable insights and lively conversations.`;

  return {
    title: pageTitle,
    description: pageDescription,
  };
}
