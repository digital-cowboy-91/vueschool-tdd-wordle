<script setup lang="ts">
import { DEFEAT_MESSAGE, VICTORY_MESSAGE, WORD_SIZE } from "@/settings";
import { computed, ref } from "vue";
import enWords from "@/words.en.json";

defineProps({
  wordOfTheDay: {
    type: String,
    validator: (wordGiven: string) => enWords.includes(wordGiven),
  },
});

const guessInProgress = ref("");
const guessSubmitted = ref("");

const formattedGuessInProgress = computed({
  get() {
    return guessInProgress.value;
  },
  set(rawValue: string) {
    guessInProgress.value = rawValue.slice(0, WORD_SIZE);
  },
});
</script>

<template>
  <input
    maxlength="WORD_SIZE"
    type="text"
    v-model="formattedGuessInProgress"
    @keydown.enter="guessSubmitted = guessInProgress"
  />
  <p
    v-if="guessSubmitted.length"
    v-text="guessSubmitted === wordOfTheDay ? VICTORY_MESSAGE : DEFEAT_MESSAGE"
  ></p>
</template>
