const ProgressBar = ({ progress }) => {
  const colors = [
    "rgb(255, 215, 160)",
    "rgb(255, 175, 160)",
    "rgb(110, 115, 150)",
    "rgb(140, 180, 150)",
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div className="outer-bar">
      <div
        className="inner-bar"
        style={{ width: `${progress}%`, backgroundColor: randomColor }}
      ></div>
    </div>
  );
};

export default ProgressBar;
