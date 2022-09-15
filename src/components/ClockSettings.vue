<template>
  <v-sheet height="100%" class="overflow-auto" style="position: relative">
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
        <v-list-item-title class="mb-n2">
          Change Clock Style
        </v-list-item-title>
        <div>
          <v-radio-group col>
            <label for="analog" class="mb-1">
              <input
                type="radio"
                id="analog"
                value="analog"
                v-model="CLOCK.settings.clock_style"
                @change="CLOCK.ChangeClockStyle()"
              />
              Analog
            </label>
            <label for="digital" class="mb-1">
              <input
                type="radio"
                id="digital"
                value="digital"
                v-model="CLOCK.settings.clock_style"
                @change="CLOCK.ChangeClockStyle()"
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
        <v-list-item-title class="mb-n2">
          Change Date Format
        </v-list-item-title>
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

    <v-list dense class="mb-4">
      <v-list-item-content>
        <v-list-item-title class="mb-n2">
          Change Time Format
        </v-list-item-title>
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

    <!-- <v-divider></v-divider> -->

    <!-- <v-list dense class="mb-n3">
      <v-list-item-content>
        <v-list-item-title class="mb-n2"> Change Language </v-list-item-title>
        <div>
          <v-radio-group col>
            <v-radio label="English" value="english"></v-radio>
            <v-radio label="Indonesia" value="indonesia"></v-radio>
          </v-radio-group>
        </div>
      </v-list-item-content>
    </v-list>

    <v-divider></v-divider> -->

    <!-- <v-list>
        <v-list-item-content>
            <v-list-item-title class="mb-n2"> Change Clock Color </v-list-item-title>
            <div>
            <v-radio-group col>
                <v-radio label="Red" value="1"></v-radio>
                <v-radio label="Blue" value="2"></v-radio>
                <v-radio label="Green" value="3"></v-radio>
                <v-radio label="Yellow" value="4"></v-radio>
                <v-radio label="Purple" value="5"></v-radio>
                <v-radio label="Orange" value="6"></v-radio>
            </v-radio-group>
            </div>
        </v-list-item-content>
    </v-list> -->
  </v-sheet>
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
  data() {
    return {
      fontSize: [],
      dateFormat: "",
    };
  },
  methods: {
    changeFontSize: () => {
      // let that = this;
      // let fonts = e.target.value;
      // console.log(that.fontSize);
      // let size = this.fontSize;
      // switch (size) {
      //   case "small":
      //     console.log(size);
      //     // size.style = "3rem";
      //     break;
      //   case "medium":
      //     console.log(size);
      //     // size.style = "4rem";
      //     break;
      //   case "large":
      //     console.log(size);
      //     // size.style = "5rem";
      //     break;
      //   default:
      //     break;
      // }
    },
    changeDateFormat() {
      console.log("change date format");
    },
    changeTimeFormat() {
      console.log("change time format");
    },
    changeLanguage() {
      console.log("change language");
    },
    changeClockStyle() {
      console.log("change clock style");
    },
    changeClockColor() {
      console.log("change clock color");
    },
  },
  created() {
    // setInterval(() => {
    //   console.log(this.fontSize);
    // }, 1000);
  },
};
</script>