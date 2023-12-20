import { useLocation } from "react-router-dom";

const Remedies = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const reason = searchParams.get("reason");
  console.log(reason);
  return <div>Remedies</div>;
};

export default Remedies;
