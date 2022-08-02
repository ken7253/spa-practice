import React, { ChangeEvent, useEffect, useState } from "react";
import LineGraph from "./components/LineGraph/LineGraph";
import CheckBox from "./components/CheckBox/CheckBox";
import type { Result, Prefectures } from "./types/response/prefectures";
import "./App.css";

const App: React.FC = () => {
  const [prefectures, setPrefectures] = useState<Result[]>();
  const [divisions, setDivisions] = useState<number[]>([]);

  const changeHandler = (e: ChangeEvent) => {
    if (!(e.target instanceof HTMLInputElement)) return;
    const selectedPrefCode = parseInt(e.target.value, 10);
    if (isNaN(selectedPrefCode)) return;
    if (e.target.checked) {
      setDivisions([...divisions, selectedPrefCode]);
    } else {
      setDivisions(divisions.filter((val) => val !== selectedPrefCode));
    }
  };

  useEffect(() => {
    const host = import.meta.env.VITE_API_HOST as string;
    const APIData = fetch(`${host}.netlify/functions/get-prefectures`);

    void APIData.then(async (resp) => {
      const json = (await resp.json()) as Record<keyof Prefectures, unknown>;
      if (typeof json !== "object" || json === null) return;
      if (Array.isArray(json.result)) {
        setPrefectures(json.result);
      }
    });

    return () => {
      setPrefectures(undefined);
    };
  }, []);

  return (
    <div className="App">
      <LineGraph
        showDataId={divisions}
        title={"test"}
        prefectures={prefectures}
      >
        {prefectures?.map((value) => {
          return (
            <CheckBox
              key={value.prefCode}
              value={value.prefCode}
              onChange={(e) => changeHandler(e)}
            >
              {value.prefName}
            </CheckBox>
          );
        })}
      </LineGraph>
    </div>
  );
};

export default App;
