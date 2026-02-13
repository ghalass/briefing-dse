// app/(main)/page.tsx
"use client";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/20 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
            Tableau de bord Briefing DSE
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Application de gestion du briefing pour les DSE, facilitant la
            planification, le suivi et la collaboration au sein de l'équipe.
          </p>
        </div>
      </div>
    </div>
  );
}
