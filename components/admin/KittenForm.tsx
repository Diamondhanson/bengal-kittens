"use client";

import Image from "next/image";
import { useActionState, useState } from "react";
import { saveKitten, type KittenFormState } from "@/app/actions/admin";
import { SubmitButton } from "@/components/SubmitButton";
import type { Kitten } from "@/lib/types";

const inputClass =
  "w-full rounded-xl border border-cream-300 bg-white px-4 py-2.5 text-ink-900 placeholder:text-ink-300 focus:border-clay-400 focus:outline-none focus:ring-2 focus:ring-clay-200";
const labelClass = "mb-1.5 block text-sm font-bold text-ink-700";

export function KittenForm({ kitten }: { kitten?: Kitten }) {
  const [state, action] = useActionState<KittenFormState, FormData>(
    saveKitten,
    {}
  );
  const [imageUrls, setImageUrls] = useState<string[]>(kitten?.images ?? []);
  const [newUrl, setNewUrl] = useState("");

  return (
    <form action={action} className="max-w-3xl space-y-6">
      {kitten && <input type="hidden" name="id" value={kitten.id} />}
      {imageUrls.map((url) => (
        <input key={url} type="hidden" name="image_urls" value={url} />
      ))}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>Name *</label>
          <input id="name" name="name" required defaultValue={kitten?.name} className={inputClass} placeholder="Luna" />
        </div>
        <div>
          <label htmlFor="breed" className={labelClass}>Breed *</label>
          <input id="breed" name="breed" required defaultValue={kitten?.breed} className={inputClass} placeholder="Bengal" list="breed-suggestions" />
          <datalist id="breed-suggestions">
            <option value="Bengal" />
            <option value="Siamese" />
            <option value="British Shorthair" />
            <option value="Maine Coon" />
            <option value="Ragdoll" />
            <option value="Sphynx" />
          </datalist>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label htmlFor="gender" className={labelClass}>Gender</label>
          <select id="gender" name="gender" defaultValue={kitten?.gender ?? "male"} className={inputClass}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label htmlFor="color" className={labelClass}>Color / pattern</label>
          <input id="color" name="color" defaultValue={kitten?.color} className={inputClass} placeholder="Brown rosetted" />
        </div>
        <div>
          <label htmlFor="date_of_birth" className={labelClass}>Date of birth *</label>
          <input id="date_of_birth" name="date_of_birth" type="date" required defaultValue={kitten?.date_of_birth} className={inputClass} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label htmlFor="price" className={labelClass}>Price (USD) *</label>
          <input id="price" name="price" type="number" min="1" step="1" required defaultValue={kitten?.price} className={inputClass} placeholder="2200" />
        </div>
        <div>
          <label htmlFor="status" className={labelClass}>Status</label>
          <select id="status" name="status" defaultValue={kitten?.status ?? "available"} className={inputClass}>
            <option value="available">Available</option>
            <option value="reserved">Reserved</option>
            <option value="sold">Sold</option>
          </select>
        </div>
        <div className="flex items-end gap-6 pb-2">
          <label className="flex items-center gap-2 text-sm font-bold text-ink-700">
            <input type="checkbox" name="vaccinated" defaultChecked={kitten?.vaccinated ?? true} className="h-4 w-4 accent-clay-500" />
            Vaccinated
          </label>
          <label className="flex items-center gap-2 text-sm font-bold text-ink-700">
            <input type="checkbox" name="litter_trained" defaultChecked={kitten?.litter_trained ?? true} className="h-4 w-4 accent-clay-500" />
            Litter trained
          </label>
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-bold text-ink-700">
          <input type="checkbox" name="featured" defaultChecked={kitten?.featured ?? false} className="h-4 w-4 accent-clay-500" />
          Feature on the home page
        </label>
      </div>

      <div>
        <label htmlFor="temperament" className={labelClass}>Temperament</label>
        <input id="temperament" name="temperament" defaultValue={kitten?.temperament} className={inputClass} placeholder="Playful, affectionate, people-oriented" />
      </div>

      <div>
        <label htmlFor="description" className={labelClass}>Description *</label>
        <textarea id="description" name="description" required rows={4} defaultValue={kitten?.description} className={inputClass} placeholder="Personality, habits, what makes this kitten special…" />
      </div>

      <div>
        <label htmlFor="health_notes" className={labelClass}>Health notes</label>
        <textarea id="health_notes" name="health_notes" rows={2} defaultValue={kitten?.health_notes} className={inputClass} placeholder="Vaccinations, vet checks, genetic screening of parents…" />
      </div>

      <fieldset className="rounded-2xl border border-cream-300 bg-cream-50 p-5">
        <legend className="px-2 text-sm font-bold text-ink-700">Photos</legend>

        {imageUrls.length > 0 && (
          <ul className="flex flex-wrap gap-3">
            {imageUrls.map((url) => (
              <li key={url} className="relative">
                <div className="relative h-20 w-24 overflow-hidden rounded-xl bg-cream-200">
                  <Image src={url} alt="" fill sizes="96px" className="object-cover" />
                </div>
                <button
                  type="button"
                  onClick={() => setImageUrls((prev) => prev.filter((u) => u !== url))}
                  className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-clay-500 text-xs font-bold text-white shadow"
                  aria-label="Remove photo"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4">
          <label htmlFor="photos" className={labelClass}>Upload photos</label>
          <input
            id="photos"
            name="photos"
            type="file"
            accept="image/*"
            multiple
            className="block w-full text-sm text-ink-500 file:mr-4 file:rounded-lg file:border-0 file:bg-clay-500 file:px-4 file:py-2 file:text-sm file:font-bold file:text-white hover:file:bg-clay-600"
          />
          <p className="mt-1 text-xs text-ink-400">
            Uploaded to Supabase Storage. You can also paste an image URL below.
          </p>
        </div>

        <div className="mt-4 flex gap-2">
          <input
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            className={inputClass}
            placeholder="https://…/photo.jpg"
            aria-label="Image URL"
          />
          <button
            type="button"
            onClick={() => {
              const url = newUrl.trim();
              if (url && !imageUrls.includes(url)) {
                setImageUrls((prev) => [...prev, url]);
                setNewUrl("");
              }
            }}
            className="shrink-0 rounded-xl bg-moss-600 px-4 py-2 text-sm font-bold text-white hover:bg-moss-700"
          >
            Add URL
          </button>
        </div>
      </fieldset>

      {state.error && (
        <p className="rounded-xl bg-clay-100 px-4 py-3 text-sm font-semibold text-clay-700">
          {state.error}
        </p>
      )}

      <SubmitButton pendingText="Saving…">
        {kitten ? "Save changes" : "Add kitten"}
      </SubmitButton>
    </form>
  );
}
