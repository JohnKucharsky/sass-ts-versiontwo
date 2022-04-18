import moment from "moment";
import { useState } from "react";
import { tableheader } from "../../func";
import TableContent, { filterArr } from "../TableContent/TableContent";
import "./table.scss";
type op = {
  id: string;
  open: boolean;
};
type Props = {
  i: tableheader;
  handleHideTable: (val: string) => void;
  open: op;
};

const Table: React.FC<Props> = ({ i, open, handleHideTable }) => {
  const [arr, setArr] = useState([] as Array<filterArr>);
  const [sw, setSw] = useState(true);
  const [swNum, setSwNum] = useState(false);

  // dates
  let dateEnd = new Date(i.dateEnd);
  let dateStart = new Date(i.dateStart);
  let dEnd = moment(dateEnd).format("DD.MM.YYYY");
  let dStart = moment(dateStart).format("DD.MM.YYYY");
  // end dates

  // sort table
  let sorted: Array<filterArr> = [];
  i.data.map((element, index) => sorted.push({ ...element, index }));
  const handleSortIndex = () => {
    if (!sw) {
      sorted.sort((a: any, b: any) => b.index - a.index);
      setArr(sorted);
      setSw(true);
    } else {
      sorted.sort((a: any, b: any) => a.index - b.index);
      setSw(false);
      setArr(sorted);
    }
  };
  const handleSortNumber = () => {
    if (!swNum) {
      sorted.sort((a: any, b: any) => b.number - a.number);
      setArr(sorted);
      setSwNum(true);
    } else {
      sorted.sort((a: any, b: any) => a.number - b.number);
      setSwNum(false);
      setArr(sorted);
    }
  };
  // end sort table

  return (
    <div className="table">
      <div
        onClick={() => {
          handleSortNumber();
          handleHideTable(i.title);
        }}
        className="table__header"
      >
        <div>
          <p className="table__header-title">{i.title}</p>
          <p className="table__header-subtitle">{i.subTitle}</p>
        </div>
        <p className="table__header-date">
          {dStart} - {dEnd}
        </p>
      </div>
      {open.open && i.title === open.id && (
        <TableContent
          arr={arr}
          sw={sw}
          swNum={swNum}
          handleSortIndex={handleSortIndex}
          handleSortNumber={handleSortNumber}
        />
      )}
    </div>
  );
};

export default Table;
