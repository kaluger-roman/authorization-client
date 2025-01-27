declare module "*.webp" {
  const content: string;

  export default content;
}

declare module "*.svg" {
  import React from "react";
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const path: string;

  export default path;
  export { ReactComponent };
}
