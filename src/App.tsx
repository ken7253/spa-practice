import React, { useEffect, useState } from "react";
import LineGraph from "./components/LineGraph/LineGraph";
import CheckBox from "./components/CheckBox/CheckBox";
import "./App.css";

interface Prefectures {
  message: null,
  result: Result[]
}

interface Result {
  prefCode: number,
  prefName: string
}

const App: React.FC = () => {

  const [prefectures, setPrefectures] = useState<Result[]>();

  useEffect(() => {
    const APIData = fetch('http://localhost:8888/.netlify/functions/get-prefectures');

    void APIData.then(async (resp) => {
      const json = await resp.json() as Record<keyof Prefectures, unknown>;
      if (typeof json !== "object" || json === null) return;
      if (Array.isArray(json.result)) {
        setPrefectures(json.result);
      }
    })

    return () => {
      setPrefectures(undefined);
    }
  },[])

  return (
    <div className="App">
      <LineGraph>
        {prefectures?.map((value) => {
          return(<CheckBox key={value.prefCode}>{value.prefName}</CheckBox>);
        })}
      </LineGraph>
    </div>
  );
};

export default App;
