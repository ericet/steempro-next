import React, { Component, Fragment, useState } from "react";
import { fetchSds, useAppSelector } from "@/constants/AppFunctions";
import { getTimeFromNow } from "@/utils/helper/time";
import useSWR from "swr";
import LoadingCard from "./LoadingCard";
import "./style.scss";
import SLink from "./ui/SLink";
import SAvatar from "./ui/SAvatar";

interface Props {
  comment: Feed | Post;
}

interface DetailProps {
  data: Post;
  globalData: SteemProps;
}
export class PayoutDetail extends Component<DetailProps> {
  render() {
    const { data, globalData } = this.props;

    const payoutDate = getTimeFromNow(data.cashout_time * 1000);

    const beneficiary = data.beneficiaries;
    const pendingPayout = data.pending_payout_value;
    const promotedPayout = data.promoted;
    const authorPayout =
      data.pending_payout_value === 0
        ? data.payout - data.curator_payout_value
        : 0;
    const curatorPayout = data.curator_payout_value;
    const maxPayout = data.max_accepted_payout;
    const fullPower = data.percent_steem_dollars === 0;
    const isDeclined = maxPayout === 0;

    const totalPayout = pendingPayout + authorPayout + curatorPayout;
    const payoutLimitHit = totalPayout >= maxPayout;

    const SBD_PRINT_RATE_MAX = 100;
    const percentSteemDollars = data.percent_steem_dollars / 20000;
    const pendingPayoutSbd = pendingPayout * percentSteemDollars;
    const pricePerSteem = globalData.median_price;
    const pendingPayoutHp = (pendingPayout - pendingPayoutSbd) / pricePerSteem;
    const pendingPayoutPrintedSbd =
      pendingPayoutSbd * (globalData.sbd_print_rate / SBD_PRINT_RATE_MAX);

    const pendingPayoutPrintedSteem =
      (pendingPayoutSbd - pendingPayoutPrintedSbd) / pricePerSteem;

    let breakdownPayout: string[] = [];
    if (pendingPayout > 0) {
      if (pendingPayoutPrintedSbd > 0) {
        breakdownPayout.push(`${pendingPayoutPrintedSbd?.toFixed(3)} SBD`);
      }

      if (pendingPayoutPrintedSteem > 0) {
        breakdownPayout.push(`${pendingPayoutPrintedSteem?.toFixed(3)} STEEM`);
      }

      if (pendingPayoutHp > 0) {
        breakdownPayout.push(`${pendingPayoutHp?.toFixed(3)} SP`);
      }
    }

    if (isDeclined) {
      return (
        <div>
          <span className="value">{"Payout Declined"}</span>
        </div>
      );
    }

    return (
      <div className="flex flex-col payout-popover-content gap-2 w-full">
        {fullPower && (
          <div>
            <span className="label">{"Reward: "}</span>
            <span className="value">{"Power Up 100%"}</span>
          </div>
        )}
        {pendingPayout > 0 && (
          <div>
            <span className="label">{"Pending Payout: "}</span>
            <span className="value">
              ${pendingPayout?.toFixed(3)}
              {/* <FormattedCurrency {...this.props} value={pendingPayout} fixAt={3} /> */}
            </span>
          </div>
        )}
        {promotedPayout > 0 && (
          <div>
            <span className="label">{"Promoted"}</span>
            <span className="value">
              {promotedPayout?.toFixed(3)}
              {/* <FormattedCurrency {...this.props} value={promotedPayout} fixAt={3} /> */}
            </span>
          </div>
        )}
        {authorPayout > 0 && (
          <div>
            <span className="label">{"Author Payout: "}</span>
            <span className="value">
              ${authorPayout?.toFixed(3)}
              {/* <FormattedCurrency {...this.props} value={authorPayout} fixAt={3} /> */}
            </span>
          </div>
        )}
        {curatorPayout > 0 && (
          <div>
            <span className="label">{"Curators Payout: "}</span>
            <span className="value">
              ${curatorPayout?.toFixed(3)}
              {/* <FormattedCurrency {...this.props} value={curatorPayout} fixAt={3} /> */}
            </span>
          </div>
        )}
        {beneficiary.length > 0 && (
          <div className="flex flex-row flex-wrap p-2 bg-default-100 rounded-md gap-2">
            <span className="text-sm text-default-500">
              {"Beneficiaries: "}
            </span>
            <span className="value px-1">
              {beneficiary.map((x: any, i) => (
                <Fragment key={i}>
                  <div className=" flex flex-row items-center gap-1">
                    <div className="flex flex-row items-center gap-1">
                      <SLink
                        className=" hover:text-blue-500 hover:underline"
                        href={`/@${x[0]}`}
                      >
                        {x[0]}
                      </SLink>
                    </div>
                    : {(x[1] / 100).toFixed(0)}%
                  </div>
                  <br />
                </Fragment>
              ))}
            </span>
          </div>
        )}

        {breakdownPayout.length > 0 && (
          <div className="gap-2 flex flex-row flex-wrap p-2 bg-default-100 rounded-md">
            <span className="label text-sm text-default-500">
              {"Breakdown: "}
            </span>
            <span className="value px-1">
              {breakdownPayout.map((x, i) => (
                <Fragment key={i}>
                  {x} <br />
                </Fragment>
              ))}
            </span>
          </div>
        )}

        {payoutDate && (
          <div>
            <span className="label">{"Payout: "}</span>
            <span className="value" title={new Date(data.cashout_time * 1000).toLocaleString()}>{payoutDate}</span>
          </div>
        )}

        {!payoutDate && !authorPayout && !curatorPayout && (
          <div>
            <span className="label">{"Payout: "}</span>
            <span className="value">{"Reward distributed"}</span>
          </div>
        )}

        {payoutLimitHit && (
          <div>
            <span className="label">{"Max accepted: "}</span>
            <span className="value">
              {maxPayout?.toFixed(3)}
              {/* <FormattedCurrency {...this.props} value={maxPayout} fixAt={3} /> */}
            </span>
          </div>
        )}
      </div>
    );
  }
}

export const RewardBreakdownCard = (props: Props) => {
  const { comment } = props;

  const globalData = useAppSelector((state) => state.steemGlobalsReducer.value);
  const URL = `/posts_api/getPost/${comment.author}/${
    comment.permlink
  }/${false}`;

  const { data, isLoading, error } = useSWR(
    comment.max_accepted_payout !== 0 && URL,
    fetchSds<Post>
  );

  if (comment.max_accepted_payout === 0) {
    return (
      <p>
        <span className="value">{"Payout Declined"}</span>
      </p>
    );
  }
  if (isLoading) {
    return <LoadingCard />;
  }
  if (!data || error) {
    return <></>;
  }

  return <PayoutDetail data={data} globalData={globalData} />;
};
