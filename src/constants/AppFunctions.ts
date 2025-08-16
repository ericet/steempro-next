import { AppStrings } from "./AppStrings";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../hooks/redux/store";
import { FeedBodyLength, FeedLastScroll, IntrestingList } from "./AppConstants";
import { FeedTypes } from "../libs/steem/sds";

// Keep track of the current SDS endpoint index
let currentSdsEndpointIndex = 0;

export function sdsWrapper(api: string): string {
  return AppStrings.sds_base_urls[currentSdsEndpointIndex] + api;
}

// Get the next SDS endpoint in the list
export function getNextSdsEndpoint(): string {
  currentSdsEndpointIndex = (currentSdsEndpointIndex + 1) % AppStrings.sds_base_urls.length;
  return AppStrings.sds_base_urls[currentSdsEndpointIndex];
}

export function getFeedScrollItems(endPoint: string) {
  return FeedLastScroll.find((feed) => feed.endPoint === endPoint)?.items || 16;
}

export function updateFeedScroll(endPoint: string, items: number) {
  const index = FeedLastScroll.findIndex((feed) => feed.endPoint === endPoint);

  if (index !== -1) {
    // Update existing entry
    FeedLastScroll[index].items = items;
  } else {
    // Add new entry
    FeedLastScroll.push({ endPoint, items });
  }
}

export async function fetchSds<T>(
  api: string,
  options?: RequestInit
): Promise<T> {
  // Try all available SDS endpoints until one succeeds or all fail
  const maxRetries = AppStrings.sds_base_urls.length;
  let lastError: any = null;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      // Use the current endpoint
      const url = sdsWrapper(api);
      console.log(`Trying SDS endpoint: ${url}`);
      
      const response = await fetch(url, {
        keepalive: true,
        ...options,
      });

      // Check if the response is OK
      if (!response.ok) {
        const error: any = new Error(`HTTP error ${response.status}`);
        error.status = response.status;
        throw error;
      }

      // Try to parse the response as JSON
      let result;
      try {
        result = await response.json();
      } catch (jsonError) {
        console.error(`Failed to parse JSON from ${url}:`, jsonError);
        // Rotate to the next endpoint and try again
        getNextSdsEndpoint();
        continue;
      }

      // Validate the SDS response
      if (validateSds(result)) {
        const parsed = mapSds(result) as T;
        return parsed;
      } else {
        throw new Error(result?.error || String(result));
      }
    } catch (error) {
      lastError = error;
      console.error(`SDS endpoint attempt ${attempt + 1}/${maxRetries} failed:`, error);
      
      // Rotate to the next endpoint for the next attempt
      getNextSdsEndpoint();
    }
  }

  // If we've tried all endpoints and none worked, throw the last error
  throw new Error(`All SDS endpoints failed. Last error: ${lastError?.message || 'Unknown error'}`);
}

export function validateSds(result: any) {
  return result.code === 0;
}

export function mapSds(response: any) {
  if (!response || typeof response !== "object") {
    return response;
  }

  const result = response.result !== undefined ? response.result : response;

  if (!result || typeof result !== "object") {
    return result;
  }

  const { cols, rows } = result;
  if (!cols) {
    return rows || result;
  }

  const keys = Object.keys(cols);
  const mapped_data: any[] = [];

  result.rows.forEach((row) => {
    const values: any = Object.values(row);
    const mapped = values.reduce(
      (a, it, index) => ({ ...a, [keys[index]]: it }),
      {}
    );
    mapped_data.push(mapped);
  });

  return mapped_data;
}

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;

// export function awaitTimeout(seconds: number): Promise<void> {
//   return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
// }

export const filterRecommendations = (following: string[], count = 4) => {
  return IntrestingList.filter((p) => !following?.includes(p))
    .sort(() => 0.5 - Math.random())
    .slice(0, count);
};

export function getEndPoint(
  feedType: FeedTypes,
  observer?: string,
  bodyLength = FeedBodyLength,
  limit = 1000,
  offset = 0
) {
  const URL = `/feeds_api/get${feedType ?? "PostsByAuthor"}/${
    observer || "null"
  }/${bodyLength}/${limit}/${offset}`;
  return URL.trim();
}
