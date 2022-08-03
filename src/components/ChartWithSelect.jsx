import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart des mois",
    },
  },
};

function ChartWithSelect({ dataMonths }) {
  const [filteredDataMonths, setFilteredDataMonths] =
    React.useState(dataMonths);
  const [selectedMonth, setSelectedMonth] = React.useState("");
  const handleChangeMonth = (e) => {
    setSelectedMonth(e.target.value);
  };

  React.useEffect(() => {
    if (selectedMonth !== "") {
      const fLabelIdx = dataMonths?.labels.indexOf(selectedMonth);
      let fLabelDataSets = Object.assign([], dataMonths.datasets).map(
        (dataset) => {
          return { ...dataset, data: [dataset.data[fLabelIdx]] };
        }
      );

      setFilteredDataMonths({
        labels: [selectedMonth],
        datasets: fLabelDataSets,
      });
    } else {
      setFilteredDataMonths(dataMonths);
    }
  }, [selectedMonth, dataMonths]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignItems: "center",
      }}
    >
      <FormControl style={{ width: "30%" }}>
        <InputLabel id="demo-simple-select-label" shrink>
          Mois
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedMonth}
          label="Mois"
          onChange={handleChangeMonth}
          displayEmpty
          renderValue={(value) => (value === "" ? "All" : value)}
        >
          <MenuItem value="">All</MenuItem>
          {dataMonths?.labels.map((label) => (
            <MenuItem key={label} value={label}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Bar options={options} data={filteredDataMonths} />
    </div>
  );
}

export default ChartWithSelect;
