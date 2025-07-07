import React from "react";
import { useParams } from "react-router";

function NoticeBoardDetailPage() {
  const { id } = useParams();
  console.log(id);
  return <div>notice board detail page</div>;
}

export default NoticeBoardDetailPage;
