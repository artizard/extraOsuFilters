import FilterMenu from "@/components/FilterMenu";
import { createRoot, Root } from "react-dom/client";

// is menu injected
let isInjected = false;
// has tag icon been changed to the filter icon
let isIconInjected = false;
let reactRoot: Root | null = null;

const observer = new MutationObserver(() => {
  // if it's the wrong page and we have already injected, then we need to unmount
  // I don't think this will ever actually happen since clicking off of the menu closes
  // it, and it will be cleaned up normally, but I thought I would put this here to be safe.
  if (
    window.location.pathname !== "/beatmapsets" &&
    window.location.pathname !== "/beatmapsets/"
  ) {
    if (isInjected) {
      if (reactRoot) {
        reactRoot.unmount();
        reactRoot = null;
      }
      isInjected = false;
    }
    isIconInjected = false;
    return;
  }

  const portalDiv = document.querySelector(
    "div.js-portal:has(.user-tag-picker)",
  );
  const isMenuOpen = portalDiv != null;

  // Optimization to avoid .querySelector every mutation. This injection has to be in the mutationObserver
  // because if this was at the bottom of the script, it would only inject the icon once; if the user navigates away
  // and then back, the icon will not be injected again. This optimization could potentially end up desynced, but
  // I have experienced no issues and this is far more efficient.
  if (!isIconInjected) {
    // change tag icon and text to filter
    const tagButton = document.querySelector(
      "button.beatmapsets-search__icon",
    ) as HTMLElement;
    if (tagButton) {
      const tagIcon = tagButton.firstElementChild;
      tagButton.title = "Additional Filters";
      if (tagIcon) {
        tagIcon.className = "fas fa-filter";
        isIconInjected = true;
      }
    }
  }

  // inject code into menu
  if (isMenuOpen && !isInjected) {
    const menuContainer = portalDiv.firstElementChild
      ?.firstElementChild as HTMLElement;
    if (menuContainer) {
      menuContainer.style.display = "flex";
      menuContainer.style.flexDirection = "row";
      menuContainer.style.alignItems = "flex-start";
    }

    const defaultMenu = menuContainer.firstElementChild as HTMLElement;
    defaultMenu.style.borderRadius = "0 10px 10px 0";

    const injectedMenu = document.createElement("div");
    injectedMenu.id = "osu-extra-filters-menu";
    menuContainer.insertBefore(injectedMenu, defaultMenu);
    reactRoot = createRoot(injectedMenu);
    reactRoot.render(<FilterMenu defaultMenu={defaultMenu} />);
    isInjected = true;
  }
  // clean up previous stuff injected into the DOM
  else if (!isMenuOpen && isInjected) {
    if (reactRoot) {
      reactRoot.unmount();
      reactRoot = null;
      isInjected = false;
    }
  }
});

observer.observe(document.documentElement, { childList: true, subtree: true });

export function sendNewQuery(newQuery: string) {
  const searchInput = document.querySelector(
    "input.beatmapsets-search__input",
  ) as HTMLInputElement;

  if (searchInput) {
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value",
    )?.set;

    if (nativeInputValueSetter) {
      nativeInputValueSetter.call(searchInput, newQuery);
    }
    searchInput.dispatchEvent(new Event("input", { bubbles: true }));
  }
}
