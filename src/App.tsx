import { useEffect, useState } from "react";
import { lev1, lev2, randomData } from "./func";
import "./app.scss";
import Table from "./components/Table/Table";

const App = () => {
  const [data, setData] = useState([] as Array<lev1>);
  const [input, setInput] = useState("");
  const [option, setOption] = useState("");
  const [flag, setFlag] = useState(true);
  const [flag2, setFlag2] = useState(true);
  const [inputOpen, setInputOpen] = useState(false);
  const [optionOpen, setOptionOpen] = useState(false);
  const [open, setOpen] = useState({ id: "", open: false });

  // input ui
  const handleShowInput = () => {
    if (optionOpen) {
      setOptionOpen(false);
      setInputOpen(!inputOpen);
    } else {
      setInputOpen(!inputOpen);
    }
  };
  const handleShowOption = () => {
    if (inputOpen) {
      setInputOpen(false);
    } else {
      setOptionOpen(!optionOpen);
    }
  };
  // end input ui

  // useeffect
  useEffect(() => {
    setData(randomData());
  }, []);
  // useeffect

  // filter
  let arr = data.filter((i) =>
    i.items.find(({ title }) => title.includes(input || option))
  );
  let arr2: Array<lev2> = [];
  arr.forEach((i) => i.items.forEach((i) => arr2.push(i)));
  arr2 = arr2.filter(({ title }) => title.includes(input || option));
  const handleUi = (val: any) => {
    let t: Array<lev2> = [];
    val.items.forEach((i: any) => {
      arr2.forEach((x: any) => {
        if (i.title === x.title) {
          t.push(i);
        }
      });
    });
    return t;
  };
  const handleHide = (val: string) => {
    if (flag) {
      setOption(val);
      setFlag(!flag);
    } else {
      setOption("");
      setFlag(!flag);
    }
  };
  // filter

  // hide tables
  const handleHideTable = (val: string) => {
    if (flag2) {
      setOpen({ id: val, open: true });
      setFlag2(!flag2);
    } else {
      setOpen({ id: val, open: false });
      setFlag2(!flag2);
    }
  };
  // hide tables

  return (
    <div className="app">
      {/* search and input */}
      {option.length === 0 && (
        <div className="app__search">
          <div className="app__search-option">
            <span
              onClick={() => handleShowOption()}
              className="app__search-close"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
                  fill="white"
                />
              </svg>
            </span>
            {optionOpen && (
              <select onChange={(e) => setOption(e.target.value)} id="">
                <option value=""></option>
                {arr2.map((i) => (
                  <option key={i.title} value={i.title}>
                    {i.title}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="app__search-input">
            {inputOpen && (
              <input type="text" onChange={(e) => setInput(e.target.value)} />
            )}
            <span
              onClick={() => handleShowInput()}
              className="app__search-look"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z"
                  fill="white"
                />
              </svg>
            </span>
          </div>
        </div>
      )}
      {/* end search end input */}

      {/* data */}
      {arr?.map((i) => (
        <div className="lev1" key={i.title}>
          <button>{i.title}</button>

          <div>
            <span className="lev1__line"></span>
            <span className="lev1__line-hor"></span>
            <div className="lev2">
              {handleUi(i).map((i) => (
                <div key={i.title}>
                  <button onClick={() => handleHide(i.title)}>{i.title}</button>
                  <div className="lev2__container">
                    {i.items.map((t) => (
                      <Table
                        open={open}
                        handleHideTable={handleHideTable}
                        key={t.title}
                        i={t}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
      {/* end data */}
    </div>
  );
};

export default App;
