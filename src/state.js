import { reactive } from 'vue';
import Athlete from './modules/athlete';

const state = reactive({
  athlete: new Athlete(),
});

export default state;
