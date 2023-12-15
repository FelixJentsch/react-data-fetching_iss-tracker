import { useEffect, useState } from "react";
import Controls from "../Controls/index";
import Map from "../Map/index";
import useSWR, { SWRConfig } from "swr";

const URL = "https://api.wheretheiss.at/v1/satellites/25544";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function ISSTracker() {
  const { data, error, mutate } = useSWR(URL, fetcher, {
    refreshInterval: 5000,
  });

  if (error) return <div>Error loading ISS data</div>;
  if (!data) return <div>Loading ...</div>;

  const { longitude, latitude } = data;

  return (
    <main>
      <Map longitude={longitude} latitude={latitude} />
      <Controls
        longitude={longitude}
        latitude={latitude}
        onRefresh={() => mutate()}
      />
    </main>
  );
}
