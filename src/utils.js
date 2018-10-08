export function fetchVariantsIds() {
  return fetch('/api/variants/ids')
    .then(res => res.json())
    .then(saveVariantIds)
    .catch(error => console.log(error));
}

export function fetchVariant(id) {
  return fetch(`/api/variants/${id}`)
    .then(res => res.json())
    .then(variant => {
      saveCurrentVariantId(variant.id);
      return variant;
    })
    .catch(error => console.log(error));
}

export function getFreeId() {
  const allIds = JSON.parse(localStorage.ids);
  const currentId = localStorage.currentId;

  if (!currentId) {
    return allIds[0];
  }

  const currentIndex = allIds.indexOf(+currentId);

  return currentIndex + 1 === allIds.length
    ? allIds[0]
    : allIds[currentIndex + 1];
}

function saveVariantIds(ids) {
  localStorage.ids = JSON.stringify(ids);
  localStorage.currentId = Math.floor(Math.random() * ids.length);
}

function saveCurrentVariantId(id) {
  localStorage.currentId = id;
}