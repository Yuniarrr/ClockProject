<template>
  <v-card
    height="100%"
    class="overflow-auto"
    style="
      position: relative;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    "
  >
    <v-list dense class="mb-n7">
      <v-list-item-content>
        <v-list-item-title class="mb-n3">Font Size</v-list-item-title>
        <v-radio-group width="100%">
          <label for="small" class="mb-1">
            <input
              type="radio"
              id="small"
              value="small"
              v-model="CLOCK.settings.font_size"
              @change="CLOCK.ChangeFontSize()"
            />
            Small
          </label>
          <label for="medium" class="mb-1">
            <input
              type="radio"
              id="medium"
              value="medium"
              v-model="CLOCK.settings.font_size"
              @change="CLOCK.ChangeFontSize()"
            />
            Medium
          </label>
          <label for="large" class="mb-1">
            <input
              type="radio"
              id="large"
              value="large"
              v-model="CLOCK.settings.font_size"
              @change="CLOCK.ChangeFontSize()"
            />
            Large
          </label>
        </v-radio-group>
      </v-list-item-content>
    </v-list>

    <v-divider></v-divider>

    <v-list dense class="mb-n7">
      <v-list-item-content>
        <div class="mt-n6">
          <v-checkbox
            label="With Day"
            style="color: black"
            v-model="CLOCK.settings.day"
            value="yes"
          ></v-checkbox>
        </div>
      </v-list-item-content>
    </v-list>

    <v-divider></v-divider>

    <v-list dense class="mb-n7">
      <v-list-item-content>
        <v-list-item-title class="mb-n2"> Change Clock Style </v-list-item-title>
        <div>
          <v-radio-group col>
            <label for="analog" class="mb-1">
              <input
                type="radio"
                id="analog"
                value="analog"
                v-model="CLOCK.settings.clock_style"
              />
              Analog
            </label>
            <label for="digital" class="mb-1">
              <input
                type="radio"
                id="digital"
                value="digital"
                v-model="CLOCK.settings.clock_style"
              />
              Digital
            </label>
          </v-radio-group>
        </div>
      </v-list-item-content>
    </v-list>

    <v-divider></v-divider>

    <v-list dense class="mb-n7">
      <v-list-item-content>
        <v-list-item-title class="mb-n2"> Change Date Format </v-list-item-title>
        <div>
          <v-radio-group col>
            <label for="satu" class="mb-1">
              <input
                type="radio"
                id="satu"
                value="satu"
                v-model="CLOCK.settings.date_format"
                @change="CLOCK.ChangeDateFormat()"
              />
              DD/MM/YYYY
            </label>
            <label for="dua" class="mb-1">
              <input
                type="radio"
                id="dua"
                value="dua"
                v-model="CLOCK.settings.date_format"
                @change="CLOCK.ChangeDateFormat()"
              />
              MM/DD/YYYY
            </label>
            <label for="tiga" class="mb-1">
              <input
                type="radio"
                id="tiga"
                value="tiga"
                v-model="CLOCK.settings.date_format"
                @change="CLOCK.ChangeDateFormat()"
              />
              YYYY/MM/DD
            </label>
          </v-radio-group>
        </div>
      </v-list-item-content>
    </v-list>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item-content>
        <v-list-item-title class="mb-n2"> Change Time Format </v-list-item-title>
        <div>
          <v-radio-group col>
            <label for="duaBelas" class="mb-1">
              <input
                type="radio"
                id="duaBelas"
                value="1"
                v-model="CLOCK.settings.time_format"
                @change="CLOCK.ChangeTimeFormat()"
              />
              12 Hour
            </label>
            <label for="duaEmpat" class="mb-1">
              <input
                type="radio"
                id="duaEmpat"
                value="2"
                v-model="CLOCK.settings.time_format"
                @change="CLOCK.ChangeTimeFormat()"
              />
              24 Hour
            </label>
          </v-radio-group>
        </div>
      </v-list-item-content>
    </v-list>

    <v-divider></v-divider>
  </v-card>
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
