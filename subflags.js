document.addEventListener("DOMContentLoaded", () => {

  const pattern = /%([a-zA-Z0-9]{4,20})%/g;

  function processTextNode(node) {
    const text = node.nodeValue;
    if (!pattern.test(text)) return;

    pattern.lastIndex = 0;

    const frag = document.createDocumentFragment();
    let last = 0;
    let match;

    while ((match = pattern.exec(text)) !== null) {
      const full = match[0];
      const code = match[1];

      frag.appendChild(document.createTextNode(text.slice(last, match.index)));

      const folder = code.slice(0, 2);
      const file = code.slice(2);

      const img = document.createElement("img");
      img.src = `flags/${folder}/${file}.png`;
      img.alt = full;
      img.style.height = "1em";
      img.style.verticalAlign = "-0.12em";

      img.draggable = false;
      img.style.userSelect = "none";
      img.style.pointerEvents = "none";

      frag.appendChild(img);

      last = match.index + full.length;
    }

    frag.appendChild(document.createTextNode(text.slice(last)));
    node.replaceWith(frag);
  }

  function walk(node) {
    if (node.nodeType === 3) {
      processTextNode(node);
    } else if (node.nodeType === 1) {
      node.childNodes.forEach(walk);
    }
  }

  walk(document.body);

});
