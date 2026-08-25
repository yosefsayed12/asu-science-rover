export function validateName(name) {
    if (!name || typeof name !== 'string') return false;
    const trimmed = name.trim();
    const regex = /^[A-Za-z\u0600-\u06FF\s'-]+$/;
    return trimmed.length >= 2 && regex.test(trimmed);
}

export function validateEmail(email) {
    if (!email || typeof email !== 'string') return false;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return regex.test(email.trim());
}

export function validatePhone(phone) {
    if (!phone) return false;
    const regex = /^01[0125][0-9]{8}$/;
    return regex.test(String(phone).trim());
}

export function validateLevel(level) {
    return Boolean(level && String(level).trim().length > 0);
}