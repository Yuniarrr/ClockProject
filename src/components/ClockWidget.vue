<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-card
          class="mx-auto absolute"
          style=""
          :style="{
            'text-shadow: 0 0 20px rgba(10, 175, 230, 1),  0 0 20px rgba(10, 175, 230, 0);':
              this.$vuetify.theme.dark,
            '': !this.$vuetify.theme.dark,
          }"
        >
          <v-list-item>
            <v-list-item-content>
              <div class="mx-auto my-auto mb-n3">
                <DigitalWidget v-if="CLOCK.settings.clock_style === 'digital'" />
                <AnalogWidget class="mb-3" v-else />
              </div>
              <div>
                <MoreWidget />
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MoreWidget from "./MoreWidget.vue";
import DigitalWidget from "./DigitalWidget.vue";
import AnalogWidget from "./AnalogWidget.vue";
import { useClock } from "@/store/index.js";

export default {
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
      that.data.time = that.CurrentTime();
    }, 1000);
  },
  components: { 
    MoreWidget,
    DigitalWidget,
    AnalogWidget
  },
};
</script>
