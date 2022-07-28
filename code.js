(function () {
  const commits = document
    .querySelector("#commits_bucket")
    .querySelectorAll(".Details");

  const insertHtmlAndCopy = (html) => {
    const block = document.createElement("div");
    block.innerHTML = html;
    document.body.appendChild(block);

    const range = document.createRange();
    range.selectNodeContents(block);
    const sel = window.getSelection();

    sel.removeAllRanges();
    sel.addRange(range);

    setTimeout(() => {
      block.remove();
    }, 10);

    return document.execCommand("copy");
  };

  if (commits.length) {
    const list = [...commits].reduce((acc, commit) => {
      const link = commit.querySelector("a.Link--primary");
      const text = link?.textContent;

      if (!link || !text) return acc;

      const url = link?.getAttribute("href");
      const issueLink = commit.querySelector(".issue-link");

      let li = `<li>${text.slice(0, -1)}`;

      if (issueLink) {
        const issueId = issueLink?.textContent;
        const issueUrl = issueLink?.getAttribute("data-url");

        li += `(<a href="${issueUrl}">${issueId}</a>)`;
      }

      li += "</li>";
      return acc + li;
    }, "");

    insertHtmlAndCopy(`<ul>${list}</ul>`);
  }
})();
