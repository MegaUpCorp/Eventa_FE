"use client";

import React from "react";
import { 
  Area, 
  AreaChart as RechartsAreaChart, 
  CartesianGrid, 
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "src/components/ui/card";

interface ChartData {
  [key: string]: string | number;
}

export interface AreaChartComponentProps {
  className?: string;
  data: ChartData[];
  index: string;
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
  title?: string;
  description?: string;
  showFooter?: boolean;
  footerContent?: React.ReactNode;
}

export function AreaChartComponent({
  className,
  data,
  index,
  categories,
  colors = ["hsl(var(--chart-1))", "hsl(var(--chart-2))"],
  valueFormatter = (value: number) => `${value}`,
  title,
  description,
  showFooter = false,
  footerContent,
}: AreaChartComponentProps) {
  // Create gradient IDs for each category
  const gradientIds = categories.map((category, i) => `fill${category}`);

  return (
    <Card className={className}>
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>
        <ResponsiveContainer width="100%" height={245}>
          <RechartsAreaChart
            data={data}
            margin={{
              left: 10,
              right: 10,
              top: 10,
              bottom: 10,
            }}
          >
            <defs>
              {categories.map((category, i) => (
                <linearGradient 
                  key={gradientIds[i]} 
                  id={gradientIds[i]} 
                  x1="0" 
                  y1="0" 
                  x2="0" 
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={colors[i] || "currentColor"}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={colors[i] || "currentColor"}
                    stopOpacity={0.1}
                  />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid vertical={false} stroke="hsl(var(--border))" />
            <XAxis 
              dataKey={index} 
              tickLine={false} 
              axisLine={false} 
              tickMargin={8}
              stroke="hsl(var(--muted-foreground))"
            />
            <YAxis 
              tickFormatter={valueFormatter}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              stroke="hsl(var(--muted-foreground))"
            />
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        {payload.map((entry, index) => (
                          <div key={`item-${index}`} className="flex flex-col">
                            <span className=" text-muted-foreground">
                              {entry.name}
                            </span>
                            <span className="text-[9px]">
                              {valueFormatter(entry.value as number)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            {categories.map((category, i) => (
              <Area
                key={category}
                type="natural"
                dataKey={category}
                stackId="stack"
                stroke={colors[i] || "currentColor"}
                fill={`url(#${gradientIds[i]})`}
                fillOpacity={0.4}
              />
            ))}
          </RechartsAreaChart>
        </ResponsiveContainer>
      </CardContent>
      {showFooter && footerContent && (
        <CardFooter>
          {footerContent}
        </CardFooter>
      )}
    </Card>
  );
}