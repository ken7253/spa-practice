import React, { ReactNode, useEffect, useState } from "react";
import "./LineGraph.css";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import type { Result } from "../../types/prefectures";
import type { SendData } from "../../../netlify/functions/get-population/get-population";

interface Props {
  children?: ReactNode;
  title?: string;
  showDataId?: (number | string)[];
  prefectures?: Result[];
}

const LineGraph: React.FC<Props> = (props: Props) => {
  const [graph, setGraph] = useState<SendData[]>();

  const options: Highcharts.Options = {
    title: {
      text: props.title,
    },
    series: graph
      ? graph.map((population: SendData) => {
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
    if (!props.showDataId) return;
    const requestURL =
      "http://localhost:8888/.netlify/functions/get-population";
    const APIData = props.showDataId?.map((value) => {
      return fetch(`${requestURL}?prefCode=${value}`);
    });

    const formed = async (): Promise<SendData[]> => {
      const raw = await Promise.all(APIData);
      const json = Promise.all(
        raw.map<Promise<SendData>>((item) => item.json())
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
