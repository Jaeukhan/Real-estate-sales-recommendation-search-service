<template>
  <LineChartGenerator
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script>
import { Line as LineChartGenerator } from "vue-chartjs/legacy";
import { mapState } from "vuex";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, CategoryScale, PointElement);
const chartStore = "chartStore";

export default {
  name: "LineChart",
  components: {
    LineChartGenerator,
  },
  props: {
    chartId: {
      type: String,
      default: "line-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      chartData: {
        labels: [
          "21.08",
          "21.09",
          "21.10",
          "21.11",
          "21.12",
          "22.01",
          "22.02",
          "22.03",
          "22.04",
          "22.05",
          "22.06",
          "22.07",
          "22.08",
        ],
        datasets: [
          {
            label: "1년간 부동산 근황",
            backgroundColor: "#f87979",
            data: [], //[40, 39, 10, 40, 39, 80, 40]
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  watch: {
    ...mapState(chartStore, ["price_li"]),
    price_li(val) {
      console.log(val);
      let data_li = [val.dayday2108];
      this.datasets.data = data_li;
    },
  },
};
</script>
