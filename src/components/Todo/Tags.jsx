import { nanoid } from 'nanoid';

function Tags({tags}) {
  if (tags === undefined) return;

  return (
    <div className="text-neutral-300 text-xs">
      <div className="flex gap-3">
        {
          tags.map(tag => <div key={nanoid()}>🏷️ {tag}</div>)
        }
      </div>
    </div>
  );
}

export default Tags;
