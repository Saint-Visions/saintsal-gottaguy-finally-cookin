import * as React from "react";
import * as RechartsPrimitive from "recharts";
import { cn } from "@/lib/utils";

type PayloadItem = {
  dataKey?: string;
  name?: string;
  color?: string;
  value?: number;
  payload?: Record<string, any>;
};

export type ChartConfig = {
  [key: string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
    color?: string;
    theme?: {
      light?: string;
      dark?: string;
    };
  };
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }
  return context;
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig;
    children: React.ReactElement;
  }
>(({ id, className, config, children, ...props }, ref) => {
  const chartId = `chart-${id || React.useId().replace(/:/g, "")}`;
  return (
    <ChartContext.Provider value={{ config }}>
      <div ref={ref} data-chart={chartId} className={cn("relative", className)} {...props}>
        <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = "ChartContainer";

const ChartTooltip = RechartsPrimitive.Tooltip;

const ChartTooltipContent = ({
  active,
  payload,
  label,
  className,
}: {
  active?: boolean;
  payload?: PayloadItem[];
  label?: string | number;
  className?: string;
}) => {
  const { config } = useChart();

  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className={cn("bg-white text-black p-3 rounded shadow", className)}>
      {label && <div className="font-medium mb-2">{label}</div>}
      {payload.map((item, idx) => {
        const key = item.name || item.dataKey || `item-${idx}`;
        const conf = config[key as string];
        return (
          <div key={idx} className="flex justify-between items-center text-sm mb-1">
            <div className="flex items-center gap-2">
              {conf?.icon && <conf.icon />}
              <span>{conf?.label || key}</span>
            </div>
            <span className="font-mono">{item.value}</span>
          </div>
        );
      })}
    </div>
  );
};

ChartTooltipContent.displayName = "ChartTooltipContent";

const ChartLegend = RechartsPrimitive.Legend;

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
};
