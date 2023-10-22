import { reactive } from "vue";
import Athlete from "./modules/athlete";

const store = reactive({
  athlete: new Athlete(),
});

export default store;
