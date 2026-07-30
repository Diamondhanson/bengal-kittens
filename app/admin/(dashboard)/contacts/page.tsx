import { setContactStatus } from "@/app/actions/admin";
import { getContacts } from "@/lib/data";
import { formatDateTime } from "@/lib/utils";

export default async function AdminContactsPage() {
  const contacts = await getContacts();

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-ink-900">
        Messages
      </h1>
      <p className="mt-2 text-sm text-ink-500">
        Contact-form messages from the website. Each one was also emailed to you.
      </p>

      <div className="mt-8 space-y-5">
        {contacts.map((contact) => (
          <article
            key={contact.id}
            className="rounded-2xl border border-cream-300 bg-white p-6"
          >
            <header className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="font-display text-lg font-semibold text-ink-900">
                    {contact.name}
                  </h2>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      contact.status === "new"
                        ? "bg-clay-100 text-clay-700"
                        : "bg-moss-100 text-moss-700"
                    }`}
                  >
                    {contact.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-ink-500">
                  <a href={`mailto:${contact.email}`} className="font-semibold text-clay-600">
                    {contact.email}
                  </a>
                  {contact.phone && <> · {contact.phone}</>}
                </p>
              </div>
              <p className="text-xs text-ink-400">{formatDateTime(contact.created_at)}</p>
            </header>
            {contact.subject && (
              <p className="mt-3 text-sm font-bold text-ink-700">{contact.subject}</p>
            )}
            <p className="mt-2 rounded-xl bg-cream-100 p-4 text-sm leading-relaxed text-ink-700">
              {contact.message}
            </p>
            <form action={setContactStatus} className="mt-4">
              <input type="hidden" name="id" value={contact.id} />
              <input
                type="hidden"
                name="status"
                value={contact.status === "new" ? "replied" : "new"}
              />
              <button
                type="submit"
                className="rounded-lg bg-cream-100 px-3 py-1.5 text-sm font-bold text-ink-500 hover:bg-cream-200"
              >
                Mark as {contact.status === "new" ? "replied" : "new"}
              </button>
            </form>
          </article>
        ))}
        {contacts.length === 0 && (
          <div className="rounded-2xl border border-cream-300 bg-white p-12 text-center text-ink-400">
            No messages yet.
          </div>
        )}
      </div>
    </div>
  );
}
