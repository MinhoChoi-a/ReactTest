//fetch utility

export const getAll = url => fetch(url).then(async (res) => await res.json());