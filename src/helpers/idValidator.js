export function idValidator(id) {
  const re = /^[0-9]{1,18}$/;
  if (!id) return 'NIP/NRP wajib diisi.';
  if (!re.test(id)) return 'NIP/NRP anda tidak valid.';
  return '';
}
