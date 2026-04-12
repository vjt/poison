document.addEventListener("DOMContentLoaded", function() {

  // Get code blocks
  const codeblocks = document.querySelectorAll("pre code");

  // Iterate over each to perform modifications
  codeblocks.forEach((codeblock) => {
    // Create copy button and container element
    const copyButton = document.createElement("button");
    copyButton.className = "copy-button";
    copyButton.setAttribute("aria-label", "Copy code");
    const container = document.createElement("div");
    container.className = "code-container";
    
    // Copy clicked closure
    copyButton.addEventListener("click", (e) => {
      const code = codeblock.textContent;
      navigator.clipboard.writeText(code).then(() => {
        e.target.className = "copy-success";
        setTimeout(() => {
          e.target.className = "copy-button";
        }, 1000);
      }).catch(() => {
        e.target.className = "copy-button";
      });
    });

    // Wrap the codeblock with the container
    codeblock.parentNode.insertBefore(container, codeblock);
    container.appendChild(codeblock);
    // Add the copy button to the container
    container.appendChild(copyButton);
  })
});
