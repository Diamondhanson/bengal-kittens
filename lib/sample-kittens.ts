import type { Kitten } from "./types";

const u = (id: string) =>
  `https://images.unsplash.com/${id}?w=1200&q=75&fit=crop`;

/**
 * Sample catalog shown while Supabase is not configured yet (and seeded into
 * the database by supabase/schema.sql). Delete these from the dashboard once
 * you upload real kittens.
 */
export const sampleKittens: Kitten[] = [
  {
    id: "00000000-0000-4000-8000-000000000001",
    slug: "luna-bengal",
    name: "Luna",
    breed: "Bengal",
    gender: "female",
    color: "Brown rosetted",
    date_of_birth: "2026-04-14",
    price: 2200,
    description:
      "Luna is a curious little explorer with a beautifully rosetted coat and glittering golden undertones. She loves climbing to the highest spot in the room, then curling up on the nearest warm lap. She has been raised underfoot in our living room and is wonderful with children.",
    temperament: "Playful, affectionate, people-oriented",
    vaccinated: true,
    litter_trained: true,
    health_notes:
      "First and second FVRCP vaccinations complete. Vet-checked twice, dewormed, TICA registered parents screened for PK-def and PRA-b.",
    status: "available",
    featured: true,
    images: [u("photo-1596854407944-bf87f6fdd49e"), u("photo-1543852786-1cf6624b9987")],
    created_at: "2026-06-20T10:00:00Z",
  },
  {
    id: "00000000-0000-4000-8000-000000000002",
    slug: "simba-bengal",
    name: "Simba",
    breed: "Bengal",
    gender: "male",
    color: "Golden spotted",
    date_of_birth: "2026-04-14",
    price: 2400,
    description:
      "Simba is the confident leader of his litter: bold, bright, and endlessly entertaining. He fetches toy mice, follows you from room to room, and greets visitors at the door. His large rosettes and warm golden coat turn heads everywhere.",
    temperament: "Confident, energetic, loyal",
    vaccinated: true,
    litter_trained: true,
    health_notes:
      "Vaccinations up to date, dewormed, vet-checked. Parents genetically screened; written health guarantee included.",
    status: "available",
    featured: true,
    images: [u("photo-1494256997604-768d1f608cac"), u("photo-1615789591457-74a63395c990")],
    created_at: "2026-06-20T10:05:00Z",
  },
  {
    id: "00000000-0000-4000-8000-000000000003",
    slug: "cleo-bengal",
    name: "Cleo",
    breed: "Bengal",
    gender: "female",
    color: "Silver rosetted",
    date_of_birth: "2026-05-02",
    price: 2500,
    description:
      "Cleo is a rare silver Bengal with striking contrast and emerald eyes. She is gentle and observant, the kitten who watches quietly, then surprises you with a burst of playful zoomies. She adores water play and interactive puzzle toys.",
    temperament: "Gentle, intelligent, curious",
    vaccinated: true,
    litter_trained: true,
    health_notes:
      "Age-appropriate vaccinations complete, dewormed, microchipped before pickup. Health guarantee included.",
    status: "available",
    featured: true,
    images: [u("photo-1573865526739-10659fec78a5"), u("photo-1606214174585-fe31582dc6ee")],
    created_at: "2026-06-21T09:00:00Z",
  },
  {
    id: "00000000-0000-4000-8000-000000000004",
    slug: "milo-bengal",
    name: "Milo",
    breed: "Bengal",
    gender: "male",
    color: "Brown marbled",
    date_of_birth: "2026-05-02",
    price: 1950,
    description:
      "Milo's flowing marbled pattern looks like polished wood grain, every swirl unique. He is the cuddler of the litter and purrs the moment you pick him up. Perfect for a family that wants a Bengal's beauty with a lap cat's heart.",
    temperament: "Cuddly, easy-going, social",
    vaccinated: true,
    litter_trained: true,
    health_notes:
      "Vaccinated and dewormed on schedule, vet-checked. Raised with dogs and children.",
    status: "reserved",
    featured: false,
    images: [u("photo-1592194996308-7b43878e84a6"), u("photo-1518791841217-8f162f1e1131")],
    created_at: "2026-06-21T09:10:00Z",
  },
  {
    id: "00000000-0000-4000-8000-000000000005",
    slug: "nala-siamese",
    name: "Nala",
    breed: "Siamese",
    gender: "female",
    color: "Seal point",
    date_of_birth: "2026-04-28",
    price: 1200,
    description:
      "Nala is a classic seal point Siamese with sapphire-blue eyes and plenty to say. She is chatty, devoted, and happiest perched on a shoulder. She has been raised alongside our Bengals and holds her own beautifully.",
    temperament: "Vocal, devoted, affectionate",
    vaccinated: true,
    litter_trained: true,
    health_notes:
      "Vaccinations current, dewormed, vet-checked twice. Written health guarantee included.",
    status: "available",
    featured: false,
    images: [u("photo-1514888286974-6c03e2ca1dba"), u("photo-1519052537078-e6302a4968d4")],
    created_at: "2026-06-22T11:00:00Z",
  },
  {
    id: "00000000-0000-4000-8000-000000000006",
    slug: "oliver-british-shorthair",
    name: "Oliver",
    breed: "British Shorthair",
    gender: "male",
    color: "Blue",
    date_of_birth: "2026-04-20",
    price: 1500,
    description:
      "Oliver is a plush blue British Shorthair teddy bear with round copper eyes. Calm and unflappable, he is the ideal companion for a quieter home, content to lounge nearby and accept chin scratches with quiet dignity.",
    temperament: "Calm, patient, independent",
    vaccinated: true,
    litter_trained: true,
    health_notes:
      "Fully vaccinated for age, dewormed, vet-checked. Parents GCCF registered.",
    status: "available",
    featured: false,
    images: [u("photo-1529778873920-4da4926a72c2"), u("photo-1548247416-ec66f4900b2e")],
    created_at: "2026-06-23T14:00:00Z",
  },
  {
    id: "00000000-0000-4000-8000-000000000007",
    slug: "willow-maine-coon",
    name: "Willow",
    breed: "Maine Coon",
    gender: "female",
    color: "Brown tabby",
    date_of_birth: "2026-04-05",
    price: 1700,
    description:
      "Willow is a gentle giant in the making, with tufted ears, a magnificent tail, and the sweetest chirping trill. Maine Coons are famously dog-like, and Willow already comes when called and loves a good game of fetch.",
    temperament: "Gentle, sociable, dog-like",
    vaccinated: true,
    litter_trained: true,
    health_notes:
      "Vaccinations current, dewormed, vet-checked. Parents HCM-screened by echocardiogram.",
    status: "available",
    featured: false,
    images: [u("photo-1533738363-b7f9aef128ce"), u("photo-1511044568932-338cba0ad803")],
    created_at: "2026-06-24T08:30:00Z",
  },
  {
    id: "00000000-0000-4000-8000-000000000008",
    slug: "leo-bengal",
    name: "Leo",
    breed: "Bengal",
    gender: "male",
    color: "Charcoal spotted",
    date_of_birth: "2026-05-10",
    price: 2100,
    description:
      "Leo is a dramatic charcoal Bengal with a dark mask and cape over shimmering spots. He is athletic and clever, already opening treat puzzles designed for adult cats, and melts into a purring puddle at bedtime.",
    temperament: "Athletic, clever, affectionate",
    vaccinated: true,
    litter_trained: true,
    health_notes:
      "Age-appropriate vaccinations complete, dewormed, vet-checked. Health guarantee included.",
    status: "available",
    featured: false,
    images: [u("photo-1574158622682-e40e69881006"), u("photo-1526336024174-e58f5cdd8e13")],
    created_at: "2026-06-25T16:45:00Z",
  },
];
