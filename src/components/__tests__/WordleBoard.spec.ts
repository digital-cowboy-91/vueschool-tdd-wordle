import { DOMWrapper, mount, VueWrapper } from "@vue/test-utils";
import WordleBoard from "../WordleBoard.vue";
import { VICTORY_MESSAGE } from "@/settings";

describe("WordleBoard", () => {
  test("a victory message appears when the user makes a guess that matches the word of the day", async (): Promise<void> => {
    // Arrange
    const wrapper: VueWrapper = mount(WordleBoard, {
      props: { wordOfTheDay: "TESTS" },
    });

    // Act
    const guessInput: DOMWrapper<Element> = wrapper.find("input[type=text]");
    await guessInput.setValue("TESTS");
    await guessInput.trigger("keydown.enter");

    // Assert
    expect(wrapper.text()).toContain(VICTORY_MESSAGE);
  });

  test("a defeat message appears if the users makes an incorrect guess", async (): Promise<void> => {
    const wrapper: VueWrapper = mount(WordleBoard, {
      props: { wordOfTheDay: "TESTS" },
    });

    const guessInput: DOMWrapper<Element> = wrapper.find("input[type=text]");
    await guessInput.setValue("HELLO");
    await guessInput.trigger("keydown.enter");

    expect(wrapper.text()).toContain("You loose!");
  });

  test.todo("no end-of-game message appears if the user has not made a guess");
});
