import React from "react";
import { Content } from "@builder.io/sdk-react";

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
    <Content
      apiKey={process.env.NEXT_PUBLIC_BUILDER_API_KEY!}
      model={model}
      content={content}
      data={data}
      {...options}
    />
  );
};

export default BuilderContent;
