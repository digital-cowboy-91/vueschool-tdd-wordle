<script setup lang="ts">
import { DEFEAT_MESSAGE, VICTORY_MESSAGE } from "@/settings";
import { ref } from "vue";
import enWords from "@/words.en.json";

defineProps({
  wordOfTheDay: {
    type: String,
    validator: (wordGiven: string) => enWords.includes(wordGiven),
  },
});

const guessInProgress = ref("");
const guessSubmitted = ref("");
</script>

<template>
  <input
    type="text"
    v-model="guessInProgress"
    @keydown.enter="guessSubmitted = guessInProgress"
  />
  <p
    v-if="guessSubmitted.length"
    v-text="guessSubmitted === wordOfTheDay ? VICTORY_MESSAGE : DEFEAT_MESSAGE"
  ></p>
</template>
