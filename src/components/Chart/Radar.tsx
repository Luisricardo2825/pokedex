"use client";
import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export interface PokemonData {
  name: string;
  color?: string;
  stats: Stat[];
}

export interface Stat {
  stat: string;
  A: number;
}
export default function RadarComponent({ data }: { data: PokemonData }) {
  return (
    <ResponsiveContainer width="100%" height="100%" className={"text-white"}>
      <RadarChart
        cx="50%"
        cy="50%"
        outerRadius="80%"
        data={data.stats.map((stat) => ({ ...stat }))}
        style={{ color: "white" }}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="stat" />
        <PolarRadiusAxis angle={30} domain={[0, 255]} display={"none"} />

        <Tooltip
          content={({ payload, label }) => (
            <div className="text-gray-800">{payload?.[0]?.value}</div>
          )}
        />
        <Radar
          name={data.name}
          dataKey="A"
          stroke={data.color || "#43fc90"}
          fill={data.color || "#43fc90"}
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
