import Airtable from 'airtable';

const base = new Airtable({ apiKey: import.meta.env.AIRTABLE_API_KEY }).base(import.meta.env.AIRTABLE_BASE_ID);
const table = base(import.meta.env.AIRTABLE_TABLE_NAME ?? 'Measurements');

export interface Measurement {
  id: string;
  date: string;
  weight: number | null;
  fat_pct: number | null;
  fat_kg: number | null;
  vvm: number | null;
  water_kg: number | null;
  water_pct: number | null;
  visceral_fat: number | null;
}

function toMeasurement(record: Airtable.Record<Airtable.FieldSet>): Measurement {
  const f = record.fields;
  return {
    id: record.id,
    date: (f.date as string) ?? '',
    weight: (f.weight as number) ?? null,
    fat_pct: (f.fat_pct as number) ?? null,
    fat_kg: (f.fat_kg as number) ?? null,
    vvm: (f.vvm as number) ?? null,
    water_kg: (f.water_kg as number) ?? null,
    water_pct: (f.water_pct as number) ?? null,
    visceral_fat: (f.visceral_fat as number) ?? null,
  };
}

function fieldsPayload(data: Omit<Measurement, 'id'>): Airtable.FieldSet {
  return Object.fromEntries(
    Object.entries(data).filter(([, v]) => v != null)
  ) as Airtable.FieldSet;
}

export function getAllMeasurements(): Promise<Measurement[]> {
  return new Promise((resolve, reject) => {
    const all: Measurement[] = [];
    table
      .select({ sort: [{ field: 'date', direction: 'asc' }] })
      .eachPage(
        (records, fetchNextPage) => {
          all.push(...records.map(toMeasurement));
          fetchNextPage();
        },
        (err) => (err ? reject(err) : resolve(all)),
      );
  });
}

export function createMeasurement(data: Omit<Measurement, 'id'>): Promise<string> {
  return new Promise((resolve, reject) => {
    table.create(fieldsPayload(data), (err, record) => {
      if (err || !record) return reject(err);
      resolve(record.id);
    });
  });
}

export function updateMeasurement(id: string, data: Omit<Measurement, 'id'>): Promise<void> {
  return new Promise((resolve, reject) => {
    table.update(id, fieldsPayload(data), (err) => (err ? reject(err) : resolve()));
  });
}

export function deleteMeasurement(id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    table.destroy(id, (err) => (err ? reject(err) : resolve()));
  });
}
