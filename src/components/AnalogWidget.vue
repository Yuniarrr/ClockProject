<template>
  <v-container>
    <div
      class="mt-4 mb-5"
      :class="{
        'text-sm': CLOCK.settings.font_size === 'small',
        'text-h5': CLOCK.settings.font_size === 'medium',
        'text-h4': CLOCK.settings.font_size === 'large',
      }"
    >
      <span>{{ CLOCK.data.date }}</span>
    </div>
    <div>
      <v-row>
        <v-col>
          <Clock color="blue" border="solid" size="200px" />
          <!-- <span class="text-h2 font-bold ml-4" id="noon">
            {{ CLOCK.Time().toUpperCase() }}
          </span> -->
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import Clock from "vue-clock2";
import { useClock } from "@/store/index.js";

export default {
  components: {
    Clock,
  },
  setup() {
    const CLOCK = useClock();
    return {
      CLOCK,
    };
  },
  created() {
    setInterval(() => {
      let that = this.CLOCK;
      that.data.date = that.CurrentDate();
    }, 1000);
  },
};
</script>
