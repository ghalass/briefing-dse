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

// Import de recharts avec alias pour éviter les conflits
import { MultiLineChart } from "@/components/MultiLineChart";

export default function HomePage() {
  const [openDu, setOpenDu] = React.useState(false);
  const [openAu, setOpenAu] = React.useState(false);

  const today = new Date();
  const [dateDu, setDateDu] = React.useState<Date | undefined>(today);
  const [dateAu, setDateAu] = React.useState<Date | undefined>(today);

  const data = [
    { day: dateDu?.toLocaleDateString() ?? "1", alert: 20, prod: 35, obj: 42 },
    { day: "2", alert: 20, prod: 30, obj: 42 },
    { day: "3", alert: 20, prod: 40, obj: 42 },
    { day: "4", alert: 20, prod: 40, obj: 42 },
    { day: "5", alert: 20, prod: 40, obj: 42 },
    { day: "6", alert: 20, prod: 40, obj: 42 },
    { day: "7", alert: 20, prod: 40, obj: 42 },
    { day: "8", alert: 20, prod: 40, obj: 42 },
    { day: dateAu?.toLocaleDateString() ?? "9", alert: 20, prod: 40, obj: 42 },
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
    <div className="text-center">
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

      <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground">
        Production
      </h1>

      <MultiLineChart data={data} xKey="day" series={series} />

      <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground">
        Actions chantier
      </h1>

      <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground">
        Suivi des Actions
      </h1>

      <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground">
        Sécurité & Environnement
      </h1>

      <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground">
        Actions DPAC
      </h1>
    </div>
  );
}
