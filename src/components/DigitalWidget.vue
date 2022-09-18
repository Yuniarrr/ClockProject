<template>
  <v-container>
    <div
      class="mt-4 mb-7"
      :class="{
        'text-sm': CLOCK.settings.font_size === 'small',
        'text-h5': CLOCK.settings.font_size === 'medium',
        'text-h4': CLOCK.settings.font_size === 'large',
      }"
    >
      <span>{{ CLOCK.data.date }}</span>
    </div>
    <div class="text-overline mb-4">
      <span
        :style="{
          'font-size': CLOCK.data.fontSize + 'rem',
        }"
        >{{ CLOCK.data.time }}</span
      >
    </div>
  </v-container>
</template>

<script>
import { useClock } from "@/store/index.js";

export default {
  setup() {
    const CLOCK = useClock();
    return {
      CLOCK,
    };
  },
};
</script>
