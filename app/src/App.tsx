import { useState } from "react";
import "./App.css";

type ResultType = {
  message: string;
  type: "success" | "error" | "";
};

function App() {
  const [cables, setCables] = useState<number[]>([]);
  const [cablesInput, setCablesInput] = useState<string>("");
  const [civilDistance, setCivilDistance] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  const [result, setResult] = useState<ResultType>({
    message: "",
    type: "",
  });


  const updateCables = (): void => {
    const parsed = cablesInput
      .split(",")
      .map((x) => Number(x.trim()))
      .filter((x) => !isNaN(x));

    setCables(parsed);
  };


  // Finds the best combination of cables
  const findCableCombination = (
    available: number[],
    required: number
  ): number[] | null => {

    const sorted = [...available].sort((a, b) => a - b);

    let bestCombination: number[] | null = null;
    let bestTotal = Infinity;


    const search = (
      index: number,
      current: number[],
      total: number
    ): void => {

      if (total >= required) {

        if (total < bestTotal) {
          bestTotal = total;
          bestCombination = [...current];
        }

        return;
      }


      if (total >= bestTotal) return;


      for (let i = index; i < sorted.length; i++) {

        current.push(sorted[i]);

        search(
          i + 1,
          current,
          total + sorted[i]
        );

        current.pop();
      }
    };


    search(0, [], 0);

    return bestCombination;
  };


  const calculateCable = (): void => {

    const distance = Number(civilDistance);


    if (isNaN(distance) || cables.length === 0) {

      setResult({
        type: "error",
        message: "Invalid input or no cables",
      });

      return;
    }


    // Add 20m slack allowance
    const required = distance + 20;


    // Check if one cable can handle it
    const singleCable = cables
      .filter((c) => c >= required)
      .sort((a, b) => a - b)[0];


    if (singleCable !== undefined) {

      setResult({
        type: "success",
        message: `Optimal Cable: ${singleCable}m`,
      });

      return;
    }


    // If one cable is not enough, combine cables
    const combination = findCableCombination(
      cables,
      required
    );


    if (combination) {

      const total = combination.reduce(
        (sum, cable) => sum + cable,
        0
      );


      setResult({
        type: "success",
        message:
          `Use ${combination.join("m + ")}m = ${total}m`,
      });

    } else {

      setResult({
        type: "error",
        message:
          "Total available cable is insufficient",
      });

    }
  };


  const restart = (): void => {

    setCables([]);
    setCablesInput("");
    setCivilDistance("");

    setResult({
      message: "",
      type: "",
    });
  };


  const exportCables = (): void => {

    const blob = new Blob(
      [cables.join("\n")],
      {
        type: "text/csv",
      }
    );


    const url = URL.createObjectURL(blob);


    const a = document.createElement("a");

    a.href = url;
    a.download = "cables.csv";

    a.click();


    URL.revokeObjectURL(url);
  };


  return (
    <>
      <div className="app">

        <div className="header">

          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/New-mtn-logo.jpg/960px-New-mtn-logo.jpg"
            alt="MTN"
          />


          <h1>
            Cable Optimization Service
          </h1>


          <div className="sub">
            Civil Distance → Matching Cable Distance
          </div>

        </div>



        <div className="grid">

          <div className="card">

            <label>
              Available Cable Lengths (meters)
            </label>


            <input

              placeholder="e.g. 50, 60, 80, 100"

              value={cablesInput}

              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCablesInput(e.target.value)
              }

            />



            <div className="actions">

              <button
                className="primary"
                onClick={updateCables}
              >
                Update Cables
              </button>


              <button
                className="secondary"
                onClick={exportCables}
              >
                Export
              </button>

            </div>



            <div className="badge">

              {cables.length
                ? cables.map((c) => `${c}m`).join(" • ")
                : "No cables loaded"}

            </div>


          </div>





          <div className="card">

            <div className="actions">


              <button

                className="primary"

                onClick={() => setShowModal(true)}

              >
                Calculate
              </button>



              <button

                className="danger"

                onClick={restart}

              >
                Reset
              </button>


            </div>

          </div>


        </div>

      </div>





      {showModal && (

        <div className="modal">


          <div className="modal-box">


            <span

              className="close"

              onClick={() => setShowModal(false)}

            >
              ✕
            </span>



            <h3 style={{ marginBottom: "12px" }}>

              Cable Distance Calculator

            </h3>




            <input

              type="number"

              placeholder="Enter civil distance (m)"

              value={civilDistance}

              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCivilDistance(e.target.value)
              }

            />





            <div className="actions">


              <button

                className="primary"

                onClick={calculateCable}

              >
                Calculate
              </button>



              <button

                className="secondary"

                onClick={() => {

                  setCivilDistance("");

                  setResult({
                    message: "",
                    type: "",
                  });

                }}

              >
                Clear
              </button>


            </div>




            {result.message && (

              <div className={`result ${result.type}`}>

                {result.message}

              </div>

            )}



          </div>


        </div>

      )}

    </>
  );
}

export default App;