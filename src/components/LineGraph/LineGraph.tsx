import React, { ReactNode, useEffect, useState } from "react";
import "./LineGraph.css";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import type { Result } from "../../types/response/prefectures";
import type { SendData } from "../../types/response/population";

interface Props {
  children?: ReactNode;
  showDataId?: (number | string)[];
  prefectures?: Result[];
}

const LineGraph: React.FC<Props> = (props: Props) => {
  const [graph, setGraph] = useState<SendData[]>();

  const options: Highcharts.Options = {
    series: graph
      ? graph.map((population) => {
          const divisionName = props.prefectures?.find(
            (prefecture) => prefecture.prefCode === population.prefCode
          );
          return {
            name: divisionName?.prefName,
            type: "line",
            data: population.data,
          };
        })
      : undefined,
  };

  useEffect(() => {
    const host = import.meta.env.VITE_API_HOST as string;
    if (!props.showDataId) return;
    const requestURL = `${host}.netlify/functions/get-population`;
    const APIData = props.showDataId?.map((value) => {
      return fetch(`${requestURL}?prefCode=${value}`);
    });

    const formed = async (): Promise<SendData[]> => {
      const raw = await Promise.all(APIData);
      const json = Promise.all(
        raw.map((item) => item.json() as Promise<SendData>)
      );

      return json;
    };

    void formed().then((value) => {
      setGraph(value);
    });
  }, [props.showDataId]);

  return (
    <>
      <div className="controller">{props.children}</div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
};

export default LineGraph;
