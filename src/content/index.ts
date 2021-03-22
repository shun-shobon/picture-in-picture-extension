interface HTMLVideoElement {
  requestPictureInPicture(): void;
}

let isEnable = false;

const handleClick = (event: MouseEvent) => {
  event.preventDefault();
  isEnable = false;
  unsetCursor();
  document.removeEventListener("mouseup", handleClick);
  const element = document.elementFromPoint(event.clientX, event.clientY);
  if (element === null) return;

  if (element.tagName === "VIDEO") {
    (element as HTMLVideoElement).requestPictureInPicture();
    return;
  }

  const video = element.getElementsByTagName("video").item(0);
  if (video !== null) {
    video.requestPictureInPicture();
  }
};

const setCursor = () => {
  document.body.style.setProperty("cursor", "zoom-in", "important");
};
const unsetCursor = () => {
  document.body.style.setProperty("cursor", null);
};

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "search") {
    if (isEnable) {
      isEnable = false;
      unsetCursor();
      document.removeEventListener("mouseup", handleClick);
    } else {
      isEnable = true;
      setCursor();
      document.addEventListener("mouseup", handleClick);
    }
  }
});
