import React from "react";
import { BuilderComponent, builder } from "@builder.io/react";

// Builder should already be initialized in App.tsx via builder-init.ts
// Don't initialize or register components here to avoid conflicts

interface BuilderContentProps {
  model: string;
  content?: any;
  data?: any;
  options?: any;
}

export const BuilderContent: React.FC<BuilderContentProps> = ({
  model,
  content,
  data = {},
  options = {},
}) => {
  return (
    <BuilderComponent
      model={model}
      content={content}
      data={data}
      options={options}
    />
  );
};

export default BuilderContent;
