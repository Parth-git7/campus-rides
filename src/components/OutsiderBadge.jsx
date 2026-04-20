// OutsiderBadge.jsx
// Shows a warning tag if the user's email is not from Chitkara

function OutsiderBadge({ email }) {

  // Core logic — if email doesn't end with chitkara domain, they're an outsider
  const isOutsider = email && !email.endsWith("@chitkara.edu.in");

  // If insider or no email, render nothing
  if (!isOutsider) return null;

  return (
    <span className="
      inline-flex items-center gap-1
      px-2 py-0.5 rounded-md
      text-[11px] font-bold uppercase tracking-wider
      bg-yellow-100 text-yellow-700
      dark:bg-yellow-900/30 dark:text-yellow-400
    ">
      ⚠ Outsider
    </span>
  );
}

export default OutsiderBadge;