<script setup lang="ts">
import { DEFEAT_MESSAGE, VICTORY_MESSAGE, WORD_SIZE } from "@/settings";
import { computed, ref, triggerRef } from "vue";
import enWords from "@/words.en.json";

defineProps({
  wordOfTheDay: {
    type: String,
    validator: (wordGiven: string) => enWords.includes(wordGiven),
  },
});

const guessInProgress = ref<string | null>(null);
const guessSubmitted = ref("");

const formattedGuessInProgress = computed<string>({
  get() {
    return guessInProgress.value ?? "";
  },
  set(rawValue: string) {
    guessInProgress.value = rawValue
      .slice(0, WORD_SIZE)
      .toUpperCase()
      .replace(/[^a-z]+/gi, "");

    triggerRef(formattedGuessInProgress);
  },
});

function onSubmit() {
  if (!enWords.includes(formattedGuessInProgress.value)) return;

  guessSubmitted.value = formattedGuessInProgress.value;
}
</script>

<template>
  <input
    :maxlength="WORD_SIZE"
    type="text"
    v-model="formattedGuessInProgress"
    @keydown.enter="onSubmit"
  />
  <p
    v-if="guessSubmitted.length"
    v-text="guessSubmitted === wordOfTheDay ? VICTORY_MESSAGE : DEFEAT_MESSAGE"
  ></p>
</template>
