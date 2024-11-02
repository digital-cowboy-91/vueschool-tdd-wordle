import { DOMWrapper, mount, VueWrapper } from "@vue/test-utils";
import WordleBoard from "../WordleBoard.vue";
import { DEFEAT_MESSAGE, VICTORY_MESSAGE, WORD_SIZE } from "@/settings";

describe("WordleBoard", () => {
  const wordOfTheDay: string = "TESTS";
  let wrapper: ReturnType<typeof mount>;

  beforeEach((): void => {
    wrapper = mount(WordleBoard, {
      props: { wordOfTheDay },
    });
  });

  async function playersSubmitGuess(guess: string): Promise<void> {
    const guessInput: DOMWrapper<Element> = wrapper.find("input[type=text]");
    await guessInput.setValue(guess);
    await guessInput.trigger("keydown.enter");
  }

  describe("End of game messages", () => {
    test("a victory message appears when the user makes a guess that matches the word of the day", async (): Promise<void> => {
      await playersSubmitGuess(wordOfTheDay);

      expect(wrapper.text()).toContain(VICTORY_MESSAGE);
    });

    test("a defeat message appears if the users makes an incorrect guess", async (): Promise<void> => {
      await playersSubmitGuess("HELLO");

      expect(wrapper.text()).toContain(DEFEAT_MESSAGE);
    });

    test("no end-of-game message appears if the user has not made a guess", async (): Promise<void> => {
      expect(wrapper.text()).not.toContain(VICTORY_MESSAGE);
      expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE);
    });
  });

  describe("Word of the day rules", () => {
    beforeEach(() => {
      console.warn = vi.fn();
    });
    test.each([
      { wordOfTheDay: "SPY", reason: "must have 5 characters" },
      { wordOfTheDay: "hello", reason: "must be all in uppercase" },
      { wordOfTheDay: "ABCDE", reason: "must be a valid English word" },
    ])(
      "emit warning for $wordOfTheDay, word of the day $reason,",
      async ({ wordOfTheDay }): Promise<void> => {
        mount(WordleBoard, { props: { wordOfTheDay } });

        expect(console.warn).toHaveBeenCalled();
      }
    );

    test("don't emit warning if the word of the day is a valid", () => {
      mount(WordleBoard, { props: { wordOfTheDay: "HELLO" } });

      expect(console.warn).not.toHaveBeenCalled();
    });
  });

  describe("Player input", () => {
    test(`player guesses are limited to ${WORD_SIZE} characters`, async () => {
      await playersSubmitGuess("TESTSEXTRA");

      expect(wrapper.text()).toContain(VICTORY_MESSAGE);
    });

    test(`player guesses cannot be submitted if they are not real words`, async () => {
      await playersSubmitGuess("ABCDE");

      expect(wrapper.text()).not.toContain(VICTORY_MESSAGE);
      expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE);
    });

    test("player guesses are not case-sensitive", async () => {
      await playersSubmitGuess(wordOfTheDay.toLowerCase());

      expect(wrapper.text()).toContain(VICTORY_MESSAGE);
    });
  });
});
