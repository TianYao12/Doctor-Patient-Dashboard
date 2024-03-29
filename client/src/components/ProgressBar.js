// ProgressBar(progress) updates the progress bar on the frontend based on the progress parameter
const ProgressBar = ({ progress }) => {
 
  return (
    <div className="outer-bar">
      <div
        className="inner-bar"
        style={{ width: `${progress}%`, backgroundColor: "rgb(255, 175, 160)" }}
      ></div>
    </div>
  );
};

export default ProgressBar;
