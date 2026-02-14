// app/(main)/page.tsx
"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";

// Import de recharts avec alias pour éviter les conflits
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  Cell,
  LabelList,
} from "recharts";
import { MultiLineChart } from "@/components/MultiLineChart";

export default function HomePage() {
  const [openDu, setOpenDu] = React.useState(false);
  const [openAu, setOpenAu] = React.useState(false);

  const today = new Date();
  const [dateDu, setDateDu] = React.useState<Date | undefined>(today);
  const [dateAu, setDateAu] = React.useState<Date | undefined>(today);

  const mtbfChartData = [
    { mois: "Jan", mtbf: 150, objectif_mtbf: 180 },
    { mois: "Feb", mtbf: 165, objectif_mtbf: 180 },
    { mois: "Mar", mtbf: 140, objectif_mtbf: 180 },
    { mois: "Apr", mtbf: 175, objectif_mtbf: 180 },
    { mois: "May", mtbf: 190, objectif_mtbf: 180 },
    { mois: "Jun", mtbf: 210, objectif_mtbf: 180 },
  ];

  const CustomMtbfLabel = (props: any) => {
    const { x, y, value } = props;
    if (value === undefined || value === null) return null;

    return (
      <text
        x={x}
        y={y - 15}
        fill="#8884d8"
        textAnchor="middle"
        fontSize={11}
        fontWeight="medium"
      >
        {value.toFixed(0)}h
      </text>
    );
  };

  const CustomObjectifLabel = (props: any) => {
    const { x, y, value } = props;
    if (value === undefined || value === null) return null;

    return (
      <text
        x={x}
        y={y - 15}
        fill="#82ca9d"
        textAnchor="middle"
        fontSize={11}
        fontWeight="medium"
      >
        {value.toFixed(0)}h
      </text>
    );
  };
  //
  const data = [
    { day: "1", alert: 20, prod: 35, obj: 42 },
    { day: "2", alert: 20, prod: 30, obj: 42 },
    { day: "3", alert: 20, prod: 40, obj: 42 },
  ];

  const series = [
    {
      dataKey: "alert",
      stroke: "#ff7300",
      name: "Alerte",
      dashed: true,
      showValues: true,
    },
    {
      dataKey: "prod",
      stroke: "#8884d8",
      name: "Production",
      dashed: false,
      showValues: true,
    },
    {
      dataKey: "obj",
      stroke: "#82ca9d",
      name: "Objectif",
      dashed: true,
      showValues: true,
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/20 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
            Tableau de bord Briefing DSE
          </h1>

          <div className="flex items-center justify-between max-w-sm mx-auto gap-6">
            {/* DATE DU */}
            <Field className="mx-auto w-44">
              <FieldLabel htmlFor="date">Date du</FieldLabel>
              <Popover open={openDu} onOpenChange={setOpenDu}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date"
                    className="justify-start font-normal"
                  >
                    {dateDu ? dateDu.toLocaleDateString() : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={dateDu}
                    defaultMonth={dateDu}
                    captionLayout="dropdown"
                    disabled={{ after: new Date() }}
                    onSelect={(date) => {
                      setDateDu(date);
                      setOpenDu(false);

                      // Bonus : si dateAu est avant la nouvelle dateDu, on la réinitialise
                      if (dateAu && date && dateAu < date) {
                        setDateAu(undefined);
                      }
                    }}
                  />
                </PopoverContent>
              </Popover>
            </Field>

            {/* DATE AU */}
            <Field className="mx-auto w-44">
              <FieldLabel htmlFor="date">Date au</FieldLabel>
              <Popover open={openAu} onOpenChange={setOpenAu}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date"
                    className="justify-start font-normal"
                  >
                    {dateAu ? dateAu.toLocaleDateString() : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={dateAu}
                    defaultMonth={dateAu}
                    captionLayout="dropdown"
                    disabled={{
                      before: dateDu || undefined, // ❗ empêche de choisir avant dateDu
                      after: new Date(), // ❗ empêche les dates futures
                    }}
                    onSelect={(date) => {
                      setDateAu(date);
                      setOpenAu(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </Field>

            <div className="mt-7">
              <Button
                onClick={() => {}}
                // disabled={isLoading || !selectedParc}
                className="w-full gap-2"
              >
                {/* {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )} */}
                Actualiser
              </Button>
            </div>
          </div>

          <div>
            {dateDu && dateAu && (
              <p className="text-sm text-muted-foreground mt-2">
                Période sélectionnée :{" "}
                <span className="font-medium text-foreground">
                  {dateDu.toLocaleDateString()} - {dateAu.toLocaleDateString()}
                </span>
              </p>
            )}
          </div>

          <div>
            <MultiLineChart data={data} xKey="day" series={series} />
          </div>

          <div className="h-[300px] mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={mtbfChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mois" />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => {
                    if (name === "mtbf") return [`${value} h`, "MTBF"];
                    if (name === "objectif_mtbf")
                      return [`${value} h`, "Objectif MTBF"];
                    return [value, name];
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="mtbf"
                  name="MTBF (h)"
                  stroke="#8884d8"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                >
                  <LabelList
                    dataKey="mtbf"
                    position="top"
                    content={<CustomMtbfLabel />}
                  />
                </Line>
                {mtbfChartData.some((item) => item.objectif_mtbf !== null) && (
                  <Line
                    type="monotone"
                    dataKey="objectif_mtbf"
                    name="Objectif MTBF"
                    stroke="#82ca9d"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  >
                    <LabelList
                      dataKey="objectif_mtbf"
                      position="top"
                      content={<CustomObjectifLabel />}
                    />
                  </Line>
                )}
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
