const colorClass = document.querySelectorAll(".teal");
const colorText = document.querySelectorAll(".teal-text");
const body = document.querySelector("[data-body]");
const themeText = document.querySelector("[data-theme]");

let currentTheme = "light"; // Used to toggle theme
const lightColor = "teal";
const lightColorText = "teal-text";
const darkColor = "light-blue";
const darkColorText = "light-blue-text";

/**
 * Function that grabs the current theme from {@link currentTheme} and then adds/replaces/removes the relevant
 * classes to change the element colors. A querySelector is used to find all elements that contain
 * theme related css classes.
 * @returns {string} currentTheme
 */
const themeToggle = () => {
  if (currentTheme === "light") {
    colorClass.forEach((element) =>
      element.classList.replace(lightColor, darkColor),
    );
    colorText.forEach((element) =>
      element.classList.replace(lightColorText, darkColorText),
    );

    body.classList.add("grey", "darken-3");
    themeText.innerHTML = `<i class="tiny material-icons left">brightness_medium</i> LIGHT MODE`;
    currentTheme = "dark";
  } else if (currentTheme === "dark") {
    colorClass.forEach((element) =>
      element.classList.replace(darkColor, lightColor),
    );
    colorText.forEach((element) =>
      element.classList.replace(darkColorText, lightColorText),
    );

    body.classList.remove("grey", "darken-3");
    themeText.innerHTML = `<i class="tiny material-icons left">brightness_medium</i> DARK MODE`;
    currentTheme = "light";
  }
  return currentTheme;
};
export default themeToggle;
