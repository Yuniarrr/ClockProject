<template>
  <v-container>
    <div
      class="mt-4"
      :class="{
        'text-sm mb-4': CLOCK.settings.font_size === 'small',
        'text-h5 mb-7': CLOCK.settings.font_size === 'medium',
        'text-h4 mb-12': CLOCK.settings.font_size === 'large',
      }"
    >
      <span>{{ CLOCK.data.date }}</span>
    </div>
    <div
      class="text-overline"
      :class="{
        'mb-4': CLOCK.settings.font_size === 'small',
        'mb-4': CLOCK.settings.font_size === 'medium',
        'my-5': CLOCK.settings.font_size === 'large',
      }"
    >
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
