"use client";

import * as React from "react";
import { Minus, Plus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

export type RecipeIngredientView = {
  id: string;
  name: string;
  quantity: number;
  unit?: string;
  note?: string;
  localized?: {
    name: string;
    ratio: number;
    plusAmount?: number;
    plusUnit?: string;
    notes?: string;
  };
};

export type RecipeDetailViewModel = {
  title: string;
  cuisine: string;
  country: string;
  baseServings: number;
  originStory: string;
  ingredients: RecipeIngredientView[];
  instructions: string[];
};

type Props = {
  recipe: RecipeDetailViewModel;
};

const formatQty = (value: number) => {
  if (Number.isInteger(value)) return value.toString();
  return value.toFixed(2).replace(/\.00$/, "").replace(/0$/, "");
};

const scaledQuantity = (baseQty: number, baseServings: number, targetServings: number) => {
  const factor = targetServings / baseServings;
  return baseQty * factor;
};

export default function RecipeDetailPage({ recipe }: Props) {
  const [servings, setServings] = React.useState(recipe.baseServings);
  const [localizeIngredients, setLocalizeIngredients] = React.useState(false);

  const decreaseServings = () => setServings((prev) => Math.max(1, prev - 1));
  const increaseServings = () => setServings((prev) => Math.min(20, prev + 1));

  const computedIngredients = React.useMemo(() => {
    return recipe.ingredients.map((ingredient) => {
      const baseScaled = scaledQuantity(ingredient.quantity, recipe.baseServings, servings);

      if (!localizeIngredients || !ingredient.localized) {
        return {
          displayName: ingredient.name,
          quantity: baseScaled,
          unit: ingredient.unit,
          note: ingredient.note,
          substitutionHint: null,
        };
      }

      const localizedQty = baseScaled * ingredient.localized.ratio;
      const plusAmount = ingredient.localized.plusAmount
        ? scaledQuantity(ingredient.localized.plusAmount, recipe.baseServings, servings)
        : undefined;

      return {
        displayName: ingredient.localized.name,
        quantity: localizedQty,
        unit: ingredient.unit,
        note: ingredient.note,
        substitutionHint: {
          text: ingredient.localized.notes,
          plusAmount,
          plusUnit: ingredient.localized.plusUnit,
        },
      };
    });
  }, [localizeIngredients, recipe.baseServings, recipe.ingredients, servings]);

  return (
    <article className="mx-auto max-w-4xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <header className="space-y-3">
        <Badge className="bg-orange-100 text-orange-900 hover:bg-orange-200">{recipe.cuisine}</Badge>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">{recipe.title}</h1>
        <p className="text-sm text-zinc-600">From {recipe.country}</p>
      </header>

      <Card className="border-orange-200 bg-orange-50/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Cook Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Servings</p>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" onClick={decreaseServings} aria-label="Decrease servings">
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center text-lg font-semibold">{servings}</span>
              <Button variant="outline" size="icon" onClick={increaseServings} aria-label="Increase servings">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Localize Ingredients</p>
              <p className="text-xs text-zinc-600">Swap harder-to-find imports with local alternatives.</p>
            </div>
            <Switch checked={localizeIngredients} onCheckedChange={setLocalizeIngredients} />
          </div>
        </CardContent>
      </Card>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-zinc-900">Ingredients</h2>
        <ul className="space-y-2">
          {computedIngredients.map((ingredient) => (
            <li key={`${ingredient.displayName}-${ingredient.unit}`} className="rounded-lg border border-zinc-200 bg-white p-3">
              <p className="font-medium text-zinc-900">
                {formatQty(ingredient.quantity)} {ingredient.unit} {ingredient.displayName}
              </p>
              {ingredient.note ? <p className="text-sm text-zinc-600">{ingredient.note}</p> : null}
              {ingredient.substitutionHint ? (
                <p className="text-xs text-emerald-700">
                  Local tip:
                  {ingredient.substitutionHint.plusAmount
                    ? ` + ${formatQty(ingredient.substitutionHint.plusAmount)} ${ingredient.substitutionHint.plusUnit ?? ""}`
                    : ""}
                  {ingredient.substitutionHint.text ? ` · ${ingredient.substitutionHint.text}` : ""}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </section>

      <Card className="border-emerald-300 bg-emerald-50/70">
        <CardHeader>
          <CardTitle className="text-xl text-emerald-900">Origin Story</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="leading-7 text-emerald-950/90">{recipe.originStory}</p>
        </CardContent>
      </Card>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-zinc-900">Instructions</h2>
        <ol className="space-y-2">
          {recipe.instructions.map((step, idx) => (
            <li key={step} className="rounded-lg border border-zinc-200 bg-white p-3 text-zinc-800">
              <span className="mr-2 font-semibold text-orange-700">{idx + 1}.</span>
              {step}
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
}
