import { get, set } from 'idb-keyval';
import { defineStore } from 'pinia';
import { Athlete } from '../modules/athlete';
import { deserialize, serialize } from '../utils/persist';

export const useAthleteStore = defineStore('athlete', {
  state: () => ({
    athlete: new Athlete(),
  }),

  actions: {
    async hydrate() {
      const data = await get('athlete');
      if (data !== undefined) {
        this.athlete = deserialize(Athlete, data);
      }
    },

    async persist() {
      await set('athlete', serialize(this.athlete));
    },
  },
});
