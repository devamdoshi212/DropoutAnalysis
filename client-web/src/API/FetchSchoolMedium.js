const FetchSchoolMedium = async () => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  const response = await fetch(
    "http://localhost:9999/getSchoolType",
    requestOptions
  );
  const result = await response.json();
  return result.data || [];
};

export default FetchSchoolMedium;
