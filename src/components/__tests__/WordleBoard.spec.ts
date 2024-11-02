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
});
