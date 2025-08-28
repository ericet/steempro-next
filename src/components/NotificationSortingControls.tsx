import { Button } from "@heroui/button";
import { BiUpvote } from "react-icons/bi";
import { LuReply } from "react-icons/lu";
import { GoMention } from "react-icons/go";
import { RiUserFollowLine } from "react-icons/ri";
import { PiList } from "react-icons/pi";
import { useTranslation } from "@/utils/i18n";

interface SortingControlsProps {
  currentSort: "vote" | "reply" | "mention" | "follow" | "all";
  onSortChange: (sort: "vote" | "reply" | "mention" | "follow" | "all") => void;
}

const NotificationSortingControls = ({
  currentSort,
  onSortChange,
}: SortingControlsProps) => {
  const { t } = useTranslation();
  
  const sortOptions = [
    { key: "all" as const, label: t("notifications.filter.all"), icon: PiList, color: "default" },
    { key: "vote" as const, label: t("notifications.filter.vote"), icon: BiUpvote, color: "success" },
    {
      key: "reply" as const,
      label: t("notifications.filter.reply"),
      icon: LuReply,
      color: "secondary",
    },
    {
      key: "mention" as const,
      label: t("notifications.filter.mention"),
      icon: GoMention,
      color: "warning",
    },
    {
      key: "follow" as const,
      label: t("notifications.filter.follow"),
      icon: RiUserFollowLine,
      color: "primary",
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      {sortOptions.map(({ key, label, icon: Icon, color }) => (
        <Button
          key={key}
          variant={currentSort === key ? "solid" : "light"}
          size="sm"
          color={currentSort === key ? (color as any) : "default"}
          onPress={() => onSortChange(key)}
          className="gap-2"
        >
          <Icon className="w-4 h-4" />
          {label}
        </Button>
      ))}
    </div>
  );
};

export default NotificationSortingControls;
