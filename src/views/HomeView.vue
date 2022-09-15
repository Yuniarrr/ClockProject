<template>
  <!-- <hello-world /> -->
  <v-container class="mx-auto my-auto" center>
    <v-row xs="12" sm="12" md="12" class="mx-auto my-auto">
      <v-col xs="12" sm="12" md="12" class="align-self-center mx-auto my-auto">
        <ClockWidget style="opacity: 0.9;" />
      </v-col>
      <!-- <v-col xs="12" sm="12" md="12" class="align-self-center mx-auto my-auto">
        <MoreWidget />
      </v-col> -->
    </v-row>
  </v-container>
</template>

<script>
// import HelloWorld from '../components/HelloWorld'
import ClockWidget from "../components/ClockWidget";
import MoreWidget from "../components/MoreWidget";

export default {
  name: "Home",

  components: {
    // HelloWorld,
    ClockWidget,
    MoreWidget,
  },
};
</script>
