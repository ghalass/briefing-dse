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

export default function HomePage() {
  const [openDu, setOpenDu] = React.useState(false);
  const [openAu, setOpenAu] = React.useState(false);

  const today = new Date();
  const [dateDu, setDateDu] = React.useState<Date | undefined>(today);
  const [dateAu, setDateAu] = React.useState<Date | undefined>(today);

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/20 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
            Tableau de bord Briefing DSE
          </h1>

          <div className="flex items-center">
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
          </div>
        </div>
      </div>
    </div>
  );
}
