export function positionSubmenu(node: HTMLElement) {
  function adjust() {
    const rect = node.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // 右端をはみ出す場合は左側に表示
    if (rect.right > viewportWidth) {
      node.style.left = "auto";
      node.style.right = "100%";
    } else {
      node.style.left = "100%";
      node.style.right = "auto";
    }

    // 下端をはみ出す場合は上方向に調整
    if (rect.bottom > viewportHeight) {
      const overflow = rect.bottom - viewportHeight;
      node.style.top = `-${overflow}px`;
    } else {
      node.style.top = "0";
    }
  }

  // submenuが表示された直後に位置を計算
  const observer = new MutationObserver(adjust);
  const parent = node.parentElement;
  if (parent) {
    observer.observe(parent, {
      attributes: true,
      attributeFilter: ["style", "class"],
    });
  }

  // ホバー時にも再計算
  node.parentElement?.addEventListener("mouseenter", adjust);

  return {
    destroy() {
      observer.disconnect();
      node.parentElement?.removeEventListener("mouseenter", adjust);
    },
  };
}
