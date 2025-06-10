import striptags from "striptags";
import { Remarkable } from "remarkable";

const remarkable = new Remarkable({ html: true });
import { extractBodySummary } from "@/utils/extractContent";

function decodeEntities(body: string): string {
  return body?.replace(/&lt;/g, "<")?.replace(/&gt;/g, ">");
}

interface BodyShortProps {
  className?: string;
  body?: string;
  length?: number;
}

const BodyShort = (props: BodyShortProps): React.ReactNode => {
  let body = striptags(
    remarkable.render(striptags(decodeEntities(props.body || "")))
  );
  body = body?.replace(/(?:https?|ftp):\/\/[\S]+/g, "");

  // If body consists of whitespace characters only skip it.
  if (!body?.replace(/\s/g, "")?.length) {
    return <></>;
  }

  /* eslint-disable react/no-danger */
  return (
    <p className={props.className} style={{ wordBreak: "break-word" }}>
      {extractBodySummary(body)}
    </p>
  );
};

export default BodyShort;
