document.addEventListener("securitypolicyviolation", (e) => {
  console.log(e.blockedURI);
  console.log(e.violatedDirective);
  console.log(e.originalPolicy);

  console.log(e.sample);
  console.log(`at ${e.lineNumber}:${e.columnNumber}`);
});
