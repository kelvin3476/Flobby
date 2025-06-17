export function setCookie(name: string, value: string, days = 1) {
  const maxAge = days * 86400; // 하루 기준
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; max-age=${maxAge}; path=/; domain=flobby.co.kr; SameSite=None; Secure`;
}

export function getCookie(name: string): string | undefined {
  return document.cookie
    .split('; ')
    .find(row => row.startsWith(`${encodeURIComponent(name)}=`))
    ?.split('=')[1];
}
