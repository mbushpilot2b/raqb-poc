import React from "react";
const ImportAntd = React.lazy(() => import("./antd"));

const Import: React.FC = () => {
  return <React.Suspense fallback={<>loading styles for antd</>}><ImportAntd /></React.Suspense>;
};

export default Import;
