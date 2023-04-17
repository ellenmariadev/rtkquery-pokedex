import PokemonCard from "./PokemonCard";
import { FixedSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./styles.css";

const Cell = ({ columnIndex, rowIndex, style, results, columns }) => {
  const index = rowIndex * columns + columnIndex;
  if (index >= results.length) {
    return null;
  }
  const { id, name } = results[index];
  return (
    <div style={{ ...style }}>
      <PokemonCard key={id} name={name} />
    </div>
  );
};

Cell.propTypes = {
  columnIndex: PropTypes.number.isRequired,
  rowIndex: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
  results: PropTypes.array.isRequired,
  columns: PropTypes.number.isRequired,
};

const VirtualizedList = ({ results, gridRef }) => {
  const [columns, setColumns] = useState(4);

  const isValidWidth = (width) => {
    return typeof width === "number" && width > 0;
  };

  /* it's necessary to calculate the window width to customize a responsive grid when using React Window. */

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (!isValidWidth(width)) {
        console.error("Invalid value:", width);
        return;
      }
      if (width <= 500) {
        setColumns(1);
      } else if (width <= 1000) {
        setColumns(2);
      } else {
        setColumns(4);
      }
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);

    return () => {
      window.removeEventListener("resize", updateColumns);
    };
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <AutoSizer>
        {({ height, width }) => {
          if (!isValidWidth(width)) {
            return <div>Error: Invalid width value</div>;
          }
          return (
            <Grid
              ref={gridRef}
              className={`react-window-list`}
              columnCount={columns}
              columnWidth={width / columns}
              height={height}
              rowCount={Math.ceil(results.length / columns)}
              rowHeight={350}
              width={width}
            >
              {(props) => (
                <Cell {...props} results={results} columns={columns} />
              )}
            </Grid>
          );
        }}
      </AutoSizer>
    </div>
  );
};

VirtualizedList.propTypes = {
  results: PropTypes.array.isRequired,
  gridRef: PropTypes.object,
};

export default VirtualizedList;
