function Container({ children, className = "" }) {
  const classes = ["context-container", className].filter(Boolean).join(" ");

  return <div className={classes}>{children}</div>;
}

export default Container;
