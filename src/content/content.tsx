import FilterMenu from "@/components/FilterMenu";
import { createRoot, Root } from "react-dom/client";

let isInjected = false;
let reactRoot: Root | null = null;

const observer = new MutationObserver(() => {
  const portalDiv = document.querySelector(
    "div.js-portal:has(.user-tag-picker)",
  );
  const isMenuOpen = portalDiv != null;

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
    // defaultMenu.style.position = "relative";
    // defaultMenu.style.right = "auto";
    // defaultMenu.style.transform = "translateX(-100%)";

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
    } else {
      console.log("LEAK");
    }

    isInjected = false;
  }
});

console.log("Osu! extension test");

observer.observe(document.body, { childList: true, subtree: true });
