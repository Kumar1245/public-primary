import React, { useState } from "react";
import { useRouter } from "next/router";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import Link from "next/link";

const BreadCrumb = () => {
  const router = useRouter();
  const pathArray = router.pathname.split("/").filter((segment) => segment);
  const formatSegment = (segment) =>
    segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
  return (
    <div className="breadcrumbsSet">
      <Breadcrumb>
        <BreadcrumbItem>
          <a href="#">Home</a>
        </BreadcrumbItem>
        {pathArray.map((segment, index) => {
          const fullPath = "/" + pathArray.slice(0, index + 1).join("/");

          const isLast = index === pathArray.length - 1;
          return (
            <BreadcrumbItem key={index} active={isLast}>
              {isLast ? (
                formatSegment(segment)
              ) : (
                <Link href={fullPath}>{formatSegment(segment)}</Link>
              )}
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>
    </div>
  );
};

export default BreadCrumb;
