"use client";

import ErrorCard from "@/components/ErrorCard";
import LoadingCard from "@/components/LoadingCard";
import ProposalItemCard from "@/components/ProposalItemCard";
import { capitalize } from "@/constants/AppConstants";
import { getProposals } from "@/libs/steem/condenser";
import { getAccountExt } from "@/libs/steem/sds";
import parseAsset from "@/utils/helper/parse-asset";
import { Card } from "@heroui/card";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import React, { useEffect, useMemo, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { MdSearch } from "react-icons/md";
import useSWR from "swr";

const FundindCard = ({
  title,
  description,
}: {
  title?: string;
  description: string;
}) => {
  return (
    <div className=" flex flex-col items-center gap-2">
      <Card radius="md" className="py-1 px-2 bg-primary text-white text-sm">
        {title} SBD
      </Card>
      <p className="text-xs opacity-80">{description}</p>
    </div>
  );
};
const initialSatus = ["all"];

function Proposals() {
  const { data, error, isLoading } = useSWR<Proposal[]>(
    "proposals-list",
    getProposals
  );

  const { data: accountData } = useSWR<AccountExt>("proposal-fund", () =>
    getAccountExt("steem.dao")
  );

  const [allRows, setAllRows] = useState<Proposal[]>([]);
  const [filterValue, setFilterValue] = useState("");
  const [visibleColumns, setVisibleColumns] = React.useState<any>(
    new Set(initialSatus)
  );

  const hasSearchFilter = Boolean(filterValue);
  const filteredItems = useMemo(() => {
    let filteredProposals = [...allRows];

    if (hasSearchFilter)
      filteredProposals = filteredProposals.filter((proposal) =>
        (proposal.creator
          .toLowerCase()
          .includes(filterValue.toLowerCase().trim()) ||
          proposal.receiver
            .toLowerCase()
            .includes(filterValue.toLowerCase().trim()) ||
          proposal.subject
            .toLowerCase()
            .includes(filterValue.toLowerCase().trim())) &&
        Array.from(visibleColumns).includes("all")
          ? true
          : Array.from(visibleColumns).includes(proposal.status)
      );

    return filteredProposals;
  }, [allRows, filterValue, visibleColumns]);

  useEffect(() => {
    if (data) {
      setAllRows(data);
    }
  }, [data]);

  const DaoStats = ({
    proposals,
    account,
  }: {
    proposals: Proposal[];
    account: AccountExt;
  }) => {
    const totalBudget = account.balance_sbd;
    const dailyBudget = totalBudget / 100;
    let _thresholdProposalId: number | null = null;
    const dailyFunded = proposals?.reduce((a, b) => {
      const dp = parseAsset(b.daily_pay);
      const _sum_amount = a + Number(dp.amount);
      if (_sum_amount >= dailyBudget && !_thresholdProposalId) {
        _thresholdProposalId = b.id;
      }
      return _sum_amount <= dailyBudget ? _sum_amount : a;
    }, 0);

    return (
      <div className=" flex flex-row items-center justify-center mt-6 mb-4 gap-2">
        <FundindCard
          title={dailyFunded?.toLocaleString()}
          description="Daily Funded"
        />
        <FundindCard
          title={dailyBudget?.toLocaleString()}
          description="Daily Budget"
        />
        <FundindCard
          title={totalBudget?.toLocaleString()}
          description="Total Budget"
        />
      </div>
    );
  };
  if (error) {
    return <ErrorCard message={error} />;
  }

  if (isLoading) return <LoadingCard />;

  return (
    <div className="flex flex-col gap-4 pb-10">
      <div className="flex flex-col items-center gap-2 text-center">
        <p className="text-blue-500 text-3xl font-semibold">Proposals</p>
        <p className="text-xs opacity-disabled">
          Power Your Ideas with the Steem Proposal System (SPS)
        </p>
        <p className=" text-center max-w-[80%] opacity-80">
          The SPS is Steem's on-chain funding system that empowers the
          community! Anyone can submit a proposal, and if it gains enough
          support through community votes, it gets funded, no middlemen, just
          pure decentralization!
        </p>
      </div>

      {data && accountData && (
        <DaoStats proposals={data} account={accountData} />
      )}

      <div className=" flex flex-row items-center justify-between">
        <Input
          radius="full"
          className="max-w-[70%]"
          classNames={{
            inputWrapper:
              "text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Search"
          size="md"
          value={filterValue}
          onValueChange={setFilterValue}
          startContent={<MdSearch size={20} />}
          type="search"
        />
        <div className="flex gap-3">
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button
                endContent={<FaChevronDown className="text-small" />}
                variant="flat"
              >
                Status
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={visibleColumns}
              selectionMode="multiple"
              onSelectionChange={setVisibleColumns}
            >
              {["all", "active", "upcoming"].map((column) => (
                <DropdownItem key={column.toLowerCase()} className="capitalize">
                  {capitalize(column)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div className="flex flex-col w-full gap-4">
        {filteredItems?.map((proposal) => {
          return <ProposalItemCard proposal={proposal} />;
        })}
      </div>
    </div>
  );
}

export default Proposals;
