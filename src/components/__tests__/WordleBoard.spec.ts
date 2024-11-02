import { DOMWrapper, mount, VueWrapper } from "@vue/test-utils";
import WordleBoard from "../WordleBoard.vue";
import { DEFEAT_MESSAGE, VICTORY_MESSAGE } from "@/settings";

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

  test("if a word of the day provided does not have exactly 5 chars, emits warning", async (): Promise<void> => {
    vi.spyOn(console, "warn");

    mount(WordleBoard, { props: { wordOfTheDay: "SPY" } });

    expect(console.warn).toHaveBeenCalled();
  });
});
