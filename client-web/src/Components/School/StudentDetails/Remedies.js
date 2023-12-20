import { useLocation } from "react-router-dom";

const Remedies = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const reason = searchParams.get("reason");

  console.log(reason);
  return (
    <>
      <div>Title : XYZ</div>
      <div>STD : XYZ</div>
      <div>PDF :</div>
      <ui>
        <li>
          {" "}
          <a href="/">Link 1</a>
        </li>
        <li>
          {" "}
          <a href="/">Link 1</a>
        </li>
      </ui>
      <div>Video :</div>
      <ui>
        <li>
          <a href="/">Link 1</a>
        </li>
        <li>
          <a href="/">Link 1</a>
        </li>
      </ui>
      <div>PPT :</div>
      <ui>
        <li>
          <a href="/">Link 1</a>
        </li>
        <li>
          <a href="/">Link 1</a>
        </li>
      </ui>
      <div>Links :</div>
      <ui>
        <li>
          <a href="/">Link 1</a>
        </li>
        <li>
          <a href="/">Link 1</a>
        </li>
      </ui>
    </>
  );
};

export default Remedies;
