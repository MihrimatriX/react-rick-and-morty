import { RotateCcw, Users } from "lucide-react";
import CharacterGrid, { CharacterGridSkeleton } from "../components/CharacterGrid";
import Hero from "../components/Hero";
import Pagination from "../components/Pagination";
import SearchField from "../components/SearchField";
import SelectField, { type SelectOption } from "../components/SelectField";
import { EmptyState, ErrorState } from "../components/States";
import { Button } from "../components/ui/Button";
import { useListParams } from "../hooks/useListParams";
import {
	GENDER_LABELS,
	SPECIES_LABELS,
	STATUS_LABELS,
	formatNumber,
} from "../lib/labels";
import { useCharacters } from "../lib/queries";
import { DEFAULT_DESCRIPTION, SITE_NAME, Seo, websiteJsonLd } from "../seo";

const ALL: SelectOption = { value: "all", label: "Tümü" };
const toOptions = (labels: Record<string, string>): SelectOption[] => [
	ALL,
	...Object.entries(labels).map(([value, label]) => ({ value, label })),
];

const STATUS_OPTIONS = toOptions(STATUS_LABELS);
const GENDER_OPTIONS = toOptions(GENDER_LABELS);
const SPECIES_OPTIONS = toOptions(SPECIES_LABELS);

const DEFAULTS = { name: "", status: "all", gender: "all", species: "all" };

export default function CharactersPage() {
	const { values, page, setValue, setPage, reset, isFiltered } =
		useListParams(DEFAULTS);
	const { data, isPending, isError, error, refetch, isPlaceholderData } = useCharacters(
		{
			page,
			...values,
		},
	);

	return (
		<>
			<Seo
				title={SITE_NAME}
				description={DEFAULT_DESCRIPTION}
				path="/"
				jsonLd={websiteJsonLd()}
			/>
			<Hero />

			<section aria-labelledby="characters-title" className="mt-10">
				<div className="mb-5 flex flex-wrap items-end justify-between gap-3">
					<div>
						<h2
							id="characters-title"
							className="flex items-center gap-2 text-2xl font-bold"
						>
							<Users
								className="size-6 text-portal-ink"
								aria-hidden="true"
							/>
							Karakterler
						</h2>
						<p className="mt-1 text-sm text-muted" aria-live="polite">
							{data
								? `${formatNumber(data.info.count)} karakter bulundu`
								: "Karakterler yükleniyor…"}
						</p>
					</div>
				</div>

				<form
					role="search"
					aria-label="Karakter filtreleri"
					onSubmit={(e) => e.preventDefault()}
					className="mb-8 grid grid-cols-3 gap-3 rounded-2xl border border-line bg-surface/80 p-4 shadow-sm backdrop-blur sm:gap-4 lg:grid-cols-[2fr_1fr_1fr_1fr_auto] lg:items-end"
				>
					<SearchField
						label="İsim"
						placeholder="Örn. Rick, Morty, Birdperson…"
						value={values.name}
						onChange={(v) => setValue("name", v)}
						className="col-span-3 lg:col-span-1"
					/>
					<SelectField
						label="Durum"
						value={values.status}
						options={STATUS_OPTIONS}
						onChange={(v) => setValue("status", v)}
					/>
					<SelectField
						label="Cinsiyet"
						value={values.gender}
						options={GENDER_OPTIONS}
						onChange={(v) => setValue("gender", v)}
					/>
					<SelectField
						label="Tür"
						value={values.species}
						options={SPECIES_OPTIONS}
						onChange={(v) => setValue("species", v)}
					/>
					<Button
						onClick={reset}
						disabled={!isFiltered}
						className="col-span-3 lg:col-span-1"
					>
						<RotateCcw className="size-4" aria-hidden="true" />
						Sıfırla
					</Button>
				</form>

				{isPending ? (
					<CharacterGridSkeleton />
				) : isError ? (
					<ErrorState error={error} onRetry={() => refetch()} />
				) : data.results.length === 0 ? (
					<EmptyState
						title="Bu boyutta kimse yok"
						description="Aramana uyan karakter bulunamadı. Filtreleri değiştirip tekrar dene."
						action={
							<Button variant="primary" onClick={reset}>
								Filtreleri temizle
							</Button>
						}
					/>
				) : (
					<>
						<CharacterGrid
							characters={data.results}
							dimmed={isPlaceholderData}
						/>
						<Pagination
							page={page}
							pages={data.info.pages}
							onPageChange={setPage}
						/>
					</>
				)}
			</section>
		</>
	);
}
